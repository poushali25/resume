import React, { useEffect, useRef, useState } from 'react';

interface PlayingCardCursorProps {
  isVisible: boolean; // True ONLY after the 1-second hover threshold is reached
  activeCardTitle?: string;
}

/**
 * PlayingCardCursor — Displays "LEARN MORE" strictly adhering to:
 * - Appears after 1 full second of hovering on a card
 * - BOLD typography (font-extrabold tracking-[0.25em])
 * - STRICTLY NO BACKGROUND: No button, no pill, no circle, no box, no container
 * - Smooth cursor tracking
 * - Fades in with small scale-up, fades out immediately when cursor leaves
 */
export const PlayingCardCursor: React.FC<PlayingCardCursorProps> = ({
  isVisible,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const coords = useRef({ currentX: -100, currentY: -100, targetX: -100, targetY: -100 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.targetX = e.clientX;
      coords.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    const render = () => {
      const c = coords.current;
      c.currentX += (c.targetX - c.currentX) * 0.35;
      c.currentY += (c.targetY - c.currentY) * 0.35;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${c.currentX}px, ${c.currentY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* 
        MANDATORY REQUIREMENT:
        - "LEARN MORE must have NO background."
        - "Do NOT put the text inside: A button, A circle, A box, A colored background, A pill, A filled cursor."
        - "Only display the words: LEARN MORE"
        - "Use bold editorial typography."
      */}
      <div
        className={`flex items-center pl-4 pt-2 transition-all duration-300 ease-out ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-1.5 pointer-events-none'
        }`}
      >
        <span
          className="font-sans font-extrabold text-xs sm:text-sm tracking-[0.26em] uppercase text-[#810100] drop-shadow-[0_1px_4px_rgba(250,245,232,0.95)] whitespace-nowrap leading-none select-none"
        >
          LEARN MORE
        </span>
      </div>
    </div>
  );
};
