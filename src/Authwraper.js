import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Authwrapper = ({ children }) => {
    const isAuthenticated = useSelector(state => state.Login.token);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!isAuthenticated) {
        navigate("/Admin/Login"); // Redirect to login page if not authenticated
     
      }
  
    

  },[isAuthenticated])

  if (!isAuthenticated) {
  
    return null;
  }else{
    return children;

  }
 
};

export default Authwrapper;
