export interface OvalProject {
  id: string; // matches Project['id'] in portfolioData.ts
  number: string;
  title: string;
  category: string;
  image: string;
  route: string;
  year: string;
}

/**
 * EXACTLY 7 PORTFOLIO PROJECTS
 * 
 * Each represents one of Poushali Maji's fashion disciplines from Indus University.
 * Image paths are centralized here and can be easily customized or replaced.
 */
export const OVAL_PROJECTS: OvalProject[] = [
  {
    id: 'surrealism-collection',
    number: '01',
    title: 'Surrealism',
    category: 'Avant-Garde Tailoring',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    route: '/work/surrealism',
    year: '2025',
  },
  {
    id: 'crochet-textile-study',
    number: '02',
    title: 'Crochet',
    category: 'Artisanal Craft',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    route: '/work/crochet',
    year: '2025',
  },
  {
    id: 'structural-garment-pattern-making',
    number: '03',
    title: 'Garment Construction',
    category: 'Pattern Architecture',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    route: '/work/construction',
    year: '2024',
  },
  {
    id: 'knitted-velvet-draping',
    number: '04',
    title: 'Draping',
    category: 'Fluid Silhouette',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85',
    route: '/work/draping',
    year: '2024',
  },
  {
    id: 'digital-fashion-illustration',
    number: '05',
    title: 'Digital Illustration',
    category: 'Vector & Silhouette',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
    route: '/work/digital-illustration',
    year: '2024',
  },
  {
    id: 'bengali-inspired-illustration',
    number: '06',
    title: 'Bengali Illustration',
    category: 'Cultural Narrative',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85',
    route: '/work/bengali-illustration',
    year: '2023',
  },
  {
    id: 'textile-experimentation',
    number: '07',
    title: 'Creative Textile Design',
    category: 'Surface Alchemy',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85',
    route: '/work/textile-design',
    year: '2023',
  },
];
