import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const OrderSuccess = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: "20px",
          padding: "20px 0px",
        }}
      >
        <CardContent className="text-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
            width={100}
            className="animated-svg"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#198754"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill="none"
              stroke="#198754"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5"
            />
          </svg>
        </CardContent>
        <CardContent className="text-center ">
          <Typography gutterBottom variant="h6" component="div">
            Order Successfully Placed!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your order has been placed successfully. Thank you for shopping with
            us! Click 'OK' to view your order details or continue shopping.
          </Typography>
        </CardContent>

        <CardActions style={{ justifyContent: "center" }}>
          <Button
            // size="small"
            variant="contained"
            color="success"
            // onClick={() => location.replace("/login")}
            style={{ padding: "0.5rem 3rem" }}
          >
            ok
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default OrderSuccess;
