// app/page.tsx
import FadeUp from "@/animations/fade-up";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Hero from "@/components/hero";
import ProjectsSection from "@/components/projects-sections";
import SkillsSection from "@/components/skills-section";

export default function HomePage() {
  return (
    <>
      <FadeUp>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      </FadeUp>
    </>
  );
}
