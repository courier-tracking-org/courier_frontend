import { render, screen } from '@testing-library/react'
import { vi, test, expect } from 'vitest'
import ParcelForm from './ParcelForm'

// Mock the service
vi.mock('../services/parcelService', () => ({
  createParcel: vi.fn()
}))

test('renders form with title', () => {
  render(<ParcelForm />)
  const titleElement = screen.getByText(/Add New Parcel/i)
  expect(titleElement).toBeInTheDocument()
})

test('renders required input fields', () => {
  render(<ParcelForm />)
  expect(screen.getByLabelText(/Sender Name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Receiver Name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Parcel Description/i)).toBeInTheDocument()
})
