"use client";

import { motion } from "motion/react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 70, damping: 16 }}
      className="paper mb-10 inline-block max-w-2xl px-6 py-5"
    >
      <p className="mb-1 font-hand text-base text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-black sm:text-4xl">
        <span className="brush">{title}</span>
      </h2>
      {children && <p className="mt-3 text-muted-foreground sm:text-lg">{children}</p>}
    </motion.div>
  );
}

/** Fades and floats a block up into place as it scrolls into view, like a page settling. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
