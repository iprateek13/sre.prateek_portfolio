"use client";

import React, { useRef, useState, useEffect, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CloudMeshCanvas } from "./CloudMeshCanvas";

// Orbiting Satellite Node Component (Kubernetes Pods / Cloud VMs)
const SatelliteNode = memo(function SatelliteNode({
  radius,
  speed,
  angleOffset,
  color,
  size,
}: {
  radius: number;
  speed: number;
  angleOffset: number;
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.Line>(null);
  const accumulatedTimeRef = useRef(angleOffset);

  useFrame((_, delta) => {
    // Clamp delta to prevent massive jumps on page refresh/tab focus
    const safeDelta = Math.min(delta, 0.04);
    accumulatedTimeRef.current += safeDelta * speed;
    const time = accumulatedTimeRef.current;

    const x = Math.cos(time) * radius;
    const z = Math.sin(time) * radius;
    const y = Math.sin(time * 1.5) * (radius * 0.35);

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.x += safeDelta * 0.8;
      meshRef.current.rotation.y += safeDelta * 1.2;
    }

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, 0, 0, 0); // Core center
      positions.setXYZ(1, x, y, z); // Satellite position
      positions.needsUpdate = true;
    }
  });

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    return geom;
  }, []);

  return (
    <group>
      {/* Telemetry Data Link Line to Core */}
      {/* @ts-ignore */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>

      {/* Orbiting Satellite Node Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
});

// Central 3D Azure Cloud Infrastructure Cluster Hub Core
const CloudClusterCore = memo(function CloudClusterCore() {
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.04);
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += safeDelta * 0.25;
      innerCoreRef.current.rotation.y += safeDelta * 0.35;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x -= safeDelta * 0.15;
      outerRingRef.current.rotation.z += safeDelta * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= safeDelta * 0.05;
    }
  });

  // Orbital Satellite Node Configuration
  const satellites = useMemo(
    () => [
      { radius: 3.2, speed: 0.7, angleOffset: 0, color: "#0284C7", size: 0.18 },
      { radius: 3.8, speed: 0.5, angleOffset: Math.PI / 3, color: "#22D3EE", size: 0.15 },
      { radius: 4.4, speed: 0.8, angleOffset: (Math.PI * 2) / 3, color: "#10B981", size: 0.2 },
      { radius: 3.5, speed: 0.6, angleOffset: Math.PI, color: "#38BDF8", size: 0.16 },
      { radius: 4.1, speed: 0.75, angleOffset: (Math.PI * 4) / 3, color: "#34D399", size: 0.17 },
      { radius: 4.8, speed: 0.45, angleOffset: (Math.PI * 5) / 3, color: "#06B6D4", size: 0.19 },
    ],
    []
  );

  // Orbital Particle Field
  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 16;
      pos[i + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Central Floating 3D Azure Hub Core */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.0}>
        <group>
          {/* Inner Geodesic Core */}
          <mesh ref={innerCoreRef}>
            <icosahedronGeometry args={[1.5, 2]} />
            <meshStandardMaterial
              color="#0284C7"
              wireframe
              emissive="#0284C7"
              emissiveIntensity={0.65}
              roughness={0.1}
            />
          </mesh>

          {/* Outer Wireframe Ring */}
          <mesh ref={outerRingRef}>
            <torusGeometry args={[2.3, 0.08, 16, 70]} />
            <meshStandardMaterial
              color="#22D3EE"
              wireframe
              emissive="#22D3EE"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* Orbiting Satellite Nodes */}
      {satellites.map((sat, idx) => (
        <SatelliteNode key={idx} {...sat} />
      ))}

      {/* Orbiting Telemetry Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#10B981"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
});

function ThreeCloudSceneComponent() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setHasWebGL(isSupported);
    } catch (e) {
      setHasWebGL(false);
    }

    const timer = setTimeout(() => setCanvasReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (!hasWebGL) {
    return <CloudMeshCanvas />;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-700 pointer-events-none ${
        canvasReady ? "opacity-85" : "opacity-0"
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
          precision: "mediump",
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#0284C7" />
        <pointLight position={[-10, -10, -10]} intensity={1.8} color="#10B981" />
        <pointLight position={[0, 10, -5]} intensity={1.5} color="#22D3EE" />
        <CloudClusterCore />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.7}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

export const ThreeCloudScene = memo(ThreeCloudSceneComponent);
