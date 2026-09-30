import React, { useEffect, useRef, useState } from 'react';

export type CursorMode = 'default' | 'view' | 'view-project' | 'nav';

interface SmokingCursorProps {
  cursorMode?: CursorMode;
  cursorText?: string;
  isHeroHovered?: boolean;
  isProjectHovered?: boolean;
  isNavHovered?: boolean;
}

type SmokeHue = 'cerulean' | 'popcorn' | 'plum';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  initialAlpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
  hue: SmokeHue;
  rgb: string;
  seed: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
}

export const SmokingCursor: React.FC<SmokingCursorProps> = ({
  cursorMode = 'default',
  isHeroHovered = false,
  isProjectHovered = false,
  isNavHovered = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorElementRef = useRef<HTMLDivElement | null>(null);

  // High-performance coordinates ref (direct transform, zero React re-renders on mousemove)
  const coordsRef = useRef({
    targetX: -100,
    targetY: -100,
    currentX: -100,
    currentY: -100,
    delayedX: -100, // Slight trailing delay for organic smoke origin
    delayedY: -100,
    lastX: -100,
    lastY: -100,
    lastRenderX: -100,
    lastRenderY: -100,
    speed: 0,
    smoothSpeed: 0,
    isOverWord: false,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isWordTouched, setIsWordTouched] = useState(false);
  const lastDispatchedWordRef = useRef<string | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const animFrameId = useRef<number | null>(null);

  const effectiveMode: CursorMode =
    isHeroHovered || cursorMode === 'view'
      ? 'view'
      : isProjectHovered || cursorMode === 'view-project'
      ? 'view-project'
      : isNavHovered || cursorMode === 'nav'
      ? 'nav'
      : 'default';

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    // Subtle smoke palette: Cerulean, Popcorn Gold, and Chocolate Plum
    const smokeColors: Array<{ hue: SmokeHue; rgb: string; weight: number }> = [
      { hue: 'cerulean', rgb: '0, 123, 167', weight: 4 },   // Cerulean Blue
      { hue: 'popcorn', rgb: '248, 222, 141', weight: 3 },  // Popcorn Gold
      { hue: 'plum', rgb: '54, 36, 43', weight: 3 },        // Chocolate Plum
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, target } = e;
      const c = coordsRef.current;

      const dx = clientX - c.lastX;
      const dy = clientY - c.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      c.speed = speed;
      c.smoothSpeed += (speed - c.smoothSpeed) * 0.25;
      c.lastX = clientX;
      c.lastY = clientY;
      c.targetX = clientX;
      c.targetY = clientY;

      // Initialize positions immediately on first pointer entry
      if (c.currentX === -100) {
        c.currentX = clientX;
        c.currentY = clientY;
        c.delayedX = clientX;
        c.delayedY = clientY;
        c.lastX = clientX;
        c.lastY = clientY;
        c.lastRenderX = clientX;
        c.lastRenderY = clientY;
      }

      if (!isVisible) setIsVisible(true);

      // Fast, non-blocking check for nav word without querySelectorAll or layout thrashing
      const targetElement = target as HTMLElement | null;
      const touchedNavWord = targetElement?.closest('[data-selectable-nav-word]') as HTMLElement | null;
      const isWord = Boolean(touchedNavWord);
      if (c.isOverWord !== isWord) {
        c.isOverWord = isWord;
        setIsWordTouched(isWord);
      }

      if (touchedNavWord) {
        const wordAttr = touchedNavWord.getAttribute('data-selectable-nav-word');
        if (wordAttr && lastDispatchedWordRef.current !== wordAttr) {
          lastDispatchedWordRef.current = wordAttr;
          window.dispatchEvent(new CustomEvent('nav-word-touch', { detail: { word: wordAttr } }));
        }
      } else {
        lastDispatchedWordRef.current = null;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Canvas render loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let animTime = 0;
      let lastTime = performance.now();

      const render = (now: number) => {
        // High-precision delta time clamped to prevent jumps when switching tabs
        const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.05);
        lastTime = now;
        animTime += dt * 1.5;

        const c = coordsRef.current;

        // Framerate-independent, buttery-smooth exponential interpolation
        // High-damping factor ensures crisp, immediate, tactile tracking with zero perceived lag
        const cursorFollow = 1 - Math.exp(-48 * dt);
        c.currentX += (c.targetX - c.currentX) * cursorFollow;
        c.currentY += (c.targetY - c.currentY) * cursorFollow;

        // Smooth smoke ribbon trailing with organic delay
        const trailFollow = 1 - Math.exp(-22 * dt);
        c.delayedX += (c.currentX - c.delayedX) * trailFollow;
        c.delayedY += (c.currentY - c.delayedY) * trailFollow;

        // Update cursor DOM element with hardware-accelerated transform
        if (cursorElementRef.current) {
          cursorElementRef.current.style.transform = `translate3d(${c.currentX}px, ${c.currentY}px, 0) translate(-50%, -50%)`;
        }

        // Evenly sample trail points on render to avoid clumping
        const distMoved = Math.hypot(c.currentX - c.lastRenderX, c.currentY - c.lastRenderY);
        if (distMoved > 1.8) {
          const moveDx = c.currentX - c.lastRenderX;
          const moveDy = c.currentY - c.lastRenderY;

          trailPointsRef.current.unshift({
            x: c.delayedX,
            y: c.delayedY,
            age: 0,
            vx: -moveDx * 0.04,
            vy: -moveDy * 0.04,
          });

          // Dynamic ribbon length based on motion speed
          const dynamicMaxPoints = Math.min(42, Math.max(16, Math.floor(16 + c.smoothSpeed * 1.2)));
          if (trailPointsRef.current.length > dynamicMaxPoints) {
            trailPointsRef.current.splice(dynamicMaxPoints);
          }

          // Spawn soft delicate smoke puffs that drift elegantly
          const spawnCount = c.isOverWord ? 1 : distMoved > 20 ? 2 : distMoved > 6 ? 1 : Math.random() < 0.35 ? 1 : 0;
          for (let i = 0; i < spawnCount; i++) {
            const rand = Math.random() * 10;
            let chosen = smokeColors[0];
            if (rand > 7) chosen = smokeColors[2];
            else if (rand > 4) chosen = smokeColors[1];

            const angle = Math.random() * Math.PI * 2;
            const spreadDist = Math.random() * 2.5;
            const offsetX = Math.cos(angle) * spreadDist - (moveDx * 0.08);
            const offsetY = Math.sin(angle) * spreadDist - (moveDy * 0.08);

            particlesRef.current.push({
              x: c.delayedX + offsetX,
              y: c.delayedY + offsetY,
              vx: (Math.random() - 0.5) * 0.2 - moveDx * 0.02,
              vy: (Math.random() - 0.5) * 0.2 - moveDy * 0.02 - (0.06 + Math.random() * 0.1),
              size: Math.random() * 3.2 + 2.5,
              alpha: Math.random() * 0.06 + 0.05,
              initialAlpha: Math.random() * 0.06 + 0.05,
              decay: Math.random() * 0.003 + 0.0025,
              rotation: Math.random() * Math.PI * 2,
              rotSpeed: (Math.random() - 0.5) * 0.02,
              hue: chosen.hue,
              rgb: chosen.rgb,
              seed: Math.random() * 100,
            });
          }

          c.lastRenderX = c.currentX;
          c.lastRenderY = c.currentY;
        }

        // Keep particles list trimmed for constant 60/120fps performance
        if (particlesRef.current.length > 55) {
          particlesRef.current.splice(0, particlesRef.current.length - 55);
        }

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. RENDER SOFT ORGANIC SMOKE PARTICLES (floating line removed)
          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.vx += Math.sin(animTime * 2 + p.seed) * 0.012;
            p.x += p.vx;
            p.y += p.vy;
            p.size += 0.06;
            p.alpha -= p.decay;
            p.rotation += p.rotSpeed;

            if (p.alpha <= 0) {
              particlesRef.current.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
            gradient.addColorStop(0, `rgba(${p.rgb}, ${p.alpha})`);
            gradient.addColorStop(0.4, `rgba(${p.rgb}, ${p.alpha * 0.45})`);
            gradient.addColorStop(1, `rgba(${p.rgb}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        animFrameId.current = requestAnimationFrame(render);
      };

      animFrameId.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.body.classList.remove('custom-cursor-active');
        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      };
    }
  }, [effectiveMode, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Soft Smoke Trail Canvas (Transparent, Subtle, & Elegant - positioned behind texts and images) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[2] select-none"
      />

      {/* Main Cursor: Small Four Corner Star */}
      <div
        ref={cursorElementRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] select-none flex items-center justify-center will-change-transform transition-opacity duration-200 ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isWordTouched
              ? 'w-7.5 h-7.5 scale-120'
              : effectiveMode !== 'default'
              ? 'w-7 h-7 scale-110'
              : 'w-6 h-6 scale-100'
          }`}
        >
          {/* Luminous Cerulean Ambient Glow */}
          <div
            className={`absolute inset-0 rounded-full blur-[4px] transition-all duration-200 ${
              isWordTouched
                ? 'bg-[#D41428]/80 scale-175 shadow-[0_0_18px_#D41428]'
                : effectiveMode !== 'default'
                ? 'bg-[#A3081A]/65 scale-150 shadow-[0_0_14px_#A3081A]'
                : 'bg-[#A3081A]/50 scale-135 shadow-[0_0_10px_#A3081A]'
            }`}
          />

          {/* 4-Corner Star SVG in Noir Black with Cherry Red Rim */}
          <svg
            viewBox="0 0 24 24"
            className={`w-full h-full transition-all duration-200 ${
              isWordTouched
                ? 'fill-[#1B1717] stroke-[#D41428] stroke-[1.2] drop-shadow-[0_0_14px_rgba(212,20,40,0.95)]'
                : effectiveMode !== 'default'
                ? 'fill-[#1B1717] stroke-[#A3081A] stroke-[1.1] drop-shadow-[0_0_12px_rgba(163,8,26,0.85)]'
                : 'fill-[#1B1717] stroke-[#810100] stroke-[0.9] drop-shadow-[0_0_8px_rgba(129,1,0,0.75)]'
            }`}
          >
            {/* Elegant four-corner star curvature */}
            <path d="M12 0 C12 7.2, 7.2 12, 0 12 C7.2 12, 12 16.8, 12 24 C12 16.8, 16.8 12, 24 12 C16.8 12, 12 7.2, 12 0 Z" />
          </svg>

          {/* Center Micro-Pinpoint: Popcorn sparkle */}
          <span
            className={`absolute rounded-full transition-all duration-200 ${
              isWordTouched
                ? 'w-2 h-2 bg-[#FAF5E8] shadow-[0_0_8px_#D41428]'
                : 'w-1.5 h-1.5 bg-[#FAF5E8] shadow-[0_0_5px_#A3081A]'
            }`}
          />
        </div>
      </div>
    </>
  );
};
