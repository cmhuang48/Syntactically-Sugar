import React from 'react'
import {Link} from 'react-router-dom'

const Pagination = ({itemsPerPage, totalItems, paginate, currentPage, linkRoute}) =>{
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
    pageNumbers.push(i)
  }
  
  return(
    <nav>
      <br></br>
      <p>Pages:</p>
      <ul className="pageNumbers">
        {pageNumbers.map(number =>{
          return(
            <li key = {number} className = {number === currentPage? 'currentPage':""}>
              <Link onClick={()=>paginate(number)} to = {`/${linkRoute}`}>{number}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination