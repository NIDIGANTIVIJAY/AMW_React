import React  from "react";


const InputFieldComp=(props)=>{
  console.log(props.data)
  const onChangeFun=(e)=>{
    console.log(e)
  }
    return(<>
    
       <input type="number" onChange={(e)=>{onChangeFun(e)}}/>
    </>)

}

export default InputFieldComp