import { render, screen, within } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { foodMenu } from "../MenuItems";

describe("Home Page", () => {
  it("Renders the heading", () => {
    render(<HomePage></HomePage>);
    const heading = screen.getByText("The Code Oven");
    expect(heading).toBeInTheDocument();
  });

  it("Renders the food menu", () => {
    render(<HomePage></HomePage>);

    const menuList = screen.getByRole("list");
    const menuItems = within(menuList).getAllByRole("listitem");
    expect(menuItems.length).toEqual(foodMenu.length);

    // eslint-disable-next-line array-callback-return
    foodMenu.map((p, i) => {
      expect(within(menuItems[i]).getByText(p)).toBeInTheDocument();
    });
  });
});
