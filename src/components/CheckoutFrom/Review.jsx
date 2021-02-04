import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ products, subtotal }) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => {
          const total = product.line_total.formatted_with_symbol;

          return (
            <ListItem style={{ padding: '10px 0' }} key={product.id}>
              <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
              <Typography varian='body2'>{total}</Typography>
            </ListItem>
          );
        })}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            {subtotal}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
