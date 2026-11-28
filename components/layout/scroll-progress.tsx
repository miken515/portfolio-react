"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** A leaf that drifts along a vine under the navbar as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const left = useTransform(progress, (v) => `calc(${v * 100}% - 12px)`);
  const rotate = useTransform(progress, (v) => v * 720);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[57px] z-[999] h-6 lg:top-[73px]">
      <div className="absolute inset-x-0 top-3 h-[3px] bg-primary/15" />
      <motion.div
        className="absolute left-0 top-3 h-[3px] origin-left bg-gradient-to-r from-primary via-primary to-accent"
        style={{ scaleX: progress, width: "100%" }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-0 h-6 w-6 drop-shadow"
        style={{ left, rotate }}
      >
        <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" fill="hsl(var(--primary))" />
        <path d="M5 19 15 9" stroke="hsl(var(--card))" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}
