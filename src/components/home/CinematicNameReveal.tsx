import React, { useEffect, useRef, useState } from 'react';

interface CinematicNameRevealProps {
  progressTime: number; // in seconds
  reducedMotion?: boolean;
  onAnimationSettled?: () => void;
  isExpandingForWork?: boolean;
}

interface LetterConfig {
  char: string;
  wordIndex: number;
  letterIndex: number;
  appearTime: number; // in seconds
  initialY: number;   // initial vertical offset
  initialZ: number;   // initial depth offset
  initialRot: number; // initial slight rotation in degrees
}

const LETTERS: LetterConfig[] = [
  // POUSHALI
  { char: 'P', wordIndex: 0, letterIndex: 0, appearTime: 0.5,  initialY: 24,  initialZ: -35, initialRot: -2.0 },
  { char: 'O', wordIndex: 0, letterIndex: 1, appearTime: 0.7,  initialY: -18, initialZ: -30, initialRot: 1.5 },
  { char: 'U', wordIndex: 0, letterIndex: 2, appearTime: 0.9,  initialY: 20,  initialZ: -35, initialRot: -1.0 },
  { char: 'S', wordIndex: 0, letterIndex: 3, appearTime: 1.1,  initialY: -22, initialZ: -40, initialRot: 1.8 },
  { char: 'H', wordIndex: 0, letterIndex: 4, appearTime: 1.3,  initialY: 18,  initialZ: -25, initialRot: -1.2 },
  { char: 'A', wordIndex: 0, letterIndex: 5, appearTime: 1.5,  initialY: -16, initialZ: -35, initialRot: 1.2 },
  { char: 'L', wordIndex: 0, letterIndex: 6, appearTime: 1.7,  initialY: 20,  initialZ: -30, initialRot: -1.5 },
  { char: 'I', wordIndex: 0, letterIndex: 7, appearTime: 1.9,  initialY: -18, initialZ: -35, initialRot: 1.0 },

  // MAJI
  { char: 'M', wordIndex: 1, letterIndex: 0, appearTime: 2.2,  initialY: 26,  initialZ: -45, initialRot: -1.8 },
  { char: 'A', wordIndex: 1, letterIndex: 1, appearTime: 2.4,  initialY: -20, initialZ: -30, initialRot: 1.4 },
  { char: 'J', wordIndex: 1, letterIndex: 2, appearTime: 2.6,  initialY: 22,  initialZ: -35, initialRot: -1.2 },
  { char: 'I', wordIndex: 1, letterIndex: 3, appearTime: 2.8,  initialY: -16, initialZ: -30, initialRot: 1.0 },
];

export const CinematicNameReveal: React.FC<CinematicNameRevealProps> = ({
  progressTime,
  reducedMotion = false,
  onAnimationSettled,
  isExpandingForWork = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hasSettledRef = useRef(false);

  // Mouse displacement coordinates for each individual letter
  const mousePos = useRef({ x: -1000, y: -1000 });
  const letterOffsets = useRef<Array<{ x: number; y: number }>>(
    LETTERS.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (reducedMotion) {
      if (!hasSettledRef.current) {
        hasSettledRef.current = true;
        onAnimationSettled?.();
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;

    const animateInteraction = () => {
      // Check if settled (around 5.5s)
      if (progressTime >= 5.4 && !hasSettledRef.current) {
        hasSettledRef.current = true;
        onAnimationSettled?.();
      }

      // Physics loop for interactive displacement
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      letterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const offset = letterOffsets.current[idx];

        if (progressTime < 5.2 || reducedMotion) {
          offset.x += (0 - offset.x) * 0.1;
          offset.y += (0 - offset.y) * 0.1;
          return;
        }

        const rect = el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width * 0.5;
        const letterCenterY = rect.top + rect.height * 0.5;

        const dx = letterCenterX - mx;
        const dy = letterCenterY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130; // Interaction radius

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (dist < radius && dist > 0) {
          // Soft repel force (max 8px to guarantee strict readability)
          const force = (1 - dist / radius) * 8;
          targetOffsetX = (dx / dist) * force;
          targetOffsetY = (dy / dist) * force;
        }

        // Spring lerp towards target
        offset.x += (targetOffsetX - offset.x) * 0.12;
        offset.y += (targetOffsetY - offset.y) * 0.12;

        // Apply dynamic translation on settled state
        if (progressTime >= 5.5) {
          el.style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`;
        }
      });

      animId = requestAnimationFrame(animateInteraction);
    };

    animId = requestAnimationFrame(animateInteraction);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [progressTime, reducedMotion, onAnimationSettled]);

  // Render individual letters
  const poushaliLetters = LETTERS.filter((l) => l.wordIndex === 0);
  const majiLetters = LETTERS.filter((l) => l.wordIndex === 1);

  const getLetterStyle = (cfg: LetterConfig, globalIndex: number): React.CSSProperties => {
    if (reducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
        filter: 'none',
      };
    }

    if (progressTime < cfg.appearTime) {
      return {
        opacity: 0,
        transform: `perspective(600px) translate3d(0, ${cfg.initialY}px, ${cfg.initialZ}px) rotate(${cfg.initialRot}deg)`,
        filter: 'blur(8px)',
        pointerEvents: 'none',
      };
    }

    // Animation progress for this specific letter
    const t = Math.min(1, Math.max(0, (progressTime - cfg.appearTime) / 0.85));
    // Refined custom cubic bezier ease-out
    const ease = 1 - Math.pow(1 - t, 3.5);

    const currentY = cfg.initialY * (1 - ease);
    const currentZ = cfg.initialZ * (1 - ease);
    const currentRot = cfg.initialRot * (1 - ease);
    const currentBlur = (1 - ease) * 8;
    const currentOpacity = Math.min(1, ease * 1.15);

    return {
      opacity: currentOpacity,
      transform: `perspective(600px) translate3d(0, ${currentY.toFixed(2)}px, ${currentZ.toFixed(2)}px) rotate(${currentRot.toFixed(2)}deg)`,
      filter: currentBlur > 0.1 ? `blur(${currentBlur.toFixed(1)}px)` : 'none',
      transition: 'none',
      willChange: 'transform, opacity, filter',
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative z-20 flex flex-col items-center justify-center text-center select-none max-w-6xl mx-auto px-4 transition-all duration-700 ${
        isExpandingForWork ? 'opacity-30 scale-95 blur-xs' : 'opacity-100 scale-100 blur-none'
      }`}
    >
      {/* 
        POUSHALI MAJI:
        Refined high-fashion editorial serif typography
        Pairing Noir Black (#1B1717) with vibrant Cherry Red (#810100) reflections
      */}
      <h1
        className="font-serif-luxury text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] tracking-[0.18em] sm:tracking-[0.24em] font-light leading-none text-[#1B1717] drop-shadow-[0_2px_12px_rgba(27,23,23,0.12)] flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 md:gap-x-7"
        aria-label="Poushali Maji"
      >
        {/* Word 1: POUSHALI */}
        <span className="inline-flex items-center">
          {poushaliLetters.map((cfg, i) => (
            <span
              key={`p-${cfg.char}-${i}`}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              style={getLetterStyle(cfg, i)}
              className="inline-block transition-transform duration-75 text-[#1B1717]"
            >
              {cfg.char}
            </span>
          ))}
        </span>

        {/* Word 2: MAJI (with subtle editorial contrast in Cerulean) */}
        <span className="inline-flex items-center">
          {majiLetters.map((cfg, j) => {
            const globalIndex = poushaliLetters.length + j;
            return (
              <span
                key={`m-${cfg.char}-${j}`}
                ref={(el) => {
                  letterRefs.current[globalIndex] = el;
                }}
                style={getLetterStyle(cfg, globalIndex)}
                className="inline-block transition-transform duration-75 text-[#810100] font-light"
              >
                {cfg.char}
              </span>
            );
          })}
        </span>
      </h1>
    </div>
  );
};
