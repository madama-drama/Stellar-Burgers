import React from "react";
import OverlayStyles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

export const ModalOverlay = ({onclose, children}) => {
  return (
    <div className={OverlayStyles.back} onClick={onclose}>
      <div className={OverlayStyles.shadow} />
      {children}
    </div>
  );
};

ModalOverlay.propTypes={
  onclose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
