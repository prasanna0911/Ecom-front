import { Col, Row } from "react-bootstrap";
import Account from "../Account";
import "./ManageAccount.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountHeader from "../AccountHeader";
import { useMyContext } from "../../../Context/MyContext";
import { ApiServices } from "../../../api/api";

const ManageAccount = () => {
  const { MobileScreen } = useMyContext();

  const [userValue, setUserValue] = useState("");
  const [userError, setUserError] = useState(false);
  const [mailValue, setMailValue] = useState("");
  const [mailError, setMailError] = useState(false);
  const [fnameValue, setFnameValue] = useState("");
  const [lnameValue, setLnameValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [passError, setPassError] = useState(false);
  const [newPassValue, setNewPassValue] = useState("");
  const [newPassError, setNewPassError] = useState(false);
  const [newPassErrorMsg, setNewPassErrorMsg] = useState("");
  const [cpassValue, setCpassValue] = useState("");
  const [cpassError, setCpassError] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();

  //userdata
  const [userData, setUserData] = useState({});

  //edit dialogs
  const [nameEditOpen, setNameEditOpen] = useState(false);
  const [usernameEditOpen, setUsernameEditOpen] = useState(false);
  const [mailEditOpen, setMailEditOpen] = useState(false);
  const [passwordEditOpen, setPasswordEditOpen] = useState(false);
  const [phonenumberAddOpen, setPhonenumberAddOpen] = useState(false);
  const [phonenumberEditOpen, setPhonenumberEditOpen] = useState(false);

  const getUserData = async () => {
    ApiServices.UserData().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setUserData(res.userData);
        setFnameValue(res.userData?.first_name);
        setLnameValue(res.userData?.last_name);
        setUserValue(res.userData?.username);
        setMailValue(res.userData?.email);
        setPhoneNumber(res.userData?.mobile_number);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  //email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //update functions

  const handleNameUpdate = async () => {
    var json = {
      FirstName: fnameValue,
      LastName: lnameValue,
    };
    ApiServices.UpdateName(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setNameEditOpen(false);
        getUserData();
      }
    });
  };

  const handleUsernameUpdate = () => {
    if (userValue === "prasanna12") {
      setUserError(true);
      return;
    }
    setUserError(false);
    userData.username = userValue;
    setUsernameEditOpen(false);
  };

  const handleEmailUpdate = () => {
    if (!validateEmail(mailValue)) {
      setMailError(true);
      return;
    }
    setMailError(false);
    var json = {
      Email: mailValue,
    };
    ApiServices.UpdateEmail(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setMailEditOpen(false);
        getUserData();
      }
    });
  };

  const handlePasswordUpdate = () => {
    setPassError(false);
    setNewPassError(false);
    setNewPassErrorMsg("");
    setCpassError(false);
    // if (passValue !== "prasanna12") {
    //   setPassError(true);
    //   return;
    // }
    if (newPassValue.length < 8) {
      setNewPassError(true);
      setNewPassErrorMsg("Password must contain atleast 8 charecters");
      return;
    }
    if (newPassValue === "prasanna123") {
      setNewPassError(true);
      setNewPassErrorMsg("New password cannot be your old password");
      return;
    }
    if (newPassValue !== cpassValue) {
      setCpassError(true);
      return;
    }

    var json = {
      OldPassword: passValue,
      NewPassword: newPassValue,
    };
    ApiServices.UpdatePassword(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setPasswordEditOpen(false);
        getUserData();
      }
    });
  };

  const handleAddNumber = () => {
    var json = {
      MobileNumber: newPhoneNumber,
    };
    ApiServices.UpdateMobileNumber(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setPhonenumberAddOpen(false);
        getUserData();
      }
    });
  };

  const handleEditNumber = () => {
    var json = {
      MobileNumber: phoneNumber,
    };
    ApiServices.UpdateMobileNumber(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setPhonenumberEditOpen(false);
        getUserData();
      }
    });
  };
  return (
    // <Account>
    <div className="manage__account__container">
      <div className="edit__account__container">
        <div className="edit__account">
          <div
            className="edit__account__form__container"
            style={{ padding: MobileScreen ? "none" : "20px" }}
          >
            {!MobileScreen && (
              <AccountHeader head="My Account" breadcrumb="My Account" />
            )}
            <Card>
              <CardHeader
                title={
                  <div className="edit__account__header">Edit account</div>
                }
              />
              <CardContent>
                <List sx={{ minWidth: 300, width: "100%" }}>
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                        onClick={() => setNameEditOpen(true)}
                      >
                        edit
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Name"
                      secondary={`${userData.first_name} ${userData.last_name}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                        onClick={() => setUsernameEditOpen(true)}
                      >
                        edit
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Username"
                      secondary={userData.username}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                        onClick={() => setMailEditOpen(true)}
                      >
                        edit
                      </Button>
                    }
                  >
                    <ListItemText primary="Email" secondary={userData.email} />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                        onClick={() => setPasswordEditOpen(true)}
                      >
                        edit
                      </Button>
                    }
                  >
                    <ListItemText primary="Password" secondary={"********"} />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      userData.mobile_number ? (
                        <Button
                          variant="contained"
                          className="text-capitalize py-1"
                          onClick={() => setPhonenumberEditOpen(true)}
                        >
                          edit
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          className="text-capitalize py-1"
                          onClick={() => setPhonenumberAddOpen(true)}
                        >
                          Add
                        </Button>
                      )
                    }
                  >
                    <ListItemText
                      primary="Mobile number"
                      secondary={
                        userData.mobile_number
                          ? userData.mobile_number
                          : "Add a phone number"
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                      >
                        Turn on
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Two-step-verification"
                      secondary={
                        "Add a layer of security. Require a code in addition to your password."
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="contained"
                        className="text-capitalize py-1"
                      >
                        Start
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Compromised account?"
                      secondary={
                        "Take steps like changing your password and signing out everywhere."
                      }
                    />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
            <Dialog
              open={nameEditOpen}
              onClose={() => setNameEditOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Edit name</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    First name
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%" }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your first name"
                  value={fnameValue}
                  onChange={(e) => setFnameValue(e.target.value)}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Last name
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%" }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your last name"
                  value={lnameValue}
                  onChange={(e) => setLnameValue(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handleNameUpdate}
                  disabled={!fnameValue || !lnameValue}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={usernameEditOpen}
              onClose={() => setUsernameEditOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Edit Username</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Username
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your username"
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  error={userError}
                  helperText={userError ? "Username already exists" : ""}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handleUsernameUpdate}
                  disabled={!userValue}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={mailEditOpen}
              onClose={() => setMailEditOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Edit Email</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Email
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your mail"
                  value={mailValue}
                  onChange={(e) => setMailValue(e.target.value)}
                  error={mailError}
                  helperText={mailError ? "Invalid mail id" : ""}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handleEmailUpdate}
                  disabled={!mailValue}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={passwordEditOpen}
              onClose={() => setPasswordEditOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Change password</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Password
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your password"
                  value={passValue}
                  onChange={(e) => setPassValue(e.target.value)}
                  error={passError}
                  helperText={passError ? "wrong password" : ""}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    New Password
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your new password"
                  value={newPassValue}
                  onChange={(e) => setNewPassValue(e.target.value)}
                  error={newPassError}
                  helperText={newPassError ? newPassErrorMsg : ""}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Confirm New Password
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Confirm your password"
                  value={cpassValue}
                  onChange={(e) => setCpassValue(e.target.value)}
                  error={cpassError}
                  helperText={cpassError ? "password didnt match" : ""}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handlePasswordUpdate}
                  disabled={!passValue || !newPassValue || !cpassValue}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={phonenumberAddOpen}
              onClose={() => setPhonenumberAddOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Add Phonenumber</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Phonenumber
                  </Typography>
                </FormHelperText>
                <TextField
                  type="number"
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your Mobilenumber"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  // disabled={!newPhoneNumber}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handleAddNumber}
                  disabled={!newPhoneNumber || newPhoneNumber == 0}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={phonenumberEditOpen}
              onClose={() => setPhonenumberEditOpen(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Update Phonenumber</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Phonenumber
                  </Typography>
                </FormHelperText>
                <TextField
                  type="number"
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your Mobilenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  // disabled={!newPhoneNumber}
                />
              </DialogContent>
              <DialogActions>
                <Button className="text-capitalize py-1">cancel</Button>
                <Button
                  variant="contained"
                  className="text-capitalize py-1"
                  onClick={handleEditNumber}
                  disabled={!phoneNumber || phoneNumber === 0}
                >
                  save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
    // </Account>
  );
};

export default ManageAccount;
