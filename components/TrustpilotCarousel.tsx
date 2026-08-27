'use client';

import { useEffect, useRef } from 'react';

/**
 * TrustpilotCarousel — renders the live Trustpilot Carousel widget
 * using data attributes from the official TrustBox embed code.
 *
 * The Trustpilot bootstrap script (loaded in layout.tsx) scans for
 * `.trustpilot-widget` divs and initialises them automatically.
 * If the component mounts after the script has already loaded, we
 * manually call `window.Trustpilot.loadFromElement`.
 */
export default function TrustpilotCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the Trustpilot bootstrap script has already loaded, manually
    // initialise the widget element.
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
      data-template-id="539ad60defb9600b94d7df2c"
      data-businessunit-id="64f10ba8d79983d2c4f6adc6"
      data-style-height="350px"
      data-style-width="100%"
      data-token="1472e5f0-d4b8-4e02-b0d2-1e93410a6a1c"
      data-stars="4,5"
      data-review-languages="en"
      data-grid-columns="2"
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
