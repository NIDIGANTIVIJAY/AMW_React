import { useEffect } from 'react';

import { useSelector } from 'react-redux';


import { useState, } from "react";

import { Oval } from 'react-loader-spinner'

import Spinner from 'react-bootstrap/Spinner';
const LoaderComp=()=>{
 
    const showLoader=useSelector((state)=>state.Common.showLoader)
    useEffect(()=>{
        console.log(showLoader,"JJJJ")

    },[showLoader])
    console.log("in LOader")
    return(<>
  {showLoader &&
  <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>  }
    </>)
}
export default LoaderComp