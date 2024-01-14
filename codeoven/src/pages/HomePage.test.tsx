/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, within } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { foodMenu } from "../data/MenuItems";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

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
    foodMenu.map((item, index) => {
      expect(within(menuItems[index]).getByText(item)).toBeInTheDocument();
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
    menuItems.map((item) => {
      var addToCartButton = within(item).getByRole("button");
      expect(addToCartButton).toBeInTheDocument();
      expect(addToCartButton).toHaveTextContent("Add to Order");
    });
  });

  it("Adds a menu item to the cart", async () => {
    render(<HomePage></HomePage>);

    const menuList = screen.getByTestId("menuList");
    const menuItems = within(menuList).getAllByRole("listitem");
    const addToCartButton = within(menuItems[0]).getByRole("button");

    await act(async () => {
      await userEvent.click(addToCartButton);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const cart = screen.getByTestId("cart");
    expect(within(cart).getByText(foodMenu[0])).toBeInTheDocument();

    const placeOrderButton = within(cart).getByRole("button");
    expect(placeOrderButton).toBeEnabled();
  });
});
