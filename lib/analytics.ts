/**
 * ════════════════════════════════════════════════════════
 *  ANALYTICS ENGINE — Conversion & Engagement Event Tracking
 * ════════════════════════════════════════════════════════
 * 
 *  Central analytics module. Import and call these functions from
 *  any component to fire tracked events to PostHog.
 * 
 *  All events are prefixed by section for easy filtering:
 *    navbar_*, hero_*, calculator_*, stats_*, lender_*, process_*,
 *    loan_*, trustbar_*, testimonial_*, blog_*, faq_*, closing_*, footer_*
 * ════════════════════════════════════════════════════════
 */

import posthog from 'posthog-js';

/** Safe capture — only fires if PostHog is initialized */
function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(event, properties);
  }
}

// ──────────────────────────────────────────────────
//  NAVBAR
// ──────────────────────────────────────────────────

export const analytics = {
  // Navbar
  navbarCallClick: (device: 'mobile' | 'desktop') =>
    capture('navbar_call_click', { device }),
  navbarApplyClick: (device: 'mobile' | 'desktop') =>
    capture('navbar_apply_click', { device }),
  navbarLogoClick: () =>
    capture('navbar_logo_click'),
  navbarLinkClick: (link: string) =>
    capture('navbar_link_click', { link }),

  // Hero
  heroCtaClick: () =>
    capture('hero_cta_click'),

  // Hero Reviews
  heroReviewVisible: () =>
    capture('hero_review_visible'),
  heroReviewClick: (reviewerName: string) =>
    capture('hero_review_click', { reviewer_name: reviewerName }),

  // Calculator / Estimator
  calculatorSliderChange: (amount: number) =>
    capture('calculator_slider_change', { amount }),
  calculatorTermSelect: (term: number) =>
    capture('calculator_term_select', { term }),
  calculatorEstimateViewed: (data: { amount: number; term: number; monthlyPayment: number; savings: number }) =>
    capture('calculator_estimate_viewed', data),
  calculatorConsentChecked: (type: 'sms' | 'communications') =>
    capture('calculator_consent_checked', { consent_type: type }),
  calculatorSubmit: (data: { amount: number; term: number; monthlyPayment: number; savings: number }) =>
    capture('calculator_submit', { ...data, conversion: true }),
  calculatorCallClick: () =>
    capture('calculator_call_click'),
  calculatorStepAdvance: (fromStep: number, toStep: number) =>
    capture('calculator_step_advance', { from_step: fromStep, to_step: toStep }),

  // Stats Row
  statsSectionVisible: () =>
    capture('stats_section_visible'),

  // Lender Comparison
  lenderTableVisible: () =>
    capture('lender_table_visible'),
  lenderCompareClick: (lender: string) =>
    capture('lender_compare_click', { lender }),
  lenderUnlockAllClick: () =>
    capture('lender_unlock_all_click'),

  // Process Steps
  processSectionVisible: () =>
    capture('process_section_visible'),
  processGetRateClick: () =>
    capture('process_get_rate_click'),

  // Loan Solutions
  loanCardClick: (loanType: string) =>
    capture('loan_card_click', { loan_type: loanType }),
  loanCardCtaClick: (loanType: string) =>
    capture('loan_card_cta_click', { loan_type: loanType }),

  // TrustBar
  trustbarVisible: () =>
    capture('trustbar_visible'),
  trustbarNmlsClick: () =>
    capture('trustbar_nmls_click'),

  // Testimonials
  testimonialSectionVisible: () =>
    capture('testimonial_section_visible'),
  testimonialCardClick: (reviewer: string) =>
    capture('testimonial_card_click', { reviewer }),

  // Blog Preview
  blogSectionVisible: () =>
    capture('blog_section_visible'),
  blogArticleClick: (data: { slug: string; title: string; category: string }) =>
    capture('blog_article_click', data),
  blogViewAllClick: () =>
    capture('blog_view_all_click'),
  newsletterEmailSubmit: () =>
    capture('newsletter_email_submit', { conversion: true }),

  // FAQ
  faqSectionVisible: () =>
    capture('faq_section_visible'),
  faqItemOpen: (question: string) =>
    capture('faq_item_open', { question }),
  faqCallClick: () =>
    capture('faq_call_click'),

  // Closing CTA
  closingCtaVisible: () =>
    capture('closing_cta_visible'),
  closingCtaApplyClick: () =>
    capture('closing_cta_apply_click', { conversion: true }),
  closingCtaCallClick: () =>
    capture('closing_cta_call_click', { conversion: true }),

  // Footer
  footerLinkClick: (link: string) =>
    capture('footer_link_click', { link }),
  footerCallClick: () =>
    capture('footer_call_click', { conversion: true }),
  footerEmailClick: () =>
    capture('footer_email_click'),

  // Blog Pages
  blogListFilter: (category: string) =>
    capture('blog_list_filter', { category }),
  blogListSearch: (query: string) =>
    capture('blog_list_search', { query }),
  articleReadStart: (data: { slug: string; title: string; category: string }) =>
    capture('article_read_start', data),
  articleScroll: (slug: string, percent: 25 | 50 | 75 | 100) =>
    capture(`article_scroll_${percent}`, { slug }),
  articleCtaClick: (slug: string, ctaType: string) =>
    capture('article_cta_click', { slug, cta_type: ctaType }),

  // Generic section visibility (reusable)
  sectionVisible: (sectionId: string) =>
    capture('section_visible', { section: sectionId }),

  // Scroll depth
  scrollDepth: (percent: number) =>
    capture('scroll_depth', { percent }),

  // Trustpilot
  trustpilotReviewClick: (data: { reviewer: string; title: string; location: string }) =>
    capture('trustpilot_review_click', data),
  trustpilotLinkClick: (location: string) =>
    capture('trustpilot_link_click', { location }),

  // BBB
  bbbBadgeClick: (location: string) =>
    capture('bbb_badge_click', { location }),

  // Blog Article Page — View & Read Time
  blogArticleView: (data: { slug: string; title: string; category: string }) =>
    capture('blog_article_view', data),
  blogArticleReadTime: (data: { slug: string; title: string; category: string; read_time_seconds: number }) =>
    capture('blog_article_read_time', data),
};
