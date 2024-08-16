import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import {
  authRequest,
  emailRequest,
  logOutRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
  updatingRequest,
} from "./requests";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  useEffect(() => {
    auth.authorization();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.load) {
    return null;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);

  //РЕГИСТРАЦИЯ
  const reg = async (registerData) => {
    setLoad(true);
    const data = await registerRequest(registerData).then((result) =>
      result.json()
    );

    if (data.success) {
      setLoad(false);
      setUser({ ...data.user });
    }
  };

  //ВХОД
  const logIn = async (loginData) => {
    setLoad(true);
    const data = await loginRequest(loginData).then((result) => {
      return result.json();
    });

    window.localStorage.setItem("access", data.accessToken);
    window.localStorage.setItem("refresh", data.refreshToken);

    if (data.success) {
      setLoad(false);
      setUser({ ...data.user });
    }
  };

  //АВТОРИЗАЦИЯ
  const authorization = async () => {
    if (!window.localStorage.getItem("access")) {
      setLoad(false);
      return;
    }

    const data = await authRequest().then((result) => result.json());

    if (data.success) {
      setUser({ ...data.user });
    }
    setLoad(false);
  };

  //ВЫХОД
  const logOut = async () => {
    setLoad(true);
    const data = await logOutRequest().then((result) => result.json());

    if (data.success) {
      setLoad(false);
      window.localStorage.removeItem("access");
      window.localStorage.removeItem("refresh");
      setUser(null);
    }
  };

  //ЗАПРОС ПОЧТЫ
  const sendEmail = async (emailData) => {
    const data = await emailRequest(emailData).then((result) => result.json());

    if (data.success) {
      setUser({ ...data.user });
    }
    return data.success;
  };

  //ВОССТАНОВЛЕНИЕ ПАРОЛЯ
  const resetPassword = async (passwordData) => {
    setLoad(true);
    const data = await resetPasswordRequest(passwordData).then(
      (result) => result.json
    );

    if (data.success) {
      setLoad(false);
      setUser({ ...data.user });
    }

    return data.success;
  };

  //ИЗМЕНЕНИЯ ДАННЫХ
  const updateData = async (update) => {

    const data = await updatingRequest(update).then((result) => result.json);

    if (data.success) {
      setLoad(false);
      window.localStorage.getItem("refresh");
      setUser({ ...data.user });
    }
  };

  return {
    user,
    load,
    reg,
    logIn,
    logOut,
    authorization,
    sendEmail,
    resetPassword,
    updateData,
  };
};

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
