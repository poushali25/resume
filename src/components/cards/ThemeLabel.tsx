import React from 'react';

interface ThemeLabelProps {
  title: string;
  isVisible: boolean;
  category?: string;
  isHovered?: boolean;
}

/**
 * ThemeLabel — Small, elegant theme name displayed directly below each card.
 * Centered, subtle luxury typography, fades in gently after the card flips.
 */
export const ThemeLabel: React.FC<ThemeLabelProps> = ({
  title,
  isVisible,
  isHovered = false,
}) => {
  return (
    <div
      className={`mt-2 sm:mt-2.5 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <span
        className={`font-serif-luxury text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap ${
          isHovered ? 'text-[#810100]' : 'text-[#1B1717]'
        }`}
      >
        {title}
      </span>
      {/* Subtle indicator line on hover */}
      <div
        className={`h-[1px] bg-[#810100] transition-all duration-300 mt-0.5 sm:mt-1 ${
          isHovered ? 'w-5 opacity-100' : 'w-0 opacity-0'
        }`}
      />
    </div>
  );
};
