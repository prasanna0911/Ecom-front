import { Alert, Box, Breadcrumbs, Button, Card, CardContent, Chip, Divider, FormHelperText, IconButton, Link, Rating, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Star from "@mui/icons-material/Star";
import { ApiServices } from '../api/api';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';


const RatingsAndReviews = () => {
    const param = useParams()
    const navigate = useNavigate()
    const [selectedOrder, setSelectedOrder] = useState({});
    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [rating, setRating] = useState(0)
    const [ratingText, setRatingText] = useState('')
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

    useEffect(() => {
        switch (rating) {
            case 5:
                setRatingText('Excellent')
                break;
            case 4:
                setRatingText('Very Good')
                break;
            case 3:
                setRatingText('Good')
                break;
            case 2:
                setRatingText('Bad')
                break;
            case 1:
                setRatingText('Very Bad')
                break;

            default:
                setRatingText('')
                break;
        }
    }, [rating])

    const handleRatingsSubmit = (newValue) => {
        var json = {
            Id: param.id,
            Rating: newValue
        }
        ApiServices.AddRating(json).then(res => {
            console.log('res', res)
            if (res.response_code === 200) {
                toast.success('Your rating has been saved')
            }
        })
        // setSnackOpen(true);
    }

    const handleSubmit = () => {
        var json = {
            Id: param.id,
            ReviewTitle: reviewTitle,
            ReviewBody: reviewBody
        }
        console.log('json', json)
        ApiServices.AddReview(json).then(res => {
            console.log('res', res)
            if (res.response_code === 200) {
                toast.success('Your review has been saved')
            }
        })
    }

    const [snackopen, setSnackOpen] = React.useState(false);
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };


    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='py-4 mx-5 w-100' style={{ maxWidth: '700px' }}>
                <Box className="w-100 d-flex align-items-start gap-1 py-2">
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
                                href={`/category/${selectedOrder.category}`}
                                fontSize="small"
                            >
                                {selectedOrder.category}
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
                </Box>
                <Card>
                    <CardContent className='px-4'>
                        <Typography variant='h5'>Ratings & Reviews</Typography>
                        <Row className='flex-row-reverse'>
                            <Col xl='12' lg='4' sm='12' xs='12'>
                                <div className="order_product_detail gap-2 flex-wrap p-3 border rounded-3 my-4">
                                    <div className="d-flex align-items-center gap-3 ">
                                        {selectedOrder?.primaryImage?.[0]?.URL && (
                                            <img
                                                src={selectedOrder?.primaryImage?.[0]?.URL}
                                                alt={selectedOrder?.name}
                                                width={70}
                                                className="product__img"
                                            />
                                        )}
                                        <div className='cursor-pointer' onClick={() => navigate(`/item/${selectedOrder?.category}/${selectedOrder?._id}`)}>
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
                                                            4.1 <Star fontSize="1rem" />
                                                        </Box>
                                                    }
                                                />
                                                <span style={{ fontSize: "small" }}>(1,453)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col xl='12' lg='8' sm='12' xs='12'>
                                <div>
                                    <Typography variant='h6' className='my-2'>Rating</Typography>
                                    <div className='d-flex gap-2'>
                                        <Rating value={rating}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                                if (newValue) {
                                                    handleRatingsSubmit(newValue)
                                                }
                                            }} />
                                        <p>{ratingText}</p>
                                    </div>
                                </div>
                                <Divider />
                                <div>
                                    <Typography variant='h6' className='my-2'>Review</Typography>
                                    <FormHelperText>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Title
                                        </Typography>
                                    </FormHelperText>
                                    <TextField
                                        id="fullWidth"
                                        variant="outlined"
                                        className="w-100 mb-2"
                                        placeholder="Review Title..."
                                        value={reviewTitle}
                                        onChange={(e) => setReviewTitle(e.target.value)}
                                    />
                                    <FormHelperText>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Description
                                        </Typography>
                                    </FormHelperText>
                                    <TextField
                                        id="fullWidth"
                                        variant="outlined"
                                        className="w-100 mb-2"
                                        multiline
                                        minRows={6}
                                        // maxRows={8}
                                        placeholder="Review Description..."
                                        value={reviewBody}
                                        onChange={(e) => setReviewBody(e.target.value)}
                                    />
                                    <Stack direction='row' gap={1} justifyContent='end' marginTop={1}>
                                        <Button variant='contained' disabled={!reviewTitle || !reviewBody} onClick={() => handleSubmit()}>Submit</Button>
                                        <Button variant='outlined'>cancel</Button>
                                    </Stack>
                                    <Snackbar open={snackopen} autoHideDuration={2000} onClose={handleSnackClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                                        <Alert
                                            onClose={handleSnackClose}
                                            severity="success"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            Your rating has been saved
                                        </Alert>
                                    </Snackbar>
                                </div>
                            </Col>
                        </Row>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default RatingsAndReviews