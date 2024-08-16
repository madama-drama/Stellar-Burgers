import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestIngredients } from "./requests";

export const getIngredientsRequest = createAsyncThunk(
  "burgerIngredients/getIngredientsRequest",
  async () => {
    try {
      const result = await requestIngredients();

      return result.data;
    } catch (e) {

      console.error(e);
      return [];
    }
  }
);

const ingredientSlice = createSlice({
  name: "burgerIngredients",
  initialState: {
    ingredients: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsRequest.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  },
});

export const { actions, reducer } = ingredientSlice;
