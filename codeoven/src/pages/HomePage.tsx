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
      <h1>The Code Oven</h1>
      <MenuList menuItems={foodMenu} onAddMenuItem={addToCart}></MenuList>
      <Cart cartItems={cartItems}></Cart>
    </>
  );
};
