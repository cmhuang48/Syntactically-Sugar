import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

import { deleteProduct } from "../store";
import UpdateProduct from "./UpdateProduct";

const useStyles = makeStyles({ root: { minWidth: "10px" } });

const AllProducts = ({ products, foo, product }) => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity In Stock</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" key={product.id}>
                    {product.category}
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">
                    <img style={{ maxWidth: "100px" }} src={product.image} />
                  </TableCell>
                  <TableCell align="left">{product.size}</TableCell>
                  <TableCell align="center">
                    {product.quantityInStock}
                  </TableCell>
                  <TableCell>
                    <Button
                      classes={classes}
                      onClick={() => foo(product.id)}
                      style={{ color: "red" }}
                    >
                      X
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button classes={classes}>
                      <Link to={`/products/${product.id}/edit`}>&#x270D;</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapState = ({ products }) => {
  return { products };
};

const mapDispatch = (dispatch) => {
  return {
    foo: (id) => {
      dispatch(deleteProduct(id));
    },
  };
};

export default connect((state) => state, mapDispatch)(AllProducts);
