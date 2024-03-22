import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import axiosInstance from "../../axiosconfig";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AmountModal = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()
  // const  showModal= useSelector((state) => state.Common.showModalComp1)
  // const ModalData = useSelector((state) => state.Common.AmountData)
  console.log(props.ModalData,"showModalComp1")
  const [selectedOption, setSelectedOption] = useState(null)
  const [productName, setproductName] = useState([{ value: 'Cash', label: 'Cash' },{ value: 'Online', label: 'Online' }])

  const onChangeFun=(e)=>{
    setSelectedOption(e)
   
  }


  const onCloseFun = () => {

    // dispatch({
    //     type:"SHOWMOADALCOMPBOOL",
    //     payload:false
    //   })
    props.setShowModal1(false)


  }

  const onclickSubmitFun = () => {



    let payloadData = {
      "Status": "",
      "GSTNumber": "",
      "Name": "",
      "productIdArr": "",
      "InvoiceProduct": "",
      "AmountPaid": "",
      "TotalAmount": "",
      "TotalQuatity": "",
      "_id": "",
      "ProductUniqId": "",
      "PaymentType":""
    }
    if(AmountPaid === ""){
      toast.error(`Please Enter Amount`, {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
      return 

    }
    if(  Number(AmountPaid) > Number(props.ModalData["TotalAmount"])   ){
      toast.error(`Enter the Amount less or equal to Total Amount : ${props.ModalData["TotalAmount"]}`, {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
      return 
    }
    if(selectedOption === null){
      toast.error(`Please Select payment Type`, {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
      return 

    }
    dispatch({
      type:"SHOWLOADER",
      payload:true
    })

    payloadData["AmountPaid"] = AmountPaid
    payloadData["GSTNumber"] = props.ModalData["GSTNumber"]
    payloadData["Name"] = props.ModalData["Name"]
    payloadData["Status"] = props.ModalData["Status"]
    payloadData["productIdArr"] = props.ModalData["productIdArr"]
    payloadData["InvoiceProduct"] = props.ModalData["InvoiceProduct"]
    payloadData["_id"] = props.ModalData["_id"]
    payloadData["ProductUniqId"] = props.ModalData["ProductUniqId"]
    payloadData["PaymentType"]=selectedOption.value
    console.log(payloadData)
    axiosInstance.post( "savequoteData", payloadData).then((res) => {
      console.log(res)
      if (res.status === 200) {
        props.setShowModal1(false)
        dispatch({
          type:"SHOWLOADER",
          payload:false
        })

      }

    })

  }

  const [AmountPaid, setAmountPaid] = useState("")

  return (<>


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
        <label style={{ paddingRight: "12px" }} >Initial Paid Amount</label>
        <input type="text" onChange={(e) => { setAmountPaid(e.target.value) }} />
   <br></br>
   <label style={{ paddingRight: "12px" }} >Payment type</label>

        <Select
          defaultValue={selectedOption}
          onChange={(e) => { onChangeFun(e) }}
          options={productName}

        />


      </Modal.Body>
      <Modal.Footer>
        <Button className="AdBtn" type="submit" onClick={() => { onclickSubmitFun() }} >submit </Button>
      </Modal.Footer>

    </Modal>



  </>)
}

export default AmountModal;