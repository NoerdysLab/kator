'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { createScene, createResizeHandler } from '../lib/three/sceneSetup';
import { createGlobe } from '../lib/three/globe';
import { createStars } from '../lib/three/stars';
import { MarkerManager } from '../lib/three/markers';
import { GlobeEvent } from '../lib/types';

interface GlobeProps {
  events: GlobeEvent[];
  onHover: (event: GlobeEvent | null, x: number, y: number) => void;
}

export default function Globe({ events, onHover }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<GlobeEvent[]>([]);
  const markerManagerRef = useRef<MarkerManager | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Keep events ref in sync without triggering re-render of Three.js scene
  useEffect(() => {
    eventsRef.current = events;
    if (markerManagerRef.current) {
      markerManagerRef.current.updateMarkers(events);
    }
  }, [events]);

  const onHoverRef = useRef(onHover);
  onHoverRef.current = onHover;

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scene, camera, renderer } = createScene(container);
    const { globeGroup, markerGroup, atmosphereOuter } = createGlobe(scene);
    const stars = createStars(scene);
    const markerManager = new MarkerManager(markerGroup);
    markerManagerRef.current = markerManager;

    // Initial markers
    if (eventsRef.current.length) {
      markerManager.updateMarkers(eventsRef.current);
    }

    // --- Interaction state ---
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let autoRotateTimeout: ReturnType<typeof setTimeout> | null = null;
    let autoRotate = true;
    let targetZoom = 5.5;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let lastRaycastTime = 0;

    // --- Mouse handlers ---
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      autoRotate = false;
      if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }

      // Throttled raycasting
      const now = performance.now();
      if (now - lastRaycastTime < 50) return;
      lastRaycastTime = now;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = markerManager.getMarkerMeshes();
      if (meshes.length === 0) {
        onHoverRef.current(null, 0, 0);
        return;
      }
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hit = markerManager.getEventForMesh(intersects[0].object);
        onHoverRef.current(hit, e.clientX, e.clientY);
      } else {
        onHoverRef.current(null, 0, 0);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      autoRotateTimeout = setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.005;
      targetZoom = Math.max(3.5, Math.min(8, targetZoom));
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
        autoRotate = false;
        if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      autoRotateTimeout = setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Resize
    const handleResize = createResizeHandler(camera, renderer, container);
    window.addEventListener('resize', handleResize);

    // --- Animation loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto rotation
      if (autoRotate) {
        targetRotationY += 0.001;
      }

      // Smooth interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      globeGroup.rotation.x = currentRotationX;
      globeGroup.rotation.y = currentRotationY;

      // Zoom
      camera.position.z += (targetZoom - camera.position.z) * 0.08;

      // Atmosphere rotation
      atmosphereOuter.rotation.y += 0.0003;

      // Stars rotation
      stars.rotation.y += 0.00005;

      // Animate markers
      markerManager.animate(elapsed);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    cleanupRef.current = () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (autoRotateTimeout) clearTimeout(autoRotateTimeout);

      markerManager.dispose();

      // Dispose scene
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initScene();
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [initScene]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10]"
      style={{ cursor: 'grab' }}
    />
  );
}
