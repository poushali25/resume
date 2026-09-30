import React, { useEffect, useRef } from 'react';

interface FashionArtifact3DProps {
  progressTime: number; // in seconds since page mount
  isExpandingForWork?: boolean;
  reducedMotion?: boolean;
}

/**
 * FashionArtifact3D — Minimal, experimental fashion artifact combining:
 * 1. An artisan couture needle in polished steel & soft gold with an ethereal silk thread loop.
 *    (Direct homage to the pacing and rhythm of the reference fashion film title sequence).
 * 2. An architectural fashion pattern & silhouette wireframe:
 *    - Structural Western corset / pagoda shoulder drafting lines
 *    - Indian geometric textile drafting grid (Jamdani/Alpona subtle nodes)
 *    - Delicate tailor basting / dash-stitch lines in Dark Green (#1B3B2B) and Blood Red (#800815)
 * 3. Hypnotic 3D rotation, subtle forward/backward drift, soft depth, and cursor parallax.
 * 4. Cinematic expansion on transition to the Work page.
 */
export const FashionArtifact3D: React.FC<FashionArtifact3DProps> = ({
  progressTime,
  isExpandingForWork = false,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();
    let expansionScale = 1.0;
    let expansionAlpha = 1.0;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.04;
      m.currentY += (m.targetY - m.currentY) * 0.04;

      const centerX = width * 0.5 + m.currentX * 18;
      const centerY = height * 0.5 + m.currentY * 12;

      // Handle Work transition expansion
      if (isExpandingForWork) {
        expansionScale += 0.035;
        expansionAlpha = Math.max(0, expansionAlpha - 0.02);
      }

      ctx.save();
      ctx.globalAlpha = expansionAlpha;
      ctx.translate(centerX, centerY);
      ctx.scale(expansionScale, expansionScale);

      // -------------------------------------------------------------
      // 1. TIMELINE OF THE SEWING NEEDLE (Fashion Film Intro)
      // 0.0s: invisible
      // 0.5s - 1.5s: enters from top (y: -300 to center)
      // 1.5s - 4.8s: moves across center stitching letterforms
      // 4.8s - 6.0s: glides up and out of frame into darkness
      // -------------------------------------------------------------
      if (elapsed >= 0.4 && elapsed <= 7.0 && !reducedMotion) {
        let needleY = -280;
        let needleAlpha = 0;
        let needleStrokeX = 0;

        if (elapsed < 1.4) {
          // Descending into center
          const t = Math.min(1, Math.max(0, (elapsed - 0.4) / 1.0));
          // Cubic ease-out
          const ease = 1 - Math.pow(1 - t, 3);
          needleY = -280 + ease * 250;
          needleAlpha = ease * 0.95;
        } else if (elapsed <= 4.8) {
          // Subtle horizontal tailoring sweep across the typography baseline
          const t = (elapsed - 1.4) / 3.4;
          needleY = -30 + Math.sin(t * Math.PI * 4) * 14;
          needleStrokeX = -180 + t * 360;
          needleAlpha = 0.95;
        } else if (elapsed > 4.8) {
          // Gliding up and away into the high dark space
          const t = Math.min(1, (elapsed - 4.8) / 1.2);
          const ease = t * t;
          needleY = -30 - ease * 320;
          needleStrokeX = 180 + t * 60;
          needleAlpha = Math.max(0, 0.95 * (1 - t));
        }

        if (needleAlpha > 0.01) {
          ctx.save();
          ctx.translate(needleStrokeX, needleY);

          // Ethereal glowing aura around needle point
          const needleGlow = ctx.createRadialGradient(0, 100, 0, 0, 100, 40);
          needleGlow.addColorStop(0, `rgba(250, 245, 232, ${needleAlpha * 0.45})`);
          needleGlow.addColorStop(0.3, `rgba(129, 1, 0, ${needleAlpha * 0.25})`);
          needleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = needleGlow;
          ctx.beginPath();
          ctx.arc(0, 100, 40, 0, Math.PI * 2);
          ctx.fill();

          // Couture Tailor's Needle Shaft (Polished Steel & Popcorn Glint)
          const needleGrad = ctx.createLinearGradient(-2, -120, 2, 110);
          needleGrad.addColorStop(0, `rgba(180, 175, 170, ${needleAlpha * 0.4})`);
          needleGrad.addColorStop(0.4, `rgba(250, 245, 232, ${needleAlpha * 0.95})`);
          needleGrad.addColorStop(0.7, `rgba(129, 1, 0, ${needleAlpha * 0.85})`);
          needleGrad.addColorStop(0.95, `rgba(27, 23, 23, ${needleAlpha * 0.7})`);
          needleGrad.addColorStop(1, `rgba(250, 245, 232, ${needleAlpha})`);

          // Draw the needle body
          ctx.beginPath();
          ctx.moveTo(-1.8, -120);
          ctx.lineTo(1.8, -120);
          ctx.lineTo(1.5, 80);
          ctx.lineTo(0, 110); // Needle point
          ctx.lineTo(-1.5, 80);
          ctx.closePath();
          ctx.fillStyle = needleGrad;
          ctx.fill();

          // Needle Eyelet slit near top (Chocolate Plum)
          ctx.fillStyle = '#1B1717';
          ctx.beginPath();
          ctx.ellipse(0, -90, 0.8, 6, 0, 0, Math.PI * 2);
          ctx.fill();

          // Silk Thread loop in Cerulean (#810100) emerging from the eyelet
          const threadAlpha = needleAlpha * 0.85;
          ctx.strokeStyle = `rgba(129, 1, 0, ${threadAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(0, -90);
          // Flowing bezier curve looping through the eyelet like the reference video
          const sway = Math.sin(elapsed * 3) * 12;
          ctx.bezierCurveTo(
            22 + sway,
            -75,
            34 + sway * 1.5,
            -40,
            12,
            0
          );
          ctx.bezierCurveTo(
            -8,
            35,
            18 + sway,
            70,
            0,
            110
          );
          ctx.stroke();

          ctx.restore();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isExpandingForWork, reducedMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
