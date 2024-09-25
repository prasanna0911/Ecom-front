import { Fragment } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../Context/MyContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, isLogin } = useMyContext();

  return (
    <Fragment>
      <Badge badgeContent={cartItems.length} color="error">
        <ShoppingCartIcon
          color="black"
          onClick={() => navigate(isLogin ? "/cartitems" : "/account/login")}
          sx={{ width: "35px" }}
        />
      </Badge>
    </Fragment>
  );
};

export default Cart;
