import { Hero } from "@/components/main-content/hero";
import { About } from "@/components/main-content/about";
import { ProjectDemo } from "@/components/main-content/project-demo";
import { Contact } from "@/components/main-content/contact";
export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <ProjectDemo/>
      <Contact/>
    </>
  );
}