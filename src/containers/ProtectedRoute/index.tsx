import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../../zustand";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const userData = useStore((state) => state.user);

  if (!userData.isUserLoaded) {
    navigate("/");
  }

  if (!userData.isUserLoggedIn) {
    navigate("/login");
  }

  return <Outlet />;
};
