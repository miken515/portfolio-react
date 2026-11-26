"use client";

import { Canvas, useThree, type CanvasProps } from "@react-three/fiber";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Wraps an R3F <Canvas> so it only renders frames while it is on screen.
 * Keeps several WebGL scenes on one page cheap on battery and GPU.
 */
export function SceneCanvas({
  className,
  children,
  ...props
}: CanvasProps & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <Canvas
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
        {...props}
      >
        {children}
      </Canvas>
    </div>
  );
}

/** Points the default camera at a target once on mount. */
export function LookAt({ target }: { target: [number, number, number] }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(...target);
  }, [camera, target]);
  return null;
}

/** True when the visitor asked the OS for reduced motion. */
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}
