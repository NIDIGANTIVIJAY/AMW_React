import './App.css';
import InvoiceGeneration from './component/InvoiceGeneration';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Component from './component';
import Expenses from './component/Expenses';
import Accounts from './component/Accounts';
import Production from './component/Production';
import ProcessInvoice from './component/InvoiceGeneration/processInvoice';
import GenearatedInvoice from './component/InvoiceGeneration/GeneratedInvoice';
import Dashboard from './component/Dashboard';
import InventoryComp from './component/Production/InventoryComp';
import DailyProd from './component/Production/DailyProdComp';
import DispatchComp from './component/Production/DispatchComp';
import InOutComponent from './component/Production/INOUTComponent';
import Notification from '../../store/action/Notification';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderComp from "../../store/action/LoaderComp"
import { Oval } from 'react-loader-spinner'
import LoaderModal from './component/LoaderModal';
function Admin() {
    const type=useSelector((state)=>state.Common.Notitype)
    const message=useSelector((state)=>state.Common.NotiMessg)
   const showLoader=useSelector((state)=>state.Common.showLoader)
     console.log(showLoader,"SHOWLOADER")
   useEffect(()=>{

   },[message,type,showLoader])
   

  return (
   <>
  {/* {showLoader && 
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

/>  } */}
      
      <Routes>
        <Route path="/" element={<Component />} >
        <Route path="invoice" element={<InvoiceGeneration />} />
        <Route path="invoice/process" element={<ProcessInvoice />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="production" element={<Production />} />
        <Route path='production/invetory' element={<InventoryComp/>}/>
        <Route path='production/dailyprod' element={<DailyProd/>}/>
        <Route path='production/dispatchprod' element={<DispatchComp/>}/>
        <Route path='production/inOutMat' element={<InOutComponent/>}/>
        <Route path="accounts" element={<Accounts />} />
        <Route path='invoice/generatedinvoice' element={<GenearatedInvoice/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
         </Route>

         
         
      </Routes>
{/*       
      <ToastContainer />
      {showLoader && <LoaderModal showLoader={showLoader} />} */}

        
      

      <Notification type={type} message={message} />
      </>
   


  );
}

export default Admin;
