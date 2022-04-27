import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function Review({ auth, associatedLineItems, products }) {
  if (auth.username) {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {associatedLineItems.map((lineItem) => {
            const product = products.find(product => product.id === lineItem.productId);
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
              $34.06
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>John Smith</Typography>
            <Typography gutterBottom>{addresses.join(', ')}</Typography>
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
  }
  else {
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
  
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {existingCart.map((lineItem) => {
            const product = products.find(product => product.id === lineItem.productId);
            return (
              <ListItem key={`${product.name} ${product.category}`} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.category} />
                <Typography variant="body2">{`${lineItem.quantity} @ $${product.price}`}</Typography>
              </ListItem>
            )
          })}

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              $34.06
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>John Smith</Typography>
            <Typography gutterBottom>{addresses.join(', ')}</Typography>
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
  }
}

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