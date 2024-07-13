import { useContext, useState } from "react";
import "./Detail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StarIcon from "@mui/icons-material/Star";

const Detail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(props.item.size[0]);

  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  const handelAddToCart = () => {
    cartItems.addItem(props.item, quantity, size);
  };

  const handelAddToWish = () => {
    wishItems.addItem(props.item);
  };

  const [alignment, setAlignment] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          <p className="mb-0">brand</p>
          <div className="product__name__main">{props.item.name}</div>
          <div className="product__detail__description mb-1">
            {props.item.description}
          </div>
          <div className="product__color mb-1">
            <div>COLOR</div>
            <div
              className="product-color"
              style={{ backgroundColor: `${props.item.color}` }}
            ></div>
          </div>
          <div className="product__price__detail mb-2">${props.item.price}</div>
          <div className="d-flex gap-3 mb-3">
            <Chip
              color="success"
              size="small"
              label={
                <Box className="d-flex align-items-center justify-content-center gap-1">
                  4.1 <StarIcon fontSize="1rem" />
                </Box>
              }
            />
            <span>1,453 ratings and 21 reviews</span>
          </div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className="mb-3"
          >
            {props.item.size.map((size) => (
              <ToggleButton className="border-left me-2 px-3 py-1" value={size}>
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

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
            <div className="d-flex gap-3 align-items-center mb-3">
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
                onClick={handelAddToWish}
              >
                <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
              </IconButton>
            </div>
          </div>
        </form>
        <div>Product details</div>
        <ul>
          {props.item.highlights.map((highlight) => (
            <li>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
