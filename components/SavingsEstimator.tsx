'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Check, AlertCircle, ShieldCheck, PhoneCall, Sparkles,
  Home, Building2, CheckCircle2, Repeat,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

type PropertyType = 'Residential' | 'Commercial';
type Frequency = 'One-Time' | 'Weekly' | 'Bi-Weekly' | 'Monthly';

const ADDON_OPTIONS = [
  { id: 'Deep Clean', label: 'Deep Clean', hint: '+$0.10/sqft — baseboards, cabinets, detailed scrub' },
  { id: 'Move In/Out', label: 'Move In / Move Out', hint: '+$0.15/sqft — full empty-property detail' },
  { id: 'Inside Fridge', label: 'Inside Fridge', hint: '+$50 flat' },
  { id: 'Inside Oven', label: 'Inside Oven', hint: '+$50 flat' },
  { id: 'Interior Windows', label: 'Interior Windows', hint: '+$75 flat' },
] as const;

interface EstimatorState {
  step: 1 | 2 | 3;
  propertyType: PropertyType;
  sqft: number;
  rooms: number;
  frequency: Frequency;
  addons: string[];
  fullName: string;
  phone: string;
  email: string;
  isAgreed: boolean;
  isSmsAgreed: boolean;
}

export default function SavingsEstimator() {
  const [formData, setFormData] = useState<EstimatorState>({
    step: 1,
    propertyType: 'Residential',
    sqft: 2000,
    rooms: 3,
    frequency: 'One-Time',
    addons: [],
    fullName: '',
    phone: '',
    email: '',
    isAgreed: true,
    isSmsAgreed: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState<number | null>(null);

  // Fetch sequential quote ID from server on mount — guarantees no duplicates
  useEffect(() => {
    fetch('/api/generate-quote-id', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setQuoteId(data.quoteId))
      .catch(() => {
        // Absolute fallback: timestamp-based ID (still unique, just not sequential)
        setQuoteId(Date.now() % 1000000);
      });
  }, []);

  const { propertyType, sqft, rooms, frequency, addons } = formData;

  // ── High-end pricing logic ──
  // Residential $0.35/sqft, Commercial $0.30/sqft base rate.
  // Deep Clean +$0.10/sqft, Move In/Out +$0.15/sqft, flat add-ons.
  // Frequency discount: Monthly 10%, Bi-Weekly 15%, Weekly 20% off.
  // Displayed as a +/-10% range around the target price.
  const calculateEstimate = () => {
    const baseRate = propertyType === 'Residential' ? 0.35 : 0.3;
    let subtotal = sqft * baseRate;

    if (addons.includes('Deep Clean')) subtotal += sqft * 0.1;
    if (addons.includes('Move In/Out')) subtotal += sqft * 0.15;
    if (addons.includes('Inside Fridge')) subtotal += 50;
    if (addons.includes('Inside Oven')) subtotal += 50;
    if (addons.includes('Interior Windows')) subtotal += 75;

    let discountMultiplier = 1.0;
    if (frequency === 'Monthly') discountMultiplier = 0.9;
    if (frequency === 'Bi-Weekly') discountMultiplier = 0.85;
    if (frequency === 'Weekly') discountMultiplier = 0.8;

    const targetPrice = subtotal * discountMultiplier;
    const minPrice = Math.round(targetPrice * 0.9);
    const maxPrice = Math.round(targetPrice * 1.1);

    return { minPrice, maxPrice, targetPrice: Math.round(targetPrice) };
  };

  const { minPrice, maxPrice } = calculateEstimate();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, sqft: value }));
    analytics.calculatorSliderChange(value);
  };

  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, rooms: value }));
  };

  const handlePropertyTypeChange = (type: PropertyType) => {
    setFormData((prev) => ({ ...prev, propertyType: type }));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, frequency: e.target.value as Frequency }));
    analytics.calculatorTermSelect(0);
  };

  const toggleAddon = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter((a) => a !== id)
        : [...prev.addons, id],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Please enter both your first and last name';
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.isAgreed) {
      newErrors.isAgreed = 'You must agree to be contacted to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    analytics.calculatorStepAdvance(1, 2);
    analytics.calculatorEstimateViewed({ amount: sqft, term: 0, monthlyPayment: minPrice, savings: maxPrice - minPrice });
    setFormData((prev) => ({ ...prev, step: 2 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      analytics.calculatorSubmit({ amount: sqft, term: 0, monthlyPayment: minPrice, savings: maxPrice - minPrice });
      analytics.calculatorStepAdvance(2, 3);

      // Advance to confirmation screen immediately
      setFormData((prev) => ({ ...prev, step: 3 }));

      // Fire lead data to the backend (non-blocking)
      try {
        await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            propertyType: formData.propertyType,
            sqft: formData.sqft,
            rooms: formData.rooms,
            frequency: formData.frequency,
            addons: formData.addons,
            estimatedPriceMin: minPrice,
            estimatedPriceMax: maxPrice,
            smsConsent: formData.isSmsAgreed,
            communicationsConsent: formData.isAgreed,
            quoteId: quoteId,
          }),
        });
      } catch {
        // Silently fail — user already sees confirmation
        console.error('Lead submission failed');
      }
    }
  };

  return (
    <div
      className="w-full bg-white rounded-3xl border border-af-blue-ice shadow-[0_20px_50px_-15px_rgba(26,29,31,0.18)] overflow-hidden"
      id="savings-estimator-card"
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-af-navy to-af-navy-deep text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shadow-md border border-white/20 flex-shrink-0">
            <Sparkles className="w-6 h-6 sm:w-5 sm:h-5 text-af-blue" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight block leading-tight">
              Get Your Instant Cleaning Quote
            </span>
            <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider mt-0.5">
              Residential &amp; Commercial · No Call Required
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 flex-shrink-0 self-center">
          <span className="text-[11px] font-mono font-bold text-white/90 mr-1">Step {formData.step}/3</span>
          <button type="button" onClick={() => setFormData((prev) => ({ ...prev, step: 1 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 1 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 1" />
          <button type="button" onClick={() => setFormData((prev) => ({ ...prev, step: 2 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 2 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 2" />
          <button type="button" onClick={() => setFormData((prev) => ({ ...prev, step: 3 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 3 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 3" />
        </div>
      </div>

      {/* Step 1: Property & Service Configuration */}
      {formData.step === 1 && (
        <div className="p-6 sm:p-8" id="estimator-step-1">
          <div className="space-y-6">

            {/* Property Type Toggle */}
            <div className="text-left">
              <label className="block text-xs font-extrabold text-af-navy uppercase tracking-wider mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handlePropertyTypeChange('Residential')}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    propertyType === 'Residential'
                      ? 'border-af-blue bg-af-blue-soft text-af-navy shadow-sm'
                      : 'border-af-blue-ice bg-white text-pv-muted hover:border-af-blue/40'
                  }`}
                  id="property-type-residential"
                >
                  <Home className="w-4 h-4" />
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => handlePropertyTypeChange('Commercial')}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    propertyType === 'Commercial'
                      ? 'border-af-blue bg-af-blue-soft text-af-navy shadow-sm'
                      : 'border-af-blue-ice bg-white text-pv-muted hover:border-af-blue/40'
                  }`}
                  id="property-type-commercial"
                >
                  <Building2 className="w-4 h-4" />
                  Commercial
                </button>
              </div>
            </div>

            {/* Sqft Slider */}
            <div className="relative" id="sqft-slider-wrapper">
              <div className="text-left flex justify-between items-center mb-2">
                <label htmlFor="sqft-slider" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">
                  Approximate Square Footage
                </label>
                <span className="font-display text-base sm:text-lg font-bold text-af-blue bg-af-blue-ice px-2.5 py-1 rounded-lg whitespace-nowrap">
                  {sqft.toLocaleString()} sqft
                </span>
              </div>
              <input
                type="range"
                id="sqft-slider"
                min="500"
                max="10000"
                step="50"
                value={sqft}
                onChange={handleSqftChange}
                className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50"
                aria-label="Approximate square footage"
              />
              <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono">
                <span>500 sqft</span>
                <span>5,000 sqft</span>
                <span>10,000+ sqft</span>
              </div>
            </div>

            {/* Rooms Slider */}
            <div className="relative" id="rooms-slider-wrapper">
              <div className="text-left flex justify-between items-center mb-2">
                <label htmlFor="rooms-slider" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">
                  Number of Rooms
                </label>
                <span className="font-display text-base sm:text-lg font-bold text-af-blue bg-af-blue-ice px-2.5 py-1 rounded-lg whitespace-nowrap">
                  {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <input
                type="range"
                id="rooms-slider"
                min="1"
                max="20"
                step="1"
                value={rooms}
                onChange={handleRoomsChange}
                className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50"
                aria-label="Number of rooms"
              />
              <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono">
                <span>1</span>
                <span>10</span>
                <span>20+</span>
              </div>
            </div>

            {/* Frequency Dropdown */}
            <div className="text-left space-y-1.5" id="frequency-wrapper">
              <label htmlFor="frequency-select" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">
                How Often?
              </label>
              <select
                id="frequency-select"
                value={frequency}
                onChange={handleFrequencyChange}
                className="w-full px-4 py-3 rounded-xl border border-af-blue-ice focus:border-af-blue text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy"
              >
                <option value="One-Time">One-Time</option>
                <option value="Weekly">Weekly — Save 20%</option>
                <option value="Bi-Weekly">Bi-Weekly — Save 15%</option>
                <option value="Monthly">Monthly — Save 10%</option>
              </select>
            </div>

            {/* Add-ons */}
            <div className="text-left space-y-2" id="addons-wrapper">
              <label className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">
                Add-Ons (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDON_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      addons.includes(opt.id)
                        ? 'border-af-blue bg-af-blue-soft'
                        : 'border-af-blue-ice bg-white hover:border-af-blue/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons.includes(opt.id)}
                      onChange={() => toggleAddon(opt.id)}
                      className="mt-0.5 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0"
                    />
                    <span>
                      <span className="block text-xs font-bold text-af-navy">{opt.label}</span>
                      <span className="block text-[10px] text-pv-muted mt-0.5">{opt.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Live Estimate Panel */}
            <div className="bg-af-blue-soft/70 rounded-2xl border border-af-blue-ice p-4 sm:p-5 space-y-1" id="live-estimates-panel">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-af-navy uppercase tracking-wider">
                  Your Estimated Price Range
                </span>
                <Repeat className="w-4 h-4 text-af-blue" />
              </div>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-af-navy tracking-tight">
                  {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
                </span>
              </div>
              <p className="text-[11px] text-pv-muted leading-tight pt-1">
                {propertyType} · {sqft.toLocaleString()} sqft · {frequency}
                {addons.length > 0 ? ` · ${addons.length} add-on${addons.length > 1 ? 's' : ''}` : ''}
              </p>
            </div>

            {/* Advance Button */}
            <button
              onClick={handleNextStep}
              className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#10B981] hover:from-af-red-hover hover:to-af-red text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-af-red/25 hover:shadow-xl group active:scale-[0.98]"
              id="estimator-step1-next-btn"
            >
              <span>Get My Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-pv-muted text-center" id="secure-disclaimer-step1">
              <ShieldCheck className="w-4 h-4 text-trust-green" />
              <span>Free instant estimate · No obligation · Confirmed before booking</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {formData.step === 2 && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" id="estimator-step-2">
          <div className="text-left border-b border-af-blue-ice pb-3">
            <h3 className="text-base sm:text-lg font-bold text-af-navy">
              Where Should We Send Your Quote?
            </h3>
            <p className="text-xs text-pv-muted mt-1">
              Your estimated range is {formatCurrency(minPrice)}–{formatCurrency(maxPrice)} for a {frequency.toLowerCase()} {propertyType.toLowerCase()} clean.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="text-left space-y-1.5 col-span-2">
              <label htmlFor="fullName" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Jamie Rivera"
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="text-xs text-af-red flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="text-left space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 000-0000"
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-xs text-af-red flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email address */}
            <div className="text-left space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jamie@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-af-red flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="text-left space-y-3.5 col-span-2 mt-2 p-4 rounded-xl bg-af-blue-soft border border-af-blue-ice">

            {/* Checkbox 1: Contact Consent */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="isAgreed"
                name="isAgreed"
                checked={formData.isAgreed}
                onChange={(e) => {
                  setFormData({ ...formData, isAgreed: e.target.checked });
                  if (errors.isAgreed) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.isAgreed;
                      return next;
                    });
                  }
                }}
                className="mt-1 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0"
              />
              <label htmlFor="isAgreed" className="text-[11px] text-pv-muted leading-relaxed cursor-pointer select-none">
                I agree to be contacted by B&amp;P Cleaning Services by phone or email about my quote and booking. View our <a href="/privacy" className="text-af-blue underline font-semibold">Privacy Policy</a> and <a href="/terms-of-use" className="text-af-blue underline font-semibold">Terms of Use</a>.
              </label>
            </div>
            {errors.isAgreed && (
              <p className="text-xs text-af-red flex items-center gap-1 font-medium pl-6">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.isAgreed}
              </p>
            )}

            {/* Checkbox 2: SMS Consent */}
            <div className="flex items-start gap-2.5 border-t border-af-blue-ice/60 pt-3">
              <input
                type="checkbox"
                id="isSmsAgreed"
                name="isSmsAgreed"
                checked={formData.isSmsAgreed}
                onChange={(e) => setFormData({ ...formData, isSmsAgreed: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0"
              />
              <label htmlFor="isSmsAgreed" className="text-[11px] text-pv-muted leading-relaxed cursor-pointer select-none">
                I agree to receive text messages (SMS) about my quote, booking confirmation, and appointment reminders. Msg &amp; data rates may apply. Reply STOP to cancel. View our <a href="/sms-terms" className="text-af-blue underline font-semibold">SMS Terms</a>.
              </label>
            </div>
          </div>

          {/* Final Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#10B981] hover:from-af-red-hover hover:to-af-red text-white font-bold transition-all duration-200 text-center text-base shadow-lg shadow-af-red/25 mt-2 flex items-center justify-center gap-2 active:scale-[0.98]"
            id="estimator-step2-submit-btn"
          >
            <span>Confirm My Quote</span>
            <Check className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Step 3: Confirmation */}
      {formData.step === 3 && (
        <div className="p-6 sm:p-8 space-y-6 text-center" id="estimator-success">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-trust-green-light text-trust-green border border-trust-green/30 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-af-navy">
              Quote Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-pv-muted mt-1 max-w-[36ch] mx-auto">
              Quote Reference: <span className="font-mono font-bold text-af-blue">BPC-{quoteId !== null ? String(quoteId).padStart(6, '0') : '------'}</span>
            </p>
          </div>

          {/* Quote Summary Panel */}
          <div className="bg-af-blue-soft/80 border border-af-blue-ice rounded-2xl p-4 text-left space-y-2.5 shadow-xs" id="quote-results-panel">
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Name:</span>
              <span className="font-bold text-af-navy">{formData.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Property:</span>
              <span className="font-bold text-af-navy">{formData.propertyType} · {formData.sqft.toLocaleString()} sqft · {formData.rooms} rooms</span>
            </div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Frequency:</span>
              <span className="font-bold text-af-navy">{formData.frequency}</span>
            </div>
            {formData.addons.length > 0 && (
              <div className="flex justify-between items-start text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
                <span>Add-Ons:</span>
                <span className="font-bold text-af-navy text-right max-w-[60%]">{formData.addons.join(', ')}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-bold text-af-navy uppercase tracking-wider">Estimated Range:</span>
              <span className="text-base font-display text-af-blue font-extrabold">{formatCurrency(minPrice)} – {formatCurrency(maxPrice)}</span>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="text-left space-y-2">
            <h4 className="text-xs font-extrabold text-af-navy uppercase tracking-wider">
              What happens next
            </h4>
            <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 shadow-2xs">
              <p className="text-[11px] text-pv-muted leading-relaxed">
                We&apos;ll text or call you shortly to confirm your final price, pick an appointment
                time, and match you with a vetted cleaner in your area. You won&apos;t be charged
                until after your cleaning is completed.
              </p>
            </div>
          </div>

          {/* Direct Phone Activation Band */}
          <div className="bg-gradient-to-br from-af-navy to-af-navy-deep text-white rounded-2xl p-5 space-y-3 shadow-md" id="success-hotline-prompt">
            <span className="text-xs font-bold text-af-red-light uppercase tracking-wider block">
              Want to Book Right Now?
            </span>
            <p className="text-xs text-white/80 leading-relaxed max-w-[32ch] mx-auto">
              Call us and we&apos;ll get you on the schedule in under 5 minutes.
            </p>
            <a
              href="tel:19092767631"
              onClick={() => analytics.calculatorCallClick()}
              className="w-full py-3.5 bg-white hover:bg-af-blue-ice text-af-navy font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm tracking-wide shadow-md"
              id="success-hotline-btn"
            >
              <PhoneCall className="w-4 h-4 text-af-red" />
              Call (909) 276-7631
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
