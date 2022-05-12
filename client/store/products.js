import axios from "axios";

// ACTION TYPES
const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const SEARCH_PRODUCT = "SEARCH_PRODUCT";

// THUNK CREATORS
export const loadProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch({
      type: LOAD_PRODUCTS,
      products,
    });
  };
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const newProduct = (await axios.post("/api/products", product)).data;
    // const newlineItem = (
    //   await axios.post("/api/lineItems", {
    //     quantity: 1,
    //     productId: newProduct.id,
    //   })
    // ).data;
    dispatch({
      type: CREATE_PRODUCT,
      product: newProduct,
    });
    history.push(`/${newProduct.category}s`);
  };
};

export const deleteProduct = (product, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${product.id}`).data;
    dispatch({
      type: DELETE_PRODUCT,
      product,
    });
    history.push(`/dashboard`);
  };
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    const updatedProduct = (
      await axios.put(`/api/products/${product.id}`, product)
    ).data;
    dispatch({
      type: UPDATE_PRODUCT,
      product: updatedProduct,
    });
    history.push(`/${product.category}s/${product.id}`);
  };
};

export const searchProduct = () => {
  return async (dispatch) => {
    const searchProduct = (await axios.get(`/api/products/search`)).data;
    dispatch({
      type: SEARCH_PRODUCT,
      product: searchProduct,
    })
  };
};


// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id !== action.product.id ? product : action.product
      );
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case SEARCH_PRODUCT:
      return action.products
    default:
      return state;
  }
}
