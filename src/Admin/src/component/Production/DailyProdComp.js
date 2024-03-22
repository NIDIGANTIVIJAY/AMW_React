import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { useNavigate } from "react-router";
import ModalComp from "./ModalComp";
import InputFieldComp from "../Accounts/inputFieldComp";
import InputCompJS from "./InputCompJS";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import AddNewItem from "./AddNewItem";
import { Oval } from 'react-loader-spinner'
import axiosInstance from "../axiosconfig";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoaderComp from "../../../../store/action/LoaderComp";

import LoaderModal from "../LoaderModal";
import Notification from "../Notification";

const DailyProd = () => {
  const pay = useSelector((state) => state.Common.payloadData);
  const [showNotification, setShowNotification] = useState(false);
  const [rowData, setRowData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [payload, setpayload] = useState([]);
  const url = process.env.REACT_APP_SERVICE_ID;
  const [startDate, setStartDate] = useState(new Date());
  const [showLoader, setShowLoader] = useState(false)
  const [coldef, setcoldef] = useState();
  const [showNotiMoadal, setShowNotifiModal] = useState(false)
  const [showNotiUpdate, setShowNotifiupdate] = useState(false)

  const [showNotiMessg, setShowNotifiMessg] = useState("")

  console.log(payload);
  const InputField = (props) => {
    let enableRead = props.enable;

    const onChangeFun = (e) => {
      console.log(props.payload, payload);
      // let obj=[...payload]
      //   if(obj.some((i)=>i.stockId === props.params.data.stockId)){
      //     console.log(obj,obj.some((i)=>i.stockId === props.params.data.stockId))

      //   }else{
      let obj = {};
      let arr = [];
      obj["stockId"] = props.params.data.stockId;
      let s = props.params.colDef.field.split("/");
      console.log(s);
      obj["Month"] = s[1];
      obj["MonthDates"] = props.params.colDef.field;
      obj["todayProd"] = e.target.value;
      arr.push(obj);
      console.log(arr);
      setpayload(...props.payload, arr);

      //   }
      console.log(e, props.params);
    };
    return (
      <>
        <input
          type="number"
          readOnly={!enableRead}
          onChange={(e) => {
            onChangeFun(e);
          }}
        />
      </>
    );
  };
  const dispatch = useDispatch()
  // CustomHeader.js
  useEffect(() => {


    axiosInstance.get( "getStock").then((res) => {
      if (res.status === 200) {
        let DateArraData = []
        let date = new Date()
        let dateday = date.getDate()
        let dateMonth = date.getMonth() + 1
        let dateYear = date.getFullYear()
        let todayDate1 = dateday + '/' + dateMonth + "/" + dateYear;

        //     res.data.map((k)=>{


        //     k.DailyProdDataArray[0].yearArray.map((i)=>{


        //         if(i.year === dateYear.toString()){
        //          i.monthArray.map((j)=>{


        //               if(j.month === dateMonth.toString()){
        //                 console.log("IN DATE ")
        //                 let obj={}
        //                 obj["productId"]=k.ProductUniqId
        //                 obj["ARRAYDATA"]=j.datesArray
        //                 DateArraData.push(obj)

        //               }

        //          })
        //         }
        //     })
        // })
        let Data = res.data;
        let selctedDate = new Date();
        let selectedMonth = selctedDate.getMonth() + 1;
        let selectedYear = selctedDate.getFullYear();

        let rowArr = [];
        for (let i = 0; i <= Data.length - 1; i++) {
          let rowobj = {};
          let s = Data[i].DailyProdDataArray[0].yearArray;
          rowobj["product"] = Data[i].product;
          rowobj["size"] = Data[i].size;
          rowobj["Hsno"] = Data[i].Hsno;
          rowobj["ProductUniqId"] = Data[i].ProductUniqId

          for (let j = 0; j <= s.length - 1; j++) {
            console.log(s[j].year === selectedYear.toString());
            if (s[j].year === selectedYear.toString()) {
              let monthData = s[j].monthArray;

              for (let k = 0; k <= monthData.length - 1; k++) {
                console.log(monthData[k].month, "PPPOPOPO");
                if (monthData[k].month === selectedMonth.toString()) {
                  let dateArr = monthData[k]?.datesArray;

                  for (let l = 0; l <= dateArr?.length - 1; l++) {
                    rowobj[dateArr[l].date] = dateArr[l].prodData;

                  }
                }
              }
            }
          }
          rowArr.push(rowobj);
        }
        // console.log(DateArraData,"dateMonth")

        setRowData(rowArr)





        // Get the current date
        const today = new Date();

        // Calculate the last 3 days
        const lastThreeDaysFormatted = [];
        for (let i = 1; i <= 3; i++) {
          const previousDay = new Date(today);
          previousDay.setDate(today.getDate() - i);

          const day = previousDay.getDate();
          const month = previousDay.getMonth() + 1; // Months are zero-based
          const year = previousDay.getFullYear();

          const formattedDate = `${day}/${month}/${year}`;
          lastThreeDaysFormatted.push(formattedDate);
        }

        // Print the last 3 days in the desired format
        console.log(lastThreeDaysFormatted);


        let arr = [
          { headerName: "Stock", field: 'product', editable: true },

          { headerName: "Size", field: 'size', editable: true },
          { headerName: "HSN NO", field: 'Hsno', editable: true },



        ]



        const currentDate = new Date();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        const headerDates = Array.from({ length: daysInMonth }, (_, index) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);


          let dateday = date.getDate()
          let dateMonth = date.getMonth() + 1
          let dateYear = date.getFullYear()
          let todayDate = dateday + '/' + dateMonth + "/" + dateYear;


          console.log(todayDate === todayDate1, todayDate, todayDate1, "4147")



          let showDtaes = todayDate === todayDate1
          if (todayDate === todayDate1) {
            showDtaes = true
          } else if (todayDate === lastThreeDaysFormatted[0]) {
            showDtaes = true
          }
          else if (todayDate === lastThreeDaysFormatted[1]) {
            showDtaes = true
          }
          else if (todayDate === lastThreeDaysFormatted[2]) {
            showDtaes = true
          } else {
            showDtaes = false
          }



          let obj = {
            headerName: "", field: "", cellRenderer: (param) => <InputCompJS
              params={param} enable={showDtaes}
              payload={payload} setpayload={setpayload}
              lastThreeDaysFormatted={lastThreeDaysFormatted}
              dateYear={dateYear.toString()}
              month={dateMonth.toString()} />
          }


          obj["headerName"] = todayDate
          obj["field"] = todayDate

          arr.push(obj)
        })
        console.log(arr, "sd")
        setcoldef(arr)


      }

    })






  }, [showModal,showLoader])
  // [showModal,showLoader]

  const onSubmitDaily = () => {
    console.log(pay, "pay");

    if (pay.length > 0) {
      // setShowLoader(true)
      dispatch({
        type:"SHOWLOADER",
        payload:true
      })
      axiosInstance.post("submitDailyReport", pay).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowLoader(false)
          setShowNotifiModal(false)
          toast.success('Data stored sucessfully', {
            autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
          });
          dispatch({
            type:"SHOWLOADER",
            payload:false
          })
        }else{


          toast.error('Something went wrong', {
            autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
          });
          




        }
      });

    } else {
      toast.error('Please Fill Production Data', {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
    

    }

  };

  const onChangeFunData = (data) => {
    console.log(data);
    let date = new Date(data);
    let dateday = date.getDate();
    let dateMonth = date.getMonth() + 1;
    let dateYear = date.getFullYear();
    console.log(dateYear, "KKK");
    let obj = {};
    obj["year"] = dateYear;
    obj["month"] = dateMonth;
    setStartDate(data);
    axiosInstance.post( "dateChange", obj).then((res) => {
      console.log(res);
    });
  };
  const UpdateFun=()=>{
    if(pay.length > 0){
      // setShowLoader(true)
      // setShowLoader(false)
      dispatch({
        type:"SHOWLOADER",
        payload:true
      })
      setShowNotifiupdate(false)
      axiosInstance.post( "updateProduction",pay).then((res)=>{
      console.log(res)
      if (res.status === 200) {
        // setShowLoader(false)
        dispatch({
          type:"SHOWLOADER",
          payload:false
        })

        setShowNotifiupdate(false)
        toast.success('Data Updated sucessfully', {
          autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
        });
      }
   })
  }else{
    toast.error('Please fill madatory data', {
      autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
    });

  }
  }
  return (
    <>


      <div className="divContainer">
        <h5>Add Daily Production</h5>
        <div className="lableContainer">
          <DatePicker
            selected={startDate}
            readOnly={true}
            onChange={(date) => onChangeFunData(date)}
          />
        </div>

      </div>
      <div className="ag-theme-alpine agTable Ag-gridContainer">
        <AgGridReact
          columnDefs={coldef}
          rowData={rowData}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
        />
      </div>
      <div>
        {/* <ModalComp show={showModal} setShowModal={setShowModal} setRowData={setRowData} /> */}
      </div>
      <div className="footerBtn" >
        <div className="Button">
          <button
            className="AdBtn"
            type="submit"
            onClick={() => {

              setShowNotifiMessg("Are you sure you want to submit?")

              setShowNotifiModal(true)
            }}
          >
            Submit
          </button>
        </div>

        <div className="Button">
          <button
            className="AdBtn"
            type="submit"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Stock
          </button>
        </div>
        <div className="Button">
          <button
            className="AdBtn"
            type="submit"
            onClick={() => {
              setShowNotifiupdate(true)
              setShowNotifiMessg("Are you sure you want to update")
            }}
          >
            Update Stock
          </button>
        </div>
      </div>

      {showModal && <AddNewItem show={showModal} setShowModal={setShowModal} />}
      {showLoader && <LoaderModal showLoader={showLoader} />}

      {showNotiMoadal && <Notification showNotiMoadal={showNotiMoadal} 
      setShowNotifiModal={setShowNotifiModal} Fun={onSubmitDaily} 
      message={showNotiMessg} />}

      {showNotiUpdate && <Notification showNotiMoadal={showNotiUpdate} 
      setShowNotifiModal={setShowNotifiupdate} Fun={UpdateFun} 
      message={showNotiMessg} />}

    </>
  );
};

export default DailyProd;
