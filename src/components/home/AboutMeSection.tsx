import React from 'react';
import { PageId } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Globe,
  Compass,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import regeneratedPortraitImg from '../../assets/images/regenerated_image_1790234510266.jpg';

interface AboutMeSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ onNavigate }) => {
  const hardSkills = [
    'Illustrator',
    'Photoshop',
    'Clo3d',
    'Draping',
    'Fashion illustration',
    'Pattern making',
    'Textile development',
    'Natural dyeing & printing',
    'Surface ornamentation',
  ];

  const softSkills = [
    'Adaptability',
    'Creative problem solving',
    'Collaboration',
    'Building genuine relationship',
    'Empathy',
    'Self-Motivation',
    'Organizational skill',
    'Cross cultural communication',
    'Open mindness',
  ];

  const hobbies = ['Travelling', 'Painting', 'Yoga', 'Athletics', 'Exploring'];

  const languages = [
    { name: 'Bengali', level: 'Native', percentage: 95 },
    { name: 'Hindi', level: 'Fluent', percentage: 90 },
    { name: 'English', level: 'Working / Professional', percentage: 85 },
  ];

  return (
    <section
      id="about"
      aria-label="About Poushali Maji"
      className="relative z-20 w-full min-h-screen px-6 sm:px-12 md:px-16 pt-16 pb-32 max-w-7xl mx-auto text-[#1B1717]"
    >
      {/* Editorial Section Header */}
      <div className="mb-14 border-b border-[#1B1717]/15 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#1B1717] font-light leading-none">
            ABOUT POUSHALI
          </h2>
          <p className="font-serif-luxury text-xl sm:text-2xl text-[#810100] italic mt-2">
            Fashion Designer
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#1B1717]/60 font-mono">
            CURRICULUM VITAE // ATELIER ARCHIVE
          </span>
        </div>
      </div>

      {/* WHO I AM: Preserved Portrait Image + Comprehensive CV Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Large Editorial Portrait Frame (Kept Exactly As It Is) */}
        <div className="lg:col-span-5 flex justify-center sticky top-28">
          <div className="relative w-full max-w-md aspect-[3/4] bg-[#FAF5E8] rounded-xs overflow-hidden border border-[#1B1717]/20 shadow-[0_16px_40px_rgba(27,23,23,0.08)] group">
            {/* Vintage card corner ticks */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#630000] z-10 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#630000] z-10 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#630000] z-10 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#630000] z-10 pointer-events-none" />

            <img
              src={regeneratedPortraitImg}
              alt="Poushali Maji Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-grain opacity-25 mix-blend-overlay pointer-events-none" />

            {/* Editorial Plaque */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B1717]/95 via-[#1B1717]/80 to-transparent p-6 text-[#FAF5E8]">
              <p className="font-serif-luxury text-2xl text-[#FAF5E8] font-normal">
                Poushali Maji
              </p>
            </div>
          </div>
        </div>

        {/* Narrative & CV Header Information */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#810100] font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#810100]" />
              <span>PROFILE & PHILOSOPHY</span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1B1717] font-light leading-tight">
              Poushali Maji
            </h3>
            <p className="font-serif-luxury text-xl sm:text-2xl text-[#810100] italic mt-1 font-normal">
              Fashion Designer
            </p>
          </div>

          {/* Contact Badges from CV */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#FAF5E8]/80 border border-[#1B1717]/15 rounded-xs">
            <div className="flex items-center space-x-2 text-xs text-[#1B1717]">
              <Phone size={14} className="text-[#810100] shrink-0" />
              <a
                href="tel:8293511982"
                className="hover:text-[#810100] transition-colors font-mono text-[11px]"
              >
                8293511982
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#1B1717] sm:col-span-2">
              <Mail size={14} className="text-[#810100] shrink-0" />
              <a
                href="mailto:poushalimaji.23.bdes@idea.indusuni.ac.in"
                className="hover:text-[#810100] transition-colors font-mono text-[11px] truncate"
              >
                poushalimaji.23.bdes@idea.indusuni.ac.in
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#1B1717] sm:col-span-3 pt-2 border-t border-[#1B1717]/10">
              <MapPin size={14} className="text-[#810100] shrink-0" />
              <span className="font-light">Indus University, Ahmedabad</span>
            </div>
          </div>

          {/* Full Bio Paragraph as in CV */}
          <div className="space-y-4 text-base sm:text-lg text-[#1B1717]/90 font-light leading-relaxed border-l-2 border-[#810100] pl-6 py-1">
            <p>
              A curious and experimental fashion design student driven by constant creative
              exploration. I thrive on working with unconventional materials and innovative
              silhouettes, translating emotions and ideas into wearable art. With a strong interest
              in runway presentation and painting, my approach to fashion is deeply artistic,
              thoughtful, and concept-driven, blending craftsmanship with philosophy.
            </p>
          </div>

          {/* Key Accolades Quick Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1B1717]/15">
            <div className="p-4 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#810100] font-semibold block mb-1">
                B.DES CGPA
              </span>
              <p className="font-serif-luxury text-2xl text-[#1B1717] font-semibold">9.61</p>
              <p className="text-[11px] text-[#1B1717]/70 font-light mt-0.5">Indus Design School</p>
            </div>
            <div className="p-4 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#810100] font-semibold block mb-1">
                MINOR SUSTAINABLE
              </span>
              <p className="font-serif-luxury text-2xl text-[#1B1717] font-semibold">9 Grade</p>
              <p className="text-[11px] text-[#1B1717]/70 font-light mt-0.5">Sustainable Studies</p>
            </div>
            <div className="p-4 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs col-span-2 sm:col-span-1">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#810100] font-semibold block mb-1">
                CBSE 10+2
              </span>
              <p className="font-serif-luxury text-2xl text-[#1B1717] font-semibold">86%</p>
              <p className="text-[11px] text-[#1B1717]/70 font-light mt-0.5">KV Chittaranjan</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: EDUCATION & WORKSHOPS (Matching CV Structure) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-[#1B1717]/15 mb-20">
        {/* EDUCATION COLUMN (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#810100] font-semibold">
            <GraduationCap size={15} className="text-[#810100]" />
            <span>EDUCATION</span>
          </div>

          <div className="space-y-6">
            {/* Indus Design School */}
            <div className="p-6 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors relative group">
              <span className="text-[10px] tracking-widest font-mono text-[#630000] uppercase font-bold block mb-1">
                2023 — PRESENT
              </span>
              <h4 className="font-serif-luxury text-2xl text-[#1B1717]">
                Indus Design School
              </h4>
              <p className="text-xs text-[#1B1717]/70 font-light mt-0.5">
                Indus University, Ahmedabad
              </p>
              <div className="mt-4 pt-4 border-t border-[#1B1717]/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1B1717]/80">Fashion designing (B.Des)</span>
                  <span className="font-bold text-[#810100] font-mono">CGPA 9.61</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1B1717]/80">MINOR Sustainable Studies</span>
                  <span className="font-bold text-[#810100] font-mono">9 Grade</span>
                </div>
              </div>
            </div>

            {/* Kendriya Vidyalaya */}
            <div className="p-6 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors group">
              <span className="text-[10px] tracking-widest font-mono text-[#630000] uppercase font-bold block mb-1">
                2020 — 2022
              </span>
              <h4 className="font-serif-luxury text-2xl text-[#1B1717]">
                Kendriya Vidyalaya Chittaranjan
              </h4>
              <p className="text-xs text-[#1B1717]/70 font-light mt-0.5">CBSE Board</p>
              <div className="mt-4 pt-4 border-t border-[#1B1717]/10 flex items-center justify-between text-xs">
                <span className="text-[#1B1717]/80">10 + 2 Examination</span>
                <span className="font-bold text-[#810100] font-mono">86%</span>
              </div>
            </div>
          </div>
        </div>

        {/* WORKSHOPS & COLLABORATIVE INITIATIVES (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#810100] font-semibold">
            <Award size={15} className="text-[#810100]" />
            <span>WORKSHOPS & COLLABORATIVE INITIATIVES</span>
          </div>

          <div className="space-y-4">
            {/* 1. PIDILITE WORKSHOP - 2024 */}
            <div className="p-5 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-serif-luxury text-xl text-[#1B1717]">
                  Pidilite Workshop
                </h4>
                <span className="text-[10px] tracking-widest font-mono text-[#810100] uppercase font-bold">
                  2024
                </span>
              </div>
              <p className="text-xs text-[#630000] font-semibold uppercase tracking-wider mb-2">
                In collab with Pidilite, Fevicryl
              </p>
              <p className="text-xs text-[#1B1717]/75 font-light">
                Explored specialized medium integration, surface texturing, and contemporary craft manipulation using industry-grade Fevicryl polymer formulations.
              </p>
            </div>

            {/* 2. CYANOTYPE PRINTING - 2024 */}
            <div className="p-5 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-serif-luxury text-xl text-[#1B1717]">
                  Cyanotype Printing — Guinness World Record Attempt
                </h4>
                <span className="text-[10px] tracking-widest font-mono text-[#810100] uppercase font-bold">
                  2024
                </span>
              </div>
              <p className="text-xs text-[#630000] font-semibold uppercase tracking-wider mb-2">
                Under Indus Design School
              </p>
              <ul className="space-y-1.5 text-xs text-[#1B1717]/80 font-light">
                <li className="flex items-start space-x-2">
                  <span className="text-[#810100] font-bold mt-0.5">•</span>
                  <span>Attempt to break Guinness world record under Indus Design School.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#810100] font-bold mt-0.5">•</span>
                  <span>Printing continuous 300 m stretch of solar-reactive cyanotype textile fabric.</span>
                </li>
              </ul>
            </div>

            {/* 3. RELATED STUDY PROGRAMME WORKSHOPS - 2025 */}
            <div className="p-5 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-serif-luxury text-xl text-[#1B1717]">
                  Related Study Programme Workshops
                </h4>
                <span className="text-[10px] tracking-widest font-mono text-[#810100] uppercase font-bold">
                  2025
                </span>
              </div>
              <p className="text-xs text-[#630000] font-semibold uppercase tracking-wider mb-3">
                In collab with Auroville, Tamil Nadu Units
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF5E8] border border-[#1B1717]/10 rounded-xs">
                  <span className="text-[9.5px] font-bold text-[#810100] uppercase block mb-1">
                    Egai Craft
                  </span>
                  <p className="text-[11.5px] text-[#1B1717]/80 font-light leading-snug">
                    Upcycled coconut shell waste into wearable jewellery.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF5E8] border border-[#1B1717]/10 rounded-xs">
                  <span className="text-[9.5px] font-bold text-[#810100] uppercase block mb-1">
                    WellPaper
                  </span>
                  <p className="text-[11.5px] text-[#1B1717]/80 font-light leading-snug">
                    Upcycled waste newspaper into hand woven structural baskets.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF5E8] border border-[#1B1717]/10 rounded-xs">
                  <span className="text-[9.5px] font-bold text-[#810100] uppercase block mb-1">
                    Yakshi Studio
                  </span>
                  <p className="text-[11.5px] text-[#1B1717]/80 font-light leading-snug">
                    Eco-printing & traditional Kolam painting — Egai Craft.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. CLAY POTTERY WORKSHOP - 2025 */}
            <div className="p-5 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-serif-luxury text-xl text-[#1B1717]">
                  Clay Pottery Workshop
                </h4>
                <span className="text-[10px] tracking-widest font-mono text-[#810100] uppercase font-bold">
                  2025
                </span>
              </div>
              <p className="text-xs text-[#630000] font-semibold uppercase tracking-wider mb-2">
                In collab with Mitti Mates, Junagadh
              </p>
              <ul className="space-y-1 text-xs text-[#1B1717]/80 font-light">
                <li className="flex items-start space-x-2">
                  <span className="text-[#810100] font-bold mt-0.5">•</span>
                  <span>Developed more than 10 handcrafted earthenware ceramic products.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#810100] font-bold mt-0.5">•</span>
                  <span>Learnt handling new material, wheel mechanics, and firing shrinkage control.</span>
                </li>
              </ul>
            </div>

            {/* 5. GENERATIVE AI MASTERMIND - 2026 */}
            <div className="p-5 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs hover:border-[#810100] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-serif-luxury text-xl text-[#1B1717]">
                  Generative AI Mastermind
                </h4>
                <span className="text-[10px] tracking-widest font-mono text-[#810100] uppercase font-bold">
                  2026
                </span>
              </div>
              <p className="text-xs text-[#630000] font-semibold uppercase tracking-wider mb-2">
                In collab with Vaibhav Sisinty, Founder of Outskill
              </p>
              <p className="text-xs text-[#1B1717]/80 font-light">
                2 days intensive Advanced Generative AI masterclass on creative ideation workflows, prompt architecture, and rapid visual asset synthesis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SKILLS MATRIX (HARD SKILLS & SOFT SKILLS) */}
      <div className="pt-16 border-t border-[#1B1717]/15 mb-20">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#810100] font-semibold">
            <Layers size={15} className="text-[#810100]" />
            <span>SKILLS & EXPERTISE</span>
          </div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#1B1717] font-light mt-2">
            Technical Rigor & Creative Intuition
          </h3>
          <p className="text-xs sm:text-sm text-[#1B1717]/75 font-light mt-1">
            Proficiencies transferred directly from studio coursework, runway preparation, and hands-on atelier collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* HARD SKILLS */}
          <div className="p-8 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B1717]/15">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#810100]">
                HARD SKILLS // TECHNICAL
              </span>
              <span className="text-[10px] font-mono text-[#1B1717]/50">09 DISCIPLINES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hardSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center space-x-2.5 p-2.5 bg-[#FAF5E8] border border-[#1B1717]/10 rounded-xs hover:border-[#810100] transition-colors"
                >
                  <CheckCircle2 size={13} className="text-[#810100] shrink-0" />
                  <span className="text-xs text-[#1B1717] font-normal">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div className="p-8 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B1717]/15">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#810100]">
                SOFT SKILLS // METHODOLOGY
              </span>
              <span className="text-[10px] font-mono text-[#1B1717]/50">09 QUALITIES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center space-x-2.5 p-2.5 bg-[#FAF5E8] border border-[#1B1717]/10 rounded-xs hover:border-[#810100] transition-colors"
                >
                  <Sparkles size={13} className="text-[#810100] shrink-0" />
                  <span className="text-xs text-[#1B1717] font-normal">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: HOBBIES & LANGUAGES */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-16 border-t border-[#1B1717]/15 mb-20">
        {/* HOBBIES (6 Cols) */}
        <div className="md:col-span-6 p-8 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B1717]/15">
            <div className="flex items-center space-x-2 text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#810100]">
              <Compass size={14} className="text-[#810100]" />
              <span>HOBBIES & CREATIVE PURSUITS</span>
            </div>
            <span className="text-[10px] font-mono text-[#1B1717]/50">05 INTERESTS</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-4 py-2 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-full text-xs font-normal text-[#1B1717] hover:border-[#810100] hover:text-[#810100] transition-colors"
              >
                {hobby}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#1B1717]/70 font-light leading-relaxed pt-2">
            Personal routines that feed directly into atelier research, kinetic silhouette observation, and physical discipline.
          </p>
        </div>

        {/* LANGUAGES (6 Cols) with CV-Style Proficiency Bars */}
        <div className="md:col-span-6 p-8 bg-[#FAF5E8]/90 border border-[#1B1717]/15 rounded-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B1717]/15">
            <div className="flex items-center space-x-2 text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#810100]">
              <Globe size={14} className="text-[#810100]" />
              <span>LANGUAGES</span>
            </div>
            <span className="text-[10px] font-mono text-[#1B1717]/50">TRILINGUAL</span>
          </div>

          <div className="space-y-4 pt-2">
            {languages.map((lang) => (
              <div key={lang.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-serif-luxury text-base text-[#1B1717]">{lang.name}</span>
                  <span className="text-[10.5px] font-mono text-[#630000] uppercase font-semibold">
                    {lang.level}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#1B1717]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#810100] to-[#810100] rounded-full transition-all duration-1000"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer for the About Page */}
      <div className="pt-16 border-t border-[#1B1717]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-serif-luxury text-2xl text-[#1B1717]">
            POUSHALI MAJI ATELIER
          </p>
          <p className="text-xs text-[#1B1717]/70 font-light mt-1">
            Fashion Design & Textile Architecture · Indus University, Ahmedabad
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('work')}
            className="group px-6 py-3 border border-[#810100] bg-[#810100] hover:bg-[#630000] text-[#FAF5E8] text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center space-x-2 rounded-xs cursor-pointer shadow-sm"
          >
            <span>View All Collections</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 border border-[#1B1717]/20 hover:border-[#1B1717] bg-transparent text-[#1B1717] hover:text-[#810100] text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-xs cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
};
