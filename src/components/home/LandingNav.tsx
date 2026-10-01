import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { Menu, X } from 'lucide-react';

interface LandingNavProps {
  progressTime: number;
  reducedMotion?: boolean;
  onNavigate: (page: PageId) => void;
  onSelectWork: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  theme?: 'dark' | 'light';
}

const LANDING_NAV_ITEMS: { id: PageId; label: string; route: string }[] = [
  { id: 'home', label: 'Home', route: '/home' },
  { id: 'work', label: 'Work', route: '/work' },
  { id: 'experience', label: 'Experience', route: '/experience' },
  { id: 'about', label: 'About', route: '/about' },
  { id: 'contact', label: 'Contact', route: '/contact' },
];

/**
 * LandingNav — Luxury Fashion Portfolio Navigation matching Work page
 *
 * - Top-left: POUSHALI MAJI in delicate spaced serif typography
 * - Desktop nav: Clean rounded-full warm beige pill matching Work page (#FAF5E8/90 backdrop blur)
 * - Text: Understated title case with deep wine red active underline indicator
 * - Mobile: Responsive hamburger drawer matching Work page
 */
export const LandingNav: React.FC<LandingNavProps> = ({
  progressTime,
  reducedMotion = false,
  onNavigate,
  onSelectWork,
  onHoverStart,
  onHoverEnd,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'about' | 'archive'>('home');
  const [selectedNavId, setSelectedNavId] = useState<string>('home');
  const [isHoverInteracting, setIsHoverInteracting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const archiveEl = document.getElementById('archive');
      if (archiveEl) {
        const rect = archiveEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setCurrentSection('archive');
          if (!isHoverInteracting) setSelectedNavId('archive');
          return;
        }
      }
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setCurrentSection('about');
          if (!isHoverInteracting) setSelectedNavId('about');
          return;
        }
      }
      setCurrentSection('home');
      if (!isHoverInteracting) setSelectedNavId('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHoverInteracting]);

  // Navigation is visible immediately when landing page opens
  const isVisible = true;

  const handleClick = (id: PageId | 'archive', route: string) => {
    setSelectedNavId(id);
    setMobileMenuOpen(false);
    if (id === 'work') {
      onSelectWork();
      return;
    }
    if (id === 'archive') {
      const archiveEl = document.getElementById('archive');
      if (archiveEl) {
        archiveEl.scrollIntoView({ behavior: 'smooth' });
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#archive');
        }
        return;
      }
    }
    if (id === 'about') {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/about');
      }
      onNavigate('about');
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/home');
      }
      return;
    }
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', route);
    }
    onNavigate(id as PageId);
  };

  useEffect(() => {
    const handleNavWordTouch = (e: Event) => {
      const customEvent = e as CustomEvent<{ word: string }>;
      const word = customEvent.detail?.word;
      if (word) {
        const item = LANDING_NAV_ITEMS.find(
          (it) => it.id === word || it.label.toLowerCase() === word
        );
        if (item) {
          setIsHoverInteracting(true);
          setSelectedNavId(item.id);
          onHoverStart?.();
        }
      }
    };

    window.addEventListener('nav-word-touch', handleNavWordTouch);
    return () => window.removeEventListener('nav-word-touch', handleNavWordTouch);
  }, [onHoverStart]);

  // Immediate selection handler when cursor star or pointer touches any navigation word
  const handleWordTouch = (id: PageId | string, _route: string) => {
    setIsHoverInteracting(true);
    setSelectedNavId(id);
    onHoverStart?.();
  };

  const handleNavLeave = () => {
    setIsHoverInteracting(false);
    onHoverEnd?.();
  };

  const handleUlPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const btn = target?.closest('[data-selectable-nav-word]') as HTMLElement | null;
    if (btn) {
      const word = btn.getAttribute('data-selectable-nav-word');
      if (word && word !== selectedNavId) {
        handleWordTouch(word as PageId, '');
      }
    }
  };

  return (
    <>
      <header
        role="banner"
        aria-label="Atelier Navigation Header"
        className={`fixed top-0 left-0 right-0 z-[100] px-6 sm:px-12 flex items-center justify-end pointer-events-auto transition-all duration-700 ease-out select-none ${
          isVisible
            ? 'opacity-100 translate-y-0 filter blur-none'
            : 'opacity-0 -translate-y-3 filter blur-xs pointer-events-none'
        } ${
          isScrolled
            ? 'bg-[#810100]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        {/* Desktop Navigation Links (Clean, Small, and Elegant - identical to Work page) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center">
          <ul
            onMouseLeave={handleNavLeave}
            onPointerMove={handleUlPointerMove}
            className={`flex items-center space-x-0.5 sm:space-x-1 p-1 rounded-full backdrop-blur-md transition-all duration-300 ${
              isScrolled
                ? 'bg-white/10 border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                : 'bg-[#FAF5E8]/95 border border-[#1B1717]/15 shadow-[0_4px_24px_rgba(27,23,23,0.08)]'
            }`}
          >
            {LANDING_NAV_ITEMS.map((item) => {
              const isActive = selectedNavId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleClick(item.id, item.route)}
                    onMouseEnter={() => handleWordTouch(item.id, item.route)}
                    onPointerEnter={() => handleWordTouch(item.id, item.route)}
                    onMouseMove={() => handleWordTouch(item.id, item.route)}
                    onPointerMove={() => handleWordTouch(item.id, item.route)}
                    onTouchStart={() => handleWordTouch(item.id, item.route)}
                    onPointerDown={() => handleWordTouch(item.id, item.route)}
                    aria-current={isActive ? 'page' : undefined}
                    data-selectable-nav-word={item.label.toLowerCase()}
                    className={`relative z-10 px-4 py-1.5 rounded-full text-xs tracking-[0.20em] uppercase transition-all duration-150 ease-out focus:outline-hidden cursor-pointer select-none flex items-center justify-center ${
                      isScrolled
                        ? isActive
                          ? 'text-white font-bold scale-[1.04]'
                          : 'text-white/80 hover:text-white font-medium'
                        : isActive
                          ? 'text-[#810100] font-bold scale-[1.04] drop-shadow-[0_1px_2px_rgba(129,1,0,0.25)]'
                          : 'text-[#1B1717]/70 hover:text-[#810100] font-medium'
                    }`}
                  >
                    {/* Animated Sliding Background Glow & Underline with Ultra-Fast Spring Motion */}
                    {isActive && (
                      <motion.div
                        layoutId="landingNavActiveIndicator"
                        className={`absolute inset-0 rounded-full -z-10 ${
                          isScrolled
                            ? 'bg-white/20 border border-white/30 shadow-[0_0_14px_rgba(255,255,255,0.2)]'
                            : 'bg-gradient-to-r from-[#810100]/[0.12] via-[#810100]/[0.08] to-[#810100]/[0.12] border border-[#810100]/30 shadow-[0_0_14px_rgba(129,1,0,0.18)]'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 900,
                          damping: 38,
                          mass: 0.22,
                        }}
                      >
                        {/* Bottom accent indicator */}
                        <span
                          className={`absolute bottom-1 inset-x-2.5 h-[2px] rounded-full ${
                            isScrolled
                              ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                              : 'bg-[#810100] shadow-[0_0_8px_rgba(129,1,0,0.7)]'
                          }`}
                        />
                      </motion.div>
                    )}

                    <span className="relative z-10 transition-colors duration-150 font-sans tracking-[0.20em]">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-hidden rounded-md border text-[#1B1717] border-[#1B1717]/20 bg-[#FAF5E8]/90"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Minimal & Clean - identical to Work page) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[105] flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in border-b bg-[#FAF5E8] text-[#1B1717] border-[#1B1717]/20 shadow-2xl">
          <div className="space-y-4">
            {LANDING_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id, item.route)}
                className="block w-full text-left font-serif-luxury text-2xl tracking-[0.15em] border-b border-[#1B1717]/15 pb-3 focus:outline-hidden cursor-pointer"
              >
                <span
                  className={
                    selectedNavId === item.id
                      ? 'text-[#810100] font-medium'
                      : 'text-[#1B1717]'
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-[#1B1717]/20 pt-4 text-xs font-light">
            <p className="tracking-widest uppercase text-[#630000]">
              POUSHALI MAJI
            </p>
          </div>
        </div>
      )}
    </>
  );
};
