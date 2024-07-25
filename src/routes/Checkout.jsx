import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import BillingInfo from '../components/Checkout/BillingInfo';
import ShippingAddress from '../components/Checkout/ShippingAddress';
import PaymentInfo from '../components/Checkout/PaymentInfo';
import { Col, Row } from 'react-bootstrap';
import OrderSummery from '../components/Checkout/OrderSummery';
import { useParams } from 'react-router-dom';
import { ApiServices } from '../api/api';
import OrderSuccess from "../components/Checkout/OrderSuccess";

const steps = ['Billing Info', 'Shipping Address', 'Payment info'];

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutItem, setCheckoutItem] = useState({});
    const [billingData, setBillingData] = useState({});
    const [shippingAddressData, setShippingAddressData] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const param = useParams()
    console.log('params', param.id);

    const getProductDetails = async () => {
        ApiServices.GetCartItems().then(res => {
            console.log(res);
            if (res.response_code === 200) {
                const foundItem = res.cart_items?.find(item => item.cartItemId === param.id)
                if (foundItem) {
                    setCheckoutItem(foundItem)
                    window.scrollTo(0, 0)
                }
            }
        })
    }
    useEffect(() => {
        getProductDetails()
    }, [param.id])
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo(0, 0)
    };

    const handleBack = () => {
        window.scrollTo(0, 0)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };
    const handleOrderSubmit = (pay_method) => {
        const discount = 10;
        const shipping = 25;

        var json = {
            ShippingAddress: shippingAddressData,
            BillingInfo: billingData,
            PaymentMethod: pay_method,
            ProductInfo: checkoutItem,
            TotalAmount: checkoutItem.count * checkoutItem?.price -
                (checkoutItem.count * checkoutItem?.price * discount) / 100 +
                shipping,
        }
        console.log('json', json);
        ApiServices.PostOrder(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                if (pay_method === 'cash') {
                    handleNext()
                }
                if (pay_method === 'online') {
                    console.log('stripe api call');
                }
            }
        })
    }


    return (

        // <Card className='m-5'>
        //     <CardContent>
        <Box className='m-5'>

            <Stepper activeStep={activeStep}>

                {/* <Step>
                    <StepLabel >label 1</StepLabel>
                </Step>
                <Step>
                    <StepLabel >label 2</StepLabel>
                </Step>
                <Step>
                    <StepLabel >label 3</StepLabel>
                </Step> */}

                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <div>
                    <OrderSuccess />
                </div>
            ) : (
                <Row >
                    <Col xl='8' lg='8' sm='12' xs='12' className='mt-4'>
                        <Card className='p-3 pb-0'>
                            <CardContent>
                                {activeStep === 0 ? (
                                    <BillingInfo handleNext={handleNext} billingData={billingData} setBillingData={setBillingData} />
                                ) : activeStep === 1 ? (
                                    <ShippingAddress handleNext={handleNext} handleBack={handleBack} shippingAddressData={shippingAddressData} setShippingAddressData={setShippingAddressData} />
                                ) : activeStep === 2 ? (
                                    <PaymentInfo handleOrderSubmit={handleOrderSubmit} handleNext={handleNext} handleBack={handleBack} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                                ) : (
                                    <div></div>
                                )}
                                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box> */}
                            </CardContent>
                        </Card>
                    </Col>
                    <Col xl='4' lg='4' sm='12' xs='12' className='mt-4'>
                        <OrderSummery checkoutItem={checkoutItem} />
                    </Col>
                </Row>
            )}
        </Box>
        //     </CardContent>
        // </Card>

    );
}
