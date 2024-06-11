import { createSlice } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: {
    ingredients: [],
  },
  reducers: {
    add(state, action) {
      const newIngr = { ...action.payload };
      let newId = Math.random();
      newIngr.id = `${newId}`;

      if (newIngr.type === "bun") {
        state.ingredients[0] = newIngr;
        return;
      }

      state.ingredients = [...state.ingredients, newIngr];
    },
    remove(state, action) {
      state.ingredients = [
        ...state.ingredients.filter((ingr) => ingr.id !== action.payload.id),
      ];
    },
    swap(state, { payload }) {
      const a = state.ingredients[payload[0]];
      
      state.ingredients[payload[0]] = state.ingredients[payload[1]]
      state.ingredients[payload[1]] = a;
    },
  },
});

export const { actions, reducer } = constructorSlice;
