import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Col, Row } from "react-bootstrap";
import AccountHeader from "./AccountHeader";
import { useMyContext } from "../../Context/MyContext";
import { ApiServices } from "../../api/api";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";
import "./Account.css";

const steps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return "Your order has been placed.";
    case 1:
      return "Your order has been shipped.";
    case 2:
      return "Your order is out for delivery.";
    case 3:
      return "Your order has been delivered.";
    default:
      return "Unknown step";
  }
};

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const navigate = useNavigate();
  const { MobileScreen } = useMyContext();

  const handleViewOrder = (e, order) => {
    e.stopPropagation();
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
    window.scrollTo(0, 0);
  }, []);

  const cancelOrder = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.CancellMyOrder(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setOrderOpen(false);
        getMyOrders();
      }
    });
  };

  const handleRatingsRoute = (e, id) => {
    e.stopPropagation();
    navigate(`/ratingsandreviews/${id}`);
  };

  console.log(
    "REACT_APP_API_BASE_URL in order:",
    process.env.REACT_APP_API_BASE_URL
  );
  const activeStep = 2;
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
          style={{ cursor: "pointer" }}
          key={item._id}
          className="mb-3 py-2 px-1 d-flex justify-content-between align-items-start flex-wrap"
          // data-aos="fade-left"
          onClick={() => navigate(`/order/${item._id}`)}
        >
          <CardContent className="d-flex gap-4 align-items-center">
            <img
              src={`${item.product_info?.primaryImage[0]?.URL}`}
              alt="item"
              width={100}
              className="product__img"
            />
            <div style={{ maxWidth: "400px" }}>
              <h5 style={{ fontSize: "16px" }}>{item.product_info?.name}</h5>
              <h6 className="mb-1">{item.product_info?.description}</h6>
              <p className="mb-1" style={{ fontSize: "small" }}>
                Size: {item.product_info?.size[0]} color:{" "}
                {item.product_info?.color}
              </p>
              <p className="mb-1" style={{ fontSize: "small" }}>
                Qty: {item.product_info?.count}{" "}
              </p>
              <p className="mb-1 fw-bold">Total: ${item.total_amount}</p>
            </div>
          </CardContent>
          <CardContent className="d-flex flex-column align-items-end gap-2">
            {/* {item?.delivery_status} */}
            {item?.delivery_status === "cancelled" && (
              <h6 className="mb-1 d-flex gap-1 align-items-center">
                <FiberManualRecordIcon fontSize="small" color="error" />
                Cancelled on{" "}
                {new Date(item?.cencelled_date).toString().slice(4, 15)}
              </h6>
            )}
            {item?.delivery_status === "order confirmed" && (
              <h6 className="mb-1 d-flex gap-1 align-items-center">
                <FiberManualRecordIcon fontSize="small" color="warning" />
                Ordered on {new Date(item?.order_date).toString().slice(4, 15)}
              </h6>
            )}
            {item?.delivery_status === "shipped" && (
              <h6 className="mb-1 d-flex gap-1 align-items-center">
                <FiberManualRecordIcon fontSize="small" color="warning" />
                Shipped on{" "}
                {new Date(item?.shipment_date).toString().slice(4, 15)}
              </h6>
            )}
            {item?.delivery_status === "delivered" && (
              <h6 className="mb-1 d-flex gap-1 align-items-center">
                <FiberManualRecordIcon fontSize="small" color="success" />
                Delivered on{" "}
                {new Date(item?.delivery_date).toString().slice(4, 15)}
              </h6>
            )}
            {item.delivery_status === "delivered" ? (
              <Button
                variant="contained"
                startIcon={<StarIcon />}
                onClick={(e) => handleRatingsRoute(e, item.product_info._id)}
              >
                Rate & review this product
              </Button>
            ) : item.delivery_status === "cancelled" ? (
              <div></div>
            ) : (
              <Typography variant="body1" color="green">
                Estimated delivery in {new Date().toString().slice(0, 15)}
              </Typography>
            )}
            {/* <Chip
              variant="contained"
              color={item.payment_status === "paid" ? "success" : "warning"}
              label={item.payment_status}
            /> */}

            {/* <Button
              variant="outlined"
              onClick={(e) => handleViewOrder(e, item)}
            >
              View Order
            </Button> */}
          </CardContent>
        </Card>
      ))}

      <Dialog open={orderOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="d-flex justify-content-between flex-wrap">
          <Typography variant="h6">Order id : {selectedOrder?._id}</Typography>
        </DialogTitle>

        <DialogContent>
          <div className="d-flex gap-3">
            <Typography variant="body1">
              Order date :{" "}
              {new Date(selectedOrder?.order_date).toString().slice(0, 15)}
            </Typography>
            <Typography variant="body1" color="green">
              Estimated delivery in {new Date().toString().slice(0, 15)}
            </Typography>
          </div>
          <div className="order_product_detail gap-2 flex-wrap p-3 border rounded-3 my-4">
            <div className="d-flex align-items-center gap-3 ">
              {selectedOrder?.product_info?.primaryImage?.[0]?.URL && (
                <img
                  src={selectedOrder?.product_info?.primaryImage?.[0]?.URL}
                  alt={selectedOrder?.product_info?.name}
                  width={70}
                  className="product__img"
                />
              )}
              <div>
                <h5>{selectedOrder?.product_info?.name}</h5>
                <h6 className="mb-1">
                  {selectedOrder?.product_info?.description}
                </h6>
                <p className="mb-1" style={{ fontSize: "small" }}>
                  Size: {selectedOrder?.product_info?.size[0]} color:{" "}
                  {selectedOrder?.product_info?.color}
                </p>
              </div>

              {/* <div>
              <h5>{selectedOrder?.product_info?.name}</h5>
              <h6 className="mb-1">
                {selectedOrder?.product_info?.description}
              </h6>
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
            </div> */}
            </div>
            <div className="order_product_detail_price">
              <h5 className="mb-1 fw-bold">
                ${selectedOrder?.product_info?.price}.00
              </h5>
              <p className="mb-1" style={{ fontSize: "small" }}>
                Qty: {selectedOrder?.product_info?.count}{" "}
              </p>
            </div>
          </div>
          <Row>
            <Col xl={12} md={6} sm={12}>
              {/* <Typography variant="subtitle1" className="mb-1">
                Order Summary
              </Typography> */}
              <List>
                <ListItem
                  secondaryAction={`$${
                    selectedOrder?.product_info?.count *
                    selectedOrder?.product_info?.price
                  }`}
                >
                  Subtotal:
                </ListItem>
                <Divider />
                <ListItem secondaryAction={`$${25}`}>Shipping:</ListItem>
                <Divider />
                <ListItem
                  secondaryAction={`-$${
                    (selectedOrder?.product_info?.count *
                      selectedOrder?.product_info?.price *
                      10) /
                    100
                  }`}
                >
                  Discount:
                </ListItem>
                <Divider />
                <ListItem
                  className="fs-5"
                  secondaryAction={`$${
                    selectedOrder?.product_info?.count *
                      selectedOrder?.product_info?.price -
                    (selectedOrder?.product_info?.count *
                      selectedOrder?.product_info?.price *
                      10) /
                      100 +
                    25
                  }`}
                >
                  Grand Total:
                </ListItem>
              </List>
            </Col>
            {/* <Col xl={6} md={6} sm={12}>
              <p>Shipment</p>
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
            </Col> */}
          </Row>
          <Divider />
          <Row style={{ padding: "0px 16px" }} className="mt-3">
            <Col xl={6} md={6} sm={12}>
              <p>Payment</p>

              <div className="p-3 border rounded-3">
                <p>
                  {selectedOrder?.payment_method === "cash"
                    ? "Cash on delivery"
                    : "online payment"}
                </p>
                <p>{selectedOrder?.payment_status}</p>
                {selectedOrder?.card_details && (
                  <>
                    <p className="mb-1">
                      {selectedOrder?.card_details.brand?.toUpperCase()} ****
                      {selectedOrder?.card_details.last4}
                    </p>
                    <p>
                      {selectedOrder?.card_details.exp_month < 10
                        ? `0${selectedOrder?.card_details.exp_month}`
                        : selectedOrder?.card_details.exp_month}
                      /{selectedOrder?.card_details.exp_year}
                    </p>
                  </>
                )}
                {selectedOrder?.invoice === "paid" && (
                  <Button
                    startIcon={<ReceiptIcon />}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      window.location.replace(selectedOrder?.invoice)
                    }
                  >
                    invoice
                  </Button>
                )}
              </div>
            </Col>
            <Col xl={6} md={6} sm={12}>
              <p>Shipment</p>
              <p className="mb-1 p-3 border rounded-3">
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
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <ul id="progressBar" className="text-center">
                <li className="active step-0"></li>
                <li className="active step-0"></li>
                <li className="active step-0"></li>
                <li className="step-0"></li>
              </ul>
            </div>
          </div>

          {/* <Box sx={{ width: "100%" }}>
            <Stepper activeStep={2} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} color="success">
                  <StepLabel>{label}</StepLabel>
                  <p className="text-center">24/06/2025</p>
                </Step>
              ))}
            </Stepper>
          </Box> */}
        </DialogContent>
        <DialogActions>
          <div className="d-flex gap-2">
            <Button variant="contained" size="small" endIcon={<GpsFixedIcon />}>
              track order
            </Button>
            {selectedOrder?.delivery_status !== "cancelled" &&
              selectedOrder?.delivery_status !== "delivered" && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<CloseIcon />}
                  onClick={() => cancelOrder(selectedOrder?._id)}
                >
                  cancel order
                </Button>
              )}
            {selectedOrder?.delivery_status === "delivered" && (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => cancelOrder(selectedOrder?._id)}
              >
                return
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyOrders;
