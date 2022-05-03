import * as React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import {deleteUser} from '../store'


const useStyles = makeStyles({ root: { minWidth: '10px' } });


const AllUsers = ({ users, auth, foo }) => {
	const classes = useStyles();
	return (
		<>
		 <TableContainer component={Paper}>
			<Table>
				<TableHead>
				<TableRow>
					<TableCell>id</TableCell>
					<TableCell>Admin</TableCell>
					<TableCell>UserName</TableCell>
					<TableCell>First Name</TableCell>
					<TableCell align="right">Last Name</TableCell>
					<TableCell align="right">Address</TableCell>
					<TableCell align="right">City</TableCell>
					<TableCell align="right">State</TableCell>
					<TableCell align="right">Zip</TableCell>
					<TableCell align="right">Country</TableCell>
					<TableCell align="right">Card Name</TableCell>
					<TableCell align="right">Card Number</TableCell>
					<TableCell align="right">Exp Date</TableCell>
					<TableCell align="right"></TableCell>
					{/*<TableCell align="right"></TableCell>*/}
				</TableRow>
				</TableHead>
				<TableBody>
					{users.map( user => {
						return (
							
							<TableRow>
								<TableCell component="th" scope="row" key={user.id}>{user.id}</TableCell>
								<TableCell align='right'>{user.isAdmin.toString()}</TableCell>
								<TableCell align="right">{user.username}</TableCell>
								<TableCell align="right">{user.firstName}</TableCell>
								<TableCell align="right">{user.lastName}</TableCell>
								<TableCell align="right">{user.address1}</TableCell>
								<TableCell align="right">{user.city}</TableCell>
								<TableCell align="right">{user.state}</TableCell>
								<TableCell align="right">{user.zip}</TableCell>
								<TableCell align="right">{user.country}</TableCell>
								<TableCell align="right">{user.cardName}</TableCell>
								<TableCell align="right">{user.cardNumber}</TableCell>
								<TableCell align="right">{user.expDate}</TableCell>
								<TableCell>
									<Button classes={classes} onClick={()=> foo(user.id)} style={{color: 'red'}}>
										X
									</Button>
								</TableCell>
								{/*<TableCell>
										<Button classes={classes}>
											&#x270D;
										</Button>
								</TableCell>*/}
							</TableRow>
						)
					})}
				</TableBody>
		 	</Table>
   		 </TableContainer>
		</>
	)
}

const mapState = ({users, auth}) => {
	return users
}

const mapDispatch = (dispatch) => {
	return{
		foo: (id) => {
			dispatch(deleteUser(id))
		}
	}
}


export default connect(state => state, mapDispatch)(AllUsers)