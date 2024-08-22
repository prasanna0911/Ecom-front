// import node module libraries
import React, { useEffect, useState } from "react";
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
import { ApiServices } from "../../api/api";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const ShippingAddress = () => {
  const { MobileScreen } = useMyContext();
  const [myAddresses, setMyAddresses] = useState([]);

  //new address
  const [modalShow, setModalShow] = useState(false);
  const [newAddressDialog, setNewAddressDialog] = useState(false);
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  //edit address
  const [addressDialog, setAddressDialog] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editPrimary, setEditPrimary] = useState(false);

  const [addressDelete, setAddressDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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

  const handleUpdateDialog = (address) => {
    setSelectedAddressId(address._id);
    setAddressName(address.name);
    setAddressLine1(address.address_line1);
    setAddressLine2(address.address_line2);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zip_code);
    setEmail(address.email);
    setPhoneNumber(address.phone);
    setEditPrimary(address.primary);
    setAddressDialog(true);
  };

  const handleDeleteDialog = (address) => {
    setDeleteId(address._id);
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

  const handleAddressCreate = async () => {
    console.log("newAddressName", newAddressName);
    console.log("newAddressLine1", newAddressLine1);
    console.log("newAddressLine2", newAddressLine2);
    console.log("newCity", newCity);
    console.log("newState", newState);
    console.log("newZipCode", newZipCode);
    console.log("newEmail", newEmail);
    console.log("newPhoneNumber", newPhoneNumber);
    console.log("isPrimary", isPrimary);

    var json = {
      Name: newAddressName,
      AddressLine1: newAddressLine1,
      AddressLine2: newAddressLine2,
      City: newCity,
      State: newState,
      ZipCode: newZipCode,
      Email: newEmail,
      Phone: newPhoneNumber,
      Primary: isPrimary,
    };
    ApiServices.AddShippingAddress(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setModalShow(false);
        getBillingAddresses();
      }
    });
  };

  const handleUpdateAddress = async () => {
    var json = {
      Id: selectedAddressId,
      Name: addressName,
      AddressLine1: addressLine1,
      AddressLine2: addressLine2,
      City: city,
      State: state,
      ZipCode: zipCode,
      Email: email,
      Phone: phoneNumber,
      Primary: editPrimary,
    };
    console.log("json", json);
    ApiServices.EditShippingAddress(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getBillingAddresses();
        setAddressDialog(false);
      }
    });
  };

  const handleAddressDelete = async () => {
    var json = {
      Id: deleteId,
    };
    ApiServices.DeleteShippingAddress(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setAddressDelete(false);
        getBillingAddresses();
      }
    });
  };

  const handleAddPrimaryAddress = async (id) => {
    var json = {
      Id: id,
    };
    console.log("json", json);
    ApiServices.SetPrimaryAddress(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getBillingAddresses();
      }
    });
  };

  const handleRemovePrimaryAddress = async (id) => {
    var json = {
      Id: id,
    };
    console.log("json", json);
    ApiServices.RemovePrimaryAddress(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getBillingAddresses();
      }
    });
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
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                <h4 className="mb-0">Billing address</h4>{" "}
                <Button
                  variant="contained"
                  //   className="triangle-button"
                  onClick={() => setNewAddressDialog(true)}
                  startIcon={<AddIcon />}
                >
                  Add New Address
                </Button>
              </div>
            }
          />
          <CardContent className="p-0">
            {/* <Row className="align-items-center"> */}
            {myAddresses?.map((address, index) => (
              <Row
                className="p-4"
                style={{
                  borderBottom:
                    index !== myAddresses?.length - 1
                      ? "1px solid #ddd"
                      : "none",
                }}
              >
                <span className="d-block mb-2 text-dark fw-bold">
                  {address.name}
                </span>
                <Col lg={6} md={6} sm={12} xs={12} className="mb-lg-0">
                  <div className="mb-2 mb-lg-0">
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
                    <span className="d-block mb-1">{address.state}</span>
                  </div>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className="d-flex justify-content-start justify-content-md-end"
                >
                  <div className="mb-2">
                    <p className="mb-1">
                      {/* E-mail: <Link href="#">valarietarrant@dashui.com</Link> */}
                      {address.email}
                    </p>
                    <p className="mb-0">{address.phone}</p>
                  </div>
                </Col>
                <Col
                  lg={12}
                  md={12}
                  xs={12}
                  className="py-2 d-flex gap-2 flex-wrap"
                >
                  {address.primary ? (
                    <Button
                      onClick={() => handleRemovePrimaryAddress(address._id)}
                      variant="outlined"
                      startIcon={<CloseIcon />}
                    >
                      Remove as Default
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleAddPrimaryAddress(address._id)}
                      startIcon={<DoneAllIcon />}
                    >
                      Set As Default
                    </Button>
                  )}
                  <Button
                    color="warning"
                    onClick={() => handleUpdateDialog(address)}
                    startIcon={<BorderColorIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteDialog(address)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Col>
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
                <Button
                  variant="contained"
                  onClick={() => handleAddressCreate()}
                >
                  Create
                </Button>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={editPrimary}
                      onChange={() => setEditPrimary((prev) => !prev)}
                    />
                  }
                  label="Set as primary address"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => handleUpdateAddress()}
                >
                  Update
                </Button>
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
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleAddressDelete()}
                >
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
