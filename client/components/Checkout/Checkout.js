import * as React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { updateOrder, checkout, updateUser } from '../../store';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

function Checkout({ auth, cart, associatedLineItems, updateOrder, checkout }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onClick = () => {
    if (auth.username) {
      updateOrder({ id: cart.id, status: 'order', userId: auth.id, firstName, lastName, address1, address2, city, state, zip, country, cardName, cardNumber, expDate, cvv });
      if (saveAddress === 'yes') {
        updateUser({ id: auth.id, firstName, lastName, address1, address2, city, state, zip, country });
      } 
      if (saveCard === 'yes') {
        updateUser({ id: auth.id, cardName, cardNumber, expDate, cvv });
      }
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      // creates new user, new order, and new lineItems
      checkout(existingCart);
    }
    window.alert('Successfully checked out!');
  }

  if (auth.username) {
    if(!associatedLineItems.length) return <div>Continue Shopping</div>;
  } 
  
  else {
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
    if(!existingCart.length) return <div>Continue Shopping</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ padding: '2em'}}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : ( activeStep === steps.length-1 ? (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={onClick}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            ))}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

const mapState = ({ auth, orders, lineItems }) => {
  const cart = orders.find(order => order.status === 'cart');
  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart?.id);
  return {
    auth,
    cart,
    associatedLineItems
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    checkout: (cart) => {
      dispatch(checkout(cart));
    }
  };
};

export default connect(mapState, mapDispatch)(Checkout);