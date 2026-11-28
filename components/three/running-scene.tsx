"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { LookAt, SceneCanvas, usePrefersReducedMotion } from "./scene-canvas";
import { toonGradient } from "./toon";

const THIGH = 0.48;
const SHIN = 0.48;
const UPPER_ARM = 0.34;
const FOREARM = 0.32;
const HIP_Y = THIGH + SHIN + 0.04;
const STRIDE = 9; // radians per second of the gait cycle

const SKIN = "#e0b48a";
const SHIRT = "#f97316";
const SHORTS = "#1e293b";
const SHOE = "#22d3ee";

function Segment({ length, radius, color }: { length: number; radius: number; color: string }) {
  return (
    <mesh position={[0, -length / 2, 0]}>
      <capsuleGeometry args={[radius, Math.max(0.01, length - radius * 2), 4, 10]} />
      <meshToonMaterial gradientMap={toonGradient()} color={color} />
    </mesh>
  );
}

function Runner({ speed }: { speed: number }) {
  const root = useRef<THREE.Group>(null);
  const hipL = useRef<THREE.Group>(null);
  const kneeL = useRef<THREE.Group>(null);
  const hipR = useRef<THREE.Group>(null);
  const kneeR = useRef<THREE.Group>(null);
  const shoulderL = useRef<THREE.Group>(null);
  const shoulderR = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const phase = clock.getElapsedTime() * STRIDE * speed;
    const leg = (hip: THREE.Group | null, knee: THREE.Group | null, p: number) => {
      if (!hip || !knee) return;
      // +z rotation swings the foot toward +x (running direction)
      hip.rotation.z = 0.75 * Math.sin(p);
      knee.rotation.z = -(0.15 + 1.35 * Math.max(0, Math.cos(p)));
    };
    leg(hipL.current, kneeL.current, phase);
    leg(hipR.current, kneeR.current, phase + Math.PI);
    if (shoulderL.current) shoulderL.current.rotation.z = -0.75 * Math.sin(phase);
    if (shoulderR.current) shoulderR.current.rotation.z = 0.75 * Math.sin(phase);
    if (root.current) root.current.position.y = 0.07 * Math.abs(Math.cos(phase));
  });

  const arm = (ref: RefObject<THREE.Group | null>, z: number) => (
    <group ref={ref} position={[0, 0.56, z]}>
      <Segment length={UPPER_ARM} radius={0.05} color={SKIN} />
      <group position={[0, -UPPER_ARM, 0]} rotation={[0, 0, 1.4]}>
        <Segment length={FOREARM} radius={0.045} color={SKIN} />
      </group>
    </group>
  );

  const legJSX = (hip: RefObject<THREE.Group | null>, knee: RefObject<THREE.Group | null>, z: number) => (
    <group ref={hip} position={[0, HIP_Y, z]}>
      <Segment length={THIGH} radius={0.075} color={SHORTS} />
      <group ref={knee} position={[0, -THIGH, 0]}>
        <Segment length={SHIN} radius={0.06} color={SKIN} />
        <mesh position={[0.06, -SHIN - 0.02, 0]}>
          <boxGeometry args={[0.24, 0.08, 0.11]} />
          <meshToonMaterial gradientMap={toonGradient()} color={SHOE} />
        </mesh>
      </group>
    </group>
  );

  return (
    <group ref={root}>
      {legJSX(hipL, kneeL, 0.1)}
      {legJSX(hipR, kneeR, -0.1)}
      {/* torso leans slightly into the run */}
      <group position={[0, HIP_Y, 0]} rotation={[0, 0, -0.14]}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.15, 0.36, 4, 12]} />
          <meshToonMaterial gradientMap={toonGradient()} color={SHIRT} />
        </mesh>
        <mesh position={[0, 0.82, 0]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshToonMaterial gradientMap={toonGradient()} color={SKIN} />
        </mesh>
        {/* headband */}
        <mesh position={[0, 0.86, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.135, 0.022, 8, 24]} />
          <meshToonMaterial gradientMap={toonGradient()} color={SHOE} />
        </mesh>
        {arm(shoulderL, 0.2)}
        {arm(shoulderR, -0.2)}
      </group>
    </group>
  );
}

const wrap = (v: number, span: number) => ((v % span) + span) % span - span / 2;

function Scenery({ speed }: { speed: number }) {
  const dashes = useRef<THREE.Group>(null);
  const trees = useRef<THREE.Group>(null);
  const hills = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const move = (g: THREE.Group | null, velocity: number, span: number, gap: number) => {
      g?.children.forEach((child, i) => {
        child.position.x = wrap(i * gap - t * velocity, span);
      });
    };
    move(dashes.current, 3.2, 14, 1.4);
    move(trees.current, 2.2, 16, 2.7);
    move(hills.current, 0.5, 24, 6);
  });

  return (
    <>
      {/* road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 1.6]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#475569" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -3]}>
        <planeGeometry args={[30, 5]} />
        <meshToonMaterial gradientMap={toonGradient()} color="#65a30d" />
      </mesh>
      <group ref={dashes}>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[0, 0.005, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.6, 0.06]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
        ))}
      </group>
      <group ref={trees}>
        {Array.from({ length: 6 }, (_, i) => (
          <group key={i} position={[0, 0, -1.6 - (i % 2) * 0.8]} scale={0.8 + (i % 3) * 0.2}>
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.5, 6]} />
              <meshToonMaterial gradientMap={toonGradient()} color="#78350f" />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <icosahedronGeometry args={[0.38, 0]} />
              <meshToonMaterial gradientMap={toonGradient()} color={i % 2 ? "#15803d" : "#16a34a"} />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={hills}>
        {Array.from({ length: 4 }, (_, i) => (
          <mesh key={i} position={[0, -0.4, -5]} scale={[2.2, 1 + (i % 2) * 0.5, 1]}>
            <sphereGeometry args={[1.3, 16, 12]} />
            <meshToonMaterial gradientMap={toonGradient()} color="#4d7c0f" />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function RunningScene() {
  const reduced = usePrefersReducedMotion();
  const speed = reduced ? 0.3 : 1;
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [1.6, 1.5, 4.6], fov: 45 }}>
      <LookAt target={[0, 0.9, 0]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <Runner speed={speed} />
      <Scenery speed={speed} />
    </SceneCanvas>
  );
}
