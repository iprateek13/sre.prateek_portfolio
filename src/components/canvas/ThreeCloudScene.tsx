"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CloudMeshCanvas } from "./CloudMeshCanvas";

// Floating Glowing 3D Cloud Node Component
function GlowingCloudNode({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * (speed * 1.2);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Wireframe Geometric Torus Knot Mesh
function WireframeTorusMesh() {
  const torusRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.y += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y -= delta * 0.25;
      outerRingRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Floating Torus Knot Wireframe Mesh */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[1.5, 0.45, 128, 32, 2, 3]} />
          <meshStandardMaterial
            color="#0284C7"
            wireframe
            emissive="#0284C7"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Concentric Wireframe Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.5, 0.06, 16, 100]} />
          <meshStandardMaterial
            color="#22D3EE"
            wireframe
            emissive="#22D3EE"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Dynamic Orbiting Point Lights Component
function OrbitingPointLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.7) * 6;
      light1Ref.current.position.y = Math.cos(t * 0.5) * 5;
      light1Ref.current.position.z = Math.cos(t * 0.7) * 6;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 0.6) * -6;
      light2Ref.current.position.y = Math.sin(t * 0.8) * 4;
      light2Ref.current.position.z = Math.sin(t * 0.6) * 6;
    }
    if (light3Ref.current) {
      light3Ref.current.position.x = Math.sin(t * 0.9) * 5;
      light3Ref.current.position.y = Math.sin(t * 0.4) * -5;
      light3Ref.current.position.z = Math.cos(t * 0.9) * -5;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} intensity={3.5} color="#0284C7" distance={15} />
      <pointLight ref={light2Ref} intensity={3} color="#22D3EE" distance={15} />
      <pointLight ref={light3Ref} intensity={3.2} color="#10B981" distance={15} />
    </>
  );
}

// Mouse Camera Rotation Controller
function CameraMouseController() {
  const { camera } = useThree();

  useFrame((state) => {
    const mouseX = state.mouse.x * 1.8;
    const mouseY = state.mouse.y * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Particle Field Backdrop
function ParticleField() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 18;
      pos[i + 1] = (Math.random() - 0.5) * 18;
      pos[i + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
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
  );
}

export function ThreeCloudScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);

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
  }, []);

  if (!mounted) return null;

  if (!hasWebGL) {
    return <CloudMeshCanvas />;
  }

  // Floating Glowing 3D Cloud Nodes Placement
  const cloudNodes = [
    { position: [-3.2, 2.1, -1.5] as [number, number, number], color: "#0284C7", size: 0.32, speed: 0.4 },
    { position: [3.4, -1.8, 1.2] as [number, number, number], color: "#22D3EE", size: 0.28, speed: 0.5 },
    { position: [-2.8, -2.2, -2.1] as [number, number, number], color: "#10B981", size: 0.35, speed: 0.35 },
    { position: [2.9, 2.5, -1.8] as [number, number, number], color: "#38BDF8", size: 0.3, speed: 0.45 },
    { position: [-4.1, 0.4, 1.6] as [number, number, number], color: "#34D399", size: 0.26, speed: 0.6 },
    { position: [4.2, 0.2, -2.4] as [number, number, number], color: "#06B6D4", size: 0.34, speed: 0.4 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-85 pointer-events-none lg:pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
        <ambientLight intensity={0.7} />

        {/* Dynamic Point Lights */}
        <OrbitingPointLights />

        {/* Wireframe Geometric Torus Mesh */}
        <WireframeTorusMesh />

        {/* Floating Glowing 3D Cloud Nodes */}
        {cloudNodes.map((node, idx) => (
          <GlowingCloudNode key={idx} {...node} />
        ))}

        {/* Particle Backdrop */}
        <ParticleField />

        {/* Interactive Mouse Camera Rotation */}
        <CameraMouseController />

        {/* Orbit Controls with Damping */}
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
