import React, { useEffect } from "react";
import OrderSuccess from "./OrderSuccess";
import { useLocation } from "react-router-dom";
import { ApiServices } from "../../api/api";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");
  const order_id = queryParams.get("order_id");

  useEffect(() => {
    console.log("session_id", session_id);
    console.log("order_id", order_id);
    if (session_id && order_id) {
      var json = {
        session_id: session_id,
        order_id: order_id,
      };
      ApiServices.PayCheck(json).then((res) => {
        console.log("res", res);
      });
    }
  }, [session_id, order_id]);
  return (
    <div>
      <OrderSuccess />
    </div>
  );
};

export default PaymentSuccess;
