import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import React from 'react';

// Mock child components to avoid complex sub-testing
vi.mock('./components/ParcelForm', () => ({
  default: () => <div data-testid="parcel-form">Parcel Form</div>
}));

vi.mock('./components/ParcelList', () => ({
  default: () => <div data-testid="parcel-list">Parcel List</div>
}));

describe('App', () => {
  it('renders header correctly', () => {
    render(<App />);
    expect(screen.getByText('Courier / Parcel Receipt Management System')).toBeInTheDocument();
  });

  it('renders ParcelForm and ParcelList', () => {
    render(<App />);
    expect(screen.getByTestId('parcel-form')).toBeInTheDocument();
    expect(screen.getByTestId('parcel-list')).toBeInTheDocument();
  });
});
