// lib/projects.ts
export type Project = {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    techStack: string[];
    year: number;
  };
  
  export const projects: Project[] = [
    {
      slug: "task-management-app",
      title: "Task Management App",
      description:
        "A web-based task management application with CRUD features and deadline tracking.",
      longDescription:
        "This project focuses on helping users manage daily tasks efficiently. It includes full CRUD functionality, deadline reminders, and status indicators. The application was built with scalability and maintainability in mind.",
      techStack: ["Laravel", "MySQL", "CSS"],
      year: 2024,
    },
    {
      slug: "portfolio-website",
      title: "Developer Portfolio",
      description:
        "A professional portfolio website built with Next.js and modern frontend tools.",
      longDescription:
        "This portfolio showcases selected projects, technical skills, and professional background. Built with Next.js and TypeScript, it emphasizes performance, clean architecture, and modern UI design.",
      techStack: ["Next.js", "TypeScript", "Tailwind"],
      year: 2025,
    },
  ];
  