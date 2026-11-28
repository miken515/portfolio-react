"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./scene-canvas";
import { Toon } from "./toon";

/**
 * A hand-painted countryside that the camera walks through as the page scrolls:
 * a winding dirt path, wind-blown grass, round toon trees, a cottage, rolling hills,
 * drifting clouds, and either floating dandelion fluff (day) or fireflies and stars (night).
 */

type Palette = {
  fog: string;
  ground: string;
  path: string;
  grassBase: string;
  grassTip: string;
  hills: string[];
  mountains: string;
  foliage: string[];
  trunk: string;
  cloud: string;
  sky: string;
  sun: string;
  hemiSky: string;
  hemiGround: string;
  sunIntensity: number;
  particles: string;
};

const DAY: Palette = {
  fog: "#d9ecef",
  ground: "#8dbf63",
  path: "#d9c08c",
  grassBase: "#4f8c3a",
  grassTip: "#b9e07a",
  hills: ["#7fb257", "#6aa24c", "#93c46a", "#5e9645"],
  mountains: "#a9c6d6",
  foliage: ["#4e8f3f", "#5fa44a", "#3f7a36"],
  trunk: "#7a5236",
  cloud: "#ffffff",
  sky: "#fff4cf",
  sun: "#fff1b8",
  hemiSky: "#e8f6ff",
  hemiGround: "#9ac06a",
  sunIntensity: 2.2,
  particles: "#fffbe8",
};

const NIGHT: Palette = {
  fog: "#1e2b50",
  ground: "#2c4a3e",
  path: "#5d5a6e",
  grassBase: "#1d3a32",
  grassTip: "#4f7f62",
  hills: ["#24433d", "#1f3b37", "#2a4c44", "#1b3531"],
  mountains: "#24335a",
  foliage: ["#1f4a3d", "#265646", "#183c33"],
  trunk: "#3d2f2e",
  cloud: "#8d9bc4",
  sky: "#f6f1d8",
  sun: "#f4f0da",
  hemiSky: "#5a6fa8",
  hemiGround: "#1b2c28",
  sunIntensity: 0.9,
  particles: "#ffe27a",
};

// The trail the camera follows, from the front gate to the far hills.
const PATH = new THREE.CatmullRomCurve3(
  [
    [0, 0, 16],
    [1.5, 0, 8],
    [-1, 0, 0],
    [-3, 0, -9],
    [0, 0, -18],
    [3, 0, -27],
    [1, 0, -36],
    [-2, 0, -45],
    [0, 0, -55],
    [1, 0, -64],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z))
);

/** deterministic pseudo-random so the landscape is identical on every visit */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function pathOffset(t: number, side: number, dist: number) {
  const p = PATH.getPointAt(t);
  const tan = PATH.getTangentAt(t);
  return new THREE.Vector3(p.x + tan.z * side * dist, 0, p.z - tan.x * side * dist);
}

function DirtPath({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const segs = 160;
    const width = 0.9;
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const p = PATH.getPointAt(t);
      const tan = PATH.getTangentAt(t);
      const nx = tan.z;
      const nz = -tan.x;
      const w = width * (0.85 + 0.15 * Math.sin(i * 0.7));
      pos.push(p.x + nx * w, 0.02, p.z + nz * w, p.x - nx * w, 0.02, p.z - nz * w);
      if (i < segs) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geometry}>
      <meshToonMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

const grassVertex = /* glsl */ `
  #include <fog_pars_vertex>
  uniform float uTime;
  varying float vH;
  void main() {
    vec4 world = instanceMatrix * vec4(position, 1.0);
    vH = uv.y;
    float gust = sin(uTime * 1.6 + world.x * 0.35 + world.z * 0.25) * 0.5 + sin(uTime * 0.7 + world.z * 0.1) * 0.5;
    world.x += gust * 0.22 * vH * vH;
    world.z += gust * 0.08 * vH * vH;
    vec4 mvPosition = modelViewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;
const grassFragment = /* glsl */ `
  #include <fog_pars_fragment>
  uniform vec3 uBase;
  uniform vec3 uTip;
  varying float vH;
  void main() {
    gl_FragColor = vec4(mix(uBase, uTip, smoothstep(0.0, 1.0, vH)), 1.0);
    #include <fog_fragment>
  }
`;

function Grass({ base, tip, speed }: { base: string; tip: string; speed: number }) {
  const COUNT = 5000;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.09, 0.7, 1, 4);
    g.translate(0, 0.35, 0);
    // taper to a point
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) * (1 - p.getY(i) / 0.75));
    return g;
  }, []);
  const uniforms = useMemo(
    () =>
      THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        { uTime: { value: 0 }, uBase: { value: new THREE.Color() }, uTip: { value: new THREE.Color() } },
      ]),
    []
  );

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const o = new THREE.Object3D();
    for (let i = 0; i < COUNT; i++) {
      const t = rand(i) * 0.98;
      const side = rand(i + 9999) > 0.5 ? 1 : -1;
      const d = 1.1 + Math.pow(rand(i + 4242), 1.6) * 14;
      const p = pathOffset(t, side, d);
      o.position.set(p.x + (rand(i + 7) - 0.5), 0, p.z + (rand(i + 8) - 0.5));
      o.rotation.set(0, rand(i + 3) * Math.PI, 0);
      const s = 0.6 + rand(i + 5) * 0.9;
      o.scale.set(s, s, s);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    const mat = material.current;
    if (!mat) return;
    mat.uniforms.uTime.value = clock.getElapsedTime() * speed;
    (mat.uniforms.uBase.value as THREE.Color).set(base);
    (mat.uniforms.uTip.value as THREE.Color).set(tip);
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, COUNT]} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        fog
      />
    </instancedMesh>
  );
}

function Tree({ position, scale, colors, trunk, seed }: {
  position: THREE.Vector3;
  scale: number;
  colors: string[];
  trunk: string;
  seed: number;
}) {
  const blobs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        pos: [
          (rand(seed + i) - 0.5) * 1.4,
          2.1 + rand(seed + i + 10) * 0.9,
          (rand(seed + i + 20) - 0.5) * 1.2,
        ] as [number, number, number],
        r: 0.7 + rand(seed + i + 30) * 0.5,
        color: colors[i % colors.length],
      })),
    [seed, colors]
  );
  return (
    <group position={position} scale={scale}>
      <Toon color={trunk} position={[0, 1, 0]} outline={0.06}>
        <cylinderGeometry args={[0.16, 0.26, 2, 8]} />
      </Toon>
      {blobs.map((b, i) => (
        <Toon key={i} color={b.color} position={b.pos} outline={0.03}>
          <icosahedronGeometry args={[b.r, 2]} />
        </Toon>
      ))}
    </group>
  );
}

function Cottage({ dark }: { dark: boolean }) {
  const pos = pathOffset(0.27, -1, 5.5);
  return (
    <group position={pos} rotation={[0, 0.6, 0]}>
      <Toon color="#f3e6c8" position={[0, 0.8, 0]}>
        <boxGeometry args={[2.4, 1.6, 1.8]} />
      </Toon>
      {/* gabled roof */}
      <Toon color="#c9573f" position={[0, 2.05, 0]} rotation={[0, 0, Math.PI / 4]} outline={0.03}>
        <boxGeometry args={[1.85, 1.85, 2.1]} />
      </Toon>
      <Toon color="#8a6a55" position={[0.7, 2.6, 0.3]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
      </Toon>
      {/* door + windows (warm glow at night) */}
      <mesh position={[-0.5, 0.5, 0.91]}>
        <planeGeometry args={[0.45, 0.8]} />
        <meshBasicMaterial color="#6b4a33" />
      </mesh>
      {[0.35, 0.85].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.91]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial color={dark ? "#ffd27a" : "#9fd0e6"} toneMapped={false} />
        </mesh>
      ))}
      {dark && <pointLight position={[0.6, 1, 1.6]} intensity={6} distance={7} color="#ffbe5c" />}
    </group>
  );
}

function Cloud({ seed, color }: { seed: number; color: string }) {
  const puffs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        pos: [(i - 2.5) * 1.3 + rand(seed + i) * 0.6, rand(seed + i + 50) * 0.9, rand(seed + i + 60) * 0.8] as [
          number,
          number,
          number,
        ],
        r: 1 + rand(seed + i + 70) * 0.9 - Math.abs(i - 2.5) * 0.15,
      })),
    [seed]
  );
  return (
    <group>
      {puffs.map((p, i) => (
        <Toon key={i} color={color} position={p.pos} outline={0} fog={false}>
          <icosahedronGeometry args={[p.r, 3]} />
        </Toon>
      ))}
    </group>
  );
}

function Clouds({ color, speed }: { color: string; speed: number }) {
  const group = useRef<THREE.Group>(null);
  const layout = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        x: (rand(i + 300) - 0.5) * 80,
        y: 11 + rand(i + 310) * 8,
        z: -10 - rand(i + 320) * 70,
        s: 0.9 + rand(i + 330) * 1.2,
      })),
    []
  );
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    group.current?.children.forEach((c, i) => {
      const base = layout[i];
      c.position.x = ((base.x + t * (0.4 + (i % 3) * 0.15) + 40) % 80 + 80) % 80 - 40;
    });
  });
  return (
    <group ref={group}>
      {layout.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]} scale={c.s}>
          <Cloud seed={i * 17} color={color} />
        </group>
      ))}
    </group>
  );
}

function Floaters({ color, night, speed }: { color: string; night: boolean; speed: number }) {
  const COUNT = 140;
  const points = useRef<THREE.Points>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const p = pathOffset(rand(i + 500) * 0.95, rand(i + 501) > 0.5 ? 1 : -1, rand(i + 502) * 7);
        return { x: p.x, z: p.z, y: 0.3 + rand(i + 503) * 3, phase: rand(i + 504) * 10 };
      }),
    []
  );
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame(({ clock }) => {
    const pts = points.current;
    if (!pts) return;
    const t = clock.getElapsedTime() * speed;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      if (night) {
        // fireflies hover and wander
        attr.setXYZ(i, s.x + Math.sin(t * 0.7 + s.phase) * 0.8, 0.4 + Math.sin(t * 1.3 + s.phase) * 0.4 + s.y * 0.4, s.z + Math.cos(t * 0.5 + s.phase) * 0.8);
      } else {
        // dandelion fluff drifts with the wind and loops
        const drift = (t * 0.6 + s.phase * 3) % 12;
        attr.setXYZ(i, s.x + drift - 6, s.y + Math.sin(t + s.phase) * 0.3 + drift * 0.12, s.z + Math.sin(t * 0.4 + s.phase) * 0.6);
      }
    }
    attr.needsUpdate = true;
    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = night ? 0.65 + Math.sin(t * 3) * 0.25 : 0.85;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={night ? 0.14 : 0.09}
        transparent
        depthWrite={false}
        blending={night ? THREE.AdditiveBlending : THREE.NormalBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const theta = rand(i + 900) * Math.PI * 2;
      const phi = rand(i + 901) * Math.PI * 0.42;
      const r = 140;
      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.cos(phi) * r * 0.6 + 10;
      arr[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r - 40;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fff8dc" size={0.6} sizeAttenuation fog={false} transparent opacity={0.9} />
    </points>
  );
}

const camPos = new THREE.Vector3();
const camLook = new THREE.Vector3();

/** Moves the camera along the trail based on page scroll; rises toward the clouds near the end. */
function ScrollCamera() {
  const camera = useThree((s) => s.camera);
  const smooth = useRef(0);

  useFrame(({ clock }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? window.scrollY / max : 0;
    smooth.current += (target - smooth.current) * 0.06;
    const s = smooth.current;
    const t = Math.min(0.86, s * 0.86);
    camPos.copy(PATH.getPointAt(t));
    camPos.y = 1.9 + s * s * 6;
    camPos.x += Math.sin(clock.getElapsedTime() * 0.25) * 0.15;
    camLook.copy(PATH.getPointAt(Math.min(1, t + 0.08)));
    camLook.y = 1.3 + s * s * 7;
    camera.position.copy(camPos);
    camera.lookAt(camLook);
  });
  return null;
}

function World({ dark, speed }: { dark: boolean; speed: number }) {
  const pal = dark ? NIGHT : DAY;

  const trees = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        pos: pathOffset(0.04 + (i / 22) * 0.9, i % 2 ? 1 : -1, 3.2 + rand(i + 100) * 6),
        scale: 0.7 + rand(i + 101) * 0.6,
        seed: i * 13,
      })).filter((_, i) => i !== 6), // leave room for the cottage
    []
  );
  const hills = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        return {
          pos: pathOffset((i / 16) * 0.95, side, 14 + rand(i + 200) * 14),
          r: 6 + rand(i + 201) * 7,
          sy: 0.35 + rand(i + 202) * 0.25,
        };
      }),
    []
  );

  return (
    <>
      <fog attach="fog" args={[pal.fog, 18, 75]} />
      <hemisphereLight args={[pal.hemiSky, pal.hemiGround, dark ? 0.6 : 1.1]} />
      <directionalLight position={[-20, 30, 10]} intensity={pal.sunIntensity} color={dark ? "#b9c8ff" : "#fff2d6"} />

      {/* sun or moon, low over the far hills */}
      <group position={[-30, 26, -110]}>
        <mesh>
          <circleGeometry args={[dark ? 5 : 7, 48]} />
          <meshBasicMaterial color={pal.sun} fog={false} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.5]}>
          <circleGeometry args={[dark ? 9 : 13, 48]} />
          <meshBasicMaterial color={pal.sun} transparent opacity={0.25} fog={false} />
        </mesh>
      </group>
      {dark && <Stars />}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -25]}>
        <planeGeometry args={[220, 220]} />
        <meshToonMaterial color={pal.ground} />
      </mesh>
      <DirtPath color={pal.path} />
      <Grass base={pal.grassBase} tip={pal.grassTip} speed={speed} />

      {hills.map((h, i) => (
        <Toon key={i} color={pal.hills[i % pal.hills.length]} position={[h.pos.x, -h.r * h.sy * 0.25, h.pos.z]} scale={[1, h.sy, 1]} outline={0.01}>
          <sphereGeometry args={[h.r, 32, 16]} />
        </Toon>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <Toon
          key={i}
          color={pal.mountains}
          position={[(i - 3) * 26 + rand(i + 700) * 10, 0, -95 - rand(i + 701) * 15]}
          outline={0}
          fog={false}
        >
          <coneGeometry args={[18 + rand(i + 702) * 8, 26 + rand(i + 703) * 14, 7]} />
        </Toon>
      ))}

      {/* the big old tree by the gate */}
      <Tree position={pathOffset(0.06, 1, 4.5)} scale={2.1} colors={pal.foliage} trunk={pal.trunk} seed={999} />
      {trees.map((t, i) => (
        <Tree key={i} position={t.pos} scale={t.scale} colors={pal.foliage} trunk={pal.trunk} seed={t.seed} />
      ))}
      <Cottage dark={dark} />

      <Clouds color={pal.cloud} speed={speed} />
      <Floaters color={pal.particles} night={dark} speed={speed} />
      <ScrollCamera />
    </>
  );
}

export default function WorldScene({ dark }: { dark: boolean }) {
  const reduced = usePrefersReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.9, 16], fov: 55, near: 0.1, far: 300 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <World dark={dark} speed={reduced ? 0.25 : 1} />
    </Canvas>
  );
}
