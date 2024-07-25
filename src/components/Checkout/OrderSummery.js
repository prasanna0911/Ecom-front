import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";

const OrderSummery = ({ checkoutItem }) => {
  const discount = 10;
  const shipping = 25;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" className="mb-1">
          Order Summary
        </Typography>
        <div className="d-flex align-items-center gap-3 my-3 border rounded-3 p-2">
          <img src={checkoutItem?.primaryImage?.[0]?.URL} width={60} />
          <div className="d-flex align-items-center gap-3">
            {checkoutItem.count} x
            <div>
              <h6>{checkoutItem.name}</h6>
              <p className="mb-0">${checkoutItem?.price}</p>
            </div>
          </div>
        </div>
        <List>
          <ListItem
            secondaryAction={`$${checkoutItem.count * checkoutItem?.price}`}
          >
            Subtotal:
          </ListItem>
          <Divider />
          <ListItem secondaryAction={`$${shipping}`}>Shipping:</ListItem>
          <Divider />
          <ListItem
            secondaryAction={`-$${
              (checkoutItem.count * checkoutItem?.price * 10) / 100
            }`}
          >
            Discount:
          </ListItem>
          <Divider />
          <ListItem
            className="fs-5"
            secondaryAction={`$${
              checkoutItem.count * checkoutItem?.price -
              (checkoutItem.count * checkoutItem?.price * 10) / 100 +
              shipping
            }`}
          >
            Grand Total:
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default OrderSummery;
