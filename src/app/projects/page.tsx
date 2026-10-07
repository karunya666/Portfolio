"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundManager } from "@/utils/sound";
import Footer from "@/components/Footer";
import { Github } from "@/components/Icons";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ExternalLink,
  X,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  Activity,
} from "lucide-react";

interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  date: string;
  image: string;
  images: string[];
  scopeOverview: string;
  techArchitecture: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  architecturePipeline: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "codecritic",
    title: "CodeCritic",
    tagline: "AI-Powered Code Review Pipeline with Real-Time Big-O Analysis",
    category: "Full-Stack & Generative AI",
    date: "May 2026",
    image: "/projects/codecritic.png",
    images: ["/projects/codecritic.png"],
    scopeOverview:
      "CodeCritic is an AI-powered code review platform that analyzes source code for algorithmic bottlenecks, syntax issues, and time/space complexity. Integrated with Groq's low-latency LLaMA 3.3 70B and Monaco Editor, it delivers instant line-by-line feedback and asymptotic Big-O diagnostics across 10+ programming languages.",
    techArchitecture:
      "Architected with a decoupled client-server model: Monaco Editor client with language auto-detection -> Clerk JWT middleware -> Node.js & Express REST gateway -> Groq LLaMA 3.3 70B inference engine with streaming output -> MongoDB Atlas session persistence with AI-generated titles and replay capability.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Groq API (LLaMA 3.3 70B)",
      "Monaco Editor",
      "Clerk JWT",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/karunya666/CodeCritic",
    liveUrl: "https://code-critic-six.vercel.app",
    metrics: [
      { label: "Languages Supported", value: "10+ Langs" },
      { label: "Dev Productivity", value: "+30% Boost" },
      { label: "Concurrent Sessions", value: "100+ Active" },
      { label: "Inference Model", value: "LLaMA 3.3 70B" },
    ],
    highlights: [
      "Architected a distributed AI code review pipeline using Groq’s LLaMA 3.3 70B, processing multi-language requests with real-time Big-O complexity analysis and async error recovery.",
      "Engineered Monaco Editor integration with AI-driven language auto-detection, implementing stateless request handling for concurrent review sessions and improving developer turnaround by 30%.",
      "Designed MongoDB-backed session persistence layer with AI-generated titles, read-only replay, and user-scoped deletion, supporting 100+ concurrent multi-session workflows.",
      "Deployed fault-tolerant full-stack system on Vercel and Render with Clerk JWT authentication, Svix webhook sync, and Helmet/CORS hardening for production-grade security compliance.",
    ],
    architecturePipeline:
      "Monaco Editor Client -> Clerk JWT Guard -> Express REST Gateway -> Groq LLaMA 3.3 70B Pipeline -> MongoDB Session Storage -> Real-time Big-O Complexity & AST Syntax Diagnostics.",
  },
  {
    id: "intervo",
    title: "Intervo",
    tagline: "Real-Time Collaborative Technical Interview Platform & AI Resume Engine",
    category: "Full-Stack & WebRTC",
    date: "February 2026 – March 2026",
    image: "/projects/intervo.png",
    images: ["/projects/intervo.png"],
    scopeOverview:
      "Intervo is an all-in-one technical interview and collaboration platform combining face-to-face WebRTC video calls, synchronized real-time code editing, remote sandbox code execution, and an AI-driven resume optimizer. Designed to eliminate context switching and streamline technical evaluations for candidates and interviewers.",
    techArchitecture:
      "Powered by Stream.io WebRTC for sub-100ms multi-peer video/audio and persistent chat channels, synchronized Monaco Editor workspace, JDoodle API remote sandbox execution for isolated runtime compilation, and Groq LLaMA 3.3 70B AI resume synthesis with automated ATS LaTeX generation.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stream.io (WebRTC)",
      "Groq API (LLaMA 3.3 70B)",
      "Monaco Editor",
      "JDoodle API",
      "Clerk JWT",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/karunya666/Intervo",
    liveUrl: "https://intervo-realtime.vercel.app",
    metrics: [
      { label: "Curated DSA Problems", value: "75+ DSA" },
      { label: "Setup Overhead", value: "-30s Saved" },
      { label: "Realtime WebRTC", value: "< 100ms" },
      { label: "Resume Optimizer", value: "ATS LaTeX" },
    ],
    highlights: [
      "Built an all-in-one interview platform co-locating live video/chat (Stream.io), collaborative Monaco Editor, and real-time code execution (JDoodle API), eliminating screen-sharing overhead.",
      "Implemented host-controlled session management that automatically created a dedicated Stream channel for each interview, supporting 75+ curated DSA problems and reducing setup time by 30 seconds per session.",
      "Integrated AI Resume Builder using Groq’s LLaMA 3.3 70B, generating ATS-optimized LaTeX resumes tailored to SDE, Frontend, Backend, and Full-Stack roles.",
      "Secured REST APIs with Clerk JWT middleware and deployed React on Vercel and Node.js/Express on Render with MongoDB Atlas.",
    ],
    architecturePipeline:
      "Stream.io WebRTC Video/Chat Channel + Collaborative Monaco Editor + Remote JDoodle Sandbox Code Execution + Groq LLaMA Resume Synthesizer backed by MongoDB Atlas.",
  },
];

// Single Featured Card (PassVault Design on Original Website)
function PassVaultStyleCard({
  project,
  onInspect,
}: {
  project: FeaturedProject;
  onInspect: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"scope" | "tech">("scope");

  return (
    <div className="relative group mb-16 md:mb-20" style={{ perspective: "1200px" }}>
      <div className="w-full">
        <div className="relative overflow-hidden border border-white/10 rounded-2xl bg-white/[0.04] backdrop-blur-md flex flex-col lg:flex-row items-stretch hover:border-white/20 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          {/* Left Column: Image showcase with Chevrons and Indicator Dots */}
          <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[460px] group/img overflow-hidden bg-black/60">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top w-full h-full transition-transform duration-700 group-hover/img:scale-105"
              />
            </div>

            {/* Ambient gradients */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-black/50" />



            {/* Category tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                {project.category}
              </span>
            </div>
          </div>

          {/* Right Column: PassVault-style Content, Tabs, and Action Buttons */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-7 lg:p-8 gap-5">
            <div className="flex-none">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{project.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-none">
                {project.title}
              </h2>

              {/* Exact PassVault Tab Switcher */}
              <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl gap-1 mt-3.5">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick(900);
                    setActiveTab("scope");
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center cursor-pointer z-10 ${
                    activeTab === "scope" ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span>Scope & Overview</span>
                  {activeTab === "scope" && (
                    <div className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg -z-10 shadow-sm" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick(900);
                    setActiveTab("tech");
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center cursor-pointer z-10 ${
                    activeTab === "tech" ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span>Tech Architecture</span>
                  {activeTab === "tech" && (
                    <div className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg -z-10 shadow-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab Description Container - Full Complete Text with No Truncation */}
            <div className="min-h-[100px] flex items-center">
              <p
                key={activeTab}
                className="text-sm sm:text-[15px] text-white/75 leading-relaxed font-light animate-fade-in"
              >
                {activeTab === "scope" ? project.scopeOverview : project.techArchitecture}
              </p>
            </div>

            {/* Metrics Chips - Complete Text with Full Multi-line Space (No Truncation) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/[0.08]">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex flex-col items-center justify-center min-h-[64px]"
                >
                  <div className="text-sm sm:text-[15px] font-bold text-white tracking-tight">{m.value}</div>
                  <div className="text-[10px] leading-tight uppercase tracking-wider text-white/55 font-medium mt-1 text-center whitespace-normal break-words">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-[11px] font-mono hover:bg-white/10 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons: More Details, GitHub, Live */}
            <div className="flex-none flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick(850);
                  onInspect();
                }}
                className="group/details relative px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Terminal className="w-3 h-3 text-white/60 group-hover/details:text-white" />
                <span>More Details</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick(900)}
                className="group/github relative px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-bold text-[10px] uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick(950)}
                className="group/link relative px-5 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase tracking-wider transition-all hover:bg-blue-500/25 hover:text-blue-300 hover:border-blue-400/50 text-center flex items-center gap-1.5 active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Inspect Dialog
function ProjectModal({
  project,
  onClose,
}: {
  project: FeaturedProject;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090d16] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              {project.category}
            </span>
            <h2 className="text-3xl font-light text-white tracking-tight mt-1">{project.title}</h2>
            <p className="text-sm text-white/60 mt-1 leading-relaxed">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline / Architecture Overview */}
        <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">End-to-End System Architecture</span>
          </div>
          <p className="text-xs text-white/70 font-mono leading-relaxed">{project.architecturePipeline}</p>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-widest font-bold text-white/40 mb-3">Key Engineering Highlights</p>
          <ul className="space-y-2.5">
            {project.highlights.map((h, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-sm text-white/80 leading-relaxed"
              >
                <Code2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Tech Stack */}
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-widest font-bold text-white/40 mb-3">Full Technology Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick(900)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Live App</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick(900)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-bold hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "codecritic" | "intervo">("all");
  const [inspectingId, setInspectingId] = useState<string | null>(null);

  const activeModalProject = FEATURED_PROJECTS.find((p) => p.id === inspectingId);

  const displayedProjects =
    selectedTab === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.id === selectedTab);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background radial gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 flex flex-col font-sans overflow-x-hidden">
        <main className="flex-1 pt-28 sm:pt-32 px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto flex flex-col min-h-full">
            {/* Header with ScrollReveal drop-up animation */}
            <ScrollReveal initialVisible={true}>
              <header className="mb-12 md:mb-16 max-w-4xl">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter mb-6 leading-none text-white">
                  Selected{" "}
                  <span className="opacity-50 italic font-serif">Works</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                  A collection of full-stack systems focusing on distributed architectures, real-time collaboration,
                  and GenAI developer tooling.
                </p>

                {/* Main Project Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 mr-2">View:</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick(900);
                      setSelectedTab("all");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      selectedTab === "all"
                        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    All Projects (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick(900);
                      setSelectedTab("codecritic");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTab === "codecritic"
                        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold border border-blue-400/40"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    CodeCritic (AI Code Review)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick(900);
                      setSelectedTab("intervo");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTab === "intervo"
                        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold border border-blue-400/40"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Intervo (WebRTC Platform)
                  </button>
                </div>
              </header>
            </ScrollReveal>

            {/* Featured Section: PassVault Card Design with ScrollReveal drop-up animation */}
            <section className="mb-24">
              <div className="space-y-12">
                {displayedProjects.map((project, idx) => (
                  <ScrollReveal
                    key={project.id}
                    delayMs={idx * 150}
                    initialVisible={idx === 0 && selectedTab !== "all"}
                  >
                    <PassVaultStyleCard
                      project={project}
                      onInspect={() => setInspectingId(project.id)}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </section>

            {/* Footer with ScrollReveal drop-up animation */}
            <ScrollReveal delayMs={100}>
              <Footer />
            </ScrollReveal>
          </div>
        </main>
      </div>

      {/* Inspect Modal */}
      {inspectingId && activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setInspectingId(null)}
        />
      )}
    </div>
  );
}
