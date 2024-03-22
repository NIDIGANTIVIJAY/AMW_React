import React, { useEffect } from "react";
import classes from "../cssFile/HomeProduct.module.css";
import { Link } from "react-router-dom";
import ModalComp from "./Modal"
import { useState } from "react";
import axios from "axios";

const Product = () => {
  const url=process.env.REACT_APP_SERVICE_ID
   const [product,setProduct]=useState()
  const [show, setShow] = useState(false)
  useEffect(()=>{
    axios.get(url+"jsonData").then((res)=>{
      setProduct(res.data)
    })
 },[])

const onInterested = ()=>{
  setShow(true)
} 

  // console.log(product, "pro");
  return (
    <div className={classes.product}>
      <div className={classes.gridContainer}>
        {product?.map((product, index) => (
          <div className={classes.homeproductCard} key={index}>
            <div className={classes.gridItem}>
              <div className={classes.homeproductBox}>
                <div className={classes.homeproductBoximg}>
                  <img src={url+`productimg/${product?.ProductUniqId}` }alt="image"  />
                </div>

                <div className={classes.homeproductBoxdetail}>
                  <h2>Product Details:</h2>

                  <div className={classes.tableContainer}>
                    <table className={classes.admTable}>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Material</th>
                        <td className={classes.admtd}>{product?.product}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Size {"(Inch)"}</th>
                        <td className={classes.admtd}>{product?.size}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Price {"(Rs)"}</th>
                        <td className={classes.admtd}>{product?.price}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Packaging Size {"(Kg)"}</th>
                        <td className={classes.admtd}>{product?.weight}</td>
                      </tr>
                    </table>
                  </div>

                
                </div>
              </div>
              <div className={classes.homeproductBoxDescription}>
                <p>{product.description}</p>
                <div className={classes.homebtnContainer}>
                  <button className={classes.btn1} onClick={()=> onInterested()}>Yes! I am Interestaed</button>
                  {/* <button >Read More</button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.btnDiv}>
        <Link to="/product">
          <button className={classes.btn1}>More Product</button>
        </Link>
      </div>

      <div>
        { show &&
        <ModalComp  show={show} setShow={setShow} />

        }
      </div>

    </div>
  );
};

export default Product;
