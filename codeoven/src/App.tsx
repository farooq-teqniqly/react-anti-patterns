import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
