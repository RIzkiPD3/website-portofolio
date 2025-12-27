"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project, projects as initialProjects } from "@/lib/projects";

type ProjectContextType = {
    projects: Project[];
    addProject: (project: Omit<Project, "slug" | "projectNumber">) => void;
    updateProject: (slug: string, project: Partial<Project>) => void;
    deleteProject: (slug: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedProjects = localStorage.getItem("porto_projects");
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects(initialProjects);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever projects change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("porto_projects", JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    const addProject = (newProject: Omit<Project, "slug" | "projectNumber">) => {
        const slug = newProject.title.toLowerCase().replace(/\s+/g, "-");
        const projectNumber = projects.length > 0
            ? Math.max(...projects.map(p => p.projectNumber)) + 1
            : 1;

        const project: Project = {
            ...newProject,
            slug,
            projectNumber,
            // Provide defaults for missing fields from the requirement
            longDescription: newProject.description,
            year: new Date().getFullYear(),
            status: newProject.progress === 100 ? "COMPLETE" : "AKTIF",
        };

        setProjects([...projects, project]);
    };

    const updateProject = (slug: string, updatedFields: Partial<Project>) => {
        setProjects(projects.map(p => {
            if (p.slug === slug) {
                const merged = { ...p, ...updatedFields };
                // Auto-update status based on progress if progress changed
                if (updatedFields.progress !== undefined) {
                    merged.status = updatedFields.progress === 100 ? "COMPLETE" : "AKTIF";
                }
                return merged;
            }
            return p;
        }));
    };

    const deleteProject = (slug: string) => {
        setProjects(projects.filter(p => p.slug !== slug));
    };

    return (
        <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProjects must be used within a ProjectProvider");
    }
    return context;
}
