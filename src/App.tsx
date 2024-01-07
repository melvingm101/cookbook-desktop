import { Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import LoadingScreen from "./pages/LoadingScreen";
import LoginScreen from "./pages/LoginScreen";
import { ProtectedRoute } from "./containers/ProtectedRoute";
import useStore from "./zustand";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const userData = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      userData.setIsUserLoggedIn(!!user);
      userData.setIsUserLoaded();

      if (user) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomeScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
