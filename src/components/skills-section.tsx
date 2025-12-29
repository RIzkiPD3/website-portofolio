"use client";

import { Code2 } from "lucide-react";
import Container from "@/components/container";
import { useSkills } from "@/contexts/skill-context";

export default function SkillsSection() {
  const { skills } = useSkills();

  return (
    <section id="skills-section" className="border-t border-slate-800 py-24">
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
              key={skill.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-center text-sm text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              {/* Skill Icon/Image */}
              {skill.image ? (
                <div className="flex justify-center mb-2">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="h-10 w-10 flex items-center justify-center"><svg class="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>`;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="flex justify-center mb-2">
                  <Code2 className="h-6 w-6 text-cyan-400" />
                </div>
              )}
              {/* Skill Name */}
              <div>{skill.name}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
