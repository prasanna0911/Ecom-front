import { Button, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./Reviews.css";
import { useNavigate } from "react-router-dom";
import { ApiServices } from "../../../api/api";

const Reviews = ({ item }) => {
  const navigate = useNavigate();

  const getProductReviews = () => {
    var json = {
      Id: item?._id,
    };
    ApiServices.GetProductReviews(json).then((res) => {
      console.log("res", res);
    });
  };

  useEffect(() => {
    getProductReviews();
  }, []);
  const ratingData = [
    { id: 1, rating: 5, percentage: "75%", color: "bg-success" },
    { id: 2, rating: 4, percentage: "45%", color: "bg-success" },
    { id: 3, rating: 3, percentage: "35%", color: "bg-success" },
    { id: 4, rating: 2, percentage: "25%", color: "bg-warning" },
    { id: 5, rating: 1, percentage: "15%", color: "bg-danger" },
  ];
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <Typography variant="h6">Customers ratings & reviews</Typography>
        <Button
          variant="contained"
          size="small"
          className="px-3"
          onClick={() => navigate(`/ratingsandreviews/${item?._id}`)}
        >
          Rate Product
        </Button>
      </div>
      <div className="d-flex align-items-center gap-3 py-4">
        <div className="d-flex flex-column align-items-center gap-1">
          <Typography variant="h4">4.5</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />

          <Typography variant="body">546 ratings</Typography>
        </div>
        <div className="w-100 ">
          {ratingData.map((data) => (
            <div className="d-flex gap-2 align-items-center" key={data.id}>
              <span
                className="d-flex align-items-center"
                style={{ fontSize: "14px", gap: "2px" }}
              >
                {data.rating} <StarRateIcon style={{ fontSize: "14px" }} />
              </span>
              <div className="progress w-100" style={{ height: "6px" }}>
                <div
                  className={`progress-bar ${data.color}`}
                  role="progressbar"
                  style={{ width: data.percentage }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Typography variant="h6" className="mt-3">
        All reviews (21 reviews)
      </Typography>
      {[1, 2, 3].map((data, index) => (
        <div className="reviews-container" key={data}>
          <div className="d-flex gap-2 align-items-center reviews-head">
            <div className="rating_chip">
              4.1
              <StarIcon fontSize="1rem" />
            </div>
            <div>
              <Typography variant="body">
                Good product and the delivery time was quick worth buying
              </Typography>
            </div>
          </div>
          <div className="d-flex gap-2" style={{ marginBottom: "12px" }}>
            <img src={item.image[0].URL} width={62} alt="main_img" />
            <img src={item.image[1].URL} width={62} alt="main_img" />
            {item.image[2]?.URL && (
              <img src={item.image[2].URL} width={62} alt="main_img" />
            )}
          </div>
          <span className="d-block reviews-body">
            Original Earphones With Remote Note Enjoy your music and calls with
            our one of the most luxurious earphones in the international market.
            Introducing its elegant Luxury Flexgrip connection prevents cable
            damage Perfect headset for disturbance less experience Maximum
            comfort and super performance Excellent for interactive games
            Compatible with All 3.5 mm audio jack devices, Speaker size: 13mm
          </span>
          <div>
            <div className="d-flex justify-content-between reviewer">
              <div className="d-flex gap-2 align-items-center ">
                <p className="mb-0" style={{ fontWeight: "500" }}>
                  Prasanna
                </p>
                <p className="mb-0">Feb 2024</p>
              </div>
              <div>
                <Button
                  startIcon={<ThumbUpIcon style={{ fontSize: "12px" }} />}
                  style={{ fontSize: "12px" }}
                >
                  414
                </Button>
                <Button
                  startIcon={<ThumbDownIcon style={{ fontSize: "12px" }} />}
                  style={{ fontSize: "12px" }}
                  color="error"
                >
                  216
                </Button>
              </div>
            </div>
            <span className="reviewer-certificate d-flex align-items-center gap-2">
              <VerifiedIcon fontSize="small" /> Certified Buyer, Madurai
            </span>
          </div>
          {index === 2 && (
            <Button
              className="rounded-pill"
              style={{ marginTop: "16px" }}
              // variant="outlined"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => navigate(`/allreviews/${item._id}`)}
            >
              All 1399 reviews
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
