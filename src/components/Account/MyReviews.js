import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useMyContext } from "../../Context/MyContext";
import AccountHeader from "./AccountHeader";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Star from "@mui/icons-material/Star";
import { ApiServices } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { DecimalFormatter } from "../../utils/DecimalFormatter";
import Loader from "../../utils/Loader";

const MyReviews = () => {
  const { MobileScreen } = useMyContext();
  const [myReview, setMyReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GetMyReviews = () => {
    setLoading(true);
    ApiServices.GetMyReviews()
      .then((res) => {
        console.log("myreviews res", res);
        if (res.response_code === 200) {
          setMyReview(res.myReviews);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    GetMyReviews();
  }, []);

  const addLike = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.AddReviewLike(json).then((res) => {
      console.log(res);
      GetMyReviews();
    });
  };
  const addDisLike = (id) => {
    var json = {
      Id: id,
    };
    ApiServices.AddReviewDisLike(json).then((res) => {
      console.log(res);
      GetMyReviews();
    });
  };

  return (
    <div style={{ padding: MobileScreen ? "none" : "10px" }}>
      {!MobileScreen && (
        <AccountHeader
          head="My Reviews & ratings"
          breadcrumb="My Reviews & ratings"
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <CardHeader
            className="border-bottom"
            title={
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">My Reviews</h4>{" "}
              </div>
            }
          />
          <CardContent className="py-0">
            {myReview.map((item, index) => (
              <div
                className="p-2 py-4 d-flex align-items-md-center align-items-start gap-2 gap-md-3 flex-column flex-md-row"
                style={{
                  borderBottom:
                    index !== myReview.length - 1 ? "1px solid #ddd" : "none",
                }}
                key={item._id}
              >
                <div
                  className="border rounded-3 d-flex align-items-center review-product cursor-pointer"
                  onClick={() =>
                    navigate(`/item/${item.item.category}/${item.item._id}`)
                  }
                >
                  <img
                    src={item.item.primaryImage[0].URL}
                    // width={160}
                    className="review-img"
                    alt="main_img"
                  />
                  <div className="ps-2 w-100">
                    <div className="product-name">{item.item.name}</div>
                    <div className="product-description">
                      {item.item.description?.slice(0, 25)}...
                    </div>
                    <div className="d-flex gap-2">
                      <Chip
                        color="success"
                        size="small"
                        className="rounded"
                        style={{ height: "auto" }}
                        label={
                          <Box
                            className="d-flex align-items-center justify-content-center gap-1"
                            style={{ fontSize: "small" }}
                          >
                            {DecimalFormatter(
                              item.item.ratings.reduce((acc, rating) => {
                                return acc + rating.rating;
                              }, 0) / item.item.ratings.length
                            )}
                            <Star fontSize="1rem" />
                          </Box>
                        }
                      />
                      <span style={{ fontSize: "small" }}>
                        ({item.item.ratings.length})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="reviews-container border-0 p-0">
                  <div className="d-flex gap-2 align-items-center reviews-head">
                    <div className="rating_chip">
                      <span>{item.rating}</span>
                      <StarIcon fontSize="1rem" />
                    </div>
                    <Typography variant="body">{item.review_title}</Typography>
                  </div>
                  {item.review_images.length > 0 && (
                    <div
                      className="d-flex gap-1"
                      style={{ marginBottom: "12px" }}
                    >
                      {item.review_images?.map((img) => (
                        <img src={img.URL} width={50} alt="main_img" />
                      ))}
                    </div>
                  )}
                  <span className="d-block reviews-body">
                    {item.review_body}
                  </span>
                  <div>
                    <div className="d-flex justify-content-between reviewer">
                      <div>
                        <Button
                          startIcon={
                            <ThumbUpIcon style={{ fontSize: "12px" }} />
                          }
                          style={{ fontSize: "12px" }}
                          onClick={() => addLike(item._id)}
                        >
                          {item.likes.length}
                        </Button>
                        <Button
                          startIcon={
                            <ThumbDownIcon style={{ fontSize: "12px" }} />
                          }
                          style={{ fontSize: "12px" }}
                          color="error"
                          onClick={() => addDisLike(item._id)}
                        >
                          {item.dislikes.length}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyReviews;
