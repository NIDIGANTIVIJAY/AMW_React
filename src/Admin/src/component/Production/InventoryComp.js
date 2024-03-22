import React,{useState,useEffect} from "react"
import {AgGridReact} from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { useNavigate } from "react-router";
import axiosInstance from "../axiosconfig";
import DispatchComp from "./DispatchComp";
import DailyProd from "./DailyProdComp"

import DispatchData from "./DispatchData";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const InventoryComp=()=>{
    let date = new Date()
    let dateday = date.getDate()
    let dateMonth = date.getMonth() + 1
    let dateYear = date.getFullYear()
    let todayDate1 = dateday + '/' + dateMonth + "/" + dateYear;
    const [coldef,setcoldef]= useState([
        {headerName:"Stock", field: 'StockName' },
        { field: 'Size'},
        { field: 'Hsno'  },
        { field: 'month'  },
        {headerName:todayDate1+"Today Production Close Data", field: 'production'  },
        { field: 'year'  },
    
    ]);

    const [coldef1,setcoldef1]= useState([
        {headerName:"Stock", field: 'StockName' },
        { field: 'Size'},
        { field: 'Hsno'  },
        { field: 'month'  },
        {headerName:todayDate1+"Today Production Close Data", field: 'production'  },
        { field: 'year'  },
        { field: 'Dispatch'  },
    
    ]);
    const url = process.env.REACT_APP_SERVICE_ID

    const [rowData,setRowData]=useState()

    useEffect(()=>{
     
        

      axiosInstance.get( "getStock").then((res) => {
            console.log(res.data)
            let arr=[]
            res.data.map((i)=>{
                  let obj={}
                  obj["StockName"]=i.StockName
                  obj["Size"]=i.Size
                  obj["Hsno"]=i.Hsno
                 
                  i.DailyProdDataArray[0].yearArray.map((j)=>{
                       obj["year"]=j.year

                      j.monthArray.map((k)=>{
                          obj["month"]=k.month

                        k.datesArray.map((l)=>{
                            console.log(l,"KKKK")
                            if(l.date === todayDate1){
                               obj["production"]=l. prodData
                               obj["Dispatch"]=l.Dispatch
                               

                            }

                        })
                      })

                  })
                  
           arr.push(obj)


                 
            })

            console.log(arr,"LLLL")
            setRowData(arr)
        
        })
    },[])
    const nav=useNavigate()

    const navFun=()=>{
        nav("/admin/production/dailyprod" );
       }


       const navFun1=()=>{
        nav("/admin/production/dispatchprod");
       }


      

       const onClicCompleteFun=(e)=>{
        console.log(e)
        if(e === "dailyprod"){
         
          setKey(e)
    
        }else{
          setKey(e)
    
        }
      
      }
  const [key, setKey] = useState('dailyprod');




    return(<>
    {/* <div style={{display:"flex" ,flexDirection:"row" ,gap:"4px"}}>
    <div className="ag-theme-alpine agTable" >
    <AgGridReact columnDefs={coldef} 
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      rowData={rowData}
    />
    </div>
    <div className="ag-theme-alpine agTable" >
    <AgGridReact columnDefs={coldef1} 
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      rowData={rowData}
    />
    </div>

        
    </div> */}

<h3>Production</h3>
    <Tabs
      defaultActiveKey= {key}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(e) =>onClicCompleteFun(e)}
    >
      <Tab eventKey="dailyprod" title="Add Daily Production">
              <DailyProd/>
      </Tab>
      <Tab eventKey="dispacth" title="Today's Disp/Prod"  >
      <h5>Today's Disp/Prod</h5>
             <DispatchComp/>
      </Tab>
      <Tab eventKey="Totaldispacth" title="View Disp/Prod"  >
      <h5>View Disp/Prod</h5>
      {key === "Totaldispacth" && <DispatchData/> }  
      </Tab>
     
    </Tabs>
   
    {/* <div className="Button">
    <button className="AdBtn" type="submit" onClick={()=>{navFun1()}}>Dispatch Production</button>
    <button className="AdBtn" type="submit" onClick={()=>{navFun() } }> Daily Production</button>
    </div> */}


    </>)

}

export default InventoryComp;