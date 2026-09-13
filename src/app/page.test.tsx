import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home (IHSAAN ditto base)", () => {
  it("renders IHSAAN brand copy", () => {
    render(<Home />);
    expect(screen.getAllByText(/Elevating|Faith-Driven|Talent|IHSAAN/i).length).toBeGreaterThan(0);
  });
});
