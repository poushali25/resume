import React, { useEffect, useRef } from 'react';

interface FireSmokeCanvasProps {
  intensity?: number;
  triggerSweep?: boolean;
  reducedMotion?: boolean;
}

interface AmbientEmber {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  color: string;
}

interface SmokePlume {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speedY: number;
  drift: number;
  phase: number;
  color: string;
}

export const FireSmokeCanvas: React.FC<FireSmokeCanvasProps> = ({
  intensity = 1,
  triggerSweep = false,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (reducedMotion) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize ambient embers/specks (Cerulean, Popcorn Gold, Chocolate Plum)
    const embersCount = Math.floor(25 * intensity);
    const embers: AmbientEmber[] = [];
    const emberColors = [
      'rgba(129, 1, 0, ',  // Cerulean (#810100)
      'rgba(248, 222, 141, ', // Popcorn Gold (#F8DE8D)
      'rgba(27, 23, 23, ',   // Chocolate Plum (#1B1717)
    ];

    for (let i = 0; i < embersCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        baseAlpha: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
      });
    }

    // Initialize slow flowing translucent smoke plumes
    const plumeCount = Math.floor(7 * intensity);
    const plumes: SmokePlume[] = [];
    for (let i = 0; i < plumeCount; i++) {
      const bX = (width / (plumeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 150;
      plumes.push({
        x: bX,
        y: height + Math.random() * 200,
        baseX: bX,
        baseY: height,
        radius: Math.random() * 120 + 80,
        maxRadius: Math.random() * 260 + 200,
        alpha: Math.random() * 0.04 + 0.015,
        speedY: Math.random() * 0.5 + 0.3,
        drift: Math.random() * 0.8 + 0.4,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '54, 36, 43' : '0, 123, 167',
      });
    }

    let sweepProgress = 0;
    let isSweeping = false;
    if (triggerSweep) {
      isSweeping = true;
      sweepProgress = 0;
    }

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render soft ambient smoke plumes and embers (floating lines removed)
      for (let i = 0; i < plumes.length; i++) {
        const p = plumes[i];
        p.phase += 0.01;
        p.y -= p.speedY;
        p.radius += 0.15;
        p.x = p.baseX + Math.sin(p.phase) * 60 + (mouseRef.current.x - width / 2) * 0.02;

        // Reset plume once it drifts past top
        if (p.y < -p.maxRadius || p.radius > p.maxRadius) {
          p.y = height + 100;
          p.radius = Math.random() * 80 + 60;
          p.x = p.baseX;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.7})`);
        grad.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render embers/light specks with gentle cursor disturbance
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.phase += 0.02;
        e.y += e.vy;
        e.x += e.vx + Math.sin(e.phase) * 0.3;

        // Cursor repulsion/reaction
        const dx = e.x - mouseRef.current.x;
        const dy = e.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 0.8;
          e.x += (dx / dist) * force * 3;
          e.y += (dy / dist) * force * 3;
        }

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }
        if (e.x < -10) e.x = width + 10;
        if (e.x > width + 10) e.x = -10;

        const pulseAlpha = e.baseAlpha + Math.sin(e.phase) * 0.15;
        ctx.fillStyle = `${e.color}${Math.max(0, pulseAlpha)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sweep animation effect if triggered
      if (isSweeping) {
        sweepProgress += 0.025;
        const sweepX = width * sweepProgress;
        const sweepGrad = ctx.createLinearGradient(sweepX - 250, 0, sweepX + 250, height);
        sweepGrad.addColorStop(0, 'rgba(129, 1, 0, 0)');
        sweepGrad.addColorStop(0.5, 'rgba(129, 1, 0, 0.25)');
        sweepGrad.addColorStop(0.7, 'rgba(99, 0, 0, 0.18)');
        sweepGrad.addColorStop(1, 'rgba(129, 1, 0, 0)');

        ctx.fillStyle = sweepGrad;
        ctx.fillRect(0, 0, width, height);

        if (sweepProgress >= 1.5) {
          isSweeping = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [intensity, triggerSweep, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-75"
    />
  );
};
