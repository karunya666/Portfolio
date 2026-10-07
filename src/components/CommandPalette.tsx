"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useThemeFlashlight } from "@/context/ThemeFlashlightContext";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import { Github, Linkedin } from "@/components/Icons";
import {
  Search,
  Home,
  Briefcase,
  Award,
  Sparkles,
  Bot,
  MessageSquare,
  Code,
  FileText,
  Moon,
  Flashlight,
  Volume2,
  X,
  ExternalLink,
} from "lucide-react";

interface CmdItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Links" | "Controls";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const { isCmdKOpen, setCmdKOpen, toggleTheme, toggleFlashlight, toggleAmbient } = useThemeFlashlight();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isCmdKOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCmdKOpen]);

  const allItems: CmdItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      category: "Navigation",
      icon: <Home className="w-4 h-4 text-blue-400" />,
      action: () => router.push("/"),
    },
    {
      id: "nav-projects",
      title: "Explore Projects",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      action: () => router.push("/projects"),
    },
    {
      id: "nav-credentials",
      title: "View Credentials & Certifications",
      category: "Navigation",
      icon: <Award className="w-4 h-4 text-blue-400" />,
      action: () => router.push("/credentials"),
    },
    {
      id: "nav-skills",
      title: "Inspect Craft & Tech Arsenal",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      action: () => router.push("/skills"),
    },
    {
      id: "nav-iris",
      title: "Talk to Iris (AI Assistant)",
      category: "Navigation",
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      action: () => router.push("/iris"),
    },
    {
      id: "nav-stream",
      title: "Visit Stream & Guestbook",
      category: "Navigation",
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      action: () => router.push("/visitorbook"),
    },

    // Projects
    {
      id: "proj-codecritic",
      title: "Project: CodeCritic (AI Code Review Platform)",
      category: "Projects",
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      action: () => router.push("/projects#codecritic"),
    },
    {
      id: "proj-intervo",
      title: "Project: Intervo (Collaborative Interview Platform)",
      category: "Projects",
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      action: () => router.push("/projects#intervo"),
    },

    // Links
    {
      id: "link-linkedin",
      title: "Open LinkedIn Profile",
      category: "Links",
      icon: <Linkedin className="w-4 h-4 text-blue-500" />,
      action: () => window.open(portfolioData.socialLinks.linkedin, "_blank"),
    },
    {
      id: "link-github",
      title: "Open GitHub Profile",
      category: "Links",
      icon: <Github className="w-4 h-4 text-white" />,
      action: () => window.open(portfolioData.socialLinks.github, "_blank"),
    },
    {
      id: "link-leetcode",
      title: "Open LeetCode Profile (600+ solved)",
      category: "Links",
      icon: <Code className="w-4 h-4 text-amber-500" />,
      action: () => window.open(portfolioData.socialLinks.leetcode, "_blank"),
    },
    {
      id: "link-resume",
      title: "Download Karunya's Resume (PDF)",
      category: "Links",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => window.open(portfolioData.socialLinks.resume, "_blank"),
    },

    // Controls
    {
      id: "ctrl-flashlight",
      title: "Toggle Flashlight / Darkest Mode",
      category: "Controls",
      icon: <Flashlight className="w-4 h-4 text-yellow-400" />,
      action: () => toggleFlashlight(),
    },
    {
      id: "ctrl-sound",
      title: "Toggle Void Ambient Sound",
      category: "Controls",
      icon: <Volume2 className="w-4 h-4 text-pink-400" />,
      action: () => toggleAmbient(),
    },
    {
      id: "ctrl-theme",
      title: "Toggle Light / Dark Theme",
      category: "Controls",
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => toggleTheme(),
    },
  ];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CmdItem) => {
    soundManager.playClick(1000);
    setCmdKOpen(false);
    item.action();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      soundManager.playClick(800);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      soundManager.playClick(800);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isCmdKOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-xl animate-fade-in"
      onClick={() => setCmdKOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#090d16] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. projects, resume, iris)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none font-sans"
          />
          <button
            onClick={() => setCmdKOpen(false)}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-white/40 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-white/10 border border-blue-500/30 text-white"
                      : "text-white/70 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/10 text-[11px] text-white/40 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Karunya OS</span>
        </div>
      </div>
    </div>
  );
}
