"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LookAt, SceneCanvas, usePrefersReducedMotion } from "./scene-canvas";
import { toonGradient } from "./toon";

const BALL_R = 0.1;
const TEE = new THREE.Vector3(-3.4, BALL_R + 0.08, 1.3);
const LAND = new THREE.Vector3(0.5, BALL_R, 0.35);
const HOLE = new THREE.Vector3(2, 0, -0.3);

const FLIGHT = 1.9;
const ROLL = 1.4;
const DROP = 0.3;
const PAUSE = 1.4;
const CYCLE = FLIGHT + ROLL + DROP + PAUSE;
const p = new THREE.Vector3(); // scratch vector reused every frame

function Flag({ speed }: { speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.75, 0.45, 14, 6);
    g.translate(0.375, 0, 0); // hinge on the pole
    return g;
  }, []);
  const base = useMemo(() => Float32Array.from(geometry.attributes.position.array), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const g = mesh.current?.geometry;
    if (!g) return;
    const attr = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      const x = base[i * 3];
      attr.setZ(i, Math.sin(x * 7 - t * 6) * 0.07 * (x / 0.75));
    }
    attr.needsUpdate = true;
    g.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[HOLE.x + 0.02, 1.55, HOLE.z]}>
      <meshToonMaterial gradientMap={toonGradient()} color="#ef4444" side={THREE.DoubleSide} />
    </mesh>
  );
}

function Ball({ shot, speed, onHoleOut }: { shot: number; speed: number; onHoleOut: () => void }) {
  const ball = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const start = useRef<number | null>(null);
  const lastShot = useRef(shot);
  const scored = useRef(false);

  useFrame(({ clock }, delta) => {
    const now = clock.getElapsedTime();
    if (start.current === null || lastShot.current !== shot) {
      start.current = now;
      lastShot.current = shot;
      scored.current = false;
    }
    let t = (now - (start.current ?? now)) * speed;
    if (t > CYCLE) {
      start.current = now;
      scored.current = false;
      t = 0;
    }

    if (t < FLIGHT) {
      const u = t / FLIGHT;
      p.lerpVectors(TEE, LAND, u);
      p.y = THREE.MathUtils.lerp(TEE.y, BALL_R, u) + 10 * u * (1 - u) * 0.9;
    } else if (t < FLIGHT + ROLL) {
      const u = (t - FLIGHT) / ROLL;
      const eased = 1 - (1 - u) * (1 - u);
      p.lerpVectors(LAND, HOLE, eased);
      p.y = BALL_R + 0.35 * Math.abs(Math.sin(u * Math.PI * 3)) * Math.pow(1 - u, 4);
    } else if (t < FLIGHT + ROLL + DROP) {
      const u = (t - FLIGHT - ROLL) / DROP;
      p.set(HOLE.x, BALL_R - u * 0.45, HOLE.z);
      if (!scored.current) {
        scored.current = true;
        onHoleOut();
      }
    } else {
      p.set(HOLE.x, -1, HOLE.z);
    }

    if (ball.current) {
      ball.current.position.copy(p);
      if (t < FLIGHT + ROLL) ball.current.rotation.z -= delta * 12 * speed;
    }
    if (shadow.current) {
      const height = Math.max(0, p.y - BALL_R);
      const s = Math.max(0.35, 1 - height / 3);
      shadow.current.position.set(p.x, 0.012, p.z);
      shadow.current.scale.setScalar(s);
      shadow.current.visible = p.y > 0;
    }
  });

  return (
    <>
      <mesh ref={ball} castShadow>
        <icosahedronGeometry args={[BALL_R, 3]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#ffffff" />
      </mesh>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[BALL_R * 1.2, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>
    </>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.6, 8]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#7c4a2d" />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.45, 1.1, 10]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#166534" />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <coneGeometry args={[0.32, 0.8, 10]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#15803d" />
      </mesh>
    </group>
  );
}

function Course({ shot, speed, onHoleOut }: { shot: number; speed: number; onHoleOut: () => void }) {
  return (
    <>
      {/* rough + green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[9, 48]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#2f7d3a" />
      </mesh>
      <mesh position={[1.2, -0.03, -0.2]}>
        <cylinderGeometry args={[2.6, 2.6, 0.08, 64]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#4cbb5e" />
      </mesh>
      {/* sand trap */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, 0.005, -1.4]} scale={[1.6, 0.8, 1]}>
        <circleGeometry args={[0.7, 32]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#e8d8a8" />
      </mesh>
      {/* tee box */}
      <mesh position={[TEE.x, 0.04, TEE.z]}>
        <cylinderGeometry args={[0.025, 0.015, 0.08, 8]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#facc15" />
      </mesh>
      {/* cup, pin */}
      <mesh position={[HOLE.x, 0.012, HOLE.z]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01, 32]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[HOLE.x, 0.9, HOLE.z]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#f5f5f5" />
      </mesh>
      <Flag speed={speed} />
      <Ball shot={shot} speed={speed} onHoleOut={onHoleOut} />

      <Tree position={[-3, 0, -3.2]} scale={1.2} />
      <Tree position={[-1.6, 0, -3.8]} />
      <Tree position={[3.8, 0, -2.6]} scale={1.3} />
      <Tree position={[4.6, 0, -1]} scale={0.9} />
    </>
  );
}

export default function GolfScene({ shot, onHoleOut }: { shot: number; onHoleOut: () => void }) {
  const reduced = usePrefersReducedMotion();
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 3.2, 6.8], fov: 45 }}>
      <LookAt target={[0, 0.4, 0]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} />
      <Course shot={shot} speed={reduced ? 0.4 : 1} onHoleOut={onHoleOut} />
    </SceneCanvas>
  );
}
