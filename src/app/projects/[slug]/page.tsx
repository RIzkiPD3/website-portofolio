import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { projects } from "@/lib/projects";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find(
    (item) => item.slug === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <section className="py-24">
      <Container>
        <span className="text-sm text-slate-400">{project.year}</span>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-slate-400">
          {project.longDescription}
        </p>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">Tech Stack</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
