import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const Cakes = (props) => {
  const {cakes} = props
  return (
    <div>
      <h1>Cakes</h1>
      <ul>
        {cakes.map(cake => {
          return <li key = {cake.id}><Link to = {`/cakes/${cake.id}`}>{cake.name}</Link></li>
        })}
      </ul>
    </div>
  )
}

const mapState = ({cakes})=>{
  return{
    cakes
  }
}

export default connect(mapState)(Cakes);