import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {ArrowForwardIos, ArrowBackIos} from "@material-ui/icons"

export function OurFavorites(props)
{
  const {products} = props
  const items = products.slice(0,5)
  return (
    <div style={{width:'75vw', marginRight:'auto', marginLeft:'auto'}}>
      <Carousel NextIcon={<ArrowForwardIos/>} PrevIcon={<ArrowBackIos/>} navButtonsAlwaysVisible='true' >
        {items.map( (item, i) => <Item key={i} item={item} /> )}
      </Carousel>
    </div>
  )
}

export function Item(props)
{
  return (
    <>
      <Paper style={{textAlign:'center'}}>
          <h2 style={{textAlign:'center',  fontFamily:"crafty girls", fontSize:'25px'}}>{props.item.name} {props.item.category}</h2>
          <Link to={`/cakes/${props.item.id}`}><img src ={props.item.image} style={{height:'400px', width:'400px', display:'block', marginLeft:'auto', marginRight:'auto', border:"1px solid black"}}/></Link>
          <Link to={`/cakes/${props.item.id}`} style={{fontSize:'25px'}}>Check it out!</Link>
      </Paper>
    </>
  )
}