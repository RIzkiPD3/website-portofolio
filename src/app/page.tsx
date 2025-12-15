// app/page.tsx
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-sections";
import SkillsSection from "@/components/skills-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
