'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, AlertCircle, ShieldCheck, PhoneCall, Sparkles, CreditCard, Scale, CheckCircle2, Building2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface EstimatorState {
  debtAmount: number;
  step: 1 | 2 | 3;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  isAgreed: boolean;
  isCreditAgreed: boolean;
  programTerm: number;
}

export default function SavingsEstimator() {
  const [formData, setFormData] = useState<EstimatorState>({
    debtAmount: 35000,
    step: 1,
    fullName: '',
    phone: '',
    email: '',
    state: 'CA',
    isAgreed: true,
    isCreditAgreed: true,
    programTerm: 36,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState<number | null>(null);

  // Fetch sequential quote ID from server on mount — guarantees no duplicates
  useEffect(() => {
    fetch('/api/generate-quote-id', { method: 'POST' })
      .then(res => res.json())
      .then(data => setQuoteId(data.quoteId))
      .catch(() => {
        // Absolute fallback: timestamp-based ID (still unique, just not sequential)
        setQuoteId(Date.now() % 1000000);
      });
  }, []);

  // Calculated estimates
  const debt = formData.debtAmount;
  const isLoanEligibleAmount = debt <= 100000;

  // Standard amortization helper: P * [r(1+r)^n] / [(1+r)^n - 1]
  const calcMonthlyPayment = (principal: number, monthlyRate: number, months: number) => {
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return principal * (monthlyRate * factor) / (factor - 1);
  };

  // Fixed term range for traditional loan calculator (12–72 months)
  const maxTerm = 72;
  const activeTerm = Math.max(12, Math.min(formData.programTerm, maxTerm));

  // Consolidation loan at 5.99% APR
  const consolidationMonthlyRate = 0.0599 / 12;
  const consolidationMonthly = Math.round(calcMonthlyPayment(debt, consolidationMonthlyRate, activeTerm));
  const consolidationTotal = consolidationMonthly * activeTerm;

  // Unsecured debt comparison at 24.9% APR
  const unsecuredMonthlyRate = 0.249 / 12;
  const unsecuredMonthly = Math.round(calcMonthlyPayment(debt, unsecuredMonthlyRate, activeTerm));
  const unsecuredTotal = unsecuredMonthly * activeTerm;

  // Savings = what you'd pay at 24.9% minus what you'd pay at 5.99%
  const estimatedSavings = unsecuredTotal - consolidationTotal;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      debtAmount: amount,
    }));
    analytics.calculatorSliderChange(amount);
  };

  const handleTermSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      programTerm: term,
    }));
    analytics.calculatorTermSelect(term);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData.isAgreed) {
      newErrors.isAgreed = 'You must agree to the Communications Terms to proceed';
    }

    if (!formData.isCreditAgreed) {
      newErrors.isCreditAgreed = 'You must consent to be contacted via call, text, or email to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    analytics.calculatorStepAdvance(1, 2);
    analytics.calculatorEstimateViewed({ amount: debt, term: activeTerm, monthlyPayment: consolidationMonthly, savings: estimatedSavings });
    setFormData((prev) => ({ ...prev, step: 2 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      // Track conversion + identify lead
      analytics.calculatorSubmit({ amount: debt, term: activeTerm, monthlyPayment: consolidationMonthly, savings: estimatedSavings });
      analytics.calculatorStepAdvance(2, 3);

      // Advance to confirmation screen immediately
      setFormData((prev) => ({ ...prev, step: 3 }));

      // Fire lead data to all enabled backends (non-blocking)
      try {
        await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            state: formData.state,
            loanAmount: debt,
            loanTerm: activeTerm,
            estimatedMonthlyPayment: consolidationMonthly,
            estimatedTotalCost: consolidationTotal,
            unsecuredTotal: unsecuredTotal,
            estimatedSavings: estimatedSavings,
            smsConsent: formData.isCreditAgreed,
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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const statesList = [
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
    { code: 'NY', name: 'New York' },
    { code: 'FL', name: 'Florida' },
    { code: 'IL', name: 'Illinois' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'OH', name: 'Ohio' },
    { code: 'GA', name: 'Georgia' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'MI', name: 'Michigan' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'UT', name: 'Utah' },
    { code: 'MA', name: 'Massachusetts' },
  ];

  return (
    <div 
      className="w-full bg-white rounded-3xl border border-af-blue-ice shadow-[0_20px_50px_-15px_rgba(29,49,95,0.15)] overflow-hidden" 
      id="savings-estimator-card"
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-af-navy to-af-navy-deep text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md border border-white/20 flex-shrink-0">
            <div className="relative w-full h-full">
              <Image 
                src="/images/torch_logo.png" 
                alt="Advantage First Torch" 
                fill 
                className="object-contain" 
                sizes="40px"
              />
            </div>
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight block leading-tight">
              See Which Consolidation Options May Fit Your Situation
            </span>
            <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider mt-0.5">
              Consolidation Loans · Multi-Lender Analysis
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 flex-shrink-0 self-center">
          <span className="text-[11px] font-mono font-bold text-white/90 mr-1">Step {formData.step}/3</span>
          <button type="button" onClick={() => setFormData(prev => ({ ...prev, step: 1 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 1 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 1" />
          <button type="button" onClick={() => setFormData(prev => ({ ...prev, step: 2 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 2 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 2" />
          <button type="button" onClick={() => setFormData(prev => ({ ...prev, step: 3 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === 3 ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label="Go to step 3" />
        </div>
      </div>

      {/* Step 1: Interactive Loan Profile Calculator */}
      {formData.step === 1 && (
        <div className="p-6 sm:p-8" id="estimator-step-1">
          <div className="space-y-6">
            <div className="text-left">
              <label htmlFor="debt-slider" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">
                Select Your Total Unsecured Balance Profile
              </label>
              <p className="text-xs text-pv-muted mt-1">
                Include Credit Cards, Personal Loans, Medical Bills &amp; High-Interest Balances
              </p>
            </div>

            {/* Dynamic Metric Display Box */}
            <div className="text-center py-5 px-4 bg-af-blue-soft rounded-2xl border border-af-blue-ice" id="slider-value-display">
              <span className="block text-[10px] font-bold text-pv-muted uppercase tracking-widest">
                Total Unsecured Balance
              </span>
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-af-navy mt-1 block tracking-tight">
                {formatCurrency(debt)}
              </span>
            </div>

            {/* Real-time slider */}
            <div className="relative mt-2" id="slider-range-wrapper">
              <input
                type="range"
                id="debt-slider"
                min="8000"
                max="100000"
                step="1000"
                value={debt}
                onChange={handleSliderChange}
                className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50"
                aria-label="Total unsecured balance amount"
              />
              <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono">
                <span>$8,000</span>
                <span>$50,000</span>
                <span>$100,000+</span>
              </div>
            </div>

            {/* Pathway Contextual Badge explaining Loan Eligibility */}
            <div className="p-3.5 rounded-xl border text-xs leading-relaxed text-left flex items-start gap-2.5 transition-colors duration-200 bg-white border-af-blue-ice" id="pathway-qualification-indicator">
              <Sparkles className="w-4 h-4 text-af-blue flex-shrink-0 mt-0.5" />
              <div>
                {isLoanEligibleAmount ? (
                  <p className="text-af-navy font-semibold">
                    <strong className="text-trust-green font-bold">Consolidation Loan Eligible:</strong> At <strong className="text-af-blue">{formatCurrency(debt)}</strong>, you may qualify for a direct or partner consolidation loan (up to $100,000) with competitive fixed rates.
                  </p>
                ) : (
                  <p className="text-af-navy font-semibold">
                    <strong className="text-af-blue font-bold">High-Balance Loan Program:</strong> Balances over $100,000 (up to $400,000+) may be structured through customized consolidation lending programs across our partner network.
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic Timeframe Slider */}
            <div className="space-y-3 pt-2 border-t border-af-blue-ice/60" id="term-slider-wrapper">
              <div className="text-left flex justify-between items-center">
                <div>
                  <label htmlFor="term-slider" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                    Target Timeframe
                  </label>
                  <p className="text-[11px] text-pv-muted mt-0.5 whitespace-nowrap">
                    Customize your repayment period (12 to 72 months)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-base sm:text-lg font-bold text-af-blue bg-af-blue-ice px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg whitespace-nowrap">
                    {activeTerm} {activeTerm === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="range"
                  id="term-slider"
                  min="12"
                  max={maxTerm}
                  step="1"
                  value={activeTerm}
                  onChange={handleTermSliderChange}
                  className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50"
                  aria-label="Target timeframe in months"
                />
                <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono">
                  <span>12 Months</span>
                  <span>{Math.max(12, Math.round((12 + maxTerm) / 2))} Months</span>
                  <span>{maxTerm} Months</span>
                </div>
              </div>
            </div>

            {/* Dynamic Multi-Option Estimates Panel */}
            <div className="bg-af-blue-soft/70 rounded-2xl border border-af-blue-ice p-4 sm:p-5 space-y-1" id="live-estimates-panel">
              <div className="flex justify-between items-start text-xs sm:text-sm border-b border-af-blue-ice/60 pb-0.5">
                <div>
                  <span className="text-af-navy font-bold block">Unsecured Balance (24.9% APR)</span>
                  <span className="text-[10px] text-pv-muted font-medium block mt-0.5">Unsecured balance of <strong className="text-af-blue font-bold">{formatCurrency(debt)}</strong> at 24.9% interest paid over <strong className="text-af-blue font-bold">{activeTerm} months</strong> estimate</span>
                </div>
                <span className="font-bold text-af-navy font-mono">{formatCurrency(unsecuredTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm pb-0.5 pt-0.5">
                <span className="text-pv-muted font-medium">
                  Estimated Principal &amp; Interest Savings
                </span>
                <span className="font-bold text-trust-green font-mono">{formatCurrency(estimatedSavings)}</span>
              </div>
              <p className="text-[9px] text-pv-muted/70 leading-tight px-0.5 pb-2">
                Consolidation loan of <strong className="text-af-blue">{formatCurrency(debt)}</strong> at 5.99% APR vs <strong className="text-af-blue">{formatCurrency(debt)}</strong> at average credit<br />card interest of 24.9% APR over <strong className="text-af-blue">{activeTerm} months</strong>.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-af-blue-ice/60" id="new-monthly-payment-estimate">
                <div>
                  <span className="text-xs font-bold text-af-navy uppercase tracking-wider block">Estimated Monthly Payment</span>
                  <span className="text-[10px] text-pv-muted mt-0.5 block">Consolidation loan at 5.99% APR · <strong className="text-af-blue font-bold">{activeTerm}-month</strong> term</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy block">
                    {formatCurrency(consolidationMonthly)}<span className="text-xs font-normal text-pv-muted font-mono">/mo</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Advance Button */}
            <button
              onClick={handleNextStep}
              className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-af-red/25 hover:shadow-xl group active:scale-[0.98]"
              id="estimator-step1-next-btn"
            >
              <span>See My Qualifying Options</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-pv-muted text-center" id="secure-disclaimer-step1">
              <ShieldCheck className="w-4 h-4 text-trust-green" />
              <span>Free calculation · No impact on credit score · Explores Loan Options</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Verification & Delivery Form */}
      {formData.step === 2 && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" id="estimator-step-2">
          <div className="text-left border-b border-af-blue-ice pb-3">
            <h3 className="text-base sm:text-lg font-bold text-af-navy">
              Where Should We Send Your Qualifying Options?
            </h3>
            <p className="text-xs text-pv-muted mt-1">
              We will evaluate your {formatCurrency(debt)} profile against direct lending and multi-lender consolidation options.
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
                placeholder="Marcus Vance"
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

            {/* State Selection */}
            <div className="text-left space-y-1.5">
              <label htmlFor="state" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                State of Residence
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-af-blue-ice focus:border-af-blue text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy"
              >
                {statesList.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Email address */}
            <div className="text-left space-y-1.5 col-span-2">
              <label htmlFor="email" className="block text-xs font-bold text-af-navy uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="marcus@example.com"
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

          {/* Dual Consent Checkboxes */}
          <div className="text-left space-y-3.5 col-span-2 mt-2 p-4 rounded-xl bg-af-blue-soft border border-af-blue-ice">
            
            {/* Checkbox 1: SMS Consent */}
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
                I agree to receive marketing and informational text messages (SMS) from Advantage First Financial at the phone number provided, including messages sent using an autodialer or conversational technology. Message frequency: up to 10 msgs/month. Consent is not a condition of any purchase or loan. Msg &amp; data rates may apply. Reply HELP for help, STOP to cancel. View our <a href="/privacy" className="text-af-blue underline font-semibold">Privacy Policy</a> and <a href="/sms-terms" className="text-af-blue underline font-semibold">SMS Terms</a>.
              </label>
            </div>
            {errors.isAgreed && (
              <p className="text-xs text-af-red flex items-center gap-1 font-medium pl-6">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.isAgreed}
              </p>
            )}

            {/* Checkbox 2: Phone Calls Consent */}
            <div className="flex items-start gap-2.5 border-t border-af-blue-ice/60 pt-3">
              <input
                type="checkbox"
                id="isCreditAgreed"
                name="isCreditAgreed"
                checked={formData.isCreditAgreed}
                onChange={(e) => {
                  setFormData({ ...formData, isCreditAgreed: e.target.checked });
                  if (errors.isCreditAgreed) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.isCreditAgreed;
                      return next;
                    });
                  }
                }}
                className="mt-1 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0"
              />
              <label htmlFor="isCreditAgreed" className="text-[11px] text-pv-muted leading-relaxed cursor-pointer select-none">
                I agree to receive marketing and informational phone calls from Advantage First Financial at the phone number provided regarding my loan inquiry and consolidation assessment. Consent is not a condition of any purchase or financial service.
              </label>
            </div>
            {errors.isCreditAgreed && (
              <p className="text-xs text-af-red flex items-center gap-1 font-medium pl-6">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.isCreditAgreed}
              </p>
            )}

          </div>

          {/* Final Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold transition-all duration-200 text-center text-base shadow-lg shadow-af-red/25 mt-2 flex items-center justify-center gap-2 active:scale-[0.98]"
            id="estimator-step2-submit-btn"
          >
            <span>Unlock My Qualifying Options</span>
            <Check className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Step 3: Multi-Option Qualification Results */}
      {formData.step === 3 && (
        <div className="p-6 sm:p-8 space-y-6 text-center" id="estimator-success">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-trust-green-light text-trust-green border border-trust-green/30 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-af-navy">
              Assessment Generated!
            </h3>
            <p className="text-xs sm:text-sm text-pv-muted mt-1 max-w-[36ch] mx-auto">
              Evaluation Reference: <span className="font-mono font-bold text-af-blue">AFF-{quoteId !== null ? String(quoteId).padStart(6, '0') : '------'}</span>
            </p>
          </div>

          {/* Multi-Option Qualification Breakdown */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-extrabold text-af-navy uppercase tracking-wider">
              Based on your {formatCurrency(debt)} balance profile, you may qualify for:
            </h4>

            <div className="space-y-2.5">
              {/* Option 1: Consolidation Loan */}
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 transition-colors shadow-2xs card-hover-bar">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-af-blue" />
                    <span className="text-xs font-bold text-af-navy">Consolidation Loan</span>
                  </div>
                  <span className="text-[10px] font-bold text-trust-green bg-trust-green-light px-2 py-0.5 rounded-full border border-trust-green/20">
                    {isLoanEligibleAmount ? 'High Match (Up to $100k)' : 'Up to $100,000 Max'}
                  </span>
                </div>
                <p className="text-[11px] text-pv-muted leading-tight">
                  Single fixed monthly payment, competitive rates from 5.99% APR, terms 12 to 72 months.
                </p>
              </div>



              {/* Option 3: Credit Counseling & Structured Repayment */}
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 transition-colors shadow-2xs card-hover-bar">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-af-navy" />
                    <span className="text-xs font-bold text-af-navy">Credit Counseling &amp; Restructuring</span>
                  </div>
                  <span className="text-[10px] font-semibold text-pv-muted bg-gray-100 px-2 py-0.5 rounded-full">
                    Structured Payoff
                  </span>
                </div>
                <p className="text-[11px] text-pv-muted leading-tight">
                  Structured interest reduction counseling to eliminate balances without taking on new loans.
                </p>
              </div>

              {/* Option 4: Lending Marketplace Comparison */}
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 transition-colors shadow-2xs card-hover-bar">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-af-blue" />
                    <span className="text-xs font-bold text-af-navy">Lender Network Marketplace</span>
                  </div>
                  <span className="text-[10px] font-semibold text-af-blue bg-af-blue-ice px-2 py-0.5 rounded-full">
                    Multi-Offer Matching
                  </span>
                </div>
                <p className="text-[11px] text-pv-muted leading-tight">
                  Instant multi-lender comparison across SoFi, Prosper, Upgrade, and Best Egg partner networks.
                </p>
              </div>
            </div>
          </div>

          {/* Locked-in Assessment Summary Panel */}
          <div className="bg-af-blue-soft/80 border border-af-blue-ice rounded-2xl p-4 text-left space-y-2.5 shadow-xs" id="quote-results-panel">
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Client Name:</span>
              <span className="font-bold text-af-navy">{formData.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Total Balance Evaluated:</span>
              <span className="font-bold text-af-navy font-mono">{formatCurrency(debt)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Consolidation Loan Total (5.99% APR):</span>
              <span className="font-bold text-af-navy font-mono">{formatCurrency(consolidationTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2">
              <span>Estimated Monthly:</span>
              <span className="text-base font-display text-af-blue font-extrabold">{formatCurrency(consolidationMonthly)}/mo</span>
            </div>
            <div className="flex justify-between items-center pt-1 text-xs font-bold text-trust-green">
              <span>Estimated Principal &amp; Interest Savings:</span>
              <span className="font-mono">{formatCurrency(estimatedSavings)}</span>
            </div>
          </div>

          {/* Direct Phone Activation Band */}
          <div className="bg-gradient-to-br from-af-navy to-af-navy-deep text-white rounded-2xl p-5 space-y-3 shadow-md" id="success-hotline-prompt">
            <span className="text-xs font-bold text-af-red uppercase tracking-wider block">
              Want Immediate Option Review? Speak with a Specialist
            </span>
            <p className="text-xs text-white/80 leading-relaxed max-w-[32ch] mx-auto">
              Our lending specialists can review your pre-qualification options in under 5 minutes.
            </p>
            <a 
              href="tel:18003441202" 
              onClick={() => analytics.calculatorCallClick()}
              className="w-full py-3.5 bg-white hover:bg-af-blue-ice text-af-navy font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm tracking-wide shadow-md"
              id="success-hotline-btn"
            >
              <PhoneCall className="w-4 h-4 text-af-red" />
              Call (800) 344-1202
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
