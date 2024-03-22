import axios from "axios"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginFun=(email,password,onSuccess)=>(dispatch)=>{
    const url =process.env.REACT_APP_SERVICE_ID
   
    dispatch({
      type:"SHOWLOADER",
      payload:true
    })

    axios.post(url + "user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // setToken(res.data.user.token[0].token)
        if(res.status === 200){

          dispatch({
            type:"SHOWLOADER",
            payload:false
          })
        }
        console.log("in nav",res.status ,res.data,res.data?.user?.token ) ;

          if(res.data?.user?.token !== undefined){
            dispatch({
              type:"LOGIN",
              payload:true
             })
            dispatch({
                type:"TOKEN",
                payload:res?.data?.user?.token[0]?.token
               })
               
              
               onSuccess(res)
          }


          
    
      
      }).catch((e)=>{
          console.log(e)
          toast.error( e.response.data, {
            autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
          });
          dispatch({
            type:"SHOWLOADER",
            payload:false
          })
      })
  

}