import React from "react";
import paymentcancel from "../assest/paymentcancel.gif";
const Cancel = () => {
  return (
    <div className="md:mt-9">
      <div className="flex items-center justify-center m-auto h-80 w-80 bg-white object-contain">
        <img src={paymentcancel} alt="noImg" className="w-full h-full" />
      </div>
      <p>Payment Failed</p>
    </div>
  );
};

export default Cancel;
