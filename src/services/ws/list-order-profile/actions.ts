import { createAction } from "@reduxjs/toolkit";

export const wsConnectProfile = createAction<string, "PROFILE_LIST_ORDER_CONNECT">("PROFILE_LIST_ORDER_CONNECT");
export const wsDisconnectProfile = createAction("PROFILE_LIST_ORDER_DISCONNECT")