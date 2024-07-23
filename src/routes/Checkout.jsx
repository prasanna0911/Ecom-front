

import * as React from 'react';
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

const steps = ['Billing Info', 'Shipping Address', 'Payment info'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo(0, 0)
    };

    const handleBack = () => {
        window.scrollTo(0, 0)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <Row >
                    <Col xl='8' lg='8' sm='12' xs='12' className='mt-4'>
                        <Card className='p-3 pb-0'>
                            <CardContent>
                                {activeStep === 0 ? (
                                    <BillingInfo />
                                ) : activeStep === 1 ? (
                                    <ShippingAddress />
                                ) : activeStep === 2 ? (
                                    <PaymentInfo />
                                ) : (
                                    <div></div>
                                )}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                                </Box>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col xl='4' lg='4' sm='12' xs='12' className='mt-4'>
                        <OrderSummery />
                    </Col>
                </Row>
            )}
        </Box>
        //     </CardContent>
        // </Card>

    );
}
