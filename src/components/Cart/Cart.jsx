import React from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();
  const handleEmptyCart = () => {
    onEmptyCart();
  };

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid key={item.id} item xs={12} sm={4}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            type='button'
            size='large'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            type='button'
            size='large'
            variant='contained'
            color='primary'
            component={Link}
            to='/checkout'
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link className={classes.link} to='/'>
        start add some
      </Link>
      !
    </Typography>
  );

  if (!cart.line_items) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your shopping cart
      </Typography>
      {cart.line_items.length ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
