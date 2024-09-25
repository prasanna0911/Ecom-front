import { Link, useNavigate } from "react-router-dom";
import "./RegisterCard.css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { ApiServices } from "../../../api/api";

const RegisterCard = () => {
  const [mailValue, setMailValue] = useState("");
  const [mailError, setMailError] = useState(false);
  const [fnameValue, setFnameValue] = useState("");
  const [fnameError, setFnameError] = useState(false);
  const [lnameValue, setLnameValue] = useState("");
  const [lnameError, setLnameError] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [cpassValue, setCpassValue] = useState("");
  const [cpassError, setCpassError] = useState(false);
  const [cpassErrorMsg, setCpassErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setFnameError(false);
    setLnameError(false);
    setMailError(false);
    setPassError(false);
    setCpassError(false);
    setUsernameError(false);
    setUsernameErrorMsg("");
    if (!fnameValue) {
      setFnameError(true);
      return;
    } else if (!lnameValue) {
      setLnameError(true);
      return;
    } else if (!mailValue) {
      setMailError(true);
      return;
    } else if (!passValue) {
      setPassError(true);
      setPassErrorMsg("Password cannot be empty");
      return;
    } else if (passValue.length < 8) {
      setPassError(true);
      setPassErrorMsg("Password must contain atleast 8 charecters");
      return;
    } else if (!cpassValue) {
      setCpassError(true);
      setCpassErrorMsg("Password cannot be empty");
      return;
    } else if (passValue !== cpassValue) {
      setCpassError(true);
      setCpassErrorMsg("Password didn't match");
      return;
    } else {
      var json = {
        FirstName: fnameValue,
        LastName: lnameValue,
        Username: usernameValue,
        Email: mailValue,
        Password: passValue,
      };
      console.log("json", json);

      ApiServices.signup(json).then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          if (res.success) {
            alert(res.message);
            navigate("/account/login");
          } else {
            setUsernameError(true);
            setUsernameErrorMsg(res.message);
          }
        }
      });
      console.log("Login Success");
    }
  };

  return (
    <Card sx={{ maxWidth: 450 }} className="px-2 w-100">
      <CardHeader
        title={
          <div className="d-flex flex-column gap-1 align-items-center">
            <h4 className="mb-0">Sign Up</h4>
            <p className="mb-0 text-muted" style={{ fontSize: "17px" }}>
              Create your account
            </p>
          </div>
        }
      />
      <CardContent className="pt-0">
        <FormHelperText>
          <Typography variant="subtitle1" gutterBottom>
            First name
          </Typography>
        </FormHelperText>
        <TextField
          style={{ width: "100%", maxWidth: 500 }}
          id="fullWidth"
          variant="outlined"
          className="w-100 mb-2"
          placeholder="Enter your first name"
          value={fnameValue}
          onChange={(e) => setFnameValue(e.target.value)}
          error={fnameError}
          helperText={fnameError ? "First name cannot be empty" : ""}
        />
        <FormHelperText>
          <Typography variant="subtitle1" gutterBottom>
            Last name
          </Typography>
        </FormHelperText>
        <TextField
          style={{ width: "100%", maxWidth: 500 }}
          id="fullWidth"
          variant="outlined"
          className="w-100 mb-2"
          placeholder="Enter your last name"
          value={lnameValue}
          onChange={(e) => setLnameValue(e.target.value)}
          error={lnameError}
          helperText={lnameError ? "Last name cannot be empty" : ""}
        />
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
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          error={usernameError}
          helperText={usernameError ? usernameErrorMsg : ""}
        />
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
          helperText={mailError ? "Email cannot be empty" : ""}
        />
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
          helperText={passError ? passErrorMsg : ""}
        />
        <FormHelperText>
          <Typography variant="subtitle1" gutterBottom>
            Confirm Password
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
          helperText={cpassError ? cpassErrorMsg : ""}
        />
        <div className="register__button__container mt-4 mb-2">
          <button className="register__button" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
        <Divider>or</Divider>
        <Button
          startIcon={<GoogleIcon />}
          variant="contained"
          // style={{ backgroundColor: "grey" }}
          className="text-center mx-auto py-2 my-2 w-100"
        >
          Sign up with google
        </Button>
        <div className="register__other__actions">
          <div className="register__login__account text-center mb-2">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
