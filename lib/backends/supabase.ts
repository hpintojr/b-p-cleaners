/**
 * Supabase Backend Adapter
 * Inserts lead data into a Supabase table using mapped column names.
 */

import { LeadData, BackendResult } from '../leadTypes';
import { backendConfig } from '../backendconnect';
import { mapLeadToBackend } from '../backendcolumns';

export async function sendToSupabase(lead: LeadData): Promise<BackendResult> {
  const config = backendConfig.supabase;
  const payload = mapLeadToBackend(lead, 'supabase');

  try {
    const response = await fetch(`${config.url}/rest/v1/${config.tableName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'supabase', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    return { backend: 'supabase', success: true, message: 'Lead inserted into Supabase' };
  } catch (error) {
    return { backend: 'supabase', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
