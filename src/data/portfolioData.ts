import { Project, ProcessStage, ExperienceItem, InterestCard } from '../types';
import regeneratedPortraitImg from '../assets/images/regenerated_image_1790234510266.jpg';
import surrealismCardImg from '../assets/images/regenerated_image_1790239712838.jpg';
import urbanEclipseThemeImg from '../assets/images/regenerated_image_1790514745676.png';

export const DESIGNER_INFO = {
  name: 'POUSHALI MAJI',
  title: 'FASHION DESIGNER',
  institution: 'INDUS UNIVERSITY',
  phone: '8293511982',
  tagline: 'WEARABLE ART / UNCONVENTIONAL SILHOUETTES / RUNWAY',
  bioShort:
    'A curious and experimental fashion design student driven by constant creative exploration. I thrive on working with unconventional materials and innovative silhouettes, translating emotions and ideas into wearable art.',
  bioFull:
    'A curious and experimental fashion design student driven by constant creative exploration. I thrive on working with unconventional materials and innovative silhouettes, translating emotions and ideas into wearable art. With a strong interest in runway presentation and painting, my approach to fashion is deeply artistic, thoughtful, and concept-driven, blending craftsmanship with philosophy.',
  email: 'poushalimaji.23.bdes@idea.indusuni.ac.in',
  instagram: '@poushali.maji.design',
  behance: 'behance.net/poushalimaji',
  linkedin: 'linkedin.com/in/poushali-maji',
  location: 'Indus University, Ahmedabad',
  heroPortrait: regeneratedPortraitImg,
  editorialHero: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
};

export const PROJECTS: Project[] = [
  {
    id: 'surrealism-collection',
    number: '01',
    title: 'URBAN ECLIPSE',
    category: 'Avant-Garde Tailoring',
    year: '2025',
    shortDescription:
      'Explores the contrast between raw streetwear construction and celestial handcraft.',
    thumbnail: urbanEclipseThemeImg,
    heroImage: urbanEclipseThemeImg,
    concept: {
      headline: 'The Anomaly of Dream Structures',
      narrative:
        'Inspired by surrealist spatial logic and Salvador Dali’s melting perspectives, this collection challenges conventional anatomical balance. Rigid boned stays rupture into cascading bias-cut silks, creating tension between the waking architectural world and fluid subconscious states.',
      keywords: ['Distortion', 'Anatomical Boning', 'Deep Wine Wool', 'Subconscious Form', 'Couture Tailoring'],
    },
    inspiration: {
      statement: 'Architectural shadows, Dali’s metaphysical clocks, and anatomical ribcage frameworks.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
          title: 'Architectural Shadows',
          description: 'High contrast interplay of severe geometric angles against fluid shadows.',
        },
        {
          url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
          title: 'Textural Resonance',
          description: 'Raw tactile woven wool contrasted with smooth lacquer-coated silks.',
        },
        {
          url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
          title: 'Anatomy & Silhouette',
          description: 'Distorting the spinal column into externalized cage structures.',
        },
      ],
    },
    research: {
      statement:
        'Comparative study of 1930s Elsa Schiaparelli trompe l’oeil tailoring juxtaposed with brutalist stepped arch structures.',
      archives: [
        'V&A Costume Archive — 1930s Surrealist Tailoring',
        'Traditional Indian Zardozi wire embroidery tension tests',
        'Study of ergonomic load distribution in external corsetry',
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
          caption: 'Volumetric silhouettes and shadow manipulation studies.',
        },
        {
          url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80',
          caption: 'High collar geometry and structural tension tests.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Silhouette Iteration 04: The Asymmetric Wing Collar',
        },
        {
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
          title: 'Boning Grid Vector Study & Muslin Weight Distribution',
        },
      ],
      experiments: [
        'Heat-molded buckram interlinings layered with wool felt',
        'Subtle gold thread running stitches mimicking Kantha thread paths',
        'Zero-waste dart manipulation for sculpted hourglass transitions',
      ],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Crimson Melton Wool',
          note: 'Heavyweight hand, sculpted with internal horsehair canvas.',
        },
        {
          url: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=800&q=80',
          title: 'Woven Raw Silk Duchesse',
          note: 'Dyed in pomegranate rind and lac extract for smoky wine hue.',
        },
      ],
      patternMaking: [
        'Drafted 38 unique interlocking pattern blocks on 180gsm card stock',
        'Reverse-engineered Japanese cutting techniques with Indian flat-fold motifs',
        'Graduated internal sleeve heads providing cantilevered structure',
      ],
    },
    construction: {
      drapingMethod:
        'Live stand-draping using unbleached calico, pinning grain lines across 45-degree bias axes to test stress points.',
      steps: [
        {
          title: 'Skeletal Boning Grid Assembly',
          desc: 'Internal steel and spiral wire channels inserted into double-faced cotton drill.',
          url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Hand-Padded Lapel Roll',
          desc: 'Over 400 hand pick-stitches connecting wool to wool-canvas foundation.',
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Sculptural Hem Stabilization',
          desc: 'Crinoline tape bonded with crêpe de chine for fluid edge buoyancy.',
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Hand-bound armholes in bias-cut Habotai silk',
        'Concealed double-breasted horn closures with matte gold eyelets',
        'Contrast Kantha tacking stitch at stress joints in soft gold thread',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 01: The Fractured Coat Dress',
        silhouette: 'Architectural cantilever shoulder with stepped peplum',
        details: 'Hand-sewn horn closures, exposed horsehair foundation',
        fabric: 'Midnight wine wool melton & ivory heavy satin',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 02: Draped Chimera Silhouette',
        silhouette: 'Extruded collar transitioning into asymmetric torso wrap',
        details: 'Bias-cut drape anchored by external gold wire stay',
        fabric: 'Structured raw silk and weighted crêpe',
      },
      {
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 03: The Monolithic Column',
        silhouette: 'High-waisted floor length column with hidden dart architecture',
        details: 'Deep front inverted pleat and concealed inner corset',
        fabric: 'Charcoal wool blend with soft gold satin accents',
      },
    ],
  },
  {
    id: 'crochet-textile-study',
    number: '02',
    title: 'CROCHET TEXTILE STUDY',
    category: 'Craft & Surface Innovation',
    year: '2024',
    shortDescription:
      'Artisanal Indian openwork and knotting re-engineered into tensile, sculptural corsetry and structural open-weave garments.',
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'Tensile Craft & Bodily Architecture',
      narrative:
        'Rethinking crochet from a decorative domestic handcraft into a rigid structural skin. Using heavy-gauge jute, mercerized cotton, and hand-spun mulberry silk cord, open mesh structures are locked under mechanical tension to hold sculpted anatomical curves without synthetic boning.',
      keywords: ['Tensile Openwork', 'Hand-Spun Cord', 'Ajrakh Geometry', 'Zero-Waste Craft', 'Tactile Texture'],
    },
    inspiration: {
      statement: 'Indian fishermen nets, hand-spun charpoy rope weaving, and ancient temple geometric screens.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=800&q=80',
          title: 'Charpoy Geometric Tension',
          description: 'Interlocking warp and weft cordage under high structural tension.',
        },
        {
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          title: 'Open Lattice Shadows',
          description: 'How natural sunlight casts lace shadows across anatomical curves.',
        },
      ],
    },
    research: {
      statement: 'Historical mapping of Bengal macramé and Gujarat knotted beadwork techniques.',
      archives: [
        'National Institute of Design Textile Archives',
        'Fieldwork with rural Gujarat open-mesh artisans',
        'Tensile modulus testing of indigenous botanical fibers',
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
          caption: 'Knot-density variations mapping the lumbar curve.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Grid Node System: Mapping 6mm Cord Stitches to Torso Landmarks',
        },
      ],
      experiments: [
        'Boiled starched jute dipped in natural indigo and fermented iron bath',
        'Modular crochet discs joined by solid brass rings',
        'Self-reinforcing edge stitches preventing edge curl',
      ],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Unbleached Ivory Jute Cord',
          note: 'Heavy 3-ply twisted botanical fiber with high tactile friction.',
        },
      ],
      patternMaking: [
        'Full 3D parametric knot layout calculated row-by-row to eliminate seams entirely',
        'Zero yardage waste during entire garment construction lifecycle',
      ],
    },
    construction: {
      drapingMethod:
        'Constructed directly on the mannequin from collar down, using weight-bearing pins to gauge thread elongation under gravity.',
      steps: [
        {
          title: 'Radial Collar Foundation',
          desc: 'High collar established with dense treble-crochet stitches for neck stability.',
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Ribcage Lattice Expansion',
          desc: 'Pattern expands into open diamond trellis, revealing underlayer ivory silk.',
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Hand-knotted fringe edges sealed with organic beeswax',
        'Custom cast brass toggles finished in antique gold patina',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 01: The Sculpted Trellis Bodice',
        silhouette: 'Fitted cage bodice with flared floor-length mesh skirt',
        details: 'Hand-crocheted over 120 hours using single-strand continuous cord',
        fabric: 'Indus Valley organic jute and warm beige silk cord',
      },
      {
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 02: The Openwork Mantle',
        silhouette: 'Cocoon cape with geometric open back',
        details: 'Integrated cowl collar and cascading tasseled fringe',
        fabric: 'Bleached ivory cotton and deep wine dyed raw wool',
      },
    ],
  },
  {
    id: 'structural-garment-pattern-making',
    number: '03',
    title: 'STRUCTURAL GARMENT / PATTERN MAKING',
    category: 'Deconstructed Tailoring',
    year: '2024',
    shortDescription:
      'Geometric dart manipulation and origami folding principles resulting in sculptural, cantilevered shoulder architecture.',
    thumbnail: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Geometry of Void and Volume',
      narrative:
        'An architectural examination of flat 2D planes turning into monumental 3D garments. Utilizing origami tessellation and multi-point dart rotations, this project eliminates conventional armhole side-seams, allowing the fabric to support its own weight in cantilevered overhangs.',
      keywords: ['Dart Manipulation', 'Origami Pleats', 'Zero-Waste Patterning', 'Architectural Shoulders', 'Charcoal Wool'],
    },
    inspiration: {
      statement: 'Chand Baori stepped stepwells of Rajasthan and Le Corbusier’s Chandigarh concrete brutalism.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Stepped Well Geometries',
          description: 'Rhythmic repeating triangular stairs casting rhythmic geometric shadows.',
        },
      ],
    },
    research: {
      statement: 'Detailed drafting analysis of Cristobal Balenciaga’s 1950s barrel jackets and Tomoko Nakamichi’s Pattern Magic.',
      archives: ['Indus University Pattern Making Research Lab', 'Textile Origami Structural Fold Library'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
          caption: 'Paper mockup folded from a single continuous trapezoidal sheet.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Cantilever Sleeve Drafting: Angular rotation across chest apex',
        },
      ],
      experiments: [
        'Steam-setting multi-layered wool canvas at 180 degrees',
        'Internal hidden carbon fiber struts for gravity-defying collar projection',
      ],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          title: 'Charcoal Compact Wool Crepe',
          note: 'Dense weave, holds knife-edge ironed creases permanently.',
        },
      ],
      patternMaking: [
        'Single-piece kimono-hybrid sleeve block with inverted underarm gusset',
        'Precision grain alignment along 90-degree tessellation vertices',
      ],
    },
    construction: {
      drapingMethod:
        'Cardboard prototype transfer directly onto double-faced wool, basted with high-contrast basting thread for step verification.',
      steps: [
        {
          title: 'Crease Scoring & Interfacing',
          desc: 'High-density fusible haircloth applied along scored fold lines.',
          url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Laser-cut concealed magnetic front closures',
        'French seams with silk organza binding',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 01: The Origami Stepped Blazer',
        silhouette: 'Geometric winged shoulders with angular peplum',
        details: 'Single continuous seam drafting with razor-sharp folds',
        fabric: 'Charcoal virgin wool, ivory silk lining',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 02: Cantilever Column Trench',
        silhouette: 'Extended box silhouette with origami back storm flap',
        details: 'Integrated kimono sleeve and architectural notch lapel',
        fabric: 'Heavy water-resistant gabardine with soft gold topstitching',
      },
    ],
  },
  {
    id: 'knitted-velvet-draping',
    number: '04',
    title: 'KNITTED VELVET DRAPING',
    category: 'Fluid Couture & Materiality',
    year: '2023',
    shortDescription:
      'Fluid gravity-defying bias cut velvet drapes combined with ribbed hand-knit structures in deep wine and warm beige.',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Sensual Gravity of Heavy Folds',
      narrative:
        'A study in tactile weight. By merging the sheer pile density of silk-viscose velvet with hand-gauge alpaca rib knitting, the garment moves like liquid metal around the clavicle and ribcage, creating an arresting juxtaposition of soft warmth and regal darkness.',
      keywords: ['Bias Cut Draping', 'Silk Velvet', 'Ribbed Knit Hybrid', 'Deep Wine Red', 'Fluid Sculpting'],
    },
    inspiration: {
      statement: 'Ancient Grecian statuary drapery and traditional Indian bridal Odhni draping rhythms.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          title: 'The Liquid Fold',
          description: 'Velvet pile capturing and refracting low ambient light.',
        },
      ],
    },
    research: {
      statement: 'Exploring Madame Grès pleating systems combined with contemporary Indian handloom velvet weaves.',
      archives: ['Indus University Material Research Archives'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
          caption: 'Draping test investigating velvet nap direction and light absorption.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Spiral Drape Diagram: Continuous 360-degree wrap around spine',
        },
      ],
      experiments: ['Weighted hem inserts using miniature lead beads for steady pendular movement'],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Wine Red Silk-Rayon Velvet',
          note: 'Luxurious deep pile with warm burgundy undertones.',
        },
      ],
      patternMaking: ['Bias grain trueing over 72 hours hanging time prior to hem leveling'],
    },
    construction: {
      drapingMethod:
        'Direct intuitive draping on the model, manipulating tension at the shoulder anchor to dictate the cascade depth.',
      steps: [
        {
          title: 'Shoulder Knit Yoke Coupling',
          desc: 'Hand-linking knitted ribbed collar with bias-cut velvet bodice.',
          url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Rolled baby hems hand-sewn with silk filament',
        'Invisible stay tapes along armholes preventing bias stretching',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 01: The Liquid Velvet Cascade',
        silhouette: 'Floor-sweeping asymmetric bias gown with high ribbed neck',
        details: 'Deep cowled back with contrasting ivory silk crepe lining',
        fabric: 'Deep Wine Red silk velvet, cashmere rib knit',
      },
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 02: Draped Cocoon Wrap',
        silhouette: 'Voluminous enveloping drape anchored at waist with gold sash',
        details: 'Integrated hood that collapses into a shawl collar',
        fabric: 'Warm beige double-faced knit and crushed velvet',
      },
    ],
  },
  {
    id: 'textile-experimentation',
    number: '05',
    title: 'TEXTILE EXPERIMENTATION',
    category: 'Material Innovation & Sustainability',
    year: '2023',
    shortDescription:
      'Deconstructed indigenous hand-stitching, botanical fermentation dyes, and zero-waste sustainable pattern cutting.',
    thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Tactile Memory of Sustainable Fibers',
      narrative:
        'An investigation into zero-waste pattern drafting and organic indigo fermentation. Combining Bengal Kantha hand-stitching with Gujarat Ajrakh geometric proportions to celebrate surface irregularities as tactile ornamentation.',
      keywords: ['Sustainable Design', 'Zero-Waste Patterning', 'Natural Indigo', 'Kantha Lineage', 'Tactile Texture'],
    },
    inspiration: {
      statement: 'Rural Bengal textile layers, aged kantha quilts, and sacred architectural geometry.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
          title: 'Hand-Stitched Stratigraphy',
          description: 'Multi-ply textile layering bound together with running stitches.',
        },
      ],
    },
    research: {
      statement: 'Material lifecycle assessment and organic dye fixation using fermented pomegranate rinds.',
      archives: ['Indus University Sustainability & Craft Lab', 'Bengal Artisan Cooperative Documentation'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
          caption: 'Hand-stitched micro-pleating and natural indigo dip gradations.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Zero-Waste Layout: Jigsaw interlocking pattern panels',
        },
      ],
      experiments: ['Fermented iron-tannin bath for deep charcoals on unbleached organic cotton'],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Organic Handspun Khadi Cotton',
          note: 'Handspun and handwoven with natural slubs and breathable porosity.',
        },
      ],
      patternMaking: ['Rectilinear pattern layout achieving 100% fabric utilization without trimmings'],
    },
    construction: {
      drapingMethod:
        'Geometric rectangular panels pleated and tied directly on the dress form to generate fluid volumetric sleeves.',
      steps: [
        {
          title: 'Kantha Grid Stabilization',
          desc: 'Layering three plies of khadi and quilting with continuous thread runs.',
          url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Self-fabric cord ties and handmade fabric button closures',
        'Raw selvedge hems preserved without overlock stitching',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 01: The Zero-Waste Quilted Tunic',
        silhouette: 'Architectural box silhouette with wide origami dolman sleeves',
        details: 'Dense all-over kantha topstitching and hand-frayed hem fringe',
        fabric: 'Organic khadi cotton, natural indigo and madder root dyes',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        title: 'Look 02: Draped Geometric Wrap Dress',
        silhouette: 'Asymmetric spiral drape anchored by woven cord belt',
        details: 'Contrast soft gold basting stitches and raw selvedge neckline',
        fabric: 'Warm beige handloom silk-cotton blend',
      },
    ],
  },
  {
    id: 'digital-fashion-illustration',
    number: '06',
    title: 'DIGITAL FASHION ILLUSTRATION',
    category: 'Digital Atelier & Visual CAD',
    year: '2025',
    shortDescription:
      'High-contrast digital figure rendering, avant-garde silhouette CAD treatments, and dramatic light simulations.',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Virtual Gesture & Kinetic Silhouette',
      narrative:
        'Bridging artisanal hand-drawn sensitivity with precision digital vector drafting. Exploring how lighting gradients, liquid metallic reflections, and simulated textile weights can communicate the physical emotion of couture before pattern blocks are cut.',
      keywords: ['Digital Silhouette', 'CAD Prototyping', 'Light Shading', 'Vector Anatomy', 'Editorial Rendering'],
    },
    inspiration: {
      statement: '1970s Antonio Lopez fashion gestures merged with futuristic cybernetic haute couture.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
          title: 'Dynamic Silhouette Vectors',
          description: 'Sharp focal points juxtaposed with loose wash textures.',
        },
      ],
    },
    research: {
      statement: 'Comparative analysis of historical watercolor croquis vs multi-layered digital brush engines.',
      archives: ['Indus University Digital Fashion Studio Archives'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
          caption: 'Digital line weight studies isolating dramatic garment creases.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Gesture Study 01: The Volumetric Wing Collar in Crimson Gouache',
        },
      ],
      experiments: ['Procedural metallic grain overlays simulating gold wire embroidery'],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Simulated Wine Velvet Shading',
          note: 'Digital brush map capturing low light absorption and specular edge glow.',
        },
      ],
      patternMaking: ['Mapping 2D vector flat technical drawings to 3D rendered poses'],
    },
    construction: {
      drapingMethod: 'Digital tablet stand sculpting using parametric pressure-sensitive stylus strokes.',
      steps: [
        {
          title: 'Underdrawing Anatomical Framework',
          desc: 'High-speed skeletal gesture lines defining exaggerated elongation.',
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Multi-layer color grade in Blood Red (#800815) and Vanilla (#F7F2E7)',
        'Custom grain texture application giving vintage woodcut printing character',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        title: 'Illustration 01: The Avant-Garde Muse',
        silhouette: 'Exaggerated pagoda shoulder with cascading lacquer coat',
        details: 'Deep crimson wash with gold leaf specular accents',
        fabric: 'Simulated high-gloss patent leather & raw wool',
      },
    ],
  },
  {
    id: 'bengali-inspired-illustration',
    number: '07',
    title: 'BENGALI-INSPIRED DIGITAL ILLUSTRATION',
    category: 'Cultural Lineage & Mythology',
    year: '2024',
    shortDescription:
      'Reinterpreting classical Bengal folk narratives, Kalighat pats, and Kantha motifs into contemporary editorial compositions.',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Sacred Line of Bengal Heritage',
      narrative:
        'Drawing from the sweeping brushwork of 19th-century Kalighat artists and the sacred geometry of Bengal floor Alpona art. The illustrations honor feminine divine archetypes reimagined in modern tailored power suits and sweeping draped saris.',
      keywords: ['Kalighat Lineage', 'Alpona Geometry', 'Bengal Folk Art', 'Crimson Sindoor Hues', 'Contemporary Muse'],
    },
    inspiration: {
      statement: 'Bengal rural scroll paintings, Kumartuli idol sculptors, and Rabindranath Tagore ink silhouettes.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
          title: 'The Sacred Eye & Tilak',
          description: 'Fluid calligraphic strokes framing almond eyes and temple motifs.',
        },
      ],
    },
    research: {
      statement: 'Anthropological archiving of indigenous natural pigments used in Bengal scroll paintings.',
      archives: ['Gurusaday Museum Bengal Folk Art Archives'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
          caption: 'Study of organic cinnabar and lampblack pigment textures.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'Alpona Mandala Geometry & Drapery Lines',
        },
      ],
      experiments: ['Simulating textured handmade rice paper parchment grain'],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=800&q=80',
          title: 'Sindoor Crimson & Ivory Contrast',
          note: 'High-contrast palette capturing temple altar energy.',
        },
      ],
      patternMaking: ['Translating Jamdani geometric motifs into digital screen layers'],
    },
    construction: {
      drapingMethod: 'Continuous rhythmic brush strokes capturing traditional 9-yard drape flow.',
      steps: [
        {
          title: 'Folk Contour Ink Drafting',
          desc: 'Thick, bold variable line weight evoking hand-drawn reed pens.',
          url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Antique parchment aging filter with soft deckled card borders',
        'Intricate floral lotus mandala stamps embedded in background atmosphere',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        title: 'Plate 01: Shakti Reimagined',
        silhouette: 'Architectural tailored trench infused with draped Bengal pallu',
        details: 'Hand-rendered lotus embroidery overlays',
        fabric: 'Blood Red (#800815), Vanilla Silk, Dark Green accents',
      },
    ],
  },
  {
    id: 'conceptual-illustration',
    number: '08',
    title: 'EXPERIMENTAL & CONCEPTUAL ILLUSTRATION',
    category: 'Metaphysical Fashion & Speculative Silhouettes',
    year: '2024',
    shortDescription:
      'Speculative body extensions, non-Euclidean dream architectures, and surrealist metaphysical fashion narratives.',
    thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    heroImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90',
    concept: {
      headline: 'The Body as an Impossible Architecture',
      narrative:
        'An experimental exploration questioning where garment ends and architectural void begins. Exploring Dali-esque levitation, floating fabric portals, and anatomical exoskeletons rendered in deep charcoal, wine crimson, and celestial gold.',
      keywords: ['Metaphysical Silhouette', 'Surrealist Eye', 'Exoskeleton', 'Speculative Haute Couture', 'Spatial Void'],
    },
    inspiration: {
      statement: 'Giorgio de Chirico metaphysical arcades and M.C. Escher impossible stairways.',
      items: [
        {
          url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
          title: 'The Arcane Shadow',
          description: 'Long casting desolate shadows stretching across architectural plains.',
        },
      ],
    },
    research: {
      statement: 'Study of early 20th-century Dadaist photomontage and surrealist fashion manifestos.',
      archives: ['Indus University Experimental Concept Lab'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80',
          caption: 'Geometric bone armature diagrams and void balance sketches.',
        },
      ],
    },
    development: {
      sketches: [
        {
          url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
          title: 'The Eye Portal: Floating Void Gown',
        },
      ],
      experiments: ['Negative-space stencil cutouts over hand-dyed crimson paper'],
      textileTrials: [
        {
          url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
          title: 'Layered Charcoal & Wine Glazes',
          note: 'Atmospheric depth created with multiple semi-transparent washes.',
        },
      ],
      patternMaking: ['Non-Euclidean continuous spiral pattern blocks'],
    },
    construction: {
      drapingMethod: 'Parametric digital distortion projecting garments into architectural voids.',
      steps: [
        {
          title: 'Spatial Grid Layout',
          desc: 'Three-point perspective guidelines converging at the human collarbone.',
          url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
        },
      ],
      finishingDetails: [
        'Fine woodcut line-engraving texture evoking vintage playing cards',
        'Refined Dark Green (#1B3B2B) and Blood Red (#800815) accents',
      ],
    },
    finalLooks: [
      {
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
        title: 'Composition 01: The Celestial Armature',
        silhouette: 'Cantilevered architectural wings framing a floating column gown',
        details: 'Intricate engraved linocut textures and surrealist eye medallion',
        fabric: 'Charcoal wool, wine red raw silk, soft gold leaf',
      },
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'stage-1',
    number: '01',
    title: 'RESEARCH',
    subtitle: 'Archival & Material Anthropology',
    description:
      'Immersing in indigenous Indian craft repositories, studying regional weaver colonies, Kantha stitch structures, and architectural sacred geometry to uncover narrative catalysts.',
    technique: 'Anthropological field documentation & micro-textile tensile analysis',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'kantha-lines',
  },
  {
    id: 'stage-2',
    number: '02',
    title: 'CONCEPT',
    subtitle: 'Narrative & Silhouette Philosophy',
    description:
      'Distilling raw research into a rigorous conceptual spine. Defining the emotional tension between masculine architectural tailoring and feminine fluid drape.',
    technique: 'Keyword synthesis, silhouette manifesto & structural mapping',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'lotus-mandala',
  },
  {
    id: 'stage-3',
    number: '03',
    title: 'MOODBOARD',
    subtitle: 'Atmosphere & Tactile Palette',
    description:
      'Curating a sensory universe: pairing high-contrast shadow photography, raw plant-dyed textile swatches, rusted iron patinas, and architectural brutalism.',
    technique: 'Multi-textural collage & chromatic balance in Deep Wine, Ivory, and Gold',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'ajrakh-geometry',
  },
  {
    id: 'stage-4',
    number: '04',
    title: 'SKETCH',
    subtitle: 'Dynamic Gesture & Form Ideation',
    description:
      'Translating mental volumes into rapid ink, gouache, and digital illustrations. Focusing on extreme proportion, negative space, and gravity vectors.',
    technique: 'High-speed charcoal silhouette drafting & anatomical distortion',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'stitch-ribbon',
  },
  {
    id: 'stage-5',
    number: '05',
    title: 'PATTERN',
    subtitle: 'Mathematical Geometry & Dart Systems',
    description:
      'Engineering flat card patterns from 3D drape prototypes. Employing origami fold principles, zero-waste cutting grids, and cantilevered shoulder blocks.',
    technique: 'Flat drafting, rotational dart manipulation & zero-waste nesting',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'origami-structure',
  },
  {
    id: 'stage-6',
    number: '06',
    title: 'DRAPING',
    subtitle: 'Muslin On The Stand',
    description:
      'Pinning unbleached calico directly onto the dress form. Observing how weave bias shifts, hangs, and responds to human kinetics under natural gravity.',
    technique: 'Stand-draping on live body forms & directional grain tensioning',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'fluid-wave',
  },
  {
    id: 'stage-7',
    number: '07',
    title: 'CONSTRUCTION',
    subtitle: 'Couture Craft & Internal Architecture',
    description:
      'Building the garment from the inside out: tailored horsehair chest canvas, hand-stitched boning channels, Hong Kong seam finishes, and artisan surface work.',
    technique: 'Hand pick-stitching, pad-stitching lapels & structural interlinings',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'lattice-weave',
  },
  {
    id: 'stage-8',
    number: '08',
    title: 'FINAL GARMENT',
    subtitle: 'Editorial Lookbook & Runway Living Form',
    description:
      'The culmination of form, material, and concept. Garments documented through high-fashion editorial lighting, capturing dynamic motion and cinematic elegance.',
    technique: 'Editorial styling, lighting choreography & runway presentation',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
    motifHint: 'gold-bloom',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-edu',
    category: 'EDUCATION',
    title: 'Bachelor of Design in Fashion Design',
    organization: 'Indus University, Ahmedabad',
    period: '2021 — 2025',
    summary:
      'Comprehensive study of structural garment construction, pattern drafting, Indian textile crafts, couture draping, and contemporary sustainable design.',
    details: [
      'Specialized in Advanced Menswear & Womenswear Tailoring with emphasis on structural silhouette innovation.',
      'Conducted field research in Gujarat and West Bengal artisanal clusters studying Kantha and Ajrakh resist dyeing.',
      'Recipient of Department Merit for Architectural Pattern Making and Material Experimentation Studio.',
      'Graduation Collection selected for Indus University Annual Runway showcase.',
    ],
    highlights: ['GPA: Distinction Honors', 'Best Pattern Making Studio 2024', 'Craft Documentation Fellowship'],
  },
  {
    id: 'exp-skills',
    category: 'DESIGN SKILLS',
    title: 'Core Technical & Creative Competencies',
    organization: 'Professional Toolkit',
    period: 'Continuous Practice',
    summary:
      'A rigorous combination of artisanal hands-on craftsmanship, mathematical pattern drafting, and modern digital visualization.',
    details: [
      'Pattern Making & Draping: Master flat pattern drafting, rotational dart manipulation, origami folding, zero-waste cutting, and bias stand-draping.',
      'Garment Construction: Full bespoke canvas tailoring, boned stays and corsetry, leather finishing, French seams, and hand-stitched finishing.',
      'Textile & Surface Design: Handloom weaving knowledge, Kantha surface embroidery, crochet cord structural construction, natural dye extraction (Madder, Lac, Indigo).',
      'Fashion Illustration & CAD: Rapid figure sketching, gouache silhouette rendering, Adobe Illustrator technical flats, Photoshop editorial treatment, CLO 3D virtual prototyping basics.',
      'Design Research & Creative Direction: Archival material anthropology, visual moodboard curation, concept manifesto drafting, and editorial styling.',
    ],
    highlights: ['Bespoke Tailoring', 'CLO 3D & Digital Flats', 'Kantha Embroidery', 'Zero-Waste Patterning'],
  },
  {
    id: 'exp-practice',
    category: 'CREATIVE PRACTICE',
    title: 'Editorial Capsules & Collaborative Studios',
    organization: 'Selected Projects',
    period: '2023 — Present',
    summary:
      'Creating runway capsules, couture client commissions, and cross-disciplinary collaborations blending architecture and garments.',
    details: [
      'Surrealist Capsule Collection (2025): Developed 6-look conceptual collection focusing on bone-supported external tailoring and deep wine wool.',
      'Tensile Crochet Exploration (2024): Constructed modular open-mesh corsetry utilizing 100% natural jute cords under tensile tension.',
      'Indus University Fashion Showcase (2024): Backstage lead coordinator and featured designer for academic runway presentation.',
      'Sustainable Dye Lab: Formulated organic dye recipes utilizing temple flower waste, pomegranate rind, and lac extract for heritage silk coloration.',
    ],
    highlights: ['4 Major Collections', 'Featured Runway 2024', 'Artisanal Guild Collaborator'],
  },
  {
    id: 'exp-experiment',
    category: 'EXPERIMENTATION',
    title: 'Material, Structural & Digital Explorations',
    organization: 'Independent Lab',
    period: '2022 — Present',
    summary:
      'Investigating alternative fabrication methods, bio-mordanting, structural origami pleats, and tactile memory.',
    details: [
      'Origami Fold Garments: Engineered cantilevered shoulder jackets formed from mathematically tessellated single-sheet pattern blocks.',
      'Tensile Knot Studies: Evaluated elongation and load-bearing capacities of various indigenous vegetable fibers.',
      'Smoked Velvet & Fire Glazing: Developed surface texturing method inspired by smoke diffusion and antique patina.',
      'Digital 3D Motif Architecture: Translating Kantha running stitches and sacred Ajrakh stars into procedural 3D wireframe geometries.',
    ],
    highlights: ['Paper-to-Cloth Tessellation', 'Natural Bio-Mordants', 'Procedural 3D Motif Systems'],
  },
];

export const ABOUT_INTERESTS: InterestCard[] = [
  {
    id: 'fashion',
    title: 'Fashion',
    subtitle: 'Couture & Structural Silhouette',
    description:
      'I view fashion not as transient surface decoration, but as monumental, wearable architecture. The human body is a dynamic scaffold; clothes are the spatial chambers we construct around it to project identity, power, and vulnerability.',
    focusAreas: ['Avant-Garde Tailoring', 'Sartorial Anatomy', 'Kinetic Silhouettes'],
  },
  {
    id: 'textile',
    title: 'Textile',
    subtitle: 'Indian Lineage & Living Weft',
    description:
      'India holds thousands of years of woven memory. My work investigates how heritage textiles—from Bengal Kantha hand-running stitches to Gujarati Ajrakh block alignments—can be translated into contemporary, razor-sharp global garments.',
    focusAreas: ['Heritage Handloom', 'Kantha Stitch Systems', 'Raw Organic Fibers'],
  },
  {
    id: 'illustration',
    title: 'Illustration',
    subtitle: 'Gesture, Shadow & Intent',
    description:
      'Illustration is the first breath of a garment. I work with dramatic ink washes, charcoal sweeps, and high-contrast gouache to capture the velocity, mood, and architectural gravity of a collection before shears touch cloth.',
    focusAreas: ['Dynamic Ink Gesture', 'Proportion Distortion', 'Editorial Mood Rendering'],
  },
  {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Sartorial Rigor & Interior Craft',
    description:
      'True luxury exists on the inside of a jacket. I am obsessed with internal engineering: horsehair canvas chest pieces, hand-padded lapels, bound seam allowances, and boned stays that support effortless outer drape.',
    focusAreas: ['Bespoke Internal Canvassing', 'Hong Kong Finishes', 'Structural Boning'],
  },
  {
    id: 'draping',
    title: 'Draping',
    subtitle: 'Intuition on the Dress Stand',
    description:
      'Draping is a physical dialogue with gravity. By manipulating cloth on the bias and observing its natural drape tension, silhouettes emerge organically that could never have been calculated on a flat cutting table.',
    focusAreas: ['Bias Cut Flow', 'Stand Sculpting', 'Fluid Asymmetry'],
  },
  {
    id: 'research',
    title: 'Research',
    subtitle: 'Material Anthropology',
    description:
      'Every collection begins with rigorous archival inquiry. I dissect museum costume collections, regional weaving guild practices, and architectural principles to establish an authentic theoretical foundation for every silhouette.',
    focusAreas: ['Costume History', 'Fieldwork with Artisans', 'Sociology of Dress'],
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    subtitle: 'Zero-Waste & Regenerative Craft',
    description:
      'Sustainability is not an afterthought; it is a design parameter. By adopting zero-waste geometric cutting patterns, biodegradable non-toxic natural dye baths, and supporting rural artisan cooperatives, fashion becomes regenerative.',
    focusAreas: ['Zero-Waste Geometry', 'Botanical Dye Baths', 'Fair Artisan Guilds'],
  },
];
