import { Box, Breadcrumbs, Button, Card, CardContent, Chip, IconButton, Link, Pagination, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Star from "@mui/icons-material/Star";
import { ApiServices } from '../api/api';
import { Col, Row } from 'react-bootstrap';
import StarRateIcon from "@mui/icons-material/StarRate";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmptyComponent from '../components/EmptyComponent';


const AllReviews = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [selectedOrder, setSelectedOrder] = useState({});
    const [myReviews, setMyReviews] = useState([]);
    // const [rating, setRating] = useState(0);
    const [rating, setRating] = useState(3.5); // Initialize state
    const [ratingData, setRatingData] = useState([]);
    const getMyOrders = () => {
        ApiServices.GetAllProducts().then((res) => {
            console.log("res orders", res);
            if (res.response_code === 200) {
                setSelectedOrder(res.Data?.find(order => order._id === param.id));
            }
        });
    };

    useEffect(() => {
        getMyOrders();
        window.scrollTo(0, 0);
    }, [param]);

    const getProductReviews = () => {
        var json = {
            Id: param.id,
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
    }, []);

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
        <div className='d-flex justify-content-center align-items-center'>
            <div className='py-4 mx-2 w-100' style={{ maxWidth: '800px' }}>
                {/* <Box className="w-100 d-flex align-items-start gap-1 py-2">
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <div>
                        <h5 className='mb-0'>Ratings & Reviews</h5>
                        <Breadcrumbs aria-label="breadcrumb" className='mb-2'>
                            <Link underline="hover" color="inherit" href='/' fontSize="small">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href={`/category/${selectedOrder?.category}`}
                                fontSize="small"
                            >
                                {selectedOrder?.category}
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                // href="/account/me?tab=1"
                                fontSize="small"
                            >
                                Ratings&Reviews
                            </Link>
                            <Typography color="text.primary" fontSize="small">{param.id}</Typography>
                        </Breadcrumbs>
                    </div>
                </Box> */}
                <Card>
                    <CardContent className='px-4'>
                        <Typography variant='h5' className='mb-3'>All Ratings & Reviews</Typography>
                        <Row className='flex-row-reverse'>
                            <Col xl='12' lg='12' sm='12' xs='12'>
                                <div className="order_product_detail gap-2 flex-wrap p-3 border rounded-3 cursor-pointer" onClick={() => navigate(`/item/${selectedOrder?.category}/${selectedOrder?._id}`)}>
                                    <div className="d-flex align-items-center gap-3 ">
                                        {selectedOrder?.primaryImage?.[0]?.URL && (
                                            <img
                                                src={selectedOrder?.primaryImage?.[0]?.URL}
                                                alt={selectedOrder?.name}
                                                width={70}
                                                className="product__img"
                                            />
                                        )}
                                        <div>
                                            <h5 className="mb-1">{selectedOrder?.name}</h5>
                                            <h6 className="mb-1">
                                                {selectedOrder?.description}
                                            </h6>
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
                                                            {selectedOrder?.ratings?.reduce((acc, rating) => {
                                                                return acc + rating.rating;
                                                            }, 0) / selectedOrder?.ratings?.length || 0}<Star fontSize="1rem" />
                                                        </Box>
                                                    }
                                                />
                                                <span style={{ fontSize: "small" }}>(1,453)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <div className="mt-3">
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
                                            {selectedOrder?.ratings?.length} ratings
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
                                    All reviews (21 reviews)
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
                                        </div>
                                    ))
                                ) : (
                                    <EmptyComponent
                                        height="200px"
                                        text="No reviews posted. Add yours now!"
                                    />
                                )}
                                <Stack justifyContent='center' alignItems='center' marginTop='20px'>
                                    <Pagination count={10} />
                                </Stack>
                            </div>
                        </Row>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default AllReviews