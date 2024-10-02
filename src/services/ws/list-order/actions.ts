import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "LIST_ORDER_CONNECT">("LIST_ORDER_CONNECT");
export const wsDisconnect = createAction("LIST_ORDER_DISCONNECT")