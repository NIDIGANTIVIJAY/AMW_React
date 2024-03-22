import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import amwLogo from "../../../components/Assets/AMW-Logo.png"
import logoutIcon from "../../../components/Assets/switch.png"

import Notification from "./Notification";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "./LoaderModal";
import axiosInstance from "./axiosconfig";
const Component = () => {

  const [toggelerState, setToggelerState] = useState(true);
  const [activeBarDash, setActiveBarDash] = useState("");
  const [activeInvBar, setActiveInvBar] = useState("");
  const [activeProBar, setActiveProBar] = useState("");
  const [activeAccBar, setActiveAccBar] = useState("");
  const [sideBarBtn, setSideBarBtn] = useState("sideBarBtn");
  const [showModal, setShowModal] = useState(false)
  const [showNotiMessg, setShowNotifiMessg] = useState("")

  console.log(showModal, "show")

  const url=process.env.REACT_APP_SERVICE_ID


  const location = useLocation();
    useEffect(()=>{
  console.log(location.pathname, "abisj")  
  if(location.pathname === "/admin/Dashboard"){
    setActiveBarDash("sideBarBtnActive")
    setActiveProBar("")
    setActiveAccBar("")
    setActiveInvBar("")
  }

    if(location.pathname === "/admin/invoice"){
      console.log("IN INVOICE")
      setActiveBarDash("")
      setActiveProBar("")
      setActiveAccBar("")
      setActiveInvBar("sideBarBtnActive")
  
    }
    if(location.pathname === "/admin/production"){
      setActiveBarDash("")
      setActiveProBar("sideBarBtnActive")
      setActiveAccBar("")
      setActiveInvBar("")
  
    }
  
    if(location.pathname === "/admin/accounts"){
      setActiveBarDash("")
    setActiveProBar("")
    setActiveAccBar("sideBarBtnActive")
    setActiveInvBar("")
  
    }
  
    },[location.pathname])


    const routeFun=()=>{
      
  if(location.pathname === "/admin/Dashboard"){
    setActiveBarDash("sideBarBtnActive")
    setActiveProBar("")
    setActiveAccBar("")
    setActiveInvBar("")
  }

    if(location.pathname === "/admin/invoice"){
      console.log("IN INVOICE")
      setActiveBarDash("")
      setActiveProBar("")
      setActiveAccBar("")
      setActiveInvBar("sideBarBtnActive")
  
    }
    if(location.pathname === "/admin/production"){
      setActiveBarDash("")
      setActiveProBar("sideBarBtnActive")
      setActiveAccBar("")
      setActiveInvBar("")
  
    }
    if(location.pathname === "/admin/accounts"){
      setActiveBarDash("")
    setActiveProBar("")
    setActiveAccBar("sideBarBtnActive")
    setActiveInvBar("")
  
    }
  
    }

  const nav = useNavigate();
  const token=useSelector((state)=>state.Login.token)
  console.log(token,"OPITOKEN")
  const AdminDashboardChange = () => {
    nav("/admin/Dashboard");
    setActiveBarDash("sideBarBtnActive")
    setActiveProBar("")
    setActiveAccBar("")
    setActiveInvBar("")
  };
  const InvoicesideBarChange = () => {
    nav("/admin/invoice");
    setActiveBarDash("")
    setActiveProBar("")
    setActiveAccBar("")
    setActiveInvBar("sideBarBtnActive")
  };
  const ProductionsideBarChange = () => {
    nav("/admin/production");
    setActiveBarDash("")
    setActiveProBar("sideBarBtnActive")
    setActiveAccBar("")
    setActiveInvBar("")
  };
  const AccountsideBarChange = () => {
    nav("/admin/accounts");
    setActiveBarDash("")
    setActiveProBar("")
    setActiveAccBar("sideBarBtnActive")
    setActiveInvBar("")
  };
  const ExpensessideBarChange = () => {
    nav("/admin/expenses");
  };

  const landingPage = ()=>{
    nav("/admin/Dashboard");
    setActiveBarDash("sideBarBtnActive")
    setActiveProBar("")
    setActiveAccBar("")
    setActiveInvBar("")
  }
  const dispatch=useDispatch()
  
  

  



  // if(nav("/admin/Dashboard")=== true){

  // }

  const toggelerFun = () => {
    setToggelerState(!toggelerState);
  };
  const logoutFun = (e) => {
    axiosInstance
      .post("user/logoutAll")
      .then((res) => {
        console.log(res);
        dispatch({
          type:"TOKEN",
          payload:false
         })
         
         dispatch({
          type:"LOGIN",
          payload:false
         })
        nav("/admin");
      });
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <div className="logoContainer" >
            <img  className={"logoImg"} src={amwLogo} alt="amwLogo" onClick={() => landingPage()} />
            <p>Aakash Metal Works</p>
          </div>


        <div className="logoutWrapper">
          <div className={"toggelerContainer"} onClick={() => toggelerFun()}>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
          </div>

          <div> 
            {/* <button type="submit" onClick={()=>{logoutFun()}}> */}
              <img className="logoutIcon" src={logoutIcon} alt="" onClick={()=>{
              setShowNotifiMessg("Are you sure you want to LogOut ?")
                
                setShowModal(true)}}/>
            {/* </button> */}

          </div>
          </div>
        </div>

        <div className="navbar">
          <nav
            className={toggelerState ? "list" : "list2"}
            onClick={() => toggelerFun()}
          >
            <div className="side-nav--diere">

            <span
                // className={"sideBarBtn"}
                className={` ${activeBarDash} ${sideBarBtn}`}
                onClick={() => {
                  AdminDashboardChange();
                }}
              >
               Dashboard
              </span>
              <span
                className={` ${activeInvBar} ${sideBarBtn}`}
                onClick={() => {
                  InvoicesideBarChange();
                }}
              >
                InVoice Geneartion
              </span>
              <span
                className={` ${activeProBar} ${sideBarBtn}`}
                onClick={() => {
                  ProductionsideBarChange();
                }}
              >
                Production
              </span>
              <span
                className={` ${activeAccBar} ${sideBarBtn}`}
                onClick={() => {
                  AccountsideBarChange();
                }}
              >
                Account Section
              </span>
              {/* <span
                className={` ${activeBar} ${sideBarBtn}`}
                onClick={() => {
                  ExpensessideBarChange();
                }}
              >
                Expenses
              </span> */}
            </div>
          </nav>

          <div className="content-view">
            <Outlet />
          </div>
        </div>


      </div>


     { showModal &&
        <Notification showNotiMoadal={showModal} setShowNotifiModal={setShowModal}
        Fun={logoutFun}
         message={showNotiMessg}/>
}

      
    </>
  );
};

export default Component;
