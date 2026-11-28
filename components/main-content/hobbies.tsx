"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./section-heading";

const loading = () => <div className="h-full w-full animate-pulse bg-muted/40" />;
const GolfScene = dynamic(() => import("@/components/three/golf-scene"), { ssr: false, loading });
const RunningScene = dynamic(() => import("@/components/three/running-scene"), { ssr: false, loading });
const GamingScene = dynamic(() => import("@/components/three/gaming-scene"), { ssr: false, loading });

function HobbyCard({
  title,
  blurb,
  sceneClass,
  scene,
  footer,
}: {
  title: string;
  blurb: string;
  sceneClass: string;
  scene: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <article className="paper flex h-full flex-col overflow-hidden">
      <div className={`relative h-72 ${sceneClass}`}>{scene}</div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="flex-1 text-sm text-muted-foreground">{blurb}</p>
        <div className="flex min-h-9 items-center justify-between gap-3 text-sm">{footer}</div>
      </div>
    </article>
  );
}

export function Hobbies() {
  const [shot, setShot] = useState(0);
  const [aces, setAces] = useState(0);
  const onHoleOut = useCallback(() => setAces((a) => a + 1), []);

  return (
    <section id="hobbies" className="scroll-mt-28 py-16">
      <SectionHeading eyebrow="Off the clock" title="When I'm not coding">
        Little painted scenes, rendered live with Three.js. Go ahead and poke at them.
      </SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="h-full" delay={0}>
        <HobbyCard
          title="Golf ⛳"
          blurb="Rounds on the course and buckets at the range, always chasing the hole-in-one this little ball makes look easy."
          sceneClass="bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800"
          scene={<GolfScene shot={shot} onHoleOut={onHoleOut} />}
          footer={
            <>
              <span className="text-muted-foreground">
                Aces today: <strong className="text-foreground">{aces}</strong>
              </span>
              <Button size="sm" variant="secondary" onClick={() => setShot((s) => s + 1)}>
                Tee it up again
              </Button>
            </>
          }
        />
        </Reveal>
        <Reveal className="h-full" delay={0.12}>
        <HobbyCard
          title="Running 🏃"
          blurb="Logging miles clears my head better than any debugger. Same idea as CI: show up every day and keep the streak green."
          sceneClass="bg-gradient-to-b from-orange-200 via-rose-100 to-amber-50 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900"
          scene={<RunningScene />}
          footer={<span className="text-muted-foreground">Endless road, procedurally animated stride.</span>}
        />
        </Reveal>
        <Reveal className="h-full" delay={0.24}>
        <HobbyCard
          title="Video Games 🎮"
          blurb="Gaming is how I unwind, and probably part of why I care so much about responsive, delightful UI."
          sceneClass="bg-gradient-to-b from-violet-200 via-pink-100 to-amber-50 dark:from-violet-950 dark:via-slate-900 dark:to-slate-950"
          scene={<GamingScene />}
          footer={<span className="text-muted-foreground">Move your mouse to tilt it, click the buttons to press them.</span>}
        />
        </Reveal>
      </div>
    </section>
  );
}
