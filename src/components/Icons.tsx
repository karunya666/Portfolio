import React from "react";

// GitHub Official
export function GithubIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// LinkedIn Official
export function LinkedinIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// LeetCode Monochrome (for Contact bar - pure white/currentColor)
export function LeetCodeMonochrome({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer bracket matching user attachment */}
      <path d="M16 4.5L7.2 12l8.8 7.5" />
      {/* Horizontal pill bar */}
      <line x1="10.8" y1="12" x2="20" y2="12" />
    </svg>
  );
}

// CodeChef Monochrome (for Contact bar - pure white/currentColor)
export function CodeChefMonochrome({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Chef Hat */}
      <path d="M12 2C9.5 2 7.7 3.6 7 5.8 5.6 6.3 4.5 7.7 4.5 9.3c0 1.8 1.2 3.3 2.9 3.7v1h9.2v-1c1.7-.4 2.9-1.9 2.9-3.7 0-1.6-1.1-3-2.5-3.5C16.3 3.6 14.5 2 12 2zm-4 13.5h8v1.5H8v-1.5z" />
      {/* < and > code bracket eyes */}
      <path d="M7.8 16.5l-1.5 1 1.5 1M16.2 16.5l1.5 1-1.5 1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Mustache */}
      <path d="M12 18.8c-.8-.6-2-.8-3.2-.2.3.8 1.4 1.4 2.6 1.1.4.2.8.2 1.2 0 1.2.3 2.3-.3 2.6-1.1-1.2-.6-2.4-.4-3.2.2z" />
    </svg>
  );
}

// Codeforces Monochrome (for Contact bar - pure white/currentColor)
export function CodeforcesMonochrome({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2.5" y="9" width="5" height="13" rx="2" />
      <rect x="9.5" y="2.5" width="5" height="19.5" rx="2" />
      <rect x="16.5" y="13" width="5" height="9" rx="2" />
    </svg>
  );
}

// LeetCode Official Brand Logo (Colored - Black, Orange, Gray)
export function LeetCodeIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Orange curved top bracket */}
      <path d="M15.5 4.5L10 9.5" stroke="#FFA116" strokeWidth="3" strokeLinecap="round" />
      {/* Black lower bracket */}
      <path d="M10 9.5L6.5 12.5l9 7.5" stroke="#262626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Gray center pill */}
      <line x1="10" y1="12.5" x2="19.5" y2="12.5" stroke="#B0B0B0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// CodeChef Official Logo (Colored - White Hat, Brown Mustache)
export function CodeChefIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Chef Hat with soft gradient */}
      <path fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" d="M12 2C8.5 2 6 4 5 7c-1.5.5-2.5 2-2.5 3.8 0 2 1.2 3.7 3 4.2v3.5c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V15c1.8-.5 3-2.2 3-4.2 0-1.8-1-3.3-2.5-3.8C18 4 15.5 2 12 2z" />
      {/* Eyes & brows */}
      <path d="M7 16l-1.5 1 1.5 1M17 16l1.5 1-1.5 1" fill="none" stroke="#5B4638" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="16.8" r="0.8" fill="#5B4638" />
      <circle cx="15" cy="16.8" r="0.8" fill="#5B4638" />
      {/* Brown Mustache */}
      <path fill="#5B4638" d="M12 18.5c-1.2-.8-2.6-.9-4-.2.4.9 1.6 1.4 3 1 .5.3 1.5.3 2 0 1.4.4 2.6-.1 3-1-1.4-.7-2.8-.6-4 .2z" />
    </svg>
  );
}

// Codeforces Official 3-Bar Logo (Colored - Yellow, Blue, Red)
export function CodeforcesIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Yellow bar */}
      <rect x="2" y="9" width="5.5" height="13" rx="2" fill="#FFC107" />
      {/* Blue bar */}
      <rect x="9.25" y="2" width="5.5" height="20" rx="2" fill="#2196F3" />
      {/* Red bar */}
      <rect x="16.5" y="13" width="5.5" height="9" rx="2" fill="#F44336" />
    </svg>
  );
}

// JLPT Official Brand Logo (Colored - Black Text with Red Dots)
export function JlptIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* JLPT text */}
      <text x="2" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#111827">J</text>
      <text x="9" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#111827">L</text>
      <circle cx="13" cy="13.5" r="1.5" fill="#DC2626" />
      <text x="17" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#111827">P</text>
      <circle cx="21" cy="9.5" r="1.5" fill="#DC2626" />
      <text x="24" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#111827">T</text>
      {/* Japanese Subtext: 日本語能力試験 */}
      <text x="16" y="26" textAnchor="middle" fontFamily="'Noto Sans JP', sans-serif" fontSize="4.8" fontWeight="bold" fill="#111827">日本語能力試験</text>
      <circle cx="5.2" cy="24" r="0.8" fill="#DC2626" />
    </svg>
  );
}

// Crazy Badass Dark Mode Logo (Obsidian Eclipse Nova / Singularity Core)
export function DarkestModeIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <radialGradient id="voidCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="55%" stopColor="#1a0633" />
          <stop offset="85%" stopColor="#6b21a8" />
          <stop offset="100%" stopColor="#c084fc" />
        </radialGradient>
        <linearGradient id="coronaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="35%" stopColor="#c084fc" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="spikeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      {/* 4-Point Cosmic Nova Starburst */}
      <path
        d="M12 0.8L13.5 7.8L20.5 9.3L13.5 10.8L12 17.8L10.5 10.8L3.5 9.3L10.5 7.8L12 0.8Z"
        fill="url(#spikeGrad)"
        opacity="0.35"
        className="animate-pulse"
      />

      {/* Diagonal micro flares */}
      <path
        d="M12 4.5L13 9.5L18 10.5L13 11.5L12 16.5L11 11.5L6 10.5L11 9.5L12 4.5Z"
        stroke="url(#coronaGrad)"
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Segmented Orbit Ring */}
      <circle
        cx="12"
        cy="10.5"
        r="8.5"
        stroke="url(#coronaGrad)"
        strokeWidth="1.2"
        strokeDasharray="2.5 3.5"
      />

      {/* Dark Matter Crescent Shield / Eclipse Blade */}
      <path
        d="M12 2C7.3 2 3.5 5.8 3.5 10.5C3.5 15.2 7.3 19 12 19C15.5 19 18.5 16.8 19.7 13.7C16.3 15.2 12.3 14.2 10 11.5C7.8 8.8 8 4.7 10.2 2.3C10.8 2.1 11.4 2 12 2Z"
        fill="url(#voidCoreGlow)"
        stroke="url(#coronaGrad)"
        strokeWidth="1"
      />

      {/* Jet Black Singularity Eye */}
      <circle cx="12" cy="10.5" r="3.2" fill="#000000" stroke="#c084fc" strokeWidth="1.2" />

      {/* Pulsing Quantum Center */}
      <circle cx="12" cy="10.5" r="1.3" fill="#f43f5e" />

      {/* Binary Orbiting Sparks */}
      <circle cx="18.5" cy="5.5" r="1" fill="#38bdf8" />
      <circle cx="5.5" cy="15.5" r="0.8" fill="#c084fc" />
    </svg>
  );
}

// ── Tech Arsenal Official Brand Logos ──
export function ReactIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 180" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="#000" r="90" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" fill="#000" r="90" stroke="#fff" strokeWidth="6" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z" fill="#fff" />
        <rect fill="#fff" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#3178c6" d="M1.5 1.5h125v125H1.5z" />
      <path fill="#fff" d="M68.2 59.9h-18v52.6H38.1V59.9H20.2V49.3h48v10.6zm37.3 12.1c0-4-1.4-7.4-4.2-10.1s-7.1-4.7-12.8-6.1c-3.7-.9-6.4-2-8-3.1-1.6-1.2-2.5-2.8-2.5-4.8 0-2.3 1-4.1 3-5.4s4.8-2 8.4-2c3.4 0 6.2.7 8.3 2.1 2.2 1.4 3.5 3.5 4 6.2h11.7c-.5-5.5-2.9-9.8-7.2-12.9-4.3-3.1-10-4.6-17.1-4.6-7.4 0-13.2 1.6-17.4 4.8s-6.3 7.7-6.3 13.5c0 4.1 1.4 7.4 4.2 10.1s7.1 4.7 12.8 6.1c3.9.9 6.7 2 8.3 3.3 1.7 1.3 2.5 3 2.5 5.2 0 2.4-1.1 4.3-3.2 5.7s-5.2 2.1-9.3 2.1c-4.2 0-7.5-.9-9.9-2.6-2.4-1.7-3.8-4.4-4.3-8H58.6c.5 6.2 3.1 11 7.7 14.3s10.7 5 18.2 5c7.8 0 13.9-1.6 18.2-4.9s6.5-7.9 6.5-13.8z" />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 630 630" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="630" height="630" fill="#f7df1e" />
      <path d="m165.32 505.74c10.17 17.65 26.54 30.64 52.88 30.64 26.54 0 43.78-13.56 43.78-39.71v-226.7h53.11v227.83c0 54.58-31.64 79.44-86.78 79.44-46.67 0-73.45-24.86-88.7-55.93zm221.7-2.26c12.43 20.34 30.73 34.46 62.15 34.46 26.55 0 43.78-13.56 43.78-32.77 0-22.6-18.08-30.73-48.36-43.78l-16.61-7.12c-47.8-20.34-79.32-46.1-79.32-99.43 0-49.72 38.42-87.01 99.43-87.01 43.28 0 74.35 15.25 95.82 52.54l-42.37 27.12c-9.6-17.51-22.6-25.42-53.45-25.42-26.55 0-41.81 13.56-41.81 30.51 0 20.9 16.38 28.81 44.07 40.68l16.61 7.12c55.37 23.73 84.75 48.59 84.75 102.82 0 58.76-46.33 91.53-107.91 91.53-59.89 0-98.87-29.38-116.38-64.41z" />
    </svg>
  );
}

export function NodejsIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 289" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#539e43" d="M128 0L0 74.2v148.5L128 297l128-74.3V74.2L128 0zm0 29.8l102.2 59.3v118.6L128 267 25.8 207.7V89.1L128 29.8z" />
      <path fill="#539e43" d="M128 66l-60 34.6v69.3l60 34.6 60-34.6v-69.3L128 66z" />
    </svg>
  );
}

export function ExpressIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm-1-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" opacity="0.3"/>
      <text x="12" y="16" fill="currentColor" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
    </svg>
  );
}

export function MongoDBIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#13aa52" d="M12.001 0c-.266 0-.53.076-.76.223L2.24 6.222C1.48 6.708 1 7.55 1 8.46v7.08c0 .91.48 1.752 1.24 2.238l9.001 5.999c.46.307 1.06.307 1.52 0l9.001-5.999c.76-.486 1.24-1.328 1.24-2.238V8.46c0-.91-.48-1.752-1.24-2.238L12.76.223A1.408 1.408 0 0 0 12.001 0z" opacity="0.2"/>
      <path fill="#13aa52" d="M12 1.5c-.3 0-.6 2.5-1.2 5.5C9.5 13 8 16 11.5 21.5c.3.5.5.8.5.8s.2-.3.5-.8c3.5-5.5 2-8.5.7-14.5-.6-3-.9-5.5-1.2-5.5z" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#38bdf8" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function PythonIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#3776AB" d="M11.9 1.5c-3.3 0-5.4.5-5.4 2.3v2.3h5.4v.8H4.2C2.4 6.9 1.5 8.7 1.5 11.2s1.4 4.3 3.3 4.3h1.8v-2.3c0-1.8 1.5-3.3 3.3-3.3h5.4c1.5 0 2.7-1.2 2.7-2.7V4.3c0-1.5-2.8-2.8-6.1-2.8zm-1.5 1.5c.5 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.3-.8.8-.8z"/>
      <path fill="#FFD43B" d="M12.1 22.5c3.3 0 5.4-.5 5.4-2.3v-2.3h-5.4v-.8h7.7c1.8 0 2.7-1.8 2.7-4.3s-1.4-4.3-3.3-4.3h-1.8v2.3c0 1.8-1.5 3.3-3.3 3.3H8.7c-1.5 0-2.7 1.2-2.7 2.7v2.9c0 1.5 2.8 2.8 6.1 2.8zm1.5-1.5c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8z"/>
    </svg>
  );
}

export function CppIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#00599C" d="M12 2L2 7.8v11.5L12 25l10-5.7V7.8L12 2zm-1.5 13.5c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.4 0 2.6.7 3.3 1.8l-1.6 1c-.4-.6-1-1-1.7-1-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2c.7 0 1.3-.4 1.7-1l1.6 1c-.7 1.1-1.9 1.8-3.3 1.8zm6.5-3h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm3 0h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1z"/>
    </svg>
  );
}

export function GroqIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#F55036" />
      <path d="M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0zm5-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#FFFFFF" />
      <path d="M14.5 14.5L17 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MonacoIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#007ACC" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.5 2L6 10.5 2 7.5v9l4-3 11.5 8.5 4.5-2.5V4.5L17.5 2zm-1.5 14.3L8.8 11.2 16 6.3v10z"/>
    </svg>
  );
}

export function GitIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#F05032" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21.62 10.79l-8.41-8.41a2.14 2.14 0 0 0-3.03 0L8.27 4.29l3.82 3.82a2.53 2.53 0 0 1 3.22 3.23l3.68 3.68a2.52 2.52 0 1 1-1.5 1.5l-3.47-3.47v4.61a2.54 2.54 0 1 1-2.12 0V12.7a2.53 2.53 0 0 1-1.34-3.31L6.72 5.56 2.38 9.9a2.14 2.14 0 0 0 0 3.03l8.41 8.41a2.14 2.14 0 0 0 3.03 0l7.8-7.8a2.14 2.14 0 0 0 0-2.75z"/>
    </svg>
  );
}

export function ClerkIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#6C47FF" />
      <path d="M8 8.5A3.5 3.5 0 0 1 11.5 5h1a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5h-1A3.5 3.5 0 0 1 8 15.5v-7z" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

export function VercelIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  );
}

export function StreamIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#005FFF" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  );
}

// Aliases
export const Github = GithubIcon;
export const Linkedin = LinkedinIcon;
export const LeetCode = LeetCodeIcon;
export const CodeChef = CodeChefIcon;
export const Codeforces = CodeforcesIcon;
export const Jlpt = JlptIcon;
