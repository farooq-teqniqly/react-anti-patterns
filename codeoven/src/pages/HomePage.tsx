import { useState } from "react";
import { foodMenu } from "../data/MenuItems";
import { MenuList } from "../components/MenuList";

export const HomePage = () => {
  const [cartItems, setCart] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCart([...cartItems, item]);
  };

  return (
    <>
      <h1>The Code Oven</h1>
      <MenuList menuItems={foodMenu} onAddMenuItem={addToCart}></MenuList>
      <div data-testid="cart">
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem}>{cartItem}</li>
          ))}
        </ul>
        <button disabled={cartItems.length === 0}>Place Order</button>
      </div>
    </>
  );
};
