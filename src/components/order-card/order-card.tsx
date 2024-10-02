import React, { FC } from "react";
import Styles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../services";
import { MiniPhotos } from "./mini-photos";
import { getUniqueIngredients, ingredientsSum } from "../../functions";

interface IOrderCard {
  orderNum: number;
  ingredients: Array<string>;
  name: string;
  time: string;
  url: string;
  orderStatus?: string;
}

export const OrderCard: FC<IOrderCard> = ({
  url,
  orderNum,
  ingredients,
  name,
  time,
  orderStatus,
}) => {
  const location = useLocation();
  const allIngredients = useSelector(
    (store: AppStore) => store.ingredients.ingredients
  );

  const orderIngredient = ingredients.map(
    (value) => allIngredients.find((v) => value === v._id)!
  );

  if (!orderIngredient) {
    return null;
  }

  let sum = ingredientsSum(orderIngredient);

  let uniqueIngredients = getUniqueIngredients(orderIngredient);

  const miniPhotos = uniqueIngredients
    .slice(0, 6)
    .map((value, idx) => (
      <MiniPhotos
        key={idx}
        image={value?.image_mobile}
        name={value?.name}
        index={orderIngredient.length - idx}
      />
    ));

  return (
    <Link
      to={url}
      state={{ background: location }}
      className={Styles.linkBlock}
    >
      <div className={Styles.block}>
        <div className={` ${Styles.timeAndNumber}`}>
          <p className="text text_type_digits-default">#{orderNum}</p>

          <FormattedDate
            date={new Date(time)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>

        <div className={Styles.nameBlock}>
          <h1 className={`text text_type_main-medium mt-6 `}>{name}</h1>
        </div>

        {orderStatus &&
          ((orderStatus === "done" && (
            <h2 className={`text text_type_main-small ${Styles.done}`}>Выполнен</h2>
          )) ||
            (orderStatus === "pending" && (
              <h2 className={`text text_type_main-small`}>Готовится</h2>
            )) ||
            orderStatus === "created" || (
              <h2 className={`text text_type_main-small`}>Создан</h2>
            ))}

        <div className={Styles.priceAndPhotos}>
          <div className={Styles.photosBlock}> {miniPhotos}</div>
          <div className={Styles.price}>
            <p className="text text_type_digits-default">{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
