import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth"
import PropTypes from "prop-types";


export const ProtectedRoutElement =({element})=>{
    let auth = useAuth();

    return  auth.user? element : <Navigate to ="/login"/>
}

ProtectedRoutElement.propTypes={
    element: PropTypes.node.isRequired,
}
