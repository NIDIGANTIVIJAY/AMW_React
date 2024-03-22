






import { Modal, Button } from "react-bootstrap";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Oval } from 'react-loader-spinner'
import "./Loader.css"

const Notification=(props)=>{

  const onCloseFun = () => {
    props.setShowNotifiModal(false)

}
    return(<>
    <Modal
    show={props.showNotiMoadal}
     onHide={onCloseFun}
    aria-labelledby="ModalHeader"
    centered
    size="xl"
  
    
  
    >
      <Modal.Header closeButton>
      <b>{props.message} </b>
      </Modal.Header>
  
      <Modal.Footer>
      <button  className={"AdBtn"}onClick={()=>{props.Fun()}}>Yes</button>
        <button className={"AdBtn"} onClick={()=>{props.setShowNotifiModal(false)}}>No</button>
      </Modal.Footer>
    </Modal> 
    
    </>)
}
export default Notification

 