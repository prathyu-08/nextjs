import { render, screen } from '@testing-library/react';
import ManageResumePage from './ManageResumePage';

describe('ManageResumePage', () => {
  it('renders the page header', () => {
    render(<ManageResumePage />);
    expect(screen.getByRole('heading', { name: 'Manage Resume' })).toBeInTheDocument();
    expect(screen.getByText('Upload and manage your resume files')).toBeInTheDocument();
  });

  it('renders the upload area', () => {
    render(<ManageResumePage />);
    expect(screen.getByRole('heading', { name: 'Upload Your Resume' })).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop your file here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Choose File/i })).toBeInTheDocument();
  });

  it('lists uploaded resumes with their count', () => {
    render(<ManageResumePage />);
    expect(screen.getByRole('heading', { name: 'Your Resumes (2)' })).toBeInTheDocument();
    expect(screen.getByText('JobSeeker_Resume_2025.pdf')).toBeInTheDocument();
    expect(screen.getByText('Portfolio_CV.pdf')).toBeInTheDocument();
    expect(screen.getByText('Size: 245 KB')).toBeInTheDocument();
  });

  it('marks the default resume and hides Delete for it', () => {
    render(<ManageResumePage />);
    expect(screen.getByText('Default')).toBeInTheDocument();
    // Only the non-default resume has a Delete button
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(1);
    // Both have Preview and Download
    expect(screen.getAllByRole('button', { name: 'Preview' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(2);
  });

  it('renders the resume tips list', () => {
    render(<ManageResumePage />);
    expect(screen.getByRole('heading', { name: /Resume Tips/i })).toBeInTheDocument();
    expect(
      screen.getByText('Keep your resume to 1-2 pages for best results')
    ).toBeInTheDocument();
    expect(screen.getByText('Save as PDF to preserve formatting')).toBeInTheDocument();
  });
});
