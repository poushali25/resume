import urbanEclipseCoverImg from '../assets/images/urban_eclipse_cover.png';
import noirCoverImg from '../assets/images/regenerated_image_1791993230845.png';
import technicalSketchImg from '../assets/images/regenerated_image_1790514753708.png';
import bloomingCoverImg from '../assets/images/regenerated_image_1790702846645.jpg';
import surrealismThemeImg from '../assets/images/theme_board_surrealism_sticker.png';
import illustrationImg from '../assets/images/regenerated_image_1790615014861.png';
import craftTextileImg from '../assets/images/indigo_dabu_fabric_1790494478976.jpg';

export interface FiveProjectItem {
  id: string; // Project identifier linked to ProjectDetailPage
  index: number; // 0 to 6
  number: string; // "01", "02", "03", "04", "05", "06", "07"
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  route: string;
  accentColor?: string;
}

/**
 * Centralized Editable Data Structure for the Exactly 7 Projects
 * Featured on the Work Page 3D Rotating Oval Orbit.
 */
export const FIVE_PROJECTS: FiveProjectItem[] = [
  {
    id: 'urban-eclipse',
    index: 0,
    number: '01',
    title: 'Urban Eclipse',
    category: 'Avant-Garde Tailoring',
    year: '2025',
    description: 'The theme merges industrial street culture with nocturnal celestial imagery—using rugged denim, visible construction lines, oversized proportions and raw edges alongside delicate embroidery, dangling threads and beadwork.',
    image: urbanEclipseCoverImg,
    route: '/work/project-01',
    accentColor: '#810100',
  },
  {
    id: 'crochet-textile-study',
    index: 1,
    number: '02',
    title: 'NOIR E ZARI',
    category: 'Haute Couture Indian Wear',
    year: '2024',
    description: 'Noir e Zari is a striking collection of Indian wear that blends the depth of black with the vibrancy of red, adorned with heavy zari embroidery. Rooted in tradition yet styled with modern elegance, the collection embodies drama, luxury, and timeless artistry.',
    image: noirCoverImg,
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
    description: 'Origami tessellations, mathematical dart manipulation, and cantilevered shoulder tailoring eliminating conventional side-seams for architectural silhouette balance.',
    image: technicalSketchImg,
    route: '/work/project-03',
    accentColor: '#810100',
  },
  {
    id: 'knitted-velvet-draping',
    index: 3,
    number: '04',
    title: 'BLOOMING',
    category: 'Fluid Couture Silhouette',
    year: '2023',
    description: 'The softness and beauty of a flower slowly coming into bloom represent the gentle and feminine nature of a girl.',
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
    description: '“Movement in visual art and literature” — Caged Mind & Overthinking, exploring anatomical distortions and subconscious emotional states.',
    image: surrealismThemeImg,
    route: '/work/project-05',
    accentColor: '#920612',
  },
  {
    id: 'digital-fashion-illustration',
    index: 5,
    number: '06',
    title: 'Digital Illustration',
    category: 'Digital Atelier & Visual CAD',
    year: '2024',
    description: 'High-contrast figure rendering, kinetic silhouette CAD treatments, and dramatic light simulations communicating the physical emotion of couture.',
    image: illustrationImg,
    route: '/work/project-06',
    accentColor: '#810100',
  },
  {
    id: 'bengali-inspired-illustration',
    index: 6,
    number: '07',
    title: 'Bengali Narrative & Craft',
    category: 'Cultural Lineage & Textiles',
    year: '2023',
    description: 'Reinterpreting classical Bengal folk narratives, Kalighat pats, and traditional indigo/dabu craft practices into contemporary fashion forms.',
    image: craftTextileImg,
    route: '/work/project-07',
    accentColor: '#920612',
  },
];
