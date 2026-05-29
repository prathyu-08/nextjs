'use client';

const BADGE_STYLES = {
  'Full Time': { background: '#dcfce7', color: '#166534' },
  'Full Time/Permanent': { background: '#dcfce7', color: '#166534' },
  'Contract': { background: '#fee2e2', color: '#dc2626' },
  'Part Time': { background: '#dbeafe', color: '#1e40af' },
  'Internship': { background: '#fce7f3', color: '#9d174d' },
  'Freelance': { background: '#fef3c7', color: '#92400e' },
  'Remote': { background: '#ede9fe', color: '#5b21b6' },
};

const DEFAULT_STYLE = { background: '#f3f4f6', color: '#374151' };

export default function JobBadge({ type }) {
  const style = BADGE_STYLES[type] || DEFAULT_STYLE;
  return (
    <span
      className="job-badge"
      style={{
        ...style,
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {type}
    </span>
  );
}
