import React, { FC } from "react";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import ModuleIngredientsStyle from "./module-ingredients.module.css";
import { useSelector } from "react-redux";

import { AppStore } from "../../../services";

interface IModuleProps {
  type: "sauce" | "main" | "bun";
  title: string;
}

export const ModuleIngredients: FC<IModuleProps> = ({ type, title }) => {
  const ingredients = useSelector(
    (store: AppStore) => store.ingredients.ingredients
  );

  const ingradientsArray = ingredients
    .filter((sandwichItem) => sandwichItem.type === type)
    .map((ingr) => <CardIngredient ingredient={ingr} key={ingr._id} />);

  return (
    <div>
      <h2
        className={`text text_type_main-medium mt-10 mb-6 ${ModuleIngredientsStyle.moduleTitle}`}
      >
        {title}
      </h2>
      <div className={ModuleIngredientsStyle.cardContainer}>
        {ingradientsArray}
      </div>
    </div>
  );
};
