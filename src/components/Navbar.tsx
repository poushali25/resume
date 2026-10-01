import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  selectedProjectId?: string;
  onNavigate: (page: PageId) => void;
  onHoverNavStart?: () => void;
  onHoverNavEnd?: () => void;
  reducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
}

const NAV_ITEMS: { id: PageId; label: string; route: string }[] = [
  { id: 'home', label: 'Home', route: '/home' },
  { id: 'work', label: 'Work', route: '/work' },
  { id: 'experience', label: 'Experience', route: '/experience' },
  { id: 'about', label: 'About', route: '/about' },
  { id: 'contact', label: 'Contact', route: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  selectedProjectId,
  onNavigate,
  onHoverNavStart,
  onHoverNavEnd,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = activePage === 'home' || activePage === 'work';
  const isProject02 =
    activePage === 'project-detail' &&
    Boolean(
      selectedProjectId &&
        (selectedProjectId.includes('02') ||
          selectedProjectId.includes('project-2') ||
          selectedProjectId === 'project-02' ||
          selectedProjectId.includes('crochet'))
    );
  const isProject04 =
    activePage === 'project-detail' &&
    Boolean(
      selectedProjectId &&
        (selectedProjectId.includes('velvet') ||
          selectedProjectId.includes('draping') ||
          selectedProjectId.includes('blooming') ||
          selectedProjectId.includes('04') ||
          selectedProjectId.includes('project-4') ||
          selectedProjectId === 'project-04')
    );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId, route: string) => {
    setMobileMenuOpen(false);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', route);
    }
    if (page !== activePage) {
      onNavigate(page);
    }
  };

  // On landing page ('home'), minimal discreet navigation is handled directly by LandingNav
  if (activePage === 'home') {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-out select-none ${
          isProject04
            ? 'bg-white/95 backdrop-blur-md border-b border-[#810100]/20 shadow-sm py-4'
            : isProject02
              ? isScrolled
                ? 'bg-[#090505]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-lg shadow-black/50 py-4'
                : 'bg-transparent py-6 sm:py-8'
              : isScrolled
                ? 'bg-[#810100]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
                : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Left: Designer Name (Clean & Minimal) */}
          <button
            onClick={() => handleNavClick('home', '/home')}
            onMouseEnter={onHoverNavStart}
            onMouseLeave={onHoverNavEnd}
            className="group text-left focus:outline-hidden cursor-pointer"
            aria-label="Poushali Maji - Home"
          >
            <span
              className={`font-serif-luxury text-lg sm:text-xl tracking-[0.22em] font-normal transition-colors duration-300 ${
                isProject04
                  ? 'text-[#1B1717] group-hover:text-[#810100]'
                  : isProject02
                    ? 'text-[#FAF5E8] group-hover:text-[#D4AF37]'
                    : isScrolled || activePage === 'project-detail'
                      ? 'text-[#FAF5E8] group-hover:text-white'
                      : 'text-[#1B1717] group-hover:text-[#810100]'
              }`}
            >
              POUSHALI MAJI
            </span>
          </button>

          {/* Desktop Navigation Links (Clean, Small, and Elegant) */}
          <nav
            className={`hidden md:flex items-center space-x-0.5 sm:space-x-1 p-1 rounded-full backdrop-blur-md transition-all duration-300 ${
              isProject04
                ? 'bg-white/95 border border-[#810100]/20 shadow-[0_4px_24px_rgba(129,1,0,0.06)]'
                : isProject02
                  ? 'bg-[#140A0A]/90 border border-[#D4AF37]/35 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
                  : isScrolled
                    ? 'bg-white/10 border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                    : 'bg-[#FAF5E8]/95 border border-[#1B1717]/15 shadow-[0_4px_24px_rgba(27,23,23,0.08)]'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                activePage === item.id || (activePage === 'project-detail' && item.id === 'work');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.route)}
                  onMouseEnter={onHoverNavStart}
                  onMouseLeave={onHoverNavEnd}
                  data-selectable-nav-word={item.label.toLowerCase()}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-xs tracking-[0.20em] uppercase transition-all duration-150 ease-out focus:outline-hidden cursor-pointer select-none flex items-center justify-center ${
                    isProject04
                      ? isActive
                        ? 'text-[#810100] font-bold scale-[1.04]'
                        : 'text-[#1B1717]/70 hover:text-[#810100] font-medium'
                      : isProject02
                        ? isActive
                          ? 'text-[#F5E6C8] font-bold scale-[1.04] drop-shadow-[0_1px_4px_rgba(212,175,55,0.4)]'
                          : 'text-[#FAF5E8]/75 hover:text-[#D4AF37] font-medium'
                        : isScrolled
                          ? isActive
                            ? 'text-white font-bold scale-[1.04]'
                            : 'text-white/80 hover:text-white font-medium'
                          : isActive
                            ? 'text-[#810100] font-bold scale-[1.04] drop-shadow-[0_1px_2px_rgba(129,1,0,0.25)]'
                            : 'text-[#1B1717]/70 hover:text-[#810100] font-medium'
                  }`}
                >
                  {/* Animated Sliding Background Glow & Underline with Fast Spring Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="subpageNavActiveIndicator"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isProject04
                          ? 'bg-gradient-to-r from-[#810100]/[0.12] via-[#810100]/[0.08] to-[#810100]/[0.12] border border-[#810100]/30 shadow-[0_0_14px_rgba(129,1,0,0.18)]'
                          : isProject02
                            ? 'bg-gradient-to-r from-[#810100]/40 via-[#D4AF37]/25 to-[#810100]/40 border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                            : isScrolled
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
                      <span
                        className={`absolute bottom-1 inset-x-2.5 h-[2px] rounded-full ${
                          isProject04
                            ? 'bg-[#810100] shadow-[0_0_8px_rgba(129,1,0,0.7)]'
                            : isProject02
                              ? 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                              : isScrolled
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
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-hidden rounded-md border transition-colors ${
                isProject04
                  ? 'text-[#1B1717] border-[#810100]/20 bg-white/95 shadow-sm'
                  : isProject02
                    ? 'text-[#FAF5E8] border-[#D4AF37]/30 bg-[#140A0A]/90 shadow-sm'
                    : isScrolled
                      ? 'text-white border-white/20 bg-white/10'
                      : 'text-[#1B1717] border-[#1B1717]/20 bg-[#FAF5E8]/90'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Minimal & Clean) */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-[95] flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in border-b ${
            isProject04
              ? 'bg-white text-[#1B1717] border-[#810100]/20'
              : isProject02
                ? 'bg-[#090505] text-[#FAF5E8] border-[#D4AF37]/30'
                : 'bg-[#FAF5E8] text-[#1B1717] border-[#1B1717]/20'
          } shadow-2xl`}
        >
          <div className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.route)}
                className={`block w-full text-left font-serif-luxury text-2xl tracking-[0.15em] border-b ${
                  isProject02 ? 'border-[#D4AF37]/20' : 'border-[#1B1717]/15'
                } pb-3 focus:outline-hidden cursor-pointer`}
              >
                <span
                  className={
                    activePage === item.id
                      ? isProject02
                        ? 'text-[#F5E6C8] font-bold drop-shadow-[0_1px_4px_rgba(212,175,55,0.4)]'
                        : 'text-[#810100] font-medium'
                      : isProject02
                        ? 'text-[#FAF5E8]/80'
                        : 'text-[#1B1717]'
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div
            className={`border-t ${
              isProject02 ? 'border-[#D4AF37]/20 text-[#FAF5E8]/60' : 'border-[#1B1717]/20'
            } pt-4 text-xs font-light`}
          >
            <p
              className={`tracking-widest uppercase ${
                isProject02 ? 'text-[#D4AF37]' : 'text-[#630000]'
              }`}
            >
              POUSHALI MAJI
            </p>
          </div>
        </div>
      )}
    </>
  );
};
