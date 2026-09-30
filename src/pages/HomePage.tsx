import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import galaxyBgImage from '../assets/images/galaxy(2).jpg';
import { EmbroideryScene } from '../components/embroidery/EmbroideryScene';
import { VintagePageTransition } from '../components/embroidery/VintagePageTransition';
import { LandingNav } from '../components/home/LandingNav';
import { ArchiveGallerySection } from '../components/home/ArchiveGallerySection';

interface HomePageProps {
  onNavigate: (page: PageId, projectId?: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
}

/**
 * HomePage — Haute Couture Embroidery Landing Page for POUSHALI MAJI.
 *
 * Choreography:
 * - Full-screen Charcoal (#292624) atelier fabric with subtle linen weave and fine grain.
 * - 3D metallic embroidery needle enters from the top of the viewport.
 * - Smoothly stitches POUSHALI in Monkisa uppercase font letter-by-letter.
 * - 3D raised ivory thread with warm beige highlights, deep wine red (#5B1E2D) under-shadow.
 * - Visible thread passing through the needle eye, natural physics lag and tension.
 * - Needle completes the final stitch and rests gracefully, leaving POUSHALI illuminated.
 * - Minimal luxury navigation (Home, Work, Process, Experience, About, Contact).
 * - Vintage archive page transition.
 */
export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
}) => {
  const [progressTime, setProgressTime] = useState<number>(reducedMotion ? 10 : 0);
  const [isExpandingForWork, setIsExpandingForWork] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setProgressTime(10);
      return;
    }

    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = (now - startTimeRef.current) / 1000;
      setProgressTime(elapsed);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion]);

  // Transition when clicking WORK in navigation
  const handleSelectWork = () => {
    onNavigate('work');
  };

  // When clicking a project card on the runway
  const handleSelectProject = (projectId: string) => {
    onNavigate('project-detail', projectId);
  };

  const handleScrollToAbout = () => {
    onNavigate('about');
  };

  const handleSkipIntro = () => {
    if (progressTime < 5.6) {
      if (startTimeRef.current) {
        startTimeRef.current = performance.now() - 5600;
      }
      setProgressTime(5.6);
    }
  };

  // Scroll to #archive if loaded with that hash
  useEffect(() => {
    if (window.location.hash === '#archive' || window.location.hash === '#gallery') {
      setTimeout(() => {
        const archiveEl = document.getElementById('archive');
        if (archiveEl) {
          archiveEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <div
      id="landing-cinematic-scene"
      className="relative w-full h-screen overflow-hidden text-[#FAF5E8] flex flex-col transition-colors duration-700 bg-[#05070B]"
    >
      {/* 1. FULL-SCREEN UPLOADED GALAXY BACKGROUND (galaxy(2).jpg) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div
          className="absolute -inset-6 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url(${galaxyBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            animation: reducedMotion ? 'none' : 'galaxySubtleMotion 32s ease-in-out infinite alternate',
          }}
        />
        {/* Very subtle dark vignette overlay to preserve content readability without reducing star details */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,7,11,0.35)_100%)] pointer-events-none" />
      </div>

      {/* 2. MINIMAL TOP-RIGHT NAVIGATION (Home, Work, Process, Experience, About, Contact) */}
      <LandingNav
        progressTime={progressTime}
        reducedMotion={reducedMotion}
        onNavigate={onNavigate}
        onSelectWork={handleSelectWork}
        onHoverStart={onHoverProjectStart}
        onHoverEnd={onHoverProjectEnd}
        theme="light"
      />

      {/* 3. HERO EMBROIDERY STAGE (Needle entering from top, stitching POUSHALI in Monkisa font) */}
      <main className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        <EmbroideryScene
          progressTime={progressTime}
          reducedMotion={reducedMotion}
          onScrollToNext={handleScrollToAbout}
          isExpandingForWork={isExpandingForWork}
          onSelectProject={handleSelectProject}
          onSkipIntro={handleSkipIntro}
        />
      </main>

      {/* 4. ARCHIVE RUNWAY SECTION (SELECTED SILHOUETTES OVAL RUNWAY) */}
      <ArchiveGallerySection
        progressTime={progressTime}
        reducedMotion={reducedMotion}
        onSelectProject={handleSelectProject}
        onHoverCardStart={onHoverProjectStart}
        onHoverCardEnd={onHoverProjectEnd}
        onNavigate={onNavigate}
      />

      {/* 6. VINTAGE TEXTILE PAGE TRANSITION */}
      <VintagePageTransition isActive={isExpandingForWork} targetPageName="Work Archive" />

      {/* Global CSS for subtle galaxy motion */}
      <style>{`
        @keyframes galaxySubtleMotion {
          0% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.02) translate3d(-0.35%, -0.2%, 0);
          }
          100% {
            transform: scale(1.03) translate3d(0.35%, 0.25%, 0);
          }
        }
      `}</style>
    </div>
  );
};
