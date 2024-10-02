import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  authRequest,
  emailRequest,
  loginRequest,
  logOutRequest,
  registerRequest,
  resetPasswordRequest,
  updatingRequest,
} from "./requests";
import { checkResponse, handleRejected } from "./utils";
import { IRegist } from "../pages/register";
import { ILogin } from "../pages/login";
import { ITokens, IUser } from "../types/interfaces";

//РЕГИСТРАЦИЯ
export const getRegistrRequest = createAsyncThunk(
  "auth/getRegistrRequest",
  async ({
    registerData,
    onSuccess,
  }: {
    registerData: IRegist;
    onSuccess: () => void;
  }) => {
    const res = await registerRequest(registerData);
    const data: ITokens & { user: IUser } = await checkResponse(res);

    window.localStorage.setItem("access", data.accessToken);
    window.localStorage.setItem("refresh", data.refreshToken);

    onSuccess();

    return data.user;
  }
);

//ВХОД
export const getLogInRequest = createAsyncThunk(
  "auth/getLogInRequest",
  async ({
    loginData,
    onSuccess,
  }: {
    loginData: ILogin;
    onSuccess: () => void;
  }) => {
    const res = await loginRequest(loginData);
    const data: ITokens & { user: IUser } = await checkResponse(res);

    window.localStorage.setItem("access", data.accessToken);
    window.localStorage.setItem("refresh", data.refreshToken);

    onSuccess();

    return data.user;
  }
);

//АВТОРИЗАЦИЯ
export const getAuthorizationRequest = createAsyncThunk(
  "auth/getAuthorizationRequest",
  async () => {
    const x = window.localStorage.getItem("access");
    if (!x || x === "undefined") {
      return;
    }
    const res = await authRequest();
    const data = checkResponse(res);

    return data;
  }
);

//ВЫХОД
export const getLogOutRequest = createAsyncThunk(
  "auth/getLogOutRequest",
  async () => {
    const res = await logOutRequest();

    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");

    return checkResponse(res);
  }
);

//ЗАПРОС ПОЧТЫ
export const getSendEmailRequest = createAsyncThunk(
  "auth/getSendEmailRequest",
  async ({ email, onSuccess }: { email: string; onSuccess: () => void }) => {
    const res = await emailRequest(email);

    const data: ITokens & IUser = await checkResponse(res);

    onSuccess();

    return data;
  }
);

//ВОССТАНОВЛЕНИЕ ПАРОЛЯ
export const getResetPasswordRequest = createAsyncThunk(
  "auth/getResetPasswordRequest",
  async ({
    password,
    onSuccess,
  }: {
    password: string;
    onSuccess: () => void;
  }) => {
    const res = await resetPasswordRequest(password);

    const data = await checkResponse(res);

    onSuccess();

    return data;
  }
);

//ИЗМЕНЕНИЕ ДАННЫХ
export const getUpdateDataRequest = createAsyncThunk(
  "auth/getUpdateDataRequest",
  async ({ value, password }: { value: IUser; password: string }) => {
    const res = await updatingRequest({ value, password });

    return checkResponse(res);
  }
);

export interface IState {
  load: boolean;
  user: IUser | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    load: true,
    user: null,
  } as IState,
  reducers: {},
  extraReducers: (builder) => {
    //РЕГИСТРАЦИЯ
    builder.addCase(getRegistrRequest.fulfilled, (state, action) => {
      state.load = false;
      state.user = action.payload;
    });
    builder.addCase(getRegistrRequest.rejected, handleRejected);

    //ВХОД
    builder.addCase(getLogInRequest.fulfilled, (state, action) => {
      state.load = false;
      state.user = action.payload;
    });
    builder.addCase(getLogInRequest.rejected, handleRejected);

    //АВТОРИЗАЦИЯ
    builder.addCase(getAuthorizationRequest.fulfilled, (state, action) => {
      state.load = false;
      state.user = action.payload;
    });
    builder.addCase(getAuthorizationRequest.rejected, (state, action) =>
      handleRejected(state, action, { noToast: true })
    );

    //ВЫХОД
    builder.addCase(getLogOutRequest.fulfilled, (state) => {
      state.load = false;
      state.user = null;
    });
    builder.addCase(getLogOutRequest.rejected, handleRejected);

    //ЗАПРОС ПОЧТЫ
    builder.addCase(getSendEmailRequest.fulfilled, (state) => {
      state.load = false;
    });
    builder.addCase(getSendEmailRequest.rejected, handleRejected);

    //ВОССТАНОВЛЕНИЕ ПАРОЛЯ
    builder.addCase(getResetPasswordRequest.fulfilled, (state) => {
      state.load = false;
    });
    builder.addCase(getResetPasswordRequest.rejected, handleRejected);

    //ИЗМЕНЕНИЕ ДАННЫХ
    builder.addCase(getUpdateDataRequest.fulfilled, (state, action) => {
      window.localStorage.getItem("refresh");
      state.load = false;
      state.user = action.payload;
    });
    builder.addCase(getUpdateDataRequest.rejected, handleRejected);
  },
});

export const { actions, reducer } = authSlice;
