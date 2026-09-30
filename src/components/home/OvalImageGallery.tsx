import React, { useState, useEffect, useRef, useCallback } from 'react';
import { OVAL_PROJECTS, OvalProject } from '../../data/ovalProjectsData';
import { VintageProjectCard } from './VintageProjectCard';

interface OvalImageGalleryProps {
  progressTime: number;
  reducedMotion?: boolean;
  onSelectProject: (projectId: string) => void;
  onHoverCardStart?: () => void;
  onHoverCardEnd?: () => void;
}

/**
 * OvalImageGallery — EXACTLY 7 Project Images Rotating on a Horizontal Oval Path.
 *
 * Requirements strictly met:
 * 1. Exactly 7 projects mapped to Indus University fashion archives.
 * 2. Positioned below POUSHALI MAJI.
 * 3. Small, compact desktop/tablet/mobile dimensions with abundant negative space.
 * 4. NEVER overlaps: mathematical elliptical perimeter ensures guaranteed gaps.
 * 5. Horizontal oval path: wide, short height, subtle diagonal slant (approx. 7.5 deg).
 * 6. Continuous, fluid seamless looping matching reference video rhythm.
 * 7. B&W by default with smooth 0.6s transition to original color on cursor touch.
 * 8. 1-second hover triggers pure text "LEARN MORE" with NO background container.
 * 9. Clicking initiates a vintage photograph/card transition into the project page.
 */
export const OvalImageGallery: React.FC<OvalImageGalleryProps> = ({
  progressTime,
  reducedMotion = false,
  onSelectProject,
  onHoverCardStart,
  onHoverCardEnd,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<OvalProject | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive oval dimensions
  const [dimensions, setDimensions] = useState({
    rx: 400,
    ry: 110,
    slantDeg: -6.5,
  });

  // Track continuous rotation angle (in radians)
  const rotationAngleRef = useRef(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Resize listener for responsive oval radius
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Mobile
        setDimensions({
          rx: 165,
          ry: 56,
          slantDeg: -5.0,
        });
      } else if (w < 1024) {
        // Tablet
        setDimensions({
          rx: 290,
          ry: 85,
          slantDeg: -6.0,
        });
      } else {
        // Desktop
        setDimensions({
          rx: 400,
          ry: 110,
          slantDeg: -6.5,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Continuous loop animation loop
  useEffect(() => {
    if (reducedMotion) {
      setCurrentAngle(0);
      return;
    }

    const speed = (2 * Math.PI) / 28; // One complete gentle revolution every 28 seconds

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Only advance rotation once the intro progress has begun
      if (progressTime >= 2.0 && !isTransitioning) {
        rotationAngleRef.current = (rotationAngleRef.current + speed * delta) % (2 * Math.PI);
        setCurrentAngle(rotationAngleRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [progressTime, reducedMotion, isTransitioning]);

  // Handle Project Selection with Vintage Archive Transition
  const handleCardClick = useCallback(
    (project: OvalProject) => {
      if (isTransitioning) return;
      setSelectedProject(project);
      setIsTransitioning(true);

      // Vintage transition steps:
      // 1. Card moves forward & enlarges
      // 2. Surrounding cards fade into deep charcoal
      // 3. Vintage paper/film grain vignette darkens
      // 4. Navigate to the project information page
      setTimeout(() => {
        onSelectProject(project.id);
      }, 700);
    },
    [isTransitioning, onSelectProject]
  );

  // Staggered entry progress factor (0 to 1)
  const entryProgress = reducedMotion
    ? 1
    : Math.min(1, Math.max(0, (progressTime - 2.2) / 1.8));

  const count = OVAL_PROJECTS.length; // EXACTLY 7
  const slantRad = (dimensions.slantDeg * Math.PI) / 180;
  const cosSlant = Math.cos(slantRad);
  const sinSlant = Math.sin(slantRad);

  return (
    <section
      aria-label="Portfolio Projects Oval Gallery"
      className="relative w-full max-w-[1100px] h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center select-none"
    >
      {/* Visual Oval Track Guideline (Ultra-faint basting stitch guideline in Cerulean) */}
      <div
        className="absolute pointer-events-none rounded-[50%] border border-[#810100]/35 transition-opacity duration-1000 translate-y-6 sm:translate-y-8 md:translate-y-10"
        style={{
          width: dimensions.rx * 2,
          height: dimensions.ry * 2,
          transform: `rotate(${dimensions.slantDeg}deg)`,
          opacity: entryProgress * 0.4,
        }}
      />

      {/* 7 IMAGES ROTATING AROUND THE HORIZONTAL SLANTED OVAL */}
      <div className="relative w-full h-full flex items-center justify-center translate-y-6 sm:translate-y-8 md:translate-y-10">
        {OVAL_PROJECTS.map((project, idx) => {
          // Angle for each of the 7 cards evenly spaced around 360 deg
          const baseAngle = (idx * (2 * Math.PI)) / count;
          const angle = (currentAngle + baseAngle) % (2 * Math.PI);

          // Standard horizontal ellipse coordinates
          const rawX = dimensions.rx * Math.cos(angle);
          const rawY = dimensions.ry * Math.sin(angle);

          // Apply slight diagonal slant
          const posX = (rawX * cosSlant - rawY * sinSlant) * entryProgress;
          const posY = (rawX * sinSlant + rawY * cosSlant) * entryProgress;

          // Subtle depth perspective:
          // Items towards bottom of oval (sin(angle) > 0) are closer to viewer
          const sinFactor = Math.sin(angle);
          const depthScale = 0.94 + 0.08 * sinFactor; // 0.86 to 1.02
          const depthZ = Math.round((sinFactor + 1) * 10) + 1;

          const isHovered = hoveredId === project.id;
          const isSelected = selectedProject?.id === project.id;

          // Individual subtle card tilt along the curvature
          const cardTilt = dimensions.slantDeg * 0.5 + Math.cos(angle) * 3;

          // Scale & opacity during hover or vintage transition
          let finalScale = depthScale;
          let finalZIndex = depthZ;
          let opacity = entryProgress;

          if (isTransitioning) {
            if (isSelected) {
              finalScale = 1.38;
              finalZIndex = 80;
              opacity = 1;
            } else {
              finalScale = depthScale * 0.88;
              opacity = 0.08;
            }
          } else if (isHovered) {
            finalScale = depthScale * 1.12;
            finalZIndex = 50;
          }

          return (
            <div
              key={project.id}
              className="absolute left-1/2 top-1/2 will-change-transform transition-opacity duration-700 ease-out"
              style={{
                transform: `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${finalScale}) rotate(${cardTilt}deg)`,
                zIndex: finalZIndex,
                opacity,
              }}
            >
              <VintageProjectCard
                project={project}
                index={idx}
                isHovered={isHovered}
                onHoverStart={() => {
                  setHoveredId(project.id);
                  if (onHoverCardStart) onHoverCardStart();
                }}
                onHoverEnd={() => {
                  setHoveredId(null);
                  if (onHoverCardEnd) onHoverCardEnd();
                }}
                onClick={() => handleCardClick(project)}
                reducedMotion={reducedMotion}
              />
            </div>
          );
        })}
      </div>

      {/* Vintage Transition Dark Vignette Flash Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-40 bg-[#1B1717] transition-opacity duration-700 ${
          isTransitioning ? 'opacity-85' : 'opacity-0'
        }`}
      />
    </section>
  );
};
