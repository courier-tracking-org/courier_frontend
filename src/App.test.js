import { render } from "@testing-library/react";
import App from "./App";

jest.mock('./components/ParcelForm', () => () => <div>Parcel Form Mock</div>);
jest.mock('./components/ParcelList', () => () => <div>Parcel List Mock</div>);

test("renders app without crash", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
  expect(container.textContent).toContain("Courier / Parcel Receipt Management System");
});

