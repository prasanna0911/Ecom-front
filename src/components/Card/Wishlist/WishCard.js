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
import { useNavigate } from "react-router-dom";

const WishCard = (props) => {
  const wishItems = useContext(WishItemsContext);
  const { cartItems, getCartItems, getWishlistItems } = useMyContext();
  const navigate = useNavigate();
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
      <div className="wishcard_item_details">
        <img
          src={props.item.primaryImage[0].URL}
          alt="item"
          className="wish__image"
        />
        <div className="wish__item__name flex-column">
          <p className="mb-1">{props.item.name}</p>
          <h6 className="mb-1">{props.item.description}</h6>
          <div className="d-flex gap-2 mb-2">
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
          <div className="mb-1 fw-bold flex-wrap wish__item__price">
            <span>${props.item.price}</span>
            <span className="text-decoration-line-through">$1299</span>
            <span className="text-success">12% offer</span>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 align-items-center justify-content-end wishcard_item_footer">
        {cartItems?.some((product) => product._id === props.item._id) ? (
          <Button
            variant="outlined"
            onClick={() => navigate("/cartitems")}
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
            go to cart
          </Button>
        ) : (
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
        )}

        <IconButton onClick={handelRemoveItem} color="error">
          <HighlightOffIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default WishCard;
