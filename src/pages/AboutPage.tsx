import React, { useEffect } from 'react';
import { PageId } from '../types';
import { AboutMeSection } from '../components/home/AboutMeSection';
import { ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div
      id="about-dedicated-slide"
      className="relative min-h-screen w-full bg-[#FAF5E8] text-[#36242B] pt-24 sm:pt-28 pb-20 overflow-x-hidden"
    >
      {/* Top Breadcrumb & Return to Atelier */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-2 pb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center space-x-2 text-[10.5px] tracking-[0.25em] uppercase text-[#36242B]/70 hover:text-[#007BA7] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to Embroidery Stage</span>
        </button>
      </div>

      {/* Main Archival About Section */}
      <AboutMeSection onNavigate={onNavigate} />
    </div>
  );
};
