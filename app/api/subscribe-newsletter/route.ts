/**
 * POST /api/subscribe-newsletter
 * 
 * Receives newsletter subscription email and routes it to all
 * enabled backends via the shared multi-pipe router.
 * 
 * Uses the same backend infrastructure as /api/submit-lead:
 *   - Supabase → `newsletter_subscribers` table
 *   - GHL Webhook → same webhook, tagged as newsletter
 *   - GHL API → creates/updates contact with newsletter tag
 *   - Salesforce → creates Lead with newsletter source
 * 
 * Whatever backends are enabled in backendconnect.ts, newsletter
 * data flows to ALL of them — same pattern as lead routing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSubscriber, NewsletterResponse } from '@/lib/newsletterTypes';
import { routeNewsletterToBackends } from '@/lib/backends';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate email
    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const subscriber: NewsletterSubscriber = {
      email: body.email.trim().toLowerCase(),
      source: body.source || 'unknown',
      subscribedAt: new Date().toISOString(),
    };

    // Route to all enabled backends (same infra as leads)
    const results = await routeNewsletterToBackends(subscriber);

    // Check if at least one backend succeeded
    const anySuccess = results.some((r) => r.success);

    const response: NewsletterResponse = {
      success: anySuccess,
      message: anySuccess ? 'Subscribed successfully' : 'Subscription failed',
      results,
    };

    return NextResponse.json(response, { status: anySuccess ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}
