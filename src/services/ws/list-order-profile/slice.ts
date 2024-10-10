import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersConfig, WebsocketStatus } from "../../../types/list-order";
import { ListOrdersStore } from "../list-order/slice";

export const initialState: ListOrdersStore={
    status: WebsocketStatus.OFFLINE,
    config: null,
    connectionError: null
}

export const profileListOrderSlice = createSlice({
    name: 'listOrdersProfile',
    initialState,
    reducers: {
        wsOpenProfile: (state)=>{
            state.status = WebsocketStatus.ONLINE;
        },
        wsCloseProfile: (state)=>{
            state.status = WebsocketStatus.OFFLINE;
        },
        wsErrorProfile: (state, action: PayloadAction<string>) =>{
            state.connectionError = action.payload
        },
        wsMessageProfile: (state, action: PayloadAction<OrdersConfig>)=>{
            state.config= action.payload
        }
    },
    selectors:{
        getLiveDataProfile: (state)=> state.config,
        getWebsocketStatusProfile: (state) => state.status,
    }
})

export const { wsOpenProfile, wsCloseProfile, wsErrorProfile, wsMessageProfile } = profileListOrderSlice.actions;
export const { getLiveDataProfile, getWebsocketStatusProfile } = profileListOrderSlice.selectors;

export const { actions, reducer } = profileListOrderSlice;
