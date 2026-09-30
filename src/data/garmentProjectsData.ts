export interface GarmentProject {
  id: string; // ID corresponding to ProjectDetailPage project.id
  number: string; // "01", "02", ...
  title: string;
  category: string;
  detail: string;
  year: string;
  image: string;
  route: string;
  layoutVariant: 'monumental-left' | 'satellite-right' | 'panoramic-center' | 'vertical-left' | 'offset-right' | 'asymmetric-left' | 'climax-center';
  aspectRatioClass: string;
  containerColClass: string;
  offsetMarginClass?: string;
  imageShiftClass?: string;
}

/**
 * Exactly 7 Curated Garment Projects for Poushali Maji's Atelier Gallery.
 * All image sources reference verified existing high-resolution editorial imagery from the portfolio.
 */
export const GARMENT_PROJECTS: GarmentProject[] = [
  {
    id: 'surrealism-collection',
    number: '01',
    title: 'Surrealism Collection',
    category: 'Avant-Garde Tailoring / Garment Design',
    detail: 'Architectural stays, boned corsetry, and subconscious draped wool silhouettes.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    route: '/work/surrealism-collection',
    layoutVariant: 'monumental-left',
    aspectRatioClass: 'aspect-[4/5] sm:aspect-[3/4]',
    containerColClass: 'col-span-12 lg:col-span-7',
    offsetMarginClass: 'lg:mr-auto',
    imageShiftClass: 'group-hover:translate-x-1 group-hover:-translate-y-1',
  },
  {
    id: 'crochet-textile-study',
    number: '02',
    title: 'Crochet Textile Study',
    category: 'Artisanal Fiber Craft / Wearable Form',
    detail: 'Tensile jute openwork and modular geometric crochet bodice architecture.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    route: '/work/crochet-textile-study',
    layoutVariant: 'satellite-right',
    aspectRatioClass: 'aspect-[3/4]',
    containerColClass: 'col-span-12 lg:col-span-5 lg:col-start-8',
    offsetMarginClass: 'lg:mt-24 lg:ml-auto',
    imageShiftClass: 'group-hover:-translate-x-1 group-hover:-translate-y-1',
  },
  {
    id: 'structural-garment-pattern-making',
    number: '03',
    title: 'Garment Construction',
    category: 'Pattern Architecture & Dart Geometry',
    detail: 'Origami tessellations, mathematical dart manipulation, and cantilevered shoulder tailoring.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=85',
    route: '/work/structural-garment-pattern-making',
    layoutVariant: 'panoramic-center',
    aspectRatioClass: 'aspect-[16/10] sm:aspect-[21/10]',
    containerColClass: 'col-span-12 lg:col-span-10 lg:col-start-2',
    offsetMarginClass: 'lg:my-8',
    imageShiftClass: 'group-hover:scale-[1.02] group-hover:-translate-y-1',
  },
  {
    id: 'knitted-velvet-draping',
    number: '04',
    title: 'Knitted Velvet Draping',
    category: 'Fluid Silhouette & Bias Draping',
    detail: 'Sensual bias-cut silk velvet combined with artisanal alpaca rib-knitting and fluid cowl cascades.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    route: '/work/knitted-velvet-draping',
    layoutVariant: 'vertical-left',
    aspectRatioClass: 'aspect-[9/14] sm:aspect-[2/3]',
    containerColClass: 'col-span-12 lg:col-span-5',
    offsetMarginClass: 'lg:mr-auto',
    imageShiftClass: 'group-hover:translate-x-1 group-hover:-translate-y-1',
  },
  {
    id: 'digital-fashion-illustration',
    number: '05',
    title: 'Digital Fashion Form',
    category: 'Vector Silhouette & CAD Exploration',
    detail: 'High-contrast silhouette rendering, avant-garde editorial gestures, and gouache CAD explorations.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    route: '/work/digital-fashion-illustration',
    layoutVariant: 'offset-right',
    aspectRatioClass: 'aspect-[4/5]',
    containerColClass: 'col-span-12 lg:col-span-6 lg:col-start-7',
    offsetMarginClass: 'lg:mt-16 lg:ml-auto',
    imageShiftClass: 'group-hover:-translate-x-1 group-hover:-translate-y-1',
  },
  {
    id: 'bengali-inspired-illustration',
    number: '06',
    title: 'Bengali Heritage Garments',
    category: 'Kantha Stitch & Cultural Narrative',
    detail: 'Heritage Bengali mythological aesthetics, Kantha stitch vectors, and traditional alpona geometric motifs.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    route: '/work/bengali-inspired-illustration',
    layoutVariant: 'asymmetric-left',
    aspectRatioClass: 'aspect-[3/4]',
    containerColClass: 'col-span-12 lg:col-span-6 lg:col-start-2',
    offsetMarginClass: 'lg:mr-auto',
    imageShiftClass: 'group-hover:translate-x-1 group-hover:-translate-y-1',
  },
  {
    id: 'textile-experimentation',
    number: '07',
    title: 'Surface Alchemy & Textile Craft',
    category: 'Experimental Material & Surface Design',
    detail: 'Textile tactile alchemy, unconventional materials, and non-Euclidean drapes.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85',
    route: '/work/textile-experimentation',
    layoutVariant: 'climax-center',
    aspectRatioClass: 'aspect-[4/5] sm:aspect-[16/11]',
    containerColClass: 'col-span-12 lg:col-span-8 lg:col-start-3',
    offsetMarginClass: 'lg:mt-12 mx-auto',
    imageShiftClass: 'group-hover:scale-[1.02] group-hover:-translate-y-1',
  },
];
