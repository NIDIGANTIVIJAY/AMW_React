import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import  "./processing.css"


import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import ProcessBtn from "./ProcessBtn";
import QuoteFormEdit from "./quoteFormEdit";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenearatedInvoice from "../GeneratedInvoice";
import AmountModal from "./AmountModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosconfig";
const ProcessInvoice = () => {
  const nav = useNavigate();
  const dispatch=useDispatch()
  // const showModal = useSelector((state) => state.Common.showModal);
  // const showModal1 = useSelector((state) => state.Common.showModalComp1);
const [showModal,setShowModal]=useState(false)

  const [ModalData,setModalData]=useState()

const [editFormData,setEditFormData]=useState()
const [showModal1,setShowModal1]=useState(false)
  const url = process.env.REACT_APP_SERVICE_ID;
  

  const [rowData, setRowData] = useState();

  useEffect(() => {
    dispatch({
      type:"SHOWLOADER",
      payload:true
    })
    axiosInstance.get("getpendingquote").then((res) => {
      console.log(res.data);
            if(res.status === 200){
              dispatch({
                type:"SHOWLOADER",
                payload:false
              })
            }
    
      setRowData(res.data);
    }).catch((e)=>{
      console.log(e)
      toast.error('Something went Wrong', {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
     

  });
  }, [showModal1,showModal]);



const functbtnFunc=(props)=>{
  console.log(props)
  const buttonsave = () => {
    let obj=props.data
    obj["Status"]="Completed" 
    console.log(obj)

    setShowModal1(true)
    setModalData(obj)
    

      
   
};

const onClickEditFun=()=>{
    //  dispatch({
    //   type:"SHOWMODAL",
    //   payload:true
    //  })   
    setShowModal(true)
    setEditFormData(props.data)
    //  dispatch({
    //   type:"MODALDATA",
    //   payload:props.data
    //  })
}
const onClickRemove =()=>{
  console.log(props)
  let payload={
      "_id":""
  };
  payload["_id"]=props.data._id
  console.log(payload)
  dispatch({
    type:"SHOWLOADER",
    payload:true
  })
  axiosInstance.post("removequote",payload).then((res)=>{
      console.log(res)
      if(res.status === 200){
      props.api.setRowData(res.data)

        dispatch({
          type:"SHOWLOADER",
          payload:false
        })
      }
  })
}

return (
  <span>
   <div className='agButton'>
    <button className="AdBtn" onClick={() => onClickRemove()}>Remove </button>
    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
    <button className="AdBtn" onClick={() => onClickEditFun()}>Edit </button>
    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
    <button className="AdBtn" onClick={() => buttonsave()}>Confirm </button>
  </div>
  </span>
);
};



const [coldef, setcolDef] = useState([
  { field: "GSTNumber" },
  { field: "Name" },
  { field: "TotalQuatity", width: 150 },

  { field: "TotalAmount", width: 150 },

  { field: "Status" , width: 150},
  { field: "Action", cellRenderer: functbtnFunc, width: 390 },
]);











  return (
    <>
      <div className="processWrapper">
        <h3>Processing Invoice</h3>

        <div className="ag-theme-alpine agTable Ag-InvoiceTable" >
          <AgGridReact columnDefs={coldef} rowData={rowData} />
        </div>

        <div>{showModal && <QuoteFormEdit show={showModal} setShowModal={setShowModal} editFormData={editFormData} />}</div>
        <div className="Button">
          <button
          className="AdBtn"
            type="submit"
            onClick={() => {
              nav("/admin/invoice/generatedinvoice");
            }}
            value={"GenearatedInvoice"}
          >
            {" "}
            GenearatedInvoice{" "}
          </button>
        </div>
        <div>{showModal1 && <AmountModal show={showModal1} setShowModal1={setShowModal1} ModalData={ModalData}/>}</div>
      </div>
    </>
  );
};

export default ProcessInvoice;
