import { configureStore } from "@reduxjs/toolkit";
import { reducer as ingredientsReducer } from "./burger-ingredients";
import { reducer as constructorReducer } from "./burger-constructor";
import { reducer as orderReducer } from "./order";

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
  },
});
