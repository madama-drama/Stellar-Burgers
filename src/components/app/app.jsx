import React from "react";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { requestIngredients } from "../../requests";
import appStyle from "./app.module.css";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    requestIngredients()
      .then((result) => {
        setIngredients(result.data);
      })
      .catch((err) => {
        console.error(err);
        setIngredients([]);
      });
  }, []);

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.burgerContainers}>
        <h1 className="text text_type_main-large mb-10 mt-5">
          Соберите бургер
        </h1>
        <div className={appStyle.mainSections}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
