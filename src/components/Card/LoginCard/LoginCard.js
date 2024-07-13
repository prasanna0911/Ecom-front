import { Link } from "react-router-dom";
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
import { Row, Col } from "react-bootstrap";

const LoginCard = () => {
  const [mailValue, setMailValue] = useState("");
  const [mailError, setMailError] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState("");

  const handleSubmit = () => {
    setMailError(false);
    setPassError(false);
    if (!mailValue) {
      setMailError(true);
      return;
    } else if (!passValue) {
      setPassError(true);
      setPassErrorMsg("Password cannot be empty");
      return;
    } else {
      console.log("Login Success");
    }
  };

  return (
    <Card sx={{ maxWidth: 450 }} className="p-3 w-100">
      <CardHeader title={<h2>Login</h2>} />
      <CardContent>
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
        <div className="login__forgot__password text-end">Forgot password?</div>

        {/* <div className="email__input__container input__container">
            <label className="email__label input__label">Email</label>
            

            <input
              type="email"
              className="email__input login__input"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
            />
          </div> */}
        <div className="login__button__container my-2">
          <button className="login__button" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="login__other__actions">
          <div className="login__new__account text-center mb-2">
            Don't have account?{" "}
            <Link to="/account/register">Create account</Link>{" "}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
