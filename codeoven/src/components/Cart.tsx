type Props = {
  cartItems: string[];
};

export const Cart = ({ cartItems }: Props) => {
  return (
    <div data-testid="cart">
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem} className="font-bold text-xl">
            {cartItem}
          </li>
        ))}
      </ul>
      <button
        disabled={cartItems.length === 0}
        className="bg-orange-300 rounded-md p-4 cursor-pointer hover:bg-orange-500 focus:ring-2 mt-5"
      >
        Place Order
      </button>
    </div>
  );
};
