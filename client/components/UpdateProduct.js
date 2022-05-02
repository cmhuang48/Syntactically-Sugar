import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, deleteProduct } from '../store';

class UpdateProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.product ? this.props.product.name : '',
			price: this.props.product ? this.props.product.price : '',
			image: this.props.product ? this.props.product.image : '',
			quantityInStock: this.props.product ? this.props.product.quantityInStock : ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate (prevProps) {
		if(!prevProps.product && this.props.product) {
			this.setState({
				name: this.props.product.name, 
				price: this.props.product.price, 
				image: this.props.product.image,
				quantityInStock: this.props.product.quantityInStock
			});
		}
	}

	handleSubmit (ev) {
		ev.preventDefault();
		this.props.updateProduct({...this.props.product, ...this.state});
	}

	handleChange (ev) {
		const change = {};
		change[ev.target.name] = ev.target.value;
		this.setState(change);
	}

	render () {
		const { name, price, image, quantityInStock } = this.state;
		const { handleChange, handleSubmit } = this;

		return (
			<div className= "row">
				<h1 className="font-effect-shadow-multiple">Product's info</h1>
				<div className="borderinfo">
					<form onSubmit={handleSubmit}>
						<p> Name: </p>
							<input name='name' value={name} placeholder='Enter name' onChange={handleChange} />
						<p> Price: </p>
							<input name='price' value={price} placeholder='Enter price' onChange={handleChange} />
						<p> Image Url: </p>
							<input name='image' value={image} size='100' placeholder='Enter image url' onChange={handleChange} />
						<p> Quantity in Stock: </p>
							<input name='quantityInStock' value={quantityInStock} placeholder='Enter Quantity in stock' onChange={handleChange} />
							<br/>
							<button style={{margin:'20px auto auto', width: '70px' }}> Update </button>
					</form>
					<form onSubmit={(ev) => ev.preventDefault()}>
						<button style={{margin:'20px auto auto', width: '70px' }} onClick={()=>this.props.deleteProduct(this.props.match.params.id*1)}>Delete</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapState = ({ products }, { match: { params: { id } } }) => {
	const product = products.find(product => product.id === id*1);
	return {
		product
	};
};

const mapDispatch = (dispatch, { history }) => {
	return {
		updateProduct: (product) => {
			dispatch(updateProduct(product, history))
		},
		deleteProduct: (product) => {
			dispatch(deleteProduct(product, history))
		}
	};
};

export default connect(mapState, mapDispatch)(UpdateProduct);