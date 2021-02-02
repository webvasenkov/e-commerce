import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import useStyles from './styles.js';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  const handleUpdateCartQty = (productId, newQuantity) => {
    onUpdateCartQty(productId, newQuantity);
  };
  const handleRemoveFromCart = (productId) => {
    onRemoveFromCart(productId);
  };

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={item.media.source}
        alt={item.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total_formatted_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type='button'
            size='small'
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type='button'
            size='small'
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant='contented'
          type='button'
          color='secondary'
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
