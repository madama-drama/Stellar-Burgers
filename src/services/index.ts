import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as ingredientsReducer } from "./burger-ingredients";
import { reducer as constructorReducer } from "./burger-constructor";
import { reducer as orderReducer } from "./order";
import { reducer as authReducer } from "./auth2";
import { reducer as orderByNumberReducer } from "./ws/order-by-number/slice";
import {
  listOrderSlice,
  wsClose,
  wsError,
  wsMessage,
  wsOpen,
} from "./ws/list-order/slice";
import { socketMiddleware } from "./ws/middleware/socket-middleware";
import { wsConnect, wsDisconnect } from "./ws/list-order/actions";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { OrdersConfig } from "../types/list-order";
import {
  wsConnectProfile,
  wsDisconnectProfile,
} from "./ws/list-order-profile/actions";
import {
  profileListOrderSlice,
  wsCloseProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from "./ws/list-order-profile/slice";

const liveListMiddleware = socketMiddleware<OrdersConfig, AppStore>({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

const profileListMiddleware = socketMiddleware<OrdersConfig, AppStore>({
  connect: wsConnectProfile,
  disconnect: wsDisconnectProfile,
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onError: wsErrorProfile,
  onMessage: wsMessageProfile,
});

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  orderByNumber: orderByNumberReducer,
  [listOrderSlice.reducerPath]: listOrderSlice.reducer,
  [profileListOrderSlice.reducerPath]: profileListOrderSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      liveListMiddleware,
      profileListMiddleware
    );
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof rootReducer>;

export const useSelector = selectorHook.withTypes<AppStore>();
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
