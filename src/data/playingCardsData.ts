import surrealismCardImg from '../assets/images/regenerated_image_1790239712838.jpg';

export interface PlayingCardItem {
  id: number;
  slug: string;
  projectId: string;
  title: string; // The short theme name displayed below the card
  fullTitle: string; // The full editorial title
  category: 'Garments' | 'Digital Illustration';
  row: 'top' | 'bottom';
  cardIndex: number; // 0 to 6
  rank: string; // Ornate playing card rank: "A", "K", "Q", "J", "X", "IX", "VIII"
  suitSymbol: string; // "♥", "♦", "♠", "♣"
  suitName: 'hearts' | 'diamonds' | 'spades' | 'clubs';
  motifType:
    | 'mannequin-corset'
    | 'crochet-knot'
    | 'shears-geometry'
    | 'draped-velvet'
    | 'cyber-muse'
    | 'bengal-lotus'
    | 'surrealist-eye';
  image: string;
  route: string;
  year: string;
  dealDelay: number; // Sequential entrance delay in seconds
  dealRotation: number; // Subtle dealing angle in degrees
  dealOffset: number; // Subtle dealing horizontal offset in px
  description: string;
}

export const PLAYING_CARDS: PlayingCardItem[] = [
  // ==========================================
  // TOP ROW — GARMENTS (4 Cards)
  // ==========================================
  {
    id: 1,
    slug: 'surrealism',
    projectId: 'surrealism-collection',
    title: 'Surrealism',
    fullTitle: 'Surrealism Collection',
    category: 'Garments',
    row: 'top',
    cardIndex: 0,
    rank: 'A',
    suitSymbol: '♥',
    suitName: 'hearts',
    motifType: 'mannequin-corset',
    image: surrealismCardImg,
    route: '/work/surrealism',
    year: '2025',
    dealDelay: 0.1,
    dealRotation: -2.2,
    dealOffset: -4,
    description: 'Subconscious distortions manifested through architectural boning and exaggerated silhouette tailoring.',
  },
  {
    id: 2,
    slug: 'crochet',
    projectId: 'crochet-textile-study',
    title: 'Crochet',
    fullTitle: 'Crochet Textile Study',
    category: 'Garments',
    row: 'top',
    cardIndex: 1,
    rank: 'K',
    suitSymbol: '♦',
    suitName: 'diamonds',
    motifType: 'crochet-knot',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    route: '/work/crochet',
    year: '2024',
    dealDelay: 0.28,
    dealRotation: 1.5,
    dealOffset: 2,
    description: 'Tensile openwork, jute cord construction, and modular geometric crochet bodice architecture.',
  },
  {
    id: 3,
    slug: 'construction',
    projectId: 'structural-garment-pattern-making',
    title: 'Construction',
    fullTitle: 'Garment Construction / Pattern Making',
    category: 'Garments',
    row: 'top',
    cardIndex: 2,
    rank: 'Q',
    suitSymbol: '♠',
    suitName: 'spades',
    motifType: 'shears-geometry',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85',
    route: '/work/construction',
    year: '2024',
    dealDelay: 0.46,
    dealRotation: -1.8,
    dealOffset: -3,
    description: 'Origami tessellations, mathematical dart manipulation, and cantilevered shoulder tailoring.',
  },
  {
    id: 4,
    slug: 'draping',
    projectId: 'knitted-velvet-draping',
    title: 'Draping',
    fullTitle: 'Draping / Knitted Velvet',
    category: 'Garments',
    row: 'top',
    cardIndex: 3,
    rank: 'J',
    suitSymbol: '♣',
    suitName: 'clubs',
    motifType: 'draped-velvet',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85',
    route: '/work/draping',
    year: '2023',
    dealDelay: 0.64,
    dealRotation: 2.1,
    dealOffset: 4,
    description: 'Sensual bias-cut silk velvet combined with artisanal alpaca rib-knitting and fluid cowl cascades.',
  },

  // ==========================================
  // BOTTOM ROW — DIGITAL ILLUSTRATION (3 Cards)
  // ==========================================
  {
    id: 5,
    slug: 'digital-illustration',
    projectId: 'digital-fashion-illustration',
    title: 'Digital Form',
    fullTitle: 'Digital Fashion Illustration',
    category: 'Digital Illustration',
    row: 'bottom',
    cardIndex: 4,
    rank: 'X',
    suitSymbol: '♥',
    suitName: 'hearts',
    motifType: 'cyber-muse',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    route: '/work/digital-illustration',
    year: '2025',
    dealDelay: 0.82,
    dealRotation: -1.4,
    dealOffset: -2,
    description: 'High-contrast silhouette rendering, avant-garde editorial gestures, and gouache CAD explorations.',
  },
  {
    id: 6,
    slug: 'bengali-illustration',
    projectId: 'bengali-inspired-illustration',
    title: 'Bengal',
    fullTitle: 'Bengali-inspired Digital Illustration',
    category: 'Digital Illustration',
    row: 'bottom',
    cardIndex: 5,
    rank: 'IX',
    suitSymbol: '♦',
    suitName: 'diamonds',
    motifType: 'bengal-lotus',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    route: '/work/bengali-illustration',
    year: '2024',
    dealDelay: 1.0,
    dealRotation: 1.8,
    dealOffset: 3,
    description: 'Heritage Bengali mythological aesthetics, Kantha stitch vectors, and traditional alpona geometric motifs.',
  },
  {
    id: 7,
    slug: 'conceptual-illustration',
    projectId: 'conceptual-illustration',
    title: 'Conceptual Illustration',
    fullTitle: 'Experimental & Conceptual Illustration',
    category: 'Digital Illustration',
    row: 'bottom',
    cardIndex: 6,
    rank: 'VIII',
    suitSymbol: '♠',
    suitName: 'spades',
    motifType: 'surrealist-eye',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    route: '/work/conceptual-illustration',
    year: '2024',
    dealDelay: 1.18,
    dealRotation: -0.9,
    dealOffset: 1,
    description: 'Surrealist dreamscapes, anatomical metaphysical forms, and non-Euclidean fashion narratives.',
  },
];
