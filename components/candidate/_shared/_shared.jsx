'use client';
import CandidateSidebar from "../../layout/sidebars/CandidateSidebar";
import styles from "./_shared.module.css";

export const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

// ─── Theme tokens ────────────────────────────────────────────────
export const templateAccent = "#18b870";
export const templateBlue = "#12a8c7";
export const mutedText = "#6b7280";

// ─── Shared shell ────────────────────────────────────────────────
export function Shell({ path, title, subtitle, children }) {
  return (
    <section className={styles.shell}>
      <div className={styles.shellInner}>
        <CandidateSidebar currentPath={path} />
        <div className={styles.shellMain}>
          {title && (
            <div className={styles.shellHeader}>
              <h1 className={styles.shellTitle}>{title}</h1>
              {subtitle && <p className={styles.shellSubtitle}>{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

// ─── Card primitives ─────────────────────────────────────────────
export function Card({ children, style={} }) {
  return <div className={styles.card} style={style}>{children}</div>;
}

export function CardHead({ title, action }) {
  return (
    <div className={styles.cardHead}>
      <h3 className={styles.cardHeadTitle}>{title}</h3>
      {action}
    </div>
  );
}

export function Input({ label, type="text", placeholder="", defaultValue="" }) {
  return (
    <div>
      <label className={styles.fieldLabel}>{label}</label>
      <input type={type} placeholder={placeholder} defaultValue={defaultValue} className={styles.fieldInput} />
    </div>
  );
}

export function Sel({ label, opts }) {
  return (
    <div>
      <label className={styles.fieldLabel}>{label}</label>
      <select className={styles.fieldSelect}>
        {opts.map((o,i) => <option key={i}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Template helpers (Download CV) ──────────────────────────────
export function TemplatePanel({ title, children, action, note }) {
  return (
    <section className={styles.templatePanel}>
      <div className={styles.templatePanelHead}>
        <div>
          <h3 className={styles.templatePanelTitle}>{title}</h3>
          {note && <p className={styles.templatePanelNote}>{note}</p>}
        </div>
        {action}
      </div>
      <div className={styles.templatePanelBody}>{children}</div>
    </section>
  );
}

export function TemplateButton({ children, variant="primary", style={}, onClick }) {
  const variantClass = {
    primary: styles.templateBtnPrimary,
    blue: styles.templateBtnBlue,
    ghost: styles.templateBtnGhost,
    danger: styles.templateBtnDanger,
  }[variant];
  return (
    <button onClick={onClick} className={`${styles.templateBtn} ${variantClass}`} style={style}>
      {children}
    </button>
  );
}

export function TemplateField({ label, children }) {
  return (
    <label className={styles.templateField}>
      <span className={styles.templateFieldLabel}>{label}</span>
      {children}
    </label>
  );
}

export function TextBox({ placeholder="", defaultValue="", type="text" }) {
  return (
    <input type={type} placeholder={placeholder} defaultValue={defaultValue} className={styles.templateInput} />
  );
}

export function SelectBox({ opts, defaultValue }) {
  return (
    <select defaultValue={defaultValue} className={styles.templateInput}>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export function TemplateGrid({ children }) {
  return <div className={styles.templateGrid}>{children}</div>;
}
