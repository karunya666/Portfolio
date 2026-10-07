"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import { Github, Linkedin } from "@/components/Icons";
import { MessageSquare, ArrowUpRight, Code } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 mt-12 border-t border-white/10 select-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Call to action */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-white/50 font-medium">Enjoyed your stay?</p>
            <Link
              href="/visitorbook"
              onClick={() => soundManager.playClick(900)}
              className="text-sm font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
            >
              <span>Drop your thoughts at Stream</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center: Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/70 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span>IIIT Una • B.Tech CSE (2023 - Present)</span>
        </div>

        {/* Right: Social & Copyright */}
        <div className="flex flex-col md:items-end gap-2 text-xs text-white/50">
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(1000)}
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(1000)}
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(1000)}
              className="hover:text-white transition-colors"
            >
              LeetCode
            </a>
            <a
              href={portfolioData.socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick(1000)}
              className="hover:text-white transition-colors"
            >
              Resume
            </a>
          </div>
          <p className="font-mono text-[11px]">
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
