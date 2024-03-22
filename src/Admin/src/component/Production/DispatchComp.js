import React, { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { useNavigate } from "react-router";
import axiosInstance from "../axiosconfig";
const DispatchComp = () => {

  let date = new Date()
  let dateday = date.getDate()
  let dateMonth = date.getMonth() + 1
  let dateYear = date.getFullYear()
  let todayDate1 = dateday + '/' + dateMonth + "/" + dateYear;
  const url = process.env.REACT_APP_SERVICE_ID


  const InputFieldComp = (props) => {
    const [inputData, setinputData] = useState()
    const onChangeFun = (e) => {
      console.log(e)
      setinputData(e.target.value)
    }
    const onClickFun = () => {
      console.log(props.data, props, "OKLb a")
      let payload = { ...props.data, DispatchAmount: inputData }

      axiosInstance.post("dispatch", payload).then((res) => {

      })

    }

    return (<>

      <div className="">
        <input className="dueAmtValue" type="number" onChange={(e) => { onChangeFun(e) }} />
        <button className="AdBtn updateAmt" type="submit" onClick={() => { onClickFun() }}>Dispatch</button>
      </div>
    </>)

  }





  const [coldef, setcoldef] = useState([
    { headerName: "Stock", field: 'StockName', width: 150 },
    { field: 'Size', width: 150 },
    { headerName: "Today Production", field: 'production', width: 200 },
    { field: 'availStock', headerName: "Today Available Stock" , width: 200},
    { field: "Dispatch", headerName: "Today Dispatch" , width: 200},
    { field: 'Hsno', width: 150 },
    { field: 'month' , width: 90},
    { field: 'year', width: 100 },

  ]);

  const [rowData, setRowData] = useState()

  useEffect(() => {



    axiosInstance.get( "getStock").then((res) => {
      console.log(res.data)
      let arr = []
      res.data.map((i) => {
        let obj = {}
        obj["StockName"] = i.product
        obj["Size"] = i.size

        obj["Hsno"] = i.Hsno
        obj["availStock"] = i.AvailableStock


        i.DailyProdDataArray[0].yearArray.map((j) => {
          obj["year"] = j.year

          j.monthArray.map((k) => {
            obj["month"] = k.month

            k.datesArray.map((l) => {
              console.log(l, "KKKK")
              if (l.date === todayDate1) {
                obj["production"] = l.prodData
                obj["MonthDates"] = l.date
                obj["Dispatch"] = l.Dispatch

              }

            })
          })

        })

        arr.push(obj)


      })

      console.log(arr, "LLLL")
      setRowData(arr)
    })
  }, [])





  return (<>




    <div className="ag-theme-alpine agTable" >
      <AgGridReact columnDefs={coldef}
        rowSelection={'multiple'}
        rowMultiSelectWithClick={true}
        rowData={rowData}
      />
    </div>









  </>)

}

export default DispatchComp;