"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { MessageSquare, Send, Heart, Clock } from "lucide-react";

const gc = "glass-card rounded-xl sm:rounded-2xl border border-white/[0.08]";

const AVATARS = ["😎", "🚀", "🎯", "💻", "🌟", "🦊", "🎮", "🎵", "🧠", "⚡"];

interface GuestMessage {
  id: string;
  name: string;
  avatar: string;
  message: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: "1",
    name: "Shreya M.",
    avatar: "🌟",
    message: "Love the portfolio design! CodeCritic is super impressive — the LLaMA integration is 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    likes: 3,
    liked: false,
  },
  {
    id: "2",
    name: "Arjun K.",
    avatar: "🚀",
    message: "Intervo is exactly what we needed for mock interviews. Real-time code editor + video = game changer!",
    timestamp: new Date(Date.now() - 1000 * 60 * 95),
    likes: 5,
    liked: false,
  },
  {
    id: "3",
    name: "Priya R.",
    avatar: "💻",
    message: "JLPT N5 at 94th percentile AND 600+ LeetCode? The grind is real. Respect! 🙏",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 7,
    liked: false,
  },
];

function TimeAgo({ date }: { date: Date }) {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return <span>just now</span>;
  if (diffMins < 60) return <span>{diffMins}m ago</span>;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return <span>{diffHours}h ago</span>;
  return <span>{Math.floor(diffHours / 24)}d ago</span>;
}

export default function VisitorbookPage() {
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("😎");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) return;
    soundManager.playClick(900);

    const newMsg: GuestMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      avatar: selectedAvatar,
      message: messageText.trim(),
      timestamp: new Date(),
      likes: 0,
      liked: false,
    };

    setMessages((prev) => [newMsg, ...prev]);
    setName("");
    setMessageText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleLike = (id: string) => {
    soundManager.playClick(1200);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 }
          : m
      )
    );
  };

  return (
    <main className="relative z-10 min-h-screen px-4 pt-20 pb-6 sm:px-6 sm:pt-24 md:px-12 md:pt-28 lg:px-16">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-2">Guest Wall</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-tight italic">
            Drop Your Thoughts!
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto">
            A space to leave a simple hello, a thought, or a note about the work you saw.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Post form + Interests */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Message form */}
            <div className={`${gc} p-5`}>
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Leave a Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  maxLength={40}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-all font-sans"
                />

                {/* Message */}
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Say something nice, curious, or just a simple hello..."
                  maxLength={200}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-all font-sans resize-none"
                />

                {/* Avatar picker */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-2">Pick an Avatar</p>
                  <div className="flex flex-wrap gap-2">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          soundManager.playClick(1000);
                          setSelectedAvatar(a);
                        }}
                        className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                          selectedAvatar === a
                            ? "bg-blue-500/30 border-2 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            : "bg-white/5 border border-white/10 hover:border-white/25"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitted ? "Sent! ✓" : "Post Message"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Message wall */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-semibold text-white">Stream</h2>
              <span className="text-[11px] font-mono text-white/40">{messages.length} messages</span>
            </div>

            <div className="flex flex-col gap-3 max-h-[680px] overflow-y-auto scrollbar-none pr-1">
              {messages.map((msg, idx) => (
                <ScrollReveal key={msg.id} delayMs={(idx % 3) * 60} initialVisible={idx < 2}>
                  <div
                    className={`${gc} p-4 flex flex-col gap-2.5 hover:border-white/20 transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700/30 to-blue-900/30 border border-blue-500/20 flex items-center justify-center text-lg shrink-0">
                          {msg.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{msg.name}</p>
                          <p className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <TimeAgo date={msg.timestamp} />
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleLike(msg.id)}
                        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                          msg.liked
                            ? "text-pink-400 border-pink-500/30 bg-pink-500/10"
                            : "text-white/40 border-white/10 hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/10"
                        }`}
                        aria-label="Like message"
                      >
                        <Heart className={`w-3 h-3 ${msg.liked ? "fill-current" : ""}`} />
                        <span>{msg.likes}</span>
                      </button>
                    </div>

                    <p className="text-sm text-white/75 leading-relaxed">{msg.message}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <ScrollReveal delayMs={100}>
          <Footer />
        </ScrollReveal>
      </div>
    </main>
  );
}
