import React, { useEffect, useState } from "react";
import classes from "../cssFile/AdminDashboard.module.css";
import img from "../Assets/nail1.jpg";
import Sales from "../jsFile/Sales";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { imagefrombuffer } from "imagefrombuffer";
import Auth from "./Auth"
import {  } from "../../store/action/Login";



const Contact = (props) => {
  const [showPrev,setShowPrev]=useState(false)
  const [previewData,setPreviewData]=useState()
  const [showTotaData,setShowTotalData]=useState(false)
  const userlogin=useSelector((state)=>state.Common.login)
  console.log(userlogin)
  const url = process.env.REACT_APP_SERVICE_ID;
  const nav = useNavigate();
    console.log("in ",props)
    const [bufferSate,setBufferState]=useState()
   const userloginDetails=useSelector((state)=>console.log(state))
  //  const dispatch=useDispatch()
    useEffect(()=>{
      if(userlogin === false){
        nav("/login")
      }
        
    },[userlogin])
  const logoutFun = (e) => {
    e.preventDefault();
    axios
      .post(url + "user/logoutAll", { Authorization: `Bearer ${props.token}` })
      .then((res) => {
        console.log(res);
        nav("/");
      });
  };

  



  const [payloadData, setPayloadData] = useState({
    imageData: "",
    productId: "",
    description: "",
    price: "",
    item: "",
    product: "",
    size: "",
    weight: "",
    quantity: "",
  });
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
    }
    setPayloadData(obj)
    
  };
  const AddFun=(e)=>{
    console.log(payloadData)
    console.log(payloadData)
    e.preventDefault()

        let formData = new FormData()
    formData.append('imageData',payloadData["imageData"])
    formData.append('productId',payloadData["productId"])
    formData.append('description',payloadData["description"])
    formData.append('price',payloadData["price"])
    formData.append('item',payloadData["item"])
    formData.append('product',payloadData["product"])
    formData.append('size',payloadData["size"])
    formData.append('weight',payloadData['weight'])
    formData.append('quantity',payloadData["quantity"])
       console.log(formData)
    const headers = {
      "Content-Type": "form-data"
    };
    axios.post("upload/data",formData,headers).then((res)=>{
        console.log(res)
      })
      console.log(payloadData,"Payload Data")
      
  }

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
  

  const previeFun=(e)=>{
    setShowPrev(!showPrev)
    let obj={
      "productId":payloadData?.productId
    }
    axios.post("getqotation",obj).then((res)=>{
        console.log(res.data)
        setPreviewData(res.data)
        const arr= new Uint8Array(res.data.imageData)
        const blob = new Blob([arr], { type: 'image/jpg' })
       let urlData=   URL.createObjectURL(blob)
        console.log(urlData)
       
         console.log(arr);
         const base64String = btoa(String.fromCharCode(...arr));
        let imgsrc= `data:image/png;base64,${base64String}`
         setBufferState(urlData)
             
    })



  e.preventDefault()
  }

  const showPrevimage=()=>{
    console.log(bufferSate,"BufferState")
   
  }
  return (
    <>

    {userlogin === false ?   <Auth ></Auth> : 
    <>
    <div style={{marginTop:"80px"}}> 
      <button type="submit" style={{ width: "9rem", borderRadius:"5px",margin:"20px"}} onClick={()=>{props.setShowProduct(false)}} >Back</button>
    </div>
   
      <main className={classes.profile}>

         
      
        <main className={ showPrev ? classes.auth : classes.initialauth}>
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
              <div className={classes.control}>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  onChange={(e) => {
                    onChangeFun(e, "quantity");
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
              <div className={classes.control}>
                <label htmlFor="productid">Product ID</label>
                <input
                  type="text"
                  id="productid"
                  onChange={(e) => {
                    onChangeFun(e, "productid");
                  }}
                />
              </div>

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
           
              <button className={classes.btn} onClick={(e)=>{AddFun(e)}}> Add </button>
               { payloadData.productId !== "" &&    <button className={classes.btn}  onClick={(e)=>{previeFun(e)}}> Prev </button>
               
               }
           
            </form>
          </section>
        </main>
        {/* <button type="submit" style={{ width: "9rem", borderRadius: "5px"}} onClick={()=>{props.setShowProduct(false)}} >Back</button> */}
   { showPrev && 
    
        <main className={classes.auth1}>

          <img className={classes.img}  src={url+`productimg/${previewData?.ProductUniqId}` } alt="img" />
          <div className={classes.tableContainer}>
            <table className={classes.admTable}>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Product Name</th>
                <td className={classes.admtd}>{previewData?.product}</td>
              </tr>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Item</th>
                <td className={classes.admtd}>{previewData?.item}</td>
              </tr>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Size</th>
                <td className={classes.admtd}>{previewData?.size} Inch</td>
              </tr>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Price</th>
                <td className={classes.admtd}>{previewData?.price}:00 ruppes</td>
              </tr>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Quantity</th>
                <td className={classes.admtd}>{previewData?.quantity} Bags</td>
              </tr>
              <tr className={classes.admTable}>
                <th className={classes.admth}>Weight Per Bags</th>
                <td className={classes.admtd}>{previewData?.weight} Kg</td>
              </tr>
            </table>



          </div>
          <p className={classes.descriptipn}>
            Description:{" "}
            {previewData?.description}
          </p>
        </main>  }

        





      </main> 
{/* {
  showTotaData &&    <Sales /> 
}
       */}
      
      </> }
    </>
  );
};

export default Contact;
