"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { soundManager } from "@/utils/sound";

interface ThemeFlashlightContextType {
  isDark: boolean;
  isFlashlightOn: boolean;
  isAmbientPlaying: boolean;
  isCmdKOpen: boolean;
  mousePos: { x: number; y: number };
  toggleTheme: () => void;
  toggleFlashlight: () => void;
  toggleAmbient: () => void;
  setCmdKOpen: (open: boolean) => void;
}

const ThemeFlashlightContext = createContext<ThemeFlashlightContextType>({
  isDark: true,
  isFlashlightOn: false,
  isAmbientPlaying: true,
  isCmdKOpen: false,
  mousePos: { x: 0, y: 0 },
  toggleTheme: () => {},
  toggleFlashlight: () => {},
  toggleAmbient: () => {},
  setCmdKOpen: () => {},
});

export function ThemeFlashlightProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(true);
  const [isCmdKOpen, setCmdKOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Ambient sound defaults to unmuted unless user explicitly muted it
  useEffect(() => {
    if (typeof window === "undefined") return;

    const previouslyMuted = localStorage.getItem("karunya-sound-muted") === "true";
    if (previouslyMuted) {
      setIsAmbientPlaying(false);
      return;
    }

    setIsAmbientPlaying(true);

    const initSound = () => {
      if (localStorage.getItem("karunya-sound-muted") !== "true") {
        soundManager.toggleAmbient(true);
        setIsAmbientPlaying(true);
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", initSound);
      window.removeEventListener("keydown", initSound);
      window.removeEventListener("scroll", initSound);
    };

    // Try starting immediately
    try {
      soundManager.toggleAmbient(true);
    } catch {
      // Browsers needing user gesture will trigger via listeners below
    }

    // Browsers require a user interaction to unblock Web Audio
    window.addEventListener("pointerdown", initSound, { once: true });
    window.addEventListener("keydown", initSound, { once: true });
    window.addEventListener("scroll", initSound, { once: true });

    return () => {
      removeListeners();
    };
  }, []);

  // The website is permanently dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("karunya-portfolio-theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.body.classList.remove("light-mode");
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundManager.playClick(1000);
        setCmdKOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCmdKOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    soundManager.playClick(900);
    setIsDark((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("karunya-portfolio-theme", next ? "dark" : "light");
        if (next) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          document.body.classList.remove("light-mode");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          document.body.classList.add("light-mode");
        }
      }
      return next;
    });
  };

  const toggleFlashlight = () => {
    const nextState = !isFlashlightOn;
    soundManager.playToggle(nextState);
    setIsFlashlightOn(nextState);
  };

  const toggleAmbient = () => {
    soundManager.playClick(750);
    const nextState = !isAmbientPlaying;
    soundManager.toggleAmbient(nextState);
    setIsAmbientPlaying(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem("karunya-sound-muted", nextState ? "false" : "true");
    }
  };

  return (
    <ThemeFlashlightContext.Provider
      value={{
        isDark,
        isFlashlightOn,
        isAmbientPlaying,
        isCmdKOpen,
        mousePos,
        toggleTheme,
        toggleFlashlight,
        toggleAmbient,
        setCmdKOpen,
      }}
    >
      <div className={isDark ? "dark" : "light"}>
        {children}
        {/* Spotlight / Darkest mode flashlight mask */}
        {isFlashlightOn && (
          <div
            className="fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 150px, rgba(0, 0, 0, 0.98) 240px)`,
            }}
          />
        )}
      </div>
    </ThemeFlashlightContext.Provider>
  );
}

export function useThemeFlashlight() {
  return useContext(ThemeFlashlightContext);
}
