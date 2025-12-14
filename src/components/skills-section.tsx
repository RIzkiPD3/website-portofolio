// components/SkillsSection.tsx
import Container from "@/components/container";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "GSAP",
  "Node.js",
  "PHP",
  "MySQL",
  "Git",
];

export default function SkillsSection() {
  return (
    <section className="border-t border-slate-800 py-24">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight">
          Skills & Tools
        </h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          Technologies and tools I use to build modern, performant, and
          maintainable web applications.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-center text-sm text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
