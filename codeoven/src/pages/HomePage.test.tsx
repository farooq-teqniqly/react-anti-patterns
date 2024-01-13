import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

describe("Home Page", () => {
  it("Renders the heading", () => {
    render(<HomePage></HomePage>);
    const heading = screen.getByText("The Code Oven");
    expect(heading).toBeInTheDocument();
  });
});
