

import { Modal, Button } from "react-bootstrap";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Oval } from 'react-loader-spinner'
import "./Loader.css"

const LoaderModal=(props)=>{

  console.log("IN LOADER")
    return(<>
    <Modal
    show={props.showLoader}
    
    aria-labelledby="ModalHeader"
    centered
    size="sm"
    className="loaderClass"
    
    // style={{width:"fit-content"}}
    >

     
      <Modal.Body style={{width:"fitContent"}}>
      <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>

      </Modal.Body>
    </Modal> 
    
    </>)
}
export default LoaderModal

 