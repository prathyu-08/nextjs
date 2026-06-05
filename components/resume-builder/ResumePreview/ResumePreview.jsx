import { Mail, MapPin, Phone, ExternalLink, Globe } from "lucide-react";
import { useResumeBuilder } from "../ResumeBuilderContext";

function PreviewSection({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="border-b-2 border-slate-900 pb-1 text-[11px] font-black uppercase tracking-[0.15em] text-slate-700">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function EmptyLine({ label }) {
  return <p className="rounded border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-400">{label}</p>;
}

export default function ResumePreview() {
  const { resume } = useResumeBuilder();
  const { personal } = resume;

  return (
    <div id="resume-preview" className="resume-preview mx-auto min-h-[1050px] w-full max-w-[800px] bg-white p-8 text-slate-900 shadow-lg transition-all duration-300 print:shadow-none">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">{personal.name || "Your Name"}</h1>
              <p className="mt-1 text-base font-semibold text-blue-600">{personal.title || "Professional Title"}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-600">
          {personal.email && <span className="inline-flex items-center gap-1"><Mail size={12} />{personal.email}</span>}
          {personal.phone && <span className="inline-flex items-center gap-1"><Phone size={12} />{personal.phone}</span>}
          {personal.location && <span className="inline-flex items-center gap-1"><MapPin size={12} />{personal.location}</span>}
          {personal.website && <span className="inline-flex items-center gap-1"><Globe size={12} /><a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{personal.website}</a></span>}
        </div>
      </header>

      {/* Summary */}
      <PreviewSection title="Professional Summary">
        {resume.summary ? <p className="text-sm leading-relaxed text-slate-700">{resume.summary}</p> : <EmptyLine label="Add your professional summary" />}
      </PreviewSection>

      {/* Skills */}
      <PreviewSection title="Skills">
        {resume.skills.length ? (
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span key={skill.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        ) : <EmptyLine label="No skills added yet" />}
      </PreviewSection>

      {/* Experience */}
      <PreviewSection title="Experience">
        {resume.experience.length ? resume.experience.map((item) => (
          <article key={item.id} className="mb-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.role}</h4>
                 <p className="text-sm font-semibold text-blue-700">{item.company}</p>
              </div>
              <p className="text-right text-xs text-slate-500">{item.startDate} - {item.currentlyWorking ? "Present" : item.endDate}</p>
            </div>
            <p className="mt-1 text-xs text-slate-500">{item.employmentType} | {item.location}</p>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>}
          </article>
        )) : <EmptyLine label="No experience added yet" />}
      </PreviewSection>

      {/* Education */}
      <PreviewSection title="Education">
        {resume.education.length ? resume.education.map((item) => (
          <article key={item.id} className="mb-3">
            <div className="flex justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.degree} {item.specialization && `- ${item.specialization}`}</h4>
                <p className="text-sm text-slate-700">{item.institution}</p>
              </div>
              <p className="text-xs text-slate-500">{item.startYear} - {item.endYear}</p>
            </div>
            {item.grade && <p className="mt-1 text-xs text-slate-500">Grade: {item.grade}</p>}
          </article>
        )) : <EmptyLine label="No education added yet" />}
      </PreviewSection>

      {/* Projects */}
      <PreviewSection title="Projects">
        {resume.projects.length ? resume.projects.map((project) => (
          <article key={project.id} className="mb-4">
            <h4 className="text-sm font-bold text-slate-900">{project.title}</h4>
            <p className="mt-1 text-xs font-semibold text-blue-600">{project.technologies}</p>
            {project.description && <p className="mt-1 text-sm leading-relaxed text-slate-700">{project.description}</p>}
          </article>
        )) : <EmptyLine label="No projects added yet" />}
      </PreviewSection>

      {/* Certifications & Languages */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PreviewSection title="Certifications">
          {resume.certifications.length ? resume.certifications.map((cert) => (
            <p key={cert.id} className="mb-2 text-sm text-slate-700"><strong>{cert.name}</strong>, {cert.issuer} {cert.year}</p>
          )) : <EmptyLine label="No certifications" />}
        </PreviewSection>
        <PreviewSection title="Languages">
          {resume.languages.length ? resume.languages.map((language) => (
            <p key={language.id} className="mb-2 text-sm text-slate-700"><strong>{language.name}</strong> - {language.proficiency}</p>
          )) : <EmptyLine label="No languages" />}
        </PreviewSection>
      </div>
    </div>
  );
}
