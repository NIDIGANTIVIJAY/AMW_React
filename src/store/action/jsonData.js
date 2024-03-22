import axios from "axios"

const JsonData=(onSuccess,onError)=>(dispatch)=>{
    const url =process.env.REACT_APP_SERVICE_ID
    axios.get(url+"jsonData").then((res)=>{
       
        dispatch({
            type:"JSONDATA",
            payload:res?.data
        })
         onSuccess(res?.data)

      })
}
export default JsonData