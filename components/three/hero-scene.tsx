"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LookAt, SceneCanvas, usePrefersReducedMotion } from "./scene-canvas";

const COLS = 110;
const ROWS = 60;
const GAP = 0.28;

function Wave({ dark, speed }: { dark: boolean; speed: number }) {
  const points = useRef<THREE.Points>(null);
  // Window-level pointer so the wave reacts even though text sits on top of the canvas.
  const pointer = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3);
    const colors = new Float32Array(COLS * ROWS * 3);
    // Gradient: fairway green -> sky blue -> controller purple
    const stops = dark
      ? [new THREE.Color("#4ade80"), new THREE.Color("#60a5fa"), new THREE.Color("#c084fc")]
      : [new THREE.Color("#15803d"), new THREE.Color("#1d4ed8"), new THREE.Color("#7e22ce")];
    const c = new THREE.Color();
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let col = 0; col < COLS; col++) {
        positions[i * 3] = (col - COLS / 2) * GAP;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r - ROWS / 2) * GAP;
        const t = col / (COLS - 1);
        if (t < 0.5) c.lerpColors(stops[0], stops[1], t * 2);
        else c.lerpColors(stops[1], stops[2], (t - 0.5) * 2);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        i++;
      }
    }
    return { positions, colors };
  }, [dark]);

  useFrame(({ clock }) => {
    const p = points.current;
    if (!p) return;
    const t = clock.getElapsedTime() * speed;
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * 0.05;
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * 0.05;
    const px = smoothed.current.x * 12;
    const pz = -smoothed.current.y * 6;

    const attr = p.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      const x = attr.getX(i);
      const z = attr.getZ(i);
      const dx = x - px;
      const dz = z - pz;
      const ripple = Math.exp(-(dx * dx + dz * dz) * 0.08) * 0.9;
      const y =
        Math.sin(x * 0.45 + t) * 0.35 +
        Math.cos(z * 0.55 + t * 0.8) * 0.3 +
        ripple * Math.sin(t * 3 - Math.sqrt(dx * dx + dz * dz) * 1.5);
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
    p.rotation.y = smoothed.current.x * 0.08;
  });

  return (
    <points ref={points} key={dark ? "dark" : "light"}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={dark ? 0.85 : 0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ dark }: { dark: boolean }) {
  const reduced = usePrefersReducedMotion();
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 4.5, 9], fov: 50 }}>
      <LookAt target={[0, 0, 0]} />
      <Wave dark={dark} speed={reduced ? 0.15 : 0.9} />
    </SceneCanvas>
  );
}
