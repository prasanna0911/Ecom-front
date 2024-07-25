import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Typography } from "@mui/material";
import { ApiServices } from "../../api/api";
import { Col, Row } from "react-bootstrap";

const ShippingAddress = ({
  handleNext,
  handleBack,
  shippingAddressData,
  setShippingAddressData,
}) => {
  const [myAddresses, setMyAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
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

  const handleSubmit = () => {
    if (selectedAddress) {
      const sel_address = myAddresses.find(
        (add) => add._id === selectedAddress
      );
      setShippingAddressData(sel_address);
      handleNext();
    }
  };

  useEffect(() => {
    if (shippingAddressData) {
      setSelectedAddress(shippingAddressData._id);
    }
  }, []);

  console.log("selectedAddress", selectedAddress);
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
          name="radio-buttons-group"
          //   row
          value={selectedAddress}
          className="w-100"
          onChange={(e) => setSelectedAddress(e.target.value)}
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
      <div className="d-flex justify-content-between w-100 mt-3">
        <Button variant="outlined" onClick={() => handleBack()}>
          back
        </Button>
        <Button
          variant="contained"
          disabled={!selectedAddress}
          onClick={() => handleSubmit()}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddress;
