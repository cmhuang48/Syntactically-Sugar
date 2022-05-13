import * as React from "react";
import { connect } from "react-redux";
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

import { deleteUser } from "../store";

const useStyles = makeStyles({ root: { minWidth: "10px" } });

const AllUsers = ({ users, destroy, history, match }) => {
  const classes = useStyles();

  const sort = match.params.sort;
  if (sort === 'id') {
    users.sort((a, b) => a.id - b.id);
  }
  if (sort === 'first_name') {
    users.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
  if (sort === 'last_name') {
    users.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  const [page, setPage] = React.useState(1);
  const amountPerPage = 20;
  const indexOfLastUser = page * amountPerPage;
  const indexOfFirstUser = indexOfLastUser - amountPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <select style={{ width: '10%' }} onChange={(ev) => history.push(ev.target.value ? `/dashboard/sort/${ev.target.value}` : '/dashboard')}>
        <option value="">Sort By</option>
        <option value="id">ID</option>
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
      </select>
      <Pagination className='pagination' count={Math.ceil(users.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
      <TableContainer component={Paper}>
      <h1 className="font-effect-shadow-multiple">All Users</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style= {{minWidth:50, maxWidth: 50}}>ID</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Zip</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Card Name</TableCell>
              <TableCell align="center" style= {{minWidth:'50px', maxWidth: '50px'}}>Card Number</TableCell>
              <TableCell align="center"></TableCell>
              {/*<TableCell align="center"></TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" key={user.id}>
                    {user.id}
                  </TableCell>
                  <TableCell align="center">{user.isAdmin.toString()}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">
                    {user.address1}
                    <br />
                    {user.address2}
                  </TableCell>
                  <TableCell align="center">{user.city}</TableCell>
                  <TableCell align="center">{user.state}</TableCell>
                  <TableCell align="center">{user.zip}</TableCell>
                  <TableCell align="center">{user.country}</TableCell>
                  <TableCell align="center">{user.cardName}</TableCell>
                  <TableCell align="center">
                    {"XXXXXXXXXXXX" + user.cardNumber.slice(-4)}
                  </TableCell>
                  <TableCell>
                    <Button
                      classes={classes}
                      onClick={() => destroy(user)}
                      style={{ color: "red" }}
                    >
                      X
                    </Button>
                  </TableCell>
                  {/*<TableCell>
                    <Button classes={classes}>
                      &#x270D;
                    </Button>
                </TableCell>*/}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination className='pagination' count={Math.ceil(users.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
    </>
  );
};

const mapState = ({ users }) => ({ users });

const mapDispatch = (dispatch, { history }) => {
  return {
    destroy: (user) => {
      dispatch(deleteUser(user, history));
    },
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
