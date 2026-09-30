import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkCornerInfoProps {
  projectTitle: string;
  category: string;
  projectNumber: string;
  setIndex: number;
  sequenceGroup: number;
  reducedMotion?: boolean;
}

export const WorkCornerInfo: React.FC<WorkCornerInfoProps> = ({
  projectTitle,
  category,
  projectNumber,
  setIndex,
  sequenceGroup,
  reducedMotion = false,
}) => {
  // Format concise editorial title (e.g. "SURR. COLLECTION" or "CROCHET")
  const shortTitle = projectTitle
    .replace('COLLECTION', 'COLL.')
    .replace('EXPERIMENTATION', 'EXP.')
    .replace('GARMENT / PATTERN MAKING', 'GARMENT')
    .toUpperCase();

  return (
    <aside
      aria-label="Current Project Indicator"
      className="fixed bottom-6 sm:bottom-10 left-6 sm:left-12 z-40 select-none pointer-events-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${setIndex}-${projectTitle}`}
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          exit={{
            opacity: 0,
            y: reducedMotion ? 0 : -6,
            transition: {
              duration: 0.45,
              ease: [0.32, 0, 0.67, 0],
            },
          }}
          className="flex flex-col space-y-1 font-mono tracking-wider"
        >
          {/* Main Title - Small, bold, editorial */}
          <div className="flex items-center space-x-2">
            <span className="font-serif-luxury text-sm sm:text-base tracking-[0.22em] text-[#F7F2E7] font-medium drop-shadow-sm">
              {shortTitle}
            </span>
          </div>

          {/* Category & Project Number - Extremely subtle & minimal */}
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-[0.24em] text-[#C7B5A4]/80 uppercase font-sans">
            <span className="text-[#810100] font-semibold">{category}</span>
            <span className="text-[#1B1717]">/</span>
            <span className="text-[#F7F2E7]/90 font-mono">{projectNumber}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
};
