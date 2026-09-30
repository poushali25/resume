import React, { useEffect, useRef, useState } from 'react';

interface WorkLearnMoreCursorProps {
  isHoveringImage: boolean;
  themeMode?: 'ivory' | 'charcoal';
}

export const WorkLearnMoreCursor: React.FC<WorkLearnMoreCursorProps> = ({
  isHoveringImage,
  themeMode = 'ivory',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // High performance interpolation ref (no React re-renders during mouse move)
  const coords = useRef({
    targetX: -200,
    targetY: -200,
    currentX: -200,
    currentY: -200,
  });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.targetX = e.clientX;
      coords.current.targetY = e.clientY;
      if (!hasMoved) {
        coords.current.currentX = e.clientX;
        coords.current.currentY = e.clientY;
        setHasMoved(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    const render = () => {
      const c = coords.current;
      // Smooth interpolation for snappy, fluid cursor tracking
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
  }, [hasMoved]);

  if (isTouch) return null;

  const textColor = themeMode === 'charcoal' ? 'text-[#2A1810]' : 'text-[#F7F2E7]';
  const textShadow = 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]';

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999] select-none will-change-transform"
      style={{
        transform: 'translate3d(-200px, -200px, 0)',
      }}
    >
      {/* 
        STRICT REQUIREMENT:
        - When the cursor touches the image, pop up LEARN MORE in bold without background.
        - Zero background container (no pill, no box, no circle, no background color).
        - Pure, bold typography.
      */}
      <div
        className={`flex items-center pl-3.5 pt-2 transition-all duration-200 ease-out ${
          isHoveringImage
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-1 pointer-events-none'
        }`}
      >
        <span
          className={`font-sans font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase ${textColor} ${textShadow} whitespace-nowrap leading-none`}
        >
          LEARN MORE
        </span>
      </div>
    </div>
  );
};
