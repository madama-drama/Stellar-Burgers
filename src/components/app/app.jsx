import React from "react";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import { useDispatch } from "react-redux";
import { getIngredientsRequest } from "../../services/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.burgerContainers}>
        <h1 className="text text_type_main-large mb-10 mt-5">
          Соберите бургер
        </h1>
        <DndProvider backend={HTML5Backend}>
          <div className={appStyle.mainSections}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
