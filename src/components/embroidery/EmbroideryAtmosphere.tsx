import React, { useEffect, useRef } from 'react';

interface EmbroideryAtmosphereProps {
  reducedMotion?: boolean;
}

/**
 * EmbroideryAtmosphere — Warm Vintage Almond & Antique Paper Canvas
 *
 * Specifics:
 * - Primary Background: Warm Almond #E8D6BD
 * - Aged paper texture & delicate antique linen weave
 * - Vintage playing-card-inspired background details (filigree corner ornaments,
 *   fine ornamental double hairline frames, subtle card silhouettes with slow parallax,
 *   delicate drifting motifs in Coffee Bean #3B2419 and Antique Gold #A8895E)
 */
export const EmbroideryAtmosphere: React.FC<EmbroideryAtmosphereProps> = ({
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Procedural antique paper & woven textile texture tile
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 32;
    patternCanvas.height = 32;
    const pCtx = patternCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = '#FAF5E8'; // Cotton base
      pCtx.fillRect(0, 0, 32, 32);

      // Micro woven cloth weave & paper grain lines
      pCtx.strokeStyle = 'rgba(27, 23, 23, 0.022)'; // Noir Black fine weave
      pCtx.lineWidth = 0.75;

      // Warp threads
      for (let x = 4; x < 32; x += 8) {
        pCtx.beginPath();
        pCtx.moveTo(x, 0);
        pCtx.lineTo(x, 32);
        pCtx.stroke();
      }

      // Weft threads
      for (let y = 4; y < 32; y += 8) {
        pCtx.beginPath();
        pCtx.moveTo(0, y);
        pCtx.lineTo(32, y);
        pCtx.stroke();
      }

      // Fine antique paper fiber flecks in subtle Maroon & Noir Black
      pCtx.fillStyle = 'rgba(99, 0, 0, 0.02)';
      pCtx.fillRect(7, 11, 1.5, 1);
      pCtx.fillRect(23, 5, 1, 1.5);
      pCtx.fillStyle = 'rgba(27, 23, 23, 0.025)';
      pCtx.fillRect(15, 27, 2, 1);
      pCtx.fillRect(29, 21, 1, 1);
    }

    const weavePattern = ctx.createPattern(patternCanvas, 'repeat');

    // Floating micro motifs (diamonds, fleurons, cards suit flourishes)
    const floatingMotifs = [
      { x: 0.14, y: 0.28, size: 14, speed: 0.25, rotSpeed: 0.04, type: 'diamond' },
      { x: 0.86, y: 0.22, size: 16, speed: 0.22, rotSpeed: -0.03, type: 'fleuron' },
      { x: 0.22, y: 0.82, size: 12, speed: 0.3, rotSpeed: 0.05, type: 'diamond' },
      { x: 0.82, y: 0.78, size: 15, speed: 0.26, rotSpeed: -0.04, type: 'botanical' },
      { x: 0.48, y: 0.12, size: 10, speed: 0.18, rotSpeed: 0.02, type: 'spade' },
    ];

    let startTime = performance.now();

    const drawVintageCornerFiligree = (cx: number, cy: number, flipX: boolean, flipY: boolean) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

      ctx.strokeStyle = 'rgba(99, 0, 0, 0.35)'; // Maroon
      ctx.lineWidth = 0.85;

      // Outer corner L
      ctx.beginPath();
      ctx.moveTo(0, 36);
      ctx.lineTo(0, 0);
      ctx.lineTo(36, 0);
      ctx.stroke();

      // Inner corner L
      ctx.strokeStyle = 'rgba(27, 23, 23, 0.18)'; // Noir Black
      ctx.beginPath();
      ctx.moveTo(4, 30);
      ctx.lineTo(4, 4);
      ctx.lineTo(30, 4);
      ctx.stroke();

      // Mini corner rosette / diamond flourish
      ctx.fillStyle = 'rgba(129, 1, 0, 0.45)'; // Cherry Red
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(13, 7);
      ctx.lineTo(16, 10);
      ctx.lineTo(13, 13);
      ctx.closePath();
      ctx.fill();

      // Tiny engraved arc
      ctx.strokeStyle = 'rgba(99, 0, 0, 0.25)'; // Maroon accent
      ctx.beginPath();
      ctx.arc(4, 4, 16, 0, Math.PI * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    const drawEngravedMotif = (type: string, size: number) => {
      ctx.fillStyle = 'rgba(27, 23, 23, 0.14)'; // Noir Black
      ctx.strokeStyle = 'rgba(99, 0, 0, 0.28)'; // Maroon
      ctx.lineWidth = 0.75;

      if (type === 'diamond') {
        ctx.fillStyle = 'rgba(129, 1, 0, 0.16)'; // Cherry Red diamond
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.65, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.65, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (type === 'spade') {
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size * 0.8, -size * 0.2, size * 0.8, size * 0.4, 0, size * 0.7);
        ctx.bezierCurveTo(-size * 0.8, size * 0.4, -size * 0.8, -size * 0.2, 0, -size);
        ctx.fill();
        ctx.stroke();
        // stem
        ctx.beginPath();
        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(-size * 0.25, size);
        ctx.lineTo(size * 0.25, size);
        ctx.closePath();
        ctx.fill();
      } else if (type === 'fleuron') {
        // Symmetrical 4-point card fleuron
        for (let r = 0; r < 4; r++) {
          ctx.rotate(Math.PI / 2);
          ctx.beginPath();
          ctx.arc(0, -size * 0.45, size * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(99, 0, 0, 0.35)'; // Maroon center
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Botanical leaf flourish
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.5, 0, 0, size);
        ctx.quadraticCurveTo(-size * 0.5, 0, 0, -size);
        ctx.fill();
        ctx.stroke();
      }
    };

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      // 1. Transparent canvas clear so damask background shines through
      ctx.clearRect(0, 0, width, height);

      // 2. Delicate antique vignette over damask pattern
      const spotlight = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        Math.min(width, height) * 0.05,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.72
      );
      spotlight.addColorStop(0, 'rgba(250, 245, 232, 0.15)');   // Soft center radiance
      spotlight.addColorStop(0.45, 'rgba(250, 245, 232, 0.04)'); // Soft midtone
      spotlight.addColorStop(0.8, 'rgba(99, 0, 0, 0.025)');     // Subtle Maroon depth
      spotlight.addColorStop(1, 'rgba(27, 23, 23, 0.12)');      // Noir Black peripheral vignette

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      // 4. Subtle Vintage Playing-Card-Inspired Outer Frame
      const margin = width < 640 ? 14 : 26;
      ctx.save();
      // Outer hairline in Noir Black
      ctx.strokeStyle = 'rgba(27, 23, 23, 0.12)';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Inner decorative hairline with Maroon tint
      ctx.strokeStyle = 'rgba(99, 0, 0, 0.16)';
      ctx.lineWidth = 0.6;
      ctx.strokeRect(margin + 4, margin + 4, width - (margin + 4) * 2, height - (margin + 4) * 2);

      // Four corner filigrees
      drawVintageCornerFiligree(margin, margin, false, false);
      drawVintageCornerFiligree(width - margin, margin, true, false);
      drawVintageCornerFiligree(margin, height - margin, false, true);
      drawVintageCornerFiligree(width - margin, height - margin, true, true);
      ctx.restore();

      // 5. Delicate Floating Vintage Card Silhouettes with Soft Parallax
      ctx.save();
      const cardW = Math.min(width * 0.18, 160);
      const cardH = cardW * 1.5; // Vintage card aspect ratio ~2:3
      const radius = 5;

      // Card 1: Left Background Card, softly tilted with subtle float
      const c1X = width * 0.12;
      const c1Y = height * 0.38 + Math.sin(elapsed * 0.35) * 6;
      ctx.save();
      ctx.translate(c1X, c1Y);
      ctx.rotate(-0.065);
      // Soft shadow
      ctx.fillStyle = 'rgba(27, 23, 23, 0.05)';
      ctx.shadowColor = 'rgba(27, 23, 23, 0.12)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
      ctx.fill();
      // Cotton Card Face
      ctx.fillStyle = 'rgba(250, 245, 232, 0.55)';
      ctx.strokeStyle = 'rgba(27, 23, 23, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
      ctx.fill();
      ctx.stroke();
      // Inner vintage card decorative border
      ctx.strokeStyle = 'rgba(99, 0, 0, 0.16)';
      ctx.strokeRect(-cardW / 2 + 7, -cardH / 2 + 7, cardW - 14, cardH - 14);
      // Tiny card corner indices in Noir Black
      ctx.fillStyle = 'rgba(27, 23, 23, 0.35)';
      ctx.font = '8px "Monkisa", Georgia, serif';
      ctx.fillText('A', -cardW / 2 + 11, -cardH / 2 + 18);
      ctx.fillStyle = 'rgba(129, 1, 0, 0.45)'; // Cherry Red Diamond
      ctx.fillText('◆', -cardW / 2 + 11, -cardH / 2 + 27);
      ctx.restore();

      // Card 2: Right Background Card, softly counter-tilted
      const c2X = width * 0.88;
      const c2Y = height * 0.52 + Math.cos(elapsed * 0.4) * 6;
      ctx.save();
      ctx.translate(c2X, c2Y);
      ctx.rotate(0.055);
      ctx.fillStyle = 'rgba(27, 23, 23, 0.05)';
      ctx.shadowColor = 'rgba(27, 23, 23, 0.12)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
      ctx.fill();
      ctx.fillStyle = 'rgba(250, 245, 232, 0.55)';
      ctx.strokeStyle = 'rgba(27, 23, 23, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = 'rgba(99, 0, 0, 0.16)';
      ctx.strokeRect(-cardW / 2 + 7, -cardH / 2 + 7, cardW - 14, cardH - 14);
      ctx.fillStyle = 'rgba(129, 1, 0, 0.45)'; // Cherry Red King of Hearts
      ctx.font = '8px "Monkisa", Georgia, serif';
      ctx.fillText('K', -cardW / 2 + 11, -cardH / 2 + 18);
      ctx.fillText('♥', -cardW / 2 + 11, -cardH / 2 + 27);
      ctx.restore();

      // 6. Slow Subtle Floating Vintage Motifs
      floatingMotifs.forEach((m, idx) => {
        const mx = width * m.x + Math.sin(elapsed * m.speed + idx) * 12;
        const my = height * m.y + Math.cos(elapsed * m.speed * 0.8 + idx) * 8;
        const rot = elapsed * m.rotSpeed;

        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(rot);
        drawEngravedMotif(m.type, m.size);
        ctx.restore();
      });

      ctx.restore();

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none opacity-100"
    />
  );
};
