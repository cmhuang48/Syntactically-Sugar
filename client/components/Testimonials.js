import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Testimonials(){
  return(
    <div class = 'testimonials'>
      <div class = 'inner'></div>
      <h1>Testimonials</h1>
      <div class = 'border'></div>
      <div class = 'row'>
        <div class ='col'>
          <div class='testimonial'>
            <img src = '/../images/unhappyman.jpeg'></img>
            <div class='name'>Jim Smith</div>
            <div class ='stars'></div>
            <SimpleRating value ='1'/>
            <p>"I ordered a cake for my mom's 60th birthday and it was burnt!"</p>
          </div>
        </div>

        <div class ='col'>
          <div class='testimonial'>
            <img src = '/../images/angrywoman.jpeg'></img>
            <div class='name'>Jane Doe</div>
            <div class ='stars'></div>
            <SimpleRating value='1'/>
            <p>"My cupcake had mold in it!"</p>
          </div>
        </div>

        <div class ='col'>
          <div class='testimonial'>
            <img src = '/../images/shrugman.png'></img>
            <div class='name'>Jack Something</div>
            <div class ='stars'></div>
            <SimpleRating value='2'/>
            <p>"I mean...it was edible I guess."</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimpleRating(props) {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={props.value} readOnly />
      </Box>
    </div>
  );
}