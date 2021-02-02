/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const PaymentForm = ({ checkoutToken }) => {
  // const stripePromise = loadStripe('public_key');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Elements>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <Button>Pay</Button>
        </form>
      </Elements>
    </>
  );
};

export default PaymentForm;
