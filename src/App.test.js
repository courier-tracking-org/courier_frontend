import { render } from "@testing-library/react";
import App from "./App";

test("renders app without crash", () => {
  render(<App />);
});
