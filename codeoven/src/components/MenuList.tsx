type Props = {
  menuItems: string[];
  onAddMenuItem: (item: string) => void;
};

export const MenuList = ({ menuItems, onAddMenuItem }: Props) => {
  return (
    <div data-testid="menuList">
      <ul className="space-y-4">
        {menuItems.map((menuItem) => (
          <li key={menuItem}>
            <div className="flex items-center space-x-4 justify-between border border-black p-4">
              <p className="text-xl font-bold">{menuItem}</p>
              <button
                onClick={() => onAddMenuItem(menuItem)}
                className="bg-orange-300 rounded-md p-4 cursor-pointer hover:bg-orange-500 focus:ring-2"
              >
                Add to Order
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
