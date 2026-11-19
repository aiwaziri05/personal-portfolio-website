import React from "react";

export function ReactLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-label="Next.js">
      <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" data-framer-name="background" fill="black" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function TypeScriptLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-label="TypeScript">
      <path fill="#3178c6" d="M1.5 1.5h125v125H1.5z" />
      <path fill="#fff" d="M68.7 87.8c-2.3-1.6-4.2-3.8-5.6-6.6-1.4-2.8-2.1-6.1-2.1-9.9h12.5c0 2.5.5 4.6 1.4 6.2.9 1.6 2.3 2.9 4 3.7 1.8.9 3.8 1.3 6.1 1.3 2 0 3.8-.3 5.3-1 1.5-.7 2.7-1.6 3.6-2.9.9-1.2 1.3-2.6 1.3-4.2 0-1.6-.4-2.9-1.3-4-.9-1.1-2.2-2-4-2.8-1.8-.8-4.2-1.6-7.1-2.4-4-.9-7.4-2-10.3-3.3-2.8-1.3-5-3-6.6-5.2-1.6-2.2-2.4-5-2.4-8.4 0-3.5 1-6.6 2.9-9.1 1.9-2.6 4.7-4.5 8.2-5.9 3.6-1.4 7.8-2 12.6-2 4.4 0 8.4.7 12 2.1 3.6 1.4 6.5 3.5 8.6 6.3 2.1 2.8 3.2 6.1 3.2 10H97.7c0-2.3-.4-4.2-1.2-5.7-.8-1.5-2-2.7-3.7-3.4-1.6-.7-3.6-1.1-5.9-1.1-2 0-3.8.3-5.3 1-1.5.7-2.6 1.6-3.5 2.8-.8 1.2-1.3 2.6-1.3 4.2 0 1.5.4 2.8 1.2 3.8.8 1 2 1.9 3.6 2.6 1.6.7 3.8 1.5 6.6 2.3 4.2 1 7.9 2.2 11 3.5 3.1 1.4 5.5 3.2 7.2 5.5 1.7 2.3 2.6 5.2 2.6 8.7 0 3.7-1 6.8-3 9.4-2 2.6-4.8 4.6-8.5 6-3.7 1.4-8.1 2.1-13.3 2.1-6.1 0-11.3-1-15.6-2.9zM42.4 34.6v62.8H28.9V34.6h-24V22.4h61.5v12.2z" />
    </svg>
  );
}

export function TailwindLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 33" fill="none" className={className} aria-label="Tailwind CSS">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.005-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4" />
    </svg>
  );
}

export function InertiaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Inertia.js">
      <path fill="#9553E9" d="M5.38 4L0 9.38l6.92 6.92 5.38-5.38L5.38 4zm11.7 0l-5.38 5.38 5.38 5.38L24 7.84 17.08 4z" />
    </svg>
  );
}

export function HtmlCssLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="HTML5 & CSS3">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#E34F26" />
      <path d="M12 5v14.8l5-1.5 1.2-13.3H12z" fill="#EF652A" />
      <path d="M7.8 7.5h8.4l-.2 2.2H12v2.2h3.8l-.4 4.5-3.4 1-3.4-1-.2-2.5h2.2l.1 1.2 1.3.4 1.3-.4.2-1.9H7.5l.3-5.7z" fill="#FFF" />
    </svg>
  );
}

export function LaravelLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-label="Laravel">
      <path fill="#FF2D20" d="M410.8 152.9l-114-65.7c-6.8-3.9-15.2-3.9-22 0l-114 65.7c-6.8 3.9-11 11.2-11 19.1v131.5c0 7.8 4.2 15.1 11 19.1l114 65.7c6.8 3.9 15.2 3.9 22 0l114-65.7c6.8-3.9 11-11.2 11-19.1V172c0-7.9-4.2-15.2-11-19.1zm-125 198.8l-92-53V192.9l92 53v105.8zm22-143.9l-92-53 92-53 92 53-92 53zm92 90.9l-92 53V245.9l92-53v105.8z" />
    </svg>
  );
}

export function PhpLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="PHP">
      <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
      <text x="12" y="15" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PHP</text>
    </svg>
  );
}

export function MySqlLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MySQL">
      <path d="M12 3c-4.97 0-9 4.03-9 9 0 3.86 2.44 7.15 5.88 8.41.25.09.52-.08.52-.35v-1.92c-1.39.29-2.4-.64-2.4-.64-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-1.99 1.03-2.69-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.65.7 1.03 1.58 1.03 2.69 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V20c0 .27.27.44.52.35C18.56 19.15 21 15.86 21 12c0-4.97-4.03-9-9-9z" fill="#00758F" />
    </svg>
  );
}

export function PostgresLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="PostgreSQL">
      <circle cx="12" cy="12" r="10" fill="#336791" />
      <path d="M12 6c-3.3 0-6 2.7-6 6 0 1.9.9 3.6 2.3 4.7l.7-.7c-1.1-.9-1.8-2.3-1.8-3.9 0-2.8 2.2-5 5-5 1.6 0 3 .7 3.9 1.8l.7-.7C15.6 6.9 13.9 6 12 6z" fill="#FFF" />
      <circle cx="12" cy="12" r="3" fill="#FFF" />
    </svg>
  );
}

export function FirebaseLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Firebase">
      <path d="M4.5 19.5L7.2 3.8a.7.7 0 011.3-.2l2.6 5L4.5 19.5z" fill="#FFC400" />
      <path d="M4.5 19.5l7.9-15.6a.7.7 0 011.3.1l2.4 4.5-11.6 11z" fill="#FFA000" />
      <path d="M12.4 21.8l7.1-13a.7.7 0 011.2.2L22 19.5l-9.6 2.3z" fill="#FF8F00" />
      <path d="M12 22l-7.5-2.5L12 9l7.5 10.5L12 22z" fill="#FFCA28" />
    </svg>
  );
}

export function PaystackLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Paystack">
      <rect width="24" height="24" rx="4" fill="#001824" />
      <path d="M4 7h16M4 12h12M4 17h8" stroke="#00C3F7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function OsmLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="OpenStreetMap">
      <circle cx="12" cy="12" r="10" fill="#7EBC6F" />
      <path d="M12 6a4 4 0 00-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 00-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#FFF" />
    </svg>
  );
}

export function SecurityLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="SHA-256 Cryptography">
      <rect width="24" height="24" rx="5" fill="#18181b" />
      <path d="M12 4l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V7l7-3z" stroke="#e8a95c" strokeWidth="2" strokeLinejoin="round" fill="#e8a95c" fillOpacity="0.15" />
      <path d="M9.5 12l2 2 4-4" stroke="#e8a95c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WebhookLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Webhooks & REST APIs">
      <rect width="24" height="24" rx="5" fill="#18181b" />
      <circle cx="6" cy="12" r="2.5" fill="#38bdf8" />
      <circle cx="18" cy="7" r="2.5" fill="#10b981" />
      <circle cx="18" cy="17" r="2.5" fill="#e8a95c" />
      <path d="M8.5 12h3m0 0l4-4m-4 4l4 4" stroke="#a1a1aa" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function GeminiLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Gemini API & AI Workflows">
      <rect width="24" height="24" rx="5" fill="#18181b" />
      <path d="M12 3c0 5-4 9-9 9 5 0 9 4 9 9 0-5 4-9 9-9-5 0-9-4-9-9z" fill="url(#gemini-grad)" />
      <defs>
        <linearGradient id="gemini-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E7FFF" />
          <stop offset="0.5" stopColor="#B37FFF" />
          <stop offset="1" stopColor="#FF7FAA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GitLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Git">
      <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l3.3 3.3c.4-.1.8 0 1.1.3.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0-.3-.3-.4-.7-.3-1.1L8.2 5.4 2.4 11.2c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.6.6-1.5 0-2.3z" fill="#F05032" />
      <circle cx="12" cy="12" r="1.5" fill="#FFF" />
    </svg>
  );
}

export function GhActionsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="GitHub Actions (CI/CD)">
      <rect width="24" height="24" rx="5" fill="#2088FF" />
      <path d="M6 12l4 4 8-8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServerLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="SSH & cPanel">
      <rect width="24" height="24" rx="5" fill="#FF6C2C" />
      <path d="M6 8h12M6 12h12M6 16h8" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ViteLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Vite">
      <path d="M20.5 4.5l-8.2 16.2a.6.6 0 01-1.1 0L3.5 4.5a.6.6 0 01.7-.8l7.5 2.5 7.5-2.5a.6.6 0 01.7.8z" fill="url(#vite-grad)" />
      <path d="M12.8 3.5l-5 10.5h3.5l-1.5 6 6-9.5h-4l3-7h-2z" fill="#FFD025" />
      <defs>
        <linearGradient id="vite-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LighthouseLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Google Lighthouse">
      <rect width="24" height="24" rx="5" fill="#0A0A0A" />
      <path d="M12 4l3 13H9l3-13z" fill="#FF5252" />
      <path d="M9 17h6v3H9v-3z" fill="#FFF" />
      <path d="M12 7l1.5 7h-3L12 7z" fill="#FFD740" />
    </svg>
  );
}

export function FigmaLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} aria-label="Figma">
      <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5V38H9.5A9.5 9.5 0 000 47.5z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF" />
    </svg>
  );
}

