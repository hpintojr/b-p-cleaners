'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';

const WORDS = [
  { text: 'financial freedom', highlight: 'from-af-blue to-af-blue-cyan' },
  { text: 'loan consolidation', highlight: 'from-af-red to-[#FF6B6B]' },
  { text: 'home improvements', highlight: 'from-af-navy to-af-blue' },
  { text: 'business growth', highlight: 'from-[#059669] to-trust-green' },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function TypewriterHeader() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('financial freedom');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Initial pause on the full server-rendered phrase before cycling begins
    if (!isStarted) {
      const initialDelay = setTimeout(() => {
        setIsDeleting(true);
        setIsStarted(true);
      }, 2600);
      return () => clearTimeout(initialDelay);
    }

    const currentItem = WORDS[currentWordIndex];
    const fullWord = currentItem.text;
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullWord.substring(0, displayedText.length - 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
        }, 100);
      }
    } else {
      if (displayedText.length < fullWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullWord.substring(0, displayedText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, prefersReducedMotion, isStarted]);

  const currentHighlight = WORDS[currentWordIndex].highlight;

  return (
    <div id="hero-headline-container">
      <h1 
        className="font-display text-[41px] sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.03em] text-af-navy leading-[1.08] h-[90px] sm:h-auto sm:min-h-[110px] lg:min-h-[140px] overflow-hidden" 
        id="typewriter-h1"
      >
        Get the Advantage of{' '}
        <br className="hidden lg:block" />
        <span className="inline-block relative">
          <span 
            className={`bg-gradient-to-r ${currentHighlight} bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm`}
            id="typed-text-span"
          >
            {prefersReducedMotion ? 'financial freedom' : displayedText}
          </span>
          {!prefersReducedMotion && (
            <span 
              className="inline-block w-1 sm:w-1.5 h-[80%] bg-af-red align-middle ml-1 rounded-full animate-pulse" 
              style={{ animationDuration: '0.85s' }}
              id="cursor-blink" 
            />
          )}
        </span>
      </h1>
    </div>
  );
}
