import { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";
import "./WishCard.css";
import { Button } from "@mui/material";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import Star from "@mui/icons-material/Star";
import { ApiServices } from "../../../api/api";
import { useMyContext } from "../../../Context/MyContext";

const WishCard = (props) => {
  const wishItems = useContext(WishItemsContext);
  const { getCartItems, getWishlistItems } = useMyContext();

  const handelRemoveItem = () => {
    var json = {
      Id: props.item._id,
    };
    ApiServices.RemoveFromFavourites(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getWishlistItems();
      }
    });
  };

  const handelAddToCart = () => {
    // wishItems.addToCart(props.item);
    var json = {
      Id: props.item._id,
    };
    ApiServices.AddToCart(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getCartItems();
      }
    });
  };

  return (
    <Card className="wishcard">
      <div className="d-flex gap-3">
        <div className="wish__item__image">
          <img
            src={props.item.primaryImage[0].URL}
            alt="item"
            className="wish__image"
          />
        </div>
        <div className="wish__item__name flex-column">
          <p className="mb-0 fs-5">{props.item.name}</p>
          <p className="mb-1 fs-6">{props.item.description}</p>
          <div className="d-flex gap-2 mb-3">
            <Chip
              color="success"
              size="small"
              className="rounded"
              style={{ height: "auto" }}
              label={
                <Box
                  className="d-flex align-items-center justify-content-center gap-1"
                  style={{ fontSize: "small" }}
                >
                  4.1 <Star fontSize="1rem" />
                </Box>
              }
            />
            <span style={{ fontSize: "small" }}>(1,453)</span>
          </div>
          <p className="mb-1 d-flex gap-3 fw-bold">
            ${props.item.price}
            <span className="text-decoration-line-through">$1299</span>
            <span className="text-success">12% offer</span>
          </p>
        </div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <Button
          variant="outlined"
          onClick={handelAddToCart}
          sx={[
            {
              "&:hover": {
                backgroundColor: "#FFE26E",
                borderColor: "#FFE26E",
                color: "black",
              },
              borderColor: "black",
              backgroundColor: "black",
              color: "#FFE26E",
            },
          ]}
        >
          Add to cart
        </Button>
        <IconButton onClick={handelRemoveItem}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default WishCard;
