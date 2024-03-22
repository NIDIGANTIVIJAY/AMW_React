import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../cssFile/Modal.css";
import axios from "axios";

const ModalComp = (props) => {
  const onCloseFun = () => {
    props.setShow(false);
  };

  const [desc, setDesc] = useState();
  const [phno, setphno] = useState();

  const url = process.env.REACT_APP_SERVICE_ID;
  const initModal = (e) => {
    let payload = {
      phno: phno,
      desc: desc,
    };
    axios.post(url + "sendEmail", payload).then((res) => {
      console.log(res);
    });
    e.preventDefault();

    props.setShow(false);
  };
  const onChangeFun = (e, type) => {
    if (type === "phno") {
      setphno(e.target.value);
    } else {
      setDesc(e.target.value);
    }
  };
  return (
    <>
      {/* <Button variant="success">Open Modal</Button> */}

      <Modal
        show={props.show}
        onHide={onCloseFun}
        aria-labelledby="ModalHeader"
        centered
      >
        <Modal.Header closeButton onClick={onCloseFun}>
          <p1>Connect with Aakash Metal Works</p1>
        </Modal.Header>
        <Modal.Body>
          <div className="bodyContainer">
            <label htmlFor="contactNo">
              <span className="mobileTxt">Mobile Number </span>
              <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input
              className="mobInput"
              type="tel"
              id="contactNo"
              required
              placeholder="Enter Your Mobile No"
              onChange={(e) => onChangeFun(e, "phno")}
            />{" "}
            <br />
            <p className="note">We will contact you on this number</p>
            <textarea
              className={"textAreaWidth"}
              name="message"
              id="message"
              rows="2"
              placeholder="Describe your requirement in detail..."
              onChange={(e) => onChangeFun(e, "desc")}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="AdBtn" variant="success" onClick={(e) => initModal(e)}>
            Submit Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComp;
