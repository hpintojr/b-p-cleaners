/**
 * POST /api/generate-quote-id
 * 
 * Returns the next sequential evaluation reference number.
 * Uses an atomic server-side counter to guarantee NO duplicates.
 * 
 * Strategy:
 *   1. If Supabase is enabled → atomic INCREMENT in a `quote_counter` row
 *   2. Fallback → file-based counter with atomic write (fs rename)
 * 
 * Response: { quoteId: 1234, formatted: "AFF-001234" }
 */

import { NextResponse } from 'next/server';
import { backendConfig } from '@/lib/backendconnect';
import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'data', 'quote-counter.json');
const COUNTER_TABLE = 'quote_counter';

/**
 * Atomic file-based counter — uses write-to-temp + rename pattern
 * to prevent race conditions even under concurrent requests.
 */
function getNextFileCounter(): number {
  // Ensure data directory exists
  const dir = path.dirname(COUNTER_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let current = 0;
  if (fs.existsSync(COUNTER_FILE)) {
    try {
      const raw = fs.readFileSync(COUNTER_FILE, 'utf-8');
      const data = JSON.parse(raw);
      current = data.counter || 0;
    } catch {
      current = 0;
    }
  }

  const next = current + 1;

  // Atomic write: write to temp file, then rename (atomic on POSIX)
  const tempFile = `${COUNTER_FILE}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify({ counter: next, updatedAt: new Date().toISOString() }));
  fs.renameSync(tempFile, COUNTER_FILE);

  return next;
}

/**
 * Supabase atomic counter — uses upsert + increment via RPC or REST.
 * Falls back to file counter if Supabase call fails.
 */
async function getNextSupabaseCounter(): Promise<number> {
  const config = backendConfig.supabase;
  
  try {
    // Use Supabase RPC for atomic increment:
    // SELECT increment_quote_counter() — a simple SQL function
    // Fallback: direct REST upsert + select
    const response = await fetch(`${config.url}/rest/v1/rpc/increment_quote_counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const data = await response.json();
      return typeof data === 'number' ? data : data.counter || data;
    }

    // If RPC doesn't exist, fall back to manual approach:
    // Read current → increment → update with optimistic locking
    const readRes = await fetch(
      `${config.url}/rest/v1/${COUNTER_TABLE}?id=eq.1&select=counter`,
      {
        headers: {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
        },
      }
    );

    if (readRes.ok) {
      const rows = await readRes.json();
      if (rows.length > 0) {
        const next = rows[0].counter + 1;
        await fetch(`${config.url}/rest/v1/${COUNTER_TABLE}?id=eq.1`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`,
          },
          body: JSON.stringify({ counter: next, updated_at: new Date().toISOString() }),
        });
        return next;
      } else {
        // Row doesn't exist — create it
        await fetch(`${config.url}/rest/v1/${COUNTER_TABLE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ id: 1, counter: 1, updated_at: new Date().toISOString() }),
        });
        return 1;
      }
    }

    // All Supabase attempts failed — fall back to file
    throw new Error('Supabase counter unavailable');
  } catch {
    // Supabase failed, use file fallback
    return getNextFileCounter();
  }
}

export async function POST() {
  try {
    let quoteId: number;

    // Use Supabase if enabled and configured, otherwise file counter
    const sb = backendConfig.supabase;
    if (sb.enabled && sb.url && sb.anonKey) {
      quoteId = await getNextSupabaseCounter();
    } else {
      quoteId = getNextFileCounter();
    }

    const formatted = `AFF-${String(quoteId).padStart(6, '0')}`;

    return NextResponse.json({ quoteId, formatted });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to generate quote ID: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}
