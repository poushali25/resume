import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FIVE_PROJECTS, FiveProjectItem } from '../../data/workFiveProjectsData';

interface VerticalOvalProjectOrbitProps {
  onSelectProject: (projectId: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
  initialProjectId?: string;
}

/**
 * HorizontalProjectGallery — 5 Fashion Projects Sliding Horizontally One by One
 *
 * Implements:
 * 1. Horizontal Motion: Projects slide continuously and smoothly along the horizontal axis
 * 2. Unobstructed Imagery: All project numbers, categories, titles, and details are kept strictly OUTSIDE the image
 * 3. White Editorial Atmosphere: Styled for clean gallery white background with Noir Black & Cherry Red accents
 * 4. Guaranteed Zero Overlap: Mathematically verified spacing (cardWidth + gap) across an infinite loop
 * 5. Focal Center Alignment: Active project in center is emphasized (scale 1.0, full opacity)
 * 6. Direct Project Number Selector (01..05): Smoothly slides chosen project to center (~0.85s cubic ease)
 * 7. Hover Interaction: Pure text "LEARN MORE" floats near cursor without any background or box
 * 8. Direct Navigation: Clicking any project opens its dedicated project detail case study
 * 9. Position Preservation: Retains centered project when returning from Project Detail
 */
export const VerticalOvalProjectOrbit: React.FC<VerticalOvalProjectOrbitProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
  initialProjectId,
}) => {
  // Determine starting index if returning to Work page (preserves previous project)
  const getInitialIndex = useCallback(() => {
    if (!initialProjectId) return 0;
    const idx = FIVE_PROJECTS.findIndex(
      (p) =>
        p.id === initialProjectId ||
        p.route.endsWith(initialProjectId) ||
        (initialProjectId === 'project-01' && p.index === 0) ||
        (initialProjectId === 'project-02' && p.index === 1) ||
        (initialProjectId === 'project-03' && p.index === 2) ||
        (initialProjectId === 'project-04' && p.index === 3) ||
        (initialProjectId === 'project-05' && p.index === 4)
    );
    return idx >= 0 ? idx : 0;
  }, [initialProjectId]);

  // Continuous horizontal progress (in pixels)
  const progressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const isDirectNavRef = useRef<boolean>(false);
  const directNavStartRef = useRef<number>(0);
  const directNavTargetRef = useRef<number>(0);
  const directNavStartTimeRef = useRef<number>(0);

  const [, setRenderTrigger] = useState(0);

  // Active center project index (0 to 4)
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const activeProjectIndexRef = useRef<number>(0);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [clickedProjectId, setClickedProjectId] = useState<string | null>(null);
  const hoveredRef = useRef<boolean>(false);

  // Mouse parallax offset (-1 to 1)
  const mouseOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseSmoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // High performance floating "LEARN MORE" cursor coordinates (zero React re-renders on mousemove)
  const learnMoreRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef<{ targetX: number; targetY: number; currentX: number; currentY: number }>({
    targetX: -200,
    targetY: -200,
    currentX: -200,
    currentY: -200,
  });

  // Dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

  // Horizontal Card dimensions (made a little smaller per request for refined editorial presence)
  const cardWidth = isMobile
    ? Math.min(150, dimensions.width * 0.40)
    : isTablet
    ? Math.min(185, dimensions.width * 0.23)
    : Math.min(210, dimensions.width * 0.16);

  const cardGap = isMobile ? 20 : isTablet ? 28 : 36;
  const itemSpacing = cardWidth + cardGap;
  const totalTrackWidth = itemSpacing * FIVE_PROJECTS.length; // 5 * itemSpacing

  // Synchronize initial progress position if initialProjectId is provided (preserves project on Back to Work)
  const hasInitializedPosRef = useRef<boolean>(false);
  useEffect(() => {
    if (!hasInitializedPosRef.current && initialProjectId) {
      hasInitializedPosRef.current = true;
      const targetIdx = getInitialIndex();
      if (targetIdx > 0) {
        progressRef.current = targetIdx * itemSpacing;
        targetProgressRef.current = targetIdx * itemSpacing;
        activeProjectIndexRef.current = targetIdx;
        setActiveProjectIndex(targetIdx);
      }
    }
  }, [initialProjectId, getInitialIndex, itemSpacing]);

  // Mouse move handler for subtle parallax and LEARN MORE position (high performance, no setState)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    mouseOffsetRef.current = { x: normX, y: normY };

    const mp = mousePosRef.current;
    mp.targetX = e.clientX;
    mp.targetY = e.clientY;
    if (mp.currentX === -200) {
      mp.currentX = e.clientX;
      mp.currentY = e.clientY;
    }
  }, []);

  // Wheel scroll to manually glide horizontally
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;
      isDirectNavRef.current = false;
      targetProgressRef.current += delta * 0.8;
    },
    []
  );

  // Touch drag for mobile horizontal sliding
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const dx = touchStartXRef.current - currentX;
    touchStartXRef.current = currentX;
    isDirectNavRef.current = false;
    targetProgressRef.current += dx * 1.3;
  };
  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  // 60fps Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime);
      lastTime = now;

      // Smooth mouse parallax
      mouseSmoothRef.current.x += (mouseOffsetRef.current.x - mouseSmoothRef.current.x) * 0.05;
      mouseSmoothRef.current.y += (mouseOffsetRef.current.y - mouseSmoothRef.current.y) * 0.05;

      if (isDirectNavRef.current) {
        // Direct navigation interpolation (0.85s cubic ease)
        const elapsed = now - directNavStartTimeRef.current;
        const progress = Math.min(1, elapsed / 850);
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentProg =
          directNavStartRef.current + (directNavTargetRef.current - directNavStartRef.current) * ease;
        progressRef.current = currentProg;
        targetProgressRef.current = currentProg;

        if (progress >= 1) {
          isDirectNavRef.current = false;
        }
      } else {
        // Continuous horizontal sliding animation: keep images moving into animation
        if (!reducedMotion) {
          // Continuous sliding speed (~0.65px per 16.6ms frame; gently slowed to 0.25px if hovered)
          const speed = hoveredRef.current ? 0.25 : 0.65;
          targetProgressRef.current += speed * (dt / 16.67);
        }

        // Smooth spring towards target position
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) > 0.02) {
          progressRef.current += diff * 0.14;
        } else {
          progressRef.current = targetProgressRef.current;
        }
      }

      // Calculate which project is currently closest to center (offset X ≈ 0)
      const currentProgress = progressRef.current;
      let closestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < FIVE_PROJECTS.length; i++) {
        let rawX = i * itemSpacing - currentProgress;
        let wrappedX = ((rawX % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
        if (wrappedX > totalTrackWidth / 2) {
          wrappedX -= totalTrackWidth;
        }

        const dist = Math.abs(wrappedX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      if (activeProjectIndexRef.current !== closestIdx) {
        activeProjectIndexRef.current = closestIdx;
        setActiveProjectIndex(closestIdx);
      }

      // Smoothly update floating "LEARN MORE" position in tandem with cursor
      const mp = mousePosRef.current;
      mp.currentX += (mp.targetX - mp.currentX) * 0.45;
      mp.currentY += (mp.targetY - mp.currentY) * 0.45;
      if (learnMoreRef.current) {
        learnMoreRef.current.style.transform = `translate3d(${mp.currentX}px, ${mp.currentY - 30}px, 0) translate(-50%, 0)`;
      }

      setRenderTrigger(now);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [itemSpacing, reducedMotion, totalTrackWidth]);

  // Click on project number (01..05) -> smooth horizontal slide to bring that project to center
  const handleSelectNumber = (targetIndex: number) => {
    const currentProgress = progressRef.current;

    let rawX = targetIndex * itemSpacing - currentProgress;
    let wrappedX = ((rawX % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
    if (wrappedX > totalTrackWidth / 2) {
      wrappedX -= totalTrackWidth;
    }

    const newTarget = currentProgress + wrappedX;

    directNavStartRef.current = currentProgress;
    directNavTargetRef.current = newTarget;
    directNavStartTimeRef.current = performance.now();
    isDirectNavRef.current = true;
    setActiveProjectIndex(targetIndex);
  };

  // Click on project card -> slight tactile enlargement before transition flows across
  const handleProjectClick = (project: FiveProjectItem) => {
    setClickedProjectId(project.id);
    setTimeout(() => {
      onSelectProject(project.id);
      setClickedProjectId(null);
    }, 120);
  };

  const handleCardMouseEnter = (project: FiveProjectItem) => {
    setHoveredProjectId(project.id);
    hoveredRef.current = true;
    onHoverProjectStart?.();
  };

  const handleCardMouseLeave = () => {
    setHoveredProjectId(null);
    hoveredRef.current = false;
    onHoverProjectEnd?.();
  };

  const parallaxY = mouseSmoothRef.current.y * 6;
  const currentProgress = progressRef.current;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between items-center select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Work Projects Horizontal Gallery"
    >
      {/* 
        CENTER HORIZONTAL SLIDING TRACK (5 PROJECTS SLIDING HORIZONTALLY ONE BY ONE)
        - Text, numbers, and details are kept strictly OUTSIDE the image
        - Faded atmospheric red light glow behind the projects
        - Zero overlap guaranteed by consistent horizontal spacing
      */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-auto overflow-visible">
        {/* Atmospheric Faded Red Light Glow Behind the Projects */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
          aria-hidden="true"
        >
          {/* Broad diffuse faded red light */}
          <div className="w-[85vw] max-w-5xl h-[340px] sm:h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(212,20,40,0.22)_0%,_rgba(163,8,26,0.14)_35%,_rgba(129,1,0,0.04)_65%,_transparent_80%)] blur-3xl transform -translate-y-2" />
          {/* Soft warm center core glow */}
          <div className="w-[50vw] max-w-2xl h-[240px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,69,0,0.12)_0%,_rgba(212,20,40,0.08)_40%,_transparent_75%)] blur-2xl transform -translate-y-2" />
        </div>

        {FIVE_PROJECTS.map((project, i) => {
          // Calculate wrapped horizontal position for project i
          let rawX = i * itemSpacing - currentProgress;
          let offsetX = ((rawX % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
          if (offsetX > totalTrackWidth / 2) {
            offsetX -= totalTrackWidth;
          }

          // Distance from horizontal center (0)
          const distFromCenter = Math.abs(offsetX);
          const normalizedDist = Math.min(1, distFromCenter / (itemSpacing * 1.5));

          const isHovered = hoveredProjectId === project.id;
          const isFront = distFromCenter < itemSpacing * 0.48;

          // Scale: 1.0 at center, gently tapering to 0.88 to the sides
          const baseScale = 1.0 - normalizedDist * 0.12;
          const scale = isHovered ? baseScale * 1.04 : isFront ? baseScale * 1.02 : baseScale;

          // Opacity: 1.0 in front, tapering to 0.50 at edges
          const opacity = isHovered || isFront ? 1.0 : Math.max(0.45, 1.0 - normalizedDist * 0.55);

          // Z-index: highest in front
          const zIndex = isFront ? 50 : Math.floor(40 - normalizedDist * 20);

          // Render only within visible horizontal range for performance
          if (distFromCenter > dimensions.width * 0.95) {
            return null;
          }

          return (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => handleCardMouseEnter(project)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                width: cardWidth,
                transform: `translate3d(${offsetX}px, ${parallaxY}px, 0) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer will-change-transform transition-opacity duration-300 group"
              data-selectable-nav-word={`project-${project.number}`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title}`}
            >
              {/* Outer Card Container: Keeps all text & numbers OUTSIDE the image */}
              <div className="flex flex-col w-full select-none">
                {/* 
                  A. TOP SECTION (OUTSIDE IMAGE):
                  Project Number & Minimal Category
                */}
                <div className="flex items-baseline justify-between mb-2.5 px-0.5 border-b border-[#1B1717]/10 pb-1.5">
                  <span className={`font-serif-luxury text-base sm:text-lg tracking-[0.16em] transition-colors duration-200 ${
                    isFront ? 'text-[#810100] font-medium' : 'text-[#810100]/70 font-light'
                  }`}>
                    {project.number}
                  </span>
                  <span className={`text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] font-sans font-medium line-clamp-1 transition-colors duration-200 ${
                    isFront ? 'text-[#810100]' : 'text-[#1B1717]/60'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* 
                  B. CENTER SECTION (THE FASHION IMAGE):
                  - Whichever project comes in front becomes bright on 0.05s (50ms)
                  - Black and dark gradient border directly around the image, not on whole background
                  - Red glowing light around front image removed per request
                */}
                <div className="relative w-full">
                  {/* The Framed Fashion Image Card */}
                  <div
                    className={`relative w-full aspect-[3/4] rounded-xs p-[3px] bg-gradient-to-b from-[#241F21] via-[#120E10] to-[#000000] transition-all duration-[50ms] ease-out ${
                      isFront
                        ? 'shadow-[0_16px_36px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.12)]'
                        : 'shadow-[0_10px_24px_rgba(0,0,0,0.22),0_0_10px_rgba(0,0,0,0.12)]'
                    } group-hover:shadow-[0_20px_42px_rgba(0,0,0,0.35)]`}
                  >
                    <div className="relative w-full h-full rounded-xs overflow-hidden bg-black">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        style={{
                          transition: 'filter 50ms ease-out, transform 400ms ease-out',
                        }}
                        className={`w-full h-full object-cover object-center select-none transition-transform duration-300 ease-out ${
                          clickedProjectId === project.id
                            ? 'scale-[1.06]'
                            : 'group-hover:scale-[1.03]'
                        } ${
                          isFront
                            ? 'brightness-[1.22] contrast-[1.06] saturate-[1.05]'
                            : 'brightness-[0.70] contrast-[0.95] saturate-[0.85]'
                        }`}
                      />

                      {/* Black gradient immediately around the inner perimeter of the image */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none transition-opacity duration-[50ms] ${
                        project.number === '05' || project.number === '01' ? 'opacity-10' : (isFront ? 'opacity-40' : 'opacity-75')
                      }`} />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/50 pointer-events-none" />

                      {/* Subtle red shimmer on hover */}
                      <div className="absolute inset-0 bg-[#810100]/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Fine paper/linen grain texture overlay */}
                      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none mix-blend-multiply" />
                    </div>
                  </div>
                </div>

                {/* 
                  C. BOTTOM SECTION (OUTSIDE IMAGE):
                  Title, Year, and Minimal Description
                */}
                <div className="mt-3 px-0.5 flex flex-col space-y-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className={`font-serif-luxury text-base sm:text-xl font-normal tracking-tight transition-colors line-clamp-1 ${
                      isFront ? 'text-[#810100] font-medium' : 'text-[#1B1717] group-hover:text-[#810100]'
                    }`}>
                      {project.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.18em] text-[#1B1717]/50 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#1B1717]/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        3. BOTTOM CONTROLS & PROJECT NUMBER SELECTOR (01 02 03 04 05)
      */}
      <div className="relative z-30 pb-6 sm:pb-8 flex flex-col items-center pointer-events-auto">
        {/* Active Project Theme Name Indicator in Red Color */}
        <div className="h-7 mb-2 text-center pointer-events-none flex items-center justify-center">
          <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.25em] uppercase font-medium flex items-center gap-2">
            <span className="text-[#810100] font-bold tracking-[0.2em]">
              {FIVE_PROJECTS[activeProjectIndex]?.number}
            </span>
            <span className="text-[#D41428]/60 text-[10px]">//</span>
            <span className="text-[#D41428] font-bold tracking-[0.22em] drop-shadow-[0_0_12px_rgba(212,20,40,0.7)]">
              {FIVE_PROJECTS[activeProjectIndex]?.title}
            </span>
            <span className="hidden sm:inline-block text-[#D41428]/60 text-[10px]">//</span>
            <span className="hidden sm:inline-block text-[#810100] text-[10.5px] font-sans tracking-[0.2em] uppercase font-semibold">
              {FIVE_PROJECTS[activeProjectIndex]?.category}
            </span>
          </span>
        </div>

        {/* Minimal Project Numbers: 01 02 03 04 05 */}
        <nav
          aria-label="Direct Project Selection"
          className="flex items-center space-x-5 sm:space-x-8 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#1B1717]/15 shadow-md"
        >
          {FIVE_PROJECTS.map((proj, idx) => {
            const isActive = activeProjectIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectNumber(idx)}
                className={`relative py-1 text-xs tracking-[0.22em] font-sans font-medium transition-all duration-300 cursor-pointer focus:outline-hidden ${
                  isActive
                    ? 'text-[#810100] scale-110 font-bold'
                    : 'text-[#1B1717]/50 hover:text-[#810100]'
                }`}
                aria-label={`Select Project ${proj.number}`}
              >
                <span>{proj.number}</span>
                {/* Active indicator underline */}
                {isActive && (
                  <span className="absolute -bottom-0.5 inset-x-0 h-[1.5px] bg-[#810100] rounded-full shadow-[0_0_6px_rgba(129,1,0,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 
        4. "LEARN MORE" TEXT ON CURSOR HOVER
        Requirement:
        - Small text: LEARN MORE
        - Small, bold enough to read
        - NO background, NO box, NO button shape, NO colored container
        - Floats directly near the cursor/hovered project
      */}
      <div
        ref={learnMoreRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 select-none will-change-transform transition-opacity duration-200 ${
          hoveredProjectId ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, 0)',
        }}
      >
        <span className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#1B1717] drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
          LEARN MORE
        </span>
      </div>
    </div>
  );
};
