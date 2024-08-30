import { createSlice, nanoid } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: {
    ingredients: [],
  },
  reducers: {
    add: {
      reducer: (state, action) => {
        const { newId, ...ingr } = action.payload;

        const newIngr = { ...ingr };
        newIngr.id = newId;

        if (newIngr.type === "bun") {
          state.ingredients[0] = newIngr;
          return;
        }

        state.ingredients = [...state.ingredients, newIngr];
      },
      prepare: (ingr) => {
        let newId = nanoid();
        return { payload: { ...ingr, newId } };
      },
    },
    remove(state, action) {
      state.ingredients = [
        ...state.ingredients.filter((ingr) => ingr.id !== action.payload.id),
      ];
    },
    swap(state, { payload }) {
      const a = state.ingredients[payload[0]];

      state.ingredients[payload[0]] = state.ingredients[payload[1]];
      state.ingredients[payload[1]] = a;
    },
  },
});

export const { actions, reducer } = constructorSlice;
