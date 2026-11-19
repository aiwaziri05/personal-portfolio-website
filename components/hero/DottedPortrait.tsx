"use client";

import { useEffect, useRef, useState } from "react";

interface PointData {
  x: number;
  y: number;
  val: number;
  isGlint?: boolean;
}

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  baseColor: string;
  alpha: number;
  baseAlpha: number;
  isGlint: boolean;
}

export function DottedPortrait() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let animId: number;
    let particles: Particle[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 380;
    let height = 410;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 70,
      isHovered: false,
    };

    let ripple: { x: number; y: number; r: number; active: boolean } = {
      x: 0,
      y: 0,
      r: 0,
      active: false,
    };

    // Load points
    fetch("/portrait_points.json")
      .then((res) => res.json())
      .then((points: PointData[]) => {
        setupCanvas();

        particles = points.map((p) => {
          const ox = p.x * width;
          const oy = p.y * height;
          const baseRadius = p.val * 1.9 + 0.7;

          let color = "#e8a95c";
          if (p.isGlint) {
            color = "#fff2db";
          } else if (p.val > 0.65) {
            color = "#f4c384";
          } else if (p.val < 0.25) {
            color = "#c97f32";
          }

          const baseAlpha = p.val * 0.75 + 0.25;

          return {
            x: ox,
            y: oy,
            ox,
            oy,
            vx: 0,
            vy: 0,
            radius: baseRadius,
            baseRadius,
            color,
            baseColor: color,
            alpha: baseAlpha,
            baseAlpha,
            isGlint: !!p.isGlint,
          };
        });

        setLoaded(true);
        startAnimation();
      })
      .catch((err) => {
        console.error("Failed to load portrait points:", err);
      });

    function setupCanvas() {
      if (!canvas || !containerRef.current || !ctx) return;
      const rect = containerRef.current.getBoundingClientRect();
      const displayWidth = Math.min(rect.width || 380, 420);
      const displayHeight = displayWidth * (410 / 380);

      width = displayWidth;
      height = displayHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.scale(dpr, dpr);
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const spring = 0.085;
      const friction = 0.85;
      let moving = false;

      // Handle click ripple shockwave
      if (ripple.active) {
        ripple.r += 9;
        if (ripple.r > Math.max(width, height) * 1.3) {
          ripple.active = false;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse dispersion physics
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.isHovered) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 5.2;
          p.vy += Math.sin(angle) * force * 5.2;
          p.radius = p.baseRadius * (1 + force * 0.5);
        } else {
          p.radius = p.baseRadius;
        }

        // 2. Click ripple shockwave
        if (ripple.active) {
          const rdx = p.x - ripple.x;
          const rdy = p.y - ripple.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - ripple.r);
          if (diff < 35) {
            const rforce = (35 - diff) / 35;
            const rangle = Math.atan2(rdy, rdx);
            p.vx += Math.cos(rangle) * rforce * 4.5;
            p.vy += Math.sin(rangle) * rforce * 4.5;
          }
        }

        // 3. Spring back to original anchor
        const ax = (p.ox - p.x) * spring;
        const ay = (p.oy - p.y) * spring;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02) {
          moving = true;
        }

        // Proximity glow: dots near cursor brighten
        let currentAlpha = p.baseAlpha;
        let currentColor = p.baseColor;
        if (dist < mouse.radius * 1.4 && mouse.isHovered) {
          currentAlpha = Math.min(1, p.baseAlpha + 0.35);
          currentColor = "#ffd99b";
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = currentColor;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (mouse.isHovered || moving || ripple.active) {
        animId = requestAnimationFrame(render);
      } else {
        animId = requestAnimationFrame(() => {
          ctx.clearRect(0, 0, width, height);
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.ox, p.oy, Math.max(0.6, p.baseRadius), 0, Math.PI * 2);
            ctx.fillStyle = p.baseColor;
            ctx.globalAlpha = p.baseAlpha;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        });
      }
    }

    function startAnimation() {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(render);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
      startAnimation();
    };

    const onPointerLeave = () => {
      mouse.isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
      startAnimation();
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 10,
        active: true,
      };
      startAnimation();
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    window.addEventListener("resize", () => {
      setupCanvas();
      startAnimation();
    });

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-[380/410] mx-auto flex items-center justify-center select-none"
    >
      {/* Subtle ambient warm golden backlight glow - no card container */}
      <div className="absolute inset-0 rounded-full bg-[#e8a95c]/12 blur-[85px] pointer-events-none scale-90" />

      {/* Pure borderless canvas seamlessly floating on page background */}
      <canvas
        ref={canvasRef}
        className="relative z-10 block cursor-crosshair touch-none"
        aria-label="Interactive stippled particle portrait of Abdullahi Idi Waziri"
      />

      {/* Instant SVG fallback before canvas renders */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait_dotted.svg"
            alt="Abdullahi Idi Waziri - Stippled Portrait"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
