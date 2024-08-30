import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestsOrder } from "./requests";

const initialState = {
  name: null,
  order: {
    number: null,
  },
  success: null,
};

export const postOrderRequest = createAsyncThunk(
  "order/postOrderRequest",
  async (orederIds) => {
    try {
      const result = await requestsOrder(orederIds);
    
      return result;
    } catch (e) {
      console.error(e);
      return initialState;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrderRequest.fulfilled, (state, action) => {
        return action.payload;
    });
  },
});

export const { actions, reducer } = orderSlice;
