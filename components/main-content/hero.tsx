"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { highlights, profile } from "@/lib/resume";

const AvatarScene = dynamic(() => import("@/components/three/avatar-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-muted/40" />,
});

export function Hero() {
  // As you scroll away, the hero drifts up and fades like a page being turned.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const avatarY = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section className="relative flex min-h-[calc(100svh-6rem)] items-center pb-16 pt-8 sm:pb-24">
      <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
        <motion.div style={{ y, opacity }} className="order-2 md:order-1 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
            className="paper px-6 py-8 text-center sm:px-10 md:text-left"
          >
            <p className="mb-3 font-hand text-lg text-primary">
              {profile.title} · {profile.company}
            </p>
            <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Hello, I&apos;m
              <br />
              <TypeAnimation
                sequence={[
                  "Mike Nguyen",
                  2200,
                  "a Software Engineer",
                  1800,
                  "a Golfer ⛳",
                  1400,
                  "a Runner 🏃",
                  1400,
                  "a Gamer 🎮",
                  1400,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="bg-gradient-to-r from-primary via-sky-500 to-amber-500 bg-clip-text text-transparent dark:via-sky-300 dark:to-amber-300"
              />
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg md:mx-0 lg:text-xl">
              Full-stack engineer in {profile.location} building event-driven cloud services on AWS and the React
              frontends that sit on top of them.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#experience">See my work</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="#contact">Let&apos;s connect</Link>
              </Button>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.value}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="rounded-2xl border border-dashed border-primary/40 bg-secondary/60 p-3"
                >
                  <dt className="font-display text-2xl font-black text-primary sm:text-3xl">{h.value}</dt>
                  <dd className="text-xs text-muted-foreground sm:text-sm">{h.label}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: avatarY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 }}
          className="order-1 place-self-center md:order-2 md:col-span-5"
        >
          <div className="relative h-[300px] w-[280px] sm:h-[400px] sm:w-[370px]">
            {/* round "window" the avatar pops out of */}
            <div className="absolute inset-x-4 bottom-0 top-12 rounded-full border-4 border-card/90 shadow-2xl bg-gradient-to-b from-sky-200/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-slate-800/80" />
            <div className="absolute inset-0">
              <AvatarScene />
            </div>
            <p className="absolute -bottom-3 left-1/2 -translate-x-1/2 animate-float-slow whitespace-nowrap rounded-full bg-card/90 px-4 py-1 font-hand text-sm shadow">
              click me to say hi 👋
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
