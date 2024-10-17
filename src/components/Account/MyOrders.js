import { Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountHeader from "./AccountHeader";
import { useMyContext } from "../../Context/MyContext";
import { ApiServices } from "../../api/api";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import "./Account.css";
import Loader from "../../utils/Loader";
import EmptyComponent from "../EmptyComponent";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { MobileScreen } = useMyContext();

  const getMyOrders = () => {
    setLoading(true);
    ApiServices.GetMyOrders()
      .then((res) => {
        console.log("res orders", res);
        if (res.response_code === 200) {
          setMyOrders(res.my_orders);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMyOrders();
    window.scrollTo(0, 0);
  }, []);

  const handleRatingsRoute = (e, id) => {
    e.stopPropagation();
    navigate(`/ratingsandreviews/${id}`);
  };

  return (
    <div
      className="d-grid align-self-center"
      style={{ padding: MobileScreen ? "none" : "20px" }}
    >
      {!MobileScreen && (
        <AccountHeader head="My Orders" breadcrumb="My Orders" />
      )}
      {MobileScreen && <h3 className="mb-4">My Orders</h3>}
      {loading ? (
        <Loader />
      ) : myOrders.length > 0 ? (
        myOrders?.map((item) => (
          <Card
            style={{ cursor: "pointer" }}
            key={item._id}
            className="mb-3 py-2 px-1 d-flex justify-content-between align-items-start flex-wrap"
            onClick={() => navigate(`/order/${item._id}`)}
          >
            <CardContent className="d-flex order-card">
              <img
                src={`${item.product_info?.primaryImage[0]?.URL}`}
                alt="item"
                width={100}
                className="product__img"
              />
              <div>
                <h5 style={{ fontSize: "13px" }} className="text-muted mb-1">
                  {item.product_info?.name}
                </h5>
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
            <CardContent className="d-flex flex-column order-card-detail">
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
                  Ordered on{" "}
                  {new Date(item?.order_date).toString().slice(4, 15)}
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
                  size="small"
                  onClick={(e) => handleRatingsRoute(e, item.product_info._id)}
                >
                  Rate & review this product
                </Button>
              ) : item.delivery_status === "cancelled" ? (
                <div></div>
              ) : (
                <h6
                  style={{ color: "green" }}
                  className="d-flex gap-1 align-items-start mb-0"
                >
                  <AirplanemodeActiveIcon fontSize="small" />
                  Estimated delivery in {new Date().toString().slice(0, 15)}
                </h6>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          <EmptyComponent
            text="Looks like you haven’t made any purchases."
            height="100vh"
          />
        </>
      )}
    </div>
  );
};

export default MyOrders;
