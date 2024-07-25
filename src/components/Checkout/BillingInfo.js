import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const BillingInfo = ({ handleNext, billingData, setBillingData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    if (billingData) {
      setFirstName(billingData.first_name);
      setLastName(billingData.last_name);
      setNewAddressLine1(billingData.address_line1);
      setNewAddressLine2(billingData.address_line2);
      setNewCity(billingData.city);
      setNewState(billingData.state);
      setNewZipCode(billingData.zip_code);
      setNewEmail(billingData.email);
      setNewPhoneNumber(billingData.mobile_number);
    }
  }, []);

  const handleSubmit = () => {
    const billing_info = {
      first_name: firstName,
      last_name: lastName,
      address_line1: newAddressLine1,
      address_line2: newAddressLine2,
      city: newCity,
      state: newState,
      zip_code: newZipCode,
      email: newEmail,
      mobile_number: newPhoneNumber,
    };
    console.log("billing_info", billing_info);
    setBillingData(billing_info);
    handleNext();
  };

  return (
    <div>
      <Typography variant="h5" className="mb-2">
        Billing Info
      </Typography>
      <Row>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              First name
            </Typography>
          </FormHelperText>
          <TextField
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              Last name
            </Typography>
          </FormHelperText>
          <TextField
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              Mobile number
            </Typography>
          </FormHelperText>
          <TextField
            style={{ width: "100%" }}
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="Enter your mobile number"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </Col>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              Email (Optional)
            </Typography>
          </FormHelperText>
          <TextField
            style={{ width: "100%" }}
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="Enter your email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Col>
      </Row>
      <FormHelperText>
        <Typography variant="subtitle1" gutterBottom>
          Address Line 1
        </Typography>
      </FormHelperText>
      <TextField
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter address Line 1"
        value={newAddressLine1}
        onChange={(e) => setNewAddressLine1(e.target.value)}
      />
      <FormHelperText>
        <Typography variant="subtitle1" gutterBottom>
          Address Line 2 (Optional)
        </Typography>
      </FormHelperText>
      <TextField
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter address Line 2"
        value={newAddressLine2}
        onChange={(e) => setNewAddressLine2(e.target.value)}
      />
      <Row>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              City
            </Typography>
          </FormHelperText>
          <TextField
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="Enter your City"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
        </Col>
        <Col md="6" sm="6" xs="12">
          <FormHelperText>
            <Typography variant="subtitle1" gutterBottom>
              ZipCode
            </Typography>
          </FormHelperText>
          <TextField
            id="fullWidth"
            variant="outlined"
            className="w-100 mb-2"
            placeholder="enter your ZipCode"
            value={newZipCode}
            onChange={(e) => setNewZipCode(e.target.value)}
          />
        </Col>
      </Row>

      <FormHelperText>
        <Typography variant="subtitle1" gutterBottom>
          State
        </Typography>
      </FormHelperText>
      <TextField
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter your State"
        value={newState}
        onChange={(e) => setNewState(e.target.value)}
      />
      <div className="d-flex justify-content-end w-100 mt-3">
        {/* <Button variant="outlined">back</Button> */}
        <Button
          variant="contained"
          disabled={
            !firstName ||
            !lastName ||
            !newAddressLine1 ||
            !newCity ||
            !newState ||
            !newZipCode ||
            !newPhoneNumber
          }
          onClick={() => handleSubmit()}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default BillingInfo;
