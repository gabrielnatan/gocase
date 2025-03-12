import { AppTopbar } from "@/components/app-topbar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useCustomerStore } from "@/store";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const { access_token } = useCustomerStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token === "") {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div className="flex h-[100vh] w-screen">
      <div className="flex-1 max-w-[250px] h-screen">
        <AppSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex max-h-[64px] flex-1 ">
          <AppTopbar />
        </div>

        <div className="flex flex-1 p-5 overflow-auto bg-sky-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
