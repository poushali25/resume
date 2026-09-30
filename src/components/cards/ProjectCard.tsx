import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { PlayingCardItem } from '../../data/playingCardsData';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { ThemeLabel } from './ThemeLabel';

interface ProjectCardProps {
  card: PlayingCardItem;
  isDealt: boolean; // Entrance trigger
  isFlipped: boolean; // 3D flip trigger
  flipDelay: number; // Staggered flip delay
  isAnyCardExpanding: boolean;
  isSelectedForTransition: boolean;
  onSelectCard: (card: PlayingCardItem) => void;
  onHoverCardStart: (card: PlayingCardItem) => void;
  onHoverCardEnd: (card: PlayingCardItem) => void;
  onLearnMoreTrigger: (card: PlayingCardItem) => void;
  onLearnMoreDismiss: () => void;
  reducedMotion?: boolean;
}

/**
 * ProjectCard — Physical Playing Card Component.
 * Implements:
 * 1. Sequential physical deal entrance from below the viewport with slight tilt and spring bounce.
 * 2. 3D Card flip revealing the project photograph after the 2-second rest pause.
 * 3. Immediate subtle hover reaction (scale 1.05, 3D lift, elevated shadow).
 * 4. 1-second hover countdown for bold "LEARN MORE" cursor.
 * 5. Cinematic click expansion to route.
 * 6. Small theme label centered directly underneath.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  card,
  isDealt,
  isFlipped,
  flipDelay,
  isAnyCardExpanding,
  isSelectedForTransition,
  onSelectCard,
  onHoverCardStart,
  onHoverCardEnd,
  onLearnMoreTrigger,
  onLearnMoreDismiss,
  reducedMotion = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);

  // Clear hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isAnyCardExpanding) return;
    setIsHovered(true);
    onHoverCardStart(card);

    // 1-second hover requirement:
    // Display LEARN MORE only after the cursor remains on the card for 1 full second
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      onLearnMoreTrigger(card);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    onLearnMoreDismiss();
    onHoverCardEnd(card);
  };

  const handleClick = () => {
    if (isAnyCardExpanding) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    onLearnMoreDismiss();
    onSelectCard(card);
  };

  // Settle rotation after dealing: subtle random table tilt
  const restRotation = card.dealRotation;

  return (
    <div className="flex flex-col items-center">
      {/* 
        3D Perspective Container for the Playing Card
      */}
      <motion.div
        className="relative perspective-[1200px] cursor-pointer touch-manipulation"
        initial={
          reducedMotion
            ? { opacity: 0, y: 30 }
            : {
                opacity: 0,
                y: '100vh',
                rotateZ: card.dealRotation * 3,
                x: card.dealOffset * 4,
                scale: 0.92,
              }
        }
        animate={
          isSelectedForTransition
            ? {
                scale: 1.35,
                y: -40,
                z: 100,
                opacity: 1,
                rotateZ: 0,
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              }
            : isAnyCardExpanding
            ? {
                opacity: 0.25,
                scale: 0.92,
                transition: { duration: 0.45 },
              }
            : isDealt
            ? {
                opacity: 1,
                y: 0,
                x: 0,
                rotateZ: isHovered ? 0 : restRotation,
                scale: isHovered ? 1.05 : 1,
                transition: reducedMotion
                  ? { duration: 0.4 }
                  : {
                      type: 'spring',
                      damping: 18,
                      stiffness: 70,
                      mass: 0.85,
                      delay: card.dealDelay,
                    },
              }
            : { opacity: 0, y: '100vh' }
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 
          Card Dimensions: Classic Playing Card Ratio (~2.5 : 3.5)
          Tastefully scaled down slightly for refined tabletop proportion as requested
        */}
        <div
          className="relative w-[86px] xs:w-[102px] sm:w-[118px] md:w-[130px] lg:w-[142px] xl:w-[154px] aspect-[2.5/3.5] transition-all duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            filter: isHovered
              ? 'drop-shadow(0 16px 24px rgba(27,23,23,0.35)) drop-shadow(0 0 10px rgba(129,1,0,0.22))'
              : 'drop-shadow(0 10px 16px rgba(27,23,23,0.2))',
          }}
        >
          {/* 
            FLIPPER INNER CONTAINER:
            Flips smoothly around Y-axis when isFlipped is true
          */}
          <motion.div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
            }}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={
              reducedMotion
                ? { duration: 0.3 }
                : {
                    duration: 0.85,
                    ease: [0.25, 1, 0.5, 1],
                    delay: flipDelay,
                  }
            }
          >
            {/* FRONT FACE: Vintage Engraved Playing Card Design */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              <CardFront card={card} />
            </div>

            {/* BACK FACE: Revealed Project Image Inside Card Frame */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardBack card={card} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 
        THEME NAME DIRECTLY BELOW THE CARD:
        e.g., "Surrealism", "Crochet", "Construction", etc.
        Fades in after the cards have flipped!
      */}
      <ThemeLabel
        title={card.title}
        isVisible={isFlipped && !isAnyCardExpanding}
        isHovered={isHovered}
      />
    </div>
  );
};
