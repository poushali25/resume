import React, { memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'revealing';
export type TransitionDirection = 'forward' | 'reverse';

export interface PageTransitionProps {
  isTransitioning: boolean;
  phase: TransitionPhase;
  direction?: TransitionDirection;
  reducedMotion?: boolean;
  pageKey: string;
  children: React.ReactNode;
}

/**
 * LiquidWaveTransitionCanvas
 *
 * Implements the EXACT fluid liquid wave transition from the 1st page
 * (Scene 3 after the 1, 2, 3 countdown in EmbroideryScene.tsx):
 * - Deep Noir Black liquid body (#060606 to #100B0D to #1B1717)
 * - Multi-harmonic liquid wave path (wave frequencies 0.0055, 0.014, 0.026, 0.042)
 * - Glowing cherry red rim (#810100 & #D41428) with luminous shadow blur
 * - Luminous cherry fluid droplets dancing along the turbulent crest
 * - Slow and smooth rising wave that washes up across the viewport and reveals target page
 */
const LiquidWaveTransitionCanvas: React.FC<{
  phase: TransitionPhase;
  reducedMotion?: boolean;
}> = memo(({ phase, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const phaseRef = useRef<TransitionPhase>(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    startTimeRef.current = performance.now();

    const COVER_DURATION = 580; // ms to fully rise and 100% cover the screen
    const REVEAL_DURATION = 620; // ms to smoothly reveal target page from bottom to top
    const TOTAL_DURATION = COVER_DURATION + REVEAL_DURATION; // 1200ms total

    const step = 6;
    const waveFreq1 = 0.0055;
    const waveFreq2 = 0.014;
    const waveFreq3 = 0.026;
    const waveFreq4 = 0.042;

    const render = () => {
      const now = performance.now();
      const elapsed = now - startTimeRef.current;
      const t = elapsed / 1000;
      const waveTime = t * 5.2;

      ctx.clearRect(0, 0, w, h);

      if (elapsed < COVER_DURATION) {
        // =========================================================
        // PHASE 1: Leading wave rises from bottom, 100% covering screen
        // =========================================================
        const progress = Math.min(elapsed / COVER_DURATION, 1.0);
        // Smooth Hermite cubic ease-in-out curve
        const ease = progress * progress * (3 - 2 * progress);
        const leadY = h * (1.08 - ease * 1.24);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, h + 140);
        ctx.lineTo(0, leadY);

        // Compute multi-harmonic liquid wave crest
        for (let x = 0; x <= w + step; x += step) {
          const crest =
            Math.sin(x * waveFreq1 + waveTime) * 36 +
            Math.cos(x * waveFreq2 - waveTime * 0.75) * 22 +
            Math.sin(x * waveFreq3 + waveTime * 1.35) * 12 +
            Math.cos(x * waveFreq4 - waveTime * 1.8) * 6;
          ctx.lineTo(x, leadY + crest);
        }

        ctx.lineTo(w + 10, h + 140);
        ctx.closePath();

        // Deep Noir Black Liquid Body (#060606 to #100B0D to #1B1717)
        const fluidGrad = ctx.createLinearGradient(0, leadY, 0, h);
        fluidGrad.addColorStop(0, '#060606');
        fluidGrad.addColorStop(0.3, '#100B0D');
        fluidGrad.addColorStop(0.7, '#1B1717');
        fluidGrad.addColorStop(1, '#060606');
        ctx.fillStyle = fluidGrad;
        ctx.fill();

        // Glowing Cherry Red Wave Rim
        if (progress < 0.98) {
          ctx.lineWidth = 5.5;
          ctx.strokeStyle = '#810100';
          ctx.shadowColor = '#D41428';
          ctx.shadowBlur = 36;
          ctx.stroke();

          ctx.lineWidth = 2.0;
          ctx.strokeStyle = '#D41428';
          ctx.shadowColor = '#A3081A';
          ctx.shadowBlur = 16;
          ctx.stroke();

          // Delicate luminous cherry droplets along the crest
          ctx.fillStyle = '#D41428';
          for (let j = 0; j < 18; j++) {
            const dropX = ((j * 173 + Math.sin(t * 3.2 + j) * 90 + w) % w);
            const dropCrest =
              Math.sin(dropX * waveFreq1 + waveTime) * 36 +
              Math.cos(dropX * waveFreq2 - waveTime * 0.75) * 22;
            const dropY = leadY + dropCrest - 6 - Math.sin(t * 4 + j) * 10;
            const dropRadius = 1.0 + (j % 3) * 0.8;

            ctx.beginPath();
            ctx.arc(dropX, dropY, dropRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      } else {
        // =========================================================
        // PHASE 2: Trailing wave rises upward, smoothly unveiling target page
        // =========================================================
        const revealElapsed = elapsed - COVER_DURATION;
        const progress = Math.min(revealElapsed / REVEAL_DURATION, 1.0);
        // Smooth Hermite cubic ease
        const ease = progress * progress * (3 - 2 * progress);
        const trailY = h * (1.08 - ease * 1.24);

        ctx.save();
        ctx.beginPath();
        // Top boundary above the viewport
        ctx.moveTo(0, -140);
        ctx.lineTo(w + 10, -140);
        ctx.lineTo(w + 10, trailY);

        // Compute trailing liquid wave crest (right to left)
        for (let x = w + step; x >= -step; x -= step) {
          const crest =
            Math.sin(x * waveFreq1 + waveTime) * 36 +
            Math.cos(x * waveFreq2 - waveTime * 0.75) * 22 +
            Math.sin(x * waveFreq3 + waveTime * 1.35) * 12 +
            Math.cos(x * waveFreq4 - waveTime * 1.8) * 6;
          ctx.lineTo(x, trailY + crest);
        }

        ctx.closePath();

        // Deep Noir Black Liquid Body
        const fluidGrad = ctx.createLinearGradient(0, -140, 0, trailY);
        fluidGrad.addColorStop(0, '#060606');
        fluidGrad.addColorStop(0.3, '#100B0D');
        fluidGrad.addColorStop(0.7, '#1B1717');
        fluidGrad.addColorStop(1, '#060606');
        ctx.fillStyle = fluidGrad;
        ctx.fill();

        // Glowing Cherry Red Trailing Rim
        if (progress > 0.01 && progress < 0.98) {
          ctx.lineWidth = 5.5;
          ctx.strokeStyle = '#810100';
          ctx.shadowColor = '#D41428';
          ctx.shadowBlur = 36;
          ctx.stroke();

          ctx.lineWidth = 2.0;
          ctx.strokeStyle = '#D41428';
          ctx.shadowColor = '#A3081A';
          ctx.shadowBlur = 16;
          ctx.stroke();

          // Delicate luminous cherry droplets along trailing crest
          ctx.fillStyle = '#D41428';
          for (let j = 0; j < 18; j++) {
            const dropX = ((j * 173 + Math.sin(t * 3.2 + j) * 90 + w) % w);
            const dropCrest =
              Math.sin(dropX * waveFreq1 + waveTime) * 36 +
              Math.cos(dropX * waveFreq2 - waveTime * 0.75) * 22;
            const dropY = trailY + dropCrest + 6 + Math.sin(t * 4 + j) * 10;
            const dropRadius = 1.0 + (j % 3) * 0.8;

            ctx.beginPath();
            ctx.arc(dropX, dropY, dropRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      if (elapsed < TOTAL_DURATION) {
        animRef.current = requestAnimationFrame(render);
      }
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9950] pointer-events-none w-full h-full select-none"
      aria-hidden="true"
    />
  );
});

LiquidWaveTransitionCanvas.displayName = 'LiquidWaveTransitionCanvas';

/**
 * PageTransition — Luxury Fashion-Editorial Page-to-Page Transition System
 *
 * Recreates the exact signature liquid wave transition from the 1st page
 * (Scene 3 after the 1, 2, 3 countdown in EmbroideryScene):
 * - Deep Noir Black liquid body rising with multi-harmonic wave physics
 * - Glowing cherry red rim (#810100 / #D41428) with luminous blur
 * - Smooth and slow tempo (1500ms total) with zero content flash
 * - Gentle page reveal with soft blur dissolve
 */
export const PageTransition: React.FC<PageTransitionProps> = memo(({
  isTransitioning,
  phase,
  reducedMotion = false,
  pageKey,
  children,
}) => {
  return (
    <div className="relative w-full min-h-screen">
      {/* 
        FLUID LIQUID WAVE OVERLAY LAYER (z-[9950])
        Remains underneath Custom Star Cursor (z-[9999]), pointer-events-none
      */}
      <AnimatePresence>
        {isTransitioning && (
          <div
            className="fixed inset-0 z-[9950] pointer-events-none overflow-hidden select-none"
            aria-hidden="true"
          >
            {reducedMotion ? (
              /* Accessible Reduced Motion: Subtle soft cherry red opacity crossfade */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase === 'covering' || phase === 'covered' ? 0.98 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#810100]"
              />
            ) : (
              /* Full Cinematic Rising Liquid Wave (Exact 1st Page Scene 3) */
              <LiquidWaveTransitionCanvas phase={phase} reducedMotion={reducedMotion} />
            )}
          </div>
        )}
      </AnimatePresence>

      {/* 
        PAGE REVEAL WRAPPER
        Crisp and stable under the liquid wave, unveiled organically by the wave crest
      */}
      <motion.div
        key={pageKey}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0.96,
                scale: 1,
                y: 0,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
        className="relative w-full min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
});

PageTransition.displayName = 'PageTransition';
