'use client';

import { useEffect, useRef } from 'react';

/**
 * TrustpilotMini — renders the live Trustpilot "Mini" widget
 * which displays the live star rating and total review count.
 * Designed for dark backgrounds (TrustBar section).
 */
export default function TrustpilotMini() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window as any).Trustpilot &&
      ref.current
    ) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="64f10ba8d79983d2c4f6adc6"
      data-style-height="150px"
      data-style-width="100%"
      data-theme="dark"
      data-stars="4,5"
      data-review-languages="en"
    >
      <a
        href="https://www.trustpilot.com/review/adv1st.com"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}
