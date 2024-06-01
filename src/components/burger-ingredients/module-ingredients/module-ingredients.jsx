import React from "react";
import PropTypes from "prop-types";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import ModuleIngredientsStyle from "./module-ingredients.module.css";

export const ModuleIngredients = ({ ingredients, type, title }) => {
  const ingradientsArray = ingredients
    .filter((sandwichItem) => sandwichItem.type === type)
    .map((ingr) => <CardIngredient ingredient={ingr} />);

  return (
    <div>
      <h2 align="left" className={`text text_type_main-medium mt-10 mb-6`}>
        {title}
      </h2>
      <div className={ModuleIngredientsStyle.cardContainer}>
        {ingradientsArray}
      </div>
    </div>
  );
};

ModuleIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
