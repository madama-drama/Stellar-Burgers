import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AppHeader } from "./components/app-header/app-header";
import {
  Homepage,
  LoginPage,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Orders,
  IngredientPage,
} from "./pages";
import { ProvideAuth } from "./services/auth";
import { ProtectedRoutElement } from "./services/protected-rout";

export const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ingredient/:_id" element={<IngredientPage />} />
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

        <ToastContainer position="top-right" theme="colored" />
      </BrowserRouter>
    </ProvideAuth>
  );
};
