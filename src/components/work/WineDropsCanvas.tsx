import React, { useEffect, useRef } from 'react';

interface Drop {
  x: number;
  y: number;
  length: number;
  radius: number;
  speed: number;
  opacity: number;
  maxOpacity: number;
  swaySpeed: number;
  swayAmount: number;
  phase: number;
  color: string;
  glowRadius: number;
}

interface WineDropsCanvasProps {
  density?: number; // Number of drops
  reducedMotion?: boolean;
}

/**
 * WineDropsCanvas — Faded glowing wine-red drops flowing smoothly from top to bottom
 * in the background behind the cards.
 *
 * Characteristics:
 * - Fluid vertical flow with subtle organic horizontal drift
 * - Luminous wine-red core with soft radial glowing aura
 * - Streamlined faded tail evoking liquid drops / luminous rain
 * - Varied depths (foreground gentle drops, soft faded background streaks)
 * - 60fps high-performance HTML5 canvas with devicePixelRatio scaling
 */
export const WineDropsCanvas: React.FC<WineDropsCanvasProps> = ({
  density = 55,
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

    // Palette: Cherry Red, Maroon, Noir Black
    const wineColors = [
      'rgba(129, 1, 0,',   // Cherry Red (#810100)
      'rgba(99, 0, 0,',    // Maroon (#630000)
      'rgba(129, 1, 0,',   // Cherry Red accent
      'rgba(27, 23, 23,',  // Noir Black (#1B1717)
    ];

    const createDrop = (initialYRandom = true): Drop => {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const colorBase = wineColors[Math.floor(Math.random() * wineColors.length)];

      return {
        x: Math.random() * width,
        y: initialYRandom ? Math.random() * height : -Math.random() * 80 - 20,
        length: 25 + depth * 55, // Tail length
        radius: 1.2 + depth * 2.2, // Head radius
        speed: (reducedMotion ? 0.4 : 1.1) + depth * 2.0, // Top to bottom velocity
        opacity: 0.15 + depth * 0.45,
        maxOpacity: 0.25 + depth * 0.5,
        swaySpeed: 0.008 + Math.random() * 0.012,
        swayAmount: 0.3 + depth * 0.8,
        phase: Math.random() * Math.PI * 2,
        color: colorBase,
        glowRadius: 10 + depth * 22,
      };
    };

    const drops: Drop[] = Array.from({ length: density }, () => createDrop(true));

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render each falling glowing wine-red droplet
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Move downward smoothly
        d.y += d.speed * delta;
        d.phase += d.swaySpeed * delta;
        const currentX = d.x + Math.sin(d.phase) * d.swayAmount;

        // Reset when flowing past the bottom of the screen
        if (d.y - d.length > height) {
          drops[i] = createDrop(false);
          continue;
        }

        // Fading in at top, fading out at very bottom
        let alphaFactor = 1;
        if (d.y < 120) {
          alphaFactor = Math.max(0, d.y / 120);
        } else if (d.y > height - 120) {
          alphaFactor = Math.max(0, (height - d.y) / 120);
        }

        const effectiveAlpha = d.opacity * alphaFactor;
        if (effectiveAlpha <= 0.01) continue;

        // 1. Soft Outer Glowing Aura around the head of the drop
        const glowGrad = ctx.createRadialGradient(
          currentX,
          d.y,
          0,
          currentX,
          d.y,
          d.glowRadius
        );
        glowGrad.addColorStop(0, `${d.color} ${effectiveAlpha * 0.55})`);
        glowGrad.addColorStop(0.4, `${d.color} ${effectiveAlpha * 0.22})`);
        glowGrad.addColorStop(1, `${d.color} 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(currentX, d.y, d.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Faded Glowing Stream / Tail flowing upwards from the droplet head
        const tailGrad = ctx.createLinearGradient(
          currentX,
          d.y - d.length,
          currentX,
          d.y
        );
        tailGrad.addColorStop(0, `${d.color} 0)`);
        tailGrad.addColorStop(0.6, `${d.color} ${effectiveAlpha * 0.3})`);
        tailGrad.addColorStop(1, `${d.color} ${effectiveAlpha * 0.95})`);

        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = d.radius * 1.6;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(currentX, d.y - d.length);
        ctx.lineTo(currentX, d.y);
        ctx.stroke();

        // 3. Bright Luminous Nucleus Droplet at bottom
        ctx.fillStyle = `${d.color} ${effectiveAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(currentX, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4. Subtle inner pinpoint highlight
        ctx.fillStyle = `rgba(255, 230, 235, ${effectiveAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(currentX, d.y - d.radius * 0.25, d.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.85,
      }}
    />
  );
};
