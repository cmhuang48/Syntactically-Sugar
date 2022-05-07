import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

class Cakes extends React.Component {
  constructor () {
    super();
    this.state = {
      page: 1,
      amountPerPage: 12
    };
  }

  render () {
    const { cakes, history } = this.props;
    const { page, amountPerPage } = this.state;
    const indexOfLastCake = page * amountPerPage;
    const indexOfFirstCake = indexOfLastCake - amountPerPage;
    const currentCakes = cakes.slice(indexOfFirstCake, indexOfLastCake);

    return (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <h1 className="font-effect-shadow-multiple">Cakes</h1>
        <small style={{ color: "#666" }}>{cakes.length} results</small>
        <select style={{ width: '10%' }}onChange={(ev) => history.push(ev.target.value ? `/cakes/sort/${ev.target.value}` : '/cakes')}>
          <option value="">Sort By</option>
          <option value="price_asc">Price (low - high)</option>
          <option value="price_desc">Price (high - low)</option>
        </select>
        <ul className="cakeContainer">
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
        <Pagination className='pagination' count={Math.ceil(cakes.length / amountPerPage)} onChange={(ev, page) => this.setState({ page })} />
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
