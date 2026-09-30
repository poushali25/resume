import React, { useState } from 'react';
import {
  Sparkles,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';

// Craft Research Images generated from the PDF fieldwork documentation
// Project 01: Egai (Coconut Shell Handicrafts & Pendants) — 5 Options
import coconutCraftProcessImg from '../assets/images/coconut_craft_process_1790494378261.jpg';
import coconutSawCuttingImg from '../assets/images/coconut_saw_cutting_1790495185442.jpg';
import coconutShapedBlanksImg from '../assets/images/coconut_shaped_blanks_1790495202554.jpg';
import coconutBuffingPolishImg from '../assets/images/coconut_buffing_polish_1790495217815.jpg';
import coconutPendantImg from '../assets/images/regenerated_image_1790504654414.png';

// Project 02: Eco-Printing (Botanical Printing) — 5 Options
import ecoPrintBotanicalsImg from '../assets/images/eco_print_botanicals_1790494395146.jpg';
import flowerPoundingCraftImg from '../assets/images/flower_pounding_craft_1790495249655.jpg';
import ecoPrintProcessImg from '../assets/images/eco_print_process_1790494409940.jpg';
import ecoprintSteamingPotImg from '../assets/images/ecoprint_steaming_pot_1790495233001.jpg';
import ecoPrintRevealedImg from '../assets/images/regenerated_image_1790504187827.png';

// Project 03: Block Printing at Aavaran — 5 Options
import handcarvedWoodenBlocksImg from '../assets/images/handcarved_wooden_blocks_1790495267966.jpg';
import dabuBlockPrintingImg from '../assets/images/dabu_block_printing_1790494447613.jpg';
import indigoDyeingImg from '../assets/images/indigo_dyeing_aavaran_1790494462420.jpg';
import indigoDryingCourtyardImg from '../assets/images/indigo_drying_courtyard_1790495285205.jpg';
import indigoDabuFabricImg from '../assets/images/regenerated_image_1790503738456.png';

interface ImageOption {
  src: string;
  title: string;
  caption: string;
}

const EGAI_IMAGES: ImageOption[] = [
  {
    src: coconutCraftProcessImg,
    title: '1. Hand Sanding & Shaping',
    caption: 'Artisans using rasps and fine-grit sandpaper to smooth raw coconut shell curves.',
  },
  {
    src: coconutSawCuttingImg,
    title: '2. Precision Saw Cutting',
    caption: 'Cutting circular pendant profiles and organic apertures with bench jeweler coping saw.',
  },
  {
    src: coconutShapedBlanksImg,
    title: '3. Shaped Pendant Blanks',
    caption: 'Cut coconut shell blanks arranged with hand files, prepared for drilling and edge beveling.',
  },
  {
    src: coconutBuffingPolishImg,
    title: '4. Buffing & Wax Polish',
    caption: 'Buffing shell with natural wax wheel to reveal the deep ebony grain luster.',
  },
  {
    src: coconutPendantImg,
    title: '5. Finished Talisman Pendant',
    caption: 'Completed handcrafted coconut shell pendant suspended from natural black cord.',
  },
];

const ECOPRINT_IMAGES: ImageOption[] = [
  {
    src: ecoPrintBotanicalsImg,
    title: '1. Fresh Botanicals',
    caption: 'Gathering tannin-dense eucalyptus leaves, marigolds, and rose foliage in woven baskets.',
  },
  {
    src: flowerPoundingCraftImg,
    title: '2. Floral Pounding',
    caption: 'Pounding petals directly onto damp cotton cloth to extract immediate anthocyanin dyes.',
  },
  {
    src: ecoPrintProcessImg,
    title: '3. Arranging & Bundling',
    caption: 'Composing botanical layouts and wrapping textiles tightly with cord for steam immersion.',
  },
  {
    src: ecoprintSteamingPotImg,
    title: '4. Steam Vat Extraction',
    caption: 'Steaming wrapped plant bundles in boiling vats to transfer natural pigments into fabric.',
  },
  {
    src: ecoPrintRevealedImg,
    title: '5. Revealed Leaf Imprint',
    caption: 'Unrolling the textile to reveal crisp natural leaf veins and warm botanical earthy tones.',
  },
];

const AAVARAN_IMAGES: ImageOption[] = [
  {
    src: handcarvedWoodenBlocksImg,
    title: '1. Hand-Carved Teak Blocks',
    caption: 'Intricately carved wooden block stamps used for Dabu resist, coated with dried mud.',
  },
  {
    src: dabuBlockPrintingImg,
    title: '2. Dabu Mud Stamping',
    caption: 'Master artisan applying mud-resist paste with wooden blocks onto white cotton cloth.',
  },
  {
    src: indigoDyeingImg,
    title: '3. Indigo Vat Immersion',
    caption: 'Dipping resist-printed textiles into deep fermented natural indigo dye vats outdoors.',
  },
  {
    src: indigoDryingCourtyardImg,
    title: '4. Solar Oxidation & Drying',
    caption: 'Spreading freshly dyed blue indigo textiles across open courtyard ground under the Rajasthan sun.',
  },
  {
    src: indigoDabuFabricImg,
    title: '5. Hand-Printed Dabu Textile',
    caption: 'Revealed deep indigo textile with delicate ivory motifs after the dried mud is washed away.',
  },
];

export const ExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'egai' | 'ecoprint' | 'aavaran'>('all');

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-28 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto relative z-10 text-[#1B1717]">
      {/* 
        ========================================================================
        PAGE HEADER & EDITORIAL MANIFESTO
        ========================================================================
      */}
      <header className="mb-12 sm:mb-16 border-b border-[#1B1717]/15 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#810100] font-semibold">
          <Sparkles size={12} className="text-[#810100]" />
          <span>CRAFT FIELDWORK & ARTISANAL RESEARCH</span>
        </div>
        <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl text-[#1B1717] font-light leading-[0.95]">
          EXPERIENCE
        </h1>
        <p className="text-xs sm:text-sm text-[#1B1717]/80 max-w-3xl font-light leading-relaxed pt-1">
          A comprehensive research archive documenting on-site fieldwork with master artisans across India.
          Spanning coconut-shell jewelry fabrication at Auroville Foundation, natural tannin plant extraction
          for eco-printing, and heritage Dabu mud-resist indigo block printing in Rajasthan.
        </p>

        {/* Project Section Filter Selector */}
        <nav
          aria-label="Experience Sub-Sections"
          className="flex flex-wrap items-center gap-2 pt-4"
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-semibold'
                : 'bg-white/80 border border-[#1B1717]/15 text-[#1B1717]/70 hover:text-[#810100] hover:border-[#810100]'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setActiveTab('egai')}
            className={`px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'egai'
                ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-semibold'
                : 'bg-white/80 border border-[#1B1717]/15 text-[#1B1717]/70 hover:text-[#810100] hover:border-[#810100]'
            }`}
          >
            01. Egai Handicrafts
          </button>
          <button
            onClick={() => setActiveTab('ecoprint')}
            className={`px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'ecoprint'
                ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-semibold'
                : 'bg-white/80 border border-[#1B1717]/15 text-[#1B1717]/70 hover:text-[#810100] hover:border-[#810100]'
            }`}
          >
            02. Eco-Printing
          </button>
          <button
            onClick={() => setActiveTab('aavaran')}
            className={`px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'aavaran'
                ? 'bg-[#810100] text-[#FAF5E8] shadow-sm font-semibold'
                : 'bg-white/80 border border-[#1B1717]/15 text-[#1B1717]/70 hover:text-[#810100] hover:border-[#810100]'
            }`}
          >
            03. Aavaran Block Print
          </button>
        </nav>
      </header>

      {/* 
        ========================================================================
        PROJECT 01: EGAI — CREATING ECO-FRIENDLY HANDICRAFTS
        Pages 1 & 2 of PDF
        ========================================================================
      */}
      {(activeTab === 'all' || activeTab === 'egai') && (
        <section
          id="project-egai"
          className="mb-20 sm:mb-28 scroll-mt-28 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs p-6 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(27,23,23,0.04)]"
        >
          {/* Section Sub-Header */}
          <div className="border-b border-[#1B1717]/12 pb-6 mb-8">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1B1717] font-normal">
              Egai
            </h2>
            <p className="font-serif-luxury text-xl sm:text-2xl text-[#810100] italic font-light">
              Creating Eco-friendly Handicrafts
            </p>
          </div>

          {/* Egai Story & Background */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#1B1717]/85 font-light leading-relaxed">
              <p>
                <strong className="text-[#1B1717] font-semibold">EGAI</strong>, means{' '}
                <strong className="text-[#810100] font-semibold">GIVING</strong>, takes its inspiration
                from the coconut tree whose entire being contributes to the betterment of our ecosystem.
              </p>
              <p>
                The activity was founded in 2019 by{' '}
                <strong className="text-[#1B1717] font-semibold">Anandabaskaran Veerappan</strong> under
                Auro Small Scale Activities (a unit of Artisana Trust), Auroville Foundation, to make
                craft work out of eco-friendly materials such as coconut shell, bamboo, palm, and jute.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-white border border-[#1B1717]/12 rounded-xs text-[#1B1717]/80">
                  ✦ All products are unique by design
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#1B1717]/12 rounded-xs text-[#1B1717]/80">
                  ✦ 100% Locally community-sourced materials
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#1B1717]/12 rounded-xs text-[#1B1717]/80">
                  ✦ Sustainable & biodegradable
                </span>
              </div>
            </div>

            {/* AIM Callout Box (Page 1) */}
            <div className="lg:col-span-5 bg-white/90 border border-[#810100]/25 rounded-xs p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-serif-luxury text-xs tracking-[0.25em] text-[#810100] uppercase font-semibold block mb-2">
                  OUR AIM
                </span>
                <p className="text-xs sm:text-sm text-[#1B1717]/85 font-light leading-relaxed">
                  They aim to provide sustainable livelihood for native artisans and craftsmen by preserving
                  traditional palm and coconut tree weaving techniques and encouraging the next generation to
                  pursue this art.
                </p>
              </div>
              <p className="text-xs text-[#810100] font-medium pt-4 border-t border-[#810100]/15 mt-4">
                "Spreading awareness of the harm caused by plastic so the younger generation embraces local,
                eco-friendly crafts."
              </p>
            </div>
          </div>

          {/* 
            CASE STUDY: COCONUT SHELL PENDANTS (Page 2)
          */}
          <div className="mt-12 pt-8 border-t border-[#1B1717]/15">
            <div className="mb-5">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1B1717] font-normal">
                Coconut Shell Pendants
              </h3>
              <span className="text-xs text-[#1B1717]/60 tracking-wider">
                Step-by-step artisanal guide & photographic breakdown
              </span>
            </div>

            {/* Visual Photo Showcase: 5 Full Non-Clickable Images */}
            <div className="mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 items-start">
                {EGAI_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col bg-white border border-[#1B1717]/15 rounded-xs overflow-hidden shadow-2xs select-none pointer-events-none"
                  >
                    <div className="w-full bg-[#FAF5E8]/40 overflow-hidden flex items-center justify-center">
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                    </div>
                    <div className="p-2.5 sm:p-3 bg-white border-t border-[#1B1717]/10 flex flex-col flex-1">
                      <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#810100] uppercase font-semibold mb-0.5">
                        0{idx + 1}
                      </div>
                      <h5 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1B1717] leading-tight mb-1">
                        {img.title.replace(/^\d+\.\s*/, '')}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-[#1B1717]/70 font-light leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials Checklist */}
            <div className="bg-white/80 border border-[#1B1717]/12 rounded-xs p-5 sm:p-6 mb-8">
              <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#810100] uppercase font-semibold mb-3">
                Materials Needed
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs text-[#1B1717]/85">
                {[
                  'Coconut shells',
                  'Sandpaper (Coarse to Fine)',
                  'Drill press or hand drill',
                  'Jewelry saw or coping saw',
                  'Files and rasps',
                  'Polishing cloths',
                  'Jewelry findings (jump rings, chain)',
                  'Optional: paints, stains, or sealants',
                ].map((mat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-[#810100] shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step 9-Phase Process */}
            <div>
              <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#1B1717] uppercase font-semibold mb-4">
                Step-by-Step Process (01–09)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {[
                  { step: '01', title: 'Selecting the shell', desc: 'Choose a suitable coconut shell with an interesting shape, density, or grain pattern.' },
                  { step: '02', title: 'Cleaning and drying', desc: 'Clean the coconut shell thoroughly, remove fibrous husk remnants, and let it dry completely.' },
                  { step: '03', title: 'Sanding', desc: 'Sand the shell inside and out to smooth away rough fibers and achieve a flat, uniform surface.' },
                  { step: '04', title: 'Designing', desc: 'Sketch your bespoke geometric or floral pattern directly onto the shell surface or trace a template.' },
                  { step: '05', title: 'Cutting', desc: 'Use a precision jewelry saw or coping saw to carefully cut out the pendant profile and inner contours.' },
                  { step: '06', title: 'Drilling', desc: 'Accurately drill a clean hole at the apex for the jump ring, bail, or cord suspension.' },
                  { step: '07', title: 'Shaping and refining', desc: 'Use precision needle files and rasps to refine perimeter bevels and smooth all inner cut edges.' },
                  { step: '08', title: 'Polishing', desc: 'Buff with cotton polishing cloths and natural wax to enrich the shell’s natural deep ebony-brown luster.' },
                  { step: '09', title: 'Assembling', desc: 'Attach the jump ring and threaded leather or metal chain to complete the wearable talisman.' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 bg-white/90 border border-[#1B1717]/10 rounded-xs shadow-2xs hover:border-[#810100]/40 transition-colors"
                  >
                    <span className="font-serif-luxury text-lg text-[#810100] font-semibold block mb-1">
                      {item.step}
                    </span>
                    <h5 className="font-medium text-xs text-[#1B1717] mb-1">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-[#1B1717]/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 
        ========================================================================
        PROJECT 02: ECO-PRINTING (BOTANICAL PRINTING)
        Pages 3 & 4 of PDF
        ========================================================================
      */}
      {(activeTab === 'all' || activeTab === 'ecoprint') && (
        <section
          id="project-ecoprint"
          className="mb-20 sm:mb-28 scroll-mt-28 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs p-6 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(27,23,23,0.04)]"
        >
          {/* Section Sub-Header */}
          <div className="border-b border-[#1B1717]/12 pb-6 mb-8">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1B1717] font-normal">
              Eco-Printing
            </h2>
            <p className="font-serif-luxury text-xl sm:text-2xl text-[#810100] italic font-light">
              Botanical Printing on Textiles & Paper
            </p>
          </div>

          {/* Definition and Philosophy */}
          <div className="space-y-4 text-sm sm:text-base text-[#1B1717]/85 font-light leading-relaxed mb-8 max-w-4xl">
            <p className="text-base sm:text-lg text-[#1B1717] font-normal leading-relaxed">
              Eco-printing is a process of pressing the entire dye plant against the fabric and transferring
              the color while the plant stays flat.
            </p>
            <p>
              Tannin-rich leaves, like —{' '}
              <strong className="text-[#810100] font-medium">rose, guava, eucalyptus, and oaks</strong>,
              are used to etch their distinct mark on textiles, through the color present in the leaves.
              The same technique is used to dye with flowers or kitchen waste as well.
            </p>
            <p>
              Every eco-printed piece celebrates the harmonious relationship between human creativity and the
              environment and serves as a reminder of our communication and collaboration with nature. This
              elaborate process can take up to{' '}
              <strong className="text-[#1B1717] font-semibold">2–3 days to dye one garment</strong>, and
              always results in unique, one-of-a-kind results, where no two pieces are alike, yet all
              beautiful in their own right.
            </p>
          </div>

          {/* 5 Full Non-Clickable Images for Eco-Printing */}
          <div className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 items-start">
              {ECOPRINT_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-white border border-[#1B1717]/15 rounded-xs overflow-hidden shadow-2xs select-none pointer-events-none"
                >
                  <div className="w-full bg-[#FAF5E8]/40 overflow-hidden flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border-t border-[#1B1717]/10 flex flex-col flex-1">
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#810100] uppercase font-semibold mb-0.5">
                      0{idx + 1}
                    </div>
                    <h5 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1B1717] leading-tight mb-1">
                      {img.title.replace(/^\d+\.\s*/, '')}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-[#1B1717]/70 font-light leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Types & Benefits (Page 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Types of Eco-Printing */}
            <div className="bg-white/85 border border-[#1B1717]/12 rounded-xs p-6 shadow-2xs">
              <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#810100] uppercase font-semibold mb-4 flex items-center gap-2">
                <Leaf size={16} />
                <span>Types of Eco-Printing</span>
              </h4>
              <div className="space-y-3.5 text-xs text-[#1B1717]/85">
                <div className="pb-3 border-b border-[#1B1717]/8">
                  <strong className="text-[#1B1717] font-medium block mb-0.5">
                    1. Leaf printing
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Using leaves to create prints with intricate vein patterns and silhouette margins.
                  </p>
                </div>
                <div className="pb-3 border-b border-[#1B1717]/8">
                  <strong className="text-[#1B1717] font-medium block mb-0.5">
                    2. Flower pounding
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Pounding flowers directly onto paper or fabric to create delicate, petal-like prints and vivid anthocyanin hues.
                  </p>
                </div>
                <div>
                  <strong className="text-[#1B1717] font-medium block mb-0.5">
                    3. Branch printing
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Using slender branches and bark twigs to create textured, organic linear prints.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits of Eco-Printing */}
            <div className="bg-white/85 border border-[#1B1717]/12 rounded-xs p-6 shadow-2xs">
              <h4 className="font-serif-luxury text-sm tracking-[0.2em] text-[#810100] uppercase font-semibold mb-4 flex items-center gap-2">
                <Layers size={16} />
                <span>Benefits of Eco-Printing</span>
              </h4>
              <div className="space-y-3.5 text-xs text-[#1B1717]/85">
                <div className="pb-3 border-b border-[#1B1717]/8">
                  <strong className="text-[#810100] font-medium block mb-0.5">
                    1. Sustainable
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Eco-printing uses natural, biodegradable materials with zero toxic synthetic fixatives.
                  </p>
                </div>
                <div className="pb-3 border-b border-[#1B1717]/8">
                  <strong className="text-[#810100] font-medium block mb-0.5">
                    2. Unique
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Each print is one-of-a-kind, with subtle variations governed by soil chemistry and seasonality.
                  </p>
                </div>
                <div>
                  <strong className="text-[#810100] font-medium block mb-0.5">
                    3. Creative
                  </strong>
                  <p className="text-[#1B1717]/70 font-light leading-relaxed">
                    Eco-printing encourages continuous tactile experimentation, botany curiosity, and creative expression.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 
            THE ECO-PRINTING PROCESS (Page 4)
          */}
          <div className="pt-8 border-t border-[#1B1717]/15">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1B1717] font-normal mb-2">
              The Eco-Printing Process
            </h3>
            <p className="text-xs text-[#1B1717]/70 mb-6">
              A 5-step botanical dye transformation from live foliage to permanent textile pattern
            </p>

            {/* 5 Step Description Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
              {[
                {
                  num: '01',
                  name: 'Gathering Materials',
                  body: 'Collect various plant materials, such as tannin-rich leaves, vibrant flowers, and branch cuttings.',
                },
                {
                  num: '02',
                  name: 'Preparing Substrate',
                  body: 'Choose a suitable paper or natural fabric (silk, linen, cotton) scoured and mordanted for dye absorption.',
                },
                {
                  num: '03',
                  name: 'Creating Design',
                  body: 'Arrange the plant materials in a desired compositional layout or repeat pattern directly onto the substrate.',
                },
                {
                  num: '04',
                  name: 'Steaming or Pressing',
                  body: 'Steam, boil, or compress the bundled plant materials onto the substrate to transfer natural pigments and textures.',
                },
                {
                  num: '05',
                  name: 'Revealing the Print',
                  body: 'After steaming or pressing and cooling, carefully remove the botanicals to reveal the permanent, unique print.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="p-4 bg-white/90 border border-[#1B1717]/10 rounded-xs shadow-2xs hover:border-[#810100]/40 transition-colors"
                >
                  <span className="font-serif-luxury text-lg text-[#810100] font-semibold block mb-1">
                    {step.num}
                  </span>
                  <h5 className="font-medium text-xs text-[#1B1717] mb-1">
                    {step.name}
                  </h5>
                  <p className="text-[11px] text-[#1B1717]/70 font-light leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center font-serif-luxury text-base sm:text-lg text-[#810100] italic font-light pt-4">
              "Eco-printing is a beautiful way to connect with nature and create stunning, unique prints."
            </p>
          </div>
        </section>
      )}

      {/* 
        ========================================================================
        PROJECT 03: BLOCK PRINTING AT AAVARAN
        Page 5 of PDF
        ========================================================================
      */}
      {(activeTab === 'all' || activeTab === 'aavaran') && (
        <section
          id="project-aavaran"
          className="mb-20 sm:mb-28 scroll-mt-28 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs p-6 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(27,23,23,0.04)]"
        >
          {/* Section Sub-Header */}
          <div className="border-b border-[#1B1717]/12 pb-6 mb-8">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1B1717] font-normal">
              Block printing at Avaran
            </h2>
            <p className="font-serif-luxury text-xl sm:text-2xl text-[#810100] italic font-light">
              Traditional Dabu Mud-Resist & Natural Indigo
            </p>
          </div>

          {/* Aavaran Narrative & Craft Context */}
          <div className="space-y-4 text-sm sm:text-base text-[#1B1717]/85 font-light leading-relaxed mb-8 max-w-4xl">
            <p>
              <strong className="text-[#1B1717] font-semibold">AAVARAN in Udaipur</strong> is known for
              reviving and sustaining traditional Dabu mud-resist hand block printing from Rajasthan.
              Founded by <strong className="text-[#810100] font-semibold">Alka Sharma in 2008</strong>,
              Aavaran works closely with artisan communities, particularly from the{' '}
              <strong className="text-[#1B1717] font-semibold">Akola region near Chittorgarh</strong>.
            </p>
            <p>
              The process uses hand-carved wooden blocks to apply a resist paste made primarily from{' '}
              <strong className="text-[#1B1717] font-semibold">
                mud, lime (calcium hydroxide) and natural gum
              </strong>{' '}
              onto fabric. The fabric is then dyed, often with natural indigo, and the resist is washed
              away to reveal the printed motifs. Multiple rounds of Dabu printing and dyeing can be used
              to create layered patterns and colours.
            </p>
            <p>
              Aavaran combines this traditional craft with contemporary motifs and modern garments, while
              continuing to use natural dyes and focusing on artisan livelihoods and sustainable production.
              Its signature aesthetic is strongly associated with indigo, earthy tones, and intricate
              hand-blocked motifs.
            </p>
          </div>

          {/* Process Flow Banner (Direct from PDF) */}
          <div className="bg-white/90 border border-[#810100]/25 rounded-xs p-5 sm:p-6 mb-8 shadow-xs">
            <span className="font-serif-luxury text-xs tracking-[0.25em] text-[#810100] uppercase font-semibold block mb-3">
              Process Pipeline
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-[#1B1717]">
              <span className="px-3 py-1.5 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs">
                Wooden block
              </span>
              <ArrowRight size={14} className="text-[#810100]" />
              <span className="px-3 py-1.5 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs">
                Dabu mud resist
              </span>
              <ArrowRight size={14} className="text-[#810100]" />
              <span className="px-3 py-1.5 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs">
                Natural dye / indigo
              </span>
              <ArrowRight size={14} className="text-[#810100]" />
              <span className="px-3 py-1.5 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs">
                Drying & oxidation
              </span>
              <ArrowRight size={14} className="text-[#810100]" />
              <span className="px-3 py-1.5 bg-[#FAF5E8] border border-[#1B1717]/15 rounded-xs">
                Washing
              </span>
              <ArrowRight size={14} className="text-[#810100]" />
              <span className="px-3 py-1.5 bg-[#810100] text-[#FAF5E8] rounded-xs font-semibold">
                Final hand-printed textile
              </span>
            </div>
          </div>

          {/* 5 Full Non-Clickable Images for Aavaran */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 items-start">
              {AAVARAN_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-white border border-[#1B1717]/15 rounded-xs overflow-hidden shadow-2xs select-none pointer-events-none"
                >
                  <div className="w-full bg-[#FAF5E8]/40 overflow-hidden flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border-t border-[#1B1717]/10 flex flex-col flex-1">
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#810100] uppercase font-semibold mb-0.5">
                      0{idx + 1}
                    </div>
                    <h5 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1B1717] leading-tight mb-1">
                      {img.title.replace(/^\d+\.\s*/, '')}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-[#1B1717]/70 font-light leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
