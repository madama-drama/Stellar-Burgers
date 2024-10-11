import React, { FC, useRef } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import { actions } from "../../../services/burger-constructor";
import ContainerStyle from "./container.module.css";
import { AppDispatch, useDispatch } from "../../../services";
import { IIngredient } from "../../../types/interfaces";

interface IContainerProps {
  ingredient: IIngredient;
  order: number;
}
export const ElementContainer: FC<IContainerProps> = ({
  ingredient,
  order,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [, drag] = useDrag({
    type: "cart-ingredient",
    item: () => ({ id: ingredient.id, order }),
  });

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "cart-ingredient",
    hover(item: { id: string; order: number }, monitor) {
      const fromOrder = item.order;
      const toOrder = order;

      if (fromOrder === toOrder && !ref.current) {
        return;
      }

      const cardRect = ref.current!.getBoundingClientRect();
      const cardHalfHeight = cardRect.height / 2;

      const mouseCoords = monitor.getClientOffset();

      if (!mouseCoords) {
        return;
      }

      const yFromCardTop = mouseCoords.y - cardRect.top;

      if (fromOrder < toOrder && yFromCardTop < cardHalfHeight) {
        return;
      }

      if (fromOrder > toOrder && yFromCardTop > cardHalfHeight) {
        return;
      }

      item.order = toOrder;

      dispatch(actions.swap([fromOrder, toOrder]));
    },
  });

  drag(drop(ref));

  const handleDelete = () => {
    dispatch(actions.remove(ingredient));
  };

  return (
    <div className={ContainerStyle.shiftPosition} ref={ref} data-testid='dragElement-in-container'>
      <div className={ContainerStyle.positionSize}>
        {<DragIcon type="primary" />}
      </div>
        <ConstructorElement
          thumbnail={ingredient.image_mobile}
          text={ingredient.name}
          price={ingredient.price}
          handleClose={handleDelete}
        />
    </div>
  );
};
