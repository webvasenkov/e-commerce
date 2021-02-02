import React, { useState, useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Paper, Typography, Stepper, Step, StepLabel } from '@material-ui/core';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const Confirmation = () => <div>Confirmation</div>;
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} />
    );

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log('There was an error in generating a token', error);
      }
    };

    generateToken();
  }, [cart]);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
