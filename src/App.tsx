import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  OrdersHistory,
  Feeds,
  OrderNumber,
  OrderProfileNumber,
} from "./pages";

import { ProtectedRoutElement } from "./components/protected-rout";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { Modal } from "./components/modal/modal";

import { getAuthorizationRequest } from "./services/auth2";
import { AppDispatch } from "./services";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
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
        <Route path="/feed" element={<Feeds />} />
        <Route path="/feed/:orderNumber" element={<OrderNumber />} />
        <Route
          path="/profile"
          element={<ProtectedRoutElement element={<Profile />} />}
        />
        <Route
          path="/profile/:orders"
          element={<ProtectedRoutElement element={<OrdersHistory />} />}
        />
        <Route
          path="/profile/orders/:orderNumber"
          element={<ProtectedRoutElement element={<OrderProfileNumber />} />}
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
          <Route
            path="/feed/:orderNumber"
            element={
              <Modal onClose={onClose}>
                <OrderNumber />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:orderNumber"
            element={
              <Modal onClose={onClose}>
                <OrderProfileNumber />
              </Modal>
            }
          />
        </Routes>
      )}

      <ToastContainer position="top-right" theme="colored" />
    </>
  );
};
