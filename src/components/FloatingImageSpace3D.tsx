import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FLOATING_3D_PROJECTS, Floating3DProjectItem } from '../data/floating3DData';

interface FloatingImageSpace3DProps {
  onSelectProject: (projectId: string) => void;
  onHoverProjectStart?: () => void;
  onHoverProjectEnd?: () => void;
  reducedMotion?: boolean;
}

// Strict uniform dimensions for all floating fashion plates
const UNIFORM_IMAGE_WIDTH = 230;
const UNIFORM_IMAGE_HEIGHT = 320;

// Helper to create a soft procedural radial glow aura texture
function createGlowAuraTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 15, 128, 128, 125);
    gradient.addColorStop(0, 'rgba(250, 245, 232, 0.95)'); // Cotton core
    gradient.addColorStop(0.25, 'rgba(129, 1, 0, 0.7)');   // Cherry Red warmth
    gradient.addColorStop(0.6, 'rgba(99, 0, 0, 0.25)');     // Maroon depth
    gradient.addColorStop(0.85, 'rgba(27, 23, 23, 0.1)');   // Noir Black transition
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const FloatingImageSpace3D: React.FC<FloatingImageSpace3DProps> = ({
  onSelectProject,
  onHoverProjectStart,
  onHoverProjectEnd,
  reducedMotion = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const holdIndicatorRef = useRef<HTMLDivElement | null>(null);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const statusTextRef = useRef<HTMLSpanElement | null>(null);

  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);
  const [, setHoveredProjectId] = useState<string | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<
    Array<{
      mesh: THREE.Mesh;
      project: Floating3DProjectItem;
      border: THREE.LineSegments;
      halo: THREE.Mesh;
    }>
  >([]);
  const animFrameRef = useRef<number | null>(null);

  // Mouse & Physics state with high-precision damping
  const mouse = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
  });
  const scroll = useRef({ currentZ: 0, targetZ: 0, minZ: -320, maxZ: 380 });
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Active Click & Hold (3 Seconds to Glow) State
  const holdRef = useRef<{
    isHolding: boolean;
    startTime: number;
    mesh: THREE.Mesh | null;
    hasGlowed: boolean;
  }>({
    isHolding: false,
    startTime: 0,
    mesh: null,
    hasGlowed: false,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglAvailable(false);
        return;
      }
    } catch {
      setWebglAvailable(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene with luxury deep Noir Black atmosphere and depth fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1B1717); // Noir Black luxury palette
    scene.fog = new THREE.FogExp2(0x1B1717, 0.00055);
    sceneRef.current = scene;

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 2600);
    camera.position.set(0, 0, 680);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Precision & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting: Cotton ambient and Cherry Red / Maroon directional highlights
    const ambientLight = new THREE.AmbientLight(0xEDEBDD, 0.95);
    scene.add(ambientLight);

    const cherryKeyLight = new THREE.DirectionalLight(0x810100, 1.25);
    cherryKeyLight.position.set(300, 400, 500);
    scene.add(cherryKeyLight);

    const maroonFillLight = new THREE.DirectionalLight(0x630000, 0.95);
    maroonFillLight.position.set(-400, -300, 300);
    scene.add(maroonFillLight);

    // 5. Texture Loader & Mesh Creation for Floating Projects (Uniform Equal Size & Faded Base State)
    const textureLoader = new THREE.TextureLoader();
    const glowTexture = createGlowAuraTexture();
    meshesRef.current = [];

    const uniformGeom = new THREE.PlaneGeometry(UNIFORM_IMAGE_WIDTH, UNIFORM_IMAGE_HEIGHT);
    const uniformEdges = new THREE.EdgesGeometry(uniformGeom);
    const haloGeom = new THREE.PlaneGeometry(UNIFORM_IMAGE_WIDTH * 1.5, UNIFORM_IMAGE_HEIGHT * 1.5);

    FLOATING_3D_PROJECTS.forEach((proj) => {
      const texture = textureLoader.load(proj.imageSource);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Base material starts faded (~0.42 opacity, soft muted tone)
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.42,
      });

      const mesh = new THREE.Mesh(uniformGeom, mat);
      mesh.position.set(proj.position3D.x, proj.position3D.y, proj.position3D.z);
      mesh.rotation.set(proj.rotation3D.x, proj.rotation3D.y, proj.rotation3D.z);
      
      mesh.userData = {
        project: proj,
        baseScale: 1.0,
        currentScale: 1.0,
        currentLiftZ: 0,
        currentOpacity: 0.42,
        isGlowing: false,
        holdProgress: 0,
        offsetX: 0,
        offsetY: 0,
        tiltX: 0,
        tiltY: 0,
        baseZ: proj.position3D.z,
      };

      // Add a thin, elegant Maroon/Cherry Red wire border around the photograph
      const lineMat = new THREE.LineBasicMaterial({ color: 0x810100, transparent: true, opacity: 0.25 });
      const border = new THREE.LineSegments(uniformEdges, lineMat);
      mesh.add(border);

      // Add a luminous halo plane directly behind the photograph for the 3-second glow-up
      const haloMat = new THREE.MeshBasicMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.position.set(0, 0, -2);
      mesh.add(halo);

      scene.add(mesh);
      meshesRef.current.push({ mesh, project: proj, border, halo });
    });

    // Cache interactive meshes array once to avoid garbage collection churn
    const cachedInteractiveMeshes = meshesRef.current.map((item) => item.mesh);

    // 6. Raycaster setup for mouse interaction & 3-second hold detection
    const raycaster = new THREE.Raycaster();
    const rayMouse = new THREE.Vector2(-10, -10);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates (-1 to 1)
      const nx = (clientX / rect.width) * 2 - 1;
      const ny = -(clientY / rect.height) * 2 + 1;

      mouse.current.targetX = nx;
      mouse.current.targetY = ny;
      mouse.current.clientX = e.clientX;
      mouse.current.clientY = e.clientY;

      rayMouse.x = nx;
      rayMouse.y = ny;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 7. Click & Long-Press Handlers (Hold for > 3 Seconds to Glow Up)
    const handlePointerDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Only primary left mouse button

      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const nx = (clientX / rect.width) * 2 - 1;
      const ny = -(clientY / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const intersects = raycaster.intersectObjects(cachedInteractiveMeshes);

      if (intersects.length > 0) {
        const targetMesh = intersects[0].object as THREE.Mesh;
        holdRef.current = {
          isHolding: true,
          startTime: performance.now(),
          mesh: targetMesh,
          hasGlowed: !!targetMesh.userData.isGlowing,
        };
      }
    };

    const handlePointerUp = () => {
      if (holdRef.current.isHolding && holdRef.current.mesh) {
        const elapsed = performance.now() - holdRef.current.startTime;
        const targetMesh = holdRef.current.mesh;
        const alreadyGlowed = holdRef.current.hasGlowed;

        // Quick click (< 350ms): standard route navigation to project
        if (elapsed < 350 && !alreadyGlowed) {
          const p = targetMesh.userData.project as Floating3DProjectItem;
          if (p) {
            onSelectProject(p.targetProjectId || p.id);
          }
        }
      }

      holdRef.current.isHolding = false;
      holdRef.current.mesh = null;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 8. Scroll Listener for Smooth Depth Gliding through the 3D space
    const handleWheel = (e: WheelEvent) => {
      if (reducedMotion) return;
      scroll.current.targetZ += e.deltaY * 0.4;
      scroll.current.targetZ = Math.max(scroll.current.minZ, Math.min(scroll.current.maxZ, scroll.current.targetZ));
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Touch support for mobile scrolling and panning
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        mouse.current.clientX = touchStartX;
        mouse.current.clientY = touchStartY;

        const rect = container.getBoundingClientRect();
        const clientX = touchStartX - rect.left;
        const clientY = touchStartY - rect.top;
        const nx = (clientX / rect.width) * 2 - 1;
        const ny = -(clientY / rect.height) * 2 + 1;

        raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
        const intersects = raycaster.intersectObjects(cachedInteractiveMeshes);

        if (intersects.length > 0) {
          const targetMesh = intersects[0].object as THREE.Mesh;
          holdRef.current = {
            isHolding: true,
            startTime: performance.now(),
            mesh: targetMesh,
            hasGlowed: !!targetMesh.userData.isGlowing,
          };
        }
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        const deltaX = touchStartX - e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        mouse.current.clientX = touchStartX;
        mouse.current.clientY = touchStartY;

        scroll.current.targetZ += deltaY * 0.6;
        scroll.current.targetZ = Math.max(scroll.current.minZ, Math.min(scroll.current.maxZ, scroll.current.targetZ));

        mouse.current.targetX += deltaX * 0.002;
        mouse.current.targetY -= deltaY * 0.002;
        mouse.current.targetX = Math.max(-1, Math.min(1, mouse.current.targetX));
        mouse.current.targetY = Math.max(-1, Math.min(1, mouse.current.targetY));
      }
    };

    const handleTouchEnd = () => {
      handlePointerUp();
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation & Render Loop with Butter-Smooth Delta-Time Easing
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      
      const rawDelta = clock.getDelta();
      const delta = Math.min(rawDelta, 0.08); // Cap delta to prevent jump on tab switch
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping factor: frame-rate independent, velvety smooth inertia
      // Dynamically eases damping when cursor glides toward or resides on the left side
      const isTargetOnLeft = mouse.current.targetX < 0;
      const leftDecayRate = isTargetOnLeft ? 2.9 : 4.4;
      const cursorLerp = reducedMotion ? 1 : 1.0 - Math.exp(-leftDecayRate * delta);
      const scrollLerp = reducedMotion ? 1 : 1.0 - Math.exp(-4.2 * delta);

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * cursorLerp;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * cursorLerp;

      scroll.current.currentZ += (scroll.current.targetZ - scroll.current.currentZ) * scrollLerp;

      // Update camera position with smooth parallax and scroll-controlled depth
      if (!reducedMotion) {
        // Ultra-smooth easing when camera glides over the left side of the scene
        const leftBias = Math.max(0, -mouse.current.x);
        const camLerp = 1.0 - Math.exp(-(4.5 - leftBias * 1.8) * delta);

        const targetCamX = mouse.current.x * 58;
        const targetCamY = mouse.current.y * 38;
        const targetCamZ = 680 - scroll.current.currentZ;

        const targetCamRotY = -mouse.current.x * 0.030;
        const targetCamRotX = mouse.current.y * 0.024;

        camera.position.x += (targetCamX - camera.position.x) * camLerp;
        camera.position.y += (targetCamY - camera.position.y) * camLerp;
        camera.position.z += (targetCamZ - camera.position.z) * scrollLerp;

        camera.rotation.y += (targetCamRotY - camera.rotation.y) * camLerp;
        camera.rotation.x += (targetCamRotX - camera.rotation.x) * camLerp;
      }

      // Raycast to detect image hover
      raycaster.setFromCamera(rayMouse, camera);
      const intersects = raycaster.intersectObjects(cachedInteractiveMeshes);

      let currentlyHovered: THREE.Mesh | null = null;
      if (intersects.length > 0) {
        currentlyHovered = intersects[0].object as THREE.Mesh;
      }

      if (currentlyHovered !== hoveredMeshRef.current) {
        hoveredMeshRef.current = currentlyHovered;
        if (currentlyHovered) {
          const proj = currentlyHovered.userData.project as Floating3DProjectItem;
          setHoveredProjectId(proj ? proj.id : null);
          if (onHoverProjectStart) onHoverProjectStart();
        } else {
          setHoveredProjectId(null);
          if (onHoverProjectEnd) onHoverProjectEnd();
        }
      }

      // Track active 3-Second Click Hold Progress
      const isHolding = holdRef.current.isHolding && holdRef.current.mesh !== null;
      let activeHeldProgress = 0;
      let isGlowUnlockedNow = false;

      if (isHolding && holdRef.current.mesh) {
        const elapsed = performance.now() - holdRef.current.startTime;
        activeHeldProgress = Math.min(1.0, elapsed / 3000); // 3000ms = 3 seconds
        holdRef.current.mesh.userData.holdProgress = activeHeldProgress;

        if (activeHeldProgress >= 1.0 && !holdRef.current.hasGlowed) {
          holdRef.current.mesh.userData.isGlowing = true;
          holdRef.current.hasGlowed = true;
          isGlowUnlockedNow = true;
        }
      }

      // Update Hold Progress Micro-HUD Badge
      if (holdIndicatorRef.current && progressCircleRef.current && statusTextRef.current) {
        if (isHolding && holdRef.current.mesh) {
          holdIndicatorRef.current.style.display = 'flex';
          holdIndicatorRef.current.style.left = `${mouse.current.clientX + 16}px`;
          holdIndicatorRef.current.style.top = `${mouse.current.clientY + 16}px`;

          const circumference = 2 * Math.PI * 14; // r = 14 -> ~87.96
          const offset = circumference * (1 - activeHeldProgress);
          progressCircleRef.current.style.strokeDasharray = `${circumference}`;
          progressCircleRef.current.style.strokeDashoffset = `${offset}`;

          if (holdRef.current.hasGlowed || isGlowUnlockedNow) {
            statusTextRef.current.textContent = '✨ GLOWING';
            statusTextRef.current.className = 'text-[#F7F2E7] font-medium tracking-widest text-[10px] uppercase';
          } else {
            const remaining = Math.max(0, (3.0 - (performance.now() - holdRef.current.startTime) / 1000)).toFixed(1);
            statusTextRef.current.textContent = `HOLD TO GLOW ${remaining}s`;
            statusTextRef.current.className = 'text-[#F7F2E7]/80 tracking-widest text-[10px] uppercase';
          }
        } else {
          holdIndicatorRef.current.style.display = 'none';
        }
      }

      // Animate each floating fashion image plane with multi-layer depth parallax and glow states
      const animLerp = 1.0 - Math.exp(-5.5 * delta);

      meshesRef.current.forEach(({ mesh, project, border, halo }) => {
        const isHovered = mesh === hoveredMeshRef.current;
        const isHeld = isHolding && holdRef.current.mesh === mesh;
        const isGlowing = !!mesh.userData.isGlowing;
        const depthFactor = project.depthValue;
        const holdProgress = isHeld ? (mesh.userData.holdProgress || 0) : 0;

        // Target Opacity:
        // Default: faded (0.42)
        // Hovered (non-glowing): subtle highlight (0.58)
        // Holding click: progressively brightens up to 0.95
        // Glow Up: Full radiant exposure (1.0)
        let targetOpacity = 0.42;
        if (isGlowing) {
          targetOpacity = 1.0;
        } else if (isHeld) {
          targetOpacity = 0.42 + holdProgress * 0.53;
        } else if (isHovered) {
          targetOpacity = 0.58;
        }

        // Target Scale & Lift Z
        let targetScale = 1.0;
        let targetLiftZ = 0;

        if (isGlowing) {
          targetScale = 1.10;
          targetLiftZ = 55;
        } else if (isHeld) {
          targetScale = 1.0 + holdProgress * 0.08;
          targetLiftZ = holdProgress * 40;
        } else if (isHovered) {
          targetScale = 1.04;
          targetLiftZ = 20;
        }

        mesh.userData.currentScale += (targetScale - mesh.userData.currentScale) * animLerp;
        mesh.userData.currentLiftZ += (targetLiftZ - mesh.userData.currentLiftZ) * animLerp;
        mesh.userData.currentOpacity += (targetOpacity - mesh.userData.currentOpacity) * animLerp;

        mesh.scale.set(mesh.userData.currentScale, mesh.userData.currentScale, 1);

        // Multi-depth parallax responsive to cursor movement
        let parallaxX = 0;
        let parallaxY = 0;
        let tiltX = 0;
        let tiltY = 0;
        let floatY = 0;
        let floatRotZ = 0;

        if (!reducedMotion) {
          const isLeftMesh = project.position3D.x < 0;

          // Left-side images receive specialized silkier damping and gentle tilt dynamics
          const meshParallaxLerp = 1.0 - Math.exp(-(isLeftMesh ? 2.8 : 4.4) * delta);
          const meshTiltLerp = 1.0 - Math.exp(-(isLeftMesh ? 2.2 : 3.8) * delta);
          const tiltFactor = isLeftMesh ? 0.72 : 1.0;

          // Subtle cursor depth parallax: foreground drifts more, background drifts less
          const targetParallaxX = mouse.current.x * (depthFactor * 30);
          const targetParallaxY = mouse.current.y * (depthFactor * 20);
          const targetTiltX = -mouse.current.y * (0.036 * depthFactor * tiltFactor);
          const targetTiltY = mouse.current.x * (0.044 * depthFactor * tiltFactor);

          mesh.userData.offsetX += (targetParallaxX - mesh.userData.offsetX) * meshParallaxLerp;
          mesh.userData.offsetY += (targetParallaxY - mesh.userData.offsetY) * meshParallaxLerp;
          mesh.userData.tiltX += (targetTiltX - mesh.userData.tiltX) * meshTiltLerp;
          mesh.userData.tiltY += (targetTiltY - mesh.userData.tiltY) * meshTiltLerp;

          parallaxX = mesh.userData.offsetX;
          parallaxY = mesh.userData.offsetY;
          tiltX = mesh.userData.tiltX;
          tiltY = mesh.userData.tiltY;

          // Organic harmonic floating wave (dual-harmonic smooth cadence for left side)
          if (isLeftMesh) {
            const wave1 = Math.sin(elapsedTime * (project.floatSpeed * 600) + project.floatOffset) * 7.0;
            const wave2 = Math.sin(elapsedTime * (project.floatSpeed * 300) + project.floatOffset * 1.4) * 3.5;
            floatY = wave1 + wave2;
            floatRotZ = Math.cos(elapsedTime * (project.floatSpeed * 350) + project.floatOffset) * 0.0075;
          } else {
            floatY = Math.sin(elapsedTime * (project.floatSpeed * 900) + project.floatOffset) * 12;
            floatRotZ = Math.cos(elapsedTime * (project.floatSpeed * 500) + project.floatOffset) * 0.012;
          }
        }

        mesh.position.x = project.position3D.x + parallaxX;
        mesh.position.y = project.position3D.y + floatY + parallaxY;
        mesh.position.z = project.position3D.z + mesh.userData.currentLiftZ;

        mesh.rotation.x = project.rotation3D.x + tiltX;
        mesh.rotation.y = project.rotation3D.y + tiltY;
        mesh.rotation.z = project.rotation3D.z + floatRotZ;

        // Material Opacity, Exposure, and Tone
        const meshMat = mesh.material as THREE.MeshBasicMaterial;
        meshMat.opacity = mesh.userData.currentOpacity;

        if (isGlowing) {
          // Luminous bright exposure glow
          meshMat.color.setRGB(1.22, 1.16, 1.08);
        } else if (isHeld) {
          const r = 0.85 + holdProgress * 0.35;
          const g = 0.85 + holdProgress * 0.30;
          const b = 0.85 + holdProgress * 0.22;
          meshMat.color.setRGB(r, g, b);
        } else {
          // Muted faded background tone
          meshMat.color.setRGB(0.85, 0.85, 0.85);
        }

        // Wire border & Radiant Halo Animation
        const lineMat = border.material as THREE.LineBasicMaterial;
        const haloMat = halo.material as THREE.MeshBasicMaterial;

        if (isGlowing) {
          // Pure ivory-gold radiant border
          lineMat.color.setHex(0xfffae8);
          lineMat.opacity = 1.0;

          // Ethereal pulsing halo aura in additive blending
          const haloPulse = 0.75 + 0.22 * Math.sin(elapsedTime * 2.8 + project.floatOffset);
          haloMat.opacity = haloPulse;
          const haloScale = 1.04 + 0.04 * Math.sin(elapsedTime * 2.8);
          halo.scale.set(haloScale, haloScale, 1);
        } else if (isHeld) {
          lineMat.color.setHex(0xf6f2ec);
          lineMat.opacity = 0.22 + holdProgress * 0.78;
          haloMat.opacity = holdProgress * 0.65;
          halo.scale.set(1.0 + holdProgress * 0.05, 1.0 + holdProgress * 0.05, 1);
        } else if (isHovered) {
          lineMat.color.setHex(0xEDEBDD);
          lineMat.opacity = 0.7;
          haloMat.opacity = 0;
        } else {
          lineMat.color.setHex(0x810100);
          lineMat.opacity = 0.25;
          haloMat.opacity = 0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, onHoverProjectStart, onHoverProjectEnd, onSelectProject]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-pointer z-0"
        style={{ touchAction: 'none' }}
      />

      {/* 3-Second Hold-to-Glow Micro-HUD Badge at Cursor */}
      <div
        ref={holdIndicatorRef}
        className="pointer-events-none fixed z-40 items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1B1717]/92 backdrop-blur-md border border-[#810100]/50 shadow-2xl transition-transform duration-75"
        style={{ display: 'none' }}
      >
        <svg className="w-5 h-5 -rotate-90 shrink-0" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="14"
            className="text-[#630000]/40 stroke-current fill-none stroke-[2.5]"
          />
          <circle
            ref={progressCircleRef}
            cx="16"
            cy="16"
            r="14"
            className="text-[#FAF5E8] stroke-current fill-none stroke-[2.5] transition-all duration-75"
            strokeLinecap="round"
          />
        </svg>
        <span
          ref={statusTextRef}
          className="text-[10px] uppercase font-sans tracking-[0.2em] whitespace-nowrap text-[#FAF5E8]"
        >
          HOLD TO GLOW 3.0s
        </span>
      </div>

      {/* Accessible DOM Fallback / Screen-Reader Overlay (Keyboard Accessible) */}
      {!webglAvailable ? (
        // CSS 3D Fallback if WebGL is disabled
        <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {FLOATING_3D_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj.targetProjectId || proj.id)}
                onMouseEnter={() => {
                  setHoveredProjectId(proj.id);
                  if (onHoverProjectStart) onHoverProjectStart();
                }}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  if (onHoverProjectEnd) onHoverProjectEnd();
                }}
                className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-[#1B1717]/40 hover:border-[#810100] transition-all duration-500 shadow-2xl cursor-pointer opacity-50 hover:opacity-100"
              >
                <img
                  src={proj.imageSource}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Visually hidden focusable buttons for strict WCAG keyboard accessibility
        <div className="sr-only" aria-label="Fashion Portfolio Gallery Navigation">
          {FLOATING_3D_PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj.targetProjectId || proj.id)}
              onFocus={() => {
                setHoveredProjectId(proj.id);
                if (onHoverProjectStart) onHoverProjectStart();
              }}
              onBlur={() => {
                setHoveredProjectId(null);
                if (onHoverProjectEnd) onHoverProjectEnd();
              }}
            >
              Open {proj.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
