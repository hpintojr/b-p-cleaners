'use client';

/**
 * PostHog Analytics Provider
 *
 * Wraps the app to initialize PostHog tracking.
 * Auto-captures page views and enables custom event tracking.
 *
 * Reads the project API key from NEXT_PUBLIC_POSTHOG_KEY (see .env.example).
 * No key = analytics silently disabled — never falls back to a hardcoded
 * key, since that would send B&P Cleaners traffic to someone else's
 * PostHog project.
 */

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

// Only initialize if a real project key is configured via env vars
const isConfigured = POSTHOG_API_KEY.length > 0;

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
