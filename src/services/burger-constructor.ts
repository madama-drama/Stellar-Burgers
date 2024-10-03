import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../types/interfaces";

interface IState {
  ingredients: IIngredient[];
}

const initialState: IState = {
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    add: {
      reducer: (
        state,
        action: PayloadAction<IIngredient & { newId: string }>
      ) => {
        const { newId, ...ingr } = action.payload;

        const newIngr = { ...ingr };
        newIngr.id = newId;

        if (newIngr.type === "bun") {
          state.ingredients[0] = newIngr;
          return;
        }

        state.ingredients = [...state.ingredients, newIngr];
      },
      prepare: (ingr: IIngredient) => {
        let newId = nanoid();

        return { payload: { ...ingr, newId } };
      },
    },
    remove(state, action: PayloadAction<Pick<IIngredient, 'id'>>) {
      state.ingredients = [
        ...state.ingredients.filter((ingr) => ingr.id !== action.payload.id),
      ];
    },
    swap(state, { payload }: PayloadAction<[number, number]>) {
      const a = state.ingredients[payload[0]];

      state.ingredients[payload[0]] = state.ingredients[payload[1]];
      state.ingredients[payload[1]] = a;
    },
  },
});

export const { actions, reducer } = constructorSlice;
