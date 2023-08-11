import React from "react";
import paymentdone from "../assest/paymentdone.gif";
const Success = () => {
  return (
    <div className="md:mt-9">
      <div className="flex items-center justify-center m-auto h-80 w-80 bg-white object-contain">
        <img src={paymentdone} alt="noImg" className="w-full h-full" />
      </div>
      <p>Payment Success</p>
    </div>
  );
};

export default Success;
