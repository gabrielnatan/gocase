import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="w-full min-w-full max-w-full h-screen min-h-screen max-h-screen overflow-hidden flex gap-1">
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
      <div className="flex-1 bg-gray-700 "></div>
    </div>
  );
};
