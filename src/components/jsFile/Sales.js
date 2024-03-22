import React, { useEffect } from "react";
import { useState } from "react";
import classes from "../cssFile/Sales.module.css";
import * as xlsx from "xlsx";
import "react-data-grid/lib/styles.css";
import ReactDataGrid, { SelectColumn, textEditor } from "react-data-grid";
import JsonData from "../../store/action/jsonData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Sales = (props) => {
  const [jsonData, setJsonData] = useState([]);
  const [jsonTableData, setJsonTableData] = useState(null);
  const totalData = useSelector((state) => state.Common.JsonData);
  const [rowData, setRowData] = useState([]);
  const token = useSelector((state) => state.Common.token);
  const [columns, setcolumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState();
  console.log(selectedRows, "selected");
  const url = process.env.REACT_APP_SERVICE_ID;
  const OnClickEditFun = (data) => {
    console.log(data);
    const newObj = {};
    for (const [key, value] of Object.entries(data)) {
      if (key !== "productId") {
        newObj[key] = value;
      }
    }
    console.log(newObj);
    axios.post(url + `edit/${data?.productId}`, newObj).then((res) => {
      console.log(res.data);
    });
  };
  function RenderBtn(props) {
    return (
      <input
        type="submit"
        className={classes.btnclasstable}
        value={"save"}
      ></input>
    );
  }
  const columns1 = [
    { key: "productId", name: "productId", frozen: true },
    { key: "product", name: "Product", renderEditCell: textEditor },
    { key: "description", name: "description", renderEditCell: textEditor },
    { key: "price", name: "price", renderEditCell: textEditor },
    { key: "item", name: "item", renderEditCell: textEditor },
    { key: "size", name: "size", renderEditCell: textEditor },
    { key: "weight", name: "weight", renderEditCell: textEditor },
    { key: "quantity", name: "quantity", renderEditCell: textEditor },
    { key: "action", name: "Action", renderCell: RenderBtn },
  ];

  console.log(rowData, "RowDATA");

  console.log(totalData);
  const dispatch = useDispatch();
  const onSuccessFun = (data) => {
    console.log("IN Success", data);

    let colmdataArr = [];
    let rowDataArray = [];

    data &&
      data.map((i, index) => {
        let rowObj = {};
        if (index === 0) {
          Object.keys(i).map((j) => {
            let clomnData = {};
            if (j !== "_id" && j !== "__v" && j !== "imageData") {
              clomnData["Key"] = j;
              clomnData["name"] = j;
              console.log(clomnData, colmdataArr);
              colmdataArr.push(clomnData);
            }
          });
        }
        Object.keys(i).map((k) => {
          if (k !== "_id" && k !== "__v" && k !== "imageData") {
            rowObj[k] = i[k];
          }
        });
        rowDataArray.push(rowObj);
        console.log(rowObj);
      });
    setRowData(rowDataArray);
    setcolumns(colmdataArr);
    console.log(colmdataArr, rowDataArray);
  };
  useEffect(() => {
    dispatch(JsonData(onSuccessFun));
  }, []);

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

  const readUploadTableFile = (e) => {
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
        setJsonTableData(json);
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

  return (
    <>
   
    <div >
      <main className={classes.profile}>
        <h4> Total Product </h4>
        <div className={classes.table} style={{width: "93rem"}}>
          <div className={classes.productCard}>
            <div className={classes.productBox}>
              <div className={classes.productBoxdetail}>
               
                {rowData?.length > 0 && (
                  <ReactDataGrid
                    columns={columns1}
                    rows={rowData}
                    onRowsChange={setRowData}
                    onCellClick={(args, event) => {
                      console.log(args);
                      if (args.column.key === "action") {
                        OnClickEditFun(args.row);
                      }
                    }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <span className={classes.buttonClass} style={{}}>
        <button
        style={{margin: "0px 18px 20px",
          borderRadius: "8px"}}
          type="submit"
          onClick={() => {
            props.setShowProduct(true);
          }}
        >
          Add Product
        </button>
      </span>
      
      </div>
    </>
  );
};

export default Sales;
