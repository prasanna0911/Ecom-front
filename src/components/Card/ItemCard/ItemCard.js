import "./ItemCard.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { useMyContext } from "../../../Context/MyContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ApiServices } from "../../../api/api";

const ItemCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);
  const {
    cartItems,
    getCartItems,
    setCartItems,
    wishListItems,
    getWishlistItems,
  } = useMyContext();

  const handleAddToWishList = () => {
    wishItemsContext.addItem(props.item);
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1);
  };

  const addToFavourite = async (id) => {
    var json = {
      Id: id,
    };
    console.log("json", json);
    ApiServices.AddToFavourites(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getWishlistItems();
      }
    });
  };

  const handelRemoveItem = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.RemoveFromFavourites(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        getWishlistItems();
      }
    });
  };

  return (
    <Card
      className="item"
      // className="product__card__card"
      data-aos="fade-up"
    >
      <CardContent className="p-0 pb-2">
        {/* <CardContent className="product__card p-0 pb-2"> */}
        <img
          src={props.item?.primaryImage[0].URL}
          alt="item"
          // className="product__img"
        />
        {wishListItems?.some((product) => product._id === props.item?._id) ? (
          <IconButton
            onClick={() => handelRemoveItem(props.item?._id)}
            className="not-fav-icon-button position-absolute top-0 end-0 m-2"
            size="small"
          >
            <FavoriteIcon className="fav-icon" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => addToFavourite(props.item?._id)}
            className="fav-icon-button position-absolute top-0 end-0 m-2"
            size="small"
          >
            <FavoriteIcon className="fav-icon" />
            {/* <FavoriteBorderIcon className="fav-icon" /> */}
          </IconButton>
        )}

        <div className="product__card__detail">
          <Link to={`/item/${props.item.category}/${props.item._id}`}>
            <div className="product__name">
              {/* <Link to={`/item/${props.item.category}/${props.item._id}`}> */}
              {props.item.name}
              {/* </Link> */}
            </div>
            <div className="product__description">
              {/* <span>{props.item.description}</span> */}
              <span>{props.item.description?.slice(0, 25)}...</span>
            </div>
          </Link>
          <div className="item-prices">
            <span className="item-price-new">
              ${Math.round((props.item.price * (100 - props.item.offer)) / 100)}
            </span>
            {props.item.offer && props.item.offer > 0 ? (
              <>
                <span className="item-price-old">${props.item.price}</span>
                {/* <span className="text-success">{props.item.offer}% off</span> */}
              </>
            ) : (
              <></>
            )}
            {/* <span className="text-success">12% offer</span> */}
          </div>
          {/* <div className="product__card__action gap-1 align-items-center mt-2">
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              // color="warning"
              size="small"
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              // color="warning"
              size="small"
            >
              buy now
            </Button>
             {wishListItems?.some(
              (product) => product._id === props.item?._id
            ) ? (
              <IconButton
                onClick={() => handelRemoveItem(props.item?._id)}
                className="not-fav-icon-button"
              >
                <FavoriteIcon className="fav-icon" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => addToFavourite(props.item?._id)}
                className="fav-icon-button"
              >
                <FavoriteBorderIcon className="fav-icon" />
              </IconButton>
            )} 
          </div> */}
        </div>
        {/* <div className="layer">
          <h3>LONDON</h3>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
