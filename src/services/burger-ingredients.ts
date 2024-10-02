import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestIngredients } from "./requests";
import { IIngredient } from "../types/interfaces";

export const getIngredientsRequest = createAsyncThunk(
  "burgerIngredients/getIngredientsRequest",
  async () => {
    const result = await requestIngredients();

    return result.data;
  }
);

interface IState {
  ingredients: IIngredient[];
}

const initialState: IState = {
  ingredients: [],
};

const ingredientSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsRequest.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });

    builder.addCase(getIngredientsRequest.rejected, (state, e) => {
      console.error(e.error.message);
      state.ingredients = [];
    });
  },
});

export const { actions, reducer } = ingredientSlice;
