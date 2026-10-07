"use client";

import React, { useEffect, useRef } from "react";

export default function GalaxyNebula() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Stardust floating particles
    const starCount = 50;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 1.8,
      alpha: 0.2 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.25,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.012; // Calm, graceful evolution

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Deep Celestial Radial Ambient Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.65);
      coreGrad.addColorStop(0, "rgba(147, 51, 234, 0.22)");   // Rich purple
      coreGrad.addColorStop(0.35, "rgba(126, 34, 206, 0.14)"); // Deep violet
      coreGrad.addColorStop(0.7, "rgba(88, 28, 135, 0.06)");  // Indigo edge
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Sinuous Billowing Nebula / Aurora Ribbons
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const ribbons = [
        { color: "rgba(168, 85, 247, 0.22)", width: 70, freq1: 0.003, freq2: 0.006, amp: 85, speed: 0.8, offset: 0 },
        { color: "rgba(192, 132, 252, 0.26)", width: 45, freq1: 0.004, freq2: 0.008, amp: 65, speed: 1.1, offset: 1.5 },
        { color: "rgba(217, 70, 239, 0.18)", width: 55, freq1: 0.0035, freq2: 0.007, amp: 75, speed: 0.9, offset: 3.1 },
        { color: "rgba(129, 140, 248, 0.15)", width: 80, freq1: 0.0025, freq2: 0.005, amp: 95, speed: 0.7, offset: 4.5 },
        { color: "rgba(236, 72, 153, 0.14)", width: 40, freq1: 0.0045, freq2: 0.009, amp: 55, speed: 1.2, offset: 2.2 },
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const steps = 60;
        const stepY = height / steps;

        for (let i = 0; i <= steps; i++) {
          const y = i * stepY;
          // Fluid organic wave displacement
          const displacement =
            Math.sin(y * ribbon.freq1 + time * ribbon.speed + ribbon.offset) * ribbon.amp +
            Math.cos(y * ribbon.freq2 - time * ribbon.speed * 0.6) * (ribbon.amp * 0.45);

          const x = cx + displacement;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.filter = "blur(18px)";
        ctx.stroke();
      });

      ctx.filter = "none";
      ctx.restore();

      // 3. Floating Stardust Particles
      ctx.save();
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += 0.03;

        // Wrap around
        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        const currentAlpha = s.alpha * (0.6 + Math.sin(s.twinkle) * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 231, 255, ${currentAlpha})`;
        ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      ctx.restore();

      // 4. Glowing Central Core Orb (matching reference: white star inside pulsing aura ring)
      const orbPulse = 1 + Math.sin(time * 1.8) * 0.06;
      const ringRadius = 18 * orbPulse;

      // Outer aura glow
      const auraGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 45 * orbPulse);
      auraGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      auraGrad.addColorStop(0.15, "rgba(192, 132, 252, 0.7)");
      auraGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.25)");
      auraGrad.addColorStop(1, "rgba(147, 51, 234, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, 45 * orbPulse, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Thin sharp aura ring (reference ring)
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.75)";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "rgba(168, 85, 247, 0.9)";
      ctx.shadowBlur = 10;
      ctx.stroke();

      // Core white star dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
