import { FormHelperText, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const BillingInfo = () => {
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
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
            value={newAddressName}
            onChange={(e) => setNewAddressName(e.target.value)}
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
            value={newAddressName}
            onChange={(e) => setNewAddressName(e.target.value)}
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
              Email
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
          Address Line1
        </Typography>
      </FormHelperText>
      <TextField
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter address Line1"
        value={newAddressLine1}
        onChange={(e) => setNewAddressLine1(e.target.value)}
      />
      <FormHelperText>
        <Typography variant="subtitle1" gutterBottom>
          Address Line2
        </Typography>
      </FormHelperText>
      <TextField
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter address Line2"
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
        style={{ width: "100%" }}
        id="fullWidth"
        variant="outlined"
        className="w-100 mb-2"
        placeholder="Enter your State"
        value={newState}
        onChange={(e) => setNewState(e.target.value)}
      />
    </div>
  );
};

export default BillingInfo;
