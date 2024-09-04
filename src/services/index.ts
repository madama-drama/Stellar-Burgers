import { configureStore } from "@reduxjs/toolkit";
import { reducer as ingredientsReducer } from "./burger-ingredients";
import { reducer as constructorReducer } from "./burger-constructor";
import { reducer as orderReducer } from "./order";
import { reducer as authReducer } from "./auth2";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store.getState>;
