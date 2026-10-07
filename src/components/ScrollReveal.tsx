"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  initialVisible?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  initialVisible = false,
}: ScrollRevealProps) {
  const [hasAppeared, setHasAppeared] = useState(initialVisible);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialVisible || hasAppeared) return;

    const el = elementRef.current;
    if (!el) return;

    // Trigger when element enters lower 10% of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [initialVisible, hasAppeared]);

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: "800ms",
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all transform ${
        hasAppeared
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.98] pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
}
