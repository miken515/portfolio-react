"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const WorldScene = dynamic(() => import("@/components/three/world-scene"), { ssr: false });

/** Fixed painted landscape behind every page; the camera walks the trail as you scroll. */
export function WorldBackground() {
  const { resolvedTheme } = useTheme();
  return (
    <div aria-hidden className="sky pointer-events-none fixed inset-0 -z-10">
      <WorldScene dark={resolvedTheme === "dark"} />
    </div>
  );
}
