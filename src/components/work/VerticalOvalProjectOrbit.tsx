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
 * VerticalOvalProjectOrbit — High-Fashion 3D Oval Rotation of Uploaded Projects
 *
 * Implements:
 * 1. 3D Oval Rotation: Projects rotate continuously along an elegant slanted elliptical orbit
 * 2. Uploaded Projects & Real Images: Each card displays one of the uploaded fashion collections
 * 3. Unobstructed Imagery: Numbers, categories, titles, and details are positioned cleanly outside the image
 * 4. Spatial Depth: Dynamic scaling (0.84 to 1.12), opacity (0.50 to 1.0), and z-index based on orbital position
 * 5. Focal Center Alignment: Project in front is highlighted with full clarity and vivid color
 * 6. Direct Project Number Selector (01..04): Smoothly rotates chosen project to front center (~0.6s cubic ease)
 * 7. Interactive Gestures: Drag, swipe, and wheel allow intuitive manual spinning of the orbit
 * 8. Cursor Interaction: Pure text "LEARN MORE" floats near cursor without any background box
 * 9. Direct Navigation: Clicking any project navigates directly to that project's detail case study
 * 10. Position Preservation: Centers the previously viewed project when returning to Work page
 */
export const VerticalOvalProjectOrbit: React.FC<VerticalOvalProjectOrbitProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
  initialProjectId,
}) => {
  const count = FIVE_PROJECTS.length;

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
        (initialProjectId === 'project-05' && p.index === 4) ||
        (initialProjectId === 'project-06' && p.index === 5) ||
        (initialProjectId === 'project-07' && p.index === 6)
    );
    return idx >= 0 ? idx : 0;
  }, [initialProjectId]);

  // Target front angle in radians: front center is PI / 2 (where sin(angle) === 1)
  const FRONT_ANGLE = Math.PI / 2;

  // Initial angle placing the initial project at front center
  const getAngleForIndex = useCallback((targetIdx: number) => {
    return FRONT_ANGLE - (targetIdx * 2 * Math.PI) / count;
  }, [count]);

  // Orbit rotation state (in radians)
  const rotationAngleRef = useRef<number>(getAngleForIndex(getInitialIndex()));
  const targetAngleRef = useRef<number>(getAngleForIndex(getInitialIndex()));
  const isDirectNavRef = useRef<boolean>(false);
  const directNavStartRef = useRef<number>(0);
  const directNavTargetRef = useRef<number>(0);
  const directNavStartTimeRef = useRef<number>(0);

  const [, setRenderTrigger] = useState(0);

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [clickedProjectId, setClickedProjectId] = useState<string | null>(null);
  const hoveredRef = useRef<boolean>(false);

  // Mouse parallax offset (-1 to 1)
  const mouseOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseSmoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // High performance floating "LEARN MORE" cursor coordinates
  const learnMoreRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef<{ targetX: number; targetY: number; currentX: number; currentY: number }>({
    targetX: -200,
    targetY: -200,
    currentX: -200,
    currentY: -200,
  });

  // Responsive dimensions for the oval orbit
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    rx: 390,
    ry: 105,
    slantDeg: -5.5,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let rx = 430;
      let ry = 110;
      let slant = -5.5;

      if (w < 640) {
        // Mobile
        rx = Math.min(175, w * 0.42);
        ry = Math.min(58, h * 0.08);
        slant = -4.5;
      } else if (w < 1024) {
        // Tablet
        rx = Math.min(315, w * 0.36);
        ry = Math.min(88, h * 0.11);
        slant = -5.0;
      } else {
        // Desktop
        rx = Math.min(430, w * 0.33);
        ry = Math.min(110, h * 0.14);
        slant = -5.5;
      }

      setDimensions({
        width: w,
        height: h,
        rx,
        ry,
        slantDeg: slant,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

  // Responsive Card dimensions (made petite & compact for 7 rotating projects)
  const cardWidth = isMobile
    ? Math.min(110, dimensions.width * 0.28)
    : isTablet
    ? Math.min(136, dimensions.width * 0.18)
    : Math.min(156, dimensions.width * 0.125);

  // Mouse move handler for subtle parallax and LEARN MORE position
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

  // Wheel scroll to manually rotate orbit
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 2) return;
    isDirectNavRef.current = false;
    const radDelta = (delta / 450) * Math.PI;
    targetAngleRef.current -= radDelta;
  }, []);

  // Touch & Mouse drag to rotate orbit
  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const dx = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    isDirectNavRef.current = false;
    const radDelta = (dx / (dimensions.rx * 1.5)) * Math.PI;
    targetAngleRef.current += radDelta;
    rotationAngleRef.current += radDelta;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    dragStartXRef.current = null;
  };

  // 60fps Rotation Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 1000;
      lastTime = now;

      // Smooth mouse parallax
      mouseSmoothRef.current.x += (mouseOffsetRef.current.x - mouseSmoothRef.current.x) * 0.05;
      mouseSmoothRef.current.y += (mouseOffsetRef.current.y - mouseSmoothRef.current.y) * 0.05;

      if (isDirectNavRef.current) {
        // Direct navigation interpolation (0.60s cubic ease)
        const elapsed = now - directNavStartTimeRef.current;
        const progress = Math.min(1, elapsed / 600);
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentProg =
          directNavStartRef.current + (directNavTargetRef.current - directNavStartRef.current) * ease;
        rotationAngleRef.current = currentProg;
        targetAngleRef.current = currentProg;

        if (progress >= 1) {
          isDirectNavRef.current = false;
        }
      } else {
        // Continuous smooth rotation along oval orbit
        if (!reducedMotion && !isDraggingRef.current) {
          // Standard gentle speed: 1 revolution every 26s; slow down to 1 revolution every 65s when hovered
          const speed = hoveredRef.current ? (2 * Math.PI) / 65 : (2 * Math.PI) / 26;
          targetAngleRef.current += speed * dt;
        }

        // Spring smoothly towards targetAngle
        const diff = targetAngleRef.current - rotationAngleRef.current;
        if (Math.abs(diff) > 0.0001) {
          rotationAngleRef.current += diff * 0.22;
        } else {
          rotationAngleRef.current = targetAngleRef.current;
        }
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
  }, [count, dimensions.rx, reducedMotion]);

  // When the user clicks a project on the Work page:
  // 1. Keep selected project visible & slightly emphasize it
  // 2. Trigger the realistic magazine/book page-flip transition into that project's detail route
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

  const slantRad = (dimensions.slantDeg * Math.PI) / 180;
  const cosSlant = Math.cos(slantRad);
  const sinSlant = Math.sin(slantRad);
  const currentAng = rotationAngleRef.current;
  const parallaxX = mouseSmoothRef.current.x * 12;
  const parallaxY = mouseSmoothRef.current.y * 8;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Work Projects Rotating Oval Gallery"
    >
      {/* 
        CENTER 3D OVAL ROTATING GALLERY OF UPLOADED PROJECTS
        - Exactly 4 projects mapped to uploaded collections
        - Projects revolve around an elliptical orbit with 3D perspective
        - Numbers & titles kept strictly outside the image
      */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-auto overflow-visible">
        {/* Atmospheric Faded Red Light Glow Behind the Rotating Projects */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
          aria-hidden="true"
        >
          {/* Broad diffuse faded red light */}
          <div className="w-[85vw] max-w-5xl h-[340px] sm:h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(212,20,40,0.20)_0%,_rgba(163,8,26,0.12)_35%,_rgba(129,1,0,0.03)_65%,_transparent_80%)] blur-3xl transform -translate-y-2" />
          {/* Soft warm center core glow */}
          <div className="w-[50vw] max-w-2xl h-[240px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,69,0,0.10)_0%,_rgba(212,20,40,0.06)_40%,_transparent_75%)] blur-2xl transform -translate-y-2" />
        </div>

        {/* Faint luxury oval orbit track guideline */}
        <div
          className="absolute pointer-events-none rounded-[50%] border border-[#810100]/20 -z-5"
          style={{
            width: dimensions.rx * 2,
            height: dimensions.ry * 2,
            transform: `rotate(${dimensions.slantDeg}deg)`,
          }}
        />

        {FIVE_PROJECTS.map((project, idx) => {
          // Angle for each project spaced evenly around 360 deg (2 * PI)
          const baseAngle = (idx * (2 * Math.PI)) / count;
          const angle = (currentAng + baseAngle) % (2 * Math.PI);

          // Standard horizontal ellipse coordinates
          const rawX = dimensions.rx * Math.cos(angle);
          const rawY = dimensions.ry * Math.sin(angle);

          // Apply subtle editorial diagonal slant
          const posX = rawX * cosSlant - rawY * sinSlant + parallaxX;
          const posY = rawX * sinSlant + rawY * cosSlant + parallaxY;

          // Depth perspective:
          // Front is at angle === PI / 2 (sin(angle) === 1)
          const sinFactor = Math.sin(angle);
          const depthT = (sinFactor + 1) / 2; // 0 at back, 1 in front

          const isHovered = hoveredProjectId === project.id;
          const isFront = sinFactor > 0.45;

          // Scale: 0.82 at back to 1.04 in front (refined compact sizing)
          const baseScale = 0.82 + depthT * 0.22;
          const scale = isHovered ? baseScale * 1.05 : isFront ? baseScale * 1.02 : baseScale;

          // Opacity: 0.50 at back to 1.0 in front
          const opacity = isHovered || isFront ? 1.0 : Math.max(0.48, 0.48 + depthT * 0.52);

          // Z-index: highest in front
          const zIndex = isHovered ? 60 : Math.round(depthT * 40) + 10;

          // 3D cylindrical rotation tangent to oval orbit
          const rotateY = -Math.cos(angle) * 16;
          const rotateZ = dimensions.slantDeg * 0.35 + Math.cos(angle) * 1.8;

          return (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => handleCardMouseEnter(project)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                width: cardWidth,
                transform: `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) perspective(1000px) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className="absolute left-1/2 top-1/2 cursor-pointer will-change-transform transition-opacity duration-300 group"
              data-selectable-nav-word={`project-${project.number}`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title}`}
            >
              {/* Outer Card Container: Keeps all text & numbers OUTSIDE the image */}
              <div className="flex flex-col w-full select-none">
                {/* 
                  A. TOP SECTION (OUTSIDE IMAGE):
                  Project Number
                */}
                <div className="flex items-baseline justify-between mb-1.5 sm:mb-2 px-0.5 border-b border-[#1B1717]/10 pb-1">
                  <span
                    className={`font-serif-luxury text-sm sm:text-base tracking-[0.14em] transition-colors duration-200 ${
                      isFront ? 'text-[#810100] font-medium' : 'text-[#810100]/70 font-light'
                    }`}
                  >
                    {project.number}
                  </span>
                </div>

                {/* 
                  B. CENTER SECTION — CLOSED HAUTE COUTURE FASHION BOOK:
                  - Hardcover volume with textured leather/cloth finish
                  - Spine on left with embossed ribs and gilded gold foil accents
                  - Fore-edge with layered paper pages block
                  - High-clarity project fashion artwork embedded on the front book cover
                  - Red silk bookmark ribbon peeking out at top and bottom
                */}
                <div className="relative w-full">
                  <div
                    className={`relative w-full aspect-[3/4] rounded-sm transition-all duration-300 ease-out ${
                      isFront
                        ? 'shadow-[0_16px_32px_rgba(0,0,0,0.30),0_4px_12px_rgba(0,0,0,0.18),-6px_0_12px_rgba(0,0,0,0.22)]'
                        : 'shadow-[0_10px_22px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.12),-4px_0_8px_rgba(0,0,0,0.18)]'
                    } group-hover:shadow-[0_22px_45px_rgba(0,0,0,0.38),0_6px_18px_rgba(129,1,0,0.25),-8px_0_16px_rgba(0,0,0,0.3)]`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Left Spine of the Closed Book (Architectural 3D Book Thickness) */}
                    <div
                      className="absolute -left-[5px] sm:-left-[7px] top-[1px] bottom-[1px] w-[5px] sm:w-[7px] bg-gradient-to-r from-[#181113] via-[#2D1B1E] to-[#120D0F] rounded-l-xs flex flex-col justify-between py-2 pointer-events-none shadow-inner"
                      aria-hidden="true"
                    >
                      {/* Spine Ribs & Gold Gilded Stamping */}
                      <div className="w-full h-[1px] bg-[#D4AF37]/60" />
                      <div className="w-full h-[1px] bg-[#D4AF37]/40" />
                      <div className="w-full h-[1px] bg-[#D4AF37]/60" />
                    </div>

                    {/* Right / Top Paper Edge (Pages of the closed book visible) */}
                    <div
                      className="absolute -right-[3px] sm:-right-[4px] top-[3px] bottom-[3px] w-[3px] sm:w-[4px] bg-[#FAF5E8] rounded-r-xs border-r border-[#FAF5E8]/60 shadow-[inset_1px_0_2px_rgba(0,0,0,0.2)] pointer-events-none"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to bottom, #FAF5E8 0px, #FAF5E8 1px, #E8DFCB 1px, #E8DFCB 2px)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Crimson Silk Bookmark Ribbon Peeking Out */}
                    <div
                      className="absolute left-[38%] -top-[6px] w-[4px] sm:w-[5px] h-[9px] bg-[#810100] shadow-xs rounded-t-xs pointer-events-none z-30"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute left-[38%] -bottom-[6px] w-[4px] sm:w-[5px] h-[10px] bg-[#810100] shadow-xs rounded-b-xs pointer-events-none z-30"
                      aria-hidden="true"
                    />

                    {/* FRONT BOOK HARDCOVER WITH FULL PAGE COVER IMAGE */}
                    <div className="relative w-full h-full rounded-sm overflow-hidden bg-black shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="eager"
                        style={{
                          transition: 'filter 80ms ease-out, transform 400ms ease-out',
                        }}
                        className={`w-full h-full object-cover object-center select-none transition-transform duration-300 ease-out ${
                          clickedProjectId === project.id
                            ? 'scale-[1.05]'
                            : 'group-hover:scale-[1.03]'
                        } ${
                          isFront || isHovered
                            ? 'brightness-[1.08] contrast-[1.02]'
                            : 'brightness-[0.78] contrast-[0.98]'
                        }`}
                      />

                      {/* Subtle Left Hinge Crease Shadow on Cover (Preserves 3D Book Volume Aesthetic) */}
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />

                      {/* Subtle Edge Highlight */}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/15 rounded-sm pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 
                  C. BOTTOM SECTION (OUTSIDE IMAGE):
                  Title, Year, and Minimal Description
                */}
                <div className="mt-2 px-0.5 flex flex-col space-y-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3
                      className={`font-serif-luxury text-xs sm:text-base font-normal tracking-tight transition-colors line-clamp-1 ${
                        isFront ? 'text-[#810100] font-medium' : 'text-[#1B1717] group-hover:text-[#810100]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.16em] text-[#1B1717]/50 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#1B1717]/70 font-light leading-snug line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        3. "LEARN MORE" TEXT ON CURSOR HOVER
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
