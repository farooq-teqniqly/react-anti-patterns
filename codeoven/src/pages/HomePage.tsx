import { useState } from "react";
import { foodMenu } from "../data/MenuItems";

export const HomePage = () => {
  const [cartItems, setCart] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCart([...cartItems, item]);
  };

  return (
    <>
      <h1>The Code Oven</h1>
      <div data-testid="menuList">
        <ul>
          {foodMenu.map((menuItem) => (
            <li key={menuItem}>
              <div>
                <p>{menuItem}</p>
                <button onClick={() => addToCart(menuItem)}>Add to Order</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
