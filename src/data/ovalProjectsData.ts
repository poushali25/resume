import urbanEclipseCoverImg from '../assets/images/urban_eclipse_cover.png';
import noirCoverImg from '../assets/images/regenerated_image_1791993230845.png';
import technicalSketchImg from '../assets/images/regenerated_image_1790514753708.png';
import bloomingCoverImg from '../assets/images/regenerated_image_1790702846645.jpg';
import surrealismThemeImg from '../assets/images/theme_board_surrealism_sticker.png';
import illustrationImg from '../assets/images/regenerated_image_1790615014861.png';
import craftTextileImg from '../assets/images/indigo_dabu_fabric_1790494478976.jpg';

export interface OvalProject {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  route: string;
  year: string;
}

/**
 * EXACTLY 7 PORTFOLIO PROJECTS
 */
export const OVAL_PROJECTS: OvalProject[] = [
  {
    id: 'urban-eclipse',
    number: '01',
    title: 'Urban Eclipse',
    category: 'Avant-Garde Tailoring',
    image: urbanEclipseCoverImg,
    route: '/work/project-01',
    year: '2025',
  },
  {
    id: 'crochet-textile-study',
    number: '02',
    title: 'NOIR E ZARI',
    category: 'Haute Couture Indian Wear',
    image: noirCoverImg,
    route: '/work/project-02',
    year: '2024',
  },
  {
    id: 'structural-garment-pattern-making',
    number: '03',
    title: 'Garment Construction',
    category: 'Pattern Architecture',
    image: technicalSketchImg,
    route: '/work/project-03',
    year: '2024',
  },
  {
    id: 'knitted-velvet-draping',
    number: '04',
    title: 'BLOOMING',
    category: 'Fluid Silhouette',
    image: bloomingCoverImg,
    route: '/work/project-04',
    year: '2023',
  },
  {
    id: 'textile-experimentation',
    number: '05',
    title: 'Surrealism',
    category: 'Avant-Garde & Conceptual Art',
    image: surrealismThemeImg,
    route: '/work/project-05',
    year: '2023',
  },
  {
    id: 'digital-fashion-illustration',
    number: '06',
    title: 'Digital Illustration',
    category: 'Digital Atelier & CAD',
    image: illustrationImg,
    route: '/work/project-06',
    year: '2024',
  },
  {
    id: 'bengali-inspired-illustration',
    number: '07',
    title: 'Bengali Narrative & Craft',
    category: 'Cultural Lineage & Craft',
    image: craftTextileImg,
    route: '/work/project-07',
    year: '2023',
  },
];
