import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PageId, GalleryImage } from './types';
import { Navbar } from './components/Navbar';
import { SmokingCursor } from './components/SmokingCursor';
import { FireSmokeCanvas } from './components/FireSmokeCanvas';
import { PageTransition, TransitionPhase, TransitionDirection } from './components/PageTransition';
import { ImageViewerModal } from './components/ImageViewerModal';

import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('surrealism-collection');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reusable Page Transition State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('forward');
  const [triggerSweep, setTriggerSweep] = useState(false);
  const transitionTimerRef = useRef<number[]>([]);

  // Custom Cursor Interaction State
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  // Gallery Modal State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  // Smooth, organic flowing fabric page-to-page transition
  const navigateToPage = useCallback(
    (
      targetPage: PageId,
      targetProjectId?: string,
      directionOverride?: TransitionDirection,
      isPopState: boolean = false
    ) => {
      if ((targetPage as string) === 'archive' || (targetPage as string) === 'gallery') {
        if (activePage === 'home') {
          document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
          if (!isPopState && window.history && window.history.pushState) {
            window.history.pushState(null, '', '#archive');
          }
          return;
        }
        setActivePage('home');
        if (!isPopState && window.history && window.history.pushState) {
          window.history.pushState(null, '', '#archive');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
        }, 350);
        return;
      }

      if (
        isTransitioning ||
        (targetPage === activePage && (!targetProjectId || targetProjectId === selectedProjectId))
      ) {
        return;
      }

      // Determine navigation direction:
      // When navigating back to work or returning from detail, reverse the fluid direction
      const determinedDirection: TransitionDirection =
        directionOverride ||
        (activePage === 'project-detail' && targetPage === 'work' ? 'reverse' : 'forward');

      const targetRoute =
        targetPage === 'project-detail'
          ? `/work/${targetProjectId || selectedProjectId}`
          : `/${targetPage}`;

      if (!isPopState && window.history && window.history.pushState) {
        window.history.pushState(null, '', targetRoute);
      }

      // Clear any pending timers
      transitionTimerRef.current.forEach((id) => clearTimeout(id));
      transitionTimerRef.current = [];

      // Reduced motion: Clean subtle crossfade
      if (reducedMotion) {
        setIsTransitioning(true);
        setTransitionPhase('covering');

        const t1 = window.setTimeout(() => {
          if (targetProjectId) {
            setSelectedProjectId(targetProjectId);
          }
          setActivePage(targetPage);
          window.scrollTo({ top: 0, behavior: 'instant' });
          setTransitionPhase('revealing');
        }, 450);

        const t2 = window.setTimeout(() => {
          setIsTransitioning(false);
          setTransitionPhase('idle');
        }, 900);

        transitionTimerRef.current = [t1, t2];
        return;
      }

      // Smooth and slow signature liquid wave transition (~1500ms total, matching 1st page Scene 3)
      setTransitionDirection(determinedDirection);
      setIsTransitioning(true);
      setTransitionPhase('covering');
      setTriggerSweep(true);

      // PHASE 1 (0ms - 720ms): Fluid wave rises smoothly from bottom, completely covering the current page.
      // At 720ms, swap active page state underneath with zero content flash.
      const t1 = window.setTimeout(() => {
        setTransitionPhase('covered');
        if (targetProjectId) {
          setSelectedProjectId(targetProjectId);
        }
        setActivePage(targetPage);
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Trigger reveal phase so the wave crest glides past top and new page unveils smoothly
        requestAnimationFrame(() => {
          setTransitionPhase('revealing');
        });
      }, 720);

      // PHASE 2 (720ms - 1500ms): Liquid wave crest glides past the top, settling into new page
      const t2 = window.setTimeout(() => {
        setIsTransitioning(false);
        setTransitionPhase('idle');
        setTriggerSweep(false);
      }, 1500);

      transitionTimerRef.current = [t1, t2];
    },
    [activePage, isTransitioning, reducedMotion, selectedProjectId]
  );

  // Handle URL Routes & Browser Back / Forward buttons with smooth transition
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      let targetPage: PageId = 'home';
      let targetProjectId: string | undefined = undefined;

      if (path === 'work') {
        targetPage = 'work';
      } else if (path.startsWith('work/')) {
        targetPage = 'project-detail';
        targetProjectId = path.replace('work/', '');
      } else if (path === 'experience') {
        targetPage = 'experience';
      } else if (path === 'about') {
        targetPage = 'about';
      } else if (path === 'contact') {
        targetPage = 'contact';
      } else if (path === 'archive' || path === 'gallery') {
        targetPage = 'home';
        setTimeout(() => {
          document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        targetPage = 'home';
      }

      const isReverse =
        (activePage === 'project-detail' && targetPage === 'work') ||
        (targetPage === 'home' && activePage !== 'home');

      navigateToPage(targetPage, targetProjectId, isReverse ? 'reverse' : 'forward', true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activePage, navigateToPage]);

  const handleSelectProject = (projectId: string) => {
    navigateToPage('project-detail', projectId);
  };

  const handleBackToWork = () => {
    navigateToPage('work');
  };

  const handleSwitchProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGallery = (images: GalleryImage[], index: number = 0) => {
    setGalleryImages(images);
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div
      className="relative min-h-screen bg-[#FAF5E8] text-[#1B1717] selection:bg-[#810100] selection:text-[#FAF5E8] overflow-x-hidden"
    >
      {/* Subtle Backdrop with antique popcorn paper depth */}
      {activePage !== 'home' && (
        <>
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(250,245,232,0.85),_rgba(243,232,203,0.95))] z-0" />
          <div className="fixed inset-0 pointer-events-none bg-grain opacity-25 z-0" />
        </>
      )}

      {/* 1. Custom Smoking Cursor */}
      <SmokingCursor
        cursorText=""
        isHeroHovered={isHeroHovered}
        isProjectHovered={isProjectHovered}
        isNavHovered={isNavHovered}
      />

      {/* 2. Ambient Smoke Canvas */}
      <FireSmokeCanvas
        intensity={activePage === 'home' ? 0.35 : activePage === 'work' ? 0.2 : 0.8}
        triggerSweep={triggerSweep}
        reducedMotion={reducedMotion}
      />

      {/* 3. Fixed Luxury Editorial Navigation Bar */}
      <Navbar
        activePage={activePage}
        selectedProjectId={selectedProjectId}
        onNavigate={navigateToPage}
        onHoverNavStart={() => setIsNavHovered(true)}
        onHoverNavEnd={() => setIsNavHovered(false)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
      />

      {/* 5. Fullscreen Image Viewer Modal */}
      <ImageViewerModal
        isOpen={galleryOpen}
        images={galleryImages}
        currentIndex={galleryIndex}
        onClose={handleCloseGallery}
        onNext={handleNextGallery}
        onPrev={handlePrevGallery}
      />

      {/* 6. Luxury Flowing Fabric Page Transition System */}
      <PageTransition
        isTransitioning={isTransitioning}
        phase={transitionPhase}
        direction={transitionDirection}
        reducedMotion={reducedMotion}
        pageKey={`${activePage}-${activePage === 'project-detail' ? selectedProjectId : ''}`}
      >
        {/* 7. Main Page Views */}
        <main className="relative z-10">
          {activePage === 'home' && (
            <HomePage
              onNavigate={navigateToPage}
              onHoverProjectStart={() => setIsNavHovered(true)}
              onHoverProjectEnd={() => setIsNavHovered(false)}
              reducedMotion={reducedMotion}
            />
          )}

          {activePage === 'work' && (
            <WorkPage
              onSelectProject={handleSelectProject}
              onHoverProjectStart={() => setIsProjectHovered(true)}
              onHoverProjectEnd={() => setIsProjectHovered(false)}
              reducedMotion={reducedMotion}
              selectedProjectId={selectedProjectId}
            />
          )}

          {activePage === 'project-detail' && (
            <ProjectDetailPage
              projectId={selectedProjectId}
              onBackToWork={handleBackToWork}
              onSwitchProject={handleSwitchProject}
              onOpenGallery={handleOpenGallery}
            />
          )}

          {activePage === 'experience' && <ExperiencePage />}

          {activePage === 'about' && <AboutPage onNavigate={navigateToPage} />}

          {activePage === 'contact' && <ContactPage />}
        </main>
      </PageTransition>
    </div>
  );
}
