import "./Control.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Cart from "../../Card/Cart/Cart";
import { useContext } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { useMyContext } from "../../../Context/MyContext";

const Control = () => {
  const { isLogin, setIsLogin, wishListItems } = useMyContext();

  console.log("isLogin", isLogin);

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        <div className="control">
          <Link to={isLogin ? "/account/me" : "/account/login"}>
            <PersonOutlineIcon
              color="black"
              size="large"
              sx={{ width: "35px" }}
            />
          </Link>
        </div>
        <div className="control">
          <Link to={isLogin ? "/wishlist" : "/account/login"}>
            <Badge badgeContent={wishListItems.length} color="error">
              <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
            </Badge>
          </Link>
        </div>
        <div className="control">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Control;
