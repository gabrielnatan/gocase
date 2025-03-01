import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AuthLayout } from "./layout/auth";
import { CreateAccount } from "./pages/CreateAccount";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AuthLayout}>
          <Route path="/auth/login" Component={Login} />
          <Route path="/auth/create-account" Component={CreateAccount} />
        </Route>
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};
