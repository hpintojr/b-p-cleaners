'use client';

import React, { useRef, useEffect, useState } from 'react';

/**
 * GlowMovingButton — Animated border glow using a dynamically-generated
 * SVG path() that traces the pill perimeter. SVG paths are properly
 * arc-length parameterized, giving truly uniform speed.
 */
interface GlowMovingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
}

function buildPillPath(w: number, h: number): string {
  const r = Math.min(h / 2, w / 2);
  // Trace clockwise: top-left → top-right → right curve → bottom-right → bottom-left → left curve
  return [
    `M ${r},0`,
    `L ${w - r},0`,
    `A ${r},${r} 0 0,1 ${w},${r}`,
    `A ${r},${r} 0 0,1 ${w - r},${h}`,
    `L ${r},${h}`,
    `A ${r},${r} 0 0,1 0,${h - r}`,
    `A ${r},${r} 0 0,1 ${r},0`,
    'Z',
  ].join(' ');
}

export default function GlowMovingButton({
  children,
  onClick,
  href,
  className = '',
  id,
}: GlowMovingButtonProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [pillPath, setPillPath] = useState<string | null>(null);

  // Measure button and build SVG path
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setPillPath(buildPillPath(width, height));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start animation once path is ready
  useEffect(() => {
    const el = dotRef.current;
    if (!el || !pillPath) return;

    el.style.offsetPath = `path('${pillPath}')`;

    const anim = el.animate(
      [{ offsetDistance: '0%' }, { offsetDistance: '100%' }],
      {
        duration: 5000,
        iterations: Infinity,
        easing: 'linear',
      }
    );

    return () => anim.cancel();
  }, [pillPath]);

  const inner = (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-af-red to-[#E63935] ${className}`}
      id={id}
    >
      {/* Animated border mask layer */}
      <div
        className="pointer-events-none absolute rounded-[inherit]"
        style={{
          inset: '-1px',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          maskClip: 'padding-box, border-box',
          WebkitMaskClip: 'padding-box, border-box',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          maskImage: 'linear-gradient(transparent,transparent), linear-gradient(#000,#000)',
          WebkitMaskImage: 'linear-gradient(transparent,transparent), linear-gradient(#000,#000)',
        }}
      >
        <div
          ref={dotRef}
          className="absolute"
          style={{
            width: 200,
            height: 30,
            background: 'linear-gradient(to right, transparent 0%, rgba(15,117,188,0.1) 30%, rgba(15,117,188,0.5) 70%, rgba(15,117,188,1) 100%)',
          }}
        />
      </div>

      {/* Text content */}
      <span className="relative z-10">{children}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick as any} className="inline-block">
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block" type="button">
      {inner}
    </button>
  );
}
