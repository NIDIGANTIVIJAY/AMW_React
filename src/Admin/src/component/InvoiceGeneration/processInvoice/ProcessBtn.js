import axios from 'axios';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axiosInstance from '../../axiosconfig';
const ProcessBtn =(props) => {
   const dispatch=useDispatch()
  const url=process.env.REACT_APP_SERVICE_ID

   const processData=useSelector((state)=>state.Common.processingArray
    )


  const buttonsave = () => {
      let obj=props.data
      obj["Status"]="Completed" 
      console.log(obj)

  
        dispatch({
          type:"SHOWMOADALCOMPBOOL",
          payload:true
        })


       dispatch({
          type:"AMOUNTDATA",
          payload:obj
        })

        
     
  };

  const onClickEditFun=()=>{
       dispatch({
        type:"SHOWMODAL",
        payload:true
       })   

       dispatch({
        type:"MODALDATA",
        payload:props.data
       })
  }
  const onClickRemove =()=>{
    console.log(props)
    let payload={
        "_id":""
    };
    payload["_id"]=props.data._id
    console.log(payload)
    axiosInstance.post("removequote",payload).then((res)=>{
        console.log(res)
        props.api.setRowData(res.data)
    })
  }

  return (
    <span>
     <div className='agButton'>
      <button className="AdBtn" onClick={() => onClickRemove()}>Remove </button>
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      <button className="AdBtn" onClick={() => onClickEditFun()}>Edit </button>
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      <button className="AdBtn" onClick={() => buttonsave()}>Confirm </button>
    </div>
    </span>
  );
};



export default ProcessBtn