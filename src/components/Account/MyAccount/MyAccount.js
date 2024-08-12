import { useState, useEffect } from "react";
import Account from "../Account";
import "./MyAccount.css";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
  const { setIsLogin } = useMyContext();

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
      {/* <div className="order__history__container">
        <div className="order__history">
          <div className="order__history__header">Order History</div>
          <div className="order__history__detail">You have not place any orders yet</div> 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead> 
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="d-flex align-items-center gap-2"
                    >
                      <Avatar />
                      <div className="d-flex flex-column">
                        {row.name}
                        <span>men</span>
                      </div>
                    </TableCell>

                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="account__details__container">
        <div className="account__details__header">
          <div className="details__header">Account Details</div>
          <div className="logout__action">Logout</div>
        </div>
        <div className="account__details">
          <div className="account__holder__name">Account holder name</div>
          <div className="account__holder__email">Account holder email</div>
          <div className="manage__account__action">
            <Link to="/account/manage">Manage account</Link>
          </div>
        </div>
      </div> */}
      {matches ? (
        <Box
          sx={{
            flexGrow: 1,
            // bgcolor: "background.paper",
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
            {/* <div className="d-flex flex-column align-items-center mb-2 gap-2">
              <Avatar style={{ height: "100px", width: "100px" }} />
              <Typography variant="body1" className="text-dark">
                Prasanna
              </Typography>
            </div> */}
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
          >
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="My account" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("myorders")}
          >
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("manageaddress")}
          >
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="Manage Addresses" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("myreviews")}
          >
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="My Reviews & Ratings" />
          </ListItem>
          <ListItem
            className="list-item"
            onClick={() => handleRoute("payments")}
          >
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem className="list-item" onClick={() => setLogoutOpen(true)}>
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem className="list-item" onClick={() => setDeleteOpen(true)}>
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
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
