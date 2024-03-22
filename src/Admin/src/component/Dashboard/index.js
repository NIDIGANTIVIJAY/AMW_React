
import React, { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axiosInstance from "../axiosconfig";

import "../../../../components/cssFile/Sales.module.css"
import * as xlsx from "xlsx";
import { useNavigate } from "react-router-dom";

import c3 from "c3";
import * as d3 from "d3"
// import c3 from "c3";

import Barchrt from "../Dashboard/Barchart"
import { useDispatch } from "react-redux";

const Dashboard = () => {

  const [jsonData, setJsonData] = useState([]);

  const dispatch = useDispatch()

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(data, workbook, sheetName, worksheet, json);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  console.log(jsonData);

    const [Production,setProduction]=useState(["Production"])
    const [Dispatch,setDispatch]=useState(["Dispatch"])

  let Production1 = ["Production"];
   var Dispatch1 = ["Dispatch"];
  var AvailProd = ["Avail Prod"];

  var Initiate = ["Initiate","50"];
  var Processing = ["Processing","50"];
  var Completed = ["Completed","50"];

  var Pending = ["Pending","50"];
  var Completed = ["Completed","50"];
  var Expencess = ["Expencess","50"];

  // console.log(data1, data2, data3, "hsj7676hs");

  // jsonData?.forEach((elem) => {
  //   Production.push(parseInt(elem?.data1));0
  //   Dispatch.push(parseInt(elem?.data2));
  //   AvailProd.push(parseInt(elem?.data3));
  // });

  // jsonData?.forEach((elem) => {
  //   Initiate.push(parseInt(elem?.data1));
  //   Processing.push(parseInt(elem?.data2));
  //   Completed.push(parseInt(elem?.data3));
  // });

  // jsonData?.forEach((elem) => {
  //   Pending.push(parseInt(elem?.data1));
  //   Completed.push(parseInt(elem?.data2));
  //   Expencess.push(parseInt(elem?.data3));
  // });


  const nav = useNavigate();







  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [Production, Dispatch, AvailProd],
      type: "bar",

      onclick: function (event) {
        console.log(event, event.id, "11111111111");

        if (event.id === "Data1") {
          nav("/admin/Dashboard");
        }
        else if (event.id === "Data2") {
          nav("/admin/Dashboard");
        }
        else if (event.id === "Data3") {
          nav("/admin/Dashboard");
        }

      }
    },

    size: {
      height: 280,
      width: 800
  },
    color: {
      pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"],
    },
    bar: {
      width: {
        ratio: 0.5, // this makes bar width 50% of length between ticks
      },
    },
  });


  var chart = c3.generate({
    bindto: "#pieChart",
    data: {
      columns: [Initiate, Processing, Completed],
      type: "pie",

      onclick: function (event) {
        console.log(event, event.id, "11111111111");

        if (event.id === "Initiate") {
          nav("/admin/invoice");
        }
        else if (event.id === "Processing") {
          nav("/admin/invoice/process");
        }
        else if (event.id === "Completed") {
          nav("/admin/invoice/generatedinvoice");
        }

      }


    },

    tooltip: {
      format: {
          value: function (value, ratio, id) { 
              return ("");
          }
      }
  },

    pie: {
      label: {
        format: function(value, ratio, id) {
          return id;
        }
      }
    },

    size: {
      height: 250,
      width: 360
  },

    color: {
      pattern: ["#e3edf7", "#fbaa13", "#44b982"],
    },
    bar: {
      width: {
        ratio: 0.5, // this makes bar width 50% of length between ticks
      },
    },
  });



  var chart = c3.generate({
    bindto: "#pieChart2",
    data: {
      columns: [ Expencess,Pending, Completed],
      type: "pie",


      onclick: function (event) {
        console.log(event, event.id, "11111111111");

        if (event.id === "Pending") {
          dispatch({ type: "ACCOUNTNAME", payload: "pending" })
          nav("/admin/accounts");
        }
        else if (event.id === "Completed") {
          dispatch({ type: "ACCOUNTNAME", payload: "completed" })
          nav("/admin/accounts");
        }
        else if (event.id === "Expencess") {
          dispatch({ type: "ACCOUNTNAME", payload: "Expense" })
          nav("/admin/accounts");
        }

      }

    },
    size: {
      height: 250,
      width: 360
  },

    pie: {
      label: {
        format: function(value, ratio, id) {
          return value;
        }
      }
    },

    color: {
      pattern: ["#e3edf7", "#fbaa13", "#44b982"],
    },
    tooltip: {
      format: {
          value: function (value, ratio, id) { 
              return ("");
          }
      }
  },
    bar: {
      width: {
        ratio: 0.5, // this makes bar width 50% of length between ticks
      },
    },
  });


  //------------------------------Production-----------------------




  const url = process.env.REACT_APP_SERVICE_ID




  const updateBtn = (props) => {

    const buttonClicked = () => {
      console.log(props.data)
      axiosInstance.post( "editData", props.data).then((res) => {
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
  const [coldef, setcoldef] = useState([
    { field: 'Item', width: 150 },
    { field: 'Description', width: 150 },
    { field: 'Size', width: 100 },
    { field: 'Product', width: 150 },
    // { field: 'ProductId' },
    { field: 'Price', width: 100 },
    { headerName: "Total Quatity", field: 'Quantity', width: 100 },
    { field: 'Weight', width: 100 },
  ]);
  const [rowData, setRowData] = useState()

  // 
  useEffect(() => {
    let arr = []
    axiosInstance.get("jsonData").then((res) => {
      console.log(res.data)

      res.data.map((i) => {
        let obj = {}
        obj['Item'] = i.item
        obj['Description'] = i.description
        obj['Price'] = i.price
        obj['Product'] = i.product
        obj['ProductId'] = i.productId
        obj['Quantity'] = i.quantity
        obj['Size'] = i.size
        obj['Weight'] = i.weight
        obj["_id"] = i._id
        arr.push(obj)

      })


      console.log(arr)
      setRowData(arr)

    })

    axiosInstance.get("Dashboard").then((res) => {
      console.log(res.data)


      let arr = []
      let totalProd=0;
      let totalDispatch=0;
      res.data.map((i) => {


        i.DailyProdDataArray[0].yearArray.map((j) => {
          j.monthArray.map((k) => {
            k.datesArray.map((l) => {
              totalProd = totalProd + Number(l.prodData)
              totalDispatch= totalDispatch + Number(l.Dispatch)
              console.log(typeof(totalDispatch),typeof(totalProd),"LLL")
              Production1.push((totalProd));
              Dispatch1.push((totalDispatch));

            })
          })

        })





      })


      // jsonData?.forEach((elem) => {
      //   Production.push(parseInt(elem?.data1));
      //   Dispatch.push(parseInt(elem?.data2));
      //   AvailProd.push(parseInt(elem?.data3));
      // });


      setProduction(Production1)
      setDispatch(Dispatch1)
    })
  }, [])

  return (<>

    <div className="dashboardHeaderWrapper" style={{ display: "flex" }}>
      <div><h3>Dashboard</h3></div>
    </div>
    

    <div className="dashboardContentView" >
      <div className="RowWrapp">
        <div className="BarDiv">
          {/* <form style={{ position: "absolute", top: "10px", left: "512px" }}>
            <label htmlFor="upload">Upload File</label>
            <input
              type="file"
              name="upload"
              id="upload"
              onChange={readUploadFile}
            />
          </form> */}
          <div className="barBox" id="chart"></div>
        </div>
        <div className="pieDiv">
          <h5 className="dashHeadeH5">Invoice</h5>
          <div className="pieBox" id="pieChart"></div>
        </div>
      </div>
      <div className="RowWrapp2">


        <div className="TableDiv">
          <div className="ag-theme-alpine agTable" >
            <AgGridReact columnDefs={coldef} rowData={rowData}
              rowSelection={'multiple'}
              rowMultiSelectWithClick={true}
            />
          </div>
        </div>


        <div className="pieDiv">
          <h5 className="dashHeadeH5">Account</h5>
          <div className="pieBox" id="pieChart2"></div>

        </div>
      </div>
    </div>

  </>)
}

export default Dashboard