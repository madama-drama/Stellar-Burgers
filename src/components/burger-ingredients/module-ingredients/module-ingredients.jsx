import React from "react";
import PropTypes from "prop-types";
import { CardIngredient } from "../card-ingredient/card-ingredient";
import ModuleIngredientsStyle from "./module-ingredients.module.css";
import { useSelector } from "react-redux";

export const ModuleIngredients = ({ type, title }) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const ingradientsArray = ingredients
    .filter((sandwichItem) => sandwichItem.type === type)
    .map((ingr) => <CardIngredient ingredient={ingr} key={ingr._id} />);

  return (
    <div>
      <h2 className={`text text_type_main-medium mt-10 mb-6 ${ModuleIngredientsStyle.moduleTitle}`}>
        {title}
      </h2>
      <div className={ModuleIngredientsStyle.cardContainer}>
        {ingradientsArray}
      </div>
    </div>
  );
};

ModuleIngredients.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
