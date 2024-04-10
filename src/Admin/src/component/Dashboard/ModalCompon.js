import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import axiosInstance from "../axiosconfig";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import classes from "../../../../components/jsFile/AdminAccCreation/index.module.css";
import css from "../../App.css"
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

import CustmerImg from "../../../../components/Assets/dossier.png"

import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ModaComponent = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()

  const [payloadData, setPayloadData] = useState({
    username: "",
    email: "",
    GstNumber: "",
    phonenumber: "",
    address: "",
    city: "",
    custmeruniqId: ""
  });

  const onChangeFun = (e, type) => {
    let obj = { ...payloadData };
    if (type === "username") {
      obj["username"] = e.target.value;
    } else if (type === "email") {
      obj["email"] = e.target.value;
    } else if (type === "phonenumber") {
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
    console.log(payloadData, props?.userDetails, "payloadData");

    let editPayloadData = {};

    if ((props?.userDetails !== undefined || props?.userDetails?.length) > 0 && props?.editDetails) {

      if (payloadData["username"] === "") {
        payloadData["username"] = props?.userDetails[0].username

      }
      if (payloadData["email"] === "") {
        payloadData["email"] = props?.userDetails[0].email

      }
      if (payloadData["phonenumber"] === "") {
        payloadData["phonenumber"] = props?.userDetails[0].phonenumber

      }

      if (payloadData["address"] === "") {
        payloadData["address"] = props?.userDetails[0].address

      }

      if (payloadData["city"] === "") {
        payloadData["city"] = props?.userDetails[0].city

      }

      if (payloadData["GstNumber"] === "") {
        payloadData["GstNumber"] = props?.userDetails[0].GstNumber
      }

      payloadData["custmeruniqId"] = props?.userDetails[0].custmeruniqId

      console.log(payloadData, "JJJJ")
      axiosInstance.post("/edit/customer/Details", payloadData).then((res) => {
        console.log(res)
        if (res.status === 200) {
          props.setShowModal1(false)
          props.prevModelShow(false)
          toast.success('Account Updated successfully', {
            autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
          });

        }

      })

    }
    else {
      axiosInstance.post("createuserforAdmin", payloadData).then((res) => {
        console.log(res)
        if (res.status === 200) {
          props.setShowModal1(false)
          toast.success('Account created successfully', {
            autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
          });

        }

      })

    }



  }

  const RemoveFun = () => {
    console.log(typeof(props?.userDetails[0].custmeruniqId),props?.userDetails[0].custmeruniqId,"DDFS")
      let payload={
        custmeruniqId : props?.userDetails[0].custmeruniqId
      }
    axiosInstance.post("removecoustmer",payload).then((res) => {
      if (res.status === 200) {
        props.setShowModal1(false)
        props.prevModelShow(false)
        toast.success('Account Removed successfully', {
          autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
        });

      }

    })
  }


  console.log(props.userDetails, props.editDetails, "YYY")

  const [AmountPaid, setAmountPaid] = useState()

  return (<>


    <Modal
      show={props.show}
      onHide={onCloseFun}
      aria-labelledby="ModalHeader"
      centered
      size="lg"
      className="ModalUserCreate"
    >
      <Modal.Header closeButton onClick={onCloseFun}>
        {(props?.userDetails !== undefined || props?.userDetails?.length) > 0 && props?.editDetails ? <h3>Edit Customer Details</h3> : <h3>Add Customer Details</h3>}
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex" }}>
          {(props?.userDetails !== undefined || props?.userDetails?.length) > 0 && props?.editDetails ? <main className={classes.profile}>
            {props?.userDetails?.map((i) => {
              return (
                <main className={classes.initialauth}>
                  <section>
                    <form>
                      <div className={classes.control}>
                        <label htmlFor="username">User Name</label>
                        <input
                          type="text"
                          id="username"
                          defaultValue={
                            i.username}
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
                          defaultValue={i.GstNumber}

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
                          defaultValue={i.
                            email}
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
                          defaultValue={
                            i.phonenumber}
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
                          defaultValue={i.address}
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
                          defaultValue={i.
                            city}
                          onChange={(e) => {
                            onChangeFun(e, "city");
                          }}
                        />
                      </div>

                    </form>
                  </section>
                </main>
              )
            })
            }
          </main> :
            <main className={classes.profile}>
              <main className={classes.initialauth}>
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
            </main>}
          <img className="ADDCustomImg" src={CustmerImg} height={"550"} width={"350"} />
        </div>




      </Modal.Body>
      <Modal.Footer >
        {/* <Button type="submit" onClick={()=>{onclickSubmitFun()}} >submit </Button> */}
        {(props?.userDetails !== undefined || props?.userDetails?.length)  && props?.editDetails ?
          <>
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
                Update Account {" "}
              </button>
            </div>


            <div className="Button">
              <button
                // className={classes.btn}
                // className={`${classes.btn} ${css.AdBtn}`}
                className="AdBtn"

                onClick={(e) => {
                  RemoveFun(e);
                }}
              >
                {" "}
                Delete Account {" "}
              </button>
            </div>

          </>


          :

          <div className="Button">
            <button

              className="AdBtn"

              onClick={(e) => {
                onclickSubmitFun(e);
              }}
            >
              {" "}
              Create Account {" "}
            </button>
          </div>
        }
      </Modal.Footer>

    </Modal>



  </>)
}

export default ModaComponent;