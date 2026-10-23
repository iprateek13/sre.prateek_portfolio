"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false, // Performance optimized for full-page background
        powerPreference: "high-performance",
      });
    } catch (e) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 30);
    camera.lookAt(0, 0, 0);

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();

    // 1. Perspective Cyberspace Horizon Grid
    const gridHelper = new THREE.GridHelper(180, 45, 0x0284c7, 0x1e293b);
    gridHelper.position.set(0, -6, 0);
    scene.add(gridHelper);

    // Secondary Overhead Digital Sky Grid
    const skyGrid = new THREE.GridHelper(180, 45, 0x06b6d4, 0x0f172a);
    skyGrid.position.set(0, 24, 0);
    scene.add(skyGrid);

    // 2. Floating Cyberspace Data Particles
    const particleCount = 420;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cAzure = new THREE.Color(0x38bdf8);
    const cCyan = new THREE.Color(0x22d3ee);
    const cEmerald = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = Math.random() * 32 - 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const pickColor = i % 3 === 0 ? cAzure : i % 3 === 1 ? cCyan : cEmerald;
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Ambient Fog for Infinite Cyberspace Depth
    scene.fog = new THREE.FogExp2(0x07090e, 0.016);

    // Dynamic Variables for Mouse & Scroll Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateSize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Lerping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Infinite forward flight motion along Z-axis
      gridHelper.position.z = (time * 6 + scrollY * 0.08) % 4;
      skyGrid.position.z = (-time * 4 - scrollY * 0.08) % 4;

      // Subtle horizontal sway of particles
      particles.rotation.y = time * 0.02 + mouseX * 0.05;
      particles.rotation.x = mouseY * 0.03;

      // Scroll Depth Warping
      camera.position.x = mouseX * 4;
      camera.position.y = 8 + mouseY * 2 - scrollY * 0.003;
      camera.position.z = 30 + Math.sin(time * 0.5) * 1.5;
      camera.lookAt(mouseX * 2, -1, -50);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSize);

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-45 transition-opacity duration-700"
      />

      {/* Cyber Grid SVG overlay blend */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 dark:opacity-15 mix-blend-overlay" />
    </div>
  );
}
