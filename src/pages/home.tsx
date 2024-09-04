import React from "react";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import Style from "./home.module.css";
import { useDispatch } from "react-redux";
import { getIngredientsRequest } from "../services/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppDispatch } from "../services";

export const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  return (
    <div className={Style.App}>
      <main className={Style.burgerContainers}>
        <h1 className="text text_type_main-large mb-10 mt-5">
          Соберите бургер
        </h1>
        <DndProvider backend={HTML5Backend}>
          <div className={Style.mainSections}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    </div>
  );
};

