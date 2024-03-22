import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { useNavigate } from "react-router";
import InputCompJS from "./InputCompJS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../axiosconfig";
const DispatchData = () => {
  let date = new Date();
  let dateday = date.getDate();
  let dateMonth = date.getMonth() + 1;
  let dateYear = date.getFullYear();
  let todayDate1 = dateday + "/" + dateMonth + "/" + dateYear;
  const url = process.env.REACT_APP_SERVICE_ID;
  const InputFieldComp = (props) => {
    const [inputData, setinputData] = useState();
    const onChangeFun = (e) => {
      console.log(e);
      setinputData(e.target.value);
    };
    const onClickFun = () => {
      console.log(props.data, props, "OKLb a");
      let payload = { ...props.data, DispatchAmount: inputData };

      axiosInstance.post( "dispatch", payload).then((res) => {});
    };

    return (
      <>
        <div className="">
          <input
            className="dueAmtValue"
            type="number"
            readOnly={true}
            value={props.inputvalue}
            onChange={(e) => {
              onChangeFun(e);
            }}
          />
        </div>
      </>
    );
  };

  const [coldef, setcoldef] = useState();

  const [rowData, setRowData] = useState();
  const currentDate1 = new Date();
  console.log(currentDate1);
  const [selectedDate, setSelectedDate] = useState(currentDate1);
  const [selcteType, setSelctedType] = useState("Production");
  useEffect(() => {
    axiosInstance.get( "getStock").then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        let datesArra =
          res.data[2]?.DailyProdDataArray[0]?.yearArray[0]?.monthArray[1]
            ?.datesArray;
        let Data = res?.data;
        console.log(datesArra, "datesArra");

        let selctedDate = new Date(selectedDate);
        let selectedMonth = selctedDate.getMonth() + 1;
        let selectedYear = selctedDate.getFullYear();
        console.log(
          selectedDate,
          selectedYear,
          selectedMonth,
          "thfggjjyhgtftjh"
        );
        let inputvalue;
        let arr1 = [];
        let dataArr1 = [];

        let rowArr = [];
        for (let i = 0; i <= Data.length - 1; i++) {
          let rowobj = {};
          let s = Data[i].DailyProdDataArray[0].yearArray;
          rowobj["product"] = Data[i].product;
          rowobj["size"] = Data[i].size;
          rowobj["Hsno"] = Data[i].Hsno;

          for (let j = 0; j <= s.length - 1; j++) {
            console.log(s[j].year === selectedYear.toString());
            if (s[j].year === selectedYear.toString()) {
              let monthData = s[j].monthArray;

              for (let k = 0; k <= monthData.length - 1; k++) {
                console.log(monthData[k].month, "PPPOPOPO");
                if (monthData[k].month === selectedMonth.toString()) {
                  let dateArr = monthData[k]?.datesArray;

                  for (let l = 0; l <= dateArr?.length - 1; l++) {
                    if (selcteType === "Production") {
                      rowobj[dateArr[l].date] = dateArr[l].prodData;
                    } else {
                      rowobj[dateArr[l].date] = dateArr[l].Dispatch;
                    }
                  }
                }
              }
            }
          }
          rowArr.push(rowobj);
        }

        console.log(rowArr, "LKOROWDATA");
        setRowData(rowArr);

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
          { headerName: "Stock", field: "product", editable: true, width: 150 },

          { headerName: "Size", field: "size", editable: true, width: 120 },
          { headerName: "HSN NO", field: "Hsno", editable: true, width: 100 },
        ];

        let date = new Date();
        let dateday = date.getDate();
        let dateMonth = date.getMonth() + 1;
        let dateYear = date.getFullYear();
        let todayDate1 = dateday + "/" + dateMonth + "/" + dateYear;

        const currentDate = new Date();
        // const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        //const daysInMonth = new Date("2023", 8, 0).getDate();
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

        const headerDates = Array.from({ length: daysInMonth }, (_, index) => {
          // const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
          const date = new Date(selectedYear, selectedMonth - 1, index + 1); // Note: Month is 0-based in JavaScript dates.

          let dateday = date.getDate();
          let dateMonth = date.getMonth() + 1;
          let dateYear = date.getFullYear();
          let todayDate = dateday + "/" + dateMonth + "/" + dateYear;

          let obj = {
            headerName: "",
            field: "",
          };

          obj["headerName"] = todayDate;
          obj["field"] = todayDate;

          arr.push(obj);
        });

        setcoldef(arr);
      }
    });
  }, [selectedDate, selcteType]);

  const handleChange = (date) => {
    setSelectedDate(date);
  };
  const handleSelectChange = (event) => {
    setSelctedType(event.target.value);
  };

  return (
    <>

    <div className="lableContainer">
      <div>
        <label></label>
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div>
        <label></label>
        <select value={selcteType} onChange={handleSelectChange}>
          <option value="Production">Production </option>
          <option value="Dispatch">Dispatch </option>
        </select>
      </div>
      </div>

      <div className="ag-theme-alpine agTable">
        <AgGridReact
          columnDefs={coldef}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          rowData={rowData}
        />
      </div>
    </>
  );
};

export default DispatchData;
