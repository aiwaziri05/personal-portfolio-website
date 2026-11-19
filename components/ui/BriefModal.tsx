"use client";

import { useState } from "react";
import { Copy, Check, Mail, X } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  template: string;
  phoneRaw?: string;
}

export function BriefModal({
  isOpen,
  onClose,
  email,
  template,
  phoneRaw = "+2347031832460",
}: BriefModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Ignored
    }
  };

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    "New Project Inquiry"
  )}&body=${encodeURIComponent(template)}`;

  const whatsappUrl = `https://wa.me/${phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    template
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.14] bg-[#121217] p-6 sm:p-7 shadow-2xl text-left ring-1 ring-[#e8a95c]/25"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brief-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h3 id="brief-title" className="text-base font-bold text-white">
              Project Brief Template (₦ NGN / USD)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Copy this format or send directly via WhatsApp or email.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <pre className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
            {template}
          </pre>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-white/[0.12] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>{copied ? "Copied ✓" : "Copy Brief"}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow-sm"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Send on WhatsApp</span>
          </a>

          <a
            href={mailtoUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#e8a95c] hover:bg-[#f3c285] text-zinc-950 transition-colors shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Open Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
