"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  variant?: "pill" | "outline" | "solid";
  className?: string;
  showIcon?: boolean;
}

export function CopyEmailButton({
  email,
  variant = "outline",
  className = "",
  showIcon = true,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      window.location.href = `mailto:${email}`;
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98]";

  const variantStyles = {
    pill: "px-4 py-2 rounded-full border border-white/[0.1] bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white hover:border-white/[0.2]",
    outline:
      "px-4 py-2.5 rounded-lg border border-white/[0.1] bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white hover:border-white/[0.2]",
    solid:
      "px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white font-semibold shadow-sm",
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={`Copy email address ${email}`}
    >
      {showIcon && (
        copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-zinc-400" />
        )
      )}
      <span>{copied ? "Email copied ✓" : email}</span>
    </button>
  );
}

