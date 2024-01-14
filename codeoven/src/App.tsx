import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
