import React, { useEffect, useState } from "react";
import classes from "../cssFile/Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDash from "../jsFile/AdminDashboard"
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginFun } from "../../store/action/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token,setToken]=useState()
  const nav = useNavigate();
  const url =process.env.REACT_APP_SERVICE_ID
   const dispatch=useDispatch()


const onSuccessfun=(res)=>{
      console.log("in success",res)
     
      
      if(res.status === 200){
        console.log("success",res)

        nav("/adminDashboard"); 
       
       
      }else{
        toast.error('Please Enter Valid Data', {
          autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
        });

      }
}
  const onClickloginFun = (e) => {
    console.log(url, "url");
   
   
    dispatch(LoginFun(email,password,onSuccessfun))

    // axios.post(url + "user/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log("in nav",res.data.user.token[0].token) ;
    //     setToken(res.data.user.token[0].token)
    //        dispatch({
    //         type:"TOKEN",
    //         payload:res.data.user.token[0].token
    //        })

    //        dispatch({
    //         type:"LOGIN",
    //         payload:true
    //        })
    //     //  nav("/adminDashboard");
    //   });

    e.preventDefault();
  };

  




  return (
    <>
    { token === undefined ?
    <main className={classes.auth}>
      <main className={classes.auth1}>
        <section>
          <form>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.btn}>
              <button onClick={(e) => onClickloginFun(e)}> Login</button>
            </div>
          </form>
        </section>
        <span>
          <span className={classes.sigupText}>
            
       <p style={{color:"aqua"}}>{"Create a Account?"}</p>  <Link to="/signup">Signup</Link> 
       
       </span>
      </span>
     
      </main>
     
    </main> 
     
    
    :

    <AdminDash token={token}/>
    
    }

    </>
  );
};

export default Auth;
