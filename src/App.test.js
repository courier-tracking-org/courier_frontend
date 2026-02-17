import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi, test, expect } from "vitest";

vi.mock('./components/ParcelForm', () => ({
  default: () => <div>Parcel Form Mock</div>
}));
vi.mock('./components/ParcelList', () => ({
  default: () => <div>Parcel List Mock</div>
}));

test("renders app without crash", () => {
  render(<App />);
  expect(screen.getByText(/Courier \/ Parcel Receipt Management System/i))
    .toBeInTheDocument();
});

