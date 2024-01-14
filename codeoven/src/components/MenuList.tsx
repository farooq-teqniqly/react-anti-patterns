type Props = {
  menuItems: string[];
  onAddMenuItem: (item: string) => void;
};

export const MenuList = ({ menuItems, onAddMenuItem }: Props) => {
  return (
    <div data-testid="menuList">
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem}>
            <div>
              <p>{menuItem}</p>
              <button onClick={() => onAddMenuItem(menuItem)}>Add to Order</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
