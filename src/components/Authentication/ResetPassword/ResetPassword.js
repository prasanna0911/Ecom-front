import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiServices } from "../../../api/api";
import RestoreIcon from "@mui/icons-material/Restore";

const ResetPassword = () => {
  const [passValue, setPassValue] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [cpassValue, setCpassValue] = useState("");
  const [cpassError, setCpassError] = useState(false);
  const [cpassErrorMsg, setCpassErrorMsg] = useState("");
  const [newToken, setNewToken] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setNewToken(token);
    }
  }, []);

  const handleResetPassword = () => {
    setPassError(false);
    setPassErrorMsg("");
    setCpassError(false);
    setCpassErrorMsg("");
    if (!passValue) {
      setPassError(true);
      setPassErrorMsg("Password cannot be empty");
      return;
    } else if (!cpassValue) {
      setCpassError(true);
      setCpassErrorMsg("Confirm password cannot be empty");
      return;
    } else if (passValue.length < 8) {
      setPassError(true);
      setPassErrorMsg("Password must contain atleast 8 charecters");
      return;
    } else if (passValue !== cpassValue) {
      setCpassError(true);
      setCpassErrorMsg("password did't match");
      return;
    } else {
      var json = {
        token: newToken,
        Password: passValue,
      };
      console.log("json", json);
      ApiServices.ResetPassword(json).then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          navigate("/account/login");
          toast.success("password reset successfully");
        } else if (res.response_code === 401) {
          setErrorText("Your Session has expired please try again later");
          setErrorOpen(true);
        }
      });
    }
  };
  return (
    <div className="forget__auth__container">
      <div className="forget__auth">
        <Card sx={{ maxWidth: 450 }} className="px-3 pt-3 w-100">
          <CardHeader
            title={
              <div className="d-flex flex-column gap-1 align-items-center">
                <h4 className="mb-0">Password Reset</h4>
                <p
                  className="mb-0 text-muted text-center"
                  style={{ fontSize: "15px" }}
                >
                  {/* Sign in to your Shopsy account and start shopping! */}
                  Time to secure your account with a new password
                </p>
              </div>
            }
          />
          <CardContent className="pt-0">
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
              placeholder="Enter new password"
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

            <div className="login__button__container my-2">
              <button className="login__button" onClick={handleResetPassword}>
                Reset
              </button>
            </div>
          </CardContent>
        </Card>
        <Dialog fullWidth maxWidth="xs" open={errorOpen}>
          <DialogTitle>
            <h5>Session Expired</h5>
          </DialogTitle>
          <DialogContent className="text-center">
            <RestoreIcon style={{ fontSize: "150px" }} />
            <h6 className="text-center">{errorText}</h6>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/auth/forget-password")}
            >
              Try Again
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResetPassword;
