import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderByNumberRequest } from "../../requests";
import { checkResponse } from "../../utils";
import { IOrder } from "../../../types/list-order";

export const getOrderbyNumberRequest = createAsyncThunk(
  "orderByNumber/getOrderbyNumberRequest",
  async (number: number) => {
    const res = await orderByNumberRequest(number);
    return checkResponse(res);
  }
);

interface IState {
  order: IOrder | null;
}

const initialState: IState = {
  order: null,
};

const orderByNumberSlice = createSlice({
  name: "orderByNumber",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getOrderbyNumberRequest.fulfilled,
      (
        state,
        action: PayloadAction<{ success: boolean; orders: [IOrder] }>
      ) => {
        state.order = action.payload.orders[0];
      }
    );
    builder.addCase(getOrderbyNumberRequest.rejected, (state, e) => {
      console.error(e.error.message);
      state.order = null;
    });
  },
});

export const { actions, reducer } = orderByNumberSlice;
