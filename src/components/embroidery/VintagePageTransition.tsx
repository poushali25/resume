import React from 'react';

interface VintagePageTransitionProps {
  isActive: boolean;
  targetPageName?: string;
}

/**
 * VintagePageTransition — Tactile Haute Couture Archive Transition
 *
 * Simulates:
 * - Camera zooming toward the fine embroidered silk thread
 * - Weave expansion and vintage textile linen dissolving across screen
 * - Soft vintage archive wash before revealing target page
 */
export const VintagePageTransition: React.FC<VintagePageTransitionProps> = ({
  isActive,
  targetPageName = 'Archive',
}) => {
  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-700"
    >
      {/* Expanding tactile textile weave overlay */}
      <div className="absolute inset-0 bg-[#1B1717] animate-fadeIn">
        {/* Fine linen texture pattern */}
        <div className="absolute inset-0 opacity-15 bg-grain mix-blend-overlay"></div>

        {/* Dynamic expanding thread warp lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[120vw] h-[2px] bg-gradient-to-r from-transparent via-[#FAF5E8] to-transparent transform scale-x-150 animate-pulse opacity-60"></div>
          <div className="w-[2px] h-[120vh] bg-gradient-to-b from-transparent via-[#FAF5E8]/60 to-transparent transform scale-y-150 opacity-40"></div>
        </div>

        {/* Ambient deep maroon glow */}
        <div className="absolute inset-0 bg-radial from-[#630000]/25 via-transparent to-[#1B1717]/80"></div>
      </div>

      {/* Discreet editorial label */}
      <div className="relative z-10 text-center animate-pulse">
        <span className="text-[10px] tracking-[0.35em] text-[#FAF5E8] uppercase font-light">
          Entering {targetPageName}
        </span>
      </div>
    </div>
  );
};
