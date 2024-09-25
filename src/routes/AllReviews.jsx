import { Box, Button, Card, CardContent, Chip, Pagination, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Star from "@mui/icons-material/Star";
import { ApiServices } from '../api/api';
import { Col, Row } from 'react-bootstrap';
import StarRateIcon from "@mui/icons-material/StarRate";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmptyComponent from '../components/EmptyComponent';
import { DecimalFormatter } from '../utils/DecimalFormatter';


const AllReviews = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [selectedOrder, setSelectedOrder] = useState({});
    const [myReviews, setMyReviews] = useState([]);
    const [rating, setRating] = useState(3.5);
    const [ratingData, setRatingData] = useState([]);
    const [limit, setLimit] = useState(4)
    const [totalReviews, setTotalReviews] = useState(0);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        queryParams.set("page", currentPage);
        navigate({ search: queryParams.toString() }, { replace: true });
    }, [currentPage]);

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

    const getProductReviews = (page, lim) => {
        console.log('page', page);

        var json = {
            Id: param.id,
            Page: page,
            Limit: lim,
        };
        ApiServices.GetProductReviews(json).then((res) => {
            console.log("res", res);
            if (res.response_code === 200) {
                setMyReviews(res.itemReviews);
                setRating(res.rating);
                setRatingData(res.ratingData);
                setTotalReviews(res.paginationData.length);
            }
        });
    };

    useEffect(() => {
        getProductReviews(currentPage, limit);
    }, []);

    const addLike = (id) => {
        var json = {
            Id: id,
        };
        ApiServices.AddReviewLike(json).then((res) => {
            console.log(res);
            getProductReviews(currentPage, limit);
        });
    };
    const addDisLike = (id) => {
        var json = {
            Id: id,
        };
        ApiServices.AddReviewDisLike(json).then((res) => {
            console.log(res);
            getProductReviews(currentPage, limit);
        });
    };

    const changeCPage = (e, id) => {
        getProductReviews(id, limit);
        setCurrentPage(id);
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='py-4 mx-2 w-100' style={{ maxWidth: '800px' }}>
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


                                                            {DecimalFormatter((selectedOrder?.ratings?.reduce((acc, rating) => {
                                                                return acc + rating.rating;
                                                            }, 0) / selectedOrder?.ratings?.length)) || 0}

                                                            <Star fontSize="1rem" />
                                                        </Box>
                                                    }
                                                />
                                                <span style={{ fontSize: "small" }}>({totalReviews})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div className="mt-3">
                                <div className="d-flex align-items-center gap-3 py-4">
                                    <div className="d-flex flex-column align-items-center gap-1">
                                        <Typography variant="h4">{DecimalFormatter(rating) || 0}</Typography>
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
                                    All reviews ({totalReviews} reviews)
                                </Typography>
                                {myReviews?.length > 0 ? (
                                    myReviews?.map((data) => (
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
                                <Stack spacing={2} mt={2} justifyContent='center' alignItems='center'>
                                    <Pagination
                                        count={Math.ceil(totalReviews / limit)}
                                        page={currentPage}
                                        color="primary"
                                        // size="large"
                                        onChange={changeCPage}
                                    // variant="outlined"
                                    // shape="rounded"
                                    />
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