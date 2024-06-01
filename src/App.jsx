import React from "react";
import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { requestIngredients } from "./requests";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    requestIngredients().then((result) => {
      setIngredients(result.data);
    });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className="burger-containers">
        <h1 align="left" className="text text_type_main-large mb-10 mt-5">
          Соберите бургер
        </h1>
        <div className="main-sections">
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
