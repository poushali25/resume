import React from 'react';
import { VerticalOvalProjectOrbit } from '../components/work/VerticalOvalProjectOrbit';

interface WorkPageProps {
  onSelectProject: (projectId: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
  selectedProjectId?: string;
}

/**
 * WorkPage — High-Fashion Horizontal Gallery on Clean White Background
 *
 * Implements:
 * 1. Horizontal Motion: 5 projects arranged horizontally with text outside the images
 * 2. Clean White Atelier Background: Pure gallery white background with subtle cotton depth
 * 3. Minimal Fashion Editorial Tone: "WORK" top title, minimal "01 02 03 04 05" number selector
 * 4. Cursor Interaction: Hover reveals small bold "LEARN MORE" text with NO background/box
 * 5. Direct Navigation: Clicking any project navigates directly to that project's detail case study
 */
export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
  selectedProjectId,
}) => {
  return (
    <div
      id="work-interactive-canvas"
      className="relative w-full h-screen overflow-hidden bg-white text-[#1B1717] select-none flex flex-col justify-between items-center pt-16 sm:pt-20 pb-4"
    >
      {/* 
        LAYER 1: CLEAN WHITE ATELIER BACKGROUND
        - Crisp pure white with soft cotton radial depth and fine paper grain
      */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,_rgba(255,255,255,1),_rgba(250,245,232,0.45))]" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-15 mix-blend-multiply" />
      </div>

      {/* 
        LAYER 2: MAIN GALLERY CANVAS (5 Projects Sliding Horizontally)
        - Targeted by CSS selector: div#work-interactive-canvas > main > div:nth-of-type(1)
      */}
      <main className="relative w-full h-full flex-1 flex flex-col items-center justify-center z-20 overflow-hidden">
        <div className="relative w-full h-full flex flex-col justify-between items-center">
          <VerticalOvalProjectOrbit
            onSelectProject={onSelectProject}
            onHoverProjectStart={onHoverProjectStart}
            onHoverProjectEnd={onHoverProjectEnd}
            reducedMotion={reducedMotion}
            initialProjectId={selectedProjectId}
          />
        </div>
      </main>
    </div>
  );
};

