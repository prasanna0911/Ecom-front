import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Typography } from "@mui/material";
import { ApiServices } from "../../api/api";
import { Col, Row } from "react-bootstrap";

const PaymentInfo = () => {
  const [myAddresses, setMyAddresses] = useState([]);
  const getBillingAddresses = async () => {
    ApiServices.UserData().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setMyAddresses(res.userData?.addresses);
      }
    });
  };

  useEffect(() => {
    getBillingAddresses();
  }, []);
  return (
    <div>
      <Typography variant="h5" className="mb-1">
        Payment selection
      </Typography>
      <Typography variant="subtitle1" className="mb-4">
        Please select and enter your billing information.
      </Typography>

      <FormControl className="w-100">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          //   row
          className="w-100"
        >
          <FormControlLabel
            value="cash"
            control={<Radio size="small" />}
            className="border rounded-4 p-3 d-flex align-items-start gap-3 m-0 mb-2"
            label={
              <div className="mb-0 mb-lg-0">
                <span className="d-block mb-1 text-dark fw-bold">
                  Cash on Delivery
                </span>
                <span className="d-block mb-1">
                  Pay with cash when your order is delivered.
                </span>
              </div>
            }
          />
          <FormControlLabel
            value="online"
            control={<Radio size="small" />}
            className="border rounded-4 p-3 d-flex align-items-start gap-3 m-0 mb-2"
            label={
              <div className="mb-0 mb-lg-0">
                <span className="d-block mb-1 text-dark fw-bold">
                  Credit / Debit Card
                </span>
                <span className="d-block mb-1">
                  Safe money transfer using your bank accou k account. We
                  support Mastercard tercard, Visa, Discover and Stripe.
                </span>
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentInfo;
