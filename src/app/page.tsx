"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData, Experience } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import ContactRow from "@/components/ContactRow";
import MatrixClock from "@/components/MatrixClock";
import GithubHeatmap from "@/components/GithubHeatmap";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  NodejsIcon,
  ExpressIcon,
  MongoDBIcon,
  TailwindIcon,
  PythonIcon,
  CppIcon,
  GroqIcon,
  MonacoIcon,
  GitIcon,
  ClerkIcon,
  VercelIcon,
  StreamIcon,
} from "@/components/Icons";
import {
  MapPin,
  Command,
  ExternalLink,
  Zap,
  ArrowRight,
  ChevronRight,
  Building2,
  Calendar,
  Code,
  Flame,
  Target,
  Shield,
} from "lucide-react";
import { useThemeFlashlight } from "@/context/ThemeFlashlightContext";

// Glass card base class
const gc = "glass-card rounded-xl sm:rounded-2xl border border-white/[0.08]";

function BentoCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${gc} ${className} transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Core Values Showcase Grid
function CoreValuesGrid() {
  const cards = [
    {
      ...portfolioData.personal.coreValues[0],
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      accentBorder: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      num: "01",
    },
    {
      ...portfolioData.personal.coreValues[1],
      icon: <Target className="w-5 h-5 text-blue-400" />,
      badgeColor: "border-blue-500/40 bg-blue-500/10 text-blue-400",
      accentBorder: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
      num: "02",
    },
    {
      ...portfolioData.personal.coreValues[2],
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-400",
      accentBorder: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      num: "03",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
      {cards.map((card, idx) => (
        <div
          key={card.title}
          onMouseEnter={() => soundManager.playClick(1000 + idx * 120)}
          className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 ${card.accentBorder} transition-all duration-300 flex flex-col justify-between group cursor-default shadow-sm`}
        >
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className={`p-2.5 rounded-xl border ${card.badgeColor} shadow-sm group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <span className="text-xs font-mono font-bold text-white/40 tracking-wider">
                {card.num}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide mb-1 group-hover:text-white transition-colors">
              {card.title}
            </h3>
            <p className="text-xs font-semibold text-blue-400/90 font-mono mb-2">
              {card.subtitle}
            </p>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-normal mt-3 pt-3 border-t border-white/[0.06]">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// Location card
function LocationCard() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Map background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 65% 40%, rgba(59,130,246,0.15) 0%, transparent 60%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px),
            #050505
          `,
        }}
      />
      {/* Scan line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-blue-400/60 blur-[1px] animate-scan"
        style={{ left: "60%" }}
      />
      {/* Vertical line at India */}
      <div className="absolute left-[62%] top-0 bottom-0 w-[1px] bg-blue-500/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="text-lg font-black tracking-wider text-white">INDIA</span>
        </div>
        <p className="text-xs text-white/70 font-mono">
          {portfolioData.personal.coordinates}
        </p>
        <p className="text-xs text-white/50 mt-0.5 font-medium">IIIT Una, Himachal Pradesh</p>
      </div>

      {/* Blinking dot */}
      <div className="absolute top-[38%] left-[62%]">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]" />
        </span>
      </div>
    </div>
  );
}

// Tech Arsenal Official Logos
const techArsenalLogos = [
  { name: "React", icon: <ReactIcon className="w-5 h-5" /> },
  { name: "Next.js", icon: <NextjsIcon className="w-5 h-5" /> },
  { name: "TypeScript", icon: <TypeScriptIcon className="w-5 h-5" /> },
  { name: "JavaScript", icon: <JavaScriptIcon className="w-5 h-5" /> },
  { name: "Node.js", icon: <NodejsIcon className="w-5 h-5" /> },
  { name: "Express", icon: <ExpressIcon className="w-5 h-5" /> },
  { name: "MongoDB", icon: <MongoDBIcon className="w-5 h-5" /> },
  { name: "Tailwind CSS", icon: <TailwindIcon className="w-5 h-5" /> },
  { name: "Python", icon: <PythonIcon className="w-5 h-5" /> },
  { name: "C++", icon: <CppIcon className="w-5 h-5" /> },
  { name: "Groq LLaMA 3.3", icon: <GroqIcon className="w-5 h-5" /> },
  { name: "Monaco Editor", icon: <MonacoIcon className="w-5 h-5" /> },
  { name: "Git", icon: <GitIcon className="w-5 h-5" /> },
  { name: "Clerk Auth", icon: <ClerkIcon className="w-5 h-5" /> },
  { name: "Vercel", icon: <VercelIcon className="w-5 h-5" /> },
  { name: "Stream.io", icon: <StreamIcon className="w-5 h-5" /> },
];

function SkillsMarquee() {
  return (
    <div className="w-full overflow-hidden py-1 relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="animate-marquee-scroll gap-3 sm:gap-4 flex whitespace-nowrap">
        {[...techArsenalLogos, ...techArsenalLogos, ...techArsenalLogos].map((tech, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all cursor-pointer group shadow-sm select-none shrink-0"
          >
            <div className="shrink-0 transition-transform duration-200 group-hover:scale-115">
              {tech.icon}
            </div>
            <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Education timeline
function EducationTimeline() {
  return (
    <div className="flex flex-col gap-4">
      {portfolioData.education.map((edu, idx) => (
        <div key={idx} className="flex gap-4 items-start group">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)] mt-1 shrink-0 group-hover:scale-125 transition-transform" />
            {idx < portfolioData.education.length - 1 && (
              <div className="w-[1px] h-full bg-white/10 mt-2 grow min-h-[24px]" />
            )}
          </div>
          <div className="pb-2">
            <p className="text-[11px] font-mono text-blue-400/80 uppercase tracking-widest mb-0.5">
              {edu.period}
            </p>
            <p className="text-sm font-semibold text-white leading-snug">{edu.degree}</p>
            <p className="text-xs text-white/60 mt-0.5">{edu.institution}</p>
            {edu.score && <p className="text-xs text-white/40 font-mono mt-0.5">{edu.score}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// Achievements mini cards with colored logos
function AchievementCard({
  logoSrc,
  fallbackIcon,
  title,
  subtitle,
}: {
  logoSrc?: string;
  fallbackIcon?: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-default group">
      <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-white/20 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-shadow overflow-hidden">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={title}
            width={36}
            height={36}
            className="w-full h-full object-contain"
          />
        ) : (
          fallbackIcon
        )}
      </div>
      <div className="overflow-hidden">
        <p className="text-xs font-bold text-white leading-tight truncate">{title}</p>
        <p className="text-[10px] text-white/50 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { setCmdKOpen } = useThemeFlashlight();
  const { personal, experience, achievements, leadership } = portfolioData;

  return (
    <main className="relative z-10 min-h-screen px-4 pt-20 pb-6 sm:px-6 sm:pt-24 md:px-12 md:pt-28 lg:px-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">

          {/* ── Row 1: Hero Profile Card ── */}
          <BentoCard className="lg:col-span-12 p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
            {/* Avatar */}
            <div className="flex items-center justify-center md:justify-start gap-4 shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
                  {personal.name}
                </h1>
                <span className="text-shine inline-block text-sm sm:text-base font-medium mt-1">
                  {personal.role}
                </span>
              </div>
            </div>

            <div className="hidden md:block h-14 w-[1px] bg-white/10 mx-4 shrink-0" />

            {/* Bio bullets */}
            <ul className="text-left text-xs sm:text-sm text-white/80 leading-relaxed font-normal space-y-2">
              {personal.bioPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* ── Row 2: Contact Row (full width) ── */}
          <BentoCard className="lg:col-span-12 p-3 sm:p-4">
            <ContactRow />
          </BentoCard>

          {/* ── Row 3: Experience Card (main) + Status + Clock ── */}
          <BentoCard className="lg:col-span-8 p-4 sm:p-5 min-h-[220px]">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">Experiences</h2>
              <Link
                href="/projects"
                onClick={() => soundManager.playClick(900)}
                className="flex items-center gap-1 text-[11px] font-semibold text-white/50 hover:text-blue-400 transition-colors uppercase tracking-wider"
              >
                <span>See Projects</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {experience.map((exp: Experience, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/20 hover:bg-white/[0.05] transition-all">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div>
                        <p className="font-bold text-white text-sm">{exp.company}</p>
                        <p className="text-xs text-blue-400 font-medium italic">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono shrink-0">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{exp.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {exp.highlights.map((h: string, hIdx: number) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/70 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.technologies.slice(0, 6).map((tech: string) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Status + Clock column */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {/* Status Row */}
            <BentoCard className="p-3 sm:p-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-around gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Refining craft</p>
                  <p className="text-xs sm:text-sm text-white font-medium">{personal.status.refining}</p>
                </div>
              </div>
              <div className="hidden sm:block lg:hidden xl:block h-6 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Open to</p>
                  <p className="text-xs sm:text-sm text-white font-medium">{personal.status.openTo}</p>
                </div>
              </div>
            </BentoCard>

            {/* Matrix Clock */}
            <BentoCard className="p-3 flex items-center justify-center min-h-[72px] grow">
              <MatrixClock />
            </BentoCard>

            {/* Command Palette Trigger */}
            <BentoCard
              className="p-3 flex items-center justify-center cursor-pointer hover:bg-blue-500/5 hover:border-blue-500/30 min-h-[52px] group"
              onClick={() => {
                soundManager.playClick(1000);
                setCmdKOpen(true);
              }}
            >
              <div className="flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors select-none">
                <Command className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wider font-mono">⌘ K</span>
              </div>
            </BentoCard>
          </div>

          {/* ── Row 4: Location + About Me ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            <BentoCard className="lg:col-span-5 min-h-[160px] overflow-hidden p-0">
              <LocationCard />
            </BentoCard>

            <BentoCard className="lg:col-span-7 p-5">
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-3">About Me</h2>
              <div className="space-y-3">
                {personal.philosophies.map((para, idx) => (
                  <p key={idx} className="text-sm text-white/75 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 5: GitHub Heatmap (full width) ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-light text-white tracking-tight">
                  GitHub Activity
                </h2>
                <a
                  href={portfolioData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick(900)}
                  className="flex items-center gap-1 text-[11px] text-white/50 hover:text-blue-400 transition-colors font-semibold uppercase tracking-wider"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <GithubHeatmap />
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 6: Core Values (Full Width Showcase) ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold mb-1">
                    Guiding Principles & Work Ethic
                  </p>
                  <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                    Core Values
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Cristiano Ronaldo Ethos • Daily Repetition</span>
                </div>
              </div>
              <CoreValuesGrid />
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 7: Education & Journey (Full Width) ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-4 pb-3 border-b border-white/10">
                Education & Journey
              </h2>
              <EducationTimeline />
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 8: Skills Marquee ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-light text-white tracking-tight">Tech Arsenal</h2>
                <Link
                  href="/skills"
                  onClick={() => soundManager.playClick(900)}
                  className="flex items-center gap-1 text-[11px] text-white/50 hover:text-blue-400 transition-colors font-semibold uppercase tracking-wider"
                >
                  <span>Full Craft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <SkillsMarquee />
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 9: Achievements ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-5">
              <h2 className="text-xl font-light text-white tracking-tight mb-4">Achievements & Recognition</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <AchievementCard
                  logoSrc="/logos/leetcode.png"
                  title="LeetCode Contest: 1706"
                  subtitle="Peak Competitive Rating"
                />
                <AchievementCard
                  logoSrc="/logos/codechef.png"
                  title="CodeChef: 3★ (3 Star)"
                  subtitle="Division Contest Ranking"
                />
                <AchievementCard
                  logoSrc="/logos/codeforces.png"
                  title="Codeforces: Specialist"
                  subtitle="Global Standing & Contests"
                />
                <AchievementCard
                  logoSrc="/logos/jlpt.png"
                  title="JLPT N5 Cleared (94.0%ile)"
                  subtitle="Japanese Language Proficiency"
                />
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* ── Row 10: Projects CTA ── */}
          <ScrollReveal delayMs={100} className="lg:col-span-12">
            <BentoCard className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/5 border-blue-500/20 hover:border-blue-500/40">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Featured Work</p>
                <h2 className="text-xl sm:text-2xl font-light text-white">
                  CodeCritic & Intervo — Built for scale.
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  AI code review, real-time WebRTC collaborative interviews, and automated resume generation.
                </p>
              </div>
              <Link
                href="/projects"
                onClick={() => soundManager.playClick(900)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] shrink-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </BentoCard>
          </ScrollReveal>

        </div>

        <Footer />
      </div>
    </main>
  );
}
