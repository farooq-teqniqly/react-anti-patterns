import { foodMenu } from "../MenuItems";

export const HomePage = () => {
  return (
    <>
      <h1>The Code Oven</h1>
      <ul>
        {foodMenu.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </>
  );
};
