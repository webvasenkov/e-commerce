import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

// const products = [
//   {
//     id: '1',
//     name: 'Shoes',
//     description: 'Running shoes.',
//     price: '199$',
//     image:
//       'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/03/11/12/best-mens-running-shoes-2020-indybest.jpg?width=982&height=726&auto=webp&quality=75',
//   },
//   {
//     id: '2',
//     name: 'Macbook',
//     description: 'Apple macbook.',
//     price: '1499$',
//     image:
//       'https://cdn1.it4profit.com/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/200518061547327323/200518160012608633.png@webp',
//   },
// ];

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
