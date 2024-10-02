import React, { useEffect } from "react";
import IngredientStyle from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredientsRequest } from "../../services/burger-ingredients";
import { AppDispatch, AppStore } from "../../services";

export const IngredientDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  const ingredients = useSelector(
    (store: AppStore) => store.ingredients.ingredients
  );

  if (ingredients.length === 0) {
    return null;
  }

  const ingredient = ingredients.find(
    (value) => value._id === params.ingredientId
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className={IngredientStyle.blockAboutFood}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h2 className="text text_type_main-medium">{ingredient.name}</h2>
      <ul className={IngredientStyle.foodEnergyList}>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал{" "}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${IngredientStyle.energyValue}`}
          >
            {" "}
            {ingredient.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г{" "}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${IngredientStyle.energyValue}`}
          >
            {ingredient.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г{" "}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${IngredientStyle.energyValue}`}
          >
            {ingredient.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г{" "}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${IngredientStyle.energyValue}`}
          >
            {" "}
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
