'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What types of loans does Advantage First connect me with?',
      category: 'Loan Products',
      answer: 'Advantage First connects you with top-tier lending partners offering personal loans, consolidation loans, home improvement loans, and business-purpose loans. Loan amounts range up to $100,000 with competitive fixed rates starting as low as 5.99% APR and flexible repayment terms from 12 to 72 months.',
    },
    {
      question: 'Will checking my loan options affect my credit score?',
      category: 'Credit & Privacy',
      answer: 'No. Checking your pre-qualified loan options with Advantage First involves a soft credit inquiry, which has zero impact on your credit score. A hard credit check is only initiated later if you formally accept and finalize a specific loan contract with a chosen lending partner.',
    },
    {
      question: 'How fast can I receive funds into my bank account?',
      category: 'Funding Process',
      answer: 'Many lenders across our network provide automated, instant pre-approval decisions. Once you select an offer and complete basic income verification, funds are typically deposited directly into your designated bank account within 24 to 48 business hours.',
    },
    {
      question: 'Are there any hidden fees or prepayment penalties?',
      category: 'Fees & Transparency',
      answer: 'Advantage First operates with 100% pricing transparency. We charge zero upfront fees for using our comparison platform. Additionally, lending partners in our network do not charge prepayment penalties — allowing you to pay off your balance early anytime with zero penalty.',
    },
    {
      question: 'How do fixed-rate consolidation loans help me save money?',
      category: 'Consolidation Strategy',
      answer: 'Credit cards typically carry variable 20%–29% interest rates that compound continuously. By consolidating high-interest balances into a single, low fixed-rate personal loan (as low as 5.99% APR), more of your monthly payment goes toward principal rather than interest, saving thousands of dollars and cutting years off your repayment timeline.',
    },
  ];

  const toggleFaq = (index: number) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(activeIndex === index ? null : index);
    if (isOpening) {
      analytics.faqItemOpen(faqs[index].question);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="faq-objection-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20" id="faq-header">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-xs mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">
              Got Questions?
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-3 leading-relaxed">
            Everything you need to know about our loan options, interest rates, and approval process.
          </p>
        </div>

        {/* Accordion Panels */}
        <div className="space-y-4" id="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all duration-200 overflow-hidden card-hover-bar ${
                  isOpen 
                    ? 'bg-white border-af-blue/50 shadow-md shadow-af-blue/5 ring-1 ring-af-blue/20' 
                    : 'bg-white/80 hover:bg-white border-af-blue-ice shadow-xs'
                }`}
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-trigger-${idx}`}
                >
                  <div className="pr-4 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-af-blue bg-af-blue-ice px-2 py-0.5 rounded-md">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-af-navy text-base sm:text-lg tracking-tight pt-1">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'bg-af-blue text-white rotate-180' : 'bg-af-blue-soft text-af-navy'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${idx}`} 
                    className="px-6 sm:px-8 pb-6 pt-1 text-sm text-pv-muted leading-relaxed border-t border-af-blue-ice/60 bg-af-blue-soft/30"
                  >
                    <p className="max-w-[75ch]">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Advisor Callout Box */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-af-blue-ice shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left" id="faq-advisor-cta">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-af-blue-soft text-af-blue flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-af-navy">
                Have a specific question about your loan options?
              </h4>
              <p className="text-xs text-pv-muted">
                Speak directly with an Advantage First specialist at no cost.
              </p>
            </div>
          </div>

          <a 
            href="tel:18003441202" 
            onClick={() => analytics.faqCallClick()}
            className="flex-shrink-0 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white font-bold text-xs tracking-wide transition-colors duration-200 flex items-center gap-2"
          >
            <span>Call (800) 344-1202</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
