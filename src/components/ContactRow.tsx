"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import {
  Github,
  Linkedin,
  LeetCodeMonochrome,
  CodeChefMonochrome,
  CodeforcesMonochrome,
} from "@/components/Icons";
import { FileText, Mail } from "lucide-react";

interface ContactTile {
  letter: string;
  name: string;
  href: string;
  icon: React.ReactNode;
  isDownload?: boolean;
}

export default function ContactRow() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const tiles: ContactTile[] = [
    {
      letter: "C",
      name: "LinkedIn",
      href: portfolioData.socialLinks.linkedin,
      icon: <Linkedin className="w-5 h-5 text-white" />,
    },
    {
      letter: "O",
      name: "GitHub",
      href: portfolioData.socialLinks.github,
      icon: <Github className="w-5 h-5 text-white" />,
    },
    {
      letter: "N",
      name: "Resume",
      href: portfolioData.socialLinks.resume,
      icon: <FileText className="w-5 h-5 text-white" />,
      isDownload: true,
    },
    {
      letter: "T",
      name: "Email",
      href: portfolioData.socialLinks.email,
      icon: <Mail className="w-5 h-5 text-white" />,
    },
    {
      letter: "A",
      name: "LeetCode (Rating: 1706)",
      href: portfolioData.socialLinks.leetcode,
      icon: <LeetCodeMonochrome className="w-5 h-5 text-white" />,
    },
    {
      letter: "C",
      name: "CodeChef (3★)",
      href: portfolioData.socialLinks.codechef,
      icon: <CodeChefMonochrome className="w-5 h-5 text-white" />,
    },
    {
      letter: "T",
      name: "Codeforces (Specialist)",
      href: portfolioData.socialLinks.codeforces,
      icon: <CodeforcesMonochrome className="w-5 h-5 text-white" />,
    },
  ];

  const handleTileClick = (href: string) => {
    soundManager.playClick(950);
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {tiles.map((tile, idx) => {
          const isFlipped = flippedIndex === idx;

          return (
            <a
              key={idx}
              href={tile.href}
              target={tile.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              download={tile.isDownload ? "Karunya_Resume.pdf" : undefined}
              onMouseEnter={() => {
                setFlippedIndex(idx);
                soundManager.playClick(1100);
              }}
              onMouseLeave={() => setFlippedIndex(null)}
              onClick={() => handleTileClick(tile.href)}
              className="relative h-10 w-10 sm:h-11 sm:w-11 cursor-pointer group focus:outline-none"
              style={{ perspective: "1000px" }}
              aria-label={tile.name}
              title={tile.name}
            >
              <div
                className="relative h-full w-full transition-transform duration-500 rounded-lg sm:rounded-xl shadow-lg"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front face: Letter */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-base sm:text-lg font-bold text-white/90 backdrop-blur-md group-hover:border-blue-500/50 group-hover:text-white transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {tile.letter}
                </div>

                {/* Back face: Icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600/90 to-blue-900/90 border border-blue-400/50 backdrop-blur-md text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {tile.icon}
                </div>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 whitespace-nowrap bg-black/90 border border-white/20 text-[10px] text-white px-2 py-0.5 rounded shadow-lg">
                {tile.name}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
