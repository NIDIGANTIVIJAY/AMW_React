import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import InputFieldComp from "./inputFieldComp";
// import ActionBtn from "./ActionBtn";
import Expenses from "../Expenses/index"
import { useSelector } from "react-redux";
const InOutComponent = () => {
  const url = process.env.REACT_APP_SERVICE_ID
  
  const accountNav = useSelector((state) => state.Common.AccountName)
 
  console.log(accountNav,"accountNav")
 
  const [reload, setreload] = useState(false)
  const [key, setKey] = useState('pending');


  const [coldef, setcoldef] = useState([
 
    { field: "HBWireSize" },
    { field: "Quantity"},
    {  field: "Bundle"},
    {  field: "Rate/Kg" },
    {  field: "Rate(Inc GST)" },
    {  field: "Delivery Cost/Kg" },
    { field: "Landed Cost/Kg" },
    {  field: "Total Cost" },
    {  field: "Vendor Name" },
    {  field: "Vendor Location" },
    {  field: "PO / Invoice No" },
    {  field: "Invoice Date" },
    {  field: "Delivery Date" },



    // {field:"Action",cellRenderer: ActionBtn,width:250}
  ]);
  const [coldef1, setcoldef1] = useState([
    { field: "GSTNumber" },
    { field: "Name" },
    { field: "TotalAmount" },
    { field: "AmountPaid", headerName: "Initial Amount Paid" },
    { field: "Status" },

    
  ]);
//   useEffect(() => {
//     let payload={}


//     if(key === "pending"){
//     payload["status"]="pending"
//     axios.post(url + "getAccounts",payload).then((res) => {
//       console.log(res.data)
//       setRowData(res.data)
//     })
//   }
//  else if(key === "completed"){
//   payload["status"]="completed"
//   axios.post(url + "getAccounts",payload).then((res) => {
//     console.log(res.data)
//     setRowData(res.data)
//   })

//  }else{

//  }




//   }, [reload,key])

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
    <h3>Inward-OutWard-Material</h3>
    <Tabs
      defaultActiveKey= {accountNav}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(e) =>onClicCompleteFun(e)}
    >
      <Tab eventKey="pending" title="Inward-Material">
           <h3>Inward-Material</h3>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
      <Tab eventKey="completed" title="Out-Material"  >
      <h3>Outward-Material</h3>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef1} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
    
    </Tabs>


  </>)
}

export default InOutComponent