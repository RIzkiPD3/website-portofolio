// lib/projects.ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  year: number;
  projectNumber: number;
  status: "AKTIF" | "COMPLETE" | "IN_PROGRESS";
  progress: number; // 0-100
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
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
    projectNumber: 1,
    status: "COMPLETE",
    progress: 100,
    liveUrl: "https://example.com/task-app",
    sourceUrl: "https://github.com/yourusername/task-app",
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
    projectNumber: 2,
    status: "AKTIF",
    progress: 85,
    liveUrl: "https://portfolio.example.com",
    sourceUrl: "https://github.com/yourusername/portfolio",
  },
  {
    slug: "cuaca-v2",
    title: "Cuaca V2",
    description:
      "Weather application with real-time data and beautiful UI design.",
    longDescription:
      "A modern weather application that provides real-time weather information with an intuitive and visually appealing interface.",
    techStack: ["React", "API", "CSS"],
    year: 2024,
    projectNumber: 3,
    status: "COMPLETE",
    progress: 100,
    liveUrl: "https://cuaca-v2.example.com",
    sourceUrl: "https://github.com/yourusername/cuaca-v2",
    image: "/myphoto.jpg",
  },
  {
    slug: "amfibiz",
    title: "AMFIBIZ",
    description:
      "Business management platform for small and medium enterprises.",
    longDescription:
      "A comprehensive business management solution designed to help SMEs streamline their operations and improve productivity.",
    techStack: ["Laravel", "Vue.js", "MySQL"],
    year: 2024,
    projectNumber: 4,
    status: "IN_PROGRESS",
    progress: 65,
    sourceUrl: "https://github.com/yourusername/amfibiz",
    image: "/myphoto.jpg",
  },
  {
    slug: "rumah-app",
    title: "Rumah-app",
    description:
      "Real estate platform for property listings and management.",
    longDescription:
      "A full-featured real estate platform that connects buyers, sellers, and agents with comprehensive property management tools.",
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    year: 2025,
    projectNumber: 5,
    status: "AKTIF",
    progress: 75,
    liveUrl: "https://rumah-app.example.com",
    sourceUrl: "https://github.com/yourusername/rumah-app",
    image: "/myphoto.jpg",
  },
  {
    slug: "pokemon-app",
    title: "Pokemon APP",
    description:
      "Interactive Pokemon encyclopedia with search and filter features.",
    longDescription:
      "An engaging Pokemon database application featuring detailed information, search capabilities, and interactive elements for Pokemon enthusiasts.",
    techStack: ["React", "PokeAPI", "TailwindCSS"],
    year: 2024,
    projectNumber: 6,
    status: "COMPLETE",
    progress: 100,
    liveUrl: "https://pokemon-app.example.com",
    sourceUrl: "https://github.com/yourusername/pokemon-app",
    image: "/myphoto.jpg",
  },
];