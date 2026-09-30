import React from 'react';
import { motion } from 'motion/react';
import { WorkArchiveItem, WorkImageSet } from '../../data/workArchiveData';

interface WorkThreeSetProps {
  set: WorkImageSet;
  direction: number; // 1 for next (down), -1 for prev (up)
  mouseX?: number;
  mouseY?: number;
  reducedMotion?: boolean;
  onItemHoverStart: (item: WorkArchiveItem) => void;
  onItemHoverEnd: () => void;
  onItemClick: (item: WorkArchiveItem) => void;
  isExitingToProject?: boolean;
  selectedItemId?: string | null;
}

export const WorkThreeSet: React.FC<WorkThreeSetProps> = ({
  set,
  direction,
  reducedMotion = false,
  onItemHoverStart,
  onItemHoverEnd,
  onItemClick,
  isExitingToProject = false,
  selectedItemId = null,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 px-4 sm:px-8">
      {/* Horizontal row of 3 images in every sequence with guaranteed non-overlapping gap */}
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl max-h-[82vh]">
        {set.items.map((item: WorkArchiveItem, index: number) => {
          const isSelected = selectedItemId === item.id;
          const isOtherWhenSelected = isExitingToProject && !isSelected;

          return (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : direction * (35 + index * 10),
                scale: reducedMotion ? 1 : 0.94,
              }}
              animate={
                isSelected
                  ? {
                      opacity: 1,
                      scale: 1.15,
                      y: 0,
                      zIndex: 40,
                      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                    }
                  : isOtherWhenSelected
                  ? {
                      opacity: 0,
                      scale: 0.88,
                      y: 0,
                      transition: { duration: 0.45, ease: 'easeOut' },
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      zIndex: 10 + index,
                      transition: {
                        duration: 0.55,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
              exit={{
                opacity: 0,
                y: reducedMotion ? 0 : -direction * (35 + index * 10),
                scale: reducedMotion ? 1 : 0.94,
                transition: {
                  duration: 0.4,
                  delay: (2 - index) * 0.03,
                  ease: [0.32, 0, 0.67, 0],
                },
              }}
              className="pointer-events-auto select-none will-change-transform flex-shrink-0"
            >
              <article
                onClick={() => onItemClick(item)}
                onMouseEnter={() => onItemHoverStart(item)}
                onMouseLeave={onItemHoverEnd}
                tabIndex={0}
                role="button"
                aria-label={`View project ${item.projectTitle}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }}
                className="group relative cursor-pointer select-none overflow-hidden rounded-xs border border-[#36242B]/40 hover:border-[#007BA7] transition-all duration-500 shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_24px_60px_rgba(128,8,21,0.45)] w-[clamp(100px,28vw,130px)] sm:w-[clamp(180px,23vw,320px)] h-[clamp(150px,38vh,220px)] sm:h-[clamp(240px,46vh,440px)] bg-[#2A1810]"
              >
                {/* Image element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 contrast-[1.03]"
                />

                {/* Fine atmospheric film grain & dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/60 via-transparent to-[#2A1810]/20 pointer-events-none" />
                <div className="absolute inset-0 bg-grain pointer-events-none opacity-30 mix-blend-overlay" />

                {/* Subtle blood red corner mark on hover */}
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#007BA7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </article>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
