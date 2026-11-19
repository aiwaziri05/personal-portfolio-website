import React from "react";
import { WhatsAppIcon } from "./Icons";

interface WhatsAppButtonProps {
  phoneRaw?: string;
  message?: string;
  className?: string;
  variant?: "solid" | "outline" | "pill" | "icon";
  children?: React.ReactNode;
}

export function WhatsAppButton({
  phoneRaw = "+2347031832460",
  message = "Hi Abdullahi, I saw your portfolio and would like to discuss a project.",
  className = "",
  variant = "solid",
  children,
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phoneRaw.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-200 select-none cursor-pointer active:scale-95";

  const variantStyles = {
    // Solid WhatsApp button: Vibrant #25D366 background with crisp bright white text & white icon
    solid:
      "px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-lg shadow-[#25D366]/25 tracking-wide",
    outline:
      "px-4 py-2.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] hover:text-white font-medium",
    pill:
      "px-3.5 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] hover:text-white text-xs font-semibold",
    icon:
      "p-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-white",
  };

  const isSolid = variant === "solid";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label="Chat directly on WhatsApp"
    >
      <WhatsAppIcon className={`w-4 h-4 shrink-0 ${isSolid ? "text-white" : "text-[#25D366]"}`} />
      <span className={isSolid ? "text-white font-bold" : ""}>
        {children || "Chat on WhatsApp"}
      </span>
    </a>
  );
}
