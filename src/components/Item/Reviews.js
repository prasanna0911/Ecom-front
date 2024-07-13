import { Avatar, Box, Button, Chip, Rating, Typography } from "@mui/material";
import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Reviews = ({ item }) => {
  console.log(item);
  return (
    <div className="mt-3">
      <Typography variant="h6">Customers ratings & reviews</Typography>
      <div>
        <div className="d-flex flex-column">
          <Typography variant="h4">4.5</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />

          <Typography variant="body">546 ratings</Typography>
        </div>
        <div className="mt-3">
          <div className="d-flex gap-2 align-items-center">
            <span className="d-flex">
              5 <StarRateIcon fontSize="small" />
            </span>
            <div className="progress w-100" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "75%" }}
              ></div>
            </div>
            <span className="d-flex"></span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="d-flex">
              4 <StarRateIcon fontSize="small" />
            </span>
            <div className="progress w-100" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="d-flex">
              3 <StarRateIcon fontSize="small" />
            </span>
            <div className="progress w-100" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "55%" }}
              ></div>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="d-flex">
              2 <StarRateIcon fontSize="small" />
            </span>
            <div className="progress w-100" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: "35%" }}
              ></div>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span className="d-flex">
              1 <StarRateIcon fontSize="small" />
            </span>
            <div className="progress w-100" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: "15%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Typography variant="h6" className="my-3">
        All reviews (21 reviews)
      </Typography>
      <div className="mb-3">
        <div className="d-flex gap-2 align-items-center mb-2">
          <Avatar />
          <div>
            <p className="mb-0" style={{ fontSize: "15px" }}>
              Prasanna
            </p>
            <p className="mb-0" style={{ fontSize: "12px" }}>
              madurai
            </p>
          </div>
        </div>

        <div className="mb-3 mb-lg-0">
          <div className="d-flex mb-2 gap-2 align-items-center">
            <Chip
              color="success"
              size="small"
              label={
                <Box className="d-flex align-items-center justify-content-center gap-1">
                  4.1 <StarIcon fontSize="1rem" />
                </Box>
              }
            />
            <div>
              <Typography variant="body">
                Good product and the delivery time was quick worth buying
              </Typography>
              <Typography variant="subtitle2">3 months ago </Typography>
            </div>
          </div>
          <div className="d-flex gap-3">
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[0].filename}`}
              width={50}
              alt="main_img"
            />
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
              width={50}
              alt="main_img"
            />
            {item.image[2]?.filename && (
              <img
                src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[2]?.filename}`}
                width={50}
                alt="main_img"
              />
            )}
          </div>
          <span className="d-block mb-1">
            Original Earphones With Remote Note Enjoy your music and calls with
            our one of the most luxurious earphones in the international market.
            Introducing its elegant Luxury Flexgrip connection prevents cable
            damage Perfect headset for disturbance less experience Maximum
            comfort and super performance Excellent for interactive games
            Compatible with All 3.5 mm audio jack devices, Speaker size: 13mm
          </span>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex gap-2 align-items-center mb-2">
          <Avatar />
          <div>
            <p className="mb-0" style={{ fontSize: "15px" }}>
              Prasanna
            </p>
            <p className="mb-0" style={{ fontSize: "12px" }}>
              madurai
            </p>
          </div>
        </div>

        <div className="mb-3 mb-lg-0">
          <div className="d-flex mb-2 gap-2 align-items-center">
            <Chip
              color="success"
              size="small"
              label={
                <Box className="d-flex align-items-center justify-content-center gap-1">
                  4.1 <StarIcon fontSize="1rem" />
                </Box>
              }
            />
            <div>
              <Typography variant="body">
                Good product and the delivery time was quick worth buying
              </Typography>
              <Typography variant="subtitle2">3 months ago </Typography>
            </div>
          </div>
          <div className="d-flex gap-3">
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[0].filename}`}
              width={50}
              alt="main_img"
            />
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
              width={50}
              alt="main_img"
            />
            {item.image[2]?.filename && (
              <img
                src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[2]?.filename}`}
                width={50}
                alt="main_img"
              />
            )}
          </div>
          <span className="d-block mb-1">
            Original Earphones With Remote Note Enjoy your music and calls with
            our one of the most luxurious earphones in the international market.
            Introducing its elegant Luxury Flexgrip connection prevents cable
            damage Perfect headset for disturbance less experience Maximum
            comfort and super performance Excellent for interactive games
            Compatible with All 3.5 mm audio jack devices, Speaker size: 13mm
          </span>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex gap-2 align-items-center mb-2">
          <Avatar />
          <div>
            <p className="mb-0" style={{ fontSize: "15px" }}>
              Prasanna
            </p>
            <p className="mb-0" style={{ fontSize: "12px" }}>
              madurai
            </p>
          </div>
        </div>

        <div className="mb-3 mb-lg-0">
          <div className="d-flex mb-2 gap-2 align-items-center">
            <Chip
              color="success"
              size="small"
              label={
                <Box className="d-flex align-items-center justify-content-center gap-1">
                  4.1 <StarIcon fontSize="1rem" />
                </Box>
              }
            />
            <div>
              <Typography variant="body">
                Good product and the delivery time was quick worth buying
              </Typography>
              <Typography variant="subtitle2">3 months ago </Typography>
            </div>
          </div>
          <div className="d-flex gap-3">
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[0].filename}`}
              width={50}
              alt="main_img"
            />
            <img
              src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
              width={50}
              alt="main_img"
            />
            {item.image[2]?.filename && (
              <img
                src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[2]?.filename}`}
                width={50}
                alt="main_img"
              />
            )}
          </div>
          <span className="d-block mb-1">
            Original Earphones With Remote Note Enjoy your music and calls with
            our one of the most luxurious earphones in the international market.
            Introducing its elegant Luxury Flexgrip connection prevents cable
            damage Perfect headset for disturbance less experience Maximum
            comfort and super performance Excellent for interactive games
            Compatible with All 3.5 mm audio jack devices, Speaker size: 13mm
          </span>
        </div>
      </div>
      <Button
        className="rounded-pill"
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
      >
        View more
      </Button>
    </div>
  );
};

export default Reviews;
