'use client';
import { motion } from "framer-motion";
import { Download, Eye, Wand2, X } from "lucide-react";
import { ResumeBuilderProvider, useResumeBuilder } from "../ResumeBuilderContext";
import ResumePreview from "../ResumePreview";
import EntryModal from "../EntryModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CandidateSidebar from "../../layout/sidebars/CandidateSidebar";

function BuilderInner() {
  const {
    resume,
    darkMode,
    lastSavedAt,
    setDarkMode,
    updatePersonal,
    updateSummary,
    addItem,
    updateItem,
    deleteItem,
  } = useResumeBuilder();
  const [modal, setModal] = useState({ type: null, item: null });
  const [previewOpen, setPreviewOpen] = useState(false);
  const modalOpen = Boolean(modal.type);

  const openAdd = (type) => setModal({ type, item: null });
  const openEdit = (type, item) => setModal({ type, item });
  const closeModal = () => setModal({ type: null, item: null });
  const saveModal = (form) => {
    if (modal.item) updateItem(modal.type, modal.item.id, form);
    else addItem(modal.type, form);
    closeModal();
  };

  const sectionProps = {
    skills: {
      title: "Skills",
      layout: "table",
      columns: ["Skill Name", "Experience", "Action"],
      addLabel: "Add Skill",
      renderItem: (item) => (
        <>
          <td>{item.name}</td>
          <td>{item.level} {item.years ? `(${item.years} years)` : ""}</td>
          <td>
            <div className="action-icons">
              <button onClick={() => openEdit("skills", item)} title="Edit" className="text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button onClick={() => deleteItem("skills", item.id)} title="Delete" className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </>
      ),
    },
    experience: {
      title: "Experience",
      layout: "timeline",
      addLabel: "Add Experience",
      renderItem: (item) => (
        <div className="experience-content">
          <div className="experience-header">
            <h4>{item.role}</h4>
            <div className="experience-actions">
              <button onClick={() => openEdit("experience", item)} title="Edit" className="text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button onClick={() => deleteItem("experience", item.id)} title="Delete" className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div className="experience-meta">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> {item.location}</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="2" y1="6" y2="6"/></svg> {item.startDate} - {item.currentlyWorking ? "Present" : item.endDate}</span>
          </div>
          <p>{item.description || "No description provided."}</p>
        </div>
      ),
    },
    education: {
      title: "Education",
      layout: "timeline",
      addLabel: "Add Education",
      renderItem: (item) => (
        <div className="education-content">
          <div className="education-header">
            <h4>{item.degree} {item.specialization && `- ${item.specialization}`}</h4>
            <div className="education-actions">
              <button onClick={() => openEdit("education", item)} title="Edit" className="text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button onClick={() => deleteItem("education", item.id)} title="Delete" className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <p className="education-summary">{item.institution} | {item.startYear} - {item.endYear}</p>
          {item.grade && <p className="mt-1 text-sm text-slate-500">{item.grade}</p>}
        </div>
      ),
    },
    projects: {
      title: "Projects",
      layout: "grid",
      addLabel: "Add Project",
      renderItem: (item) => (
        <div className="project-card">
          <div className="project-image">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
          </div>
          <div className="project-content">
            <h4>{item.title}</h4>
            <p className="project-date">
              {item.startDate || "Ongoing"} 
              {item.endDate && ` - ${item.endDate}`}
            </p>
            <p className="project-description">
              {item.description}
               {item.technologies && <span className="mt-2 block text-xs font-semibold text-blue-600">{item.technologies}</span>}
            </p>
            <div className="project-actions">
              <button onClick={() => openEdit("projects", item)} className="text-blue-600">Edit</button>
              <button onClick={() => deleteItem("projects", item.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        </div>
      ),
    },
    certifications: {
      title: "Certifications",
      layout: "table",
      columns: ["Certificate", "Issuer & Year", "Action"],
      addLabel: "Add Certification",
      renderItem: (item) => (
        <>
          <td><strong>{item.name}</strong></td>
          <td>{item.issuer} | {item.year}</td>
          <td>
            <div className="action-icons">
              <button onClick={() => openEdit("certifications", item)} title="Edit" className="text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button onClick={() => deleteItem("certifications", item.id)} title="Delete" className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </>
      ),
    },
    languages: {
      title: "Languages",
      layout: "table",
      columns: ["Language", "Proficiency", "Action"],
      addLabel: "Add Language",
      renderItem: (item) => (
        <>
          <td><strong>{item.name}</strong></td>
          <td>{item.proficiency}</td>
          <td>
            <div className="action-icons">
              <button onClick={() => openEdit("languages", item)} title="Edit" className="text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button onClick={() => deleteItem("languages", item.id)} title="Delete" className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </>
      ),
    },
  };

   return (
     <div className={darkMode ? "dark" : ""}>
       <section className="dashboard-section">
         <div className="container">
           <div className="dashboard-layout">
             {/* Sidebar */}
             <CandidateSidebar currentPath="/candidate/build-resume" />
             {/* Main Content */}
             <div className="dashboard-main">
              {/* Page Header */}
              <div className="dashboard-page-header">
                <div>
                  <h1>Build Your Resume</h1>
                  <p>Craft a polished CV with guided sections, ATS-friendly formatting, and reusable snippets.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setPreviewOpen(true)} 
                    className="btn btn-outline-primary"
                  >
                    <Eye size={16} className="mr-2" />
                    Preview current
                  </button>
                  <button 
                    onClick={() => setPreviewOpen(true)} 
                    className="btn btn-primary"
                  >
                    <Wand2 size={16} className="mr-2" />
                    Start builder
                  </button>
                </div>
              </div>

              {/* Attached CV Section */}
              <div className="dashboard-panel">
                <div className="panel-header flex justify-between items-center">
                  <h3 className="mb-0">Attached CV</h3>
                  <button
                    type="button"
                    className="btn btn-primary text-sm py-1.5 px-3"
                    onClick={() => openAdd("cv")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table cv-table">
                    <thead>
                      <tr>
                        <th>CV Title</th>
                        <th>Default CV</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href="#." className="text-blue-600">My Resume</a></td>
                        <td><span className="badge bg-success">Default</span></td>
                        <td>{lastSavedAt ? lastSavedAt.toLocaleString() : "Not saved yet"}</td>
                        <td>
                          <div className="action-icons">
                            <a href="#." title="Download" className="text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            </a>
                            <a href="#." title="Edit" className="text-slate-900">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            </a>
                            <a href="#." title="Delete" className="text-red-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sections */}
              {Object.entries(sectionProps).map(([type, props]) => (
                <div className="dashboard-panel mt-4" key={type}>
                  <div className="panel-header flex justify-between items-center">
                    <h3 className="mb-0">{props.title}</h3>
                    <button
                      type="button"
                      className="btn btn-primary text-sm py-1.5 px-3"
                      onClick={() => openAdd(type)}
                      title={`Add ${props.title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                  </div>
                  <div className="panel-content">
                    {props.layout === "table" && (
                      <div className="table-responsive">
                        <table className="table resume-table">
                          <thead>
                            <tr>
                              {props.columns.map((col, i) => (
                                <th key={i}>{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {resume[type].length === 0 ? (
                              <tr>
                                <td colSpan={props.columns.length} className="text-center text-slate-500 py-4">
                                  No {type} added yet. Click the + button to add.
                                </td>
                              </tr>
                            ) : (
                              resume[type].map((item) => (
                                <tr key={item.id}>
                                  {props.renderItem(item)}
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {props.layout === "timeline" && (
                      <div className={type === "experience" ? "experience-timeline" : "education-timeline"}>
                        {resume[type].length === 0 ? (
                          <p className="text-slate-500 text-center py-4">No {type} added yet. Click the + button to add.</p>
                        ) : (
                          resume[type].map((item) => (
                            <div key={item.id} className={type === "experience" ? "experience-item" : "education-item"}>
                              {props.renderItem(item)}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    {props.layout === "grid" && (
                      <div className="projects-grid">
                        {resume[type].length === 0 ? (
                          <p className="text-slate-500 text-center py-4 col-span-full">No {type} added yet. Click the + button to add.</p>
                        ) : (
                          resume[type].map((item) => (
                            <div key={item.id}>
                              {props.renderItem(item)}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EntryModal type={modal.type || "skills"} editingItem={modal.item} open={modalOpen} onClose={closeModal} onSave={saveModal} />

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setPreviewOpen(false)}
          >
            <motion.div
              onMouseDown={(e) => e.stopPropagation()}
              className="max-h-[96vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Resume Preview</p>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">Your Resume</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-auto rounded-lg bg-slate-100 p-4 dark:bg-slate-950">
                <ResumePreview />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="btn btn-outline-primary"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-primary"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EditProfileResumeBuilder() {
  return (
    <ResumeBuilderProvider>
      <BuilderInner />
    </ResumeBuilderProvider>
  );
}
