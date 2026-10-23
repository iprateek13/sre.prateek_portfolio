"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundFx } from "@/lib/soundFx";
import { 
  ShieldCheck, 
  Cloud, 
  Boxes, 
  Activity, 
  Radio, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Zap, 
  Layers, 
  Sparkles,
  Maximize2
} from "lucide-react";

interface NodeInfo {
  id: string;
  name: string;
  category: string;
  cidr: string;
  status: string;
  metric: string;
  color: string;
  pos: [number, number, number];
}

const NODES_DATA: NodeInfo[] = [
  {
    id: "azure-hub",
    name: "Azure Landing Zone Hub",
    category: "Microsoft Azure (Hub VNet)",
    cidr: "10.0.0.0/16",
    status: "Active (Firewall + Bastion)",
    metric: "99.99% SLA Uptime",
    color: "#0284C7",
    pos: [0, 2.2, 0.4],
  },
  {
    id: "aws-vpc",
    name: "AWS Multi-AZ VPC",
    category: "Amazon Web Services",
    cidr: "172.16.0.0/16",
    status: "Healthy (Cross-Cloud Peered)",
    metric: "3 AZ Subnets Active",
    color: "#06B6D4",
    pos: [2.5, 0.3, 0.8],
  },
  {
    id: "k8s-aks",
    name: "Kubernetes AKS Cluster",
    category: "Container Orchestration",
    cidr: "10.1.0.0/16",
    status: "3 Nodes / Autoscaling",
    metric: "Zero-Downtime Blue-Green",
    color: "#10B981",
    pos: [-2.4, 0.5, 0.9],
  },
  {
    id: "devsecops",
    name: "DevSecOps Security Guardrails",
    category: "Shift-Left Policy",
    cidr: "Checkov / tfsec / Infracost",
    status: "0 Critical Vulns",
    metric: "CI/CD Gate Enforced",
    color: "#A855F7",
    pos: [-1.6, -2.0, 0.5],
  },
  {
    id: "telemetry-core",
    name: "Prometheus & Azure Monitor",
    category: "Observability & SRE",
    cidr: "OpenCost + Grafana",
    status: "Telemetry Ingestion Live",
    metric: "<5ms Latency (MTTR)",
    color: "#F59E0B",
    pos: [1.7, -1.9, 0.6],
  },
];

export function ThreeInfrastructureSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<NodeInfo | null>(null);
  const [mode, setMode] = useState<"topology" | "security" | "traffic">("topology");
  const [isMuted, setIsMuted] = useState(true);
  const [packetCount, setPacketCount] = useState(148);
  const [simulatedThroughput, setSimulatedThroughput] = useState("42.8 Gbps");

  // Reference for 3D state & interactions
  const stateRef = useRef({
    mode: "topology",
    targetRotX: 0,
    targetRotY: 0,
    currRotX: 0,
    currRotY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    burstTime: 0,
    activeNodeId: null as string | null,
    triggerBurst: false,
  });

  useEffect(() => {
    setIsMuted(soundFx.getMuted());
  }, []);

  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 2.0);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(0x06b6d4, 3, 8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- Main Rotating 3D World Group ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Central Holographic Polyhedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreWireMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreWireMat);
    worldGroup.add(coreMesh);

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x082f49,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    worldGroup.add(innerMesh);

    // 2. Dual Concentric Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    ring1.rotation.y = Math.PI / 7;
    worldGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 4;
    worldGroup.add(ring2);

    // 3. DevSecOps Forcefield Shield (Activates in Security Mode)
    const shieldGeo = new THREE.SphereGeometry(2.9, 32, 32);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    worldGroup.add(shieldMesh);

    // 4. Multi-Cloud Interactive Nodes
    const nodeMeshes: { mesh: THREE.Group; data: NodeInfo; pulseRing: THREE.Mesh }[] = [];
    const nodeGroup = new THREE.Group();
    worldGroup.add(nodeGroup);

    NODES_DATA.forEach((node) => {
      const singleNodeGroup = new THREE.Group();
      singleNodeGroup.position.set(...node.pos);

      // Node Core Sphere
      const nGeo = new THREE.SphereGeometry(0.24, 20, 20);
      const nMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nMesh.userData = { nodeId: node.id };
      singleNodeGroup.add(nMesh);

      // Node Outer Orbit Wireframe Ring
      const oGeo = new THREE.TorusGeometry(0.36, 0.015, 12, 32);
      const oMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.8,
      });
      const oRing = new THREE.Mesh(oGeo, oMat);
      singleNodeGroup.add(oRing);

      // Expanding Pulse Ring for hover / burst
      const pGeo = new THREE.RingGeometry(0.28, 0.35, 32);
      const pMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const pRing = new THREE.Mesh(pGeo, pMat);
      singleNodeGroup.add(pRing);

      nodeGroup.add(singleNodeGroup);
      nodeMeshes.push({ mesh: singleNodeGroup, data: node, pulseRing: pRing });
    });

    // 5. Connecting Spline Curves (Hub-to-Spokes & Mesh Network)
    const curveList: THREE.QuadraticBezierCurve3[] = [];
    const lineGroup = new THREE.Group();
    worldGroup.add(lineGroup);

    // Hub node is the first node
    const hubPos = new THREE.Vector3(...NODES_DATA[0].pos);

    for (let i = 1; i < NODES_DATA.length; i++) {
      const spokePos = new THREE.Vector3(...NODES_DATA[i].pos);
      // Midpoint pulled outward for arc effect
      const mid = new THREE.Vector3()
        .addVectors(hubPos, spokePos)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.4);

      const curve = new THREE.QuadraticBezierCurve3(hubPos, mid, spokePos);
      curveList.push(curve);

      const points = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.45,
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(lineMesh);
    }

    // Cross-link between AWS (idx 1) and K8s (idx 2)
    const awsPos = new THREE.Vector3(...NODES_DATA[1].pos);
    const k8sPos = new THREE.Vector3(...NODES_DATA[2].pos);
    const crossMid = new THREE.Vector3()
      .addVectors(awsPos, k8sPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.6);
    const crossCurve = new THREE.QuadraticBezierCurve3(awsPos, crossMid, k8sPos);
    curveList.push(crossCurve);
    const crossLineGeo = new THREE.BufferGeometry().setFromPoints(crossCurve.getPoints(40));
    const crossLineMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35,
    });
    lineGroup.add(new THREE.Line(crossLineGeo, crossLineMat));

    // 6. Traveling Glowing Data Packets along the Curves
    const packetCountPerCurve = 3;
    const packetGroup = new THREE.Group();
    worldGroup.add(packetGroup);

    interface Packet {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }

    const packets: Packet[] = [];
    const pGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const pMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    curveList.forEach((curve, idx) => {
      for (let p = 0; p < packetCountPerCurve; p++) {
        const mesh = new THREE.Mesh(pGeo, pMat.clone());
        packetGroup.add(mesh);
        packets.push({
          curve,
          mesh,
          progress: (p / packetCountPerCurve) + Math.random() * 0.1,
          speed: 0.0035 + (idx % 2) * 0.002,
        });
      }
    });

    // 7. Ambient Particle Nebula Stardust
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const c1 = new THREE.Color("#0284C7");
    const c2 = new THREE.Color("#22D3EE");
    const c3 = new THREE.Color("#10B981");

    for (let i = 0; i < starCount; i++) {
      const r = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    worldGroup.add(starPoints);

    // --- Mouse & Raycasting Controls ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;

      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        const deltaY = e.clientY - stateRef.current.dragStartY;
        stateRef.current.targetRotY += deltaX * 0.005;
        stateRef.current.targetRotX += deltaY * 0.005;
        stateRef.current.dragStartX = e.clientX;
        stateRef.current.dragStartY = e.clientY;
      } else {
        // Subtle tilt parallax
        stateRef.current.targetRotY = x * 0.35;
        stateRef.current.targetRotX = -y * 0.35;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleClick = () => {
      soundFx.playClick();
      // Trigger instant pulse burst
      stateRef.current.triggerBurst = true;
      stateRef.current.burstTime = 1.0;
      soundFx.playPacketBurst();

      setPacketCount((prev) => prev + 12);
      const speeds = ["48.2 Gbps", "54.1 Gbps", "61.8 Gbps", "49.6 Gbps"];
      setSimulatedThroughput(speeds[Math.floor(Math.random() * speeds.length)]);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("click", handleClick);

    // Touch Support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.isDragging = true;
        stateRef.current.dragStartX = e.touches[0].clientX;
        stateRef.current.dragStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - stateRef.current.dragStartX;
        const deltaY = e.touches[0].clientY - stateRef.current.dragStartY;
        stateRef.current.targetRotY += deltaX * 0.008;
        stateRef.current.targetRotX += deltaY * 0.008;
        stateRef.current.dragStartX = e.touches[0].clientX;
        stateRef.current.dragStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation interpolation
      stateRef.current.currRotX +=
        (stateRef.current.targetRotX - stateRef.current.currRotX) * 0.08;
      stateRef.current.currRotY +=
        (stateRef.current.targetRotY - stateRef.current.currRotY) * 0.08;

      worldGroup.rotation.x = stateRef.current.currRotX;
      // Auto continuous slow spin + mouse rotation
      worldGroup.rotation.y = elapsedTime * 0.18 + stateRef.current.currRotY;

      // Inner and Core rotation
      coreMesh.rotation.y = -elapsedTime * 0.3;
      coreMesh.rotation.x = elapsedTime * 0.15;
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.y = -elapsedTime * 0.35;

      // Security Mode Shield Pulsing
      if (stateRef.current.mode === "security") {
        shieldMesh.visible = true;
        shieldMesh.rotation.y = elapsedTime * 0.6;
        (shieldMat as THREE.MeshBasicMaterial).opacity =
          0.18 + Math.sin(elapsedTime * 3) * 0.08;
      } else {
        shieldMesh.visible = false;
      }

      // Traveling Packets
      const speedMultiplier = stateRef.current.mode === "traffic" ? 2.5 : 1.0;
      packets.forEach((p) => {
        p.progress = (p.progress + p.speed * speedMultiplier) % 1;
        const pos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pos);
      });

      // Node Pulse Rings & Self-Rotation
      nodeMeshes.forEach(({ mesh, pulseRing }) => {
        // Billboard rings facing camera
        pulseRing.lookAt(camera.position);

        if (stateRef.current.burstTime > 0) {
          pulseRing.scale.setScalar(1 + (1 - stateRef.current.burstTime) * 1.5);
          (pulseRing.material as THREE.MeshBasicMaterial).opacity =
            stateRef.current.burstTime * 0.8;
        } else {
          (pulseRing.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      });

      if (stateRef.current.burstTime > 0) {
        stateRef.current.burstTime = Math.max(0, stateRef.current.burstTime - delta * 1.8);
      }

      // Raycasting for Node Hover
      raycaster.setFromCamera(mouse, camera);
      const interactiveTargets: THREE.Object3D[] = [];
      nodeMeshes.forEach((n) => {
        const coreSphere = n.mesh.children[0];
        if (coreSphere) interactiveTargets.push(coreSphere);
      });

      const intersects = raycaster.intersectObjects(interactiveTargets, false);

      if (intersects.length > 0) {
        const hitNodeId = intersects[0].object.userData.nodeId;
        if (stateRef.current.activeNodeId !== hitNodeId) {
          stateRef.current.activeNodeId = hitNodeId;
          const found = NODES_DATA.find((n) => n.id === hitNodeId) || null;
          setActiveNode(found);
          soundFx.playHover();
        }
      } else {
        if (stateRef.current.activeNodeId !== null) {
          stateRef.current.activeNodeId = null;
          setActiveNode(null);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleResetCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    stateRef.current.targetRotX = 0;
    stateRef.current.targetRotY = 0;
    soundFx.playClick();
  };

  const handleSimulateBurst = (e: React.MouseEvent) => {
    e.stopPropagation();
    stateRef.current.burstTime = 1.0;
    soundFx.playPacketBurst();
    setPacketCount((p) => p + 25);
    const speeds = ["58.4 Gbps", "63.2 Gbps", "72.0 Gbps", "52.9 Gbps"];
    setSimulatedThroughput(speeds[Math.floor(Math.random() * speeds.length)]);
  };

  return (
    <div className="relative w-full rounded-3xl bg-dark-900/90 border border-azure-500/40 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden group">
      {/* Background Radial Glow */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-azure-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-azure-500/20 text-cyan-400 border border-azure-500/40 animate-pulse">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-white">
                Multi-Cloud HoloMesh 3D
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                Three.js WebGL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Interactive 360° SRE Architecture Constellation
            </p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Telemetry</span>
          </div>

          {/* Sound Mute/Unmute Button */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? "bg-dark-800 border-slate-700 text-slate-400 hover:text-white"
                : "bg-azure-500/20 border-azure-400 text-cyan-300 shadow-azure-glow"
            }`}
            title={isMuted ? "Unmute SRE Sci-Fi Audio" : "Mute Audio"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset Camera Button */}
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
            title="Reset Camera View"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switcher Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 pb-2 relative z-20">
        <div className="flex items-center gap-1.5 bg-dark-950/80 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              setMode("topology");
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              mode === "topology"
                ? "bg-azure-600 text-white shadow-azure-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Topology</span>
          </button>

          <button
            onClick={() => {
              setMode("security");
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              mode === "security"
                ? "bg-purple-600 text-white shadow-violet-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DevSecOps Shield</span>
          </button>

          <button
            onClick={() => {
              setMode("traffic");
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              mode === "traffic"
                ? "bg-emerald-600 text-white shadow-emerald-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>High-Throughput</span>
          </button>
        </div>

        {/* Pulse Burst Trigger */}
        <button
          onClick={handleSimulateBurst}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-azure-500 to-cyan-500 hover:from-azure-400 hover:to-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-azure-glow transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Simulate Packet Burst</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing relative z-10 flex items-center justify-center select-none"
      >
        {/* Interactive Hover Holographic Tooltip */}
        {activeNode && (
          <div
            className="absolute top-4 left-4 z-30 p-3.5 rounded-2xl bg-dark-950/95 border border-cyan-400/60 shadow-cyan-glow backdrop-blur-xl max-w-xs transition-all pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: activeNode.color }}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                {activeNode.category}
              </span>
            </div>
            <h4 className="font-heading font-extrabold text-sm text-white mb-1">
              {activeNode.name}
            </h4>
            <div className="space-y-0.5 text-xs font-mono text-slate-300">
              <div className="text-slate-400">CIDR: <span className="text-cyan-400">{activeNode.cidr}</span></div>
              <div className="text-emerald-400 font-semibold">{activeNode.status}</div>
              <div className="text-[11px] text-amber-400">{activeNode.metric}</div>
            </div>
          </div>
        )}

        {/* Instruction overlay badge */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-dark-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>Click & Drag to rotate 3D mesh • Hover nodes for stats</span>
        </div>
      </div>

      {/* Bottom Live Metrics Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 relative z-20 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Topology SLA</div>
          <div className="font-bold text-emerald-400">99.99% Uptime</div>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Throughput</div>
          <div className="font-bold text-cyan-400">{simulatedThroughput}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Active Mesh</div>
          <div className="font-bold text-azure-300">5 Cloud Nodes</div>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase">Packets Ingested</div>
          <div className="font-bold text-purple-400">{packetCount}k telemetry</div>
        </div>
      </div>
    </div>
  );
}
