"use client";

import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import GalaxyNebula from "@/components/GalaxyNebula";
import { Send, Bot, User, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const { personal, projects, experience, credentials, achievements } = portfolioData;

// High-Level Resume Knowledge Base with crisp, punchy answers
const KARUNYA_KB: Record<string, string[]> = {
  intro: [
    `Hi! I'm **Iris**, Karunya's personal AI assistant. I can answer questions about his flagship projects, technical stack, competitive programming, certifications, and leadership. Ask me anything!`,
  ],
  name: [
    `**Karunya** is a Full-Stack Software Developer pursuing a B.Tech in Computer Science and Engineering at **IIIT Una** (2023–Present), specializing in distributed Next.js/MERN architectures, AI tooling, and systems programming in C++.`,
  ],
  projects: [
    `Karunya has architected two major production platforms:\n\n1. **CodeCritic** — An AI-powered code auditing tool powered by Groq LLaMA 3.3 70B with real-time Big-O analysis and an embedded Monaco Editor.\n2. **Intervo** — A real-time collaborative technical interview platform with Stream.io WebRTC, live pair programming, and automated ATS resume generation.`,
  ],
  codecritic: [
    `**CodeCritic** is Karunya's AI code auditing engine:\n\n• Powered by **Groq LLaMA 3.3 70B** for ultra-fast AST evaluations across 10+ languages\n• Features an embedded **Monaco Editor** with language auto-detection (+30% developer speed)\n• Instant **Big-O complexity analysis** and automated security linting\n• Secured with Clerk JWT authentication and MongoDB Atlas session persistence.`,
  ],
  intervo: [
    `**Intervo** is Karunya's live technical interview platform:\n\n• Sub-second **Stream.io WebRTC** video/audio calling and messaging\n• Synchronized **collaborative Monaco Editor** with in-browser JDoodle code execution\n• Library of **75+ curated DSA interview challenges** (no screen-sharing required)\n• Integrated **AI Resume Builder** producing ATS-compliant LaTeX resumes via Groq AI.`,
  ],
  skills: [
    `Karunya's core technical stack from his resume:\n\n• **Frontend:** Next.js 14, React.js, TypeScript, Tailwind CSS, HTML5/CSS3\n• **Backend & DB:** Node.js, Express.js, MongoDB & Mongoose, Python\n• **AI & Tooling:** Groq API, LangChain, Monaco Editor, Stream.io, Docker, Git\n• **Core Fundamentals:** Data Structures & Algorithms, C++, C, OOP, OS, DBMS, Networks.`,
  ],
  leetcode: [
    `Karunya has solved **500+ algorithmic problems** with a peak **LeetCode contest rating of 1706** (top competitive tier). He is also rated **3-Star on CodeChef** and **Specialist on Codeforces**, specializing in dynamic programming, graph algorithms, and complexity optimization.`,
  ],
  credentials: [
    `Karunya holds two verified credentials:\n\n1. **HackerRank Software Engineer Intern Role Certification** (ID: 6C5F59E46379) — Validating algorithms, data structures, and production code execution.\n2. **JLPT Level N5 Certification** (Japan Foundation / JEES) — Cleared with an outstanding **94.0 global percentile rank** (Grade A in Vocabulary, Grammar, and Reading).`,
  ],
  japanese: [
    `Yes! Karunya cleared the **Japanese-Language Proficiency Test (JLPT Level N5)** with a **94.0 global percentile rank** (133/180 total score, Grade A in Language & Reading). He is currently continuing disciplined self-study for JLPT N4.`,
  ],
  leadership: [
    `Karunya served as **Event Coordinator for Battle of Bands (MRIDANG 2025)**, IIIT Una's flagship cultural festival:\n\n• Directed operations and logistics for a 300+ attendee music festival\n• Led 4+ volunteer teams across stage, audio engineering, and safety\n• Secured administrative approvals 2 days early, cutting procurement delays by 25% and earning a **90% satisfaction score**.`,
  ],
  education: [
    `Karunya is pursuing his **B.Tech in Computer Science and Engineering** at **IIIT Una (Indian Institute of Information Technology, Una)** (Sept 2023 – Present).\n\nKey coursework includes Data Structures & Algorithms, Operating Systems, DBMS, Object-Oriented Programming, and Computer Networks.`,
  ],
  contact: [
    `You can reach Karunya directly:\n\n📧 **Email:** karunyaribu@gmail.com\n📱 **Phone:** +91 8628904505\n💼 **LinkedIn:** linkedin.com/in/karunya-iiitu\n🐙 **GitHub:** github.com/karunya666\n💻 **LeetCode:** leetcode.com/u/Karunya32`,
  ],
};

function matchQuery(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Topic-first matching (prevents substrings from triggering greetings)
  if (q.includes("codecritic") || q.includes("code critic") || q.includes("code review") || q.includes("groq")) return "codecritic";
  if (q.includes("intervo") || q.includes("webrtc") || q.includes("jdoodle") || q.includes("pair programming")) return "intervo";
  if (q.includes("flagship") || q.includes("project") || q.includes("built") || q.includes("portfolio")) return "projects";
  if (q.includes("stack") || q.includes("skill") || q.includes("technolog") || q.includes("language") || q.includes("framework") || q.includes("mern") || q.includes("react") || q.includes("node") || q.includes("typescript")) return "skills";
  if (q.includes("leetcode") || q.includes("cp") || q.includes("rating") || q.includes("competitive") || q.includes("dsa") || q.includes("codeforces") || q.includes("codechef") || q.includes("problem")) return "leetcode";
  if (q.includes("certificat") || q.includes("credential") || q.includes("hackerrank")) return "credentials";
  if (q.includes("japanese") || q.includes("japan") || q.includes("jlpt") || q.includes("n5") || q.includes("nihongo")) return "japanese";
  if (q.includes("leader") || q.includes("mridang") || q.includes("battle of bands") || q.includes("coordinator") || q.includes("event")) return "leadership";
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("iiit") || q.includes("degree") || q.includes("academics")) return "education";
  if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("email") || q.includes("phone") || q.includes("touch") || q.includes("linkedin") || q.includes("github")) return "contact";
  if (q.includes("who is") || q.includes("about karunya") || q.includes("background") || q.includes("introduce")) return "name";

  // 2. Strict word-boundary greeting check (only when no specific topic matched)
  if (/\b(hello|hi|hey|greetings|start|greet|help)\b/.test(q) || q === "hi" || q === "hello") return "intro";

  return "";
}

function formatMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const formatted = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    return (
      <p
        key={i}
        className="leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

const QUICK_PROMPTS = [
  "Tell me about CodeCritic",
  "What are Karunya's flagship projects?",
  "What is his core tech stack?",
  "What is his LeetCode & CP rating?",
  "What certifications does he hold?",
  "Describe his leadership at IIIT Una",
  "How can I contact or hire Karunya?",
];

export default function IrisPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello! I'm **Iris**, Karunya's personal AI assistant. Ask me about his flagship projects (CodeCritic, Intervo), technical stack, competitive programming stats, certifications, or leadership experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    soundManager.playClick(900);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const key = matchQuery(content);
    const responses = key ? KARUNYA_KB[key] : [
      "That's an interesting question! I'm Karunya's personal AI assistant. I can tell you about his projects (CodeCritic, Intervo), experience at Infrawave Solutions, skills (MERN, TypeScript, AI/LLMs), credentials (HackerRank cert, JLPT N5), or competitive programming stats. Try asking about any of these!",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
    soundManager.playClick(700);
  };

  const handleReset = () => {
    soundManager.playClick(900);
    setMessages([
      {
        id: "reset",
        role: "assistant",
        content: "Hi again! Fresh start. Ask me anything about Karunya — his projects, tech stack, experience, or achievements.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <main className="relative z-10 min-h-screen px-4 pt-20 pb-6 sm:px-6 sm:pt-24 md:px-12 md:pt-28 lg:px-16">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 mt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Iris orb */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-800 to-indigo-900 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-200" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">Iris</h1>
                <p className="text-[11px] text-purple-400 font-semibold uppercase tracking-wider">Personal AI Assistant</p>
              </div>
            </div>
            <p className="text-sm text-white/60 max-w-xl">
              Ask me anything about Karunya — his projects, skills, experience, achievements, or contact info.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xs font-medium"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Chat window with Galaxy Nebula background */}
        <div className="relative glass-card rounded-2xl border border-white/[0.08] flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]" style={{ height: "60vh", minHeight: "420px" }}>
          {/* Cosmic Galaxy / Nebula Background */}
          <GalaxyNebula />

          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-none">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-purple-600 to-violet-900 border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                    : "bg-blue-600/80 border-blue-500/40"
                }`}>
                  {msg.role === "assistant" ? (
                    <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed space-y-1 ${
                  msg.role === "assistant"
                    ? "bg-white/[0.04] border border-white/[0.08] text-white/85"
                    : "bg-blue-600/80 border border-blue-500/40 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                }`}>
                  {formatMarkdown(msg.content)}
                  <p className="text-[10px] text-white/30 font-mono mt-1.5">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-600 to-violet-900 border border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.4)]">
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="relative z-10 border-t border-white/[0.08] bg-black/40 backdrop-blur-md p-3 sm:p-4 flex flex-col gap-3">
            {/* Quick prompts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all font-medium cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input field */}
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Iris about Karunya..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all font-sans"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="p-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-[0_0_12px_rgba(147,51,234,0.3)] border border-purple-500/40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
          }
        `}</style>

        <ScrollReveal delayMs={100}>
          <Footer />
        </ScrollReveal>
      </div>
    </main>
  );
}
