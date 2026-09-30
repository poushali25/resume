export type PageId =
  | 'home'
  | 'work'
  | 'experience'
  | 'about'
  | 'contact'
  | 'project-detail';

export interface InspirationItem {
  url: string;
  title: string;
  description: string;
}

export interface FinalLook {
  url: string;
  title: string;
  silhouette: string;
  details: string;
  fabric: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  heroImage: string;
  thumbnail: string;
  concept: {
    headline: string;
    narrative: string;
    keywords: string[];
  };
  inspiration: {
    statement: string;
    items: InspirationItem[];
  };
  research: {
    statement: string;
    archives: string[];
    images: { url: string; caption: string }[];
  };
  development: {
    sketches: { url: string; title: string }[];
    experiments: string[];
    textileTrials: { url: string; title: string; note: string }[];
    patternMaking: string[];
  };
  construction: {
    drapingMethod: string;
    steps: { title: string; desc: string; url: string }[];
    finishingDetails: string[];
  };
  finalLooks: FinalLook[];
}

export interface ProcessStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technique: string;
  image: string;
  motifHint: string;
}

export interface SkillItem {
  name: string;
  level: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  category: 'EDUCATION' | 'DESIGN SKILLS' | 'CREATIVE PRACTICE' | 'EXPERIMENTATION';
  title: string;
  organization?: string;
  period?: string;
  summary: string;
  details: string[];
  highlights?: string[];
  image?: string;
}

export interface InterestCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName?: string;
  focusAreas: string[];
}

export interface CursorState {
  text: string;
  isHoveringProject: boolean;
  isHoveringNav: boolean;
  isHoveringInteractive: boolean;
  magneticTarget: HTMLElement | null;
}

export interface GalleryImage {
  url: string;
  title: string;
  category?: string;
  caption?: string;
}
