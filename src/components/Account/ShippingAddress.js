// import node module libraries
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Modal, Form } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  FormHelperText,
  TextField,
  Dialog,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useMyContext } from "../../Context/MyContext";
import AccountHeader from "./AccountHeader";

// import widget as custom components

const ShippingAddress = () => {
  const { MobileScreen } = useMyContext();

  const [modalShow, setModalShow] = useState(false);
  const [newAddressDialog, setNewAddressDialog] = useState(false);
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const [addressDialog, setAddressDialog] = useState(false);
  const [addressName, setAddressName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [addressDelete, setAddressDelete] = useState(false);

  const handleUpdateDialog = (address) => {
    setAddressName(address.name);
    setAddressLine1(address.address_line1);
    setAddressLine2(address.address_line2);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zip_code);
    setAddressDialog(true);
  };

  const handleDeleteDialog = (address) => {
    setAddressDelete(true);
  };

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "US", label: "US" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
  ];

  const cityOptions = [
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
  ];

  const MyAddresses = [
    {
      name: "Home",
      address_line1: "3812 Orchard Street",
      address_line2: "Bloomington",
      city: "Minnesota",
      state: "United states",
      zip_code: "55431",
      primary: true,
      email: "valarietarrant@dashui.com",
      phone: "321-654-0987",
    },
    {
      name: "Office",
      address_line1: "3853 Coal Road",
      address_line2: "Tannersville",
      city: "Pennsylvania",
      state: "United states ",
      zip_code: "18372",
      primary: false,
      email: "myofficemail@dashui.com",
      phone: "321-654-0999",
    },
  ];

  const NewBillingAddressModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="mb-1" id="billingAddressModalLabel">
              Billing Address
            </h4>
            <p className="mb-0">
              Please provide the billing address with the credit card you ve
              provided.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  placeholder="Select Country"
                  options={countryOptions}
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="addressOne">
                <Form.Label>Address line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123 Ocean Ave"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="addressTwo">
                <Form.Label>Address line 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123 Ocean Ave"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="Select City" options={cityOptions} />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Gujarat" required />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group controlId="zipCode">
                <Form.Label>Zip/Postal Code</Form.Label>
                <Form.Control type="text" placeholder="000000" required />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Check type="checkbox" id="customCheckAddress">
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>
                  Make this my default payment method.
                </Form.Check.Label>
              </Form.Check>
            </Col>
            <Col xs={12}>
              {/* <Button type="submit" className="d-grid">
                Save Address
              </Button> */}
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div style={{ padding: MobileScreen ? "none" : "20px" }}>
      {!MobileScreen && (
        <AccountHeader head="Shipping address" breadcrumb="Shipping address" />
      )}
      <Col xs={12} className="mb-6">
        <Card>
          <CardHeader
            className="border-bottom"
            title={
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Billing address</h4>{" "}
                <Button
                  variant="contained"
                  //   className="triangle-button"
                  onClick={() => setNewAddressDialog(true)}
                >
                  Add New Address
                </Button>
              </div>
            }
          />
          <CardContent>
            {/* <Row className="align-items-center"> */}
            {MyAddresses.map((address, index) => (
              <Row
                className="mt-4 p-2"
                style={{
                  borderBottom:
                    index !== MyAddresses.length - 1
                      ? "1px solid #ddd"
                      : "none",
                }}
              >
                <Col lg={6} md={12} xs={12} className="mb-4 mb-lg-0">
                  <div className="mb-3 mb-lg-0">
                    <span className="d-block mb-3 text-dark fw-bold">
                      {address.name}
                    </span>
                    <span className="d-block mb-1">
                      {address.address_line1},
                    </span>
                    {address.address_line2 && (
                      <span className="d-block mb-1">
                        {address.address_line2},
                      </span>
                    )}
                    <span className="d-block mb-1">
                      {address.city} {address.zip_code},
                    </span>
                    <span className="d-block mb-4">{address.state}</span>
                    {address.primary ? (
                      <Button>Remove as Default</Button>
                    ) : (
                      <Button variant="contained">Set As Default</Button>
                    )}
                    <Button
                      color="warning"
                      onClick={() => handleUpdateDialog(address)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDeleteDialog(address)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
                <Col
                  lg={6}
                  md={12}
                  xs={12}
                  className="d-flex justify-content-lg-end"
                >
                  <div className="mb-2">
                    <p className="mb-1">
                      {/* E-mail: <Link href="#">valarietarrant@dashui.com</Link> */}
                      {address.email}
                    </p>
                    <p>{address.phone}</p>
                  </div>
                </Col>
                {/* <Col xs={12}>
                  <hr className="my-6" />
                </Col> */}
              </Row>
            ))}
            <NewBillingAddressModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <Dialog
              open={newAddressDialog}
              onClose={() => setNewAddressDialog(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <Typography variant="h5">Add new address</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    name
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your address name"
                  value={newAddressName}
                  onChange={(e) => setNewAddressName(e.target.value)}
                />
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPrimary}
                      onChange={() => setIsPrimary((prev) => !prev)}
                    />
                  }
                  label="Set as primary address"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained">Create</Button>
                <Button onClick={() => setNewAddressDialog(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={addressDialog}
              onClose={() => setAddressDialog(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <Typography variant="h5">Edit address</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    name
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your address name"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
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
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
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
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
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
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained">Create</Button>
                <Button onClick={() => setAddressDialog(false)}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={addressDelete}
              onClose={() => setAddressDelete(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Confirm deletion?</Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1">
                  Are you sure you want to delete this address ?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="error">
                  Delete
                </Button>
                <Button onClick={() => setAddressDelete(false)}>Cancel</Button>
              </DialogActions>
            </Dialog>
            {/* </Row> */}
          </CardContent>
        </Card>
      </Col>
    </div>
  );
};

export default ShippingAddress;
