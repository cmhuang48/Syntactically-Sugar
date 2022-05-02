import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

function Review({ orderInfo, auth, associatedLineItems, products }) {
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: orderInfo.cardName },
    { name: 'Card number', detail: orderInfo.cardNumber },
    { name: 'Expiry date', detail: orderInfo.expDate },
  ];

  let cart;

  if (auth.username) {
    cart = [...associatedLineItems, ...JSON.parse(window.localStorage.getItem('cart'))];
  } else {
    cart = JSON.parse(window.localStorage.getItem('cart'));
  }

  let total = 0;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((lineItem) => {
          const product = lineItem.newProduct ? lineItem.newProduct : products.find(product => product.id === lineItem.productId);
          total += product.price * lineItem.quantity;

          return (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.category} />
            <Typography variant="body2">{`${lineItem.quantity} @ ${product.price}`}</Typography>
          </ListItem>
          )
        })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{orderInfo.firstName} {orderInfo.lastName}</Typography>
          <Typography gutterBottom>{orderInfo.address1}</Typography>
          <Typography gutterBottom>{orderInfo.address2}</Typography>
          <Typography gutterBottom>{orderInfo.city}, {orderInfo.state}, {orderInfo.zip}, {orderInfo.country}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapState = ({ auth, orders, lineItems, products }) => {
  const cart = orders.find(order => order.status === 'cart');
  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart?.id);
  return {
    auth,
    associatedLineItems,
    products
  };
};

export default connect(mapState)(Review);