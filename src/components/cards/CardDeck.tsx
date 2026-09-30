import React, { useState, useEffect, useRef } from 'react';
import { PLAYING_CARDS, PlayingCardItem } from '../../data/playingCardsData';
import { ProjectCard } from './ProjectCard';
import { PlayingCardCursor } from './PlayingCardCursor';

interface CardDeckProps {
  onSelectProject: (projectId: string, route: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
}

/**
 * CardDeck — Orchestrator for the 7 Fashion Playing Cards.
 * Layout:
 * - TOP ROW: 4 Cards (Garments)
 * - BOTTOM ROW: 3 Cards (Digital Illustration, centered underneath)
 *
 * Exact Timeline:
 * 1. Cards start below viewport.
 * 2. Sequential physical dealing (Cards 1..7 rise, tilt, and spring-settle).
 * 3. 2-SECOND PAUSE after cards settle onto the table.
 * 4. Staggered 3D Card Flip revealing project photographs.
 * 5. Theme names appear directly below each card.
 * 6. 1-second hover countdown triggers bold "LEARN MORE" cursor without background.
 * 7. Click triggers cinematic transition to project detail route.
 */
export const CardDeck: React.FC<CardDeckProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
}) => {
  const [isDealt, setIsDealt] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Transition state when user clicks a card
  const [expandingCard, setExpandingCard] = useState<PlayingCardItem | null>(null);

  // 1-second hover state for "LEARN MORE" cursor
  const [isLearnMoreActive, setIsLearnMoreActive] = useState(false);
  const [activeCardTitle, setActiveCardTitle] = useState<string>('');

  const dealTimerRef = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);

  // Filter 4 top cards and 3 bottom cards
  const topRowCards = PLAYING_CARDS.filter((c) => c.row === 'top');
  const bottomRowCards = PLAYING_CARDS.filter((c) => c.row === 'bottom');

  useEffect(() => {
    // 1. Trigger sequential dealing shortly after mount
    dealTimerRef.current = window.setTimeout(() => {
      setIsDealt(true);
    }, 150);

    // 2. The cards finish settling around ~1.9s.
    // Exact Requirement: WAIT FOR APPROXIMATELY 2 SECONDS after cards settle.
    // Total wait before flip = 1.9s settling + 2.0s pause = ~3.9s
    pauseTimerRef.current = window.setTimeout(() => {
      setIsFlipped(true);
    }, reducedMotion ? 800 : 3900);

    return () => {
      if (dealTimerRef.current) clearTimeout(dealTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [reducedMotion]);

  const handleLearnMoreTrigger = (card: PlayingCardItem) => {
    setActiveCardTitle(card.title);
    setIsLearnMoreActive(true);
  };

  const handleLearnMoreDismiss = () => {
    setIsLearnMoreActive(false);
    setActiveCardTitle('');
  };

  const handleCardClick = (card: PlayingCardItem) => {
    if (expandingCard) return;
    setExpandingCard(card);
    handleLearnMoreDismiss();

    // Cinematic expansion duration before route opens
    setTimeout(() => {
      onSelectProject(card.slug, card.route);
    }, 650);
  };

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 px-4 sm:px-6 z-10">
      {/* 
        Custom Cursor:
        - Pops up "LEARN MORE" in bold without background after 1 second of hovering on a card
      */}
      <PlayingCardCursor
        isVisible={isLearnMoreActive && !expandingCard}
        activeCardTitle={activeCardTitle}
      />

      {/* Main Playing Cards Table Container */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-9">
        {/* 
          =============================================
          TOP ROW — GARMENTS (4 Cards)
          CARD 1     CARD 2     CARD 3     CARD 4
          =============================================
        */}
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {topRowCards.map((card, idx) => (
            <ProjectCard
              key={`card-${card.id}`}
              card={card}
              isDealt={isDealt}
              isFlipped={isFlipped}
              flipDelay={idx * 0.11}
              isAnyCardExpanding={expandingCard !== null}
              isSelectedForTransition={expandingCard?.id === card.id}
              onSelectCard={handleCardClick}
              onHoverCardStart={onHoverProjectStart || (() => {})}
              onHoverCardEnd={onHoverProjectEnd || (() => {})}
              onLearnMoreTrigger={handleLearnMoreTrigger}
              onLearnMoreDismiss={handleLearnMoreDismiss}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* 
          =============================================
          BOTTOM ROW — DIGITAL ILLUSTRATION (3 Cards)
                 CARD 5     CARD 6     CARD 7
          Visually centered underneath the top row
          =============================================
        */}
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {bottomRowCards.map((card, idx) => (
            <ProjectCard
              key={`card-${card.id}`}
              card={card}
              isDealt={isDealt}
              isFlipped={isFlipped}
              flipDelay={0.44 + idx * 0.11} // Flips sequentially after top row
              isAnyCardExpanding={expandingCard !== null}
              isSelectedForTransition={expandingCard?.id === card.id}
              onSelectCard={handleCardClick}
              onHoverCardStart={onHoverProjectStart || (() => {})}
              onHoverCardEnd={onHoverProjectEnd || (() => {})}
              onLearnMoreTrigger={handleLearnMoreTrigger}
              onLearnMoreDismiss={handleLearnMoreDismiss}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
