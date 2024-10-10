import React, { useEffect } from "react";
import cx from 'classnames'
import IngredientStyle from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { getIngredientsRequest } from "../../services/burger-ingredients";
import { AppDispatch, AppStore, useDispatch, useSelector } from "../../services";

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
    <div className={cx(IngredientStyle.blockAboutFood)} data-testid='ingredientDetails'>
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
