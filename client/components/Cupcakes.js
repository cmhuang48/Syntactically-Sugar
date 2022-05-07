import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

class Cupcakes extends React.Component {
  constructor () {
    super();
    this.state = {
      page: 1,
      amountPerPage: 12
    };
  }

  render () {
    const { cupcakes, history } = this.props;
    const { page, amountPerPage } = this.state;
    const indexOfLastCupcake = page * amountPerPage;
    const indexOfFirstCupcake = indexOfLastCupcake - amountPerPage;
    const currentCupcakes = cupcakes.slice(indexOfFirstCupcake, indexOfLastCupcake);

    return (
      <div style={{ display: 'flex', flexDirection: 'column'}}> 
        <h1 className="font-effect-shadow-multiple">Cupcakes</h1>
        <small style={{ color: "#666" }}>{cupcakes.length} results</small>
        <select style={{ width: '10%' }} onChange={(ev) => history.push(ev.target.value ? `/cupcakes/sort/${ev.target.value}` : '/cupcakes')}>
          <option value="">Sort By</option>
          <option value="price_asc">Price (low - high)</option>
          <option value="price_desc">Price (high - low)</option>
        </select>
        <ul className="cakeContainer">
          <li>
            <Link to="/cupcakes/custom">
              <div className="cakeBox">
                <img
                  className="cakeImage"
                  src="https://images.creativemarket.com/0.1.0/ps/6337536/600/400/m2/fpnw/wm1/kyrxpus5cf11setgoakkc6bivngrm3dloqq5gotlosfroaknkr53xy8upaor8jtd-.jpg?1556962719&s=474ee12c8a3486dfbce8736c4a5cf584&fmt=webp"
                />
                <span className="product-title">Create A Custom Cupcake</span>
              </div>
            </Link>
          </li>
          {currentCupcakes.map((cupcake) => {
            return (
              <li key={cupcake.id}>
                <Link to={`/cupcakes/${cupcake.id}`}>
                  <div className="cakeBox">
                    <img className="cakeImage" src={cupcake.image} />
                    <span className="product-title">{cupcake.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination className='pagination' count={Math.ceil(cupcakes.length / amountPerPage)} onChange={(ev, page) => this.setState({ page })} />
      </div>
    );
  }
};

const mapState = ({ products }, { match }) => {
  const cupcakes = products.filter((product) => product.category === "cupcake");
  const sort = match.params.sort;
  if (sort === "price_asc") {
    cupcakes.sort((a, b) => a.price - b.price);
  }
  if (sort === "price_desc") {
    cupcakes.sort((a, b) => b.price - a.price);
  }
  return {
    cupcakes,
  };
};

export default connect(mapState)(Cupcakes);
