"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ZoomIn,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  certificateImage: string;
  description: string;
  skills: string[];
  category: string;
  verificationUrl?: string;
  scores?: Record<string, string>;
}

// Single Certificate Card on the Left with Outer Dotted Frame
function CertificateCardItem({
  cred,
  index,
  isActive,
  onActivate,
  onZoom,
}: {
  cred: CertificateItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onZoom: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onActivate]);

  const isJLPT = cred.id === "jlpt-n5";

  return (
    <div
      ref={itemRef}
      id={cred.id}
      className="w-full h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-6 px-2 sm:px-6"
    >
      {/* Outer Dotted Frame with Smooth Inactive Dissolve (Equal size matching description card) */}
      <div
        style={{
          transition: "opacity 500ms ease, transform 500ms ease, filter 500ms ease",
          opacity: isActive ? 1 : 0.35,
          transform: isActive ? "scale(1)" : "scale(0.96)",
          filter: isActive ? "blur(0px)" : "blur(2px)",
        }}
        className={`w-full max-w-[530px] h-[450px] p-3.5 rounded-2xl ${
          isJLPT
            ? "border-2 border-dashed border-amber-400/50 bg-amber-500/[0.02] shadow-[0_0_35px_rgba(245,158,11,0.15)]"
            : "border-2 border-dashed border-cyan-400/45 bg-gradient-to-b from-cyan-500/[0.04] to-transparent shadow-[0_0_40px_rgba(34,211,238,0.18)]"
        }`}
      >
        {/* Certificate Container with Zoom Click (Expands to fill 530px x 450px completely) */}
        <div
          onClick={() => {
            soundManager.playClick(900);
            onZoom();
          }}
          className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl group cursor-pointer"
        >
          {/* Ambient subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 z-10 pointer-events-none" />

          {/* Certificate Image */}
          <Image
            src={cred.certificateImage}
            alt={cred.title}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 530px"
            className="object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Hover Zoom Overlay Banner */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 border border-white/20 text-white text-xs font-semibold shadow-2xl backdrop-blur-md">
              <ZoomIn className="w-4 h-4 text-cyan-400" />
              <span>Click to Enlarge</span>
            </span>
          </div>

          {/* Corner Badge */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md ${
                isJLPT
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"
              }`}
            >
              {isJLPT ? "JLPT 94.0%" : "Role Certified"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile-Only Info Details */}
      <div className="mt-6 block lg:hidden w-full max-w-2xl px-2">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {cred.skills.map((skill) => (
            <span
              key={skill}
              className="text-[9px] font-bold uppercase tracking-wider border border-white/15 bg-white/5 px-2.5 py-0.5 rounded-full text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-light text-white mb-1">{cred.title}</h2>
        <p className="text-sm text-white/50 mb-3 font-serif italic">
          {cred.issuer} — {cred.issueDate}
        </p>
        <p className="text-gray-300 text-xs leading-relaxed">{cred.description}</p>
      </div>
    </div>
  );
}

// Fullscreen Zoom Modal (Safe positioning below navbar with clean fit)
function CertificateModal({
  cred,
  onClose,
}: {
  cred: CertificateItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center p-3 sm:p-6 pt-24 sm:pt-28 pb-6 bg-black/90 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[82vh] flex flex-col rounded-2xl bg-[#080c14] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
          <div>
            <h2 className="text-sm sm:text-base font-light text-white">{cred.title}</h2>
            <p className="text-xs text-cyan-400 mt-0.5 font-serif italic">
              {cred.issuer} • ID: {cred.credentialId}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image View (constrained to 56vh so modal fits nicely) */}
        <div className="relative flex-1 min-h-[300px] max-h-[58vh] bg-[#05070c] p-3 sm:p-5 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-[52vh] max-h-[52vh]">
            <Image
              src={cred.certificateImage}
              alt={cred.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Clean Footer Bar (No verify button) */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-black/70 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/70 font-mono">Official Verified Credential Record</span>
          </div>
          <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
            Click outside or press ESC to close
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CredentialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomingId, setZoomingId] = useState<string | null>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const credentials = portfolioData.credentials as CertificateItem[];
  const activeModalCred = credentials.find((c) => c.id === zoomingId);

  const scrollToCert = (index: number) => {
    soundManager.playClick(900);
    setActiveIndex(index);
    isAutoScrollingRef.current = true;
    if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    autoScrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 900);

    const target = credentials[index];
    if (target) {
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleActivate = (index: number) => {
    if (isAutoScrollingRef.current) return;
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background ambient gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-0 flex flex-col font-sans">
        <main className="flex-1 px-4 pt-28 sm:pt-32 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Two-Column Symmetrical Layout (Equal width & height tabs) */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-10">
              {/* Left Column: Scrollable Certificates (50% Column, Photo Tab) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center pb-24 lg:pb-36">
                {/* Mobile Title (Clean without verifiable proof or quick tabs) */}
                <div className="lg:hidden mb-8 text-center pt-4">
                  <h1 className="text-4xl font-light tracking-tight text-white">
                    My <span className="font-serif italic text-white/80">Credentials</span>
                  </h1>
                </div>

                {/* Certificates List */}
                {credentials.map((cred, index) => (
                  <CertificateCardItem
                    key={cred.id}
                    cred={cred}
                    index={index}
                    isActive={index === activeIndex}
                    onActivate={() => handleActivate(index)}
                    onZoom={() => setZoomingId(cred.id)}
                  />
                ))}
              </div>

              {/* Right Column: Sticky Detail Card (50% Column, Equal Size matching Photo Tab) */}
              <div className="hidden lg:flex w-full lg:w-1/2 sticky top-32 h-[calc(100vh-8rem)] flex-col justify-center items-center">
                {/* Sticky Glass Details Card with Seamless Smooth Directional Cross-Fade */}
                <div
                  className="p-6 sm:p-7 lg:p-7 bg-white/[0.03] backdrop-blur-md rounded-2xl border relative w-full max-w-[530px] h-[450px] flex flex-col justify-center"
                  style={{
                    borderColor: activeIndex === 1 ? "rgba(245, 158, 11, 0.3)" : "rgba(34, 211, 238, 0.3)",
                    boxShadow:
                      activeIndex === 1
                        ? "0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(245, 158, 11, 0.08)"
                        : "0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(34, 211, 238, 0.08)",
                    transition: "border-color 750ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 750ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Title positioned cleanly above the card */}
                  <div className="absolute bottom-full left-1 mb-5">
                    <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-white leading-none">
                      My <span className="font-serif italic text-white/80">Credentials</span>
                    </h1>
                  </div>

                  {/* Transition Stack for Both Credentials */}
                  <div className="relative w-full h-[385px] overflow-hidden">
                    {credentials.map((cred, idx) => {
                      const isCurrent = idx === activeIndex;
                      const isJLPT = cred.id === "jlpt-n5";

                      return (
                        <div
                          key={cred.id}
                          className="absolute inset-0 flex flex-col justify-between"
                          style={{
                            transitionProperty: "opacity, transform, filter",
                            transitionDuration: "750ms",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            opacity: isCurrent ? 1 : 0,
                            transform: isCurrent
                              ? "translateY(0px) scale(1)"
                              : idx < activeIndex
                              ? "translateY(-16px) scale(0.98)"
                              : "translateY(16px) scale(0.98)",
                            filter: isCurrent ? "blur(0px)" : "blur(3px)",
                            pointerEvents: isCurrent ? "auto" : "none",
                            zIndex: isCurrent ? 10 : 0,
                          }}
                        >
                          <div>
                            {/* Category Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-2.5">
                              {cred.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[9.5px] font-bold uppercase tracking-wider border border-white/15 bg-white/5 px-2.5 py-0.5 rounded-full text-white/70"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Title & Subtitle */}
                            <h2 className="text-xl sm:text-2xl font-light text-white leading-tight mb-1">
                              {cred.title}
                            </h2>
                            <p
                              className={`text-sm mb-2.5 font-serif italic transition-colors duration-700 ${
                                isJLPT ? "text-amber-300/90" : "text-cyan-400/90"
                              }`}
                            >
                              {cred.issuer} — {cred.issueDate}
                            </p>

                            {/* Description */}
                            <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed mb-3 font-light">
                              {cred.description}
                            </p>
                          </div>

                          {/* Detailed Scores / Credential ID Grid (Comfortably inside bounds) */}
                          <div className="p-3 sm:p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5 mt-auto">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-white/40">Credential ID:</span>
                              <span className="text-white font-semibold">{cred.credentialId}</span>
                            </div>

                            {cred.id === "hackerrank-swe" && cred.scores && (
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08] text-[11px] font-mono">
                                <div>
                                  <span className="text-white/40 block">Assessment:</span>
                                  <span className="text-cyan-300 font-bold">{cred.scores.status}</span>
                                </div>
                                <div>
                                  <span className="text-white/40 block">Role Verified:</span>
                                  <span className="text-cyan-300 font-bold">{cred.scores.role}</span>
                                </div>
                              </div>
                            )}

                            {cred.id === "jlpt-n5" && cred.scores && (
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08] text-[11px] font-mono">
                                <div>
                                  <span className="text-white/40 block">Total Score:</span>
                                  <span className="text-amber-300 font-bold">{cred.scores.total}</span>
                                </div>
                                <div>
                                  <span className="text-white/40 block">Global Percentile:</span>
                                  <span className="text-amber-300 font-bold">{cred.scores.percentile}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vertical Navigation Dots on the Right Edge with Soft Glow */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {credentials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => scrollToCert(i)}
                        className="flex items-center justify-center p-1.5 cursor-pointer"
                        aria-label={`Go to credential ${i + 1}`}
                      >
                        <div
                          className="rounded-full"
                          style={{
                            transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                            width: i === activeIndex ? "10px" : "6px",
                            height: i === activeIndex ? "10px" : "6px",
                            backgroundColor:
                              i === activeIndex
                                ? activeIndex === 1
                                  ? "#fbbf24"
                                  : "#22d3ee"
                                : "rgba(255, 255, 255, 0.25)",
                            boxShadow:
                              i === activeIndex
                                ? activeIndex === 1
                                  ? "0 0 14px rgba(251, 191, 36, 0.9)"
                                  : "0 0 14px rgba(34, 211, 238, 0.9)"
                                : "none",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with ScrollReveal */}
            <ScrollReveal delayMs={100}>
              <Footer />
            </ScrollReveal>
          </div>
        </main>
      </div>

      {/* Fullscreen Certificate Zoom Modal (Rendered outside stacking context with z-[999999]) */}
      {zoomingId && activeModalCred && (
        <CertificateModal
          cred={activeModalCred}
          onClose={() => setZoomingId(null)}
        />
      )}
    </div>
  );
}
