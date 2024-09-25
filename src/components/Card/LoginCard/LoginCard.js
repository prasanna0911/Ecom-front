import { useNavigate } from "react-router-dom";
import "./LoginCard.css";
import {
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ApiServices } from "../../../api/api";
import { useMyContext } from "../../../Context/MyContext";

const LoginCard = () => {
  const [userValue, setUserValue] = useState("");
  const [mailError, setMailError] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const navigate = useNavigate();

  const { setIsLogin } = useMyContext();

  const handleSubmit = () => {
    setMailError(false);
    setPassError(false);
    if (!userValue) {
      setMailError(true);
      return;
    } else if (!passValue) {
      setPassError(true);
      setPassErrorMsg("Password cannot be empty");
      return;
    } else {
      var json = {
        Username: userValue,
        Password: passValue,
      };
      ApiServices.Login(json).then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          localStorage.setItem("token", res.token);
          setIsLogin(true);
          alert("login successfully");
          window.location.replace("/account/me");
        } else {
          alert(res.message);
        }
      });
      console.log("Login Success");
    }
  };

  return (
    <Card sx={{ maxWidth: 450 }} className="px-3 pt-3 w-100">
      <CardHeader
        title={
          <div className="d-flex flex-column gap-1 align-items-center">
            <h4 className="mb-0">Login</h4>
            <p className="mb-0 text-muted" style={{ fontSize: "17px" }}>
              {/* Sign in to your Shopsy account and start shopping! */}
              Sign in to access your Shopsy account
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
          error={mailError}
          helperText={mailError ? "Username cannot be empty" : ""}
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
        <div
          className="login__forgot__password text-end"
          onClick={() => navigate("/auth/forget-password")}
        >
          Forgot password?
        </div>
        <div className="login__button__container my-2">
          <button className="login__button" onClick={handleSubmit}>
            Login
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
  );
};

export default LoginCard;
