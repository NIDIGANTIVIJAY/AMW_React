import React,{useState} from "react"
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const Expenses=()=>{
  const [coldef,setcoldef]= useState([
    { field: 'Item' },

    { field: 'Size'},
    { field: 'Product' },
 
    { field: 'Price'  ,editable: true },
    { field: 'Quantity', editable: true },
    { field: 'Weight' ,editable: true },
    
]);

  return(<>
    {/* <p className="HeaderText">Expenses </p> */}
    <h5 >Expenses </h5>
    <div className="ag-theme-alpine agTable" >
    <AgGridReact columnDefs={coldef}
  
    />
    </div>
  
  </>)
}

export default Expenses