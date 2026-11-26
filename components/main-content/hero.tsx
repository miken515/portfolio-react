"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { highlights, profile } from "@/lib/resume";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

export function Hero() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24">
      {/* full-bleed 3D wave behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]"
      >
        <HeroScene dark={resolvedTheme === "dark"} />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 text-center sm:order-1 sm:col-span-8 sm:text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {profile.title} · {profile.company}
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
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
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            />
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base sm:mx-0 sm:text-lg lg:text-xl">
            Full-stack engineer in {profile.location} building event-driven cloud services on AWS and the React
            frontends that sit on top of them.
          </p>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button asChild size="lg">
              <Link href="#experience">See my work</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#contact">Let&apos;s connect</Link>
            </Button>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:max-w-xl">
            {highlights.map((h) => (
              <div key={h.value} className="rounded-lg border bg-background/70 p-3 backdrop-blur">
                <dt className="text-2xl font-bold sm:text-3xl">{h.value}</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">{h.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 place-self-center sm:order-2 sm:col-span-4"
        >
          <div className="relative h-[220px] w-[220px] rounded-full bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 p-1 lg:h-[340px] lg:w-[340px]">
            <Image
              src="/images/pfp.jpeg"
              alt="Portrait of Mike Nguyen"
              className="h-full w-full rounded-full object-cover"
              width={340}
              height={340}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
