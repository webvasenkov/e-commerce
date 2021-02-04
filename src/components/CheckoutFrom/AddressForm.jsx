import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCounties] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([key, value]) => ({
    code: key,
    name: value,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(([key, value]) => ({ code: key, name: value }));

  const options = shippingOptions.map((oS) => ({
    id: oS.id,
    label: `${oS.description} - (${oS.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      setShippingCounties(countries);
      setShippingCountry(Object.keys(countries)[0]);
    } catch (error) {
      console.log('There was an error fetching the countries', error);
    }
  };

  const fetchShippingSubdivision = async (countryCode) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (error) {
      console.log('There was an error fetching the subdivisions', error);
    }
  };

  const fetchShippingOptions = async (checkoutTokenId, country, subdivision = null) => {
    try {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
        country,
        region: subdivision,
      });

      setShippingOption(options[0].id);
      setShippingOptions(options);
    } catch (error) {
      console.log('There was an error fetching the options', error);
    }
  };

  const onSubmit = (data) => {
    const fullData = { ...data, shippingCountry, shippingSubdivision, shippingOption };
    next(fullData);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivision(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First name' />
            <FormInput name='lastName' label='Last name' />
            <FormInput name='address' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='Zip code / Postal code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={({ target }) => setShippingCountry(target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={({ target }) => setShippingSubdivision(target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.code} value={subdivision.code}>
                    {subdivision.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={({ target }) => setShippingOption(target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>
              Back to Cart
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
