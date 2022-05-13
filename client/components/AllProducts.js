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
import Pagination from '@material-ui/lab/Pagination';

import { deleteProduct } from "../store";


const useStyles = makeStyles({ root: { minWidth: "10px" } });

const AllProducts = ({ products, destroy, history }) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);
  const amountPerPage = 10;
  const indexOfLastProduct = page * amountPerPage;
  const indexOfFirstProduct = indexOfLastProduct - amountPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <Pagination className='pagination' count={Math.ceil(products.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
      <TableContainer component={Paper} >
        <h1 className="font-effect-shadow-multiple">All Products</h1>
        <Table style={{width: '80vw'}}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Category</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>Image</TableCell>
              <TableCell align='center'>Quantity In Stock</TableCell>
              <TableCell align='center'>Delete</TableCell>
              <TableCell align='center'>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" key={product.id} align='center'>
                    {product.category}
                  </TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">
                    <img style={{ maxWidth: "100px" }} src={product.image} />
                  </TableCell>
                  <TableCell align="center">
                    {product.quantityInStock}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      classes={classes}
                      onClick={() => destroy(product, history)}
                      style={{ color: "red" }}
                    >
                      X
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
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
      <Pagination className='pagination' count={Math.ceil(products.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
    </>
  );
};

const mapState = ({ products }) => ({ products });

const mapDispatch = (dispatch) => {
  return {
    destroy: (product, history) => {
      dispatch(deleteProduct(product, history));
    },
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
