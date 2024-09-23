import { useState } from "react";
import "./Detail.css";
import { Button, Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StarIcon from "@mui/icons-material/Star";
import { ApiServices } from "../../../api/api";
import { useMyContext } from "../../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { toast } from "react-toastify";

const Detail = (props) => {
  const navigate = useNavigate();

  const { cartItems, getCartItems, wishListItems, getWishlistItems } =
    useMyContext();

  const handelAddToCart = () => {
    console.log("props.item", props.item);
    var json = {
      Id: props.item._id,
    };
    ApiServices.AddToCart(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getCartItems();
        toast.success("Product successfully added to your cart!");
      }
    });
    // cartItems.addItem(props.item, quantity, size);
  };

  const handelAddToWish = () => {
    // wishItems.addItem(props.item);
    var json = {
      Id: props.item._id,
    };
    ApiServices.AddToFavourites(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getWishlistItems();
        toast.success("Product successfully added to your wishlist!", {
          className: "w-100",
        });
      }
    });
  };

  const handelRemoveItem = (id) => {
    var json = {
      Id: props.item._id,
    };
    ApiServices.RemoveFromFavourites(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getWishlistItems();
        toast.success("Product successfully removed from your wishlist!");
      }
    });
  };

  const [alignment, setAlignment] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          {/* <p className="mb-0">{props.item.name}</p> */}
          <div className="product__name__main">{props.item.name}</div>
          <div className="product__detail__description">
            {props.item.description}
          </div>
          <div className="product__price__detail mb-2">
            <p className="current">${props.item.price}</p>
            <p className="original">$1344</p>
            <p className="offer">76% off</p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <div className="rating_chip">
              {props.item.ratings?.reduce((acc, rating) => {
                return acc + rating.rating;
              }, 0) / props.item.ratings?.length || 0}

              <StarIcon fontSize="1rem" />
            </div>
            {/* <Chip
              color="success"
              size="small"
              label={
                <Box className="d-flex align-items-center justify-content-center gap-1">
                  4.1 <StarIcon fontSize="1rem" />
                </Box>
              }
            /> */}
            <span
              style={{ fontSize: "16px", color: "#878787", cursor: "pointer" }}
            >
              ({props.item.ratings?.length || 0} ratings and{" "}
              {props.item.reviews?.length || 0} reviews)
            </span>
          </div>
          {/* <div className="product__color mb-1">
            <div>COLOR</div>
            <div
              className="product-color"
              style={{ backgroundColor: `${props.item.color}` }}
            ></div>
          </div> */}
          <div className="toggle_button_group">
            <p>size :</p>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              className="mb-3"
            >
              {props.item.size.map((size) => (
                <ToggleButton
                  className="border-left me-2 px-3 py-2"
                  value={size}
                  key={size}
                >
                  {size}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </div>
        {/* <div className="toggle_button_group mb-3">
          <p>Delivery : </p>
          <div className="border rounded-2 py-2 px-4">
            <h6 className="delivery_date">
              Delivery by 7 Sep, Saturday | Free
            </h6>
            <h6 className="delivery_time">if ordered before 10:59 AM</h6>
          </div>
        </div> */}
        {/* <div className="toggle_button_group mb-2">
          <p>Return : </p>
          <div className="delivery_date" style={{ marginTop: "8px" }}>
            <ReplyIcon /> 10 Days Return Policy
          </div>
        </div> */}
        <div className="cod mt-3 mb-2 align-items-start">
          <LocalShippingIcon />
          <div className="">
            <h6 className="delivery_date_2">
              Delivery by 7 Sep, Saturday | Free
            </h6>
            <h6 className="delivery_time">if ordered before 10:59 AM</h6>
          </div>
        </div>
        <Divider className="my-1" />

        <div className="cod mb-2">
          <ReplyIcon style={{ fontWeight: "inherit" }} /> 10 Days Return Policy
        </div>
        <Divider className="my-1" />
        <div className="cod mb-2">
          <LocalAtmIcon style={{ fontWeight: "inherit" }} /> Cash On Delivery
          Available
        </div>
        {/* <Divider className="my-1" /> */}

        <form onSubmit={handelAddToCart} className="product__form">
          {/* <div className="product__quantity__and__size">
            <div className="product__quantity">
              <IconButton onClick={handelQuantityIncrement}>
                <AddCircleIcon />
              </IconButton>
              <div type="text" name="quantity" className="quantity__input">
                {quantity}
              </div>
              <IconButton onClick={handelQuantityDecrement}>
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
            </div>

            <div className="product size">
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Size</InputLabel>
                  <Select value={size} label="size" onChange={handleSizeChange}>
                    {props.item.size.map((size) => (
                      <MenuItem value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div> */}
          <div className="collect__item__actions">
            <div className="d-flex gap-3 align-items-center my-3">
              {cartItems?.some(
                (cart_item) => cart_item._id === props.item._id
              ) ? (
                <Button
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                      },
                      minWidth: 200,
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={() => navigate("/cartitems")}
                >
                  GO TO BAG
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                      },
                      minWidth: 200,
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={handelAddToCart}
                >
                  ADD TO BAG
                </Button>
              )}
              {wishListItems?.some(
                (wishlist_item) => wishlist_item._id === props.item._id
              ) ? (
                <IconButton
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                      },
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={handelRemoveItem}
                >
                  <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                </IconButton>
              ) : (
                <IconButton
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                        boxShadow:
                          "5px 5px 20px #babecc,-10px -10px 20px #ffffff ",
                      },
                      borderColor: "black",
                      backgroundColor: "#FFE26E",
                      color: "black",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={handelAddToWish}
                >
                  <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                </IconButton>
              )}
            </div>
          </div>
        </form>
        <div>Product details</div>
        <ul>
          {props.item.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
