import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';

interface ImageViewerModalProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-[10000] bg-[#1B1717]/96 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 select-none animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Image detail viewer"
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#810100] font-semibold">
            POUSHALI MAJI // ATELIER ARCHIVE
          </p>
          <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#FAF5E8] font-light">
            {currentImg.title}
          </h4>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#FAF5E8] hover:text-[#810100] transition-colors py-2 px-4 rounded-full border border-[#FAF5E8]/20 hover:border-[#810100] cursor-pointer"
        >
          <span>CLOSE</span>
          <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Image Viewport with subtle grain and soft lighting */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Arrow Left */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-[#810100]/85 hover:bg-[#810100] text-[#FAF5E8] border border-[#630000]/40 hover:border-[#FAF5E8] transition-all duration-300 cursor-pointer shadow-lg"
            aria-label="Previous Image"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="relative max-h-[75vh] max-w-[85vw] flex items-center justify-center">
          <img
            src={currentImg.url}
            alt={currentImg.title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-[85vw] object-contain shadow-2xl rounded-xs border border-[#FAF5E8]/15"
          />
          {/* Subtle noise grain */}
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-30 mix-blend-overlay" />
        </div>

        {/* Navigation Arrow Right */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-[#810100]/85 hover:bg-[#810100] text-[#FAF5E8] border border-[#630000]/40 hover:border-[#FAF5E8] transition-all duration-300 cursor-pointer shadow-lg"
            aria-label="Next Image"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Bottom Footer Caption & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between z-10 border-t border-[#FAF5E8]/15 pt-4 text-xs text-[#FAF5E8]/80">
        <p className="font-light tracking-wide text-center sm:text-left max-w-xl">
          {currentImg.caption || 'Couture garment study by Poushali Maji exploring contemporary Indian textile and structural silhouette.'}
        </p>
        <div className="text-[11px] tracking-[0.25em] text-[#810100] mt-2 sm:mt-0 font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
