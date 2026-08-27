/**
 * GHL Inbound Webhook Backend Adapter
 * Sends lead data to a GHL Workflow trigger using mapped field names.
 */

import { LeadData, BackendResult } from '../leadTypes';
import { mapLeadToBackend } from '../backendcolumns';

export async function sendToGhlWebhook(lead: LeadData, webhookUrl: string): Promise<BackendResult> {
  const payload = mapLeadToBackend(lead, 'ghlWebhook');

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'ghl-webhook', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    return { backend: 'ghl-webhook', success: true, message: 'Lead sent to GHL Webhook' };
  } catch (error) {
    return { backend: 'ghl-webhook', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
