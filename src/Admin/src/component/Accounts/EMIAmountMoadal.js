import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
const EMIAmountModal = (props) => {
    const [coldef, setcoldef] = useState([
        { field: "GSTNumber", width: 150 },
        { field: "InitialPaidAmount", width: 150 },
        { field: "InvoiceNumber", width: 150 },
        { field: "date", width: 150 },
        { field: "AmountPaid", width: 150 },

    ])
    console.log(props.rowData,"LKLOLO")
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
            className="ModalUserCreate"
        >
   <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className="ag-theme-alpine agTable" >

                    <AgGridReact columnDefs={coldef} 
                        gridOptions={true}
                        rowData={props.rowData}


                    />
                </div>


            </Modal.Body>
        </Modal>


    </>)
}

export default EMIAmountModal