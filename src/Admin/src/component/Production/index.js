import React,{useState,useEffect} from "react"
import {AgGridReact} from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import AddNewItem from "./AddNewItem";
import { useNavigate } from "react-router";
import axiosInstance from "../axiosconfig";
const Production=()=>{
  const url=process.env.REACT_APP_SERVICE_ID

  const [showModal,setShowModal]=useState(false)
  const nav=useNavigate()

  const updateBtn=(props)=>{

    const buttonClicked = () => {
      console.log(props.data)
      axiosInstance.post("editData",props.data).then((res)=>{
        setRowData(res.data)
     })
    
    };
  
    return (
      <span>
       <div className='agButton'>
        <button className="AdBtn" onClick={() => buttonClicked()}>Update </button>
        </div>
      </span>
  
    );
  };
  const [coldef,setcoldef]= useState([
    { field: 'Item',editable: true, width: 150  },
    { field: 'Description',editable: true, width: 190 },
    { field: 'Size',editable: true, width: 150 },
    { field: 'Product' ,editable: true, width: 150 },
    {headerName:"Total Quatity", field: 'Quantity', width: 150},
    // { field: 'ProductId' },
    { field: 'Price'  ,editable: true , width: 150},
   
    { field: 'Weight' ,editable: true, width: 150 },
    {field: 'Action' ,cellRenderer:updateBtn, width: 150 }
]);
const [rowData,setRowData]=useState()

// 
useEffect(()=>{
  let arr=[]
  axios.get(url+"jsonData").then((res)=>{
     console.log(res.data)

       res.data.map((i)=>{
          let obj={}
           obj['Item']=i.item
           obj['Description']=i.description
           obj['Price']=i.price
           obj['Product']=i.product
           obj['ProductId']=i.productId
           obj['Quantity']=i.quantity
           obj['Size']=i.size
           obj['Weight']=i.weight
           obj["_id"]=i._id
           arr.push(obj)

       })


 console.log(arr)
 setRowData(arr)

  })
 },[])



 const navFun=()=>{

  nav("/admin/production/invetory");
 }


 
 












  return(<>
    <h3>Production</h3>
    
    <div className="ag-theme-alpine Ag-productionTable" >
    <AgGridReact columnDefs={coldef} rowData={rowData}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
    />
    </div>

    <div className="Button">
    <button className="AdBtn" type="submit" onClick={()=>{ nav("/admin/production/inOutMat"); } }>In-Out Materials</button>
    {/* <button className="AdBtn" type="submit" onClick={()=>{setShowModal(true)}}>ADD New Item</button> */}
    <button className="AdBtn" type="submit" onClick={()=>{navFun() } }>Inventory-1</button>




    </div>

    {showModal && <AddNewItem show={showModal} setShowModal={setShowModal}/>}
  
  </>)
}

export default Production