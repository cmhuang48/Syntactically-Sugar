import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from './Pagination'

class Cakes extends React.Component{
  constructor(){
    super()
    this.state = {
      currentPage : 1,
      cakesPerPage: 5
    }
  }

  paginate = (pageNumber) => {
    this.setState({currentPage:pageNumber})
  }

  render(){
    const {cakes} = this.props
    const {currentPage, cakesPerPage} = this.state
    const indexOfLastCake = currentPage * cakesPerPage
    const indexOfFirstCampus = indexOfLastCake - cakesPerPage
    const currentCakes = cakes.slice(indexOfFirstCampus, indexOfLastCake)
    return (
      <div>
        <h1 className="font-effect-shadow-multiple">Cakes</h1>
        <small style={{ color: "#666" }}>{cakes.length} results</small>
        <select onChange={(ev) => history.push(ev.target.value ? `/cakes/sort/${ev.target.value}` : '/cakes')}>
          <option value="">Sort By</option>
          <option value="price_asc">Price (low - high)</option>
          <option value="price_desc">Price (high - low)</option>
        </select>
        <Pagination itemsPerPage = {cakesPerPage} totalItems = {cakes.length} paginate = {this.paginate} currentPage = {currentPage} linkRoute = "cakes"/>
        <ul className="cakeContainer">
          <li>
            <Link to="/cakes/custom">
              <div className="cakeBox">
                <img
                  className="cakeImage"
                  src="https://i.pinimg.com/originals/69/f6/86/69f686402cc4ea8d90857d12574d45cd.jpg"
                />
                <span className="product-title">Create A Custom Cake</span>
              </div>
            </Link>
          </li>
          {currentCakes.map((cake) => {
            return (
              <li key={cake.id}>
                <Link to={`/cakes/${cake.id}`}>
                  <div className="cakeBox">
                    <img className="cakeImage" src={cake.image} />
                    <span className="product-title">{cake.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

const mapState = ({ products }, { match }) => {
  const cakes = products.filter((product) => product.category === "cake");
  const sort = match.params.sort;
  if (sort === "price_asc") {
    cakes.sort((a, b) => a.price - b.price);
  }
  if (sort === "price_desc") {
    cakes.sort((a, b) => b.price - a.price);
  }
  return {
    cakes,
  };
};

export default connect(mapState)(Cakes);
