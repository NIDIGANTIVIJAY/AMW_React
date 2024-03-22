import React from 'react'
import Header from './Header'
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

const ContainerPage=()=>{

    return(<>
    
     
     <Outlet/>
        
    </>)
}

export default ContainerPage