import { Box, Breadcrumbs, Button, Card, CardContent, Chip, Divider, IconButton, Link, List, ListItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiServices } from '../api/api'
import ReceiptIcon from "@mui/icons-material/Receipt";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Order = () => {
    const param = useParams()
    const [selectedOrder, setSelectedOrder] = useState({});
    const navigate = useNavigate()



    const cancelOrder = (id) => {
        var json = {
            Id: id,
        };
        ApiServices.CancellMyOrder(json).then((res) => {
            console.log("res", res);
            if (res.response_code === 200) {

                getMyOrders();
            }
        });
    };

    const getMyOrders = () => {
        ApiServices.GetMyOrders().then((res) => {
            console.log("res orders", res);
            if (res.response_code === 200) {
                setSelectedOrder(res.my_orders?.find(order => order._id === param.id));
            }
        });
    };

    useEffect(() => {
        getMyOrders();
        window.scrollTo(0, 0);
    }, [param]);
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='py-4 mx-5 w-100' style={{ maxWidth: '900px' }}>
                <Box className="w-100 d-flex align-items-start gap-1 py-2">
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <div>
                        <h5 className='mb-0'>Order #{selectedOrder._id}</h5>
                        <Breadcrumbs aria-label="breadcrumb" className='mb-2'>
                            <Link underline="hover" color="inherit" href='/' fontSize="small">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/account/me"
                                fontSize="small"
                            >
                                My Account
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/account/me?tab=1"
                                fontSize="small"
                            >
                                My Orders
                            </Link>
                            <Typography color="text.primary" fontSize="small">{param.id}</Typography>
                        </Breadcrumbs>
                    </div>
                </Box>
                <Card>
                    <CardContent>
                        <div className='p-3 border rounded-3'>
                            <div className='d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap'>
                                <Typography variant="body1">
                                    #{selectedOrder._id}
                                </Typography>
                                <div className="d-flex gap-2">
                                    <Button variant="contained" size="small" endIcon={<GpsFixedIcon fontSize='small' />}>
                                        track order
                                    </Button>
                                    {selectedOrder?.delivery_status !== "cancelled" &&
                                        selectedOrder?.delivery_status !== "delivered" && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<CloseIcon />}
                                                onClick={() => cancelOrder(selectedOrder?._id)}
                                            >
                                                cancel order
                                            </Button>
                                        )}
                                    {selectedOrder?.delivery_status === "delivered" && (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            startIcon={<ReplyIcon />}
                                        // onClick={() => cancelOrder(selectedOrder?._id)}
                                        >
                                            return
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex gap-2 flex-wrap ">

                                {/* <Typography variant="body1" color="green">
                                Estimated delivery in {new Date().toString().slice(0, 15)}
                            </Typography> */}
                                <Chip label={`Ordered on ${new Date(selectedOrder?.order_date).toString().slice(0, 15)}`} />
                                {selectedOrder?.shipment_date && (
                                    <Chip label={`Shipped on ${new Date(selectedOrder?.shipment_date).toString().slice(0, 15)}`} />
                                )}
                                {selectedOrder?.delivery_date && (
                                    <Chip label={`Delivered on ${new Date(selectedOrder?.delivery_date).toString().slice(0, 15)}`} />
                                )}
                                {selectedOrder?.cencelled_date && (
                                    <Chip label={`Cancelled on ${new Date(selectedOrder?.cencelled_date).toString().slice(0, 15)}`} />
                                )}
                            </div>
                        </div>

                        <div className="order_product_detail gap-2 flex-wrap p-3 border rounded-3 my-4">
                            <div className="d-flex align-items-center gap-3 ">
                                {selectedOrder?.product_info?.primaryImage?.[0]?.URL && (
                                    <img
                                        src={selectedOrder?.product_info?.primaryImage?.[0]?.URL}
                                        alt={selectedOrder?.product_info?.name}
                                        width={70}
                                        className="product__img"
                                    />
                                )}
                                <div>
                                    <h5>{selectedOrder?.product_info?.name}</h5>
                                    <h6 className="mb-1">
                                        {selectedOrder?.product_info?.description}
                                    </h6>
                                    <p className="mb-1" style={{ fontSize: "small" }}>
                                        Size: {selectedOrder?.product_info?.size[0]} color:{" "}
                                        {selectedOrder?.product_info?.color}
                                    </p>
                                </div>
                            </div>
                            <div className="order_product_detail_price">
                                <h5 className="mb-1 fw-bold">
                                    ${selectedOrder?.product_info?.price}.00
                                </h5>
                                <p className="mb-1" style={{ fontSize: "small" }}>
                                    Qty: {selectedOrder?.product_info?.count}{" "}
                                </p>
                            </div>
                        </div>
                        <Row>
                            <Col xl={12} md={6} sm={12}>
                                <List>
                                    <ListItem
                                        secondaryAction={`$${selectedOrder?.product_info?.count *
                                            selectedOrder?.product_info?.price
                                            }`}
                                    >
                                        Subtotal:
                                    </ListItem>
                                    <Divider />
                                    <ListItem secondaryAction={`$${25}`}>Shipping:</ListItem>
                                    <Divider />
                                    <ListItem
                                        secondaryAction={`-$${(selectedOrder?.product_info?.count *
                                            selectedOrder?.product_info?.price *
                                            10) /
                                            100
                                            }`}
                                    >
                                        Discount:
                                    </ListItem>
                                    <Divider />
                                    <ListItem
                                        className="fs-5"
                                        secondaryAction={`$${selectedOrder?.product_info?.count *
                                            selectedOrder?.product_info?.price -
                                            (selectedOrder?.product_info?.count *
                                                selectedOrder?.product_info?.price *
                                                10) /
                                            100 +
                                            25
                                            }`}
                                    >
                                        Grand Total:
                                    </ListItem>
                                </List>
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ padding: "0px 16px" }} className="mt-3">
                            <Col xl={6} md={6} sm={12}>
                                <p className='d-flex gap-2'>Payment  <Chip label={selectedOrder?.payment_status} fontSize='small' size='small' color={selectedOrder?.payment_status === 'paid' ? 'success' : 'warning'} /></p>

                                <div className="p-3 border rounded-3">
                                    <p>
                                        {selectedOrder?.payment_method === "cash"
                                            ? "Cash on delivery"
                                            : "Online payment"}
                                    </p>
                                    {selectedOrder?.payment_status === 'paid' && (
                                        <p>Payment Date : {new Date(selectedOrder?.payment_date).toString().slice(0, 15)}</p>
                                    )}
                                    {selectedOrder?.card_details && (
                                        <>
                                            <p className="mb-1">
                                                {selectedOrder?.card_details.brand?.toUpperCase()} ****
                                                {selectedOrder?.card_details.last4}
                                            </p>
                                            <p>
                                                {selectedOrder?.card_details.exp_month < 10
                                                    ? `0${selectedOrder?.card_details.exp_month}`
                                                    : selectedOrder?.card_details.exp_month}
                                                /{selectedOrder?.card_details.exp_year}
                                            </p>
                                        </>
                                    )}
                                    {selectedOrder?.invoice && (

                                        <Button
                                            startIcon={<ReceiptIcon />}
                                            color="secondary"
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                window.location.replace(selectedOrder?.invoice)
                                            }
                                        >
                                            invoice
                                        </Button>
                                    )}

                                </div>
                            </Col>
                            <Col xl={6} md={6} sm={12}>
                                <p>Shipment</p>
                                <p className="mb-1 p-3 border rounded-3">
                                    {selectedOrder?.shipping_address?.address_line1}, <br />
                                    {selectedOrder?.shipping_address?.address_line2 &&
                                        selectedOrder?.shipping_address?.address_line2 + ","}
                                    <br />
                                    {selectedOrder?.shipping_address?.city} -{" "}
                                    {selectedOrder?.shipping_address?.zip_code},{" "}
                                    {selectedOrder?.shipping_address?.state} <br />
                                    Phone: {selectedOrder?.shipping_address?.phone}
                                </p>
                            </Col>
                        </Row>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                <ul id="progressBar" className="text-center">
                                    <li className="active step-0"></li>
                                    <li className="active step-0"></li>
                                    <li className="active step-0"></li>
                                    <li className="step-0"></li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default Order