import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Campaign } from "./pages/campaign";
import { AuthLayout } from "./layout/auth";
import { CreateAccount } from "./pages/createAccount";
import { DashboardLayout } from "./layout/dashboard";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AuthLayout}>
          <Route path="/auth/login" Component={Login} />
          <Route path="/auth/create-account" Component={CreateAccount} />
        </Route>
        <Route Component={DashboardLayout}>
          <Route path="/" Component={Home} />
          <Route path="/campaign" Component={Campaign} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
