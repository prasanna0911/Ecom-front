import React from "react";
import "./Policy.css";
import { Card, CardContent, Typography } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Policy = () => {
  const PolicyData = [
    {
      icon: <CurrencyExchangeIcon style={{ fontSize: "4rem" }} />,
      name: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
    },
    {
      icon: <HeadsetMicIcon style={{ fontSize: "4rem" }} />,
      name: "7 Days Return Policy",
      description: "We provided 7 days free return policy",
    },
    {
      icon: <CheckCircleOutlineIcon style={{ fontSize: "4rem" }} />,
      name: "Best Customer Service",
      description: "We provided customer support",
    },
  ];

  return (
    <div className="policy_container d-flex flex-column align-items-center py-4 rounded-4">
      <h3>Our Policy</h3>
      <div className="policy__header__line"></div>
      <div className="d-flex justify-content-center  gap-4 flex-wrap">
        {PolicyData.map((data, index) => (
          <Card className="shadow-none policy_card flex-grow" key={index}>
            <CardContent className="d-flex flex-column align-items-center h-100">
              <p>{data.icon}</p>
              <Typography variant="body" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="caption" className="text-center text-muted">
                {data.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Policy;
