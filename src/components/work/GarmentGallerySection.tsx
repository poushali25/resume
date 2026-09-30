import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GARMENT_PROJECTS, GarmentProject } from '../../data/garmentProjectsData';

interface GarmentGallerySectionProps {
  onSelectProject: (projectId: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
}

/**
 * GarmentGallerySection — Curated 7-Garment Fashion Exhibition Gallery
 *
 * Implements a visually arresting, high-fashion editorial gallery:
 * - Exactly 7 garment projects from Poushali Maji's portfolio
 * - Alternating asymmetric composition: monumental hero, compact satellite, panoramic wide, tall vertical, offset golden-ratio, and dramatic climax
 * - Subtle hover interaction: slight scale (1.025), delicate image shift, gossamer cherry red overlay, and small editorial "VIEW PROJECT" pill
 * - Direct navigation: clicking any garment immediately opens that project's detail case study page
 * - Luxury editorial typography with refined spacing, Roman numerals, and minimal annotations
 */
export const GarmentGallerySection: React.FC<GarmentGallerySectionProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
}) => {
  const handleCardClick = (project: GarmentProject) => {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', project.route);
    }
    onSelectProject(project.id);
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-32 flex flex-col items-center"
      aria-label="Atelier Garments Exhibition Gallery"
    >
      {/* Editorial Exhibition Header */}
      <header className="w-full max-w-5xl mb-20 sm:mb-28 text-left border-b border-[#1B1717]/15 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10.5px] uppercase tracking-[0.3em] font-sans font-semibold text-[#810100]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#810100]" />
              <span>ATELIER ARCHIVE // 07 GARMENT PROJECTS</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-[#1B1717] tracking-tight leading-[1.05]">
              Curated Garments &amp; Silhouettes
            </h1>
          </div>

          <div className="text-left sm:text-right font-sans">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#1B1717]/60 block">
              INDIUS UNIVERSITY · AHMEDABAD
            </span>
            <span className="text-xs tracking-[0.18em] font-medium text-[#1B1717] uppercase block mt-1">
              HAUTE COUTURE × INDIAN TEXTILES
            </span>
          </div>
        </div>
      </header>

      {/* 
        7 Garment Projects Grid
        Asymmetric editorial distribution avoiding generic e-commerce layout
      */}
      <div className="w-full grid grid-cols-12 gap-y-24 sm:gap-y-32 lg:gap-y-40 gap-x-6 sm:gap-x-10 items-start">
        {GARMENT_PROJECTS.map((project) => (
          <article
            key={project.id}
            className={`relative flex flex-col group cursor-pointer ${project.containerColClass} ${
              project.offsetMarginClass || ''
            }`}
            onClick={() => handleCardClick(project)}
            onMouseEnter={onHoverProjectStart}
            onMouseLeave={onHoverProjectEnd}
          >
            {/* Top Project Label: Number & Category */}
            <div className="flex items-baseline justify-between mb-4 border-b border-[#1B1717]/10 pb-2">
              <span className="font-serif-luxury text-xl sm:text-2xl text-[#810100] tracking-[0.15em] font-light">
                {project.number}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#1B1717]/65 font-sans font-medium">
                {project.category}
              </span>
            </div>

            {/* Garment Image Frame with Subtle Luxury Hover */}
            <div
              className={`relative w-full ${project.aspectRatioClass} overflow-hidden rounded-xs bg-[#F3E8CB]/40 border border-[#1B1717]/12 shadow-[0_12px_36px_rgba(27,23,23,0.06)]`}
            >
              <img
                src={project.image}
                alt={`${project.title} — Garment ${project.number}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out select-none ${
                  reducedMotion
                    ? ''
                    : `group-hover:scale-[1.03] ${project.imageShiftClass || 'group-hover:-translate-y-1'}`
                }`}
              />

              {/* Subtle Red Overlay on Hover */}
              <div
                className="absolute inset-0 bg-[#810100]/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* Fine paper/linen grain texture overlay */}
              <div
                className="absolute inset-0 bg-grain opacity-20 pointer-events-none mix-blend-multiply"
                aria-hidden="true"
              />

              {/* Subtle border highlight */}
              <div
                className="absolute inset-0 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* Small "VIEW PROJECT" Editorial Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none z-10">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1B1717]/85 backdrop-blur-md text-[#FAF5E8] text-[9.5px] sm:text-[10px] tracking-[0.22em] uppercase font-sans font-medium border border-[#FAF5E8]/15 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={12} className="text-[#FAF5E8]" />
                </span>
              </div>
            </div>

            {/* Bottom Caption: Title, Year, and Detail */}
            <div className="mt-4 sm:mt-5 flex flex-col space-y-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1B1717] font-normal tracking-tight group-hover:text-[#810100] transition-colors duration-300">
                  {project.title}
                </h2>
                <span className="text-[11px] font-sans tracking-[0.2em] text-[#1B1717]/50">
                  {project.year}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#1B1717]/75 font-light leading-relaxed max-w-xl">
                {project.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
