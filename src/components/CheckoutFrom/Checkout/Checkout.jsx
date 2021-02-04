import React, { useState, useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Paper, Typography, Stepper, Step, StepLabel, Button, Divider, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, error, onCaptureCheckout }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isCompleted, setCompleted] = useState(false);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  const timeout = (ms = 3000) => setTimeout(() => setCompleted(true), ms);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} newtStep={nextStep} />
    ) : (
      <Elements stripe={stripePromise}>
        <PaymentForm
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          backStep={backStep}
          nextStep={nextStep}
          onCaptureCheckout={onCaptureCheckout}
          timeout={timeout}
        />
      </Elements>
    );

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.firstname} {order.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography>order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button variant='outlined' component={Link} to='/'>
          Back to store
        </Button>
      </>
    ) : isCompleted ? (
      <>
        <div>
          <Typography variant='h5'>Thank you for your purchase</Typography>
        </div>
        <br />
        <Button variant='outlined' component={Link} to='/'>
          Back to store
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <br />
      <Button variant='outlined' component={Link} to='/'>
        Back to home
      </Button>
    </>;
  }

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
