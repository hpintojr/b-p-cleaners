/**
 * BACKEND COLUMNS — Per-Backend Field Name Mapping
 *
 *  This file controls what each lead data field is CALLED when it
 *  gets sent to each backend. Every backend can use different names.
 *
 *  EXAMPLE: Your Supabase table has a column called "fname" but
 *  GHL expects "first_name" and Salesforce expects "FirstName":
 *
 *    supabase:    { fullName: 'fname', ... }
 *    ghlWebhook:  { fullName: 'first_name', ... }
 *    salesforce:  { fullName: 'FirstName', ... }
 *
 *  HOW TO USE:
 *  1. Find the backend you want to customize below
 *  2. Change the VALUE (right side) to match your backend's field name
 *  3. The KEY (left side) always stays the same — it maps to the
 *     lead data from the calculator
 *
 *  Set a field to '' (empty string) to exclude it from that backend.
 */

export interface FieldMapping {
  // User-entered fields
  fullName: string;
  firstName: string;       // auto-split from fullName
  lastName: string;        // auto-split from fullName
  phone: string;
  email: string;

  // Calculator values
  propertyType: string;
  sqft: string;
  rooms: string;
  frequency: string;
  addons: string;

  // Calculated estimate
  estimatedPriceMin: string;
  estimatedPriceMax: string;

  // Consent & metadata
  smsConsent: string;
  communicationsConsent: string;
  quoteId: string;
  submittedAt: string;
  source: string;
}

export const backendColumns: Record<string, FieldMapping> = {

  // SUPABASE — Column names in your Supabase 'leads' table
  supabase: {
    fullName:                 'full_name',
    firstName:                'first_name',
    lastName:                 'last_name',
    phone:                    'phone',
    email:                    'email',
    propertyType:              'property_type',
    sqft:                      'sqft_range',
    rooms:                     'rooms',
    frequency:                 'service_frequency',
    addons:                    'add_ons',
    estimatedPriceMin:         'estimated_price_min',
    estimatedPriceMax:         'estimated_price_max',
    smsConsent:               'sms_consent',
    communicationsConsent:    'communications_consent',
    quoteId:                  'quote_id',
    submittedAt:              'submitted_at',
    source:                   'source',
  },

  // GHL INBOUND WEBHOOK — Field names in the webhook payload
  ghlWebhook: {
    fullName:                 'full_name',
    firstName:                'first_name',
    lastName:                 'last_name',
    phone:                    'phone',
    email:                    'email',
    propertyType:              'Property_Type',
    sqft:                      'Estimated_SqFt',
    rooms:                     'Number_of_Rooms',
    frequency:                 'Maintenance_Frequency',
    addons:                    'Requested_Add_Ons',
    estimatedPriceMin:         'estimated_price_min',
    estimatedPriceMax:         'estimated_price_max',
    smsConsent:               'sms_consent',
    communicationsConsent:    'communications_consent',
    quoteId:                  'quote_id',
    submittedAt:              'submitted_at',
    source:                   'source',
  },

  // GHL CONTACTS API — Field names for contact creation
  // (matches the custom fields defined in the GHL project spec)
  ghlApi: {
    fullName:                 'full_name',
    firstName:                'firstName',
    lastName:                 'lastName',
    phone:                    'phone',
    email:                    'email',
    propertyType:              'Property_Type',
    sqft:                      'Estimated_SqFt',
    rooms:                     'Number_of_Rooms',
    frequency:                 'Maintenance_Frequency',
    addons:                    'Requested_Add_Ons',
    estimatedPriceMin:         'estimated_price_min',
    estimatedPriceMax:         'estimated_price_max',
    smsConsent:               'sms_consent',
    communicationsConsent:    'communications_consent',
    quoteId:                  'quote_id',
    submittedAt:              'submitted_at',
    source:                   'source',
  },

  // SALESFORCE — Field names for Lead object
  salesforce: {
    fullName:                 'Name',
    firstName:                'FirstName',
    lastName:                 'LastName',
    phone:                    'Phone',
    email:                    'Email',
    propertyType:              'Property_Type__c',
    sqft:                      'Sqft__c',
    rooms:                     'Rooms__c',
    frequency:                 'Service_Frequency__c',
    addons:                    'Add_Ons__c',
    estimatedPriceMin:         'Est_Price_Min__c',
    estimatedPriceMax:         'Est_Price_Max__c',
    smsConsent:               'SMS_Consent__c',
    communicationsConsent:    'Comms_Consent__c',
    quoteId:                  'Quote_ID__c',
    submittedAt:              'Submitted_At__c',
    source:                   'LeadSource',
  },

};

/**
 * Maps a LeadData object to a backend-specific payload using the
 * field names defined above. Skips fields set to '' (empty string).
 */
import { LeadData } from './leadTypes';

export function mapLeadToBackend(lead: LeadData, backendKey: string): Record<string, unknown> {
  const mapping = backendColumns[backendKey];
  if (!mapping) return {};

  const nameParts = lead.fullName.split(' ');
  const firstName = nameParts[0] || lead.fullName;
  const lastName = nameParts.slice(1).join(' ') || '';

  const fieldValues: Record<string, unknown> = {
    fullName:                 lead.fullName,
    firstName:                firstName,
    lastName:                 lastName,
    phone:                    lead.phone,
    email:                    lead.email,
    propertyType:              lead.propertyType,
    sqft:                      lead.sqft,
    rooms:                     lead.rooms,
    frequency:                 lead.frequency,
    addons:                    lead.addons,
    estimatedPriceMin:         lead.estimatedPriceMin,
    estimatedPriceMax:         lead.estimatedPriceMax,
    smsConsent:               lead.smsConsent,
    communicationsConsent:    lead.communicationsConsent,
    quoteId:                  lead.quoteId,
    submittedAt:              lead.submittedAt,
    source:                   lead.source,
  };

  const result: Record<string, unknown> = {};

  for (const [internalKey, externalName] of Object.entries(mapping)) {
    // Skip fields with empty mapping — user doesn't want them sent
    if (!externalName || externalName.trim() === '') continue;

    if (internalKey in fieldValues) {
      result[externalName] = fieldValues[internalKey];
    }
  }

  return result;
}
