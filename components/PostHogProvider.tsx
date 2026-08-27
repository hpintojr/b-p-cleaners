'use client';

/**
 * PostHog Analytics Provider
 * 
 * Wraps the app to initialize PostHog tracking.
 * Auto-captures page views and enables custom event tracking.
 * 
 * Replace POSTHOG_API_KEY with your actual PostHog project API key.
 */

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ══════════════════════════════════════════════════════════════════
//  CONFIGURATION — Replace with your PostHog project API key
// ════════════════════════════════════════════════════════════════
const POSTHOG_API_KEY = 'phc_qaSHwuNdLr4zzkKG9RHF22q9EaXGfksHu7eJJwNFHpnK';
const POSTHOG_HOST = 'https://us.i.posthog.com'; // US cloud; use 'https://eu.i.posthog.com' for EU

// Only initialize if we have a real key (not the placeholder)
const isConfigured = !POSTHOG_API_KEY.includes('REPLACE');

if (typeof window !== 'undefined' && isConfigured) {
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,       // We handle this manually for SPA routing
    capture_pageleave: true,       // Track when users leave
    autocapture: true,             // Auto-capture clicks, form submits, etc.
    persistence: 'localStorage',
  });
}

/**
 * Tracks page views on SPA route changes.
 * Must be wrapped in Suspense — useSearchParams() requires it for static generation.
 */
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isConfigured) return;
    
    let url = window.origin + pathname;
    const search = searchParams.toString();
    if (search) url += '?' + search;

    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!isConfigured) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
