import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestIngredients } from "./requests";

export const getIngredientsRequest = createAsyncThunk(
  "burgerIngredients/getIngredientsRequest",
  async () => {
    const result = await requestIngredients();

    return result.data;
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
    builder.addCase(getIngredientsRequest.rejected, (e) => {
      console.error(e);
      return [];
    });

    
  },
});

export const { actions, reducer } = ingredientSlice;
