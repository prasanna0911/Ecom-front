import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import React from "react";

const SuccessDialog = ({
  open,
  onCloseFunction,
  dialogTitle,
  dialogContent,
  buttonText,
  btnClick,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={onCloseFunction}
      //   style={{ maxWidth: "200px" }}
    >
      <DialogContent className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
          width={100}
          className="animated-svg"
        >
          <circle
            className="path circle"
            fill="none"
            stroke="#198754"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            className="path check"
            fill="none"
            stroke="#198754"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5"
          />
        </svg>
        <h5 className="mt-3 mb-2" style={{ color: "var(--success-color)" }}>
          {dialogTitle}
        </h5>
        {dialogContent && (
          <h6
            className="text-muted"
            style={{ fontSize: "14px", marginBottom: "0.75rem" }}
          >
            {dialogContent}
          </h6>
        )}
        <Button variant="contained" color="success" onClick={btnClick}>
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
