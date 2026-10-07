"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData, SkillCategory } from "@/data/portfolioData";
import { soundManager } from "@/utils/sound";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// 3D Rotating Skills Globe — Mathematically Perfect Spherical Geometry
function SkillsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const techItems = [
    { name: "React", emoji: "⚛️" },
    { name: "Node.js", emoji: "🟢" },
    { name: "TypeScript", emoji: "🔷" },
    { name: "MongoDB", emoji: "🍃" },
    { name: "Python", emoji: "🐍" },
    { name: "C++", emoji: "⚙️" },
    { name: "Next.js", emoji: "▲" },
    { name: "Git", emoji: "🌿" },
    { name: "Linux", emoji: "🐧" },
    { name: "Docker", emoji: "🐳" },
    { name: "SQL", emoji: "🗃️" },
    { name: "Groq AI", emoji: "🤖" },
    { name: "WebRTC", emoji: "📡" },
    { name: "Express", emoji: "🚂" },
    { name: "Tailwind", emoji: "🎨" },
    { name: "Postman", emoji: "📮" },
    { name: "Monaco", emoji: "📝" },
    { name: "Stream.io", emoji: "📹" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const size = 600;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = 210; // Perfectly proportioned sphere radius

    let angleX = 0.05;
    let angleY = 0.1;
    let isDragging = false;
    let lastMX = 0;
    let lastMY = 0;

    // Fibonacci sphere distribution for perfectly even spacing
    const points = techItems.map((item, idx) => {
      const phi = Math.acos(1 - (2 * (idx + 0.5)) / techItems.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * idx;
      return {
        ...item,
        x: R * Math.sin(phi) * Math.cos(theta),
        y: R * Math.cos(phi),
        z: R * Math.sin(phi) * Math.sin(theta),
      };
    });

    const rotate3D = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y1, z: z2 };
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMX = e.clientX;
      lastMY = e.clientY;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMX;
      const dy = e.clientY - lastMY;
      lastMX = e.clientX;
      lastMY = e.clientY;
      angleY += dx * 0.0035;
      angleX += dy * 0.0035;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMX = e.touches[0].clientX;
        lastMY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMX;
      const dy = e.touches[0].clientY - lastMY;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
      angleY += dx * 0.0035;
      angleX += dy * 0.0035;
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // 1. Subtle Outer Glow Horizon (Guarantees visually flawless circular silhouette)
      const grad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.02)");
      grad.addColorStop(0.85, "rgba(56, 189, 248, 0.06)");
      grad.addColorStop(1, "rgba(56, 189, 248, 0.15)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Outer boundary stroke
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Mathematically uniform latitude parallels
      const latCount = 7;
      for (let i = 1; i <= latCount; i++) {
        const phi = ((i / (latCount + 1)) - 0.5) * Math.PI; // -PI/2 to PI/2
        const ringY = R * Math.sin(phi);
        const ringR = R * Math.cos(phi);

        ctx.beginPath();
        const segments = 48;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          const px = ringR * Math.cos(theta);
          const py = ringY;
          const pz = ringR * Math.sin(theta);
          const rot = rotate3D(px, py, pz);

          const screenX = cx + rot.x;
          const screenY = cy + rot.y;

          if (j === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.strokeStyle = "rgba(56, 189, 248, 0.09)";
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // 3. Mathematically uniform longitude meridians
      const lonCount = 8;
      for (let i = 0; i < lonCount; i++) {
        const theta = (i / lonCount) * Math.PI;

        ctx.beginPath();
        const segments = 48;
        for (let j = 0; j <= segments; j++) {
          const phi = (j / segments) * Math.PI * 2;
          const px = R * Math.sin(phi) * Math.sin(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.cos(theta);
          const rot = rotate3D(px, py, pz);

          const screenX = cx + rot.x;
          const screenY = cy + rot.y;

          if (j === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // 4. Render Tech Nodes & Labels sorted by depth
      const projected = points.map((p) => {
        const rot = rotate3D(p.x, p.y, p.z);
        return {
          ...p,
          px: cx + rot.x,
          py: cy + rot.y,
          pz: rot.z,
          isFront: rot.z >= -20,
        };
      });

      projected.sort((a, b) => a.pz - b.pz);

      projected.forEach((p) => {
        const depthRatio = (p.pz + R) / (2 * R); // 0 (back) to 1 (front)
        const alpha = p.isFront ? 0.45 + depthRatio * 0.55 : 0.12;
        const dotRadius = 2.5 + depthRatio * 2;

        // Glowing node dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.fill();

        if (p.isFront && depthRatio > 0.4) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, dotRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.25})`;
          ctx.fill();

          // Text badge
          ctx.font = `600 11px system-ui, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.textAlign = "center";
          ctx.fillText(`${p.emoji} ${p.name}`, p.px, p.py - 8 - dotRadius);
        }
      });

      // Slow smooth auto-rotation
      if (!isDragging) {
        angleY += 0.0025;
        angleX += 0.0006;
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          width: "min(520px, 86vw, 86vh)",
          height: "min(520px, 86vw, 86vh)",
          aspectRatio: "1 / 1",
        }}
        title="Drag to rotate the tech globe"
      />
    </div>
  );
}

// Skill Category Accordion Card matching reference design
function SkillCategoryCard({
  category,
  defaultOpen = false,
}: {
  category: SkillCategory;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20">
      <button
        type="button"
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left group cursor-pointer"
        onClick={() => {
          soundManager.playClick(800);
          setOpen((p) => !p);
        }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-1.5 h-6 bg-cyan-400 rounded-full group-hover:h-7 transition-all duration-300" />
          <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
            {category.title}
          </h4>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <span className="text-[11px] text-zinc-400 font-mono">
            {category.skills.length} skills
          </span>
          <svg
            className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="p-4 sm:p-5 pt-0 border-t border-white/5 animate-in fade-in duration-300">
          <div className="flex flex-wrap gap-2 pt-3">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="group/item relative px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-default rounded-lg border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-500/[0.06] flex items-center gap-1.5"
                title={`${skill.level} • ${skill.description}`}
              >
                <span>{skill.name}</span>
                <span className="text-[9px] font-mono text-white/40 uppercase">
                  {skill.level === "Advanced" ? "Adv" : "Pro"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <main className="relative z-10 min-h-screen px-4 pt-24 pb-12 sm:px-6 sm:pt-28 md:px-12 md:pt-32 lg:px-16 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        {/* Top Header matching reference (Technical EXPERTISE) */}
        <div className="flex flex-row items-baseline justify-start gap-x-4 w-full mb-4">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-none">
            Technical
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-white/90 leading-none">
            EXPERTISE
          </span>
        </div>
        <p className="text-white/80 text-base md:text-lg font-light max-w-2xl mb-10 sm:mb-12 leading-relaxed">
          A comprehensive map of the technologies and tools I navigate to build modern digital experiences.
        </p>

        {/* Section 1: Full-Width 3D Tech Globe (Visible First) */}
        <ScrollReveal initialVisible={true}>
          <div className="mb-16 sm:mb-24 w-full">
            <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px] relative rounded-2xl sm:rounded-3xl bg-white/[0.03] backdrop-blur-md overflow-hidden border border-white/10 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <SkillsGlobe />
            </div>
            <p className="text-center mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-sm font-light tracking-wider">
              Drag to rotate
            </p>
          </div>
        </ScrollReveal>

        {/* Section 2: Skills by Category (Scroll Down Below Globe) */}
        <div className="w-full pb-16 sm:pb-24">
          <ScrollReveal delayMs={50}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 sm:mb-12 text-center text-white">
              Explore My Skills by Category
            </h2>
          </ScrollReveal>

          {/* Symmetrical Responsive 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
            {portfolioData.skillCategories.map((category: SkillCategory, idx: number) => (
              <ScrollReveal key={category.title} delayMs={idx * 60}>
                <SkillCategoryCard category={category} defaultOpen={false} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Footer */}
        <ScrollReveal delayMs={100}>
          <Footer />
        </ScrollReveal>
      </div>
    </main>
  );
}
