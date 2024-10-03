import React, { FC } from "react";
import Style from "./ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MiniPhotos } from "../order-card/mini-photos";

interface IIngredientProps {
  photo: string;
  name: string;
  price: number;
  type: string
  counter: number
}

export const Ingredient: FC<IIngredientProps> = ({ photo, name, price, type, counter }) => {

  return (
    <div className={Style.structureId}>
      <MiniPhotos image={photo} className={Style.noMargins}/>
      <h3 className="text text_type_main-default ml-4 ">
        {name}
      </h3>
      <div className={Style.price}>
        <p className="text text_type_digits-default mr-2">{`${counter} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
