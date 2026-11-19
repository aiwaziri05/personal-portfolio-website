import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Abdullahi Idi Waziri | Full-Stack Developer & Systems Builder",
  description:
    "Full-Stack Developer (Laravel, React, Next.js, TypeScript). Building reliable, high-performance web applications, payment systems, and automated workflows for startups, e-commerce, and businesses.",
  authors: [{ name: "Abdullahi Idi Waziri", url: "https://github.com/aiwaziri05" }],
  keywords: [
    "Full-Stack Developer",
    "Laravel Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Paystack Integration",
    "Nigeria Freelance Developer",
    "Web Application Engineer",
  ],
  openGraph: {
    title: "Abdullahi Idi Waziri | Full-Stack Developer",
    description:
      "Full-stack engineer building fast, reliable web applications from database architecture to modern frontend interfaces.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullahi Idi Waziri | Full-Stack Developer",
    description:
      "Full-stack engineer specializing in Laravel, React, Next.js, and reliable business systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-[#0a0a0c] text-[#f4f4f5] antialiased selection:bg-sky-500/20 selection:text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
