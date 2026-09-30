import { StitchPoint } from './types';

interface RawStroke {
  letterIndex: number;
  letter: string;
  points: Array<[number, number]>;
}

// Letter definitions with normalized coordinates [0..1]
// High-fashion serif typography inspired by luxury atelier embroidery
const RAW_STROKES: RawStroke[] = [
  // P (Index 0)
  {
    letterIndex: 0,
    letter: 'P',
    points: [
      // Vertical stem from top to bottom
      [0.22, 0.12],
      [0.22, 0.32],
      [0.22, 0.52],
      [0.22, 0.72],
      [0.22, 0.90],
      // Bottom serif
      [0.12, 0.90],
      [0.34, 0.90],
      // Upper bowl
      [0.22, 0.14],
      [0.45, 0.12],
      [0.68, 0.16],
      [0.82, 0.28],
      [0.80, 0.44],
      [0.65, 0.53],
      [0.22, 0.53],
    ],
  },
  // O (Index 1)
  {
    letterIndex: 1,
    letter: 'O',
    points: [
      [0.50, 0.12],
      [0.32, 0.15],
      [0.18, 0.28],
      [0.14, 0.50],
      [0.18, 0.72],
      [0.32, 0.86],
      [0.50, 0.90],
      [0.68, 0.86],
      [0.82, 0.72],
      [0.86, 0.50],
      [0.82, 0.28],
      [0.68, 0.15],
      [0.50, 0.12],
    ],
  },
  // U (Index 2)
  {
    letterIndex: 2,
    letter: 'U',
    points: [
      // Left serif
      [0.12, 0.12],
      [0.28, 0.12],
      // Down left stem
      [0.22, 0.12],
      [0.22, 0.45],
      [0.22, 0.65],
      // Bottom curve
      [0.26, 0.80],
      [0.38, 0.88],
      [0.50, 0.90],
      [0.62, 0.88],
      [0.74, 0.80],
      // Up right stem
      [0.78, 0.65],
      [0.78, 0.45],
      [0.78, 0.12],
      // Right serif
      [0.68, 0.12],
      [0.88, 0.12],
    ],
  },
  // S (Index 3)
  {
    letterIndex: 3,
    letter: 'S',
    points: [
      [0.78, 0.22],
      [0.65, 0.13],
      [0.48, 0.12],
      [0.30, 0.18],
      [0.22, 0.30],
      [0.32, 0.44],
      [0.50, 0.51],
      [0.70, 0.60],
      [0.80, 0.72],
      [0.74, 0.86],
      [0.52, 0.90],
      [0.32, 0.88],
      [0.20, 0.78],
    ],
  },
  // H (Index 4)
  {
    letterIndex: 4,
    letter: 'H',
    points: [
      // Left vertical stem
      [0.22, 0.12],
      [0.22, 0.51],
      [0.22, 0.90],
      // Left base & top serifs
      [0.12, 0.12],
      [0.32, 0.12],
      [0.12, 0.90],
      [0.32, 0.90],
      // Crossbar
      [0.22, 0.51],
      [0.50, 0.51],
      [0.78, 0.51],
      // Right vertical stem
      [0.78, 0.12],
      [0.78, 0.51],
      [0.78, 0.90],
      // Right base & top serifs
      [0.68, 0.12],
      [0.88, 0.12],
      [0.68, 0.90],
      [0.88, 0.90],
    ],
  },
  // A (Index 5)
  {
    letterIndex: 5,
    letter: 'A',
    points: [
      // Left diagonal stem from apex to bottom left
      [0.50, 0.12],
      [0.40, 0.38],
      [0.30, 0.64],
      [0.18, 0.90],
      // Left foot serif
      [0.08, 0.90],
      [0.28, 0.90],
      // Crossbar
      [0.31, 0.63],
      [0.50, 0.63],
      [0.69, 0.63],
      // Right diagonal to bottom right
      [0.50, 0.12],
      [0.60, 0.38],
      [0.70, 0.64],
      [0.82, 0.90],
      // Right foot serif
      [0.72, 0.90],
      [0.92, 0.90],
    ],
  },
  // L (Index 6)
  {
    letterIndex: 6,
    letter: 'L',
    points: [
      // Top serif
      [0.12, 0.12],
      [0.34, 0.12],
      // Vertical stem
      [0.24, 0.12],
      [0.24, 0.38],
      [0.24, 0.64],
      [0.24, 0.90],
      // Horizontal base
      [0.40, 0.90],
      [0.60, 0.90],
      [0.82, 0.90],
      // Upward terminal flourish
      [0.82, 0.82],
    ],
  },
  // I (Index 7)
  {
    letterIndex: 7,
    letter: 'I',
    points: [
      // Top serif
      [0.28, 0.12],
      [0.50, 0.12],
      [0.72, 0.12],
      // Vertical center stem
      [0.50, 0.12],
      [0.50, 0.38],
      [0.50, 0.64],
      [0.50, 0.90],
      // Bottom serif
      [0.28, 0.90],
      [0.50, 0.90],
      [0.72, 0.90],
    ],
  },
  // M (Index 8)
  {
    letterIndex: 8,
    letter: 'M',
    points: [
      // Left foot serif
      [0.08, 0.90],
      [0.24, 0.90],
      // Left vertical stem upwards
      [0.16, 0.90],
      [0.16, 0.50],
      [0.16, 0.12],
      // Left diagonal down to vertex
      [0.32, 0.44],
      [0.50, 0.78],
      // Right diagonal up to right apex
      [0.68, 0.44],
      [0.84, 0.12],
      // Right vertical stem downwards
      [0.84, 0.50],
      [0.84, 0.90],
      // Right foot serif
      [0.76, 0.90],
      [0.92, 0.90],
    ],
  },
  // A (Index 9)
  {
    letterIndex: 9,
    letter: 'A',
    points: [
      // Left diagonal stem from apex to bottom left
      [0.50, 0.12],
      [0.40, 0.38],
      [0.30, 0.64],
      [0.18, 0.90],
      // Left foot serif
      [0.08, 0.90],
      [0.28, 0.90],
      // Crossbar
      [0.31, 0.63],
      [0.50, 0.63],
      [0.69, 0.63],
      // Right diagonal to bottom right
      [0.50, 0.12],
      [0.60, 0.38],
      [0.70, 0.64],
      [0.82, 0.90],
      // Right foot serif
      [0.72, 0.90],
      [0.92, 0.90],
    ],
  },
  // J (Index 10)
  {
    letterIndex: 10,
    letter: 'J',
    points: [
      // Top horizontal serif / crossbar
      [0.35, 0.12],
      [0.55, 0.12],
      [0.80, 0.12],
      // Down vertical stem on right
      [0.70, 0.12],
      [0.70, 0.40],
      [0.70, 0.66],
      // Curve around bottom to the left
      [0.65, 0.82],
      [0.52, 0.89],
      [0.36, 0.90],
      [0.22, 0.82],
      [0.18, 0.68],
    ],
  },
  // I (Index 11)
  {
    letterIndex: 11,
    letter: 'I',
    points: [
      // Top serif
      [0.28, 0.12],
      [0.50, 0.12],
      [0.72, 0.12],
      // Vertical center stem
      [0.50, 0.12],
      [0.50, 0.38],
      [0.50, 0.64],
      [0.50, 0.90],
      // Bottom serif
      [0.28, 0.90],
      [0.50, 0.90],
      [0.72, 0.90],
    ],
  },
];

/**
 * Catmull-Rom spline interpolation between 2D points for ultra-smooth stitching paths
 */
function interpolatePoints(pts: Array<[number, number]>, samplesPerSegment: number = 8): Array<[number, number]> {
  if (pts.length < 2) return pts;
  const result: Array<[number, number]> = [];

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;

      // Catmull-Rom formula
      const x =
        0.5 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

      const y =
        0.5 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

      result.push([x, y]);
    }
  }
  result.push(pts[pts.length - 1]);
  return result;
}

export interface LetterBox {
  x: number;
  y: number;
  width: number;
  height: number;
  char: string;
  wordIndex: number;
}

/**
 * Computes world-space stitch coordinates for "POUSHALI MAJI" across the screen
 */
export function generateLetterStitchPoints(
  containerWidth: number,
  containerHeight: number
): {
  stitchPoints: StitchPoint[];
  letterBoxes: LetterBox[];
  needleStart: { x: number; y: number };
  needleRest: { x: number; y: number; angle: number };
} {
  const word1 = ['P', 'O', 'U', 'S', 'H', 'A', 'L', 'I'];
  const word2 = ['M', 'A', 'J', 'I'];
  const totalLetters = word1.length + word2.length; // 12 letters

  // Responsive sizing
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  // Compute total banner width to fit comfortably with generous luxury margins
  const maxBannerWidth = Math.min(containerWidth * (isMobile ? 0.94 : 0.88), 1260);

  // Word gap relative to letter width
  const wordGapRatio = isMobile ? 0.65 : 0.85;
  const letterSpacingRatio = isMobile ? 0.12 : 0.16;

  // Total width units = letters + inner spacings + word gap
  const totalUnits =
    word1.length +
    (word1.length - 1) * letterSpacingRatio +
    wordGapRatio +
    word2.length +
    (word2.length - 1) * letterSpacingRatio;

  const letterWidth = maxBannerWidth / totalUnits;
  const letterHeight = letterWidth * 1.32; // Regal vertical fashion serif proportions

  const startX = (containerWidth - maxBannerWidth) / 2;
  const centerY = containerHeight * (isMobile ? 0.48 : 0.50);
  const startY = centerY - letterHeight * 0.5;

  const letterBoxes: LetterBox[] = [];
  const rawLetterPaths: Array<{ letterIndex: number; points: Array<[number, number]> }> = [];

  let currentX = startX;
  let globalIndex = 0;

  // Layout Word 1: POUSHALI
  for (let i = 0; i < word1.length; i++) {
    const box = {
      x: currentX,
      y: startY,
      width: letterWidth,
      height: letterHeight,
      char: word1[i],
      wordIndex: 0,
    };
    letterBoxes.push(box);

    const rawStroke = RAW_STROKES[globalIndex];
    if (rawStroke) {
      const smoothPoints = interpolatePoints(rawStroke.points, isMobile ? 6 : 8);
      const worldPoints: Array<[number, number]> = smoothPoints.map(([nx, ny]) => [
        box.x + nx * box.width,
        box.y + ny * box.height,
      ]);
      rawLetterPaths.push({ letterIndex: globalIndex, points: worldPoints });
    }

    currentX += letterWidth * (1 + letterSpacingRatio);
    globalIndex++;
  }

  // Add word gap between POUSHALI and MAJI
  currentX += letterWidth * (wordGapRatio - letterSpacingRatio);

  // Layout Word 2: MAJI
  for (let j = 0; j < word2.length; j++) {
    const box = {
      x: currentX,
      y: startY,
      width: letterWidth,
      height: letterHeight,
      char: word2[j],
      wordIndex: 1,
    };
    letterBoxes.push(box);

    const rawStroke = RAW_STROKES[globalIndex];
    if (rawStroke) {
      const smoothPoints = interpolatePoints(rawStroke.points, isMobile ? 6 : 8);
      const worldPoints: Array<[number, number]> = smoothPoints.map(([nx, ny]) => [
        box.x + nx * box.width,
        box.y + ny * box.height,
      ]);
      rawLetterPaths.push({ letterIndex: globalIndex, points: worldPoints });
    }

    currentX += letterWidth * (1 + letterSpacingRatio);
    globalIndex++;
  }

  // Flatten and assign overall normalized sequence progress
  const totalRawPoints = rawLetterPaths.reduce((sum, lp) => sum + lp.points.length, 0);
  const stitchPoints: StitchPoint[] = [];

  let pointCounter = 0;
  for (const lp of rawLetterPaths) {
    for (let pIdx = 0; pIdx < lp.points.length; pIdx++) {
      const [wx, wy] = lp.points[pIdx];
      const progress = pointCounter / Math.max(totalRawPoints - 1, 1);
      stitchPoints.push({
        x: wx,
        y: wy,
        progress,
        letterIndex: lp.letterIndex,
        isPuncture: pIdx % 3 === 0,
      });
      pointCounter++;
    }
  }

  // Needle entry point from directly above the first letter 'P'
  const firstPoint = stitchPoints[0];
  // Resting needle position: pierced in fabric above the 'A' / 'L' in POUSHALI or between words,
  // matching the uploaded reference image ChatGPT Image Sep 21, 2026, 10_48_58 PM.png!
  // In the image, the needle is angled down into the fabric right above the central letters!
  const needleRestX = startX + maxBannerWidth * 0.53;
  const needleRestY = startY + letterHeight * 0.08;

  const needleStart = {
    x: firstPoint ? firstPoint.x : containerWidth * 0.5,
    y: -260,
  };

  const needleRest = {
    x: needleRestX,
    y: needleRestY,
    angle: -11, // ~11 degrees gentle slant as seen in user reference image
  };

  return { stitchPoints, letterBoxes, needleStart, needleRest };
}

export interface CardBorderStitch {
  x: number;
  y: number;
  edge: 'top' | 'right' | 'bottom' | 'left';
  progress: number; // 0 to 1
  isPuncture: boolean;
}

/**
 * Generates hand-stitched border points around the perimeter of the antique playing card
 */
export function generateCardBorderStitches(
  cardX: number,
  cardY: number,
  cardW: number,
  cardH: number,
  inset: number = 24,
  stitchLength: number = 14
): CardBorderStitch[] {
  const stitches: CardBorderStitch[] = [];
  const x0 = cardX + inset;
  const y0 = cardY + inset;
  const x1 = cardX + cardW - inset;
  const y1 = cardY + cardH - inset;
  const w = x1 - x0;
  const h = y1 - y0;

  const topCount = Math.max(Math.round(w / stitchLength), 6);
  const rightCount = Math.max(Math.round(h / stitchLength), 6);
  const bottomCount = Math.max(Math.round(w / stitchLength), 6);
  const leftCount = Math.max(Math.round(h / stitchLength), 6);
  const total = topCount + rightCount + bottomCount + leftCount;

  let counter = 0;
  // Top: left to right
  for (let i = 0; i <= topCount; i++) {
    const t = i / topCount;
    stitches.push({
      x: x0 + t * w,
      y: y0,
      edge: 'top',
      progress: counter / total,
      isPuncture: i % 2 === 0,
    });
    counter++;
  }
  // Right: top to bottom
  for (let i = 1; i <= rightCount; i++) {
    const t = i / rightCount;
    stitches.push({
      x: x1,
      y: y0 + t * h,
      edge: 'right',
      progress: counter / total,
      isPuncture: i % 2 === 0,
    });
    counter++;
  }
  // Bottom: right to left
  for (let i = 1; i <= bottomCount; i++) {
    const t = i / bottomCount;
    stitches.push({
      x: x1 - t * w,
      y: y1,
      edge: 'bottom',
      progress: counter / total,
      isPuncture: i % 2 === 0,
    });
    counter++;
  }
  // Left: bottom to top
  for (let i = 1; i < leftCount; i++) {
    const t = i / leftCount;
    stitches.push({
      x: x0,
      y: y1 - t * h,
      edge: 'left',
      progress: counter / total,
      isPuncture: i % 2 === 0,
    });
    counter++;
  }

  return stitches;
}
