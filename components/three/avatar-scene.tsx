"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LookAt, SceneCanvas, usePrefersReducedMotion } from "./scene-canvas";
import { Toon } from "./toon";

// Palette taken from Mike's photo
const SKIN = "#e8b58d";
const SKIN_SHADE = "#d99c74";
const HAIR = "#1d1b24";
const SHIRT = "#aeb2ba";
const SHIRT_DARK = "#8f949e";
const IRIS = "#3b2a22";
const MOUTH = "#7c2f33";
const INK = "#2b211c";

const HEAD_Y = 1.42;

/** Pointer position over the whole window, so the avatar watches the cursor anywhere on the page. */
function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Eye({ side }: { side: 1 | -1 }) {
  return (
    <group position={[side * 0.2, -0.02, 0.48]} rotation={[0, side * 0.38, 0]}>
      {/* sclera */}
      <mesh scale={[1, 1.15, 1]}>
        <circleGeometry args={[0.105, 32]} />
        <meshBasicMaterial color="#fffdf8" />
      </mesh>
      {/* iris + pupil */}
      <mesh position={[side * -0.01, -0.012, 0.004]} scale={[1, 1.22, 1]}>
        <circleGeometry args={[0.078, 32]} />
        <meshBasicMaterial color={IRIS} />
      </mesh>
      <mesh position={[side * -0.01, -0.012, 0.006]} scale={[1, 1.2, 1]}>
        <circleGeometry args={[0.038, 24]} />
        <meshBasicMaterial color="#120c0a" />
      </mesh>
      {/* anime sparkle highlights */}
      <mesh position={[side * -0.04 + 0.012, 0.035, 0.009]}>
        <circleGeometry args={[0.026, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[side * 0.025, -0.05, 0.009]}>
        <circleGeometry args={[0.012, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* upper lash line */}
      <mesh position={[0, 0.005, 0.01]} rotation={[0, 0, side === 1 ? 0.05 : -0.05]} scale={[1.05, 1.2, 1]}>
        <torusGeometry args={[0.105, 0.017, 6, 24, Math.PI]} />
        <meshBasicMaterial color={INK} />
      </mesh>
    </group>
  );
}

function Face({ eyes }: { eyes: React.RefObject<THREE.Group | null> }) {
  return (
    <>
      <group ref={eyes}>
        <Eye side={-1} />
        <Eye side={1} />
      </group>
      {/* brows */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.2, 0.17, 0.47]} rotation={[0, s * 0.38, s * -0.12]}>
          <boxGeometry args={[0.16, 0.028, 0.01]} />
          <meshBasicMaterial color={HAIR} />
        </mesh>
      ))}
      {/* nose */}
      <mesh position={[0, -0.12, 0.505]} scale={[1, 0.7, 0.6]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshToonMaterial color={SKIN_SHADE} />
      </mesh>
      {/* big open smile with teeth */}
      <group position={[0, -0.235, 0.462]} rotation={[0.25, 0, 0]}>
        <mesh scale={[1.15, 0.85, 1]}>
          <circleGeometry args={[0.125, 32, Math.PI, Math.PI]} />
          <meshBasicMaterial color={MOUTH} />
        </mesh>
        <mesh position={[0, -0.016, 0.002]}>
          <planeGeometry args={[0.25, 0.036]} />
          <meshBasicMaterial color="#fffaf2" />
        </mesh>
        <mesh position={[0, -0.075, 0.002]} scale={[1.4, 0.6, 1]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#e0707a" />
        </mesh>
      </group>
      {/* blush */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.31, -0.16, 0.405]} rotation={[0, s * 0.62, 0]} scale={[1.3, 0.7, 1]}>
          <circleGeometry args={[0.06, 20]} />
          <meshBasicMaterial color="#f39a9a" transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

function Hair() {
  // Choppy fringe: [x, centerY, z, sweep (tilt z), length]
  const fringe: [number, number, number, number, number][] = [
    [-0.4, 0.33, 0.33, 0.25, 0.26],
    [-0.27, 0.37, 0.42, -0.05, 0.31],
    [-0.13, 0.38, 0.46, -0.12, 0.34],
    [0.01, 0.38, 0.47, -0.18, 0.3],
    [0.15, 0.38, 0.46, -0.22, 0.34],
    [0.28, 0.37, 0.42, -0.28, 0.29],
    [0.41, 0.33, 0.33, -0.4, 0.24],
  ];
  // Short textured tufts poking up from the crown: [x, y, z, tiltX, tiltZ]
  const tufts: [number, number, number, number, number][] = [
    [-0.26, 0.62, 0.08, -0.55, 0.35],
    [-0.06, 0.68, 0.1, -0.45, 0.1],
    [0.14, 0.67, 0.06, -0.5, -0.15],
    [0.32, 0.6, 0.02, -0.6, -0.4],
  ];
  return (
    <group>
      {/* close-cropped back and sides */}
      <Toon color={HAIR} position={[0, 0.06, -0.04]} rotation={[-0.6, 0, 0]} scale={[0.98, 1, 1]} outline={0.03}>
        <sphereGeometry args={[0.575, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </Toon>
      {/* fuller volume on top */}
      <Toon color={HAIR} position={[0, 0.27, 0.03]} scale={[1.06, 0.85, 1.02]} outline={0.03}>
        <sphereGeometry args={[0.52, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </Toon>
      {fringe.map(([x, y, z, sweep, len], i) => (
        <Toon key={`f${i}`} color={HAIR} position={[x, y, z]} rotation={[Math.PI - 0.38, 0, sweep]} outline={0.05}>
          <coneGeometry args={[0.12, len, 6]} />
        </Toon>
      ))}
      {tufts.map(([x, y, z, tx, tz], i) => (
        <Toon key={`t${i}`} color={HAIR} position={[x, y, z]} rotation={[tx, 0, tz]} outline={0.06}>
          <coneGeometry args={[0.11, 0.2, 6]} />
        </Toon>
      ))}
      {/* short sideburns */}
      {[-1, 1].map((s) => (
        <Toon key={s} color={HAIR} position={[s * 0.52, 0.02, 0.1]} rotation={[Math.PI, 0, s * -0.1]} outline={0.06}>
          <coneGeometry args={[0.07, 0.2, 6]} />
        </Toon>
      ))}
    </group>
  );
}

function Arm({
  side,
  shoulder,
  elbow,
}: {
  side: 1 | -1;
  shoulder: React.RefObject<THREE.Group | null>;
  elbow: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={shoulder} position={[side * 0.38, 0.74, 0]} rotation={[0, 0, side * 0.2]}>
      <Toon color={SHIRT} position={[0, -0.1, 0]}>
        <capsuleGeometry args={[0.125, 0.1, 6, 16]} />
      </Toon>
      <group ref={elbow} position={[0, -0.22, 0]}>
        <Toon color={SKIN} position={[0, -0.13, 0]}>
          <capsuleGeometry args={[0.08, 0.2, 6, 12]} />
        </Toon>
        <Toon color={SKIN} position={[0, -0.32, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </Toon>
      </group>
    </group>
  );
}

function Mike({ speed }: { speed: number }) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const shoulderL = useRef<THREE.Group>(null);
  const elbowL = useRef<THREE.Group>(null);
  const shoulderR = useRef<THREE.Group>(null);
  const elbowR = useRef<THREE.Group>(null);
  const pointer = useWindowPointer();

  const state = useRef({ nextBlink: 2, blinkStart: -1, waveStart: 0.8, hopStart: -10, wave: 0, greet: false });

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const s = state.current;
    if (s.greet) {
      s.greet = false;
      s.waveStart = t;
      s.hopStart = t;
    }

    // idle breathing + bob
    if (root.current) {
      const hopT = t - s.hopStart;
      const hop = hopT < 0.5 ? Math.sin((hopT / 0.5) * Math.PI) * 0.25 : 0;
      root.current.position.y = Math.sin(t * 2 * speed) * 0.015 + hop;
    }
    if (torso.current) torso.current.scale.set(1, 1 + Math.sin(t * 2 * speed) * 0.012, 1);

    // head follows the cursor
    if (head.current) {
      const ty = pointer.current.x * 0.55;
      const tx = -pointer.current.y * 0.25;
      head.current.rotation.y += (ty - head.current.rotation.y) * 0.08;
      head.current.rotation.x += (tx - head.current.rotation.x) * 0.08;
      head.current.rotation.z = Math.sin(t * 1.3 * speed) * 0.03;
    }

    // blink every few seconds
    if (t > s.nextBlink) {
      s.blinkStart = t;
      s.nextBlink = t + 2.2 + Math.random() * 3;
    }
    if (eyes.current) {
      const b = t - s.blinkStart;
      eyes.current.scale.y = b >= 0 && b < 0.14 ? Math.max(0.08, Math.abs(Math.cos((b / 0.14) * Math.PI))) : 1;
    }

    // wave every ~8s (and whenever clicked)
    if (speed > 0.5 && t - s.waveStart > 8) s.waveStart = t;
    const wt = t - s.waveStart;
    const target = wt >= 0 && wt < 2.2 ? 1 : 0;
    s.wave += (target - s.wave) * Math.min(1, delta * 6);
    if (shoulderR.current && elbowR.current) {
      shoulderR.current.rotation.z = THREE.MathUtils.lerp(0.2, 2.55, s.wave);
      elbowR.current.rotation.z = s.wave * (0.35 + Math.sin(t * 11) * 0.45);
    }
    if (shoulderL.current && elbowL.current) {
      shoulderL.current.rotation.z = -0.2 - Math.sin(t * 2 * speed) * 0.03;
      elbowL.current.rotation.z = -0.15;
    }
  });


  return (
    <group
      ref={root}
      onClick={(e) => {
        e.stopPropagation();
        state.current.greet = true;
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <group ref={torso}>
        <Toon color={SHIRT} position={[0, 0.42, 0]} scale={[1.15, 1, 0.82]}>
          <capsuleGeometry args={[0.34, 0.32, 8, 24]} />
        </Toon>
        <mesh position={[0, 0.86, 0.02]} rotation={[Math.PI / 2 - 0.15, 0, 0]}>
          <torusGeometry args={[0.13, 0.03, 8, 24]} />
          <meshToonMaterial color={SHIRT_DARK} />
        </mesh>
      </group>
      <Toon color={SKIN} position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.16, 16]} />
      </Toon>
      <Arm side={-1} shoulder={shoulderL} elbow={elbowL} />
      <Arm side={1} shoulder={shoulderR} elbow={elbowR} />

      <group ref={head} position={[0, HEAD_Y, 0]}>
        <Toon color={SKIN} scale={[1, 0.96, 0.92]}>
          <sphereGeometry args={[0.55, 48, 32]} />
        </Toon>
        {/* softer anime chin */}
        <Toon color={SKIN} position={[0, -0.2, 0.06]} scale={[1, 0.78, 0.9]} outline={0.02}>
          <sphereGeometry args={[0.37, 32, 24]} />
        </Toon>
        {[-1, 1].map((s) => (
          <Toon key={s} color={SKIN} position={[s * 0.53, -0.04, -0.02]} scale={[0.5, 1, 0.8]}>
            <sphereGeometry args={[0.11, 16, 16]} />
          </Toon>
        ))}
        <Face eyes={eyes} />
        <Hair />
      </group>
    </group>
  );
}

export default function AvatarScene() {
  const reduced = usePrefersReducedMotion();
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 1.15, 4.4], fov: 32 }}>
      <LookAt target={[0, 1.08, 0]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[-2, 3, 4]} intensity={2.2} />
      <directionalLight position={[3, 1, -2]} intensity={0.6} color="#ffd7a8" />
      <Mike speed={reduced ? 0.3 : 1} />
    </SceneCanvas>
  );
}
