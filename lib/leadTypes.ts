/**
 * Lead Data Type Definition
 *
 * Shared type for all lead data captured from the SavingsEstimator
 * cleaning quote calculator. Used across all backend adapters and the
 * submit API route. Field shape mirrors the NeonDB `quote_requests` table.
 */

export interface LeadData {
  // User-entered fields
  fullName: string;
  phone: string;
  email: string;

  // Calculator values
  propertyType: string;      // 'Residential' | 'Commercial'
  sqft: number;
  rooms: number;
  frequency: string;         // 'One-Time' | 'Weekly' | 'Bi-Weekly' | 'Monthly'
  addons: string[];

  // Calculated estimate
  estimatedPriceMin: number;
  estimatedPriceMax: number;

  // Consent & metadata
  smsConsent: boolean;
  communicationsConsent: boolean;
  quoteId: number;
  submittedAt: string;     // ISO 8601 timestamp
  source: string;           // e.g. 'bpcleaners.com/calculator'
}

export interface BackendResult {
  backend: string;
  success: boolean;
  message: string;
  data?: unknown;
}

export interface SubmitResponse {
  success: boolean;
  results: BackendResult[];
  quoteId: number;
}
