import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ParcelForm from '../components/ParcelForm';
import { createParcel } from '../services/parcelService';
import React from 'react';

// Mock parcelService
vi.mock('../services/parcelService', () => ({
  createParcel: vi.fn(),
}));

describe('ParcelForm', () => {
  const mockOnParcelCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form inputs correctly', () => {
    render(<ParcelForm onParcelCreated={mockOnParcelCreated} />);
    
    expect(screen.getByLabelText(/Sender Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Receiver Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter sender name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Parcel/i })).toBeInTheDocument();
  });

  it('updates form state on input change', () => {
    render(<ParcelForm onParcelCreated={mockOnParcelCreated} />);
    
    const senderInput = screen.getByLabelText(/Sender Name/i);
    fireEvent.change(senderInput, { target: { name: 'senderName', value: 'John Doe' } });
    
    expect(senderInput.value).toBe('John Doe');
  });

  it('submits form successfully', async () => {
    createParcel.mockResolvedValueOnce({ id: 1 });
    render(<ParcelForm onParcelCreated={mockOnParcelCreated} />);
    
    fireEvent.change(screen.getByLabelText(/Sender Name/i), { target: { name: 'senderName', value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Receiver Name/i), { target: { name: 'receiverName', value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Parcel Description/i), { target: { name: 'parcelDescription', value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Arrival Date/i), { target: { name: 'receivedDate', value: '2026-03-16' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Parcel/i }));
    
    await waitFor(() => {
      expect(createParcel).toHaveBeenCalled();
      expect(screen.getByText(/Parcel created successfully!/i)).toBeInTheDocument();
      expect(mockOnParcelCreated).toHaveBeenCalled();
    });
  });

  it('shows error message on submission failure', async () => {
    createParcel.mockRejectedValueOnce(new Error('Failed to create'));
    render(<ParcelForm onParcelCreated={mockOnParcelCreated} />);
    
    // Fill required fields to bypass HTML5 validation
    fireEvent.change(screen.getByLabelText(/Sender Name/i), { target: { name: 'senderName', value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Receiver Name/i), { target: { name: 'receiverName', value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Parcel Description/i), { target: { name: 'parcelDescription', value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Arrival Date/i), { target: { name: 'receivedDate', value: '2026-03-16' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Parcel/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to create parcel. Please try again./i)).toBeInTheDocument();
    });
  });
});
