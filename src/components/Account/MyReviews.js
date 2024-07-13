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
        <CardContent>
          {myReview.map((item, index) => (
            <Row
              className="mt-4 p-2"
              style={{
                borderBottom:
                  index !== myReview.length - 1 ? "1px solid #ddd" : "none",
              }}
            >
              <Col lg={3} md={3} xs={12} className="mb-4 mb-lg-0">
                <img
                  src={`https://shema-backend.vercel.app/public/${item.category}/${item.image[1].filename}`}
                  width="100%"
                  alt="main_img"
                />
              </Col>
              <Col lg={9} md={9} xs={12} className="mb-4 mb-lg-0">
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

                    <Typography variant="h6">Review heading </Typography>
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
                    Original Earphones With Remote Note Enjoy your music and
                    calls with our one of the most luxurious earphones in the
                    international market. Introducing its elegant Luxury
                    Flexgrip connection prevents cable damage Perfect headset
                    for disturbance less experience Maximum comfort and super
                    performance Excellent for interactive games Compatible with
                    All 3.5 mm audio jack devices, Speaker size: 13mm
                  </span>
                </div>
              </Col>
            </Row>
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
