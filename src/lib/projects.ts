// lib/projects.ts
export type Project = {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    year: number;
  };
  
  export const projects: Project[] = [
    {
      slug: "task-management-app",
      title: "Task Management App",
      description:
        "A web-based task management application with CRUD features and deadline tracking.",
      techStack: ["Laravel", "MySQL", "CSS"],
      year: 2024,
    },
    {
      slug: "portfolio-website",
      title: "Developer Portfolio",
      description:
        "A professional portfolio website built with Next.js and modern frontend tools.",
      techStack: ["Next.js", "TypeScript", "Tailwind"],
      year: 2025,
    },
  ];
  