import React from "react";

interface SectionHeadingProps {
  chapter: string;
  title: string;
  subtitle?: string;
  aside?: string;
}

export function SectionHeading({
  chapter,
  title,
  subtitle,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 border-b border-white/[0.08] pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-[#e8a95c] font-bold">
          {chapter}
        </span>
        {aside && (
          <span className="font-mono text-xs text-zinc-500">
            {aside}
          </span>
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
