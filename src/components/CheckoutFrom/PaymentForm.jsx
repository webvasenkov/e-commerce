/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import Review from './Review';

const PaymentForm = ({ checkoutToken, shippingData, nextStep, backStep, onCaptureCheckout, timeout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const subtotal = checkoutToken.live.subtotal.formatted_with_symbol;
  const products = checkoutToken.live.line_items;

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const {
        firstName,
        lastName,
        address,
        email,
        city,
        zip,
        shippingCountry,
        shippingSubdivision,
        shippingOption,
      } = shippingData;

      const orderData = {
        line_items: products,
        customer: { firstname: firstName, lastname: lastName, email },
        shipping: {
          name: 'Primary',
          street: address,
          town_city: city,
          county_state: shippingSubdivision,
          postal_zip_code: zip,
          country: shippingCountry,
        },
        fulfillment: { shipping_method: shippingOption.id },
        payment: { gateway: 'stripe', stripe: { stripe_method_id: paymentMethod.id } },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      // mock CaptureCheckout
      timeout();
      nextStep();
    }
  };

  return (
    <>
      <Review products={products} subtotal={subtotal} />
      <Divider />
      <Typography getterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant='outlined' onClick={backStep}>
            Back
          </Button>
          <Button variant='contained' type='submit' color='primary' disabled={!stripe}>
            Pay {subtotal}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
