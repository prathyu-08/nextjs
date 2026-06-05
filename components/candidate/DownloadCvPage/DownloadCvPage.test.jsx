import { render, screen } from '@testing-library/react';
import DownloadCvPage from './DownloadCvPage';

describe('DownloadCvPage', () => {
  it('renders the page header', () => {
    render(<DownloadCvPage />);
    expect(screen.getByRole('heading', { name: 'Download CV' })).toBeInTheDocument();
    expect(screen.getByText('Choose a CV style and export your resume')).toBeInTheDocument();
  });

  it('renders all three CV templates with names and descriptions', () => {
    render(<DownloadCvPage />);
    expect(screen.getByRole('heading', { name: 'Professional CV' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Modern CV' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Classic CV' })).toBeInTheDocument();
    expect(
      screen.getByText('One-page clean resume with strong recruiter readability.')
    ).toBeInTheDocument();
  });

  it('marks the first template as selected', () => {
    render(<DownloadCvPage />);
    expect(screen.getByText('SELECTED')).toBeInTheDocument();
  });

  it('renders Preview and Use buttons for each template', () => {
    render(<DownloadCvPage />);
    expect(screen.getAllByRole('button', { name: 'Preview' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Use' })).toHaveLength(3);
  });

  it('renders the download settings panel with format/size/language selects', () => {
    render(<DownloadCvPage />);
    expect(screen.getByRole('heading', { name: 'Download Settings' })).toBeInTheDocument();
    expect(screen.getByText('File Format')).toBeInTheDocument();
    // defaults
    expect(screen.getByDisplayValue('PDF')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('English')).toBeInTheDocument();
    expect(screen.getByDisplayValue('JobSeeker_CV_2026')).toBeInTheDocument();
  });

  it('renders download and print actions', () => {
    render(<DownloadCvPage />);
    expect(screen.getByRole('button', { name: /Download CV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Print/i })).toBeInTheDocument();
  });

  it('renders the CV preview with profile and section headings', () => {
    render(<DownloadCvPage />);
    expect(screen.getByRole('heading', { name: 'CV Preview' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Job Seeker' }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Full Stack Designer').length).toBeGreaterThan(0);
    ['Profile Summary', 'Work Experience', 'Education', 'Skills'].forEach((t) => {
      expect(screen.getByRole('heading', { name: t })).toBeInTheDocument();
    });
  });
});
