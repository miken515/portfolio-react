"use client";

import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SceneCanvas, usePrefersReducedMotion } from "./scene-canvas";

type PressMap = { current: Record<string, number> };

const FACE_Z = 0.3;
const now = () => performance.now() / 1000;

const BUTTONS = [
  { id: "A", color: "#22c55e", pos: [0.86, -0.06] },
  { id: "B", color: "#ef4444", pos: [1.08, 0.16] },
  { id: "X", color: "#3b82f6", pos: [0.64, 0.16] },
  { id: "Y", color: "#eab308", pos: [0.86, 0.38] },
] as const;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function FaceButton({
  id,
  color,
  position,
  presses,
}: {
  id: string;
  color: string;
  position: [number, number];
  presses: PressMap;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const dt = now() - (presses.current[id] ?? -10);
    if (mesh.current) mesh.current.position.z = FACE_Z + (dt < 0.14 ? -0.03 : 0);
    if (material.current) material.current.emissiveIntensity = Math.max(0, 2 * (1 - dt / 0.45));
  });

  const press = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    presses.current[id] = now();
  };

  return (
    <mesh
      ref={mesh}
      position={[position[0], position[1], FACE_Z]}
      rotation={[Math.PI / 2, 0, 0]}
      onClick={press}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <cylinderGeometry args={[0.095, 0.095, 0.08, 24]} />
      <meshStandardMaterial ref={material} color={color} emissive={color} emissiveIntensity={0} roughness={0.3} />
    </mesh>
  );
}

function Stick({ position, seed, speed }: { position: [number, number]; seed: number; speed: number }) {
  const stick = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!stick.current) return;
    const t = clock.getElapsedTime() * speed + seed;
    stick.current.rotation.x = Math.PI / 2 + Math.sin(t * 2.3) * 0.35;
    stick.current.rotation.z = Math.cos(t * 1.7) * 0.35;
  });
  return (
    <group position={[position[0], position[1], FACE_Z - 0.02]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.04, 28]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <group ref={stick} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.12, 12]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.13, 0.12, 0.05, 28]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function Controller({ speed, interactive }: { speed: number; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const presses = useRef<Record<string, number>>({});
  const lastAuto = useRef(0);
  const lightBar = useRef<THREE.MeshStandardMaterial>(null);

  const body = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(2.5, 1.25, 0.5), {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 6,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime() * speed;
    const g = group.current;
    if (g) {
      const targetY = interactive ? pointer.x * 0.6 : 0;
      const targetX = -0.45 + (interactive ? -pointer.y * 0.3 : 0);
      g.rotation.y += (targetY + Math.sin(t * 0.6) * 0.15 - g.rotation.y) * 0.06;
      g.rotation.x += (targetX - g.rotation.x) * 0.06;
      g.position.y = Math.sin(t * 1.4) * 0.08;
    }
    // "Someone's playing": mash a random face button every so often
    const n = now();
    if (speed > 0.5 && n - lastAuto.current > 0.45) {
      lastAuto.current = n;
      const b = BUTTONS[Math.floor(Math.random() * BUTTONS.length)];
      presses.current[b.id] = n;
    }
    if (lightBar.current) lightBar.current.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.6;
  });

  return (
    <group ref={group}>
      <mesh geometry={body}>
        <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.1} />
      </mesh>
      {/* grips */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.95, -0.62, -0.02]} rotation={[0, 0, side * 0.5]} scale={[1, 1, 0.75]}>
          <capsuleGeometry args={[0.36, 0.45, 8, 20]} />
          <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.1} />
        </mesh>
      ))}
      {/* d-pad */}
      <group position={[-0.86, 0.16, FACE_Z]}>
        <mesh>
          <boxGeometry args={[0.42, 0.13, 0.07]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.13, 0.42, 0.07]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
      {BUTTONS.map((b) => (
        <FaceButton key={b.id} id={b.id} color={b.color} position={[b.pos[0], b.pos[1]]} presses={presses} />
      ))}
      <Stick position={[-0.42, -0.3]} seed={0} speed={speed} />
      <Stick position={[0.42, -0.3]} seed={2.1} speed={speed} />
      {/* light bar */}
      <mesh position={[0, 0.45, FACE_Z - 0.03]}>
        <boxGeometry args={[0.55, 0.06, 0.04]} />
        <meshStandardMaterial ref={lightBar} color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function Pixels({ speed }: { speed: number }) {
  const group = useRef<THREE.Group>(null);
  const cubes = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        position: [
          Math.sin(i * 2.4) * 3.2,
          Math.cos(i * 1.7) * 1.8,
          -1.5 - (i % 4) * 0.6,
        ] as [number, number, number],
        color: BUTTONS[i % BUTTONS.length].color,
        size: 0.12 + (i % 3) * 0.06,
      })),
    []
  );
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    group.current?.children.forEach((c, i) => {
      c.rotation.x = t * (0.4 + (i % 3) * 0.2);
      c.rotation.y = t * 0.5;
      c.position.y = cubes[i].position[1] + Math.sin(t + i) * 0.15;
    });
  });
  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.4} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function GamingScene() {
  const reduced = usePrefersReducedMotion();
  const speed = reduced ? 0.3 : 1;
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 4.6], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 5]} intensity={1.6} />
      <pointLight position={[-3, -1, 2]} intensity={8} color="#a855f7" />
      <Controller speed={speed} interactive={!reduced} />
      <Pixels speed={speed} />
    </SceneCanvas>
  );
}
