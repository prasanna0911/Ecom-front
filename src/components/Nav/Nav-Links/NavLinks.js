import { Link, useLocation } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className={path === "/" ? "nav-link sel-nav" : "nav-link"}>
            <Link to="/">Home</Link>
          </li>
          <li className={path === "/shop" ? "nav-link sel-nav" : "nav-link"}>
            <Link to="/shop">Shop</Link>{" "}
          </li>
          <li
            className={
              path === "/category/men" ? "nav-link sel-nav" : "nav-link"
            }
          >
            <Link to="/category/men">Men</Link>
          </li>
          <li
            className={
              path === "/category/women" ? "nav-link sel-nav" : "nav-link"
            }
          >
            <Link to="/category/women">Women</Link>
          </li>
          <li
            className={
              path === "/category/kids" ? "nav-link sel-nav" : "nav-link"
            }
          >
            <Link to="/category/kids">Kids</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
