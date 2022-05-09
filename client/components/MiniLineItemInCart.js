import React from "react";
import { connect } from "react-redux";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { updateLineItem, deleteLineItem, loadLineItems } from "../store";

const MiniLineItemInCart = ({
  lineItem,
  auth,
  products,
  loadLineItems,
  updateLineItem,
  deleteLineItem,
}) => {
  const destroy = () => {
    if (auth.username) {
      deleteLineItem(lineItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem("cart"));
      existingCart = existingCart.filter(
        (obj) => obj.productId !== lineItem.productId
      );
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      updateLineItem(existingCart);
    }
  };

  const increase = () => {
    if (auth.username) {
      const updatedItem = {
        id: lineItem.id,
        quantity: lineItem.quantity * 1 + 1,
        productId: lineItem.productId,
        orderId: lineItem.orderId,
      };
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem("cart"));
      const existingLineItem = existingCart.find(
        (obj) => obj.productId === lineItem.productId
      );
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity * 1 + 1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      loadLineItems();
    }
  };

  const decrease = () => {
    if (lineItem.quantity === 1) {
      destroy();
    } else if (auth.username) {
      const updatedItem = {
        id: lineItem.id,
        quantity: lineItem.quantity * 1 - 1,
        productId: lineItem.productId,
        orderId: lineItem.orderId,
      };
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem("cart"));
      const existingLineItem = existingCart.find(
        (obj) => obj.productId === lineItem.productId
      );
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity * 1 - 1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      loadLineItems();
    }
  };

  if (lineItem.newProduct) {
    const destroyCustom = () => {
      let existingCart = JSON.parse(window.localStorage.getItem("cart"));
      existingCart = existingCart.filter(
        (obj) =>
          JSON.stringify(obj.newProduct) !== JSON.stringify(lineItem.newProduct)
      );
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      loadLineItems();
    };

    return (
      <tr>
        <td>{lineItem.newProduct.name}</td>
        <td>{lineItem.newProduct.category}</td>
        <td>
          <button className="deleteBtn" onClick={destroyCustom}>
            Remove Item
          </button>
        </td>
        <td>${(lineItem.newProduct.price * lineItem.quantity).toFixed(2)}</td>
      </tr>
    );
  }

  const product = products.find(
    (product) => product.id === lineItem.productId * 1
  );

  if(!product) return null
  
  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>
        <button className="increaseBtn" onClick={decrease}>
          -
        </button>
        {lineItem.quantity}
        <button className="decreaseBtn" onClick={increase}>
          +
        </button>
      </td>
      <td>
        <button className="deleteBtn" onClick={destroy}>
          <RemoveShoppingCartIcon />
        </button>
      </td>
      <td>${(product.price * lineItem.quantity).toFixed(2)}</td>
    </tr>
  );
};

const mapState = ({ auth, products }) => ({ auth, products });
const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (item) => {
      dispatch(updateLineItem(item));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    },
    loadLineItems: () => {
      dispatch(loadLineItems());
    },
  };
};

export default connect(mapState, mapDispatch)(MiniLineItemInCart);
