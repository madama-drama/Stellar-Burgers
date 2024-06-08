import React from "react";
import ingredientStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModuleIngredients } from "./module-ingredients/module-ingredients";
import PropTypes from 'prop-types';

export const BurgerIngredients = ({ingredients}) => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={ingredientStyle.container}>
      <div className={ingredientStyle.tabs}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={ingredientStyle.products}>
        <ModuleIngredients ingredients={ingredients} type="bun" title="Булки" />

        <ModuleIngredients ingredients={ingredients} type="sauce" title="Соусы" />

        <ModuleIngredients ingredients={ingredients} type="main" title="Начинки" />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes={
  ingredients: PropTypes.array.isRequired,
}
