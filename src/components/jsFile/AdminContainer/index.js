import React, { useState, useEffect } from "react";
import AdminDashboard from "../AdminDashboard";
import classes from "../../cssFile/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Auth";
import { Link, useNavigate } from "react-router-dom";
import Sales from "../Sales";
const AdminContainer = () => {
  const nav = useNavigate();

  const [showProduct, setShowProduct] = useState(false);
  const userlogin = useSelector((state) => state.Common.login);

   

  useEffect(() => {
    console.log(userlogin,"userloginuserlogin")

    if (userlogin === false) {
      nav("/login");
    }
   
  }, [userlogin]);



  return (
    <>
      {userlogin === false ? (
        <Auth></Auth>
      ) : (
        <main className={classes.home}>
          {showProduct ? (
            <AdminDashboard  setShowProduct={setShowProduct}/>
          ) : (
            <>
            

              <Sales setShowProduct={setShowProduct} />
            </>
          )}
        </main>
      )}
    </>
  );
};
export default AdminContainer;
