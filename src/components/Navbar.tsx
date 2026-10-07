"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeFlashlight } from "@/context/ThemeFlashlightContext";
import { soundManager } from "@/utils/sound";
import {
  Home,
  Volume2,
  VolumeX,
  Menu,
  X,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const {
    isFlashlightOn,
    isAmbientPlaying,
    toggleFlashlight,
    toggleAmbient,
    setCmdKOpen,
  } = useThemeFlashlight();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Projects", href: "/projects" },
    { name: "Credentials", href: "/credentials" },
    { name: "Craft", href: "/skills" },
    { name: "Iris", href: "/iris" },
    { name: "Stream", href: "/visitorbook" },
  ];

  const handleLinkClick = () => {
    soundManager.playClick(900);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pt-2 sm:pt-4 pb-2 sm:pb-4 px-3 sm:px-0">
        <div className="w-full sm:w-auto h-12 sm:h-14 transition-all duration-500">
          <div className="relative flex items-center justify-between sm:justify-center overflow-visible w-full h-full rounded-[22px] px-3 sm:px-6 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            
            {/* Signature Logo & Brand */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 mr-2 sm:mr-5 text-white group cursor-pointer"
            >
              {/* Logo matching original website squircle with stylish fancy K */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#04060a] via-[#080d1a] to-[#020306] border border-cyan-400/40 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_18px_rgba(56,189,248,0.65)] group-hover:border-cyan-300 transition-all duration-300 shrink-0">
                <span className="font-agustina text-xl sm:text-2xl text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] select-none leading-none pt-0.5">
                  K
                </span>
              </div>

              {/* Karunya brand name */}
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors whitespace-nowrap">
                Karunya
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`relative px-3 py-1.5 transition-all duration-200 text-[11px] lg:text-xs font-semibold uppercase tracking-wider flex items-center justify-center ${
                      isActive
                        ? "text-white font-bold"
                        : "text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
                    }`}
                  >
                    {link.icon ? link.icon : link.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)]" />
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-5 w-[1px] bg-white/10 mx-2 hidden md:block" />

              {/* 1. Live Greeting Pill ("Good evening / afternoon / morning" comes first) */}
              <div className="hidden md:flex items-center gap-2 px-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-xs text-white/80 font-medium whitespace-nowrap">
                  {greeting}
                </span>
              </div>

              {/* Divider */}
              <div className="h-5 w-[1px] bg-white/10 mx-2 hidden md:block" />

              {/* 2. Sound & Darkest Mode (Appear AFTER Good Evening) */}
              <div className="hidden md:flex items-center gap-2">
                {/* Audio Toggle */}
                <button
                  onClick={toggleAmbient}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer relative group ${
                    isAmbientPlaying ? "text-purple-300 bg-purple-500/15" : "text-white/60 hover:text-white"
                  }`}
                  aria-label="Toggle ambient void sound"
                  title="Toggle Void Drone Sound"
                >
                  {isAmbientPlaying ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4" />}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 border border-white/20 text-[10px] text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none z-50">
                    {isAmbientPlaying ? "Mute Sound" : "Play Sound"}
                  </span>
                </button>

                {/* Premium Purple Darkest Mode Button */}
                <button
                  onClick={toggleFlashlight}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    isFlashlightOn
                      ? "bg-purple-900/80 border-purple-400 text-purple-100 shadow-[0_0_22px_rgba(168,85,247,0.65)] ring-1 ring-purple-400/40"
                      : "bg-gradient-to-r from-purple-950/70 via-purple-900/50 to-purple-950/70 border-purple-500/50 text-purple-200 hover:text-white hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)]"
                  }`}
                  aria-label="Toggle Darkest Mode"
                >
                  <Moon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12 ${
                    isFlashlightOn
                      ? "text-purple-200 fill-purple-300/50"
                      : "text-purple-300 fill-purple-400/30 group-hover:fill-purple-300/50"
                  }`} />
                  <span className="text-[11px] font-bold tracking-wider uppercase font-mono text-purple-200 group-hover:text-white transition-colors whitespace-nowrap">
                    Darkest Mode
                  </span>
                  {isFlashlightOn && (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  )}

                  {/* Tooltip: You haven't seen anything yet... */}
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap bg-black/95 border border-purple-500/60 text-[10px] font-mono text-purple-200 px-3 py-1 rounded-md shadow-[0_8px_25px_rgba(168,85,247,0.3)]">
                    You haven&apos;t seen anything yet...
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Controls & Hamburger */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={toggleAmbient}
                className={`p-1.5 rounded-lg transition-colors ${
                  isAmbientPlaying ? "text-purple-300 bg-purple-500/15" : "text-white/60"
                }`}
                aria-label="Toggle ambient sound"
              >
                {isAmbientPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFlashlight}
                className={`p-1.5 rounded-lg border transition-all ${
                  isFlashlightOn
                    ? "bg-purple-900/60 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                    : "bg-purple-950/50 border-purple-500/40 text-purple-300"
                }`}
                aria-label="Toggle Darkest Mode"
                title="Darkest Mode"
              >
                <Moon className="w-4 h-4 fill-purple-400/20" />
              </button>
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-18 right-4 left-4 z-40 md:hidden animate-fade-in">
          <div className="backdrop-blur-2xl bg-black/85 border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
                    isActive
                      ? "bg-white/10 text-white font-bold border border-blue-500/30"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon ? link.icon : <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,1)]" />
                  )}
                </Link>
              );
            })}

            <div className="border-t border-white/10 pt-3 mt-2 flex items-center justify-between px-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{greeting}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={toggleAmbient} className="p-1.5 rounded-lg text-white/80" aria-label="Toggle sound">
                  {isAmbientPlaying ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
