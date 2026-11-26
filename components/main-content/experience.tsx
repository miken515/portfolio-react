"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/resume";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-16">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />
      <ol className="relative space-y-10 border-l-2 pl-6 sm:pl-10">
        {experience.map((role, i) => (
          <motion.li
            key={`${role.company}-${role.title}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative"
          >
            <span className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-gradient-to-tr from-green-500 to-blue-500 sm:-left-[49px]" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-bold">
                {role.title} <span className="text-muted-foreground">· {role.company}</span>
              </h3>
              <p className="text-sm font-medium text-muted-foreground">{role.period}</p>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {role.tags.map((t) => (
                <li key={t} className="rounded-full border px-3 py-1 text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
