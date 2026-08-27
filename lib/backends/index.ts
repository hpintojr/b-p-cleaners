/**
 * Multi-Pipe Orchestrator — Leads & Newsletter
 * 
 * Reads backendconnect.ts config and fires data to ALL enabled
 * backends simultaneously via Promise.allSettled (no single failure
 * blocks the others).
 * 
 * A backend only fires if:
 *   1. enabled === true
 *   2. All required connection strings / keys are non-empty
 */

import { LeadData, BackendResult } from '../leadTypes';
import { NewsletterSubscriber } from '../newsletterTypes';
import { backendConfig } from '../backendconnect';
import { sendToSupabase } from './supabase';
import { sendToGhlWebhook } from './ghl-webhook';
import { sendToGhlApi } from './ghl-api';
import { sendToSalesforce } from './salesforce';
import {
  sendNewsletterToSupabase,
  sendNewsletterToGhlWebhook,
  sendNewsletterToGhlApi,
  sendNewsletterToSalesforce,
} from './newsletter';

/** Check if a string value is actually filled in */
const hasValue = (val: string | undefined): boolean => Boolean(val && val.trim().length > 0);

// ─── Lead Router ───────────────────────────────────────

export async function routeLeadToBackends(lead: LeadData): Promise<BackendResult[]> {
  const promises: Promise<BackendResult>[] = [];
  const skipped: BackendResult[] = [];

  // 1. Supabase — requires url + anonKey
  if (backendConfig.supabase.enabled) {
    if (hasValue(backendConfig.supabase.url) && hasValue(backendConfig.supabase.anonKey)) {
      promises.push(sendToSupabase(lead));
    } else {
      skipped.push({ backend: 'supabase', success: false, message: 'Skipped — missing url or anonKey' });
    }
  }

  // 2. GHL Inbound Webhook — requires webhookUrl
  if (backendConfig.ghlWebhook.enabled) {
    if (hasValue(backendConfig.ghlWebhook.webhookUrl)) {
      promises.push(sendToGhlWebhook(lead, backendConfig.ghlWebhook.webhookUrl));
    } else {
      skipped.push({ backend: 'ghl-webhook', success: false, message: 'Skipped — missing webhookUrl' });
    }
  }

  // 3. GHL Contacts API — requires apiKey + locationId
  if (backendConfig.ghlApi.enabled) {
    if (hasValue(backendConfig.ghlApi.apiKey) && hasValue(backendConfig.ghlApi.locationId)) {
      promises.push(sendToGhlApi(lead));
    } else {
      skipped.push({ backend: 'ghl-api', success: false, message: 'Skipped — missing apiKey or locationId' });
    }
  }

  // 4. Salesforce — depends on mode
  if (backendConfig.salesforce.enabled) {
    const sf = backendConfig.salesforce;
    const hasCredentials = sf.mode === 'web-to-lead'
      ? hasValue(sf.oid)
      : hasValue(sf.instanceUrl) && hasValue(sf.accessToken);

    if (hasCredentials) {
      promises.push(sendToSalesforce(lead));
    } else {
      skipped.push({ backend: 'salesforce', success: false, message: `Skipped — missing credentials for ${sf.mode} mode` });
    }
  }

  return settleAndCollect(promises, skipped);
}

// ─── Newsletter Router ─────────────────────────────────

export async function routeNewsletterToBackends(sub: NewsletterSubscriber): Promise<BackendResult[]> {
  const promises: Promise<BackendResult>[] = [];
  const skipped: BackendResult[] = [];

  // 1. Supabase — requires url + anonKey
  if (backendConfig.supabase.enabled) {
    if (hasValue(backendConfig.supabase.url) && hasValue(backendConfig.supabase.anonKey)) {
      promises.push(sendNewsletterToSupabase(sub));
    } else {
      skipped.push({ backend: 'supabase', success: false, message: 'Skipped — missing url or anonKey' });
    }
  }

  // 2. GHL Inbound Webhook — requires webhookUrl
  if (backendConfig.ghlWebhook.enabled) {
    if (hasValue(backendConfig.ghlWebhook.webhookUrl)) {
      promises.push(sendNewsletterToGhlWebhook(sub, backendConfig.ghlWebhook.webhookUrl));
    } else {
      skipped.push({ backend: 'ghl-webhook', success: false, message: 'Skipped — missing webhookUrl' });
    }
  }

  // 3. GHL Contacts API — requires apiKey + locationId
  if (backendConfig.ghlApi.enabled) {
    if (hasValue(backendConfig.ghlApi.apiKey) && hasValue(backendConfig.ghlApi.locationId)) {
      promises.push(sendNewsletterToGhlApi(sub));
    } else {
      skipped.push({ backend: 'ghl-api', success: false, message: 'Skipped — missing apiKey or locationId' });
    }
  }

  // 4. Salesforce — depends on mode
  if (backendConfig.salesforce.enabled) {
    const sf = backendConfig.salesforce;
    const hasCredentials = sf.mode === 'web-to-lead'
      ? hasValue(sf.oid)
      : hasValue(sf.instanceUrl) && hasValue(sf.accessToken);

    if (hasCredentials) {
      promises.push(sendNewsletterToSalesforce(sub));
    } else {
      skipped.push({ backend: 'salesforce', success: false, message: `Skipped — missing credentials for ${sf.mode} mode` });
    }
  }

  return settleAndCollect(promises, skipped);
}

// ─── Shared Settler ──────────────────────────────────

async function settleAndCollect(
  promises: Promise<BackendResult>[],
  skipped: BackendResult[],
): Promise<BackendResult[]> {
  // No backends enabled or all skipped
  if (promises.length === 0 && skipped.length === 0) {
    return [{ backend: 'none', success: true, message: 'No backends enabled in backendconnect.ts' }];
  }

  // Fire all simultaneously — allSettled ensures one failure doesn't block others
  const settled = await Promise.allSettled(promises);

  const results = settled.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return {
      backend: 'unknown',
      success: false,
      message: `Unhandled error: ${result.reason}`,
    };
  });

  return [...results, ...skipped];
}
