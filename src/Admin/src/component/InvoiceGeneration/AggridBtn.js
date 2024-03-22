import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AggridBtn =(props) => {
   const dispatch=useDispatch()
   const processData=useSelector((state)=>state.Common.processingArray
    )
    const formatArr=useSelector((state)=>state.Common.formatedArray)
    const rowData=useSelector((state)=>state.Common.rowData)

    console.log(props.data,"SDEF")
  const buttonClicked = () => {
    console.log(formatArr,rowData,props.params.data.Quantity,"FGGG")
   
   

    if(props.params.data.Price === null){
      toast.error('Please Enter the Price', {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
    return
    }
    if(props.params.data.Quantity === null){
      toast.error('Please Enter the Quantity', {
        autoClose: 5000, // Auto close the toast after 3 seconds (3000 milliseconds)
      });
      return
      
    }
  
     
  
  
  
  
    const copiedObject = { ...props.params.data };
    delete copiedObject["shouldShowButton"]
    console.log(copiedObject)

    props.params.data.shouldShowButton=false
    let s=props.params.data
    console.log(s)
    
    // props.data[props.params.node.rowIndex].shouldShowButton = false;
    // props.setRowData(props.data);
   
    
    dispatch(
      {
        type:"PROCESSINGARRAY",
        payload:props.params.data.ProductUniqId

      }
    )
    dispatch(
      {
        type:"EDITEDPROCESSINGARRAY",
        payload:copiedObject
      }
    )
    alert(`Item is Added SuccessFully  Product: ${props.params.data.Product}  Size : ${props.params.data.Size}`);
  };
 const OnRemoveFun=()=>{
  console.log("In the Remove Function")
  const copiedObject = { ...  props.params.data };
  delete copiedObject["shouldShowButton"]
  console.log(copiedObject)
  props.params.data.shouldShowButton=true
  let s=props.params.data
  dispatch(
    {
      type:"REMOVEITEMS",
      payload:copiedObject
    }
  )
  

 }
  return (
    <span>
     <div className='agButton'>
        {props.params.data.shouldShowButton === true ?
      <button className='AdBtn' style={{backgroundColor: "rgb(68, 185, 130)",width: "76%"
    }} onClick={() => buttonClicked()}>Add Item </button> :
      <button style={{backgroundColor:"rgb(251, 170, 19)"}} onClick={() => OnRemoveFun()}>Remove Item </button> }
      </div>
    </span>
  );
};



export default AggridBtn