import React from 'react';
import { OvalImageGallery } from './OvalImageGallery';
import { PageId } from '../../types';

interface ArchiveGallerySectionProps {
  progressTime: number;
  reducedMotion?: boolean;
  onSelectProject: (projectId: string) => void;
  onHoverCardStart?: () => void;
  onHoverCardEnd?: () => void;
  onNavigate?: (page: PageId) => void;
}

export const ArchiveGallerySection: React.FC<ArchiveGallerySectionProps> = ({
  progressTime,
  reducedMotion = false,
  onSelectProject,
  onHoverCardStart,
  onHoverCardEnd,
}) => {
  const isPostFluid = progressTime >= 5.0;

  return (
    <section
      id="archive"
      aria-label="Archive Collections Gallery"
      className={`absolute inset-0 pointer-events-none z-18 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isPostFluid ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-full h-full flex items-center justify-center pointer-events-auto">
        <OvalImageGallery
          progressTime={progressTime}
          reducedMotion={reducedMotion}
          onSelectProject={onSelectProject}
          onHoverCardStart={onHoverCardStart}
          onHoverCardEnd={onHoverCardEnd}
        />
      </div>
    </section>
  );
};

