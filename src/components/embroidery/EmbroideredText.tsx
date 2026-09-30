import React from 'react';

interface EmbroideredTextProps {
  text: string;
  isComplete: boolean;
  className?: string;
}

/**
 * EmbroideredText — Tactile 3D Raised Embroidery Component
 *
 * Renders text with realistic silk thread relief, wine-red under-shadow,
 * and ivory/warm beige highlights.
 */
export const EmbroideredText: React.FC<EmbroideredTextProps> = ({
  text,
  isComplete,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-block select-none font-serif tracking-[0.22em] uppercase transition-all duration-1000 ${
        isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
    >
      {/* 3D Contact & Maroon Shadow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-transparent select-none filter blur-[2px] translate-x-[2px] translate-y-[3px]"
        style={{
          WebkitTextStroke: '3px rgba(99, 0, 0, 0.45)',
          color: 'rgba(27, 23, 23, 0.7)',
        }}
      >
        {text}
      </span>

      {/* Main Cotton Silk Thread Core */}
      <span
        className="relative z-10 text-[#FAF5E8] font-bold"
        style={{
          textShadow: '0 1px 2px rgba(27, 23, 23, 0.8), 0 0 1px rgba(250, 245, 232, 0.6)',
        }}
      >
        {text}
      </span>

      {/* Specular Ridge Thread Glint */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-[#FAF5E8] opacity-40 font-bold -translate-x-[0.5px] -translate-y-[0.5px] pointer-events-none"
      >
        {text}
      </span>
    </div>
  );
};
