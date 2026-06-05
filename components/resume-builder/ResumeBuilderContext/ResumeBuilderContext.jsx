'use client';
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "resume-builder-draft";

const initialResume = {
  personal: {
    name: "Jordan Blake",
    title: "Lead Product Designer",
    email: "jordan@company.com",
    phone: "+1 234 567 890",
    location: "Seattle, USA",
    website: "https://jordanblake.design",
    linkedin: "https://linkedin.com/in/jordan",
  },
  summary:
    "Product designer with 10+ years of experience building SaaS platforms, design systems, and hiring workflows. Strong partner to product, engineering, and research teams.",
  skills: [
    { id: crypto.randomUUID(), name: "Product Strategy", level: "Expert", years: "8" },
    { id: crypto.randomUUID(), name: "Design Systems", level: "Expert", years: "6" },
    { id: crypto.randomUUID(), name: "React", level: "Advanced", years: "4" },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Skyline Digital",
      role: "Lead Product Designer",
      employmentType: "Full-time",
      startDate: "2021-02",
      endDate: "",
      currentlyWorking: true,
      location: "Remote",
      description: "Scaled a design system, mentored 6 designers, and partnered with research to ship 4 product lines.",
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: "Stanford University",
      degree: "BSc",
      specialization: "Human Computer Interaction",
      startYear: "2010",
      endYear: "2014",
      grade: "3.8 CGPA",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Resume Builder Platform",
      technologies: "React, Tailwind CSS, Node.js",
      description: "Designed and shipped a live resume editor with ATS-friendly templates and PDF export.",
      github: "https://github.com/username/resume-builder",
      live: "https://resume.example.com",
    },
  ],
  certifications: [
    { id: crypto.randomUUID(), name: "Certified UX Professional", issuer: "NN/g", year: "2024" },
  ],
  languages: [
    { id: crypto.randomUUID(), name: "English", proficiency: "Native" },
    { id: crypto.randomUUID(), name: "Spanish", proficiency: "Professional" },
  ],
};

const ResumeBuilderContext = createContext(null);

export function ResumeBuilderProvider({ children }) {
  const [resume, setResume] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialResume;
    } catch {
      return initialResume;
    }
  });
  const [template, setTemplate] = useState("modern");
  const [darkMode, setDarkMode] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      setLastSavedAt(new Date());
    }, 500);
    return () => clearTimeout(timer);
  }, [resume]);

  const updatePersonal = (field, value) => {
    setResume((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }));
  };

  const updateSummary = (value) => {
    setResume((current) => ({ ...current, summary: value }));
  };

  const addItem = (section, item) => {
    setResume((current) => ({
      ...current,
      [section]: [{ ...item, id: crypto.randomUUID() }, ...current[section]],
    }));
  };

  const updateItem = (section, id, item) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].map((entry) => (entry.id === id ? { ...entry, ...item, id } : entry)),
    }));
  };

  const deleteItem = (section, id) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].filter((entry) => entry.id !== id),
    }));
  };

  const value = useMemo(
    () => ({
      resume,
      template,
      darkMode,
      lastSavedAt,
      setTemplate,
      setDarkMode,
      updatePersonal,
      updateSummary,
      addItem,
      updateItem,
      deleteItem,
    }),
    [resume, template, darkMode, lastSavedAt]
  );

  return <ResumeBuilderContext.Provider value={value}>{children}</ResumeBuilderContext.Provider>;
}

export function useResumeBuilder() {
  const value = useContext(ResumeBuilderContext);
  if (!value) throw new Error("useResumeBuilder must be used inside ResumeBuilderProvider");
  return value;
}
