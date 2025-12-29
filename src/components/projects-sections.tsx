"use client";

// components/ProjectsSection.tsx
import { useState, useEffect } from "react";
import Container from "@/components/Container";
import ProjectCard from "@/components/project-card";
import SmallProjectCard from "@/components/small-project-card";
import { useProjects } from "@/contexts/project-context";
import { Project } from "@/lib/projects";

export default function ProjectsSection() {
  const { projects } = useProjects();
  // State to track the currently featured project
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projects.length > 0 && !featuredProject) {
      setFeaturedProject(projects[0]);
    }
  }, [projects, featuredProject]);

  if (projects.length === 0) {
    return (
      <section id="projects-section" className="border-t border-slate-800 py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              <span className="text-cyan-400">[ </span>
              <span className="text-white">FEATURED PROJECTS</span>
              <span className="text-cyan-400"> ]</span>
            </h2>
            <p className="mt-3 text-slate-400">
              Pilihan Proyek Unggulan - Status: AKTIF
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 py-16 px-6">
            <div className="rounded-full bg-slate-800 p-4 mb-4">
              <svg
                className="h-12 w-12 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              Belum Ada Project
            </h3>
            <p className="text-sm text-slate-500 text-center max-w-md">
              Project akan ditampilkan di sini setelah ditambahkan melalui halaman admin.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // All projects except the currently featured one
  const sideProjects = projects.filter(
    (project) => project.slug !== featuredProject?.slug
  ).slice(0, 4);

  // Handler for when a small card is clicked
  const handleCardClick = (project: Project) => {
    setFeaturedProject(project);
  };

  return (
    <section id="projects-section" className="border-t border-slate-800 py-24">
      <Container>
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-cyan-400">[ </span>
            <span className="text-white">FEATURED PROJECTS</span>
            <span className="text-cyan-400"> ]</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Pilihan Proyek Unggulan - Status: AKTIF
          </p>
        </div>

        {/* Featured Layout: 1 Large Center + 4 Small Sides */}
        <div className="mt-12">
          {/* Desktop Layout: Grid with side cards */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Left Side Cards (2 cards) */}
            <div className="lg:col-span-3 space-y-6">
              {sideProjects.slice(0, 2).map((project) => (
                <SmallProjectCard
                  key={project.slug}
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </div>

            {/* Center Featured Card */}
            <div className="lg:col-span-6">
              {featuredProject && <ProjectCard project={featuredProject} />}
            </div>

            {/* Right Side Cards (2 cards) */}
            <div className="lg:col-span-3 space-y-6">
              {sideProjects.slice(2, 4).map((project) => (
                <SmallProjectCard
                  key={project.slug}
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Layout: Stacked */}
          <div className="lg:hidden space-y-6">
            {/* Featured Project First */}
            {featuredProject && <ProjectCard project={featuredProject} />}

            {/* Then Side Projects in Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {sideProjects.map((project) => (
                <SmallProjectCard
                  key={project.slug}
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
