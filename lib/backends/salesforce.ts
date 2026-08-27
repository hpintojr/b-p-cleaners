/**
 * Salesforce Backend Adapter
 * Supports Web-to-Lead and REST API modes using mapped field names.
 */

import { LeadData, BackendResult } from '../leadTypes';
import { backendConfig } from '../backendconnect';
import { mapLeadToBackend } from '../backendcolumns';

export async function sendToSalesforce(lead: LeadData): Promise<BackendResult> {
  const config = backendConfig.salesforce;

  if (config.mode === 'web-to-lead') {
    return sendWebToLead(lead, config.oid);
  } else {
    return sendRestApi(lead, config.instanceUrl, config.accessToken);
  }
}

/**
 * Salesforce Web-to-Lead
 * Uses mapped field names for the form submission.
 */
async function sendWebToLead(lead: LeadData, oid: string): Promise<BackendResult> {
  const mapped = mapLeadToBackend(lead, 'salesforce');

  try {
    // Web-to-Lead uses URL-encoded form data
    const formBody = new URLSearchParams();
    formBody.set('oid', oid);
    formBody.set('retURL', 'https://advantagefirst.com');

    for (const [key, value] of Object.entries(mapped)) {
      if (value !== undefined && value !== null) {
        formBody.set(key, String(value));
      }
    }

    const response = await fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    });

    return { backend: 'salesforce-w2l', success: true, message: 'Lead submitted via Salesforce Web-to-Lead' };
  } catch (error) {
    return { backend: 'salesforce-w2l', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

/**
 * Salesforce REST API
 * Uses mapped field names for the Lead object.
 */
async function sendRestApi(lead: LeadData, instanceUrl: string, accessToken: string): Promise<BackendResult> {
  const mapped = mapLeadToBackend(lead, 'salesforce');

  // REST API requires Company field on Lead
  if (!mapped['Company']) {
    mapped['Company'] = 'Individual';
  }

  try {
    const response = await fetch(`${instanceUrl}/services/data/v59.0/sobjects/Lead/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(mapped),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'salesforce-api', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    return { backend: 'salesforce-api', success: true, message: 'Lead created in Salesforce', data };
  } catch (error) {
    return { backend: 'salesforce-api', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
