import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const InputCompJS = (props) => {
    let enableRead = props.enable
    let arr1 = []
    const [payload1, setpayload1] = useState([])
    const pay = useSelector((state) => state.Common.payloadData)
    const dispatch = useDispatch()
    const [monthData, setMonthData] = useState()

   



    const onChangeFun = (e) => {

        console.log("KK", pay, props)

        if (pay.some((i) => i?.ProductUniqId
            === props.params.data.ProductUniqId
        )) {



            console.log("KKIGH", pay.some((i) => i?.ProductUniqId
                === props.params.data.ProductUniqId))
            if (pay.some((i) => i?.ProductUniqId
                === props.params.data.ProductUniqId
                && i.MonthDates === props.params.column.colId)) {




                let obj = {}
                obj["ProductUniqId"] = props.params.data.ProductUniqId
                let s = props.params.colDef.field.split("/")
                console.log(s)
                obj["Month"] = s[1]


                obj["MonthDates"] = props.params.colDef.field


                obj["todayProd"] = e.target.value
                obj["year"] = s[2]

                console.log(obj, "PPs")

                dispatch({
                    type: "UPDATEPAYLOAD",
                    payload: obj
                })



            }

            else {
                console.log("in Create")


                if (props.lastThreeDaysFormatted[0] === props.params.column.colId
                ) {
                    let obj = {}
                    let arr = []
                    obj["ProductUniqId"] = props.params.data.ProductUniqId

                    let s = props.params.colDef.field.split("/")
                    console.log(s)
                    obj["Month"] = s[1]
                    obj["MonthDates"] = props.params.colDef.field
                    obj["todayProd"] = e.target.value
                    obj["year"] = s[2]
                    arr.push(obj)
                    dispatch({
                        type: "PAYLOAD",
                        payload: arr
                    })
                }
                else if (props.lastThreeDaysFormatted[1] === props.params.column.colId) {



                    let obj = {}
                    let arr = []
                    obj["ProductUniqId"] = props.params.data.ProductUniqId

                    let s = props.params.colDef.field.split("/")
                    console.log(s)
                    obj["Month"] = s[1]
                    obj["MonthDates"] = props.params.colDef.field
                    obj["todayProd"] = e.target.value
                    obj["year"] = s[2]
                    arr.push(obj)
                    dispatch({
                        type: "PAYLOAD",
                        payload: arr
                    })
                }
                else if (props.lastThreeDaysFormatted[2] === props.params.column.colId) {




                    let obj = {}
                    let arr = []
                    obj["ProductUniqId"] = props.params.data.ProductUniqId

                    let s = props.params.colDef.field.split("/")
                    console.log(s)
                    obj["Month"] = s[1]
                    obj["MonthDates"] = props.params.colDef.field
                    obj["todayProd"] = e.target.value
                    obj["year"] = s[2]
                    arr.push(obj)
                    dispatch({
                        type: "PAYLOAD",
                        payload: arr
                    })
                } else {
                    let obj = {}
                    let arr = []
                    obj["ProductUniqId"] = props.params.data.ProductUniqId

                    let s = props.params.colDef.field.split("/")
                    console.log(s)
                    obj["Month"] = s[1]
                    obj["MonthDates"] = props.params.colDef.field
                    obj["todayProd"] = e.target.value
                    obj["year"] = s[2]
                    arr.push(obj)
                    dispatch({
                        type: "PAYLOAD",
                        payload: arr
                    })

                }

            }



        } else {

            let obj = {}
            let arr = []
            obj["ProductUniqId"] = props.params.data.ProductUniqId

            let s = props.params.colDef.field.split("/")
            obj["Month"] = s[1]
            obj["MonthDates"] = props.params.colDef.field
            obj["todayProd"] = e.target.value
            obj["year"] = s[2]
            arr.push(obj)
            dispatch({
                type: "PAYLOAD",
                payload: arr
            })

        }
    }
    return (<>
        

       {props.params.data[ props.params.colDef.headerName] !== undefined ?
        <input type="number" readOnly={!enableRead} defaultValue={props.params.data[ props.params.colDef.headerName] } onChange={(e) => { onChangeFun(e) }} />
       :
       <input type="number" readOnly={!enableRead} onChange={(e) => { onChangeFun(e) }} />

    
    }

    </>)

}

export default InputCompJS