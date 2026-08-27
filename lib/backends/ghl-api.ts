/**
 * GHL Contacts API Backend Adapter
 * Creates a contact via the GHL REST API using mapped field names.
 *
 * Note: GHL Contacts API has a fixed schema for top-level fields
 * (firstName, lastName, email, phone, etc.) but custom fields use
 * the mapped names from backendcolumns.
 */

import { LeadData, BackendResult } from '../leadTypes';
import { backendConfig } from '../backendconnect';
import { backendColumns } from '../backendcolumns';

export async function sendToGhlApi(lead: LeadData): Promise<BackendResult> {
  const config = backendConfig.ghlApi;
  const cols = backendColumns.ghlApi;

  const nameParts = lead.fullName.split(' ');
  const firstName = nameParts[0] || lead.fullName;
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build custom fields array using mapped names (skip empty mappings)
  const customFields: { key: string; field_value: string }[] = [];

  const customFieldEntries: [string, unknown][] = [
    [cols.propertyType, lead.propertyType],
    [cols.sqft, lead.sqft],
    [cols.rooms, lead.rooms],
    [cols.frequency, lead.frequency],
    [cols.addons, lead.addons.join(', ')],
    [cols.estimatedPriceMin, lead.estimatedPriceMin],
    [cols.estimatedPriceMax, lead.estimatedPriceMax],
    [cols.smsConsent, lead.smsConsent ? 'Yes' : 'No'],
    [cols.quoteId, lead.quoteId],
    [cols.submittedAt, lead.submittedAt],
  ];

  for (const [key, value] of customFieldEntries) {
    if (key && key.trim() !== '') {
      customFields.push({ key, field_value: String(value) });
    }
  }

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        locationId: config.locationId,
        customFields,
        tags: ['website-calculator', 'bp-cleaners'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'ghl-api', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    return { backend: 'ghl-api', success: true, message: 'Contact created in GHL', data };
  } catch (error) {
    return { backend: 'ghl-api', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
