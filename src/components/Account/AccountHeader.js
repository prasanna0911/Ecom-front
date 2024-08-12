import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Breadcrumbs, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountHeader = ({ head, breadcrumb }) => {
  const navigate = useNavigate();
  return (
    <Box className="w-100 d-flex align-items-start mb-3">
      <IconButton onClick={() => navigate("/account/me")}>
        <ArrowBackIosIcon />
      </IconButton>
      <div>
        <Typography variant="h6">{head}</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/account/me"
            fontSize="small"
          >
            Account
          </Link>
          <Link underline="hover" color="inherit" fontSize="small">
            {breadcrumb}
          </Link>
        </Breadcrumbs>
      </div>
    </Box>
  );
};

export default AccountHeader;
