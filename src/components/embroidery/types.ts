export interface EmbroideryConfig {
  text: string;
  threadColor: string;      // Primary ivory (#F6F2EC)
  threadHighlight: string;  // Warm beige (#D8CBBE)
  threadShadow: string;     // Deep wine red (#5B1E2D)
  fabricColor: string;      // Charcoal (#292624)
  totalDuration: number;    // Animation duration in seconds (~8.5s)
  needleLength: number;
}

export interface StitchPoint {
  x: number;
  y: number;
  progress: number; // 0 to 1 along overall sequence
  letterIndex: number;
  isPuncture?: boolean;
}

export interface LetterStrokeDef {
  letter: string;
  letterIndex: number;
  points: Array<[number, number]>; // normalized coords within letter box
}
