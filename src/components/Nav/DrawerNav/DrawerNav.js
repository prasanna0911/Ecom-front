import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Control from "../Controls/Control";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Form from "../Search-Bar/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../DrawerNav/DrawerNav.css";

const DrawerNav = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const NavList = [
    {
      page_name: "Home",
      nav_link: "/",
    },
    {
      page_name: "Shop",
      nav_link: "/shop",
    },
    {
      page_name: "Men",
      nav_link: "/category/men",
    },
    {
      page_name: "Women",
      nav_link: "/category/women",
    },
    {
      page_name: "Kids",
      nav_link: "/category/kids",
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {NavList.map((item) => (
          <ListItem key={item.page_name} disablePadding>
            <ListItemButton
              className={
                item.nav_link === path
                  ? "selected-nav mx-3 rounded-3 mb-2"
                  : "other-nav mx-3 rounded-3 mb-2"
              }
              onClick={() => navigate(item.nav_link)}
            >
              <ListItemText>{item.page_name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <Control />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <div className="search__drawer">
            <Form />
          </div>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Fragment>
      {["left"].map((anchor) => (
        <Fragment>
          {state.left ? (
            <MenuOpenIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" onClick={toggleDrawer(anchor, true)} />
          )}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DrawerNav;
