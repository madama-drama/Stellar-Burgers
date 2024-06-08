import React from "react";
import OverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = ({ onClose, children }) => {
  return (
    <div className={OverlayStyles.back} >
      <div className={OverlayStyles.shadow} onClick={onClose}/>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
