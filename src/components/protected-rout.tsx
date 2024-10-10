import React  from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppStore, useSelector } from "../services";

interface IProtectedProps {
  element: React.ReactElement;
}

export const ProtectedRoutElement = ({ element }: IProtectedProps) => {
  const location = useLocation();
  const { user, load } = useSelector((store: AppStore) => store.auth);

  if (load) {
    return null;
  }

  console.log(element)

  return user ? (
    element
  ) : (
    <Navigate to={{ pathname: "/login" }} state={{ from: location }} />
  );
};
