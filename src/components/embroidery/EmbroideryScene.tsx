import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface EmbroiderySceneProps {
  progressTime: number; // in seconds
  reducedMotion?: boolean;
  onAnimationComplete?: () => void;
  onScrollToNext?: () => void;
  isExpandingForWork?: boolean;
  onSelectProject?: (projectId: string) => void;
  onSkipIntro?: () => void;
}

/**
 * CinematicLandingScene — Inspired by the dark red/black haute couture video reference.
 *
 * Sequence Choreography:
 * - Scene 1 (0.0s – 0.8s): Red Intro Screen
 *   Full-screen deep red (#920612) background with subtle film grain and minimal atmosphere.
 * - Scene 2 (0.8s – 3.8s): Large Centered Countdown (3 -> 2 -> 1)
 *   Bold Noir Black (#1B1717) editorial numerals 3, 2, 1 appear with smooth cinematic scale & fade.
 * - Scene 3 (3.8s – 5.6s): Dark Blue Liquid / Ink Flow Wave
 *   Thick organic dark blue fluid surges upward from the bottom with undulating deforming waves
 *   and a glowing bright cerulean-blue rim, engulfing the screen.
 * - Scene 4 (5.6s+): Galaxy Landing Environment Reveal
 *   Uploaded galaxy background with subtle deep blue atmospheric lighting and star clarity.
 * - Scene 5: Cutout Portrait of Poushali Maji in center.
 * - Scene 6: Oversized "POUSHALI MAJI" moving horizontally in infinite loop behind portrait.
 * - Scene 7: Navigation & About text fade in, cursor becomes fully interactive.
 */
export const EmbroideryScene: React.FC<EmbroiderySceneProps> = ({
  progressTime: _progressTime,
  reducedMotion = false,
  onAnimationComplete,
  onScrollToNext,
  isExpandingForWork: _isExpandingForWork = false,
  onSelectProject,
  onSkipIntro,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation Timeline Controller (starts from 0.0 for cinematic opening sequence)
  const [localTime, setLocalTime] = useState<number>(reducedMotion ? 9.0 : 0.0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(reducedMotion ? true : false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Mouse Parallax & Hover coordinates for interactive depth
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    tiltX: 0,
    tiltY: 0,
  });

  // Main high-precision animation loop
  useEffect(() => {
    if (reducedMotion) {
      setLocalTime(9.0);
      setHasCompleted(true);
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isPaused) {
        setLocalTime((prev) => {
          const next = prev + dt;
          if (next >= 3.2 && !hasCompleted) {
            setHasCompleted(true);
            onAnimationComplete?.();
          }
          return next;
        });
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPaused, reducedMotion, hasCompleted, onAnimationComplete]);

  // Mouse move handler for subtle 3D parallax on the portrait and ambient glow
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = nx * 18;
    mouseRef.current.targetY = ny * 14;
  };

  // Canvas resize and DPI configuration
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas Render Loop for Fluid Wave, Countdown, and Atmosphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const t = localTime;
    const m = mouseRef.current;
    m.tiltX += (m.targetX - m.tiltX) * 0.08;
    m.tiltY += (m.targetY - m.tiltY) * 0.08;

    // Timeline Boundaries
    const T_FLUID_START = 0.4;
    const T_FLUID_END = 2.2;

    // =========================================================
    // 1. SCENE 1: RED INTRO SCREEN (0.0s – 0.4s)
    // =========================================================
    if (t < T_FLUID_END && !reducedMotion) {
      // 1A. Deep rich red background matching reference video (#8A0000 / #900A0A)
      const redGrad = ctx.createRadialGradient(
        w * 0.5 + m.tiltX * 2,
        h * 0.45 + m.tiltY * 2,
        20,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      redGrad.addColorStop(0, '#920612'); // Rich vibrant crimson center
      redGrad.addColorStop(0.55, '#78040E'); // Deep dark red
      redGrad.addColorStop(1, '#4A0208'); // Shadowed maroon edges
      ctx.fillStyle = redGrad;
      ctx.fillRect(0, 0, w, h);

      // 1B. Subtle film grain overlay on red canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      for (let i = 0; i < 450; i++) {
        const gx = (Math.sin(i * 99 + t) * 0.5 + 0.5) * w;
        const gy = (Math.cos(i * 33 + t) * 0.5 + 0.5) * h;
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }

    // =========================================================
    // 2. SCENE 2: DARK BLUE LIQUID / INK FLOW WAVE (0.4s – 2.2s)
    // =========================================================
    if (t >= T_FLUID_START && !reducedMotion) {
      const fluidProgress = Math.min((t - T_FLUID_START) / (T_FLUID_END - T_FLUID_START), 1.0);
      // Fluid ease-in-out curve
      const fluidEase = fluidProgress * fluidProgress * (3 - 2 * fluidProgress);

      // Wave crest moves from bottom (h + 80) to top (-100)
      const baseY = h * (1.10 - fluidEase * 1.25);

      ctx.save();

      // Draw multi-harmonic liquid wave path
      ctx.beginPath();
      ctx.moveTo(0, h + 120);
      ctx.lineTo(0, baseY);

      const step = 6;
      const waveFreq1 = 0.0055;
      const waveFreq2 = 0.014;
      const waveFreq3 = 0.026;
      const waveFreq4 = 0.042;
      const waveTime = t * 5.6;

      for (let x = 0; x <= w + step; x += step) {
        const crest =
          Math.sin(x * waveFreq1 + waveTime) * 36 +
          Math.cos(x * waveFreq2 - waveTime * 0.75) * 22 +
          Math.sin(x * waveFreq3 + waveTime * 1.35) * 12 +
          Math.cos(x * waveFreq4 - waveTime * 1.8) * 6;
        ctx.lineTo(x, baseY + crest);
      }

      ctx.lineTo(w + 10, h + 120);
      ctx.closePath();

      // Deep Noir Black Liquid Body (#060606 to #1B1717)
      const fluidGrad = ctx.createLinearGradient(0, baseY, 0, h);
      fluidGrad.addColorStop(0, '#060606');
      fluidGrad.addColorStop(0.3, '#100B0D');
      fluidGrad.addColorStop(1, '#1B1717');
      ctx.fillStyle = fluidGrad;
      ctx.fill();

      // Glowing Cherry Red Wave Rim
      if (fluidProgress < 0.99) {
        // Outer soft vibrant cherry red glow
        ctx.lineWidth = 5.5;
        ctx.strokeStyle = '#810100';
        ctx.shadowColor = '#D41428';
        ctx.shadowBlur = 36;
        ctx.stroke();

        // Inner luminous cherry highlight rim
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = '#D41428';
        ctx.shadowColor = '#A3081A';
        ctx.shadowBlur = 16;
        ctx.stroke();

        // Delicate luminous fluid droplets along the turbulent crest
        ctx.fillStyle = '#D41428';
        for (let j = 0; j < 18; j++) {
          const dx = ((Math.sin(j * 53 + waveTime) * 0.5 + 0.5) * w);
          const dy = baseY + Math.sin(dx * waveFreq1 + waveTime) * 36 - 6 - (j % 4) * 8;
          const dropSize = 1.2 + (j % 3) * 0.8;
          ctx.beginPath();
          ctx.arc(dx, dy, dropSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // =========================================================
    // 3. SCENE 4: GALAXY LANDING ENVIRONMENT REVEAL (5.6s+)
    // =========================================================
    if (t >= T_FLUID_END || reducedMotion) {
      // Extremely subtle center contrast clearing so the uploaded galaxy image remains crisp and visible
      const darkGrad = ctx.createRadialGradient(
        w * 0.5 + m.tiltX * 1.5,
        h * 0.46 + m.tiltY * 1.5,
        25,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      darkGrad.addColorStop(0, 'rgba(5, 7, 11, 0.20)'); // very faint center readability backing
      darkGrad.addColorStop(0.5, 'rgba(5, 7, 11, 0.06)');
      darkGrad.addColorStop(1, 'rgba(5, 7, 11, 0)');

      ctx.fillStyle = darkGrad;
      ctx.fillRect(0, 0, w, h);

      // Faint film grain overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
      for (let i = 0; i < 180; i++) {
        const gx = (Math.sin(i * 47) * 0.5 + 0.5) * w;
        const gy = (Math.cos(i * 83) * 0.5 + 0.5) * h;
        ctx.fillRect(gx, gy, 1, 1);
      }
    }

    ctx.restore();
  }, [localTime, reducedMotion]);

  // Timing helper flags
  const isPostFluid = reducedMotion || localTime >= 2.2;
  const isTypographyActive = reducedMotion || localTime >= 2.4;

  const handleContainerClick = () => {
    if (localTime < 2.2) {
      setLocalTime(2.2);
      onSkipIntro?.();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onPointerMove={handlePointerMove}
      className={`relative z-20 w-full min-h-screen flex flex-col items-center justify-center select-none overflow-hidden bg-transparent ${
        localTime < 2.2 ? 'cursor-pointer' : ''
      }`}
    >
      {/* 1. Canvas Layer: Red Ground, Countdown & Organic Fluid Ink Wave */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 2. SCENE 6: OVERSIZED "POUSHALI MAJI" MOVING HORIZONTALLY */}
      {isPostFluid && (
        <div
          className={`absolute inset-0 z-15 flex items-center justify-center pointer-events-none overflow-hidden transition-opacity duration-1000 ${
            isTypographyActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Infinite Seamless Horizontal Marquee Track */}
          <div className="w-full flex items-center whitespace-nowrap overflow-hidden select-none">
            <div
              className="flex items-center space-x-12 shrink-0 animate-marquee"
              style={{
                animation: 'infiniteScroll 28s linear infinite',
              }}
            >
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="flex items-center space-x-12 shrink-0">
                  <span
                    className="text-white font-black tracking-[-0.04em] uppercase text-[15vw] sm:text-[17vw] md:text-[18vw] leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] select-none"
                    style={{
                      fontFamily: '"Orange Avenue", "Runiga", "Playfair Display", "Cormorant Garamond", Georgia, serif',
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    POUSHALI MAJI
                  </span>
                  <span className="text-[#810100] text-[5vw] font-light select-none">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SCENE 7: SMALL ABOUT-ME PARAGRAPH (UPPER-LEFT CORNER) */}
      <div
        className={`absolute top-8 left-6 sm:top-12 sm:left-12 max-w-[280px] sm:max-w-[340px] text-left z-30 transition-all duration-1000 ${
          isPostFluid ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <p className="text-white/85 text-[11px] sm:text-[12px] leading-relaxed font-light tracking-wide">
          I am Poushali Maji, a fashion designer exploring structured garments, Western
          silhouettes, Indian textiles, and experimental craftsmanship. My work combines form,
          material, and cultural influence to create contemporary fashion.
        </p>
      </div>

      {/* 4. SCENE 9: EDITORIAL GRAPHIC DETAILS (BOTTOM LEFT) */}
      <div
        className={`absolute bottom-8 left-6 sm:left-12 z-30 flex flex-col space-y-1.5 transition-all duration-1000 ${
          isPostFluid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Minimal red progress tick marks */}
        <div className="flex items-center space-x-1 text-[#810100] text-[8px] tracking-[0.3em] font-mono">
          <span>||||||||||||||||||||||||||||||||||||||||</span>
        </div>
      </div>

      {/* 5. DOWNWARD SCROLL PROMPT */}
      {onScrollToNext && (
        <button
          onClick={onScrollToNext}
          aria-label="Scroll down to About Atelier section"
          className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-35 flex flex-col items-center justify-center p-2 text-white/70 hover:text-white transition-all duration-700 cursor-pointer group ${
            isPostFluid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <ChevronDown
            size={18}
            className="text-[#810100] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300 animate-bounce"
          />
        </button>
      )}

      {/* Global CSS for infinite horizontal marquee */}
      <style>{`
        @keyframes infiniteScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};
