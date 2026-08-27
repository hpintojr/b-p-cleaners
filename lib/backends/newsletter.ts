/**
 * Newsletter Backend Adapters
 * 
 * Per-backend newsletter subscriber routing functions.
 * Same modular adapter pattern as the lead backends (supabase.ts, ghl-webhook.ts, etc.)
 * but targeting newsletter-specific tables/lists/tags.
 */

import { NewsletterSubscriber } from '../newsletterTypes';
import { BackendResult } from '../leadTypes';
import { backendConfig } from '../backendconnect';

// ─── 1. Supabase ─────────────────────────────────────

export async function sendNewsletterToSupabase(sub: NewsletterSubscriber): Promise<BackendResult> {
  const config = backendConfig.supabase;
  const table = config.newsletterTable || 'newsletter_subscribers';

  try {
    const response = await fetch(`${config.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        email: sub.email,
        source: sub.source,
        subscribed_at: sub.subscribedAt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Duplicate email is acceptable — treat as success
      if (errorText.includes('duplicate') || errorText.includes('unique')) {
        return { backend: 'supabase', success: true, message: 'Already subscribed' };
      }
      return { backend: 'supabase', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    return { backend: 'supabase', success: true, message: 'Subscriber added to Supabase' };
  } catch (error) {
    return { backend: 'supabase', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}

// ─── 2. GHL Inbound Webhook ──────────────────────────

export async function sendNewsletterToGhlWebhook(sub: NewsletterSubscriber, webhookUrl: string): Promise<BackendResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: sub.email,
        source: sub.source,
        type: 'newsletter_subscriber',
        tags: ['newsletter'],
        subscribed_at: sub.subscribedAt,
      }),
    });

    if (!response.ok) {
      return { backend: 'ghl-webhook', success: false, message: `HTTP ${response.status}` };
    }

    return { backend: 'ghl-webhook', success: true, message: 'Subscriber sent to GHL webhook' };
  } catch (error) {
    return { backend: 'ghl-webhook', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}

// ─── 3. GHL Contacts API ───────────────────────────

export async function sendNewsletterToGhlApi(sub: NewsletterSubscriber): Promise<BackendResult> {
  const config = backendConfig.ghlApi;

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        email: sub.email,
        locationId: config.locationId,
        tags: ['newsletter_subscriber'],
        source: sub.source,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'ghl-api', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    return { backend: 'ghl-api', success: true, message: 'Subscriber created in GHL' };
  } catch (error) {
    return { backend: 'ghl-api', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}

// ─── 4. Salesforce ────────────────────────────────────

export async function sendNewsletterToSalesforce(sub: NewsletterSubscriber): Promise<BackendResult> {
  const config = backendConfig.salesforce;

  try {
    if (config.mode === 'web-to-lead') {
      const formData = new URLSearchParams();
      formData.append('oid', config.oid);
      formData.append('email', sub.email);
      formData.append('lead_source', `Newsletter: ${sub.source}`);
      formData.append('description', `Newsletter subscriber from ${sub.source}`);

      await fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      return { backend: 'salesforce', success: true, message: 'Subscriber sent via Web-to-Lead' };
    } else {
      // REST API mode
      const response = await fetch(`${config.instanceUrl}/services/data/v58.0/sobjects/Lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({
          Email: sub.email,
          LeadSource: `Newsletter: ${sub.source}`,
          Description: `Newsletter subscriber from ${sub.source}`,
          LastName: 'Newsletter Subscriber',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { backend: 'salesforce', success: false, message: `HTTP ${response.status}: ${errorText}` };
      }

      return { backend: 'salesforce', success: true, message: 'Subscriber created in Salesforce' };
    }
  } catch (error) {
    return { backend: 'salesforce', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}
