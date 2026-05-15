import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Field, SelectInput, TextArea, TextInput, SubmitButton, CancelButton } from "./FormControls";

const configs = {
  skills: {
    title: "Add Skill",
    editTitle: "Edit Skill",
    required: ["name", "level"],
    initial: { name: "", level: "Intermediate", years: "" },
    fields: [
      ["name", "Skill Name", "text"],
      ["level", "Skill Level", "select", ["Beginner", "Intermediate", "Advanced", "Expert"]],
      ["years", "Years of Experience", "number"],
    ],
  },
  experience: {
    title: "Add Experience",
    editTitle: "Edit Experience",
    required: ["company", "role", "startDate"],
    initial: { company: "", role: "", employmentType: "Full-time", startDate: "", endDate: "", currentlyWorking: false, location: "", description: "" },
    fields: [
      ["company", "Company Name", "text"],
      ["role", "Role", "text"],
      ["employmentType", "Employment Type", "select", ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]],
      ["startDate", "Start Date", "month"],
      ["endDate", "End Date", "month"],
      ["location", "Location", "text"],
      ["description", "Description", "textarea"],
    ],
  },
  education: {
    title: "Add Education",
    editTitle: "Edit Education",
    required: ["institution", "degree"],
    initial: { institution: "", degree: "", specialization: "", startYear: "", endYear: "", grade: "" },
    fields: [
      ["institution", "Institution Name", "text"],
      ["degree", "Degree", "text"],
      ["specialization", "Specialization", "text"],
      ["startYear", "Start Year", "number"],
      ["endYear", "End Year", "number"],
      ["grade", "Grade/CGPA", "text"],
    ],
  },
  projects: {
    title: "Add Project",
    editTitle: "Edit Project",
    required: ["title", "technologies"],
    initial: { title: "", technologies: "", description: "", github: "", live: "" },
    fields: [
      ["title", "Project Title", "text"],
      ["technologies", "Technologies Used", "text"],
      ["description", "Project Description", "textarea"],
      ["github", "GitHub Link", "url"],
      ["live", "Live Link", "url"],
    ],
  },
  certifications: {
    title: "Add Certification",
    editTitle: "Edit Certification",
    required: ["name", "issuer"],
    initial: { name: "", issuer: "", year: "" },
    fields: [
      ["name", "Certification Name", "text"],
      ["issuer", "Issuing Organization", "text"],
      ["year", "Year", "number"],
    ],
  },
  languages: {
    title: "Add Language",
    editTitle: "Edit Language",
    required: ["name", "proficiency"],
    initial: { name: "", proficiency: "Professional" },
    fields: [
      ["name", "Language", "text"],
      ["proficiency", "Proficiency", "select", ["Native", "Professional", "Intermediate", "Basic"]],
    ],
  },
  cv: {
    title: "Add CV",
    editTitle: "Edit CV",
    required: ["title"],
    initial: { title: "", file: null },
    fields: [
      ["title", "CV Title", "text"],
    ],
  },
};

export default function EntryModal({ type, editingItem, open, onClose, onSave }) {
  const config = configs[type];
  const [form, setForm] = useState(config.initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(editingItem || config.initial);
      setErrors();
    }
  }, [open, editingItem, config.initial]);

  const setValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    config.required.forEach((field) => {
      if (!String(form[field] || "").trim()) nextErrors[field] = "This field is required";
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSave(form);
  };

  const isTableType = ["skills", "languages", "certifications"].includes(type);

  return (
    <Modal open={open} onClose={onClose} onSubmit={submit} title={editingItem ? config.editTitle : config.title}>
      <div className={`grid gap-4 ${isTableType ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {config.fields.map(([field, label, kind, options]) => {
          const disabled = field === "endDate" && form.currentlyWorking;
          return (
            <Field key={field} label={label} error={errors?.[field]}>
              {kind === "textarea" ? (
                <TextArea value={form[field] || ""} onChange={(event) => setValue(field, event.target.value)} />
              ) : kind === "select" ? (
                <SelectInput value={form[field] || ""} onChange={(event) => setValue(field, event.target.value)}>
                  <option value="">Select {label}</option>
                  {options.map((option) => <option key={option} value={option}>{option}</option>)}
                </SelectInput>
              ) : kind === "month" ? (
                <input
                  type="month"
                  value={form[field] || ""}
                  onChange={(event) => setValue(field, event.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-primary-dark"
                  disabled={disabled}
                />
              ) : (
                <TextInput type={kind} value={form[field] || ""} disabled={disabled} onChange={(event) => setValue(field, event.target.value)} />
              )}
            </Field>
          );
        })}
      </div>

      {type === "experience" && (
        <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={Boolean(form.currentlyWorking)}
            onChange={(event) => setForm((current) => ({ ...current, currentlyWorking: event.target.checked, endDate: event.target.checked ? "" : current.endDate }))}
             className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          />
          Currently working here
        </label>
      )}

      {type === "projects" && (
        <>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Project Image</label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-28 overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
                {form.image ? (
                  <img src={form.image} alt="Project preview" className="h-full w-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                )}
              </div>
              <div>
                <button type="button" className="btn btn-outline-primary btn-sm">
                  Upload Image
                </button>
                <p className="mt-1 text-xs text-slate-500">Recommended size: 800x600px</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-7 flex justify-end gap-3">
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <SubmitButton type="submit">
          {editingItem ? "Save Changes" : "Add"}
        </SubmitButton>
      </div>
    </Modal>
  );
}

export { configs as entryConfigs };
