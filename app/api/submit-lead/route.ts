/**
 * POST /api/submit-lead
 * 
 * Receives lead data from the SavingsEstimator calculator,
 * then routes it to all enabled backends via the multi-pipe router.
 * 
 * API keys and connection strings never touch the client — they stay
 * server-side in backendconnect.ts.
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadData, SubmitResponse } from '@/lib/leadTypes';
import { routeLeadToBackends } from '@/lib/backends';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['fullName', 'phone', 'email', 'state', 'loanAmount', 'loanTerm'];
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
      state: body.state,
      loanAmount: Number(body.loanAmount),
      loanTerm: Number(body.loanTerm),
      estimatedMonthlyPayment: Number(body.estimatedMonthlyPayment) || 0,
      estimatedTotalCost: Number(body.estimatedTotalCost) || 0,
      unsecuredTotal: Number(body.unsecuredTotal) || 0,
      estimatedSavings: Number(body.estimatedSavings) || 0,
      smsConsent: Boolean(body.smsConsent),
      communicationsConsent: Boolean(body.communicationsConsent),
      quoteId: Number(body.quoteId) || 0,
      submittedAt: new Date().toISOString(),
      source: 'advantagefirst.com/calculator',
    };

    // Route to all enabled backends
    const results = await routeLeadToBackends(lead);

    // Check if at least one backend succeeded
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
