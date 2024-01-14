type Props = {
  cartItems: string[];
};

export const Cart = ({ cartItems }: Props) => {
  return (
    <div data-testid="cart">
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem}>{cartItem}</li>
        ))}
      </ul>
      <button disabled={cartItems.length === 0}>Place Order</button>
    </div>
  );
};
