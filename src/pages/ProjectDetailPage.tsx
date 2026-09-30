import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

// The 5 Portfolio Board visual assets for NOIR-E-ZARI (Project 01)
import themeBoardImg from '../assets/images/regenerated_image_1790514745676.png';
import inspirationBoardImg from '../assets/images/regenerated_image_1790514749756.png';
import technicalSketchImg from '../assets/images/regenerated_image_1790514753708.png';
import developmentBoardImg from '../assets/images/regenerated_image_1790514756476.png';
import lookBoardImg from '../assets/images/regenerated_image_1790514760616.png';

// Portfolio Board visual assets for Knitted Velvet Draping (Project 04)
import themeBoardP4Img from '../assets/images/regenerated_image_1790699774492.png';
import inspirationBoardP4Img from '../assets/images/regenerated_image_1790699778779.png';
import technicalBoardP4Img from '../assets/images/regenerated_image_1790699782584.png';

// Visual assets for NOIR E ZARI (Project 02)
import noirThemeBoardImg from '../assets/images/regenerated_image_1790765141035.png';
import noirInspBoardImg from '../assets/images/regenerated_image_1790765278649.png';
import noirTechSketchImg from '../assets/images/regenerated_image_1790765476701.png';
import noirDevBoardImg from '../assets/images/regenerated_image_1790765646509.png';

// The 3 Sticker Board visual assets for Surrealism (Project 05)
import themeBoardSticker from '../assets/images/theme_board_surrealism_sticker.png';
import moodBoardSticker from '../assets/images/mood_board_sticker.png';
import colourBoardSticker from '../assets/images/colour_board_sticker.png';
import developmentBoardSurrealismImg from '../assets/images/regenerated_image_1790615014861.png';

interface ProjectDetailPageProps {
  projectId: string;
  onBackToWork: () => void;
  onSwitchProject?: (projectId: string) => void;
  onOpenGallery?: (images: any[], index: number) => void;
}

interface BoardItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  isSticker?: boolean;
  size?: 'normal' | 'large' | 'wide';
}

interface ProjectPageData {
  id: string;
  number: string;
  themeTitle: string;
  subtitle?: string;
  description: string;
  boards: BoardItem[];
}

const BRAINSTORM_SPOKES = [
  { word: 'Imprisoned', tx: 250, ty: 40, anchor: 'middle', x1: 250, y1: 162, x2: 250, y2: 64 },
  { word: 'Anxiety', tx: 375, ty: 80, anchor: 'start', x1: 295, y1: 168, x2: 355, y2: 98 },
  { word: 'Trapped', tx: 400, ty: 140, anchor: 'start', x1: 316, y1: 178, x2: 382, y2: 146 },
  { word: 'Suffocation', tx: 412, ty: 190, anchor: 'start', x1: 326, y1: 190, x2: 395, y2: 190 },
  { word: 'Locked', tx: 400, ty: 240, anchor: 'start', x1: 316, y1: 202, x2: 382, y2: 232 },
  { word: 'Silence', tx: 370, ty: 300, anchor: 'start', x1: 295, y1: 212, x2: 350, y2: 282 },
  { word: 'Fear', tx: 250, ty: 340, anchor: 'middle', x1: 250, y1: 218, x2: 250, y2: 316 },
  { word: 'Confusion', tx: 130, ty: 300, anchor: 'end', x1: 205, y1: 212, x2: 150, y2: 282 },
  { word: 'Controlled', tx: 100, ty: 240, anchor: 'end', x1: 184, y1: 202, x2: 118, y2: 232 },
  { word: 'Emptiness', tx: 88, ty: 190, anchor: 'end', x1: 174, y1: 190, x2: 105, y2: 190 },
  { word: 'Isolation', tx: 100, ty: 140, anchor: 'end', x1: 184, y1: 178, x2: 118, y2: 146 },
  { word: 'Imagination', tx: 125, ty: 80, anchor: 'end', x1: 205, y1: 168, x2: 145, y2: 98 },
];

const INSPIRATION_WORDS = [
  'Dreams',
  'Illogical',
  'Exploration',
  'Magic',
  'Overthinking',
  'Express',
  'Innovation',
  'Canvas',
  'Fantasy',
  'Subconscious',
];

const ALL_PROJECT_PAGES: Record<string, ProjectPageData> = {
  'project-01': {
    id: 'project-01',
    number: '01',
    themeTitle: 'NOIR-E-ZARI',
    description: 'Noir e Zari is a striking collection of Indian wear that blends the depth of black with the vibrancy of red, adorned with heavy zari embroidery. Rooted in tradition yet styled with modern elegance, the collection embodies drama, luxury, and timeless artistry — a celebration of heritage reimagined for contemporary fashion.',
    boards: [
      { id: 'theme', title: 'THEME BOARD', src: themeBoardImg, alt: 'NOIR-E-ZARI — Theme Board' },
      { id: 'inspiration', title: 'INSPIRATION BOARD', src: inspirationBoardImg, alt: 'NOIR-E-ZARI — Inspiration Board' },
      { id: 'technical', title: 'TECHNICAL SKETCH', src: technicalSketchImg, alt: 'NOIR-E-ZARI — Technical Sketch' },
      { id: 'development', title: 'DEVELOPMENT BOARD', src: developmentBoardImg, alt: 'NOIR-E-ZARI — Development Board' },
      { id: 'look', title: 'LOOK BOARD', src: lookBoardImg, alt: 'NOIR-E-ZARI — Look Board' },
    ],
  },
  'project-02': {
    id: 'project-02',
    number: '02',
    themeTitle: 'NOIR E ZARI',
    description: 'Noir e Zari is a striking collection of Indian wear that blends the depth of black with the vibrancy of red, adorned with heavy zari embroidery. Rooted in tradition yet styled with modern elegance, the collection embodies drama, luxury, and timeless artistry — a celebration of heritage reimagined for contemporary fashion.',
    boards: [
      {
        id: 'theme',
        title: 'THEME BOARD',
        src: noirThemeBoardImg,
        alt: 'NOIR E ZARI — Theme Board: Royal Black & Crimson Silks with Ornate Gold Zari Embroidery',
      },
      {
        id: 'inspiration',
        title: 'INSPIRATION BOARD',
        src: noirInspBoardImg,
        alt: 'NOIR E ZARI — Inspiration Board: Heritage Gilded Bullion Zari, Mughal Jali & Velvet Textures',
      },
      {
        id: 'technical',
        title: 'TECHNICAL SKETCH',
        src: noirTechSketchImg,
        alt: 'NOIR E ZARI — Technical Sketch: Haute Couture Tailored Silhouette & Zari Placement CAD Flats',
      },
      {
        id: 'development',
        title: 'DEVELOPMENT BOARD',
        src: noirDevBoardImg,
        alt: 'NOIR E ZARI — Development Board: Fabric Manipulation & Hand Zardozi Sampling',
      },
      {
        id: 'look',
        title: 'LOOK BOARD',
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90',
        alt: 'NOIR E ZARI — Look Board: Dramatic Runway Silhouettes in Black & Crimson',
      },
    ],
  },
  'project-03': {
    id: 'project-03',
    number: '03',
    themeTitle: 'Garment Construction',
    description: 'Origami tessellations, mathematical dart manipulation, and cantilevered shoulder tailoring',
    boards: [
      {
        id: 'theme',
        title: 'THEME BOARD',
        src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=90',
        alt: 'Garment Construction — Theme Board: Architectural Voids & Cantilevered Shoulders',
      },
      {
        id: 'inspiration',
        title: 'INSPIRATION BOARD',
        src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=85',
        alt: 'Garment Construction — Inspiration Board: Stepwell Geometries & Chandigarh Brutalism',
      },
      {
        id: 'technical',
        title: 'TECHNICAL SKETCH',
        src: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=85',
        alt: 'Garment Construction — Technical Sketch: Multi-Point Dart Rotation & Cantilever Sleeve Flat',
      },
      {
        id: 'development',
        title: 'DEVELOPMENT BOARD',
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
        alt: 'Garment Construction — Development Board: Crease Scoring, Interfacing & Muslin Stand Draping',
      },
      {
        id: 'look',
        title: 'LOOK BOARD',
        src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90',
        alt: 'Garment Construction — Look Board: The Origami Stepped Blazer & Cantilever Trench',
      },
    ],
  },
  'project-04': {
    id: 'project-04',
    number: '04',
    themeTitle: 'BLOOMING',
    description: 'the softness and beauty of a flower slowly coming into bloom represent the gentle and feminine nature of a girl.',
    boards: [
      {
        id: 'theme',
        title: 'THEME BOARD',
        src: themeBoardP4Img,
        alt: 'Knitted Velvet Draping — Theme Board',
        isSticker: true,
      },
      {
        id: 'inspiration',
        title: 'INSPIRATION BOARD',
        src: inspirationBoardP4Img,
        alt: 'Knitted Velvet Draping — Inspiration Board',
        isSticker: true,
      },
      {
        id: 'technical',
        title: 'LOOK BOARD',
        src: technicalBoardP4Img,
        alt: 'Knitted Velvet Draping — Look Board',
        isSticker: true,
        size: 'large',
      },
    ],
  },
  'project-05': {
    id: 'project-05',
    number: '05',
    themeTitle: 'Surrealism',
    subtitle: '“movement in visual art and literature”',
    description: 'Subconscious exploration, caged mind states, and anatomical distortions manifested through sculptural tailoring',
    boards: [
      {
        id: 'theme',
        title: 'THEME BOARD',
        src: themeBoardSticker,
        alt: 'Surrealism — Theme Board',
        isSticker: true,
      },
      {
        id: 'inspiration',
        title: 'MOOD BOARD',
        src: moodBoardSticker,
        alt: 'Surrealism — Mood Board Sticker',
        isSticker: true,
      },
      {
        id: 'technical',
        title: 'COLOUR BOARD',
        src: colourBoardSticker,
        alt: 'Surrealism — Colour Board Sticker',
        isSticker: true,
      },
      {
        id: 'development',
        title: 'DEVELOPMENT BOARD',
        src: developmentBoardSurrealismImg,
        alt: 'Surrealism — Development Board (Illustration)',
      },
    ],
  },
};

const PROJECT_KEYS = ['project-01', 'project-02', 'project-03', 'project-04', 'project-05'];

const resolveProjectKey = (id: string | undefined): string => {
  if (!id) return 'project-01';
  const clean = id.toLowerCase();
  // Project 5 takes priority for textile, experiment, 05, or surrealism linked to project 5
  if (clean.includes('project-05') || clean.includes('textile-experimentation') || clean.includes('surrealism-mind') || clean.includes('05')) {
    return 'project-05';
  }
  if (clean.includes('crochet') || clean.includes('02')) return 'project-02';
  if (clean.includes('structural') || clean.includes('pattern') || clean.includes('construction') || clean.includes('03')) return 'project-03';
  if (clean.includes('velvet') || clean.includes('draping') || clean.includes('blooming') || clean.includes('04')) return 'project-04';
  if (clean.includes('urban') || clean.includes('surrealism-collection') || clean.includes('01')) return 'project-01';
  return 'project-01';
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBackToWork,
  onSwitchProject,
}) => {
  const currentKey = resolveProjectKey(projectId);
  const currentProject = ALL_PROJECT_PAGES[currentKey];

  const currentIdx = PROJECT_KEYS.indexOf(currentKey);
  const prevKey = PROJECT_KEYS[(currentIdx - 1 + PROJECT_KEYS.length) % PROJECT_KEYS.length];
  const nextKey = PROJECT_KEYS[(currentIdx + 1) % PROJECT_KEYS.length];
  const prevProject = ALL_PROJECT_PAGES[prevKey];
  const nextProject = ALL_PROJECT_PAGES[nextKey];

  const handlePrev = () => {
    if (onSwitchProject) {
      onSwitchProject(prevKey);
    }
  };

  const handleNext = () => {
    if (onSwitchProject) {
      onSwitchProject(nextKey);
    }
  };

  const isProject02 = currentKey === 'project-02';
  const isProject04 = currentKey === 'project-04';

  const projectBackgroundStyle: React.CSSProperties = isProject04
    ? {
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          linear-gradient(to right, rgba(129, 1, 0, 0.28) 50%, transparent 50%),
          linear-gradient(to bottom, rgba(129, 1, 0, 0.28) 50%, transparent 50%)
        `,
        backgroundSize: '16px 16px',
      }
    : isProject02
    ? {
        backgroundColor: '#090505',
        backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(129, 1, 0, 0.4) 0%, rgba(9, 5, 5, 0.98) 70%)`,
      }
    : {
        backgroundColor: '#810100',
      };

  return (
    <div
      className={`w-full min-h-screen relative z-10 transition-colors duration-500 ${
        isProject04 ? 'text-[#1B1717]' : 'text-[#FAF5E8]'
      }`}
      style={projectBackgroundStyle}
    >
      {/* Soft faded vignette wash for Project 04 checkered pattern */}
      {isProject04 && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(255,255,255,0.45)_100%)] z-0"
        />
      )}

      <div className="relative z-10 pt-24 sm:pt-28 pb-28 px-3 sm:px-6 md:px-8 max-w-5xl mx-auto">
        {/* Minimal Top Navigation */}
        <div
          className={`mb-8 sm:mb-10 flex items-center justify-between border-b pb-4 ${
            isProject04 ? 'border-[#810100]/20' : 'border-white/20'
          }`}
        >
          <button
            onClick={onBackToWork}
            className={`group inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase transition-colors cursor-pointer ${
              isProject04
                ? 'bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/70 shadow-sm text-[#810100] hover:bg-white hover:text-[#4A0005]'
                : 'text-[#FAF5E8] hover:text-white'
            }`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>BACK TO WORK</span>
          </button>
        </div>

        {/* 
          ========================================================================
          PROJECT 05 SPECIAL EDITORIAL MANIFESTO: SURREALISM
          - First the heading as the theme name: SURREALISM
          - Column 1: Inspirations (10 words)
          - Column 2: Brainstorming (Circular radial form centered on OVERTHINKING)
          - Column 3: Concept note (CAGED MIND & verbatim poetic text)
          Only displayed on Project 05! All other projects (01 - 04) are unchanged.
          ========================================================================
        */}
        {currentKey === 'project-05' ? (
          <div className="mb-14 sm:mb-20 pb-12 border-b border-white/20 space-y-10 sm:space-y-14">
            {/* Theme Name Heading */}
            <div className="space-y-2">
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none flex items-baseline">
                <span className="text-5xl sm:text-7xl lg:text-8xl italic font-serif pr-1">S</span>
                <span>URREALISM</span>
              </h1>
            </div>

            {/* Top Row: Inspirations (Left) & Brainstorming (Right / Center) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* 1. Inspirations Column */}
              <div className="md:col-span-5 space-y-4">
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal leading-tight">
                  Inspiration
                </h2>
                <ul className="space-y-1.5 font-serif-luxury text-base sm:text-lg text-[#FAF5E8]/90 font-light leading-snug">
                  {INSPIRATION_WORDS.map((w, idx) => (
                    <li key={idx} className="tracking-wide">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Brainstorming Column: Circular Radial Layout */}
              <div className="md:col-span-7 flex flex-col items-center space-y-4">
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal leading-tight text-center">
                  Brainstorm
                </h2>
                <div className="w-full max-w-[460px] aspect-[5/4] flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 380"
                    className="w-full h-full select-none"
                    aria-label="Brainstorm Circular Diagram: OVERTHINKING"
                  >
                    {/* Radiating Tapered Needle Spokes & Outer Words */}
                    {BRAINSTORM_SPOKES.map((spoke, idx) => {
                      const dx = spoke.x2 - spoke.x1;
                      const dy = spoke.y2 - spoke.y1;
                      const len = Math.sqrt(dx * dx + dy * dy);
                      const px = (-dy / len) * 2.2;
                      const py = (dx / len) * 2.2;
                      const pts = `${spoke.x1 - px},${spoke.y1 - py} ${spoke.x1 + px},${spoke.y1 + py} ${spoke.x2},${spoke.y2}`;

                      return (
                        <g key={idx}>
                          {/* Tapered needle ray line */}
                          <polygon points={pts} fill="white" opacity="0.95" />
                          {/* Word text */}
                          <text
                            x={spoke.tx}
                            y={spoke.ty}
                            textAnchor={spoke.anchor as any}
                            dominantBaseline="central"
                            className="font-serif-luxury text-[14.5px] fill-[#FAF5E8] font-medium tracking-wide"
                          >
                            {spoke.word}
                          </text>
                        </g>
                      );
                    })}

                    {/* Center Core: OVERTHINKING */}
                    <text
                      x="250"
                      y="190"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-serif-luxury font-bold text-[18px] tracking-[0.14em] fill-white uppercase"
                    >
                      OVERTHINKING
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. Concept note: Positioned at Bottom of Brainstorm and directly Above Theme Board */}
            <div className="pt-8 sm:pt-12 border-t border-white/15 flex flex-col items-center text-center space-y-4">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                Concept note
              </h2>
              <div className="space-y-3 max-w-xl mx-auto">
                <h3 className="text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-white font-serif-luxury">
                  CAGED MIND
                </h3>
                <div className="font-serif-luxury text-sm sm:text-base text-[#FAF5E8]/95 font-light leading-relaxed space-y-1">
                  <p>In the quite corridors of thoughts</p>
                  <p>dreams are caged behind the bars</p>
                  <p>the smiles wear mask and</p>
                  <p>heart wishper through the glass</p>
                  <p>the threads in mind bind with fear</p>
                  <p>yet within the cage a thought unfolds</p>
                  <p>tearing through the walls of</p>
                  <p>its own creation</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* General project theme header for projects 01 - 04 */
          <div className="mb-8 sm:mb-12 space-y-3">
            <h1
              className={`font-serif-luxury text-3xl sm:text-5xl lg:text-6xl leading-tight ${
                isProject04 ? 'text-[#1B1717]' : 'text-white'
              }`}
            >
              <span className={isProject04 ? 'bg-white/90 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl border border-white/70 shadow-sm inline-block' : ''}>
                Theme — <strong className={`font-bold ${isProject04 ? 'text-[#810100]' : ''}`}>{currentProject.themeTitle}</strong>
              </span>
            </h1>
            <p
              className={`text-sm sm:text-base font-light max-w-2xl leading-relaxed ${
                isProject04
                  ? 'bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/70 shadow-sm text-[#4A0005]'
                  : 'text-[#FAF5E8]/90'
              }`}
            >
              {currentProject.description}
            </p>
          </div>
        )}

        {/* Presentation Boards */}
        <div className={`flex flex-col space-y-0 ${isProject04 ? 'bg-transparent' : 'bg-[#810100]'}`}>
          {currentProject.boards.map((board) => {
            if (board.isSticker) {
              const isLarge = board.size === 'large' || board.size === 'wide';
              return (
                <div
                  key={board.id}
                  id={`board-${board.id}`}
                  className={`w-full ${isLarge ? 'py-6 sm:py-10' : 'py-3 sm:py-6'} flex flex-col items-center bg-transparent border-none`}
                >
                  {board.title && (
                    <h3
                      className={`font-serif-luxury text-xs sm:text-base tracking-[0.3em] uppercase font-semibold mb-4 sm:mb-6 text-center ${
                        isProject04
                          ? 'bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-white/70 shadow-sm text-[#810100] inline-block'
                          : 'text-[#FAF5E8]/90'
                      }`}
                    >
                      {board.title}
                    </h3>
                  )}
                  <img
                    src={board.src}
                    alt={board.alt}
                    loading="eager"
                    className={`${
                      isLarge
                        ? 'max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full h-auto scale-[1.06] sm:scale-[1.10]'
                        : 'max-w-md sm:max-w-lg lg:max-w-xl w-full h-auto'
                    } block select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]`}
                  />
                </div>
              );
            }

            const isLastDevelopmentBoard = board.id === 'development' && currentKey === 'project-05';

            return (
              <div
                key={board.id}
                id={`board-${board.id}`}
                className={`w-full overflow-hidden ${
                  isProject04
                    ? 'bg-transparent'
                    : isProject02
                    ? 'bg-[#0E0808]/95 border-b border-[#D4AF37]/25 shadow-lg shadow-black/40'
                    : 'bg-[#810100]'
                } m-0 p-0 -mb-[1px] last:mb-0 border-none ${
                  isLastDevelopmentBoard
                    ? 'sm:-mx-6 md:-mx-10 lg:-mx-16 sm:w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+8rem)] max-w-none pt-4 sm:pt-6 pb-2'
                    : ''
                }`}
              >
                {board.title && (
                  <h3
                    className={`font-serif-luxury text-sm sm:text-lg tracking-[0.3em] uppercase font-semibold mb-4 sm:mb-6 text-center pt-8 sm:pt-12 ${
                      isProject04
                        ? 'bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-white/70 shadow-sm text-[#810100] inline-block mx-auto'
                        : isProject02
                        ? 'text-[#F5E6C8]'
                        : 'text-[#FAF5E8]/90'
                    }`}
                  >
                    {isProject02 ? (
                      <span className="inline-block px-5 py-1.5 rounded-full bg-[#180A0A]/90 border border-[#D4AF37]/40 shadow-xs">
                        {board.title}
                      </span>
                    ) : (
                      board.title
                    )}
                  </h3>
                )}
                <img
                  src={board.src}
                  alt={board.alt}
                  loading="eager"
                  className={`w-full h-auto block select-none pointer-events-none ${
                    isLastDevelopmentBoard ? 'scale-[1.03] sm:scale-[1.05] origin-center' : ''
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation & Project Carousel Controls */}
        <div
          className={`mt-14 sm:mt-18 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isProject04 ? 'border-[#810100]/20' : 'border-white/15'
          }`}
        >
          <button
            onClick={onBackToWork}
            className={`inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase transition-colors cursor-pointer ${
              isProject04
                ? 'bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/70 shadow-sm text-[#810100] hover:bg-white hover:text-[#4A0005]'
                : 'text-[#FAF5E8] hover:text-white'
            }`}
          >
            <ArrowLeft size={14} />
            <span>BACK TO WORK</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className={`inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer px-3 py-1.5 rounded-xs ${
                isProject04
                  ? 'text-[#810100] border border-[#810100]/25 bg-white/70 hover:border-[#810100]/60 hover:text-[#4A0005]'
                  : 'text-[#FAF5E8]/80 border border-white/20 hover:border-white/50 hover:text-white'
              }`}
            >
              <ChevronLeft size={14} />
              <span>{prevProject.number} · {prevProject.themeTitle}</span>
            </button>

            <button
              onClick={handleNext}
              className={`inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer px-3 py-1.5 rounded-xs ${
                isProject04
                  ? 'text-[#810100] border border-[#810100]/25 bg-white/70 hover:border-[#810100]/60 hover:text-[#4A0005]'
                  : 'text-[#FAF5E8]/80 border border-white/20 hover:border-white/50 hover:text-white'
              }`}
            >
              <span>{nextProject.number} · {nextProject.themeTitle}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
