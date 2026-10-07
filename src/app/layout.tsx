import type { Metadata } from "next";
import { Geist, Geist_Mono, Mr_De_Haviland } from "next/font/google";
import "./globals.css";
import { ThemeFlashlightProvider } from "@/context/ThemeFlashlightContext";
import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mrDeHaviland = Mr_De_Haviland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mr-de-haviland",
});

export const metadata: Metadata = {
  title: "Karunya",
  description:
    "Portfolio of Karunya, a Full-Stack Developer specializing in MERN stack, distributed systems, and AI-powered developer tooling. IIIT Una, B.Tech CSE.",
  authors: [{ name: "Karunya" }],
  keywords: [
    "Karunya",
    "Portfolio",
    "Full-Stack Developer",
    "MERN Stack",
    "Software Engineer",
    "IIIT Una",
    "CodeCritic",
    "Intervo",
    "LeetCode",
    "Next.js Developer",
    "React Developer",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: "index, follow",
  openGraph: {
    title: "Karunya | Portfolio",
    description:
      "Full-Stack Developer crafting high-performance APIs, real-time WebRTC systems, and AI-powered tooling.",
    url: "https://karunya.dev",
    siteName: "Karunya",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karunya | Portfolio",
    description:
      "Full-Stack Developer crafting high-performance APIs, real-time WebRTC systems, and AI-powered tooling.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${mrDeHaviland.variable} dark`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="bg-[#050505] text-white antialiased min-h-screen overflow-x-hidden">
        <ThemeFlashlightProvider>
          {/* Futuristic Interactive Custom Cursor */}
          <CustomCursor />

          {/* Persistent Background Particle Engine */}
          <ParticleCanvas />

          {/* Global Command Palette */}
          <CommandPalette />

          {/* Glassmorphic Floating Navbar */}
          <Navbar />

          {/* Page content */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeFlashlightProvider>
      </body>
    </html>
  );
}
