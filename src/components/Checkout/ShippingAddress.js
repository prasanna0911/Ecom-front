import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Typography } from "@mui/material";
import { ApiServices } from "../../api/api";
import { Col, Row } from "react-bootstrap";

const ShippingAddress = () => {
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
        Shipping Information
      </Typography>
      <Typography variant="subtitle1" className="mb-4">
        Fill the form below in order to send you the orders invoice.
      </Typography>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="subtitle1">Saved addresses</Typography>
        <Button variant="contained">Add new address</Button>
      </div>
      <FormControl className="w-100">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          //   row
          className="w-100"
        >
          {myAddresses?.map((address, index) => (
            <FormControlLabel
              value={address._id}
              control={<Radio size="small" />}
              className="border rounded-4 p-3 d-flex align-items-start gap-3 m-0 mb-2"
              label={
                <div className="mb-0 mb-lg-0">
                  <span className="d-block mb-1 text-dark fw-bold">
                    {address.name}
                  </span>
                  <span className="d-block mb-1">{address.address_line1},</span>
                  {address.address_line2 && (
                    <span className="d-block mb-1">
                      {address.address_line2},
                    </span>
                  )}
                  <span className="d-block mb-1">
                    {address.city} {address.zip_code},
                  </span>
                  <span className="d-block mb-4">{address.state}</span>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ShippingAddress;
