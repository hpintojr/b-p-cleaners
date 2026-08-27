/**
 * Lead Data Type Definition
 * 
 * Shared type for all lead data captured from the SavingsEstimator calculator.
 * Used across all backend adapters and the submit API route.
 */

export interface LeadData {
  // User-entered fields
  fullName: string;
  phone: string;
  email: string;
  state: string;
  
  // Calculator values
  loanAmount: number;
  loanTerm: number;
  
  // Calculated estimates
  estimatedMonthlyPayment: number;
  estimatedTotalCost: number;
  unsecuredTotal: number;
  estimatedSavings: number;
  
  // Consent & metadata
  smsConsent: boolean;
  communicationsConsent: boolean;
  quoteId: number;
  submittedAt: string;     // ISO 8601 timestamp
  source: string;           // e.g. 'advantagefirst.com/calculator'
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
