import React, { useRef } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { actions } from "../../../services/burger-constructor";
import ContainerStyle from "./container.module.css";

export const ElementContainer = ({ ingredient, order }) => {
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: "cart-ingredient",
    item: () => ({ id: ingredient.id, order }),
  });

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "cart-ingredient",
    hover(item, monitor) {
      const fromOrder = item.order;
      const toOrder = order;

      if (fromOrder === toOrder) {
        return;
      }

      const cardRect = ref.current?.getBoundingClientRect();
      const cardHalfHeight = cardRect.height / 2;

      const mouseCoords = monitor.getClientOffset();

      const yFromCardTop = mouseCoords.y - cardRect.top;
    
      if (fromOrder < toOrder && yFromCardTop < cardHalfHeight) {  //???
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
    <div className={ContainerStyle.shiftPosition} ref={ref}>
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

ElementContainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
  order: PropTypes.number.isRequired,
};
