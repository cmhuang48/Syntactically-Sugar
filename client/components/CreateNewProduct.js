import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../store';
import Box from '@material-ui/core/Box';

class CreateNewProduct extends React.Component {
	constructor () {
		super();
		this.state = {
			category: '',
			name: '',
			size: '',
			tiers: '',
			price: '',
			quantityInStock: '',
			image: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit (ev) {
		ev.preventDefault();
		this.props.createProduct({...this.state});
	}

	handleChange (ev) {
		const change = {};
		change[ev.target.name] = ev.target.value;
		this.setState(change);
	}

	render () {
		const { category, name, size, tiers, price, image, quantityInStock } = this.state;
		const { handleChange, handleSubmit } = this; 
		return (
			<div className="borderinfo">
				<form id='createProductForm' onSubmit={handleSubmit}>
					<p htmlFor='Category'>Category</p>
					<select value={category} name='category' onChange={handleChange}>
						<option value=''>----</option>
						<option value='cake'>cake</option>
						<option value='cupcake'>cupcake</option>
					</select>
					<p htmlFor='Name'>Name:</p>
					<select value={name} name='name' onChange={handleChange}>
						<option value=''>-----</option>
						<option value='Vanilla'>Vanilla</option>
						<option value='Chocolate'>Chocolate</option>
						<option value='Strawberry'>Strawberry</option>
						<option value='Red Velvet'>Red Velvet</option>
						<option value='Rainbow'>Rainbow</option>
						<option value='Funfetti'>Funfetti</option>
						<option value='Matcha'>Matcha</option>
						<option value='Tiramisu Mille'>Tiramisu Mille</option>
						<option value='Pistachio Mille'>Pistachio Mille</option>
						<option value='Seasonal'>Seasonal</option>
					</select>
					<select value={size} name='size' onChange={handleChange}>
						<option value=''>-----</option>
						<option value='9'>9 inch</option>
						<option value='12'>12 inch</option>
					</select>
					<select value={tiers} name='tiers' onChange={handleChange}>
						<option value=''>-----</option>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
					</select>
					<p htmlFor='Price'>Price:</p>
					<input name='price' onChange={handleChange} value={price} placeholder='Enter price'/>
					<p htmlFor='image'>Image url:</p>
					<input name='image' onChange={handleChange} value={image} placeholder='Enter image url' size='100'/>
					<p htmlFor='QuantityInStock'>Quantity in Stock:</p>
					<input name='quantityInStock' onChange={handleChange} value={quantityInStock} placeholder='Enter quantity'/>
					<p htmlFor='size'>Size:</p>
					<input name='size' onChange={handleChange} value={size} placeholder='Enter quantity'/>
					<br/>
					<button style={{marginTop:'20px'}} disabled={!name || !category || !price ||!image || !quantityInStock}>Add</button>
					<Link to='/profile'>Cancel</Link>
				</form>
			</div>
		);
	}
};

const mapDispatch = (dispatch) => {
	return {
		createProduct: (product, {history}) => {
			dispatch(createProduct(product, history ))
		}
	};
};

export default connect(state => state, mapDispatch)(CreateNewProduct)