import React, { FC, ReactNode } from "react";
import OverlayStyles from "./modal-overlay.module.css";

interface IOverlayProps{
  onClose: ()=>void,
  children: ReactNode
}
export const ModalOverlay: FC<IOverlayProps> = ({ onClose, children }) => {
  return (
    <div className={OverlayStyles.back} >
      <div className={OverlayStyles.shadow} onClick={onClose}/>
      {children}
    </div>
  );
};
