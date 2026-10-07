export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  date: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  architectureOverview: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  technologies: string[];
  highlights: string[];
  screenshotUrl?: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  description: string;
  verificationUrl?: string;
  certificateImage: string;
  registrationNo?: string;
  scores?: Record<string, string>;
  skills: string[];
  category: "role" | "language" | "competitive" | "leadership" | "webdev";
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    icon?: string;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  highlights: string[];
}

export interface LeadershipRole {
  role: string;
  event: string;
  organization: string;
  period: string;
  highlights: string[];
}

export const portfolioData = {
  personal: {
    name: "Karunya",
    signature: "Karunya",
    role: "Full-Stack Software Developer",
    subtitle: "MERN Stack | Next.js | GenAI Workflows | Distributed Systems Explorer",
    email: "karunyaribu@gmail.com",
    phone: "+91 8628904505",
    college: "Indian Institute of Information Technology, Una",
    degree: "Bachelor of Technology, Computer Science and Engineering",
    duration: "September 2023 - Present",
    location: "Una, Himachal Pradesh, India",
    coordinates: "31.4684° N, 76.2708° E GMT+5:30",
    avatar: "/profile/avatar.svg",
    resumePdf: "/resume/Karunya_Resume.pdf",
    status: {
      refining: "GenAI-Integrated Applications & LLM Workflows",
      openTo: "SDE Internships & Full-Time SDE Roles (Aspiring Software Developer)",
    },
    bioPoints: [
      "Full-stack engineer building resilient web systems, AI review pipelines, and real-time collaboration engines.",
      "Hands-on expertise in MERN stack, Next.js, Groq LLaMA 3.3 70B integration, WebRTC, and Clerk authentication.",
      "Competitive programmer with 1706 LeetCode rating, 3★ CodeChef, Codeforces Specialist; JLPT N5 certified (94.0 percentile).",
    ],
    philosophies: [
      "I approach software engineering and system architecture through the lens of internal composure and steady, repetitive practice.",
      "Rather than chasing short-lived trends, I focus on the daily discipline of the process — prioritizing runtime efficiency, objective logic, and clean modularity in every problem.",
      "I find value in focused execution where simplicity and resilience are the true metrics of craftsmanship. A well-ordered codebase mirrors a disciplined mind.",
    ],
    coreValues: [
      {
        title: "RELENTLESS DISCIPLINE",
        subtitle: "No Excuses • Daily Repetition",
        description: "Talent without hard work is nothing. True mastery in algorithms and architecture comes from unmatched daily consistency.",
      },
      {
        title: "OBSESSION WITH EXCELLENCE",
        subtitle: "Be The Hardest Worker in The Room",
        description: "Always demanding the maximum from oneself — pushing systems, Big-O complexities, and full-stack performance to their highest limits.",
      },
      {
        title: "UNBREAKABLE MENTALITY",
        subtitle: "Pressure is a Privilege",
        description: "Facing complex production challenges, high-throughput architectures, and difficult problems with calm composure and supreme confidence.",
      },
    ],
  },

  socialLinks: {
    linkedin: "https://www.linkedin.com/in/karunya-iiitu/",
    github: "https://github.com/karunya666",
    leetcode: "https://leetcode.com/u/Karunya32/",
    codechef: "https://www.codechef.com/users/karunya666",
    codeforces: "https://codeforces.com/profile/karunya666",
    email: "mailto:karunyaribu@gmail.com",
    resume: "/resume/Karunya_Resume.pdf",
  },

  experience: [
    {
      company: "Infrawave Solutions",
      role: "Full-Stack Developer",
      period: "Jan 2026 – April 2026",
      location: "Remote",
      type: "Full-Stack Development",
      technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "Next.js", "Generative AI APIs", "GitHub Actions"],
      screenshotUrl: "/experience/infrawave-experience.png",
      highlights: [
        "Engineered and optimized 50+ scalable RESTful APIs using Node.js & Express.js (MERN / Next.js), reducing response time by 40% and improving overall system performance.",
        "Leveraged Generative AI APIs to implement ATS score evaluation and dynamically generate interview questions based on candidate resumes.",
        "Automated CI/CD pipelines using GitHub Actions, reducing deployment time from 15 minutes to under 45 seconds.",
      ],
    },
    {
      company: "Annual Cultural Fest of IIIT Una (Mridang 2025)",
      role: "Event Coordinator - Battle of Bands",
      period: "2025",
      location: "Una, Himachal Pradesh",
      type: "Leadership Experience",
      technologies: ["Team Leadership", "Operations", "Event Coordination", "Vendor Negotiations", "Cross-Team Communication"],
      screenshotUrl: "/credentials/mridang-cert.svg",
      highlights: [
        "Led end-to-end execution of a 300+ attendee music competition, coordinating 4+ volunteer teams across stage, technical, and operations functions.",
        "Managed artist logistics and vendor negotiations, securing all college administration approvals 2 days ahead of schedule, cutting procurement delays by 25%.",
        "Streamlined cross-team communication, ensuring zero-delay event delivery and a 90% attendee satisfaction rate.",
      ],
    },
  ] as Experience[],

  projects: [
    {
      id: "codecritic",
      title: "CodeCritic",
      tagline: "Distributed AI Code Review Pipeline with Real-Time Big-O Analysis",
      category: "Full-Stack & Generative AI",
      date: "May 2026",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Groq API (LLaMA 3.3 70B)",
        "Monaco Editor",
        "Clerk JWT",
        "Svix Webhooks",
      ],
      liveUrl: "https://code-critic-six.vercel.app",
      githubUrl: "https://github.com/karunya666/CodeCritic",
      metrics: [
        { label: "Supported Languages", value: "10+" },
        { label: "Developer Productivity", value: "+30%" },
        { label: "Concurrent Sessions", value: "100+" },
        { label: "Inference Model", value: "LLaMA 3.3 70B" },
      ],
      highlights: [
        "Architected a distributed AI code review pipeline using Groq’s LLaMA 3.3 70B, processing concurrent multi-language requests across 10+ languages with real-time Big-O complexity analysis and async error handling.",
        "Engineered Monaco Editor integration with AI-driven language auto-detection, implementing stateless request handling for concurrent review sessions and improving developer productivity by 30%.",
        "Designed MongoDB-backed session persistence layer with AI-generated titles, read-only replay, and user-scoped deletion, supporting 100+ concurrent multi-session workflows with optimized query indexing.",
        "Deployed fault-tolerant full-stack system on Vercel (React/Vite) and Render (Node.js/Express) with Clerk JWT authentication, Svix webhook sync, and Helmet/CORS hardening for production-grade security compliance.",
      ],
      architectureOverview:
        "Monaco Editor Client -> Clerk JWT Guard -> Express REST Gateway -> Groq LLaMA 3.3 70B Pipeline -> MongoDB Session Storage -> Real-time Big-O Complexity & AST Syntax Diagnostics.",
      featured: true,
    },
    {
      id: "intervo",
      title: "Intervo",
      tagline: "Real-Time Collaborative Technical Interview Platform & AI Resume Engine",
      category: "Full-Stack & Real-Time WebRTC",
      date: "February 2026 – March 2026",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Stream.io (WebRTC)",
        "Groq API (LLaMA 3.3 70B)",
        "Monaco Editor",
        "JDoodle API",
        "Clerk JWT",
        "Tailwind CSS",
      ],
      liveUrl: "https://intervo-realtime.vercel.app",
      githubUrl: "https://github.com/karunya666/Intervo",
      metrics: [
        { label: "Curated DSA Problems", value: "75+" },
        { label: "Setup Overhead Reduction", value: "-30s" },
        { label: "Realtime Collaboration", value: "Sub-100ms" },
        { label: "AI Resume Optimization", value: "ATS LaTeX" },
      ],
      highlights: [
        "Built an all-in-one interview platform co-locating live video/chat (Stream.io), collaborative Monaco Editor, and real-time code execution (JDoodle API), eliminating screen-sharing overhead.",
        "Implemented host-controlled session management that automatically created a dedicated Stream channel for each interview, supporting 75+ curated DSA problems and reducing setup time by 30 seconds per session.",
        "Integrated AI Resume Builder using Groq’s LLaMA 3.3 70B, generating ATS-optimized LaTeX resumes tailored to SDE, Frontend, Backend, and Full-Stack roles.",
        "Secured REST APIs with Clerk JWT middleware and deployed React/Vite on Vercel and Node.js/Express on Render with MongoDB Atlas.",
      ],
      architectureOverview:
        "Stream.io WebRTC Video/Chat Channel + Collaborative Monaco Editor + Remote JDoodle Sandbox Code Execution + Groq LLaMA Resume Synthesizer backed by MongoDB Atlas.",
      featured: true,
    },
  ] as Project[],

  education: [
    {
      degree: "Bachelor of Technology, Computer Science and Engineering",
      institution: "Indian Institute of Information Technology, Una",
      period: "September 2023 - Present",
      location: "Una, Himachal Pradesh, India",
      highlights: [
        "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems, Computer Networks.",
      ],
    },
    {
      degree: "Senior Secondary (Class XII) - CBSE",
      institution: "MCM DAV Public School Baghni, Nurpur",
      period: "2023",
      location: "Nurpur, Himachal Pradesh",
      highlights: [
        "Senior secondary education with focus on Mathematics, Physics, Chemistry, and Computer Science.",
      ],
    },
    {
      degree: "Secondary (Class X) - CBSE",
      institution: "MCM DAV Public School Baghni, Nurpur",
      period: "2021",
      location: "Nurpur, Himachal Pradesh",
      highlights: [
        "Secondary school board education with academic distinction in Science and Mathematics.",
      ],
    },
  ] as EducationItem[],

  leadership: [
    {
      role: "Event Coordinator",
      event: "Battle of Bands - MRIDANG 2025",
      organization: "Annual Cultural Fest of IIIT Una",
      period: "2025",
      highlights: [
        "Led end-to-end execution of a 300+ attendee music competition, coordinating 4+ volunteer teams across stage, technical, and operations functions.",
        "Managed artist logistics and vendor negotiations, securing all college administration approvals 2 days ahead of schedule, cutting procurement delays by 25%.",
        "Streamlined cross-team communication, ensuring zero-delay event delivery and a 90% attendee satisfaction rate.",
      ],
    },
  ] as LeadershipRole[],

  achievements: [
    {
      title: "LeetCode Contest Rating: 1706",
      subtitle: "Top Competitive Rating",
      description: "Attained maximum rating of 1706 in LeetCode contests, solving hundreds of algorithmic challenges across DP and graphs.",
    },
    {
      title: "CodeChef: 3★ (3 Star)",
      subtitle: "Division Rank",
      description: "Rated 3-Star on CodeChef with consistent participation in algorithmic division rounds.",
    },
    {
      title: "Codeforces: Specialist",
      subtitle: "Contest Rank",
      description: "Achieved Specialist ranking on Codeforces, showcasing rapid mathematical and complexity optimization skills.",
    },
    {
      title: "JLPT N5 Cleared (94.0 Percentile)",
      subtitle: "Japanese Language Proficiency",
      description: "Cleared JLPT N5 with 94.0 percentile rank globally; continuing self-directed study through JLPT N4 level.",
    },
  ],

  // Skills organized exactly as per Resume
  skillsResume: {
    frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "TypeScript", "ReactJS", "NextJS"],
    backend: ["NodeJS", "ExpressJS", "MongoDB", "Python"],
    libraries: ["ReactJS", "ExpressJS", "Mongoose", "Monaco Editor", "Stream.io", "Inngest", "Axios", "LangChain"],
    tools: ["Git", "GitHub", "Vercel", "Render", "Clerk", "Groq API", "GenAI"],
    coursework: ["C", "C++ (CPP)", "DBMS", "OOP", "OS", "CN", "DSA"],
  },

  skillCategories: [
    {
      title: "Web Dev (Front End)",
      icon: "layout",
      skills: [
        { name: "ReactJS", level: "Advanced", experience: "2+ years", description: "Hooks, functional components, state optimization, component lifecycles" },
        { name: "NextJS", level: "Advanced", experience: "2+ years", description: "App Router, SSR, Server Actions, modern full-stack Next.js patterns" },
        { name: "TypeScript", level: "Advanced", experience: "2+ years", description: "Strict typing, generics, interfaces, scalable codebases" },
        { name: "JavaScript", level: "Advanced", experience: "3+ years", description: "ES6+, Async/await, Event Loop, closures, DOM manipulation" },
        { name: "Tailwind CSS", level: "Advanced", experience: "2+ years", description: "Utility-first design system, responsive design, dark mode, glassmorphism" },
        { name: "HTML & CSS", level: "Advanced", experience: "3+ years", description: "Semantic markup, modern CSS grid/flexbox, responsive layout design" },
      ],
    },
    {
      title: "Web Dev (Back End)",
      icon: "server",
      skills: [
        { name: "NodeJS", level: "Advanced", experience: "2+ years", description: "Asynchronous runtime, event-driven architecture, file streams, worker threads" },
        { name: "ExpressJS", level: "Advanced", experience: "2+ years", description: "REST API routing, robust error middleware, CORS/Helmet hardening" },
        { name: "MongoDB & Mongoose", level: "Advanced", experience: "2+ years", description: "Document modeling, schema validation, aggregation pipelines, indexed queries" },
        { name: "Python", level: "Proficient", experience: "2+ years", description: "Scripting, algorithmic problems, data handling, AI integration" },
      ],
    },
    {
      title: "Libraries & Frameworks",
      icon: "layers",
      skills: [
        { name: "Monaco Editor", level: "Advanced", experience: "1+ year", description: "In-browser VS Code editing, AI-driven language auto-detection, custom syntax" },
        { name: "Stream.io", level: "Proficient", experience: "1+ year", description: "Real-time low-latency video, audio streaming channels, and chat" },
        { name: "Inngest", level: "Proficient", experience: "1+ year", description: "Event-driven background job queues, async orchestration" },
        { name: "Axios", level: "Advanced", experience: "2+ years", description: "Interceptors, HTTP requests, client-side data fetching" },
        { name: "LangChain", level: "Intermediate", experience: "1+ year", description: "LLM chains, prompt orchestration, AI workflows" },
      ],
    },
    {
      title: "Tools, Platforms & AI",
      icon: "terminal",
      skills: [
        { name: "Groq API & GenAI", level: "Advanced", experience: "1+ year", description: "Ultra-fast LLaMA 3.3 70B inference, AST code evaluation, Big-O complexity analysis" },
        { name: "Git & GitHub", level: "Advanced", experience: "3+ years", description: "Version control, branch management, code collaboration, pull requests" },
        { name: "Vercel & Render", level: "Advanced", experience: "2+ years", description: "Continuous production deployments, edge configurations, environment security" },
        { name: "Clerk Auth & Svix", level: "Advanced", experience: "1+ year", description: "JWT authentication, webhook verification, secure session management" },
      ],
    },
    {
      title: "Academic Coursework & Fundamentals",
      icon: "code",
      skills: [
        { name: "DSA (Data Structures & Algorithms)", level: "Advanced", experience: "3+ years", description: "Algorithmic problem solving across LeetCode, CodeChef, and Codeforces" },
        { name: "C++ (CPP)", level: "Advanced", experience: "3+ years", description: "STL, competitive programming, high-efficiency algorithms" },
        { name: "C", level: "Proficient", experience: "2+ years", description: "Pointers, memory management, systems fundamentals" },
        { name: "DBMS (Database Management)", level: "Proficient", experience: "2+ years", description: "Relational queries, ACID properties, indexing, normalization" },
        { name: "OOP (Object-Oriented Programming)", level: "Advanced", experience: "2+ years", description: "Inheritance, polymorphism, encapsulation, abstraction" },
        { name: "OS (Operating Systems)", level: "Proficient", experience: "2+ years", description: "Process scheduling, concurrency, virtual memory, threads" },
        { name: "CN (Computer Networks)", level: "Proficient", experience: "2+ years", description: "TCP/IP, OSI stack, HTTP/HTTPS, WebSockets, DNS" },
      ],
    },
  ] as SkillCategory[],

  credentials: [
    {
      id: "hackerrank-swe",
      title: "Software Engineer Intern Role Certification",
      issuer: "HackerRank",
      issueDate: "August 21, 2026",
      credentialId: "6C5F59E46379",
      certificateImage: "/credentials/hackerrank-swe.png",
      description:
        "Passed the rigorous HackerRank role certification assessment for Software Engineer Intern, validating practical proficiency in core algorithms, data structures, problem solving, and production code execution.",
      scores: {
        role: "Software Engineer Intern",
        status: "Passed & Role Verified",
        certId: "6C5F59E46379",
        signatory: "Harishankaran K, CTO",
      },
      skills: ["Data Structures", "Algorithms", "Problem Solving", "System Architecture", "Python & C++"],
      category: "competitive",
      verificationUrl: "https://www.hackerrank.com/certificates/6C5F59E46379",
    },
    {
      id: "jlpt-n5",
      title: "Japanese-Language Proficiency Test (JLPT Level N5)",
      issuer: "The Japan Foundation & JEES",
      issueDate: "January 19, 2026",
      credentialId: "N5A470208A",
      registrationNo: "25B3010101-51468",
      certificateImage: "/credentials/jlpt-n5.png",
      description:
        "Certified passing of the Japanese-Language Proficiency Test Level N5 administered by the Japan Foundation and JEES. Achieved a 94.0 global percentile rank with Grade A ratings across Vocabulary, Grammar, and Reading Comprehension.",
      scores: {
        languageReading: "94 / 120 (Grade A)",
        listening: "39 / 60",
        total: "133 / 180",
        percentile: "94.0 Percentile",
        cefr: "A1",
      },
      skills: ["Japanese (Kanji & Kana)", "Reading Comprehension", "Listening Comprehension", "JLPT 94.0 Percentile"],
      category: "language",
      verificationUrl: "https://www.jlpt.jp/e/",
    },
  ] as Credential[],

  interests: [
    {
      title: "Japanese Language & Culture",
      subtitle: "JLPT N5 Cleared (94.0%tile) • Studying N4",
      description: "Fascinated by kanji, linguistics, Japanese literature, and anime culture alongside disciplined study.",
    },
    {
      title: "Competitive Programming & Problem Solving",
      subtitle: "1706 Peak • 3★ CodeChef • Specialist Codeforces",
      description: "Passionate about graph algorithms, dynamic programming optimizations, and mathematical problem solving.",
    },
    {
      title: "Music & Cultural Production",
      subtitle: "Battle of Bands Event Coordinator",
      description: "Coordinating live musical performances, audio engineering logistics, and enjoying acoustic & rock tracks.",
    },
  ],
};
