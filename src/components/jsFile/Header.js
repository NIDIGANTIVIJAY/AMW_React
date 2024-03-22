import React, { useState } from "react";
import classes from "../cssFile/Header.module.css";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import amwLogo from "../Assets/AMW-Logo.png"
const Header = (props) => {
  const location = useLocation();
  const url = process.env.REACT_APP_SERVICE_ID;
  const nav = useNavigate();
  
  const [toggelerState, setToggelerState]=useState(true)

  const toggelerFun = ()=>{
    setToggelerState(!toggelerState)
  }
  
  const logoutFun = (e) => {
    e.preventDefault();
    axios
      .post(url + "user/logoutAll", { Authorization: `Bearer ${props.token}` })
      .then((res) => {
        console.log(res);
        nav("/");
      });
  };
  return (
    <>
      <header className={classes.header}>
      <NavLink to="/">
        <div className={classes.headerBox} >
          <img className={classes.logoImg} src={amwLogo} alt="amwLogo" />
        <h1> 
        <NavLink to="/">Aakash Metal Works</NavLink>

        </h1>
        </div>
        </NavLink>

        <div className={classes.toggelerContainer} onClick={()=> toggelerFun()}>
          <span className={classes.spanline}></span>
          <span className={classes.spanline}></span>
          <span className={classes.spanline}></span>
          

        </div>
        <nav className={toggelerState ? classes.list : classes.list2} onClick={()=> toggelerFun()}>
          <ul >
             
            <li >
              <NavLink className={location.pathname ==='/' ? "activeClass" : ""} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                className={
                  location.pathname === "/product" ? classes.activeClass : ""
                }
                to="/product"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  location.pathname === "/about" ? classes.activeClass : ""
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  location.pathname === "/contact" ? classes.activeClass : ""
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                className={
                  location.pathname === "/faq" ? classes.activeClass : ""
                }
                to="/faq"
              >
                Knowledge Centre
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={location.pathname === "/login" ? classes.activeClass : ""}
                to="/adminDashboard"
              >
                Admin Page
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </header>

    
    </>
  );
};

export default Header;

// activeClassName={classes.activeClass}
