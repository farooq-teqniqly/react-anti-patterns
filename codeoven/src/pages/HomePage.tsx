import { useState } from "react";
import { foodMenu } from "../data/MenuItems";
import { MenuList } from "../components/MenuList";
import { Cart } from "../components/Cart";

export const HomePage = () => {
  const [cartItems, setCart] = useState<string[]>([]);

  const addToCart = (item: string) => {
    setCart([...cartItems, item]);
  };

  return (
    <>
      <h1 className="text-3xl">The Code Oven</h1>
      <div className="p-4 flex space-x-10">
        <MenuList menuItems={foodMenu} onAddMenuItem={addToCart}></MenuList>
        <div className="border border-black p-10">
          <Cart cartItems={cartItems}></Cart>
        </div>
      </div>
    </>
  );
};
