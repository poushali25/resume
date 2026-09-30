import React from 'react';
import { PlayingCardItem } from '../../data/playingCardsData';

interface CardBackProps {
  card: PlayingCardItem;
}

/**
 * CardBack — Revealed State after 3D Card Flip.
 * Features:
 * - Vintage playing card border remains visible!
 * - Warm antique parchment frame (#EFEAE2) with fine gold/wine borders
 * - Corner indices (Rank + Suit symbol) remain visible in opposite corners
 * - Center area houses the actual project photograph/illustration
 * - Looks like a high-fashion photograph printed directly inside a custom playing card!
 */
export const CardBack: React.FC<CardBackProps> = ({ card }) => {
  return (
    <div
      className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden select-none"
      style={{
        backgroundColor: '#FAF5E8',
        boxShadow:
          'inset 0 0 16px rgba(99, 0, 0, 0.08), inset 0 0 35px rgba(27, 23, 23, 0.08), 0 8px 22px rgba(27, 23, 23, 0.35)',
      }}
    >
      {/* Outer subtle parchment aging gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, transparent 65%, rgba(27, 23, 23, 0.2) 100%), linear-gradient(135deg, rgba(250,245,232,0.5) 0%, rgba(99,0,0,0.08) 100%)',
        }}
      />

      {/* Ornate Engraved Border Frame */}
      <div className="absolute inset-[3.5px] sm:inset-[5px] border border-[#630000]/60 rounded-[7px] sm:rounded-[9px] pointer-events-none z-10" />
      <div className="absolute inset-[6px] sm:inset-[8px] border border-[#1B1717]/25 rounded-[5px] sm:rounded-[7px] pointer-events-none z-10" />

      {/* Corner Indices (Retained on back for card authenticity) */}
      <div className="absolute top-1 sm:top-1.5 left-1 sm:left-1.5 flex flex-col items-center leading-none text-[#810100] select-none pointer-events-none z-20">
        <span className="font-serif-luxury font-bold text-[9px] sm:text-[11px] tracking-tighter">
          {card.rank}
        </span>
        <span className="text-[7px] sm:text-[9px] leading-tight mt-[-2px]">
          {card.suitSymbol}
        </span>
      </div>

      <div className="absolute bottom-1 sm:bottom-1.5 right-1 sm:right-1.5 flex flex-col items-center leading-none text-[#810100] select-none pointer-events-none z-20 rotate-180">
        <span className="font-serif-luxury font-bold text-[9px] sm:text-[11px] tracking-tighter">
          {card.rank}
        </span>
        <span className="text-[7px] sm:text-[9px] leading-tight mt-[-2px]">
          {card.suitSymbol}
        </span>
      </div>

      {/* 
        CENTER PROJECT PHOTOGRAPH / ILLUSTRATION:
        Framed cleanly inside the card margins, retaining playing card proportions
      */}
      <div className="absolute inset-[11px] sm:inset-[14px] md:inset-[16px] rounded-[4px] sm:rounded-[6px] overflow-hidden bg-[#1B1717] shadow-inner">
        <img
          src={card.image}
          alt={card.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
          loading="eager"
        />

        {/* Delicate inner vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_12px_rgba(27,23,23,0.45)]" />

        {/* Subtle bottom gradient for image depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Micro-folio text at bottom center of card frame */}
      <div className="absolute bottom-0.5 sm:bottom-1 inset-x-0 flex items-center justify-center pointer-events-none z-20">
        <span className="text-[6px] sm:text-[7px] tracking-[0.2em] uppercase font-serif-luxury text-[#630000]/80">
          ATELIER 0{card.id} // {card.year}
        </span>
      </div>
    </div>
  );
};
