import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const ProtectedRoutElement = ({ element }) => {
  const location = useLocation();
  const {user, load} = useSelector((store) => store.auth);

  if(load){
    return null;
  }
  
   return user ? (
    element
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  );
};

ProtectedRoutElement.propTypes = {
  element: PropTypes.node.isRequired,
};
