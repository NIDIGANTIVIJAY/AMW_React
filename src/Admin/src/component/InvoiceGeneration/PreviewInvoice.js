import React, { useEffect, useState } from "react"
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';


import axiosInstance from "../axiosconfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

import "./processInvoice/processing.css"

import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const PreviewInvoice=(props)=>{
  const url=process.env.REACT_APP_SERVICE_ID
  const nav=useNavigate()
  const dispatch=useDispatch()
  const processDataArra=useSelector((state)=>state.Common.processingArray
    )
    console.log(processDataArra,"PPPPP")
    const formatedArray=useSelector((state)=>state.Common.formatedArray)
    console.log(formatedArray,"UUUUUU")
  const [src,setsrc]=useState('')
    useEffect(()=>{
      let payloadData={
        "productIdArr":"",
        "Status":"",
        "InvoiceProduct":""
      }
      console.log(props.InvoiceData)
        if(props.InvoiceData?.Status === "pending" && props.InvoiceData?.Status !== undefined  ){
          payloadData=props.InvoiceData
     
        }else{
          payloadData["productIdArr"]=processDataArra
          payloadData["Status"]="initiate"
          payloadData["InvoiceProduct"]=formatedArray
        }
        console.log(payloadData,"PAYLOAD")
        dispatch({
          type:"SHOWLOADER",
          payload:true
        })


        axiosInstance.post("getquote",payloadData).then((res)=>{
            console.log(res)
            if(res.status === 200){
              dispatch({
                type:"SHOWLOADER",
                payload:false
              })
            setsrc(res.data+"#zoom=FitH&toolbar=0")


            }
        })
     
            
        
    },[])

    const onCloseFun=()=>{
      
      if(props.InvoiceData?.Status === "pending" && props.InvoiceData?.Status !== undefined  ){
        props.setInvoiceData()
        // dispatch(
        //   {
        //     type:"PROCESSINGARRAY",
        //     payload:false
            
        //   }
        // )
        // dispatch(
        //   {
        //     type:"EDITEDPROCESSINGARRAY",
        //     payload:false
            
        //   }
        // )
        dispatch(
          {
            type:"RESETEDITEDPROCESSINGARRAY",
       
            
          }
        )
        dispatch(
          {
            type:"RESETPROCESSINGARRAY",
           
            
          }
        )
          nav("process")
          console.log("IN CLOSEFUN1")
       
        
      }
      props.setShowSubmitBtn(true)
       props.setShow(false)
    }

  return(<>
   
    <Modal
        show={props.show}
        onHide={onCloseFun}
        aria-labelledby="ModalHeader"
        centered
        size="xl"
      >
        <Modal.Header closeButton onClick={onCloseFun}>
        
        </Modal.Header>
        <Modal.Body>
          <div className="invoiceContainer"> 
          {/* {parse(src)} */}
          <div class="iframe-container">
          <iframe
        src={src}
        type="application/pdf"
        width="100%"
        height="100%"
    
    ></iframe>
    </div>
          </div>
        </Modal.Body>
       
      </Modal>

  
  
  </>)
}

export default PreviewInvoice;
