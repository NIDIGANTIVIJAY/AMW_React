import React, { useState } from "react";


import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import axiosInstance from "../axiosconfig";

const ModalComp = (props) => {
    const [stockName, setStockName] = useState("")
    const [size, setSize] = useState("")
    const [hsnNum, sethsnNum] = useState("")
    const [data, setData] = useState([])
  const url=process.env.REACT_APP_SERVICE_ID
  const currentDate = new Date();
const [currentMonth] = useState(currentDate.getMonth()+1); 

    const onclickSubmitFun = () => {
        
        const currentYear = new Date().getFullYear();

        let obj = {}
        obj["StockName"] = stockName
        obj["Size"] = size

        obj["Hsno"] = hsnNum
  

        let arr = []
        arr.push(obj)

        setData((prev) => {
            return [...prev, obj]
        })
       
        axiosInstance.post("createStock",obj).then((res)=>{
            if(res.status === 200 ){
           
                sethsnNum("")
                setSize("")
                setStockName("")
            }
        })





    }
    const onClickSubmit = () => {
    
       
        props.setShowModal(false)
     
       
       
    }

    const onCloseFun = () => {
        props.setShowModal(false)

    }
    return (<>



        <Modal
            show={props.show}
            onHide={onCloseFun}
            aria-labelledby="ModalHeader"
            centered
            size="xl"
        >
            <Modal.Header closeButton onClick={onCloseFun}>

            </Modal.Header>
            <Modal.Body>
                <label style={{ paddingRight: "12px" }} >Stock Name </label>
                <input type="text" onChange={(e) => { setStockName(e.target.value) }} value={stockName} />
                <label style={{ paddingRight: "12px" }} >Size </label>
                <input type="text" onChange={(e) => { setSize(e.target.value) }} value={size} />
                <label style={{ paddingRight: "12px" }} >HSN No</label>
                <input type="text" onChange={(e) => { sethsnNum(e.target.value) }} value={hsnNum} />
     
                <label style={{ paddingRight: "12px" }} >Current Month</label>
                <input type="text" readOnly={true}   value={currentMonth} />
     


            </Modal.Body>
            <Modal.Footer>
                <Button className="AdBtn" type="submit" onClick={() => { onclickSubmitFun() }} >Add stock </Button>
                <Button className="AdBtn" type="submit" onClick={() => { onClickSubmit() }} >submit </Button>
            </Modal.Footer>

        </Modal>



    </>)




}

export default ModalComp