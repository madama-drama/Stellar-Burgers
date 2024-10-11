import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersConfig, WebsocketStatus } from "../../../types/list-order";

export type ListOrdersStore = {
  status: WebsocketStatus;
  config: OrdersConfig | null;
  connectionError: string | null;
};

export const initialState: ListOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  config: null,
  connectionError: null,
};

export const listOrderSlice = createSlice({
  name: "listOrders",
  initialState,
  reducers: {
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<OrdersConfig>) => {
      state.config = action.payload;
    },
  },
  selectors: {
    getLiveData: (state) => state.config,
    getWebsocketStatus: (state) => state.status,
  },
});

export const { wsOpen, wsClose, wsError, wsMessage } = listOrderSlice.actions;
export const { getLiveData, getWebsocketStatus } = listOrderSlice.selectors;

export const { actions, reducer } = listOrderSlice;
