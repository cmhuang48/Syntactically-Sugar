import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store";
import Box from "@material-ui/core/Box";

class CreateNewProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "",
      name: "",
      price: "",
      quantityInStock: "",
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const {
      category,
      name,
      price,
      quantityInStock,
      image,
    } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="borderinfo">
        <form id="createProductForm" onSubmit={handleSubmit}>
          <p htmlFor="category">Category</p>
          <select name="category" value={category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="cake">cake</option>
            <option value="cupcake">cupcake</option>
          </select>
          <p htmlFor="name">Name:</p>
          <input
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={handleChange}
          />
          <p htmlFor="price">Price:</p>
          <input
            name="price"
            value={price}
            placeholder="Enter price"
            onChange={handleChange}
          />
          <p htmlFor="QuantityInStock">Quantity:</p>
          <input
            name="quantityInStock"
            value={quantityInStock}
            placeholder="Enter quantity in stock"
            onChange={handleChange}
          />
          <p htmlFor="image">Image:</p>
          <input
            name="image"
            value={image}
            placeholder="Enter image URL"
            size="100"
            onChange={handleChange}
          />
          <br />
          <button
            style={{ marginTop: "20px" }}
            disabled={
              !category ||
              !name ||
              !price ||
              !quantityInStock ||
              !image
            }
          >
            Add
          </button>
          <Link to="/profile">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    createProduct: (product) => {
      dispatch(createProduct(product, history));
    },
  };
};

export default connect((state) => state, mapDispatch)(CreateNewProduct);
