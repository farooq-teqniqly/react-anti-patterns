import { render, screen, within } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { foodMenu } from "../data/MenuItems";
import userEvent from "@testing-library/user-event";

describe("Home Page", () => {
  it("Renders the heading", () => {
    render(<HomePage></HomePage>);

    const heading = screen.getByText("The Code Oven");
    expect(heading).toBeInTheDocument();
  });

  it("Renders the food menu", () => {
    render(<HomePage></HomePage>);

    const menuList = screen.getByTestId("menuList");
    const menuItems = within(menuList).getAllByRole("listitem");
    expect(menuItems.length).toEqual(foodMenu.length);

    // eslint-disable-next-line array-callback-return
    foodMenu.map((p, i) => {
      expect(within(menuItems[i]).getByText(p)).toBeInTheDocument();
    });
  });

  it("Renders the cart", () => {
    render(<HomePage></HomePage>);

    const cart = screen.getByTestId("cart");
    expect(cart).toBeInTheDocument();

    const placeOrderButton = within(cart).getByRole("button");
    expect(placeOrderButton).toBeInTheDocument();
    expect(placeOrderButton).toHaveTextContent("Place Order");
    expect(placeOrderButton).toBeDisabled();
  });

  it("Renders an add to order button for each menu item", () => {
    render(<HomePage></HomePage>);

    const menuList = screen.getByTestId("menuList");
    const menuItems = within(menuList).getAllByRole("listitem");

    // eslint-disable-next-line array-callback-return
    menuItems.map((i) => {
      var addToCartButton = within(i).getByRole("button");
      expect(addToCartButton).toBeInTheDocument();
      expect(addToCartButton).toHaveTextContent("Add to Order");
    });
  });

  it("Adds a menu item to the cart", async () => {
    const user = userEvent.setup();
    render(<HomePage></HomePage>);

    const menuList = screen.getByTestId("menuList");
    const menuItems = within(menuList).getAllByRole("listitem");
    const addToCartButton = within(menuItems[0]).getByRole("button");

    await user.click(addToCartButton);

    const cart = screen.getByTestId("cart");
    expect(within(cart).getByText(foodMenu[0])).toBeInTheDocument();

    const placeOrderButton = within(cart).getByRole("button");
    expect(placeOrderButton).toBeEnabled();
  });
});
