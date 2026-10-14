import { fireEvent, render, screen, within } from "@testing-library/react";
import VolunteerOpeningsPage from "./page";
import { VOLUNTEER_APPLICATION_FORM_URL, VOLUNTEER_OPENINGS } from "@/content/volunteer";

describe("volunteer openings", () => {
  it("lists only the general application, with the unpaid note and no mission section", () => {
    render(<VolunteerOpeningsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Volunteer with IHSAAN." })).toBeTruthy();
    expect(screen.getAllByText(/unpaid/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: "Mission" })).toBeNull();
    expect(VOLUNTEER_OPENINGS.map(({ title }) => title)).toEqual(["General Application"]);
    expect(screen.queryByText(/Scotland|Ireland Team/)).toBeNull();
    expect(screen.queryByRole("link", { name: /General Application/ })).toBeNull();
  });

  it("opens the Tally application form in a modal", () => {
    render(<VolunteerOpeningsPage />);
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /General Application/ }));

    const dialog = screen.getByRole("dialog", { name: "General Application" });
    expect(within(dialog).getByText("3-4 hours per week", { exact: false })).toBeTruthy();
    const frame = within(dialog).getByTitle("General Application application form");
    expect(frame.getAttribute("src")).toBe(VOLUNTEER_APPLICATION_FORM_URL);
    expect(VOLUNTEER_APPLICATION_FORM_URL).toBe(
      "https://tally.so/embed/XxBvde?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    );
  });
});
