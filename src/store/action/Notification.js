import React from 'react';

function Notification({ type, message }) {
    console.log(type,message,"lklk")
   
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

export default Notification;
