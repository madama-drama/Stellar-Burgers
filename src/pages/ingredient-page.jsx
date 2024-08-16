import React, { useEffect } from "react";
import Style from "./ingredient-page.module.css";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredientsRequest } from "../services/burger-ingredients";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  const ingredients = useSelector((store) => store.ingredients.ingredients);

  if (ingredients.length === 0) {
    return null;
  }

  const ingredient = ingredients.find((value) => value._id === params._id);

  if (!ingredient) {
    return null;
  }
  console.log(ingredient);

  return (
    <div className={Style.block}>
      <h1 className="text text_type_main-large mb-8">Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
