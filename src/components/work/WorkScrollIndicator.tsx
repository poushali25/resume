import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface WorkScrollIndicatorProps {
  currentSetIndex: number;
  totalSets: number;
  sequenceGroup: number;
  sequenceName: string;
  onNext: () => void;
  onPrev: () => void;
  isLocked: boolean;
}

export const WorkScrollIndicator: React.FC<WorkScrollIndicatorProps> = ({
  currentSetIndex,
  totalSets,
  sequenceGroup,
  sequenceName,
  onNext,
  onPrev,
  isLocked,
}) => {
  // Current set within its 8-scroll sequence (1 to 8)
  const currentInSequence = (currentSetIndex % 8) + 1;

  return (
    <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-12 z-40 select-none flex items-center">
      {/* Accessible Next / Prev Stepper with no text */}
      <div className="flex items-center space-x-1 bg-[#3B2418]/90 backdrop-blur-md p-1 rounded-full border border-[#F7F2E7]/20 shadow-lg">
        <button
          onClick={onPrev}
          disabled={isLocked || currentSetIndex === 0}
          aria-label="Previous image set"
          className="p-1.5 rounded-full text-[#F7F2E7] hover:text-[#F7F2E7] hover:bg-[#007BA7] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronUp size={15} />
        </button>
        <span className="w-[1px] h-3 bg-[#F7F2E7]/20" />
        <button
          onClick={onNext}
          disabled={isLocked}
          aria-label="Next image set"
          className="p-1.5 rounded-full text-[#F7F2E7] hover:text-[#F7F2E7] hover:bg-[#007BA7] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronDown size={15} />
        </button>
      </div>
    </div>
  );
};
