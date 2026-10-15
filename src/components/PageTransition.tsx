import React, { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'revealing';
export type TransitionDirection = 'forward' | 'reverse';

export interface PageTransitionProps {
  isTransitioning: boolean;
  phase: TransitionPhase;
  direction?: TransitionDirection;
  reducedMotion?: boolean;
  pageKey: string;
  children: React.ReactNode;
}

const getPageBackground = (key: string): string => {
  if (key.includes('work')) return '#FFFFFF';
  if (key.includes('project-02')) return '#090505';
  if (key.includes('project-04')) return '#FFFFFF';
  if (key.includes('project-detail')) return '#810100';
  return '#FAF5E8';
};

/**
 * MagazinePageTurnEffect
 *
 * Simulates a physical sheet of luxury fashion paper / magazine spread:
 * - The actual outgoing page lifts from the edge, bends in 3D with realistic perspective,
 *   and turns smoothly to reveal the new destination page underneath.
 * - Hardware-accelerated 3D rotation (rotateY: 0° -> 180°) with smootherstep easing
 * - Front face carries the exact visual layout of the outgoing page with subtle paper sheen & gilded edge
 * - Verso face shows warm archival cotton paper (#FAF5E8) with soft binding crease
 * - Soft dynamic under-page casting shadow that tracks the turning fold
 * - Zero content flash, zero sudden morphing
 */
const MagazinePageTurnEffect: React.FC<{
  outgoingContent: React.ReactNode;
  outgoingKey: string;
  scrollOffset: number;
  direction: TransitionDirection;
  reducedMotion?: boolean;
}> = memo(({ outgoingContent, outgoingKey, scrollOffset, direction, reducedMotion }) => {
  const [progress, setProgress] = useState(0); // 0 (flat at start) to 1 (fully turned)
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    if (reducedMotion) return;

    startTimeRef.current = performance.now();
    const duration = 1200; // 1200ms for a gentle, luxurious, editorial opening cadence

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, Math.max(0, elapsed / duration));

      // Ultra-smooth physical page-turn curve using smootherstep polynomial: 6t^5 - 15t^4 + 10t^3
      // Eliminates mechanical jerk or sudden landing snap
      const p = t * t * t * (t * (t * 6 - 15) + 10);
      setProgress(p);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 bg-[#FAF5E8] z-[9950] pointer-events-none"
      />
    );
  }

  const isForward = direction === 'forward';

  // Rotation angles:
  // Forward: flips smoothly from right edge to left edge (rotateY from 0deg to -180deg)
  // Reverse: flips smoothly from left edge to right edge (rotateY from 0deg to 180deg)
  const rotationY = isForward ? -progress * 180 : progress * 180;

  // Gentle physical paper curvature:
  const archFactor = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
  const bendTranslateZ = archFactor * 120; // 3D page lifts toward viewer smoothly up to 120px
  const curlSkew = (isForward ? 1 : -1) * Math.sin(progress * Math.PI) * 1.5;

  // Dynamic under-page shadow:
  const shadowOpacity = Math.pow(archFactor, 1.2) * 0.35;

  // Hinge transform origin:
  // Forward: hinged on left vertical edge (0% 50%)
  // Reverse: hinged on right vertical edge (100% 50%)
  const transformOrigin = isForward ? 'left center' : 'right center';

  return (
    <div
      className="fixed inset-0 z-[9950] pointer-events-none select-none overflow-hidden"
      style={{
        perspective: '2400px',
        perspectiveOrigin: '50% 50%',
      }}
      aria-hidden="true"
    >
      {/* 
        1. AMBIENT UNDER-PAGE SHADOW (Casts dynamically on the new page underneath as the sheet lifts)
      */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity"
        style={{
          opacity: shadowOpacity,
          background: isForward
            ? `radial-gradient(ellipse at ${20 + progress * 60}% 50%, rgba(20, 10, 12, 0.35) 0%, rgba(20, 10, 12, 0.08) 50%, transparent 80%)`
            : `radial-gradient(ellipse at ${80 - progress * 60}% 50%, rgba(20, 10, 12, 0.35) 0%, rgba(20, 10, 12, 0.08) 50%, transparent 80%)`,
        }}
      />

      {/* 
        2. PHYSICAL SPINE CREASE (Soft shadow where the page attaches to the binding)
      */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-10"
        style={{
          left: isForward ? 0 : 'auto',
          right: isForward ? 'auto' : 0,
          width: '50px',
          background: isForward
            ? 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)'
            : 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
          opacity: 0.7,
        }}
      />

      {/* 
        3. THE TURNING PHYSICAL MAGAZINE PAGE (Multi-layer 3D Paper Sheet)
      */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin,
          transform: `translate3d(0, 0, ${bendTranslateZ.toFixed(2)}px) rotateY(${rotationY.toFixed(
            3
          )}deg) skewY(${curlSkew.toFixed(3)}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ======================================================== */}
        {/* FRONT SIDE OF THE TURNING PAGE (Facing viewer 0° to 90°) */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            backgroundColor: getPageBackground(outgoingKey),
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Outgoing Page Content (rendered with exact viewport alignment) */}
          <div
            className="w-full min-h-screen pointer-events-none"
            style={{
              transform: `translateY(-${scrollOffset}px)`,
            }}
          >
            {outgoingContent}
          </div>

          {/* Paper Specular Light & Dynamic Arch Ridge Highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${
                isForward ? '90deg' : '270deg'
              }, rgba(255,255,255,0) 0%, rgba(255,255,255,${(archFactor * 0.22).toFixed(
                3
              )}) 45%, rgba(0,0,0,${(archFactor * 0.12).toFixed(3)}) 70%, rgba(0,0,0,${(
                archFactor * 0.25
              ).toFixed(3)}) 100%)`,
            }}
          />

          {/* Outer Deckled Page Edge (Physical Paper Thickness & Gilded Trim) */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              right: isForward ? 0 : 'auto',
              left: isForward ? 'auto' : 0,
              width: '3.5px',
              background: 'linear-gradient(to bottom, #D4AF37 0%, #FAF5E8 50%, #D4AF37 100%)',
              boxShadow: isForward
                ? '2px 0 8px rgba(0,0,0,0.18)'
                : '-2px 0 8px rgba(0,0,0,0.18)',
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* BACK SIDE OF THE TURNING PAGE (Facing viewer 90° to 180°)*/}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#FAF5E8',
          }}
        >
          {/* Warm archival ivory paper back-sheet */}
          <div className="absolute inset-0 bg-[#FAF5E8]" />
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none mix-blend-multiply" />

          {/* Realistic Translucent Show-Through Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/03 to-transparent pointer-events-none" />

          {/* Backside Page Spine Shadow (Crease where it connects to the binding) */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: isForward ? 0 : 'auto',
              right: isForward ? 'auto' : 0,
              width: '60px',
              background: isForward
                ? 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)'
                : 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
            }}
          />

          {/* Subtle Gilded Edge on the outer side */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              right: isForward ? 0 : 'auto',
              left: isForward ? 'auto' : 0,
              width: '3.5px',
              background: 'linear-gradient(to bottom, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%)',
              boxShadow: isForward
                ? '-2px 0 6px rgba(0,0,0,0.15)'
                : '2px 0 6px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>
    </div>
  );
});

MagazinePageTurnEffect.displayName = 'MagazinePageTurnEffect';

export const PageTransition: React.FC<PageTransitionProps> = memo(({
  isTransitioning,
  direction = 'forward',
  reducedMotion = false,
  pageKey,
  children,
}) => {
  const prevPageKeyRef = useRef<string>(pageKey);
  const prevChildrenRef = useRef<React.ReactNode>(children);
  const [outgoingContent, setOutgoingContent] = useState<{
    key: string;
    node: React.ReactNode;
  } | null>(null);

  const scrollOffsetRef = useRef<number>(0);
  const scrollTrackerRef = useRef<number>(0);

  // Track live scroll position when idle
  useEffect(() => {
    const handleScroll = () => {
      if (!isTransitioning) {
        scrollTrackerRef.current = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransitioning]);

  // When pageKey changes, capture outgoing content and scroll position
  useEffect(() => {
    if (pageKey !== prevPageKeyRef.current) {
      scrollOffsetRef.current = scrollTrackerRef.current;
      setOutgoingContent({
        key: prevPageKeyRef.current,
        node: prevChildrenRef.current,
      });
      prevPageKeyRef.current = pageKey;
      prevChildrenRef.current = children;
    } else {
      prevChildrenRef.current = children;
    }
  }, [pageKey, children]);

  // Clean up outgoing content when transition ends
  useEffect(() => {
    if (!isTransitioning) {
      setOutgoingContent(null);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full min-h-screen">
      {/* 
        1. PHYSICAL MAGAZINE PAGE-TURN LAYER (z-[9950])
        The outgoing page lifts from the edge, bends in 3D, and smoothly turns away.
      */}
      <AnimatePresence>
        {isTransitioning && outgoingContent && (
          <MagazinePageTurnEffect
            outgoingContent={outgoingContent.node}
            outgoingKey={outgoingContent.key}
            scrollOffset={scrollOffsetRef.current}
            direction={direction}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* 
        2. DESTINATION PAGE (Revealed smoothly underneath the turning sheet)
        Mounted cleanly at scroll top 0, ready to receive the eye as the page lifts away.
      */}
      <div className="relative w-full min-h-screen">
        {children}
      </div>
    </div>
  );
});

PageTransition.displayName = 'PageTransition';
