import { Button, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./Reviews.css";
import { useNavigate, useParams } from "react-router-dom";
import { ApiServices } from "../../../api/api";
import EmptyComponent from "../../EmptyComponent";

const Reviews = ({ item }) => {
  const navigate = useNavigate();
  const [myReviews, setMyReviews] = useState([]);
  // const [rating, setRating] = useState(0);
  const [rating, setRating] = useState(3.5); // Initialize state
  const [ratingData, setRatingData] = useState([]);

  const getProductReviews = () => {
    var json = {
      Id: item?._id,
    };
    ApiServices.GetProductReviews(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setMyReviews(res.itemReviews);
        setRating(res.rating);
        setRatingData(res.ratingData);
      }
    });
  };

  useEffect(() => {
    getProductReviews();
  }, [item?._id]);

  const addLike = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.AddReviewLike(json).then((res) => {
      console.log(res);
      getProductReviews();
    });
  };
  const addDisLike = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.AddReviewDisLike(json).then((res) => {
      console.log(res);
      getProductReviews();
    });
  };
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
          <Typography variant="h4">{rating || 0}</Typography>
          <Rating
            name="half-rating-read"
            value={rating} // Controlled component
            precision={0.5}
            readOnly
          />

          <Typography variant="body">
            {item?.ratings?.length} ratings
          </Typography>
        </div>
        <div className="w-100 ">
          {ratingData?.map((data) => (
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
                  style={{
                    width: `${data.percentage}%`,
                  }}
                ></div>
              </div>
              <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                ({data.count})
              </p>
            </div>
          ))}
        </div>
      </div>
      <Typography variant="h6" className="mt-3">
        All reviews ({myReviews?.length || 0} reviews)
      </Typography>
      {myReviews?.length > 0 ? (
        myReviews?.map((data, index) => (
          <div className="reviews-container" key={data._id}>
            <div className="d-flex gap-2 align-items-center reviews-head">
              <div className="rating_chip">
                {data.rating}
                <StarIcon fontSize="1rem" />
              </div>
              <div>
                <Typography variant="body">{data.review_title}</Typography>
              </div>
            </div>
            {data.review_images?.length > 0 && (
              <div className="d-flex gap-2" style={{ marginBottom: "12px" }}>
                {data.review_images?.map((img) => (
                  <img src={img.URL} key={img.URL} width={62} alt="main_img" />
                ))}
              </div>
            )}
            <span className="d-block reviews-body">{data.review_body}</span>
            <div>
              <div className="d-flex justify-content-between reviewer">
                <div className="d-flex gap-2 align-items-center ">
                  <p className="mb-0" style={{ fontWeight: "500" }}>
                    {data.user.username}
                  </p>
                  <p className="mb-0">
                    {new Date(data.review_date).toString().slice(4, 15)}
                  </p>
                </div>
                <div>
                  <Button
                    startIcon={<ThumbUpIcon style={{ fontSize: "12px" }} />}
                    style={{ fontSize: "12px" }}
                    onClick={() => addLike(data._id)}
                  >
                    {data.likes.length}
                  </Button>
                  <Button
                    startIcon={<ThumbDownIcon style={{ fontSize: "12px" }} />}
                    style={{ fontSize: "12px" }}
                    color="error"
                    onClick={() => addDisLike(data._id)}
                  >
                    {data.dislikes.length}
                  </Button>
                </div>
              </div>
              <span className="reviewer-certificate d-flex align-items-center gap-2">
                <VerifiedIcon fontSize="small" /> Certified Buyer, Madurai
              </span>
            </div>
            {index === myReviews.length - 1 && (
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
        ))
      ) : (
        <EmptyComponent
          height="200px"
          text="No reviews posted. Add yours now!"
        />
      )}
    </div>
  );
};

export default Reviews;
