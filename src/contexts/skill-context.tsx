"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Skill, skills as initialSkills } from "@/lib/skills";

type SkillContextType = {
    skills: Skill[];
    addSkill: (name: string, image?: string) => void;
    updateSkill: (id: number, name: string, image?: string) => void;
    deleteSkill: (id: number) => void;
};

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export function SkillProvider({ children }: { children: ReactNode }) {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedSkills = localStorage.getItem("porto_skills");
        if (savedSkills) {
            setSkills(JSON.parse(savedSkills));
        } else {
            setSkills(initialSkills);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever skills change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("porto_skills", JSON.stringify(skills));
        }
    }, [skills, isLoaded]);

    const addSkill = (name: string, image?: string) => {
        const id = skills.length > 0
            ? Math.max(...skills.map(s => s.id)) + 1
            : 1;

        const newSkill: Skill = { id, name, ...(image && { image }) };
        setSkills([...skills, newSkill]);
    };

    const updateSkill = (id: number, name: string, image?: string) => {
        setSkills(skills.map(s => s.id === id ? { ...s, name, ...(image !== undefined && { image }) } : s));
    };

    const deleteSkill = (id: number) => {
        setSkills(skills.filter(s => s.id !== id));
    };

    return (
        <SkillContext.Provider value={{ skills, addSkill, updateSkill, deleteSkill }}>
            {children}
        </SkillContext.Provider>
    );
}

export function useSkills() {
    const context = useContext(SkillContext);
    if (context === undefined) {
        throw new Error("useSkills must be used within a SkillProvider");
    }
    return context;
}
