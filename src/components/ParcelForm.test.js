import { render, screen, fireEvent } from '@testing-library/react'
import { vi, test, expect } from 'vitest'
import ParcelForm from './ParcelForm'
import * as parcelService from '../services/parcelService'

// Mock the service
vi.mock('../services/parcelService', () => ({
  createParcel: vi.fn(() => Promise.resolve())
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

test('submits form successfully', async () => {
  render(<ParcelForm />)

  fireEvent.change(screen.getByLabelText(/Sender Name/i), {
    target: { value: 'John Doe', name: 'senderName' }
  })

  fireEvent.change(screen.getByLabelText(/Receiver Name/i), {
    target: { value: 'Jane Doe', name: 'receiverName' }
  })

  fireEvent.change(screen.getByLabelText(/Parcel Description/i), {
    target: { value: 'Gift box', name: 'parcelDescription' }
  })

  fireEvent.change(screen.getByLabelText(/Arrival Date/i), {
    target: { value: '2026-02-17', name: 'receivedDate' }
  })

  fireEvent.click(screen.getByRole('button', { name: /Create Parcel/i }))

  expect(parcelService.createParcel).toHaveBeenCalled()
})
