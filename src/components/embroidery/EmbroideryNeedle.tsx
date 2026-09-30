import React from 'react';

interface EmbroideryNeedleProps {
  length?: number;
  angle?: number;
  className?: string;
}

/**
 * EmbroideryNeedle — 3D Metallic Needle Model
 *
 * SVG / CSS vector reference component for the polished surgical steel needle
 * with elongated eye, thread aperture, and chrome reflections.
 */
export const EmbroideryNeedle: React.FC<EmbroideryNeedleProps> = ({
  length = 100,
  angle = -30,
  className = '',
}) => {
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'bottom center',
        height: `${length}px`,
        width: '8px',
      }}
    >
      <svg
        viewBox="0 0 10 120"
        className="w-full h-full drop-shadow-[2px_3px_4px_rgba(99,0,0,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chromeGradient" x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7A8490" />
            <stop offset="25%" stopColor="#CFD6DE" />
            <stop offset="55%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#ADB8C4" />
            <stop offset="100%" stopColor="#505862" />
          </linearGradient>
        </defs>

        {/* Tapered needle shaft to sharp point */}
        <path
          d="M 5 120 L 3.5 40 L 3.5 10 A 1.5 1.5 0 0 1 6.5 10 L 6.5 40 Z"
          fill="url(#chromeGradient)"
        />

        {/* Needle Eye Slit */}
        <ellipse cx="5" cy="22" rx="0.9" ry="7" fill="#1B1717" />
        <ellipse cx="5" cy="22" rx="0.6" ry="6" fill="#FAF5E8" opacity="0.9" />

        {/* Ultra-sharp tip glint */}
        <circle cx="5" cy="119.5" r="0.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
