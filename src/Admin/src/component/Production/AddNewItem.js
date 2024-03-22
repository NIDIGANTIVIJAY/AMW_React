import React, { useEffect, useState } from "react"
import {AgGridReact} from 'ag-grid-react';
import classes from "../../../../components/cssFile/AdminDashboard.module.css";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import axiosInstance from "../axiosconfig";

import axios from "axios";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';


import { Modal, Button } from "react-bootstrap";

const AddNewItem =(props)=>{
    const url=process.env.REACT_APP_SERVICE_ID


    const [payloadData, setPayloadData] = useState({
        imageData: "",
        description: "",
        price: "",
        item: "",
        product: "",
        size: "",
        weight: "",
        quantity: "",
        hsnNo:""
      });
  
    const AddFun=(e)=>{
        console.log(payloadData)
        console.log(payloadData)
        e.preventDefault()
    
            let formData = new FormData()
        formData.append('imageData',payloadData["imageData"])
        formData.append('description',payloadData["description"])
        formData.append('price',payloadData["price"])
        formData.append('item',payloadData["item"])
        formData.append('product',payloadData["product"])
        formData.append('size',payloadData["size"])
        formData.append('weight',payloadData['weight'])
        // formData.append('quantity',payloadData["quantity"])
        formData.append('Hsno',payloadData["hsnNo"])

           console.log(formData)
        const headers = {
          "Content-Type": "form-data"
        };
        axiosInstance.post( "upload/data",formData,headers).then((res)=>{
            console.log(res)
            if(res.status === 200){
              props.setShowModal(false)
            }
          })
          console.log(payloadData,"Payload Data")
          
      }
    const onCloseFun=()=>{
      props.setShowModal(false)
    }

    
      console.log(payloadData)
      const onChangeFun = (e, type) => {
        let obj={...payloadData}
        
        if (type === "productName") {
          obj["product"]=e.target.value
        } else if (type === "quantity") {
          obj["quantity"]=e.target.value
        } else if (type === "size") {
          obj["size"]=e.target.value
        } else if (type === "weight") {
          obj["weight"]=e.target.value
        } else if (type === "price") {
          obj["price"]=e.target.value
        } else if (type === "item") {
          obj["item"]=e.target.value
        } else if (type === "description") {
          obj["description"]=e.target.value
        }
        else if (type === "productid") {
          obj["productId"]=e.target.value
        }else if(type === "HSNNO"){
            obj["hsnNo"]=e.target.value
        }
        setPayloadData(obj)
        
      };
      const onClickofImageFun=(e)=>{
        console.log(e,e.target.files[0])
               let formData = new FormData()
            formData.append('file',e.target.files[0])
              
            let obj={...payloadData}
          
          obj["imageData"]=e.target.files[0]
          console.log(obj)
          setPayloadData(obj)
          e.preventDefault()
        }

  return(<>
   

    <Modal
        show={props.show}
        onHide={onCloseFun}
        aria-labelledby="ModalHeader"
        centered
        size="xl"
      >
        <Modal.Header closeButton onClick={onCloseFun}>
      <label className=" inputHeader">Please Add Stock</label>
        </Modal.Header>
        <Modal.Body>
            
        <main className={classes.profile} >
        <main className={ classes.initialauth}>
          <section>
            <form>
              <div className={classes.control}>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={(e)=>{onClickofImageFun(e)}} />
              </div>
              <div className={classes.control}>
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  onChange={(e) => {
                    onChangeFun(e, "productName");
                  }}
                />
              </div>
              {/* <div className={classes.control}>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  onChange={(e) => {
                    onChangeFun(e, "quantity");
                  }}
                />
              </div> */}
              <div className={classes.control}>
                <label htmlFor="HSNNo<">HSN No</label>
                <input
                  type="text"
                  name="HSNNO"
                  id="HSNNo"
                  placeholder="Please Enter HSN Number"
                  onChange={(e) => {
                    onChangeFun(e, "HSNNO");
                  }}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="size">Size</label>
                <input
                  type="number"
                  id="size"
                  onChange={(e) => {
                    onChangeFun(e, "size");
                  }}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="weight">Weight Per Bags</label>
                <input
                  type="text"
                  id="weight"
                  onChange={(e) => {
                    onChangeFun(e, "weight");
                  }}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  onChange={(e) => {
                    onChangeFun(e, "price");
                  }}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  id="item"
                  onChange={(e) => {
                    onChangeFun(e, "item");
                  }}
                />
              </div>
              {/* <div className={classes.control}>
                <label htmlFor="productid">Product ID</label>
                <input
                  type="text"
                  id="productid"
                  onChange={(e) => {
                    onChangeFun(e, "productid");
                  }}
                />
              </div> */}

              <div className={classes.control}>
                <label htmlFor="description">Description</label>
                <input
                  type="textarea"
                  name="description"
                  id="description"
                  cols="40"
                  rows="4"
                  placeholder="Please write your query..."
                  onChange={(e) => {
                    onChangeFun(e, "description");
                  }}
                />
              </div>
              
           
            
              
           
            </form>
          </section>
        </main>
        </main>
        </Modal.Body>
        <Modal.Footer>
        <input className="AdBtn" type="submit" value={"submit"} onClick={(e)=>{AddFun(e)}} ></input>
        </Modal.Footer>
       
      </Modal>

  
  
  </>)
}

export default AddNewItem;