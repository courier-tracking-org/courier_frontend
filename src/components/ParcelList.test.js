import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ParcelList from '../components/ParcelList';
import { getAllParcels, deleteParcel } from '../services/parcelService';
import React from 'react';

// Mock parcelService
vi.mock('../services/parcelService', () => ({
  getAllParcels: vi.fn(),
  deleteParcel: vi.fn(),
}));

// Mock EditParcelModal
vi.mock('./EditParcelModal', () => ({
  default: ({ parcel, onClose, onUpdate }) => (
    <div data-testid="edit-modal">
      Edit Modal
    </div>
  )
}));

describe('ParcelList', () => {
  const mockParcels = [
    { id: 1, senderName: 'John', receiverName: 'Jane', parcelDescription: 'Box', receivedDate: '2026-03-16', status: 'RECEIVED' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  it('renders loading state initially', async () => {
    getAllParcels.mockResolvedValueOnce([]);
    render(<ParcelList />);
    expect(screen.getByText(/Loading parcels.../i)).toBeInTheDocument();
  });

  it('renders parcels after fetching', async () => {
    getAllParcels.mockResolvedValueOnce(mockParcels);
    render(<ParcelList />);
    
    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane/i)).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    getAllParcels.mockRejectedValueOnce(new Error('Fetch failed'));
    render(<ParcelList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch parcels/i)).toBeInTheDocument();
    });
  });

  it('calls deleteParcel when delete button is clicked', async () => {
    getAllParcels.mockResolvedValue(mockParcels);
    deleteParcel.mockResolvedValueOnce({});
    
    render(<ParcelList />);
    
    await waitFor(() => screen.getByText(/John/i));
    
    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtn);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(deleteParcel).toHaveBeenCalledWith(1);
    
    // We should wait for the second fetchParcels to be triggered
    await waitFor(() => {
        expect(getAllParcels).toHaveBeenCalledTimes(2);
    });
  });

  it('opens edit modal when edit button is clicked', async () => {
    getAllParcels.mockResolvedValueOnce(mockParcels);
    render(<ParcelList />);
    
    await waitFor(() => screen.getByText(/John/i));
    
    const editBtn = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editBtn);
    
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });
});
