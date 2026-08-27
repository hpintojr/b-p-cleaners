'use client';

/**
 * Hook to track when a section scrolls into view (fires once per session).
 * Uses IntersectionObserver for performance.
 */

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

export function useTrackVisibility(sectionId: string) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasFired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          analytics.sectionVisible(sectionId);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return ref;
}
