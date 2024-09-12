import { useState, useEffect } from "react";
import Account from "../Account";
import "./MyAccount.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import MyOrders from "../MyOrders";
import ManageAccount from "../ManageAccount/ManageAccount";
import ShippingAddress from "../ShippingAddress";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import MyReviews from "../MyReviews";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMyContext } from "../../../Context/MyContext";
import Payments from "../Payments";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="w-100"
    >
      {value === index && (
        <Box sx={{ p: 3, paddingTop: 0 }} className="w-100">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = parseInt(queryParams.get("tab") || "0", 10);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { setIsLogin, setCartItems, setWishListItems } = useMyContext();

  const [value, setValue] = useState(initialTab);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    queryParams.set("tab", value);
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRoute = (route) => {
    navigate(route);
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    setLogoutOpen(false);
    setWishListItems([]);
    setCartItems([]);
    navigate("/account/login");
  };

  const data = [
    { id: 1, category: "fruits", name: "apple" },
    { id: 2, category: "fruits", name: "banana" },
    { id: 3, category: "vegetables", name: "carrot" },
    { id: 4, category: "fruits", name: "grape" },
    { id: 5, category: "vegetables", name: "broccoli" },
  ];

  const groupedByCategory = Object.groupBy(data, ({ category }) => category);

  console.log(groupedByCategory);
  return (
    <Account>
      {matches ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            paddingTop: 0,
          }}
        >
          <Tabs
            orientation="vertical"
            // variant="scrollable"
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ sx: { display: "none" } }}
            aria-label="Vertical tabs example"
            sx={{
              minWidth: "200px",
              position: "sticky",
              height: "100vh",
              top: 0,
              zIndex: 1,
            }}
          >
            <Tab label="My Account" {...a11yProps(0)} />
            <Tab label="My Orders" {...a11yProps(1)} />
            <Tab label="Manage Addresses" {...a11yProps(2)} />
            <Tab label="My Reviews & Ratings" {...a11yProps(3)} />
            <Tab label="Payments" {...a11yProps(4)} />
            <Button
              startIcon={<PowerSettingsNewIcon />}
              color="error"
              onClick={() => setLogoutOpen(true)}
              className="mb-1"
              style={{ padding: "0.80rem" }}
            >
              Logout
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => setDeleteOpen(true)}
              style={{ padding: "0.80rem" }}
            >
              Delete Account
            </Button>
          </Tabs>
          <TabPanel value={value} index={0}>
            <ManageAccount />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyOrders />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ShippingAddress />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MyReviews />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Payments />
          </TabPanel>
        </Box>
      ) : (
        <List className="w-100">
          <ListItem
            className="list-item"
            onClick={() => handleRoute("myaccount")}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
          >
            <ListItemText primary="My account" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("myorders")}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
          >
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("manageaddress")}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
          >
            <ListItemText primary="Manage Addresses" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("myreviews")}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
          >
            <ListItemText primary="My Reviews & Ratings" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("payments")}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
          >
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
            className="list-item"
            onClick={() => setLogoutOpen(true)}
          >
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem
            className="list-item"
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowRightAltIcon />
              </IconButton>
            }
            onClick={() => setDeleteOpen(true)}
          >
            <ListItemText primary="Delete Account" />
          </ListItem>
        </List>
      )}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography variant="h6">Logout confirmation?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body">
            Are you sue you want to logout from this device{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => logout()}>
            Logout
          </Button>
          <Button onClick={() => setLogoutOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography variant="h6">Account Delete confirmation?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body">
            Are you sue you want to delete your account this will erase your all
            data related to this platform
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </Account>
  );
};

export default MyAccount;
