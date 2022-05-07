import React from "react";
import { connect } from "react-redux";

class CustomCupcake extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "cupcake",
      name: "Custom",
      flavor: "",
      frosting: "",
      message: "",
      price: 12,
      image:
        "https://images.creativemarket.com/0.1.0/ps/6337536/600/400/m2/fpnw/wm1/kyrxpus5cf11setgoakkc6bivngrm3dloqq5gotlosfroaknkr53xy8upaor8jtd-.jpg?1556962719&s=474ee12c8a3486dfbce8736c4a5cf584&fmt=webp",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const newLineItem = { quantity: 1, newProduct: this.state };
    const existingCart = JSON.parse(window.localStorage.getItem("cart"));
    existingCart.push(newLineItem);
    window.localStorage.setItem("cart", JSON.stringify(existingCart));
    window.alert("Added to cart!");
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="custom-cupcake">
        <div className="row">
          <div className="column1">
            <h1 className="font-effect-shadow-multiple">
              Create Your Own Cupcake
            </h1>
            <form onSubmit={onSubmit}>
              <p>Flavor:</p>
              <select name="flavor" value={flavor} onChange={onChange}>
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
                <option value="banana">Banana</option>
                <option value="peanut butter">Peanut Butter</option>
                <option value="nutella">Nutella</option>
              </select>
              <br />
              <p>Frosting:</p>
              <select name="frosting" value={frosting} onChange={onChange}>
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
              <button disabled={!flavor || !frosting} className="submitButton">
                Add Custom Cupcake Order
              </button>
            </form>
          </div>
          <div className="examples">
            <h1 className="font-effect-shadow-multiple">
              Check out some of our past works!
            </h1>
            <img
              className="photoex"
              src="https://myincrediblerecipes.com/wp-content/uploads/2022/02/Pink-Velvet-Funetti-Cupcakes-25.jpg"
              alt="custom cake"
            />
            <img
              className="photoex"
              src="https://www.cookingclassy.com/wp-content/uploads/2016/01/chocolate_cupcakes_raspberry_buttercream6...jpg"
              alt="custom cake"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ orders }) => {
  const order = orders.find((order) => order.status === "cart");
  return {
    order,
  };
};

export default connect(mapState)(CustomCupcake);
