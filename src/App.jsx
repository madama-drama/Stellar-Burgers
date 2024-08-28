import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppHeader } from "./components/app-header/app-header";
import {
  Homepage,
  LoginPage,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Orders,
} from "./pages";
import { ProtectedRoutElement } from "./components/protected-rout";
import { useDispatch } from "react-redux";
import { getAuthorizationRequest } from "./services/auth2";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { Modal } from "./components/modal/modal";

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAuthorizationRequest());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={<ProtectedRoutElement element={<Profile />} />}
        />
        <Route
          path="/profile/:orders"
          element={<ProtectedRoutElement element={<Orders />} />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title={"Детали ингредиента"} onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      <ToastContainer position="top-right" theme="colored" />
    </>
  );
};
