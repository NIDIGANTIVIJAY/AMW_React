import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";
import Admin from "./Admin/src/App"
import AdminLoginPage from "./AdminLoginPage"
import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import AuthWrapper from "./Authwraper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoaderModal from "./Admin/src/component/LoaderModal";
const Connector=()=>{
    const type=useSelector((state)=>state.Common.Notitype)
    const message=useSelector((state)=>state.Common.NotiMessg)
   const showLoader=useSelector((state)=>state.Common.showLoader)
     console.log(showLoader,"SHOWLOADER")
   useEffect(()=>{
    console.log(showLoader,"SHOWLOADER1")
   },[message,type,showLoader])
  
   
     
    return<>
 
 
 <Routes>


 <Route  exact path="/*" element={<App />} />

 <Route path="/Admin/Login" element={<AdminLoginPage />} />
   
 <Route exact path="/Admin/*" element={<AuthWrapper> <Admin/> </AuthWrapper>}/>:
 
  
    
 
   
 </Routes>

 <ToastContainer />
 {showLoader && <LoaderModal showLoader={showLoader} />}
 


    </>
}
export default Connector