import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";

const OrderSummery = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" className="mb-1">
          Order Summary
        </Typography>
        <div className="d-flex align-items-center gap-5 my-3">
          <img
            src="http://localhost:5000/men/images-1721028365398.jpg"
            width={80}
          />
          <div>
            <h6>Praduct name</h6>
            <p>$566</p>
          </div>
        </div>
        <List>
          <ListItem secondaryAction="$699">Subtotal:</ListItem>
          <Divider />
          <ListItem secondaryAction="$9">Shipping:</ListItem>
          <Divider />
          <ListItem secondaryAction="-$19">Discount:</ListItem>
          <Divider />
          <ListItem className="fs-5" secondaryAction="$709">
            Grand Total:
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default OrderSummery;
