import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";
import { useSelector } from "react-redux";
import DownloadCellRenderer from './AgGridDownload';
import axiosInstance from '../../axiosconfig';

const GenearatedInvoice = () => {
  const showModal = useSelector((state) => state.Common.showModal)
  const url = process.env.REACT_APP_SERVICE_ID
  const [coldef, setcolDef] = useState([
    { field: "GSTNumber", width: 170 },
    { field: "Name", width: 180 },

    { field: "TotalQuatity", width: 150 },

    { field: "TotalAmount" , width: 150},

    { field: "AmountPaid" , width: 150},
    { field: "DueAmount", width: 150 },
    { field: "Status", width: 150 },
    {headerName:"Action", width: 120,
  
    cellRenderer:(param)=>< DownloadCellRenderer param={param}/>,}
   

  ])
  const [rowData, setRowData] = useState()

  useEffect(() => {
    axiosInstance.get( "GenearatedInvoice").then((res) => {
      console.log(res.data)

      setRowData(res.data)

    })
  }, [])


  return (<>
    <div className="headerDiv">
      <h3>Generated Invoice</h3>
    </div>
    


    <div className="ag-theme-alpine agTable Ag-InvoiceTable" >

      <AgGridReact columnDefs={coldef} rowData={rowData}
      />
    </div>

    <div className="Button">
      {/* <button type="submit"  >Back</button> */}
     </div>


  </>)
}

export default GenearatedInvoice