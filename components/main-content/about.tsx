import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education, profile, skills } from "@/lib/resume";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section className="scroll-mt-28 py-16" id="about">
      <SectionHeading eyebrow="About" title="A bit about me" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-4 text-base text-muted-foreground sm:text-lg">
          <p>{profile.summary}</p>
          <p>
            Right now I&apos;m at {profile.company}, moving annuity workloads from mainframes and Spring monoliths onto
            serverless AWS, wiring on-prem IBM MQ into cloud pipelines, and helping teams standardize how we build
            frontends. Before that I co-built a CRM and quoting platform at VizyPay from the database up.
          </p>
        </div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Technical Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>What I work with</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {skills.map((group) => (
                  <div key={group.category}>
                    <p className="mb-2 text-sm font-semibold">{group.category}</p>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-full border bg-secondary px-3 py-1 text-xs sm:text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>A proud Grand View Viking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((e) => (
                  <div key={e.school} className="flex items-start gap-4">
                    <Image src={e.icon} width={50} height={50} alt={`${e.school} logo`} />
                    <div>
                      <h3 className="text-lg font-bold">{e.school}</h3>
                      <p className="text-sm italic text-muted-foreground">{e.degree}</p>
                      {e.detail && <p className="text-sm italic text-muted-foreground">{e.detail}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
