'use client';

/**
 * Global Scroll Depth Tracker
 * 
 * Fires analytics events at 25%, 50%, 75%, and 100% scroll depth.
 * Each threshold fires only once per page load.
 */

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

export default function ScrollDepthTracker() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of thresholds) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          analytics.scrollDepth(threshold);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
