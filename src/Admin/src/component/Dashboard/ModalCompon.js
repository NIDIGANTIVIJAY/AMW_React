import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import axiosInstance from "../axiosconfig";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import classes from "../../../../components/jsFile/AdminAccCreation/index.module.css";
import css from "../../App.css"

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ModaComponent = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()

  const [payloadData, setPayloadData] = useState({
    username: "",
    email: "",
    GstNumber:"",
    phonenumber: "",
    address: "",
    city: ""
  });

  const onChangeFun = (e, type) => {
    let obj = { ...payloadData };
    if (type === "username") {
      obj["username"] = e.target.value;
    } else if (type === "email") {
      obj["email"] = e.target.value;
    }  else if (type === "phonenumber") {
      obj["phonenumber"] = e.target.value;
    } else if (type === "address") {
      obj["address"] = e.target.value;
    } else if (type === "city") {
      obj["city"] = e.target.value;
    } 
    else if (type === "GstNumber") {
      obj["GstNumber"] = e.target.value;
    }
    
    setPayloadData(obj);
  };



  const onCloseFun = () => {

    // dispatch({
    //     type:"SHOWMOADALCOMPBOOL",
    //     payload:false
    //   })
  props.setShowModal1(false)


  }

  const onclickSubmitFun = () => {
    console.log(payloadData, "payloadData");

    axiosInstance.post("createuserforAdmin",payloadData).then((res)=>{
        console.log(res)
        if(res.status===200){
          props.setShowModal1(false)
        }
       
    })
    

  }

  const [AmountPaid,setAmountPaid]=useState()

  return (<>


    <Modal
      show={props.show}
      onHide={onCloseFun}
      aria-labelledby="ModalHeader"
      centered
      size="xl"
      className="ModalUserCreate"
    >
      <Modal.Header closeButton onClick={onCloseFun}>

      </Modal.Header>
      <Modal.Body>

      <main className={classes.profile}>
            <main className={ classes.initialauth}>
              <section>
                <form>
                  <div className={classes.control}>
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      id="username"
                      onChange={(e) => {
                        onChangeFun(e, "username");
                      }}
                    />
                  </div>
                  <div className={classes.control}>
                    <label htmlFor="username">GSTNumber</label>
                    <input
                      type="text"
                      id="GstNumber"
                      onChange={(e) => {
                        onChangeFun(e, "GstNumber");
                      }}
                    />
                  </div>
                  <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => {
                        onChangeFun(e, "email");
                      }}
                    />
                  </div>
              
                  <div className={classes.control}>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input
                      type="number"
                      id="phonenumber"
                      onChange={(e) => {
                        onChangeFun(e, "phonenumber");
                      }}
                    />
                  </div>
                  <div className={classes.control}>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      onChange={(e) => {
                        onChangeFun(e, "address");
                      }}
                    />
                  </div>
                  <div className={classes.control}>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      onChange={(e) => {
                        onChangeFun(e, "city");
                      }}
                    />
                  </div>
                
                </form>
              </section>
            </main>
          </main>
          


      </Modal.Body>
      <Modal.Footer >
        {/* <Button type="submit" onClick={()=>{onclickSubmitFun()}} >submit </Button> */}
        <div className="Button">
          <button
                    // className={classes.btn}
                    // className={`${classes.btn} ${css.AdBtn}`}
                    className="AdBtn"
                  
                    onClick={(e) => {
                        onclickSubmitFun(e);
                    }}
                  >
                    {" "}
                    Create account {" "}
                  </button>
                  </div>
      </Modal.Footer>

    </Modal>



  </>)
}

export default ModaComponent;