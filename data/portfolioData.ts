export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  role: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface Service {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tech: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Abdullahi Idi Waziri",
    shortName: "Abdullahi",
    role: "Full-Stack Developer & Systems Builder",
    specialty: "Laravel · React · Next.js · TypeScript",
    email: "idiwaziriabdullahi@gmail.com",
    phone: "+234 703 183 2460",
    phoneRaw: "+2347031832460",
    whatsapp: "https://wa.me/2347031832460?text=Hi%20Abdullahi,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project",
    location: "Kano, Nigeria",
    timezone: "WAT (UTC+1)",
    availability: "Available for freelance & contract work",
    github: "https://github.com/aiwaziri05",
    linkedin: "https://linkedin.com/in/abdullahi-idi-waziri-040922297",
  },

  hero: {
    kicker: "Full-Stack Web Engineer & Systems Architect",
    titleLine1: "Systems you never",
    titleLine2: "have to think about.",
    lead: "I design and engineer reliable web applications, custom platforms, and automated workflows—from database schemas and Paystack checkouts to high-speed interfaces.",
  },

  stats: [
    { value: "2+", label: "Years in Production", subtext: "Laravel, React & Next.js" },
    { value: "100%", label: "Deployment Reliability", subtext: "Automated GitHub Actions CI/CD" },
    { value: "<400ms", label: "Average Response Time", subtext: "Optimized queries & caching" },
    { value: "SHA-256", label: "Tamper-Proof Data", subtext: "Cryptographic verification" },
  ],

  about: {
    statement:
      "Most of what I build, you will never see: the automated checkout that captures customer revenue without fail, the background pipeline deploying tested code without downtime, the attendance system sealed cryptographically against tampering. I care deeply about both invisible architecture and the UI people interact with.",
    note: "Based in Kano, Nigeria (WAT / UTC+1) — working with startups, growing local businesses, and modern product teams.",
  },

  services: [
    {
      number: "01",
      title: "Full-Stack Web Applications",
      subtitle: "Custom SaaS, Portals & Dashboards",
      description:
        "Building end-to-end web applications with modern architectures. Clean database migrations, secure RESTful APIs, and fast reactive frontends that give users an app-like experience.",
      deliverables: [
        "Database design, migrations & seeders (MySQL, PostgreSQL)",
        "API architecture & authentication (Sanctum, JWT, OAuth)",
        "Reactive single-page interfaces (React, Next.js, Inertia.js)",
        "State management and form validations with TypeScript",
      ],
      tech: ["Laravel", "React", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      number: "02",
      title: "E-Commerce & Payment Engines",
      subtitle: "Paystack Checkouts & Invoicing",
      description:
        "Integrating secure payment gateways and building frictionless buying flows for e-commerce, services, and online trainings. Ensuring every transaction is verified and reconciled.",
      deliverables: [
        "Paystack & Stripe checkout integration",
        "Webhook handling with idempotency & retry mechanics",
        "Automated digital invoice & receipt delivery",
        "Order management and fulfillment tracking",
      ],
      tech: ["Paystack", "PHP / Laravel", "REST APIs", "MySQL", "Webhooks"],
    },
    {
      number: "03",
      title: "DevOps & CI/CD Pipelines",
      subtitle: "Automated Zero-Downtime Releases",
      description:
        "Eliminating manual, error-prone file uploads. Setting up automated pipelines where tests run on every push and deployments ship seamlessly over SSH only when green.",
      deliverables: [
        "GitHub Actions CI/CD workflows",
        "Automated unit & feature test runners",
        "Zero-downtime SSH and cPanel server deployments",
        "Environment configuration & secret management",
      ],
      tech: ["GitHub Actions", "Git", "SSH", "cPanel", "Linux"],
    },
    {
      number: "04",
      title: "System Modernization & Speed",
      subtitle: "Refactoring Legacy Code & Audits",
      description:
        "Turning tangled legacy codebases into maintainable MVC architectures. Optimizing database queries, caching strategies, and Core Web Vitals to improve conversion.",
      deliverables: [
        "Legacy PHP refactoring into structured MVC patterns",
        "Google Lighthouse performance & accessibility optimization",
        "Database indexing and slow query resolution",
        "Asset minification & modern image pipeline setup",
      ],
      tech: ["PHP MVC", "Lighthouse", "SQL Optimization", "Vite"],
    },
  ] as Service[],

  projects: [
    {
      id: "spidergate",
      number: "01",
      title: "SpiderGate Staff Attendance System",
      category: "Web Application · Security & Geofencing",
      summary:
        "A geofenced QR-based attendance system with real-time WAT time logic and SHA-256 cryptographic midnight sealing that replaced a paper register.",
      challenge:
        "Staff signed in on a physical paper register daily. This caused administrative bottlenecks, was prone to buddy-punching, and made attendance auditing slow and inaccurate.",
      solution:
        "Designed and implemented an automated Next.js and Firebase platform. One-scan QR workflow detects current Lagos (WAT) time to transition between morning check-in and evening check-out. Enforced an OpenStreetMap geofence blocking submissions outside a 200m office radius. Implemented an automated midnight worker that hashes the day's attendance log with SHA-256, rendering records permanently tamper-proof even by administrators.",
      outcome:
        "100% elimination of paper tracking, zero buddy-punching, and instant, mathematically verifiable attendance auditing.",
      tags: ["Next.js (App Router)", "Firebase", "OpenStreetMap", "SHA-256", "TypeScript"],
      role: "Lead Architect & Developer",
      year: "2026",
      liveUrl: "https://github.com/aiwaziri05/spidergate",
      githubUrl: "https://github.com/aiwaziri05",
      featured: true,
      metrics: [
        { label: "Paper Eliminated", value: "100%" },
        { label: "Geofence Radius", value: "200m" },
        { label: "Tamper Proof", value: "SHA-256" },
      ],
    },
    {
      id: "spider-platform",
      number: "02",
      title: "Spider Technologies Platform & Paystack Gateway",
      category: "Production Infrastructure · Paystack & CI/CD",
      summary:
        "Complete architectural refactoring from vanilla PHP to a maintainable MVC codebase, with Paystack payments and automated CI/CD deployments.",
      challenge:
        "The production company website was built on monolithic vanilla PHP, making updates risky. Training enrollments had to be verified manually via bank transfers, and deploys were done by manually dragging files into cPanel.",
      solution:
        "Refactored the application into a clean MVC structure. Redesigned the UI for high contrast, modern typography, and mobile responsiveness. Built an end-to-end Paystack checkout for course registrations with webhook verification. Engineered a GitHub Actions workflow that executes tests on pull requests and deploys over SSH automatically.",
      outcome:
        "Cut deployment overhead from 30+ minutes of manual file swapping to zero-touch releases in under 60 seconds; converted training signups into instant online revenue.",
      tags: ["PHP (MVC)", "Paystack API", "GitHub Actions", "TailwindCSS", "MySQL"],
      role: "Software Development Engineer",
      year: "2024 – Present",
      liveUrl: "https://spidertech.com.ng",
      githubUrl: "https://github.com/aiwaziri05",
      featured: true,
      metrics: [
        { label: "Deployment Time", value: "< 60s" },
        { label: "Architecture", value: "Clean MVC" },
        { label: "Checkout", value: "Paystack" },
      ],
    },
    {
      id: "inral-hr",
      number: "03",
      title: "Inral HR & Recruitment Management System",
      category: "Enterprise SaaS · Hiring Workflow",
      summary:
        "Full-stack recruitment and applicant tracking portal built with Laravel, React, and Inertia.js for modern recruitment teams.",
      challenge:
        "Client needed an intuitive, fast recruitment portal to manage candidate vetting, job requisitions, and multi-stage hiring without the sluggishness of typical legacy enterprise HR software.",
      solution:
        "Engineered the responsive React frontend alongside Laravel backend endpoints. Leveraged Inertia.js to achieve seamless single-page application feel without the overhead of maintaining a separate API client. Built data models, migrations, and role-based permissions for recruiters.",
      outcome:
        "Live in production supporting candidate pipelines with instant transitions and consistent state synchronization.",
      tags: ["Laravel", "React", "Inertia.js", "MySQL", "TailwindCSS"],
      role: "Full-Stack Developer",
      year: "2026",
      liveUrl: "https://inralsolutions.com",
      githubUrl: "https://github.com/aiwaziri05",
      featured: true,
      metrics: [
        { label: "SPA Navigation", value: "Inertia.js" },
        { label: "Role Auth", value: "RBAC" },
        { label: "Database", value: "MySQL" },
      ],
    },
    {
      id: "cgs-buk",
      number: "04",
      title: "Centre for Gender Studies (CGS-BUK) Portal",
      category: "Institutional Platform · Bayero University Kano",
      summary:
        "Accessible, responsive academic portal engineered for public research publications, academic events, and department initiatives.",
      challenge:
        "The academic department required a credible, high-uptime digital presence compliant with accessibility requirements to communicate with university leadership, scholars, and international grant organizations.",
      solution:
        "Built the public portal using Laravel, React, and TailwindCSS. Focused on semantic HTML, WCAG AA color contrasts, responsive typography, and an intuitive administrative backend for staff updates.",
      outcome:
        "Successfully launched to serve academic scholars, student inquiries, and external research partners.",
      tags: ["Laravel", "React", "TailwindCSS", "Accessibility"],
      role: "Frontend & Integration Developer",
      year: "2026",
      liveUrl: "https://centreforgenderstudiesbuk.com",
      githubUrl: "https://github.com/aiwaziri05",
      featured: false,
      metrics: [
        { label: "Accessibility", value: "WCAG AA" },
        { label: "Framework", value: "Laravel + React" },
        { label: "Speed", value: "98+ CWV" },
      ],
    },
  ] as Project[],

  nowBuilding: [
    {
      title: "weCode Youth Bootcamp",
      category: "Community Initiative",
      description:
        "A community web development bootcamp founded in Kano to mentor teenagers in modern coding, Git fundamentals, and real-world problem solving.",
      status: "Active Cohorts",
      badge: "Mentorship",
    },
    {
      title: "Automated Operations Studio",
      category: "Workflow Engineering",
      description:
        "Building lightweight automation workflows connecting n8n, Gemini AI, and Google Workspace to eliminate manual back-office tasks for small businesses.",
      status: "In Development",
      badge: "Automation",
    },
  ],

  experience: [
    {
      period: "Aug 2024 — Present",
      role: "Software Development Engineer (Full-time)",
      company: "Spider Technologies Limited",
      location: "Kano, Nigeria",
      highlights: [
        "Architect and maintain core features across production Laravel, React, and Inertia.js web applications.",
        "Refactored legacy vanilla PHP systems into structured MVC patterns and integrated Paystack payment gateways.",
        "Engineered automated GitHub Actions CI/CD pipelines to replace error-prone manual cPanel FTP uploads.",
        "Conceived and developed the SpiderGate geofenced attendance system with cryptographic SHA-256 data sealing.",
        "Lead frontend performance audits using Google Lighthouse to maintain fast load times and clean Core Web Vitals.",
      ],
      tech: ["Laravel", "React", "Next.js", "Inertia.js", "TypeScript", "Paystack", "GitHub Actions", "MySQL"],
    },
  ] as ExperienceItem[],

  toolkit: {
    frontend: ["React 19", "Next.js (App Router)", "TypeScript", "TailwindCSS", "Inertia.js", "HTML5/CSS3"],
    backend: ["Laravel", "PHP (MVC)", "REST APIs", "MySQL", "PostgreSQL", "Firebase Auth", "Cloud Firestore"],
    integrations: ["Paystack Checkout", "OpenStreetMap", "SHA-256 Cryptography", "Webhooks", "Gemini API"],
    devops: ["Git & GitHub", "GitHub Actions (CI/CD)", "SSH & cPanel", "Vite", "Google Lighthouse", "Figma"],
  },

  motto: {
    line1: "Good code",
    line2: "is",
    accent: "invisible.",
    hidden1: "Until something breaks.",
    hidden2: "Then I fix it at the source.",
  },

  testimonials: [
    {
      quote:
        "Abdullahi doesn't just write code; he digs into the actual business problem. His refactor of our site and the Paystack integration turned a clunky process into a seamless revenue channel.",
      author: "Engineering Lead",
      role: "Spider Technologies Limited",
      organization: "Spider Technologies",
    },
    {
      quote:
        "Replacing our manual paper register with SpiderGate was entirely his idea and execution. The geofencing and automated cryptographic locking gave us bulletproof record keeping.",
      author: "Operations Manager",
      role: "Internal Systems",
      organization: "Spider Technologies",
    },
  ] as Testimonial[],

  contact: {
    heading: "What's actually hurting?",
    subheading: "Tell me about your project, your bottleneck, or the system you need built.",
    steps: [
      {
        step: "01",
        title: "Tell me about your project",
        detail: "Send a direct message on WhatsApp or email with your requirements and current pain points.",
      },
      {
        step: "02",
        title: "I reply within 24 hours",
        detail: "A direct personal reply with initial technical thoughts—no automated boilerplate.",
      },
      {
        step: "03",
        title: "A quick scoping call",
        detail: "We align on scope, deliverables, architecture, and a transparent fixed or milestone estimate in ₦ (or $).",
      },
    ],
    briefTemplate: `Hi Abdullahi,

I'm reaching out regarding a project for [Company / Business Name].

What we need built:
[e.g., Next.js web application / Laravel API / Paystack checkout / Business automation]

Current site or app (if any):
[URL or None]

Target timeline:
[e.g., 2-4 weeks / ASAP / Flexible]

Estimated budget range (NGN ₦):
[e.g., ₦500,000 - ₦1,500,000 / ₦2,000,000+ / Flexible]`,
  },
};
