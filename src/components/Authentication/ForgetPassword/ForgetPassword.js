import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ApiServices } from "../../../api/api";
import Clear from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

const OtpInput = ({ length, onChange, disabled, isOtpExpired }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));
      if (index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" gap={1}>
      {otp.map((_, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{ style: { textAlign: "center" } }}
          disabled={disabled}
          error={isOtpExpired}
        />
      ))}
    </Box>
  );
};

const ForgetPassword = () => {
  const [userValue, setUserValue] = useState("");
  const [userError, setUserError] = useState(false);
  const [userErrorMsg, setUserErrorMsg] = useState("");
  const [mailValue, setMailValue] = useState("");
  const [mailError, setMailError] = useState(false);
  const [mailErrorMsg, setMailErrorMsg] = useState("");
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOtpTimer = () => {
    setOtp("");
    setTimeRemaining(150);
    setTimerExpired(false);
    clearInterval();
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const handleSubmit = () => {
    setMailError(false);
    setUserError(false);
    setUserErrorMsg("");
    setMailErrorMsg("");
    if (!userValue) {
      setUserError(true);
      setUserErrorMsg("Username cannot be empty");
      return;
    } else if (!mailValue) {
      setMailError(true);
      setMailErrorMsg("email cannot be empty");
      return;
    } else {
      var json = {
        Username: userValue,
        Email: mailValue,
      };
      ApiServices.RecoverPassword(json).then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          setTimeRemaining(150);
          setIsOtpExpired(false);
          setIsDialogOpen(true);
          if (timeRemaining === 0) {
            handleOtpTimer();
          }
        } else if (res.response_code === 404) {
          setUserError(true);
          setUserErrorMsg("Invalid username");
        } else if (res.response_code === 400) {
          setMailError(true);
          setMailErrorMsg("Email didn't match");
        } else {
          console.log("Internal server error");
        }
      });
    }
  };

  const handleOtpValidate = () => {
    if (otp.length === 6 && !timerExpired) {
      setOpen(true);
      var json = {
        Otp: otp,
        Email: mailValue,
        Username: userValue,
      };

      ApiServices.OtpVerification(json).then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          setOpen(false);
          setIsOtpExpired(false);
          toast.success("otp verified successfully");
          handleCloseDialog();
          navigate(`/auth/reset-password?token=${res.token}`);
        } else {
          setIsOtpExpired(true);
          setOpen(false);
        }
      });
      alert("OTP submitted successfully!");

      // const delay = setTimeout(() => {
      //   setPopup(false);
      // }, 4000);

      //   return () => clearTimeout(delay);
    } else {
      alert("Please enter a valid 6-digit OTP or the OTP has expired.");
    }
  };

  const [popup, setPopup] = useState(false);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingTime =
      seconds >= 60
        ? `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
          }${remainingSeconds} minutes`
        : `${seconds} seconds`;
    // return `${minutes}:${
    //   remainingSeconds < 10 ? "0" : ""
    // }${remainingSeconds} minutes`;
    return remainingTime;
  };

  return (
    <div className="forget__auth__container">
      <div className="forget__auth">
        <Card sx={{ maxWidth: 450 }} className="px-3 pt-3 w-100">
          <CardHeader
            title={
              <div className="d-flex flex-column gap-1 align-items-center">
                <h4 className="mb-0">Recover Account</h4>
                <p
                  className="mb-0 text-muted text-center"
                  style={{ fontSize: "15px" }}
                >
                  {/* Sign in to your Shopsy account and start shopping! */}
                  Enter your email and username and receive a link in your inbox
                  to reset your password
                </p>
              </div>
            }
          />
          <CardContent className="pt-0">
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
              helperText={userError ? userErrorMsg : ""}
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
              placeholder="Enter your email"
              value={mailValue}
              onChange={(e) => setMailValue(e.target.value)}
              error={mailError}
              helperText={mailError ? mailErrorMsg : ""}
            />

            <div className="login__button__container my-2">
              <button className="login__button" onClick={handleSubmit}>
                Send Mail
              </button>
            </div>
            <Typography
              variant="subtitle1"
              className="mb-2 mt-2 fw-bold text-center"
              // onClick={() => location.replace("/authentication/forget-password")}
              style={{ cursor: "pointer", fontSize: "15px" }}
            >
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/account/register")}
                style={{ color: "#2222b7", cursor: "pointer" }}
              >
                Sign up
              </span>
            </Typography>
          </CardContent>
        </Card>
        <Dialog
          open={isDialogOpen}
          onClose={() => {
            setPopup(true);
            const delay = setTimeout(() => {
              setPopup(false);
            }, 1000);
            return () => clearTimeout(delay);
          }}
          fullWidth
          maxWidth="xs"
          className={popup ? "dialog-popup" : ""}
        >
          <DialogTitle className="text-center pe-1">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                style={{ flexGrow: 1, textAlign: "center" }}
              >
                Email Verification
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <Clear />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent className="text-center">
            <Typography variant="body2" gutterBottom className="mb-3">
              We sent a verification code to {mailValue} Please check your email
              and paste the code below
            </Typography>
            <OtpInput
              length={6}
              onChange={setOtp}
              disabled={timerExpired}
              isOtpExpired={isOtpExpired}
            />
            <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
              {isOtpExpired && "Invalid OTP"}
            </Typography>
            <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
              {timerExpired
                ? "OTP expired. Please request a new OTP."
                : `Time remaining: ${formatTime(timeRemaining)}`}
            </Typography>

            <Button
              variant="contained"
              className="w-100 mt-3 py-2"
              onClick={handleOtpValidate}
              disabled={timerExpired}
            >
              Submit
            </Button>
            <hr />
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Didn't receive the code?{" "}
              <span
                onClick={handleSubmit}
                style={{ color: "#004AAD", cursor: "pointer" }}
              >
                Resend
              </span>
            </Typography>
          </DialogContent>
        </Dialog>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
          className="d-flex flex-column gap-3 "
        >
          <CircularProgress color="primary" />
          <Typography color="primary" variant="h4">
            Verifying OTP....
          </Typography>
        </Backdrop>
      </div>
    </div>
  );
};

export default ForgetPassword;
