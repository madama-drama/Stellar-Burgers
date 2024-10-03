import React, { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppStore, useSelector } from "../services";

interface IProtectedProps {
  element: ReactNode;
}

export const ProtectedRoutElement: FC<IProtectedProps> = ({ element }) => {
  const location = useLocation();
  const { user, load } = useSelector((store: AppStore) => store.auth);

  if (load) {
    return null;
  }

  return user ? (
    element
  ) : (
    <Navigate to={{ pathname: "/login" }} state={{ from: location }} />
  );
};
