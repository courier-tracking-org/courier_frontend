import { render } from "@testing-library/react";
import App from "./App";

// Mock the components that have API dependencies
jest.mock('./components/ParcelForm', () => {
  return function MockParcelForm() {
    return <div>Parcel Form Mock</div>;
  };
});

jest.mock('./components/ParcelList', () => {
  return function MockParcelList() {
    return <div>Parcel List Mock</div>;
  };
});

test("renders app without crash", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
  expect(container.textContent).toContain("Courier / Parcel Receipt Management System");
});

