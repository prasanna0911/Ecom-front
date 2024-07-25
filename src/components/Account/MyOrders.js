import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Col, Row } from "react-bootstrap";
import AccountHeader from "./AccountHeader";
import { useMyContext } from "../../Context/MyContext";
import { ApiServices } from "../../api/api";

const steps = [
  "Order Received",
  "Order Placed",
  "Out for delivery",
  "Delivered",
];

const MyOrders = () => {
  const [menItems, setMenItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { MobileScreen } = useMyContext();

  const handleViewOrder = (order) => {
    if (order) {
      setSelectedOrder(order);
      setOrderOpen(true);
    }
  };

  const handleClose = () => {
    setOrderOpen(false);
    setSelectedOrder({});
  };

  const getMyOrders = () => {
    ApiServices.GetMyOrders().then((res) => {
      console.log("res orders", res);
      if (res.response_code === 200) {
        setMyOrders(res.my_orders);
      }
    });
  };

  useEffect(() => {
    getMyOrders();
    axios
      .get("https://shema-backend.vercel.app/api/items")
      .then((res) => {
        setMenItems(res.data.filter((item) => item.category === "men"));
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  console.log("menItems", menItems);
  return (
    <div
      className="d-grid align-self-center"
      style={{ padding: MobileScreen ? "none" : "20px" }}
    >
      {!MobileScreen && (
        <AccountHeader head="My Orders" breadcrumb="My Orders" />
      )}
      {MobileScreen && <h3 className="mb-4">My Orders</h3>}

      {myOrders?.map((item) => (
        <Card
          key={item._id} // Ensure each Card has a unique key
          className="mb-3 py-2 px-1 d-flex justify-content-between align-items-start flex-wrap"
          // data-aos="fade-left"
        >
          <CardContent className="d-flex gap-4 flex-wrap">
            <img
              src={`${item.product_info?.primaryImage[0]?.URL}`}
              alt="item"
              width={150}
              className="product__img"
            />
            <div style={{ maxWidth: "400px" }}>
              <h4>{item.product_info?.name}</h4>
              <p className="mb-1">{item.product_info?.description}</p>
              <p className="mb-1">
                Size: {item.product_info?.size[0]} color:{" "}
                {item.product_info?.color}
              </p>
              <p className="mb-1">Quantity: {item.product_info?.count} </p>
              <p className="mb-1">Total: ${item.total_amount}</p>
              <Chip
                variant="contained"
                color={item.payment_status === "paid" ? "success" : "warning"}
                label={item.payment_status}
              />
            </div>
          </CardContent>
          <CardContent>
            <Button variant="outlined" onClick={() => handleViewOrder(item)}>
              View Order
            </Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={orderOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h5">Order id : {selectedOrder?._id}</Typography>
        </DialogTitle>

        <DialogContent>
          <Row className="w-100 d-flex align-items-center mb-4">
            {" "}
            <Col
              xl={6}
              md={6}
              sm={12}
              className="d-flex justify-content-center"
            >
              {selectedOrder?.product_info?.primaryImage?.[0]?.URL && (
                <img
                  src={selectedOrder?.product_info?.primaryImage?.[0]?.URL}
                  alt={selectedOrder?.product_info?.name}
                  width={100}
                  className="product__img"
                />
              )}
            </Col>
            <Col xl={6} md={6} sm={12}>
              <div style={{ maxWidth: "400px" }}>
                <h3>{selectedOrder?.product_info?.name}</h3>
                <h5 className="mb-1">
                  {selectedOrder?.product_info?.description}
                </h5>
                <p className="mb-1">
                  Size: {selectedOrder?.product_info?.size?.[0]} color:{" "}
                  {selectedOrder?.product_info?.color}
                </p>
                <p className="mb-1">
                  Quantity: {selectedOrder?.product_info?.count}{" "}
                </p>
                <p className="mb-1">Total: ${selectedOrder?.total_amount}</p>
                <Chip
                  variant="contained"
                  color={
                    selectedOrder?.payment_status === "paid"
                      ? "success"
                      : "warning"
                  }
                  label={selectedOrder?.payment_status}
                />
              </div>
            </Col>
          </Row>

          <div>
            <Row className="mb-2">
              <Col xl={6} md={6} sm={12}>
                <p className="mb-1">Shipped date:</p>
              </Col>
              <Col xl={6} md={6} sm={12}>
                <p className="mb-1"> 20/3/2024</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xl={6} md={6} sm={12}>
                <p className="mb-1">Estimated delivery time</p>
              </Col>
              <Col xl={6} md={6} sm={12}>
                <p className="mb-1">20/3/2024 12.30PM - 20/3/2024 12.30PM</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xl={6} md={6} sm={12}>
                {" "}
                <p className="mb-1">Shipment address</p>
              </Col>
              <Col xl={6} md={6} sm={12}>
                <p className="mb-1">
                  {selectedOrder?.shipping_address?.address_line1}, <br />
                  {selectedOrder?.shipping_address?.address_line2 &&
                    selectedOrder?.shipping_address?.address_line2 + ","}
                  <br />
                  {selectedOrder?.shipping_address?.city} -{" "}
                  {selectedOrder?.shipping_address?.zip_code},{" "}
                  {selectedOrder?.shipping_address?.state} <br />
                  Phone: {selectedOrder?.shipping_address?.phone}
                </p>
              </Col>
            </Row>
          </div>

          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={2} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} color="success">
                  <StepLabel>{label}</StepLabel>
                  <p className="text-center">24/06/2025</p>
                </Step>
              ))}
            </Stepper>
          </Box>
          {/* <Box sx={{ width: '100%' }}>
      <Stepper activeStep={3} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} />}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography className="text-center">{step.date}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyOrders;
