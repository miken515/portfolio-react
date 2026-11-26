import { Hero } from "@/components/main-content/hero";
import { About } from "@/components/main-content/about";
import { Experience } from "@/components/main-content/experience";
import { Projects } from "@/components/main-content/projects";
import { Hobbies } from "@/components/main-content/hobbies";
import { Contact } from "@/components/main-content/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Hobbies />
      <Contact />
    </>
  );
}
