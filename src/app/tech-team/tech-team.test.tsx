import { render, screen } from "@testing-library/react";
import TechTeamPage from "./page";

describe("TechTeamPage", () => {
  it("shows every member in square tiles and keeps Mikhail’s site link", () => {
    const { container } = render(<TechTeamPage />);

    expect(screen.getByRole("heading", { level: 1, name: /IHSAAN Tech Team/ })).toBeTruthy();
    expect(container.querySelector("img[src*='hackathon-team']")).toBeNull();
    expect(container.textContent).not.toMatch(/\b0[1-5]\b/);

    for (const name of ["Mikhail Wijanarko", "Rayyan Islam", "Kanzah", "Mahe", "Nour Meligy"]) {
      expect(screen.getByRole("heading", { name })).toBeTruthy();
    }

    const mikhail = screen.getByRole("link", { name: "Mikhail Wijanarko" });
    expect(mikhail.getAttribute("href")).toBe("https://mikhailwijanarko.xyz");
    expect(mikhail.getAttribute("target")).toBe("_blank");
    expect(mikhail.getAttribute("rel")).toBe("noopener noreferrer");
    expect(mikhail.className).toContain("aspect-square");
  });
});
