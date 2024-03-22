import React, { useState } from "react";
import classes from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = (props) => {
  const [showPrev, setShowPrev] = useState(false);
  const url = process.env.REACT_APP_SERVICE_ID;
  const nav = useNavigate();
 

  const [payloadData, setPayloadData] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
    city: ""
  });
  console.log(payloadData, "payloadData");
  const onChangeFun = (e, type) => {
    let obj = { ...payloadData };
    if (type === "username") {
      obj["username"] = e.target.value;
    } else if (type === "email") {
      obj["email"] = e.target.value;
    } else if (type === "password") {
      obj["password"] = e.target.value;
    } else if (type === "phonenumber") {
      obj["phonenumber"] = e.target.value;
    } else if (type === "address") {
      obj["address"] = e.target.value;
    } else if (type === "city") {
      obj["city"] = e.target.value;
    } 
    setPayloadData(obj);
  };
  const CreateAccountFun = (e) => {
   
    e.preventDefault();

    console.log(payloadData, "Payload Data");
   
    axios.post(url + "signup", payloadData).then((res) => {
      // console.log(res);
      if(res.status === 200){
          nav("/login")
      }
    });

  };

  return (
    <>
        <>
          <main className={classes.profile}>
            <main className={showPrev ? classes.auth : classes.initialauth}>
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
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => {
                        onChangeFun(e, "password");
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
                  <button
                    className={classes.btn}
                    onClick={(e) => {
                      CreateAccountFun(e);
                    }}
                  >
                    {" "}
                    Create account {" "}
                  </button>
                </form>
              </section>
            </main>
          </main>
        </>
      
    </>
  );
};

export default Contact;