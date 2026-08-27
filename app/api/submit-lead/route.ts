/**
 * POST /api/submit-lead
 *
 * Receives lead data from the SavingsEstimator cleaning quote calculator.
 *
 * 1. Inserts the quote into the NeonDB `quote_requests` table, when
 *    DATABASE_URL is configured (see the `quote_requests` schema in the
 *    project Overview). Skipped gracefully — not a build/runtime error —
 *    when DATABASE_URL is unset, since NeonDB has not been provisioned yet.
 * 2. Routes the same lead to any other enabled backends (Supabase, GHL
 *    webhook, GHL Contacts API, Salesforce) via the multi-pipe router.
 *    All are currently disabled in lib/backendconnect.ts.
 *
 * API keys and connection strings never touch the client — they stay
 * server-side in backendconnect.ts / process.env.
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadData, SubmitResponse, BackendResult } from '@/lib/leadTypes';
import { routeLeadToBackends } from '@/lib/backends';

async function insertIntoNeon(lead: LeadData): Promise<BackendResult> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return { backend: 'neon', success: false, message: 'Skipped — DATABASE_URL not configured yet' };
  }

  try {
    // Dynamic import so the build doesn't require the package to be
    // resolved unless this code path actually runs.
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(databaseUrl);

    const nameParts = lead.fullName.split(' ');
    const firstName = nameParts[0] || lead.fullName;
    const lastName = nameParts.slice(1).join(' ') || '';

    await sql`
      INSERT INTO quote_requests
      (first_name, last_name, email, phone, property_type, sqft_range, rooms, service_frequency, add_ons, estimated_price_min, estimated_price_max)
      VALUES
      (${firstName}, ${lastName}, ${lead.email}, ${lead.phone}, ${lead.propertyType}, ${String(lead.sqft)}, ${lead.rooms}, ${lead.frequency}, ${JSON.stringify(lead.addons)}, ${lead.estimatedPriceMin}, ${lead.estimatedPriceMax})
    `;

    // TODO: GHL Webhook Fetch Request — once a GHL sub-account + inbound
    // webhook URL exist, fire the same lead to GHL here (or rely on the
    // ghlWebhook backend in lib/backends/, enabled via backendconnect.ts).

    return { backend: 'neon', success: true, message: 'Quote inserted into NeonDB quote_requests' };
  } catch (error) {
    return { backend: 'neon', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['fullName', 'phone', 'email', 'propertyType', 'sqft', 'frequency'];
    const missing = required.filter((field) => !body[field] && body[field] !== 0);

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Build the lead data object
    const lead: LeadData = {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      propertyType: body.propertyType,
      sqft: Number(body.sqft),
      rooms: Number(body.rooms) || 0,
      frequency: body.frequency,
      addons: Array.isArray(body.addons) ? body.addons : [],
      estimatedPriceMin: Number(body.estimatedPriceMin) || 0,
      estimatedPriceMax: Number(body.estimatedPriceMax) || 0,
      smsConsent: Boolean(body.smsConsent),
      communicationsConsent: Boolean(body.communicationsConsent),
      quoteId: Number(body.quoteId) || 0,
      submittedAt: new Date().toISOString(),
      source: 'bpcleaners.com/calculator',
    };

    // Insert into NeonDB (guarded — no-op until DATABASE_URL is set) and
    // fan out to any other enabled backends in parallel.
    const [neonResult, otherResults] = await Promise.all([
      insertIntoNeon(lead),
      routeLeadToBackends(lead),
    ]);

    const results = [neonResult, ...otherResults];
    const anySuccess = results.some((r) => r.success);

    const response: SubmitResponse = {
      success: anySuccess,
      results,
      quoteId: lead.quoteId,
    };

    return NextResponse.json(response, { status: anySuccess ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}
