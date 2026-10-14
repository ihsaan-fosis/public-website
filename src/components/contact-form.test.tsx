import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";

Object.assign(Element.prototype, {
  hasPointerCapture: () => false,
  setPointerCapture: () => undefined,
  releasePointerCapture: () => undefined,
  scrollIntoView: () => undefined,
});

function openTopics() {
  fireEvent.pointerDown(screen.getByRole("combobox", { name: "What is this about?" }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });
}

function fill() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Aisha Khan" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "aisha@example.com" } });
  openTopics();
  fireEvent.click(screen.getByRole("option", { name: "Volunteering" }));
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "I would like to volunteer." } });
}

describe("contact form", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("offers every query type", () => {
    render(<ContactForm />);
    openTopics();
    const options = screen.getAllByRole("option").map((option) => option.textContent);
    expect(options).toEqual([
      "General enquiry",
      "Partnerships and sponsorship",
      "Programmes and events",
      "Mentoring",
      "Volunteering",
      "Press and media",
      "Privacy and data requests",
      "Something else",
    ]);
  });

  it("posts the enquiry and confirms it was sent", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await screen.findByText("Message sent.");
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: "Aisha Khan",
      email: "aisha@example.com",
      queryType: "volunteering",
      message: "I would like to volunteer.",
      website: "",
    });
  });

  it("shows the server's field errors and keeps the form", async () => {
    fetchMock.mockResolvedValue(
      Response.json({ error: "Check the highlighted fields.", fields: { email: "Enter a valid email address." } }, { status: 422 }),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText("Enter a valid email address.")).toBeTruthy());
    expect(screen.getByRole("alert").textContent).toBe("Check the highlighted fields.");
    expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("true");
  });
});
