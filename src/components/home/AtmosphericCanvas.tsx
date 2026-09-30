import React, { useEffect, useRef } from 'react';

interface AtmosphericCanvasProps {
  reducedMotion?: boolean;
}

/**
 * AtmosphericCanvas — Very faint, slow atmospheric movement for the landing page.
 *
 * Characteristics:
 * - Base background: Cotton (#FAF5E8)
 * - Extremely faint Cherry Red (#810100), Maroon (#630000), and Noir Black (#1B1717) atmospheric plumes
 * - Slow hypnotic movement
 * - Film grain overlay with very low opacity
 * - Strictly avoids bright gradients, starfields, gaming effects, or excessive particles.
 */
export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
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

    // Subtle atmospheric mist puffs
    const plumeCount = reducedMotion ? 3 : 6;
    const plumes = Array.from({ length: plumeCount }, (_, i) => ({
      x: (width * (i + 0.5)) / plumeCount + (Math.random() - 0.5) * 200,
      y: height * 0.5 + (Math.random() - 0.5) * 300,
      radius: Math.min(width, height) * (0.35 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      baseAlpha: 0.03 + Math.random() * 0.025, // Very faint
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.004,
      isRed: i % 2 === 0,
    }));

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.666, 2);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Rich Popcorn base wash (#FAF5E8)
      ctx.fillStyle = '#FAF5E8';
      ctx.fillRect(0, 0, width, height);

      // Central warm ambient presence (Popcorn radiance with subtle Chocolate Plum tone)
      const centerGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.6
      );
      centerGrad.addColorStop(0, 'rgba(250, 245, 232, 0.45)');
      centerGrad.addColorStop(0.5, 'rgba(27, 23, 23, 0.035)');
      centerGrad.addColorStop(1, 'rgba(27, 23, 23, 0.04)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      if (!reducedMotion) {
        // Draw soft ambient plumes
        for (const p of plumes) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.phase += p.phaseSpeed * dt;

          // Boundary wrapping
          if (p.x < -p.radius) p.x = width + p.radius;
          if (p.x > width + p.radius) p.x = -p.radius;
          if (p.y < -p.radius) p.y = height + p.radius;
          if (p.y > height + p.radius) p.y = -p.radius;

          const currentAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(p.phase));
          const colorStop = p.isRed
            ? `rgba(129, 1, 0, ${currentAlpha.toFixed(4)})` // Cerulean plume
            : `rgba(27, 23, 23, ${(currentAlpha * 0.9).toFixed(4)})`; // Chocolate Plum plume

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, colorStop);
          grad.addColorStop(0.6, p.isRed ? 'rgba(129, 1, 0, 0.008)' : 'rgba(27, 23, 23, 0.008)');
          grad.addColorStop(1, 'rgba(250, 245, 232, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Very faint paper/film grain */}
      <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay pointer-events-none" />
      {/* Soft antique vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(27,23,23,0.08)_100%)] pointer-events-none" />
    </div>
  );
};
