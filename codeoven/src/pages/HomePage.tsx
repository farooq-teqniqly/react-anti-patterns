import { useState } from "react";
import { foodMenu } from "../data/MenuItems";

export const HomePage = () => {
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCart((alreadyAddedItems) => [...alreadyAddedItems, item]);
  };

  return (
    <>
      <h1>The Code Oven</h1>
      <div data-testid="menuList">
        <ul>
          {foodMenu.map((i) => (
            <li key={i}>
              <div>
                <p>{i}</p>
                <button onClick={() => addToCart(i)}>Add to Order</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div data-testid="cart">
        <ul>
          {cart.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <button disabled={cart.length === 0}>Place Order</button>
      </div>
    </>
  );
};
