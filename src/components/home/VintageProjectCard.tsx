import React, { useState, useRef, useEffect } from 'react';
import { OvalProject } from '../../data/ovalProjectsData';

interface VintageProjectCardProps {
  project: OvalProject;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  reducedMotion?: boolean;
}

/**
 * VintageProjectCard — Refined vintage fashion archival photograph card.
 *
 * Characteristics:
 * - Almond and soft cream vintage card face with antique gold and coffee bean hairline framing
 * - Black & White by default with rich archival tonal contrast
 * - Smooth transition to full color on cursor touch (0.5s - 0.7s)
 * - 1-second hover triggers pure editorial "LEARN MORE" text with NO background
 * - Mobile double-tap/tap support (1st tap: color/focus, 2nd tap: open project)
 */
export const VintageProjectCard: React.FC<VintageProjectCardProps> = ({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [touchActivated, setTouchActivated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1-second hover detection for "LEARN MORE"
  useEffect(() => {
    if (isHovered) {
      timerRef.current = setTimeout(() => {
        setShowLearnMore(true);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setShowLearnMore(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHovered]);

  const handleTouch = (e: React.TouchEvent) => {
    if (!touchActivated) {
      e.preventDefault();
      setTouchActivated(true);
      onHoverStart();
      setTimeout(() => {
        setShowLearnMore(true);
      }, 700);
    } else {
      // Second tap opens project
      onClick();
    }
  };

  const isCardActive = isHovered || touchActivated;

  return (
    <div
      className="relative select-none"
      onMouseEnter={onHoverStart}
      onMouseLeave={() => {
        setTouchActivated(false);
        onHoverEnd();
      }}
      onTouchStart={handleTouch}
      onClick={onClick}
    >
      {/* Vintage Collectible Fashion Photograph Card Frame */}
      <div
        className={`relative w-[98px] h-[134px] sm:w-[122px] sm:h-[166px] md:w-[142px] md:h-[192px] rounded-xs bg-[#FAF5E8] p-1.5 sm:p-2 transition-all duration-500 ease-out cursor-pointer ${
          isCardActive
            ? 'shadow-[0_12px_32px_rgba(27,23,23,0.18),0_0_12px_rgba(129,1,0,0.3)] ring-1 ring-[#810100]'
            : 'shadow-[0_6px_20px_rgba(27,23,23,0.08)] ring-1 ring-[#1B1717]/15 hover:ring-[#810100]/60'
        }`}
      >
        {/* Fine ornamental inner border */}
        <div className="relative w-full h-full p-1 sm:p-1.5 border border-[#1B1717]/15 flex flex-col justify-between overflow-hidden bg-[#FAF5E8]/50">
          {/* Subtle vintage corner ticks */}
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#810100] pointer-events-none" />
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-[#810100] pointer-events-none" />
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-[#810100] pointer-events-none" />
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#810100] pointer-events-none" />

          {/* Photograph Display with B&W to Color Transition */}
          <div className="relative w-full h-full overflow-hidden rounded-[1px] bg-[#1B1717]/10">
            <img
              src={project.image}
              alt={`${project.title} - ${project.category}`}
              loading="eager"
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                isCardActive
                  ? 'filter-none contrast-105 brightness-105 scale-105'
                  : 'filter grayscale contrast-[1.12] brightness-95 hover:brightness-100'
              }`}
            />
            {/* Subtle photographic grain vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#1B1717]/10 via-transparent to-[#1B1717]/25" />
          </div>
        </div>
      </div>
    </div>
  );
};
