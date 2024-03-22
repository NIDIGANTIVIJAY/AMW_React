import React from "react";
import classes from "../cssFile/Product.module.css";
import nail1 from "../Assets/nail5.jpg";
import nail2 from "../Assets/nail2.jpg";
import nail3 from "../Assets/nail3.jpg";
import nail4 from "../Assets/nail4.jpg";
import ModalComp from "./Modal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// const product = [
//   {
//     img: nail1,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 3",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
//   {
//     img: nail2,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 3",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
//   {
//     img: nail3,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
//   {
//     img: nail4,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
//   {
//     img: nail3,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
//   {
//     img: nail4,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: [
//       {
//         price: "100 $",
//         item: "",
//         prduct: "",
//         size: "1 inch",
//       },
//     ],
//   },
// ];

const Product = () => {
  const [product, setProduct] = useState();
  const url = process.env.REACT_APP_SERVICE_ID;
  useEffect(() => {
    axios.get(url + "jsonData").then((res) => {
      setProduct(res.data);
    });
  }, []);

  const [show, setShow] = useState(false);

  const onInterested = () => {
    setShow(true);
  };

  return (
    <div className={classes.product}>
      <div className={classes.product1}>
        {product?.map((product, index) => (
          <div className={classes.productCard} key={index}>
            <div className={classes.productBox}>
              <div className={classes.commonStyleWrapper}>
                <div
                  className={`${classes.productBoximg} ${classes.commonStyle}`}
                >
                  <img
                    src={url + `productimg/${product?.ProductUniqId}`}
                    alt=""
                    width="300px"
                    height="170px"
                  />
                </div>

                <div
                  className={`${classes.productBoxdetail} ${classes.commonStyle}`}
                >
                  <div className={classes.productTableContainer}>
                    <table className={classes.admTable}>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Material Grade</th>
                        <td className={classes.admtd}>{product?.product}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Item</th>
                        <td className={classes.admtd}>{product?.item}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Size {"(Inches)"}</th>
                        <td className={classes.admtd}>{product?.size}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Price {"(Rs)"}</th>
                        <td className={classes.admtd}>{product?.price}</td>
                      </tr>
                      {/* <tr className={classes.admTable}>
                        <th className={classes.admth}>Quantity</th>
                        <td className={classes.admtd}>{product?.quantity}</td>
                      </tr> */}
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Packaging Size {"(Kg)"}</th>
                        <td className={classes.admtd}>{product?.weight}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <div
                className={`${classes.productBoxDescription} ${classes.commonStyle1}`}
              >
                <p className={classes.disText}>{product.description}</p>
                <div className={classes.productBtnContainer}>
                  <button
                    className={classes.btn1}
                    onClick={() => onInterested()}
                  >
                    Yes! I am Interested
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>{show && <ModalComp show={show} setShow={setShow} />}</div>
    </div>
  );
};

export default Product;
