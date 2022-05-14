import React from "react";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";

class CustomCake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: "cake",
      name: "Custom",
      size: "",
      tiers: "",
      flavor: "",
      frosting: "",
      message: "",
      price: 100,
      image: "https://i.pinimg.com/originals/69/f6/86/69f686402cc4ea8d90857d12574d45cd.jpg",
      alert: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate () {
    if(this.state.alert) setTimeout(()=>this.setState({ alert: false }), 2000);
  }

  componentWillUnmount () {
    this.setState({ alert: false });
  }

  onSubmit (ev) {
    ev.preventDefault();
    const newLineItem = { quantity: 1, newProduct: this.state };
    const existingCart = JSON.parse(window.localStorage.getItem("cart"));
    existingCart.push(newLineItem);
    window.localStorage.setItem("cart", JSON.stringify(existingCart));
    this.setState({ alert: true });
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { size, tiers, flavor, frosting, message, alert } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="custom-cake">
        <div className="row">
          <div className="column1">
            <h1 className="font-effect-shadow-multiple">
              Create Your Own Cake
            </h1>
            <form onSubmit={onSubmit}>
              <p>Size:</p>
              <select name="size" value={size} onChange={onChange} className='select1'>
                <option value="">Select Size</option>
                <option value="9">9 inch</option>
                <option value="12">12 inch</option>
              </select>
              <br />
              <p>Tiers:</p>
              <select name="tiers" value={tiers} onChange={onChange} className='select1'>
                <option value="">Select Number of Tiers</option>
                <option value="1">1 tier</option>
                <option value="2">2 tiers</option>
                <option value="3">3 tiers</option>
              </select>
              <br />
              <p>Flavor:</p>
              <select name="flavor" value={flavor} onChange={onChange} className='select1'>
                <option value="">Select Flavor</option>
                <option value="vanilla">Vanilla</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="caramel">Caramel</option>
                <option value="mint">Mint</option>
                <option value="buttercup">Buttercup</option>
                <option value="pecan">Pecan</option>
                <option value="almond">Almond</option>
                <option value="hazelnut">Hazelnut</option>
                <option value="coconut">Coconut</option>
                <option value="cranberry">Cranberry</option>
                <option value="peach">Peach</option>
                <option value="raspberry">Raspberry</option>
                <option value="apple">Apple</option>
                <option value="orange">Orange</option>
                <option value="lemon">Lemon</option>
                <option value="mango">Mango</option>
                <option value="pineapple">Pineapple</option>
                <option value="peanut butter">Peanut Butter</option>
                <option value="nutella">Nutella</option>
                <option value="banana">Banana</option>
              </select>
              <br />
              <p>Frosting:</p>
              <select name="frosting" value={frosting} onChange={onChange} className='select1'>
                <option value="">Select Frosting</option>
                <option value="vanilla">Vanilla</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="caramel">Caramel</option>
                <option value="mint">Mint</option>
                <option value="buttercup">Buttercup</option>
                <option value="pecan">Pecan</option>
                <option value="almond">Almond</option>
                <option value="hazelnut">Hazelnut</option>
                <option value="coconut">Coconut</option>
                <option value="cranberry">Cranberry</option>
                <option value="peach">Peach</option>
                <option value="raspberry">Raspberry</option>
                <option value="apple">Apple</option>
                <option value="orange">Orange</option>
                <option value="lemon">Lemon</option>
                <option value="mango">Mango</option>
                <option value="pineapple">Pineapple</option>
                <option value="coffee">Coffee</option>
                <option value="oreo">Oreo</option>
                <option value="peanut butter">Peanut Butter</option>
                <option value="cream cheese">Cream Cheese</option>
                <option value="strawberry jam">Strawberry Jam</option>
                <option value="nutella">Nutella</option>
              </select>
              <br />
              <p>Message:</p>
              <input
                name="message"
                value={message}
                placeholder="Enter Message"
                onChange={onChange}
              />
              <br />
              <button disabled={!size || !tiers || !flavor || !frosting} className="submitButton">
                Add Custom Cake Order
              </button>
            </form>
            {alert?
            <Box sx={{ width: '100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10px' }} spacing={2}>
              <Alert severity="success">Added to cart!</Alert>
            </Box>:null}
          </div>
          <div className="examples">
            <h1 className="font-effect-shadow-multiple">
              Check out some of our past works!
            </h1>
            <img
              className="photoex"
              src="https://i.pinimg.com/originals/39/b7/f1/39b7f157dc9426c4486dcced7aed0a9b.jpg"
              alt="custom cake"
            />
            <img
              className="photoex"
              src="https://media1.popsugar-assets.com/files/thumbor/x6Pv5O4nmLzv1j1RXFjpUQSYkuQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/08/28/919/n/3019466/235ac81ab95dc140_007._Cape_Cod_Celebrations_-_Meghan_Gregory_Photo/i/Funfetti.jpeg"
              alt="custom cake"
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapState = ({ orders }) => {
  const order = orders.find((order) => order.status === "cart");
  return {
    order,
  };
};

export default connect(mapState)(CustomCake);
