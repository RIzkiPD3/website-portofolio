// app/page.tsx
import AboutSection from "@/components/about-section";
import Hero from "@/components/hero";
import SkillsSection from "@/components/skills-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
