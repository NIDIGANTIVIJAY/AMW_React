import React from 'react'
import { useState } from "react";
// import "../cssFile/Sales.css";
import * as xlsx from "xlsx";
import c3 from "c3";
// import d3 from "d3";

const Sales = () => {
  const [jsonData, setJsonData] = useState([]);

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

  let data1 = ["Data1"];
  var data2 = ["Data2"];
  var data3 = ["Data3"];

  console.log(data1, data2, data3, "hsj7676hs");

  jsonData?.forEach((elem) => {
    data1.push(parseInt(elem?.data1));
    data2.push(parseInt(elem?.data2));
    data3.push(parseInt(elem?.data3));
  });

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [data1, data2, data3],
      type: "bar",
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

  return (
    <main className={"profile"}>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>

      <div className={"chartContainer"}>
        <div className={"chart"} id="chart"></div>
      </div>

    </main>
  );
};

export default Sales;
