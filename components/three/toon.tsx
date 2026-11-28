"use client";

import type { ThreeElements } from "@react-three/fiber";
import type { ReactNode } from "react";
import * as THREE from "three";

let gradient: THREE.DataTexture | null = null;

/** 3-step ramp that gives MeshToonMaterial its flat, cel-shaded anime bands. */
export function toonGradient() {
  if (!gradient) {
    const data = new Uint8Array([110, 110, 110, 255, 185, 185, 185, 255, 255, 255, 255, 255]);
    gradient = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
    gradient.minFilter = THREE.NearestFilter;
    gradient.magFilter = THREE.NearestFilter;
    gradient.generateMipmaps = false;
    gradient.needsUpdate = true;
  }
  return gradient;
}

type ToonProps = Omit<ThreeElements["mesh"], "children"> & {
  /** geometry element, e.g. <sphereGeometry args={[1, 32, 32]} /> */
  children: ReactNode;
  color: string;
  /** inverted-hull outline thickness as a fraction of size; 0 disables it */
  outline?: number;
  outlineColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  fog?: boolean;
};

/** A cel-shaded mesh with an ink outline (inverted hull), the classic hand-drawn anime look. */
export function Toon({
  children,
  color,
  outline = 0.04,
  outlineColor = "#2b211c",
  emissive,
  emissiveIntensity,
  fog = true,
  ...props
}: ToonProps) {
  return (
    <mesh {...props}>
      {children}
      <meshToonMaterial
        color={color}
        gradientMap={toonGradient()}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissiveIntensity ?? 1}
        fog={fog}
      />
      {outline > 0 && (
        <mesh scale={1 + outline} raycast={() => null}>
          {children}
          <meshBasicMaterial color={outlineColor} side={THREE.BackSide} fog={fog} />
        </mesh>
      )}
    </mesh>
  );
}
