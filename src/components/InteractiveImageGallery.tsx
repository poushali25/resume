import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sliders, Upload, Check, Sparkles } from 'lucide-react';

export interface EditorialImageItem {
  id: string;
  projectId: string;
  number: string;
  title: string;
  category: string;
  year: string;
  silhouetteNote: string;
  url: string;
  speedMultiplier: number;
  heightOffset: number; // in pixels for dynamic editorial composition
}

export const INITIAL_EDITORIAL_IMAGES: EditorialImageItem[] = [
  // GROUP 1: Exactly 3 Images side by side in one horizontal row
  {
    id: 'img-01',
    projectId: 'surrealism-collection',
    number: '01',
    title: 'SURREALISM',
    category: 'Avant-Garde Tailoring',
    year: '2025',
    silhouetteNote: 'Architectural Boning · External Stays',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    speedMultiplier: 0.85,
    heightOffset: 12,
  },
  {
    id: 'img-02',
    projectId: 'crochet-textile-study',
    number: '02',
    title: 'CROCHET',
    category: 'Craft & Surface Innovation',
    year: '2024',
    silhouetteNote: 'Tensile Openwork · Hand-Spun Cord',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    speedMultiplier: 1.0,
    heightOffset: -16, // Center card elevated for artistic editorial hierarchy
  },
  {
    id: 'img-03',
    projectId: 'knitted-velvet-draping',
    number: '03',
    title: 'VELVET FORM',
    category: 'Fluid Couture & Materiality',
    year: '2023',
    silhouetteNote: 'Bias-Cut Drape · Heavy Velvet',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    speedMultiplier: 1.18,
    heightOffset: 8,
  },

  // GROUP 2: Exactly 2 Images in balanced editorial composition
  {
    id: 'img-04',
    projectId: 'structural-garment-pattern-making',
    number: '04',
    title: 'STRUCTURE',
    category: 'Deconstructed Tailoring',
    year: '2024',
    silhouetteNote: 'Origami Tessellation · Cantilever Sleeve',
    url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
    speedMultiplier: 0.94,
    heightOffset: -8,
  },
  {
    id: 'img-05',
    projectId: 'textile-experimentation',
    number: '05',
    title: 'TEXTILE',
    category: 'Material Innovation & Sustainability',
    year: '2023',
    silhouetteNote: 'Zero-Waste Khadi · Kantha Stitch',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    speedMultiplier: 1.08,
    heightOffset: 8,
  },
];

interface InteractiveImageGalleryProps {
  onSelectProject: (projectId: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
}

export const InteractiveImageGallery: React.FC<InteractiveImageGalleryProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
}) => {
  const [images, setImages] = useState<EditorialImageItem[]>(INITIAL_EDITORIAL_IMAGES);
  const [activeGroup, setActiveGroup] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Modal State for Image Replacement
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [uploadFeedback, setUploadFeedback] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cursor Tracking Physics Loop for Smooth Inertia & Damping
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });
  const [renderOffset, setRenderOffset] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });

  // Scroll Throttle / Cooldown to Prevent Rapid Skipping
  const lastScrollTime = useRef<number>(0);

  // Group 1 contains items 0, 1, 2 (Three images)
  const group1Items = images.slice(0, 3);
  // Group 2 contains items 3, 4 (Two images)
  const group2Items = images.slice(3, 5);

  // Smooth Interpolation Loop using requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let animId: number;
    const updatePhysics = () => {
      const state = mouseState.current;
      // Damping interpolation factor (0.065 for elegant, luxury fashion editorial inertia)
      state.currentX += (state.targetX - state.currentX) * 0.065;
      state.currentY += (state.targetY - state.currentY) * 0.065;

      // Base maximum translation of the entire row (in pixels)
      const maxTranslate = 75;
      const x = state.currentX * -maxTranslate;
      const y = state.currentY * -18;

      // 3D Perspective Tilt angles
      const tiltY = state.currentX * 4.5;
      const tiltX = -state.currentY * 3.2;

      setRenderOffset({ x, y, tiltX, tiltY });
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  // Window Mouse Move Listener
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      // Calculate normalized cursor coordinates (-1 to +1 from viewport center)
      const width = window.innerWidth;
      const height = window.innerHeight;
      const nx = (e.clientX - width / 2) / (width / 2);
      const ny = (e.clientY - height / 2) / (height / 2);

      // Clamp between -1 and 1
      mouseState.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseState.current.targetY = Math.max(-1, Math.min(1, ny));
    },
    [reducedMotion]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Transition controller between Group 1 and Group 2
  const transitionToGroup = useCallback((targetGroup: 1 | 2) => {
    if (targetGroup === activeGroup || isTransitioning) return;
    setIsTransitioning(true);
    setActiveGroup(targetGroup);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  }, [activeGroup, isTransitioning]);

  // Scroll / Wheel Event Listener (Down -> Group 2, Up -> Group 1)
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 750) return; // Prevent rapid oscillation

      if (e.deltaY > 35) {
        if (activeGroup === 1) {
          lastScrollTime.current = now;
          transitionToGroup(2);
        }
      } else if (e.deltaY < -35) {
        if (activeGroup === 2) {
          lastScrollTime.current = now;
          transitionToGroup(1);
        }
      }
    },
    [activeGroup, transitionToGroup]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Add non-passive wheel listener
    const onWheel = (e: WheelEvent) => {
      // If user scrolls horizontally or vertically within gallery
      if (Math.abs(e.deltaY) > 20) {
        handleWheel(e);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleWheel]);

  // Touch Swipe Gesture Handling (Mobile / Tablet)
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Detect upward swipe (scroll down) or downward swipe (scroll up)
    if (Math.abs(diffY) > 40 || Math.abs(diffX) > 40) {
      if (diffY > 40 || diffX > 40) {
        if (activeGroup === 1) transitionToGroup(2);
      } else if (diffY < -40 || diffX < -40) {
        if (activeGroup === 2) transitionToGroup(1);
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (activeGroup === 1) transitionToGroup(2);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (activeGroup === 2) transitionToGroup(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGroup, transitionToGroup]);

  // Handle local image file upload for replacement
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const newUrl = event.target.result;
          setImages((prev) => {
            const copy = [...prev];
            copy[selectedImageIndex] = {
              ...copy[selectedImageIndex],
              url: newUrl,
            };
            return copy;
          });
          setUploadFeedback('Custom fashion photograph updated successfully!');
          setTimeout(() => {
            setUploadFeedback('');
            setReplaceModalOpen(false);
          }, 1200);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-4 sm:py-6 select-none overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. TOP GALLERY STATUS / PAGINATION BAR (GROUP 01 // GROUP 02)              */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
        {/* Left: Current Active Editorial Set Indicator */}
        <div className="flex items-center space-x-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#810100] font-semibold flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#810100] animate-pulse" />
            <span>EXHIBITION GALLERY</span>
          </span>
          <span className="text-[#630000]/60 text-xs">/</span>
          <span className="text-[10px] tracking-[0.25em] text-[#1B1717]/75 uppercase font-medium">
            {activeGroup === 1 ? 'GROUP 01 (01—03)' : 'GROUP 02 (04—05)'}
          </span>
        </div>

        {/* Center/Right: Interactive Segmented Pill Controls */}
        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center p-1 rounded-full bg-[#FAF5E8] border border-[#630000]/30 shadow-xs">
            <button
              onClick={() => transitionToGroup(1)}
              className={`px-3.5 py-1 rounded-full text-[10px] tracking-[0.22em] uppercase transition-all duration-400 cursor-pointer ${
                activeGroup === 1
                  ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-medium'
                  : 'text-[#1B1717]/70 hover:text-[#810100]'
              }`}
            >
              01 — 03 (THREE IMAGES)
            </button>
            <button
              onClick={() => transitionToGroup(2)}
              className={`px-3.5 py-1 rounded-full text-[10px] tracking-[0.22em] uppercase transition-all duration-400 cursor-pointer ${
                activeGroup === 2
                  ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-medium'
                  : 'text-[#1B1717]/70 hover:text-[#810100]'
              }`}
            >
              04 — 05 (TWO IMAGES)
            </button>
          </div>

          {/* Replace Images Control */}
          <button
            onClick={() => setReplaceModalOpen(true)}
            title="Replace With My Fashion Image"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#630000]/35 bg-[#FAF5E8] hover:bg-[#810100] hover:text-[#FAF5E8] text-[10px] tracking-widest uppercase text-[#810100] transition-colors duration-300 shadow-xs cursor-pointer"
          >
            <Sliders size={11} className="text-[#630000]" />
            <span>CUSTOMIZE IMAGES</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE MAIN INTERACTIVE IMAGE STAGE                                        */}
      {/* ========================================================================= */}
      <div className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center px-4 sm:px-8">
        {/* Soft Ambient Light Wash Behind Active Strip */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background:
              activeGroup === 1
                ? 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(99, 0, 0, 0.08), transparent 75%)'
                : 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(129, 1, 0, 0.08), transparent 75%)',
          }}
        />

        {/* ----------------------------------------------------------------------- */}
        {/* GROUP 1: EXACTLY THREE IMAGES IN ONE HORIZONTAL ROW                     */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-center transition-all duration-800 ease-out ${
            activeGroup === 1
              ? 'opacity-100 scale-100 pointer-events-auto z-10'
              : 'opacity-0 scale-95 pointer-events-none -translate-y-8 absolute'
          }`}
          style={{
            transform: reducedMotion
              ? 'none'
              : activeGroup === 1
              ? `perspective(1200px) rotateY(${renderOffset.tiltY}deg) rotateX(${renderOffset.tiltX}deg)`
              : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Desktop 3-Image Horizontal Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full items-center">
            {group1Items.map((item, index) => {
              const isHovered = hoveredCardId === item.id;
              // Unique parallax translation per card based on its individual speedMultiplier
              const cardTranslateX = reducedMotion
                ? 0
                : renderOffset.x * item.speedMultiplier;
              const innerImgTranslateX = reducedMotion ? 0 : -cardTranslateX * 0.45;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProject(item.projectId)}
                  onMouseEnter={() => {
                    setHoveredCardId(item.id);
                    if (onHoverProjectStart) onHoverProjectStart();
                  }}
                  onMouseLeave={() => {
                    setHoveredCardId(null);
                    if (onHoverProjectEnd) onHoverProjectEnd();
                  }}
                  className={`group relative bg-[#1B1717] border border-[#630000]/40 rounded-xs overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#810100] hover:shadow-2xl hover:shadow-[#810100]/25 ${
                    isHovered ? 'scale-[1.03] z-20' : 'scale-100 z-10'
                  }`}
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `translate3d(${cardTranslateX}px, ${item.heightOffset}px, 0)`,
                    transition: isHovered
                      ? 'border-color 0.3s, box-shadow 0.3s'
                      : 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {/* Aspect-Ratio Image Container (3:4 Editorial Portrait Crop) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1B1717]">
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isHovered && !reducedMotion ? 'scale-108 contrast-108' : 'scale-102'
                      }`}
                      style={{
                        transform: reducedMotion
                          ? 'none'
                          : `translate3d(${innerImgTranslateX}px, 0, 0) scale(${
                              isHovered ? 1.08 : 1.02
                            })`,
                      }}
                    />

                    {/* Subtle Smoke Vignette Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1717]/90 via-[#1B1717]/25 to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                    {/* Top Index Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-2.5 py-1 bg-[#FAF5E8]/92 backdrop-blur-md border border-[#630000]/40 text-[#810100] text-[11px] font-mono tracking-widest rounded-xs shadow-xs">
                        {item.number}
                      </span>
                    </div>

                    {/* Top Right Year Tag */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-0.5 bg-[#810100]/90 backdrop-blur-md border border-[#630000]/35 text-[#FAF5E8] text-[9px] tracking-widest uppercase rounded-xs">
                        {item.year}
                      </span>
                    </div>

                    {/* Corner Crosshair Accents */}
                    <span className="absolute top-2 left-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute top-2 right-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute bottom-2 left-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute bottom-2 right-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>

                    {/* Deep Cherry Red Translucent Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#810100]/92 via-[#810100]/40 to-transparent p-6 flex flex-col justify-end text-[#FAF5E8] transition-opacity duration-400 ${
                        isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAF5E8]/90 font-semibold">
                        {item.category}
                      </span>
                      <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF5E8] font-light leading-none my-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#FAF5E8]/80 font-light line-clamp-1 mb-2">
                        {item.silhouetteNote}
                      </p>
                      <div className="inline-flex items-center space-x-1.5 text-[9px] tracking-widest text-[#FAF5E8] uppercase font-medium">
                        <span>VIEW PROJECT</span>
                        <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Static Caption Footer Below Image (Visible on mobile/default) */}
                  <div className="p-4 bg-[#FAF5E8] border-t border-[#630000]/30 flex items-baseline justify-between">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#630000] font-semibold block">
                        {item.category}
                      </span>
                      <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#810100] font-light leading-tight group-hover:text-[#1B1717] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#810100] transform -rotate-45 group-hover:rotate-0 group-hover:text-[#1B1717] transition-all duration-300"
                    />
                  </div>

                  {/* Bottom Border Highlight */}
                  <div className="h-[2px] w-0 bg-[#810100] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* GROUP 2: EXACTLY TWO IMAGES IN BALANCED EDITORIAL COMPOSITION           */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className={`w-full max-w-5xl mx-auto flex items-center justify-center transition-all duration-800 ease-out ${
            activeGroup === 2
              ? 'opacity-100 scale-100 pointer-events-auto z-10'
              : 'opacity-0 scale-95 pointer-events-none translate-y-8 absolute'
          }`}
          style={{
            transform: reducedMotion
              ? 'none'
              : activeGroup === 2
              ? `perspective(1200px) rotateY(${renderOffset.tiltY * 0.85}deg) rotateX(${renderOffset.tiltX * 0.85}deg)`
              : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Desktop 2-Image Centered Horizontal Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10 w-full items-center">
            {group2Items.map((item, index) => {
              const isHovered = hoveredCardId === item.id;
              const cardTranslateX = reducedMotion
                ? 0
                : renderOffset.x * item.speedMultiplier;
              const innerImgTranslateX = reducedMotion ? 0 : -cardTranslateX * 0.45;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProject(item.projectId)}
                  onMouseEnter={() => {
                    setHoveredCardId(item.id);
                    if (onHoverProjectStart) onHoverProjectStart();
                  }}
                  onMouseLeave={() => {
                    setHoveredCardId(null);
                    if (onHoverProjectEnd) onHoverProjectEnd();
                  }}
                  className={`group relative bg-[#1B1717] border border-[#630000]/40 rounded-xs overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#810100] hover:shadow-2xl hover:shadow-[#810100]/25 ${
                    isHovered ? 'scale-[1.03] z-20' : 'scale-100 z-10'
                  }`}
                  style={{
                    transform: reducedMotion
                      ? 'none'
                      : `translate3d(${cardTranslateX}px, ${item.heightOffset}px, 0)`,
                    transition: isHovered
                      ? 'border-color 0.3s, box-shadow 0.3s'
                      : 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {/* Aspect-Ratio Image Container (3:4 Editorial Portrait Crop) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1B1717]">
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isHovered && !reducedMotion ? 'scale-108 contrast-108' : 'scale-102'
                      }`}
                      style={{
                        transform: reducedMotion
                          ? 'none'
                          : `translate3d(${innerImgTranslateX}px, 0, 0) scale(${
                              isHovered ? 1.08 : 1.02
                            })`,
                      }}
                    />

                    {/* Subtle Smoke Vignette Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1717]/90 via-[#1B1717]/25 to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                    {/* Top Index Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-2.5 py-1 bg-[#FAF5E8]/92 backdrop-blur-md border border-[#630000]/40 text-[#810100] text-[11px] font-mono tracking-widest rounded-xs shadow-xs">
                        {item.number}
                      </span>
                    </div>

                    {/* Top Right Year Tag */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-0.5 bg-[#810100]/90 backdrop-blur-md border border-[#630000]/35 text-[#FAF5E8] text-[9px] tracking-widest uppercase rounded-xs">
                        {item.year}
                      </span>
                    </div>

                    {/* Corner Crosshair Accents */}
                    <span className="absolute top-2 left-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute top-2 right-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute bottom-2 left-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>
                    <span className="absolute bottom-2 right-2 text-[8px] text-[#630000]/80 font-mono pointer-events-none">+</span>

                    {/* Deep Cherry Red Translucent Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#810100]/92 via-[#810100]/40 to-transparent p-7 flex flex-col justify-end text-[#FAF5E8] transition-opacity duration-400 ${
                        isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAF5E8]/90 font-semibold">
                        {item.category}
                      </span>
                      <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF5E8] font-light leading-none my-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#FAF5E8]/80 font-light line-clamp-1 mb-2">
                        {item.silhouetteNote}
                      </p>
                      <div className="inline-flex items-center space-x-1.5 text-[9px] tracking-widest text-[#FAF5E8] uppercase font-medium">
                        <span>VIEW PROJECT</span>
                        <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Static Caption Footer Below Image */}
                  <div className="p-4 sm:p-5 bg-[#FAF5E8] border-t border-[#630000]/30 flex items-baseline justify-between">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#630000] font-semibold block">
                        {item.category}
                      </span>
                      <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#810100] font-light leading-tight group-hover:text-[#1B1717] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#810100] transform -rotate-45 group-hover:rotate-0 group-hover:text-[#1B1717] transition-all duration-300"
                    />
                  </div>

                  {/* Bottom Border Highlight */}
                  <div className="h-[2px] w-0 bg-[#810100] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM SCROLL INTERACTION CUE & DIRECTION ARROWS                        */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-4 sm:mt-6 flex items-center justify-between border-t border-[#630000]/25 pt-4">
        {/* Navigation Step Prompt */}
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#1B1717]/70 font-medium">
          <span className="hidden sm:inline">INTERACTIVE GALLERY //</span>
          <span>{activeGroup === 1 ? 'SCROLL DOWN FOR GROUP 02' : 'SCROLL UP FOR GROUP 01'}</span>
        </div>

        {/* Prev / Next Click Arrows */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => transitionToGroup(1)}
            disabled={activeGroup === 1}
            aria-label="Previous Group"
            className={`p-2 rounded-full border border-[#630000]/40 transition-colors ${
              activeGroup === 1
                ? 'opacity-35 cursor-not-allowed text-[#1B1717]'
                : 'text-[#810100] hover:bg-[#810100] hover:text-[#FAF5E8] cursor-pointer'
            }`}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => transitionToGroup(2)}
            disabled={activeGroup === 2}
            aria-label="Next Group"
            className={`p-2 rounded-full border border-[#630000]/40 transition-colors ${
              activeGroup === 2
                ? 'opacity-35 cursor-not-allowed text-[#1B1717]'
                : 'text-[#810100] hover:bg-[#810100] hover:text-[#FAF5E8] cursor-pointer'
            }`}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: REPLACE WITH MY FASHION IMAGE                                   */}
      {/* ========================================================================= */}
      {replaceModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#1B1717]/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF5E8] border border-[#630000] rounded-xs p-7 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#630000] font-semibold">
                GALLERY ASSET CONFIGURATION
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#810100]">
                Replace With Your Fashion Image
              </h3>
              <p className="text-xs text-[#1B1717]/80 font-light leading-relaxed">
                Choose an image slot (01 through 05) to update with your own runway, studio, or experimental garment photograph.
              </p>
            </div>

            {uploadFeedback && (
              <div className="p-3 bg-[#810100]/10 border border-[#810100] text-[#810100] text-xs flex items-center space-x-2 rounded-xs">
                <Check size={14} />
                <span>{uploadFeedback}</span>
              </div>
            )}

            {/* Select Slot */}
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#1B1717]/70 block font-medium">
                Select Gallery Position to Replace:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`p-2 text-center rounded-xs border text-xs font-mono transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#810100] bg-[#810100] text-[#FAF5E8] shadow-sm'
                        : 'border-[#630000]/40 bg-[#FAF5E8] text-[#810100] hover:border-[#810100]'
                    }`}
                  >
                    {img.number}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#630000] tracking-wider pt-1 font-medium">
                Target: {images[selectedImageIndex].number} — {images[selectedImageIndex].title}
              </p>
            </div>

            {/* File Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLocalFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 border-2 border-dashed border-[#630000] rounded-xs text-xs tracking-[0.25em] uppercase text-[#810100] hover:bg-[#630000]/10 flex items-center justify-center space-x-2 transition-colors cursor-pointer font-medium"
              >
                <Upload size={15} />
                <span>UPLOAD CUSTOM IMAGE FILE</span>
              </button>
            </div>

            {/* Curated Haute Couture Presets */}
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#1B1717]/60 block font-medium">
                Or pick from curated atelier presets:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  {
                    name: 'Architectural Stays',
                    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
                  },
                  {
                    name: 'Tensile Cord',
                    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
                  },
                  {
                    name: 'Origami Folds',
                    url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
                  },
                  {
                    name: 'Bias Velvet',
                    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
                  },
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setImages((prev) => {
                        const copy = [...prev];
                        copy[selectedImageIndex] = {
                          ...copy[selectedImageIndex],
                          url: preset.url,
                        };
                        return copy;
                      });
                      setUploadFeedback(`Applied preset: ${preset.name}`);
                      setTimeout(() => {
                        setUploadFeedback('');
                        setReplaceModalOpen(false);
                      }, 1000);
                    }}
                    className="relative aspect-square rounded-xs overflow-hidden border border-[#630000]/40 hover:border-[#810100] group cursor-pointer"
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#1B1717]/40 flex items-end p-1">
                      <span className="text-[7px] text-[#FAF5E8] tracking-wider line-clamp-1">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setReplaceModalOpen(false)}
                className="px-4 py-2 text-xs tracking-widest uppercase text-[#1B1717]/70 hover:text-[#810100] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
