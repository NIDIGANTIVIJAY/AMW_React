import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';


import axiosInstance from "../../axiosconfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

import JsonData from "../../../../../store/action/jsonData";

import { Modal, Button } from "react-bootstrap";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import _ from 'lodash'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QuoteFormEdit = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()






  // const ModalData = useSelector((state) => state.Common.ModalData)
  // const showModal = useSelector((state) => state.Common.showModal)

  const [keys] = useState(Object.keys(props.editFormData?.InvoiceProduct[0]))
  console.log(props.editFormData, keys, "ghjk")
  const [productName, setproductName] = useState()
  const [ShowproductName, setShowproductName] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const [showBtn, setShowBtn] = useState(false)
  const [payloadData, setPayloadData] = useState(props.editFormData)
  const [formData, setFormData] = useState(props.editFormData.InvoiceProduct)
  const jsonData = useSelector((state) => state.Common.JsonData)
  useEffect(() => {
    console.log(selectedOption)
    if (jsonData === "") {
      dispatch(JsonData(onSuccess));
    }
  }, [selectedOption])

  const onSuccess = (res) => {

  }


  const OnChangeFun = (e, type) => {
    let obj = { ...payloadData }

    console.log("ihgq", obj, obj.InvoiceProduct)


    if (type === "GSTNumber") {
      obj["GSTNumber"] = e.target.value;
    } else if (type === "Name") {
      obj["Name"] = e.target.value;
    } else {
      obj.InvoiceProduct[e.target.id][type] = e.target.value
      //  obj1[e.target.id][type]=e.target.value

    }
    console.log("ihg", obj)
    // setFormData(obj.InvoiceProduct)
    setPayloadData(obj)

  }
  const OnclickFun = (e) => {
    e.preventDefault()
    console.log(payloadData, "xxxxx")
    axiosInstance.post( "editquote", payloadData).then((res) => {
      console.log(res)
      if (res.status === 200) {
        props.setShowModal(false)
      }
    })
    //  dispatch({
    //   type:"SHOWMODAL",
    //   payload:false
    //  }) 

  }

  const OnclickEditFun = (e) => {
    e.preventDefault()
    let arr = []
    let arr1 = []
    console.log(jsonData, payloadData, "YYYTYTYTY")
    setShowproductName(true)
    jsonData.map((j) => {
      let obj = { value: '', label: '' }
      console.log(payloadData.InvoiceProduct.some((i) => console.log(i)))
      if (payloadData.InvoiceProduct.some((i) => i.Size !== j.size)) {
        obj["value"] = j.size
        obj["label"] = j.product
        arr.push(obj)

      }

    })

    console.log(arr, "PLOLOPLO")
    setproductName(arr)

    // jsonData.map((i) => {


    //   let obj = { value: '', label: '' }



    //   props.editFormData.InvoiceProduct.map((j) => {
    //     if (j.Product !== i.product) {
    //       obj["value"] = i.size

    //       obj["label"] = i.product
    //       arr.push(obj)

    //     } else {
    //       obj["value"] = i.size
    //       obj["label"] = i.product
    //       arr1.push(obj)

    //     }
    //   })


    // })

    // setSelectedOption(arr1)

    // setproductName(arr)






  }
  const OnclickAddNewItem = (e) => {
    e.preventDefault()
    console.log( productName,"YYYTYTYTY")
    console.log( "JsonData",productName, selectedOption)
      if(selectedOption.value === ""){
        toast.error(`Please Select the Option`, {
          autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
        });
        return
      }
    let arr = []
    let JsonData = [...jsonData]
    let asd = payloadData.InvoiceProduct
    let sd = { ...payloadData }

    let obj = []
    let arr1=[]
    const result = JsonData.filter((Item) => {
      console.log(Item.size === selectedOption.value)
      if (Item.size === selectedOption.value) {
        let obj = {}
        obj['Item'] = Item.item
        obj['Description'] = Item.description
        obj['Price'] = Item.price
        obj['Product'] = Item.product
        obj['ProductId'] = Item.productId
        obj['Quantity'] = Item.quantity
        obj['Size'] = Item.size
        obj['Weight'] = Item.weight
        obj["ProductUniqId"] = Item.ProductUniqId



        productName.map((j) => {
          let obj = { value: '', label: '' }
          if (Item.size  !== j.value) {
            obj["value"] = j.value
            obj["label"] = j.label
            arr1.push(obj)
    
          }
    
        })




     

      

        sd.InvoiceProduct.push(obj)
        console.log("IN SD", sd)
        setPayloadData(sd)
        return Item
      }
    })

    let obj1 = { value: '', label: '' }
    setSelectedOption(obj1)
  console.log(arr1,"KJNBG")
    setproductName(arr1)
    
    console.log(sd, "LLKJHdd")





    // setFormData(asd) 
    // setPayloadData(asd)







    console.log(asd, "SD")

  }

  const onCloseFun = () => {

    // dispatch({
    //   type: "SHOWMODAL",
    //   payload: false
    // })
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
        <label className=" inputHeader">Invoice Edit</label>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="LableDiv">
            <label>GSTNumber</label>
            <input type="text" defaultValue={props.editFormData.GSTNumber} onChange={(e) => { OnChangeFun(e, "GSTNumber") }} />
            <br />
            <label >Name</label>
            <input type="text" defaultValue={props.editFormData.Name} onChange={(e) => { OnChangeFun(e, "Name") }} />




            <h4>Product-List</h4>




            {
              // props.editFormData && props.editFormData.InvoiceProduct
              //  && props.editFormData.InvoiceProduct

              payloadData.InvoiceProduct.map((i, index) => {
                return <>

                  <div className="LableDivEdit">


                    <label className="ListNameHeader">List{index + 1}</label>

                    <br />

                    <label >{keys[2]}</label>
                    <input type="text" defaultValue={i.Price} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[2]) }} ></input>

                    <label  >{keys[3]}</label>
                    <input type="text" defaultValue={i.Item} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[3]) }} ></input>

                    <label>{keys[4]}</label>
                    <input type="text" defaultValue={i.Product} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[4]) }} ></input>

                    <label >{keys[7]}</label>
                    <input type="number" defaultValue={i.Quantity} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[7]) }} ></input>

                    <label>{keys[5]}</label>
                    <input type="text" defaultValue={i.Size} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[5]) }} ></input>

                    <label >{keys[6]}</label>
                    <input type="text" defaultValue={i.Weight} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[6]) }} ></input>

                    <br />
                    <br />

                  </div>
                </>
              })}

          </div>









        </form>
        {ShowproductName &&
          <Select

            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={productName}

          />}




      </Modal.Body>
      <Modal.Footer>
        <Button className="AdBtn" type="submit" onClick={(e) => { OnclickFun(e) }}>Submit</Button>
        {productName === undefined ?
          <Button className="AdBtn" type="submit" onClick={(e) => { OnclickEditFun(e) }}>Add List Item</Button> :
          <Button className="AdBtn" type="submit" onClick={(e) => { OnclickAddNewItem(e) }}>Add Item</Button>}
      </Modal.Footer>

    </Modal>



  </>)
}

export default QuoteFormEdit;
