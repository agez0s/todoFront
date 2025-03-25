import { Navigate, Outlet, Route, Routes } from "react-router";
import { LoginPage } from "../pages/Login";
import { useAuth } from "../store/auth";
import { HomePage } from "../pages/Home";
import { api } from "../services/api";

export const TodoRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" Component={HomePage} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Route>
    </Routes>
  );
};

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/" />;
  if (!auth.user) {
    auth.refresh();
  }
  return <Outlet />;
};
