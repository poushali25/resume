export interface Floating3DProjectItem {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  imageSource: string;
  detailRoute: string;
  shortDescription: string;
  targetProjectId?: string;
  position3D: { x: number; y: number; z: number };
  imageSize: { width: number; height: number };
  depthValue: number; // Normalized depth representation for parallax and layering
  rotation3D: { x: number; y: number; z: number };
  floatSpeed: number;
  floatOffset: number;
}

export const FLOATING_3D_PROJECTS: Floating3DProjectItem[] = [
  {
    id: 'surrealism-collection',
    projectNumber: '01',
    title: 'SURREALISM',
    category: 'Avant-Garde Tailoring',
    imageSource: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/surrealism-collection',
    targetProjectId: 'surrealism-collection',
    shortDescription: 'Architectural boning and subconscious tailored drapes.',
    // Placed to the left, middle-front depth
    position3D: { x: -330, y: 70, z: 120 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.72,
    rotation3D: { x: 0.03, y: 0.06, z: -0.02 },
    floatSpeed: 0.00095,
    floatOffset: 0,
  },
  {
    id: 'crochet-textile-study',
    projectNumber: '02',
    title: 'CROCHET STUDY',
    category: 'Craft & Surface Innovation',
    imageSource: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/crochet-textile-study',
    targetProjectId: 'crochet-textile-study',
    shortDescription: 'Tensile openwork, hand-spun cord, and tactile relief.',
    // Placed upper right, medium depth
    position3D: { x: 340, y: 130, z: -70 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.65,
    rotation3D: { x: -0.03, y: -0.06, z: 0.04 },
    floatSpeed: 0.0011,
    floatOffset: 1.5,
  },
  {
    id: 'knitted-velvet-draping',
    projectNumber: '03',
    title: 'VELVET DRAPING',
    category: 'Fluid Couture & Materiality',
    imageSource: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/knitted-velvet-draping',
    targetProjectId: 'knitted-velvet-draping',
    shortDescription: 'Bias-cut gravity drape in deep wine knitted velvet.',
    // Placed bottom right, closer foreground depth
    position3D: { x: 270, y: -160, z: 170 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.95,
    rotation3D: { x: 0.05, y: -0.05, z: -0.02 },
    floatSpeed: 0.0016,
    floatOffset: 3.2,
  },
  {
    id: 'structural-garment-pattern-making',
    projectNumber: '04',
    title: 'GARMENT CONSTRUCTION',
    category: 'Deconstructed Tailoring',
    imageSource: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/structural-garment-pattern-making',
    targetProjectId: 'structural-garment-pattern-making',
    shortDescription: 'Cantilever sleeve geometries and origami tessellations.',
    // Placed bottom left, deep background
    position3D: { x: -290, y: -150, z: -140 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.45,
    rotation3D: { x: -0.02, y: 0.04, z: 0.02 },
    floatSpeed: 0.00075,
    floatOffset: 4.5,
  },
  {
    id: 'textile-experimentation',
    projectNumber: '05',
    title: 'TEXTILE INNOVATION',
    category: 'Material Innovation & Sustainability',
    imageSource: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/textile-experimentation',
    targetProjectId: 'textile-experimentation',
    shortDescription: 'Zero-waste khadi and fermented botanical indigo Kantha.',
    // Placed center top-back, floating above center title
    position3D: { x: 60, y: 230, z: -250 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.35,
    rotation3D: { x: 0.02, y: 0.02, z: -0.04 },
    floatSpeed: 0.0008,
    floatOffset: 2.1,
  },
  {
    id: 'monolithic-couture',
    projectNumber: '06',
    title: 'MONOLITHIC COUTURE',
    category: 'Architectural Silhouette',
    imageSource: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/surrealism-collection',
    targetProjectId: 'surrealism-collection',
    shortDescription: 'Volumetric column tailoring and high-contrast ivory satin.',
    // Placed upper left, deep background
    position3D: { x: -210, y: 250, z: -180 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.40,
    rotation3D: { x: -0.02, y: 0.04, z: 0.015 },
    floatSpeed: 0.0008,
    floatOffset: 3.8,
  },
  {
    id: 'tensile-charpoy-study',
    projectNumber: '07',
    title: 'TENSILE LATTICE',
    category: 'Craft & Surface Innovation',
    imageSource: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/crochet-textile-study',
    targetProjectId: 'crochet-textile-study',
    shortDescription: 'Woven cord tensile tension and interlocking warp-weft geometry.',
    // Placed far right, midground
    position3D: { x: 440, y: -40, z: -110 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.55,
    rotation3D: { x: 0.03, y: -0.07, z: -0.03 },
    floatSpeed: 0.0012,
    floatOffset: 5.1,
  },
  {
    id: 'liquid-silhouette-portrait',
    projectNumber: '08',
    title: 'LIQUID DRAPE',
    category: 'Fluid Couture',
    imageSource: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/knitted-velvet-draping',
    targetProjectId: 'knitted-velvet-draping',
    shortDescription: 'Fluid fold reflection, velvet pile and ambient light play.',
    // Placed far left, deep midground
    position3D: { x: -440, y: -40, z: -80 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.55,
    rotation3D: { x: 0.02, y: 0.03, z: 0.02 },
    floatSpeed: 0.00085,
    floatOffset: 0.9,
  },
  {
    id: 'architectural-shadows',
    projectNumber: '09',
    title: 'ARCHITECTURAL SHADOWS',
    category: 'Deconstructed Tailoring',
    imageSource: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    detailRoute: '/work/structural-garment-pattern-making',
    targetProjectId: 'structural-garment-pattern-making',
    shortDescription: 'Severe geometric angles contrasted with soft falling shadows.',
    // Placed bottom center, deep background
    position3D: { x: -40, y: -250, z: -210 },
    imageSize: { width: 230, height: 320 },
    depthValue: 0.38,
    rotation3D: { x: -0.05, y: -0.03, z: 0.02 },
    floatSpeed: 0.0009,
    floatOffset: 2.7,
  },
];
