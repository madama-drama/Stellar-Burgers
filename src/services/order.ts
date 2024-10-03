import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import type { IIngredient } from "../types/interfaces";
import { requestsOrder } from "./requests";

export const postOrderRequest = createAsyncThunk(
  "order/postOrderRequest",
  async (ingredientIds: IIngredient['_id'][]) => {
    const result = await requestsOrder(ingredientIds);

    return result;
  }
);

interface IState {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

const initialState: IState = {
  name: " ",
  order: {
    number: 0,
  },
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postOrderRequest.fulfilled,
      (_, action: PayloadAction<IState>) => {
        return action.payload;
      }
    );

    builder.addCase(postOrderRequest.rejected, (_, e) => {
      console.error(e.error.message);
      return initialState;
    });
  },
});

export const { actions, reducer } = orderSlice;
