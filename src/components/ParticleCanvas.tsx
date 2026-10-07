"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  distance: number;
  maxDistance: number;
  color: string;
  width: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();
  const isIrisRef = useRef(pathname === "/iris");

  useEffect(() => {
    isIrisRef.current = pathname === "/iris";
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let centerX = width / 2;
    let centerY = height / 2;
    let targetCenterX = centerX;
    let targetCenterY = centerY;

    const colors = [
      "rgba(59, 130, 246, 0.8)",  // #3b82f6
      "rgba(96, 165, 250, 0.7)",  // #60a5fa
      "rgba(147, 197, 253, 0.6)", // #93c5fd
      "rgba(255, 255, 255, 0.5)",
      "rgba(34, 211, 238, 0.7)",  // cyan-400
    ];

    const particleCount = 140;
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 2.2;
      const maxDistance = Math.hypot(width, height) / 2;
      return {
        x: centerX,
        y: centerY,
        angle,
        speed,
        length: 8 + Math.random() * 16,
        distance: Math.random() * maxDistance,
        maxDistance,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1 + Math.random() * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
      targetCenterX = centerX;
      targetCenterY = centerY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax deflection
      const offsetX = (e.clientX - width / 2) * 0.05;
      const offsetY = (e.clientY - height / 2) * 0.05;
      targetCenterX = width / 2 + offsetX;
      targetCenterY = height / 2 + offsetY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Smoothly interpolate center
      centerX += (targetCenterX - centerX) * 0.05;
      centerY += (targetCenterY - centerY) * 0.05;

      const isIris = isIrisRef.current;

      ctx.clearRect(0, 0, width, height);

      // On /iris, the GalaxyNebula component renders the cosmic galaxy
      if (isIris) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      particles.forEach((p) => {
        // Calm slow-mo movement across all sections of the site
        p.distance += p.speed * 0.22;

        const progress = p.distance / p.maxDistance;
        const currentSpeed = p.speed * 0.22 * 0.85;
        p.distance += currentSpeed * 0.16;

        if (p.distance >= p.maxDistance) {
          p.distance = 5 + Math.random() * 20;
          p.angle = Math.random() * Math.PI * 2;
          p.speed = 0.8 + Math.random() * 2.2;
        }

        const headX = centerX + Math.cos(p.angle) * p.distance;
        const headY = centerY + Math.sin(p.angle) * p.distance;

        const currentLength = p.length * (0.8 + progress * 1.8);
        const tailX = headX - Math.cos(p.angle) * currentLength;
        const tailY = headY - Math.sin(p.angle) * currentLength;

        // Draw radial streak
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.width * (0.6 + progress * 0.8);
        ctx.lineCap = "round";
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-70"
    />
  );
}
