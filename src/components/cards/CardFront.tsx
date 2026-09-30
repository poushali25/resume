import React from 'react';
import { PlayingCardItem } from '../../data/playingCardsData';

interface CardFrontProps {
  card: PlayingCardItem;
}

/**
 * CardFront — Authentic Vintage Playing Card Front matching the reference.
 * Features:
 * - Direct match to the reference artwork: Ace of Hearts with cowboy on rearing stallion
 * - Blood red (#810100) woodcut linocut engraving
 * - Vanilla card stock (#F7F2E7)
 * - Ornate corner indices: 'A' and Heart symbol
 * - Fine tactile aging texture, soft vignette, and realistic card depth
 */
export const CardFront: React.FC<CardFrontProps> = ({ card }) => {
  return (
    <div
      className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden select-none bg-[#FAF5E8]"
      style={{
        boxShadow:
          'inset 0 0 16px rgba(99, 0, 0, 0.08), inset 0 0 30px rgba(27, 23, 23, 0.1), 0 8px 20px rgba(27, 23, 23, 0.25)',
      }}
    >
      {/* 
        The Authentic Playing Card Front (Reference Artwork):
        Ace of Hearts with woodcut engraving of cowboy on rearing stallion
      */}
      <img
        src="/images/vintage_playing_card_ace.jpg"
        alt={`Vintage Ace of Hearts Card - ${card.title}`}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center pointer-events-none select-none"
        loading="eager"
      />

      {/* Tactile paper texture & subtle warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, transparent 65%, rgba(99, 0, 0, 0.18) 100%)',
        }}
      />

      {/* Subtle edge rim highlight */}
      <div className="absolute inset-0 rounded-[10px] sm:rounded-[12px] border border-[#630000]/25 pointer-events-none" />
    </div>
  );
};
