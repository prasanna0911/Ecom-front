import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import { useMyContext } from "../../Context/MyContext";
import AccountHeader from "./AccountHeader";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import Star from "@mui/icons-material/Star";

const MyReviews = () => {
  const { MobileScreen } = useMyContext();
  const [myReview, setMyReview] = useState([]);

  useEffect(() => {
    axios
      .get("https://shema-backend.vercel.app/api/items")
      .then((res) => {
        setMyReview(res.data.filter((item) => item.category === "men"));
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: MobileScreen ? "none" : "20px" }}>
      {!MobileScreen && (
        <AccountHeader
          head="My Reviews & ratings"
          breadcrumb="My Reviews & ratings"
        />
      )}

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
              className="p-2 pt-4 pb-0 d-flex align-items-start gap-0 gap-md-4 flex-column flex-md-row"
              style={{
                borderBottom:
                  index !== myReview.length - 1 ? "1px solid #ddd" : "none",
              }}
              key={item._id}
            >
              <div className="border rounded-3 d-flex flex-row flex-md-column align-items-center  review-product gap-3">
                <img
                  src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
                  // width={160}
                  className="review-img"
                  alt="main_img"
                />
                <div className="p-2">
                  <div className="product__name">{item.name}</div>
                  <div className="product__description">
                    <span>{item.description?.slice(0, 25)}...</span>
                  </div>
                  <div className="d-flex gap-2 mb-2">
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
                          4.1 <Star fontSize="1rem" />
                        </Box>
                      }
                    />
                    <span style={{ fontSize: "small" }}>(1,453)</span>
                  </div>
                </div>
              </div>
              <div className="reviews-container border-0">
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
                  <img
                    src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[0].filename}`}
                    width={62}
                    alt="main_img"
                  />
                  <img
                    src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
                    width={62}
                    alt="main_img"
                  />
                  {item.image[2]?.filename && (
                    <img
                      src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[2]?.filename}`}
                      width={62}
                      alt="main_img"
                    />
                  )}
                </div>
                <span className="d-block reviews-body">
                  Original Earphones With Remote Note Enjoy your music and calls
                  with our one of the most luxurious earphones in the
                  international market. Introducing its elegant Luxury Flexgrip
                  connection prevents cable damage Perfect headset for
                  disturbance less experience Maximum comfort and super
                  performance Excellent for interactive games Compatible with
                  All 3.5 mm audio jack devices, Speaker size: 13mm
                </span>
                <div>
                  <div className="d-flex justify-content-between reviewer">
                    {/* <div className="d-flex gap-2 align-items-center ">
                        <p className="mb-0" style={{ fontWeight: "500" }}>
                          Prasanna
                        </p>
                        <p className="mb-0">Feb 2024</p>
                      </div> */}
                    <div>
                      <Button
                        startIcon={<ThumbUpIcon style={{ fontSize: "12px" }} />}
                        style={{ fontSize: "12px" }}
                      >
                        414
                      </Button>
                      <Button
                        startIcon={
                          <ThumbDownIcon style={{ fontSize: "12px" }} />
                        }
                        style={{ fontSize: "12px" }}
                        color="error"
                      >
                        216
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <Dialog
              open={newAddressDialog}
              onClose={() => setNewAddressDialog(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <Typography variant="h5">Add new address</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    name
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your address name"
                  value={newAddressName}
                  onChange={(e) => setNewAddressName(e.target.value)}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Address Line1
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter address Line1"
                  value={newAddressLine1}
                  onChange={(e) => setNewAddressLine1(e.target.value)}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Address Line2
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter address Line2"
                  value={newAddressLine2}
                  onChange={(e) => setNewAddressLine2(e.target.value)}
                />
                <Row>
                  <Col md="6" sm="6" xs="12">
                    <FormHelperText>
                      <Typography variant="subtitle1" gutterBottom>
                        City
                      </Typography>
                    </FormHelperText>
                    <TextField
                      id="fullWidth"
                      variant="outlined"
                      className="w-100 mb-2"
                      placeholder="Enter your City"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    />
                  </Col>
                  <Col md="6" sm="6" xs="12">
                    <FormHelperText>
                      <Typography variant="subtitle1" gutterBottom>
                        ZipCode
                      </Typography>
                    </FormHelperText>
                    <TextField
                      id="fullWidth"
                      variant="outlined"
                      className="w-100 mb-2"
                      placeholder="enter your ZipCode"
                      value={newZipCode}
                      onChange={(e) => setNewZipCode(e.target.value)}
                    />
                  </Col>
                </Row>

                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    State
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%" }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your State"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPrimary}
                      onChange={() => setIsPrimary((prev) => !prev)}
                    />
                  }
                  label="Set as primary address"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained">Create</Button>
                <Button onClick={() => setNewAddressDialog(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={addressDialog}
              onClose={() => setAddressDialog(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <Typography variant="h5">Edit address</Typography>
              </DialogTitle>
              <DialogContent>
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    name
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your address name"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Address Line1
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter address Line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    Address Line2
                  </Typography>
                </FormHelperText>
                <TextField
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter address Line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
                <Row>
                  <Col md="6" sm="6" xs="12">
                    <FormHelperText>
                      <Typography variant="subtitle1" gutterBottom>
                        City
                      </Typography>
                    </FormHelperText>
                    <TextField
                      id="fullWidth"
                      variant="outlined"
                      className="w-100 mb-2"
                      placeholder="Enter your City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Col>
                  <Col md="6" sm="6" xs="12">
                    <FormHelperText>
                      <Typography variant="subtitle1" gutterBottom>
                        ZipCode
                      </Typography>
                    </FormHelperText>
                    <TextField
                      id="fullWidth"
                      variant="outlined"
                      className="w-100 mb-2"
                      placeholder="enter your ZipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </Col>
                </Row>

                <FormHelperText>
                  <Typography variant="subtitle1" gutterBottom>
                    State
                  </Typography>
                </FormHelperText>
                <TextField
                  style={{ width: "100%" }}
                  id="fullWidth"
                  variant="outlined"
                  className="w-100 mb-2"
                  placeholder="Enter your State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained">Create</Button>
                <Button onClick={() => setAddressDialog(false)}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={addressDelete}
              onClose={() => setAddressDelete(false)}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>
                <Typography variant="h5">Confirm deletion?</Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1">
                  Are you sure you want to delete this address ?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="error">
                  Delete
                </Button>
                <Button onClick={() => setAddressDelete(false)}>Cancel</Button>
              </DialogActions>
            </Dialog> */}
          {/* </Row> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReviews;
