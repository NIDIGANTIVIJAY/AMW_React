import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";
import axiosInstance from "../axiosconfig";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import InputFieldComp from "./inputFieldComp";
// import ActionBtn from "./ActionBtn";
import Expenses from "../Expenses/index"
import { useSelector } from "react-redux";
import eyeicon from "../../../../components/Assets/eyeIcon.png"

import EMIAmountModal from "./EMIAmountMoadal";
const Accounts = () => {
  const url = process.env.REACT_APP_SERVICE_ID
  const [EmiRowData,setEmiRowData]=useState(false)
  
  const accountNav = useSelector((state) => state.Common.AccountName)
 
  console.log(accountNav,"accountNav")
  const [EmiModal,setEmiModal]=useState(false)

 
  const [reload, setreload] = useState(false)
  const [key, setKey] = useState('pending');
  const InputFieldComp = (props) => {
    const [inputData, setinputData] = useState()
    const onChangeFun = (e) => {
      console.log(e)
      setinputData(e.target.value)
    }
    const onClickFun = () => {
      console.log(props.data)
      let date = new Date()
      let dateday = date.getDate()
      let dateMonth = date.getMonth() + 1
      let dateYear = date.getFullYear()
      let todayDate1 = dateday + '/' + dateMonth + "/" + dateYear;

      const getAccountsApiFun=()=>{
        console.log("sggd")
        let payload1={}
        payload1["status"]="pending"
        axiosInstance.post( "getAccounts",payload1).then((res) => {
          console.log(res.data)
          setRowData(res.data)
        })
  
      }
   
       let obj={}
       let arr=[]
        obj["date"]=todayDate1
        obj["AmountPaid"]=inputData
        arr.push(obj)

      let payload = {}
      payload["AccountID"] = props.data.AccountID
      payload["PaidAmount"] = inputData
      
      payload["AmountEMI"]=arr
      axiosInstance.post( "updateAccount", payload).then((res) => {
        if (res.status === 200) {
          //  setreload(!reload)
          getAccountsApiFun()
        }
      })
      console.log(inputData)
    }
    return (<>

<div className="">
      <input className="dueAmtValue" type="number" onChange={(e) => { onChangeFun(e) }} />
      <button className="AdBtn updateAmt" type="submit" onClick={() => { onClickFun() }}>Update Amount</button>
      </div>
    </>)

  }

  const ActionFun=(props)=>{

     const onClickFun=()=>{
        console.log(props,props.data.AmountEMI,"III")
         let obj={}
         let arr=[]
         obj["InvoiceNumber"]=props.data.InvoiceNumber
         obj["GSTNumber"]=props.data.GSTNumber
         obj["InitialPaidAmount"]=props.data.InitialPaidAmount
         props.data.AmountEMI.map((i)=>{
          obj["date"]=i.date
          obj["AmountPaid"]=i.AmountPaid
          arr.push(obj)
         })
         console.log(arr)

         setEmiRowData(arr)
        setEmiModal(true)
      }

    return(<>
    <img src={eyeicon} alt={"EYEICON"}  onClick={()=>{onClickFun()}}/>
      
    </>)

  }


  const [coldef, setcoldef] = useState([
    { field: "Name" , width: 150},
    { field: "GSTNumber", width: 150 },
    {field:"InvoiceNumber", headerName:"Invoice Number", width: 120},
    {field:"InvoiceGeneratedDate",headerName:"Invoice Date", width: 120},
    {field:"vehicalNumber",headerName:"Vehical Number", width: 120},
    { field: "Status", width: 120 },
    { field: "TotalAmount", width: 120 },
    { field: "AmountPaid", headerName: "Amount Paid", width: 120 },
    { field: "DueAmount", width: 120 },

    { cellRenderer: InputFieldComp, width: 280, headerName: "Balance Amount" },
    {field:"Action",cellRenderer: ActionFun,width:250}
  ]);
  const [coldef1, setcoldef1] = useState([
    { field: "Name", width:180 },
    { field: "GSTNumber", width:150 },
    {field:"InvoiceNumber", headerName:"Invoice Number", width:150},
    {field:"InvoiceGeneratedDate",headerName:"Invoice Date", width:140},
    {field:"vehicalNumber",headerName:"Vehical Number", width:150},
    { field: "TotalAmount" , width:150},
    { field: "AmountPaid", headerName: "Initial Amount Paid" , width:170},
    { field: "Status", width:150 },
    {field:"Action",cellRenderer: ActionFun,width:250}

    
  ]);
  useEffect(() => {
    let payload={}


    if(key === "pending"){
    payload["status"]="pending"
    axiosInstance.post("getAccounts",payload).then((res) => {
      console.log(res.data)
      setRowData(res.data)
    })
  }
 else if(key === "completed"){
  payload["status"]="completed"
  axiosInstance.post("getAccounts",payload).then((res) => {
    console.log(res.data)
    setRowData(res.data)
  })

 }else{

 }




  }, [reload,key])

  const onClicCompleteFun=(e)=>{
    console.log(e)
    if(e === "pending"){
     
      setKey(e)

    }else if(e === "completed"){
      setKey(e)
    }else{
      setKey(e)

    }
  
  }


  const [rowData, setRowData] = useState()

  return (<>
    <h3>Account</h3>
    <Tabs
      defaultActiveKey= {accountNav}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(e) =>onClicCompleteFun(e)}
    >
      <Tab eventKey="pending" title="Pending Invoice">
           <h5>Pending Invoice</h5>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
      <Tab eventKey="completed" title="Completed Invoice"  >
      <h5>Completed Invoice</h5>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef1} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
      <Tab eventKey="Expense" title="Expense" >
      <Expenses/>
      </Tab>
    </Tabs>

    { EmiModal && <EMIAmountModal show={EmiModal} setShowModal={setEmiModal} rowData={EmiRowData} /> }


  </>)
}

export default Accounts