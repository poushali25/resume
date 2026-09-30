import urbanEclipseCoverImg from '../assets/images/urban_eclipse_cover.png';
import bloomingCoverImg from '../assets/images/regenerated_image_1790702846645.jpg';
import surrealismThemeImg from '../assets/images/theme_board_surrealism_sticker.png';

export interface FiveProjectItem {
  id: string; // Project identifier linked to ProjectDetailPage
  index: number; // 0 to 4
  number: string; // "01", "02", "03", "04", "05"
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  route: string;
  accentColor?: string;
}

/**
 * Centralized Editable Data Structure for the Exactly 5 Projects
 * Featured on the Work Page Vertical Oval Orbit.
 */
export const FIVE_PROJECTS: FiveProjectItem[] = [
  {
    id: 'surrealism-collection',
    index: 0,
    number: '01',
    title: 'Urban Eclipse',
    category: 'Avant-Garde Tailoring',
    year: '2025',
    description: 'Explores the contrast between raw streetwear construction and celestial handcraft.',
    image: urbanEclipseCoverImg,
    route: '/work/project-01',
    accentColor: '#810100',
  },
  {
    id: 'crochet-textile-study',
    index: 1,
    number: '02',
    title: 'Crochet Textile Study',
    category: 'Artisanal Craft & Surface',
    year: '2024',
    description: 'Tensile openwork, jute cord construction, and modular geometric crochet bodice architecture.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    route: '/work/project-02',
    accentColor: '#920612',
  },
  {
    id: 'structural-garment-pattern-making',
    index: 2,
    number: '03',
    title: 'Garment Construction',
    category: 'Pattern Architecture',
    year: '2024',
    description: 'Origami tessellations, mathematical dart manipulation, and cantilevered shoulder tailoring.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
    route: '/work/project-03',
    accentColor: '#D41428',
  },
  {
    id: 'knitted-velvet-draping',
    index: 3,
    number: '04',
    title: 'BLOOMING',
    category: 'Fluid Couture Silhouette',
    year: '2023',
    description: 'the softness and beauty of a flower slowly coming into bloom represent the gentle and feminine nature of a girl.',
    image: bloomingCoverImg,
    route: '/work/project-04',
    accentColor: '#810100',
  },
  {
    id: 'textile-experimentation',
    index: 4,
    number: '05',
    title: 'Surrealism',
    category: 'Avant-Garde & Conceptual Art',
    year: '2023',
    description: '“movement in visual art and literature” — Caged Mind & Overthinking.',
    image: surrealismThemeImg,
    route: '/work/project-05',
    accentColor: '#920612',
  },
];
