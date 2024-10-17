import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Card, Chip, IconButton } from "@mui/material";
import "./WishCard.css";
import { Button } from "@mui/material";
import Star from "@mui/icons-material/Star";
import { ApiServices } from "../../../api/api";
import { useMyContext } from "../../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DecimalFormatter } from "../../../utils/DecimalFormatter";

const WishCard = (props) => {
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
        toast.success("Product successfully removed from your wishlist!");
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
        toast.success("Product successfully added to your cart!");
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
        <div
          className="wish__item__name flex-column cursor-pointer"
          onClick={() =>
            navigate(`/item/${props.item.category}/${props.item._id}`)
          }
        >
          <p className="mb-1 text-muted" style={{ fontSize: "13px" }}>
            {props.item.name}
          </p>
          <h6 className="mb-1">{props.item.description}</h6>
          {props.item.ratings?.length > 0 && (
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
                    {DecimalFormatter(
                      props.item.ratings?.reduce((acc, rating) => {
                        return acc + rating.rating;
                      }, 0) / props.item.ratings?.length
                    ) || 0}{" "}
                    <Star fontSize="1rem" />
                  </Box>
                }
              />
              <span style={{ fontSize: "small" }}>
                ({props.item.ratings?.length})
              </span>
            </div>
          )}
          <div className="mb-1 fw-bold flex-wrap wish__item__price">
            <span> ${(props.item.price * (100 - props.item.offer)) / 100}</span>
            {props.item.offer && props.item.offer > 0 ? (
              <>
                <span className="text-decoration-line-through">
                  ${props.item.price}
                </span>
                <span className="text-success">{props.item.offer}% off</span>
              </>
            ) : (
              <></>
            )}
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
                  backgroundColor: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                  color: "black",
                },
                borderColor: "black",
                backgroundColor: "black",
                color: "var(--primary-color)",
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
                  backgroundColor: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                  color: "black",
                },
                borderColor: "black",
                backgroundColor: "black",
                color: "var(--primary-color)",
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
