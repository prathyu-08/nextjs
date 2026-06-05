import { render, screen } from '@testing-library/react';
import PaymentHistoryPage from './PaymentHistoryPage';

describe('PaymentHistoryPage', () => {
  it('renders the page header', () => {
    render(<PaymentHistoryPage />);
    expect(screen.getByRole('heading', { name: 'Payment History' })).toBeInTheDocument();
    expect(screen.getByText('View all your subscription payments')).toBeInTheDocument();
  });

  it('renders the summary cards', () => {
    render(<PaymentHistoryPage />);
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('$59.00')).toBeInTheDocument();
    expect(screen.getByText('Renews On')).toBeInTheDocument();
    expect(screen.getByText('Dec 31, 2025')).toBeInTheDocument();
  });

  it('renders the transaction table headers', () => {
    render(<PaymentHistoryPage />);
    expect(screen.getByRole('heading', { name: 'Transaction History' })).toBeInTheDocument();
    ['ID', 'Description', 'Period', 'Date', 'Amount', 'Method', 'Status'].forEach((h) => {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument();
    });
  });

  it('renders each payment row', () => {
    render(<PaymentHistoryPage />);
    expect(screen.getByText('PAY-001')).toBeInTheDocument();
    expect(screen.getByText('PAY-004')).toBeInTheDocument();
    expect(screen.getByText('Pro Plan (1 month)')).toBeInTheDocument();
    expect(screen.getByText('PayPal')).toBeInTheDocument();
    expect(screen.getAllByText('paid')).toHaveLength(4);
  });

  it('renders export and per-row receipt buttons', () => {
    render(<PaymentHistoryPage />);
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Receipt' })).toHaveLength(4);
  });
});
