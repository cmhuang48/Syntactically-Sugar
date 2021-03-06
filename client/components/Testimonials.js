import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Testimonials() {
  return (
    <div className='testimonials'>
      <div className='inner'></div>
      <h1 className="font-effect-shadow-multiple">Testimonials</h1>
      <div className='border'></div>
      <div className='trow'>
        <div className='col'>
          <div className='testimonial'>
            <img src='/../images/stanley.png'></img>
            <div className='name'>Stanley Lim</div>
            <div className ='stars'></div>
            <SimpleRating value='4'/>
            <p>"The staff is not only incredibly knowledgeable, but so friendly and kind! So good looking too, not relevant but just icing on the cake. Ha! See what I did there!"</p>
          </div>
        </div>
        <div className='col'>
          <div className='testimonial'>
            <img src='/../images/prof.jpeg'></img>
            <div className='name'>Prof (Probably)</div>
            <div className='stars'></div>
            <SimpleRating value='5'/>
            <p>"This is very good and I am very impressed with you all. A+"</p>
          </div>
        </div>
        <div className='col'>
          <div className='testimonial'>
            <img src='/../images/unhappyman.jpeg'></img>
            <div className='name'>Al Gorithm</div>
            <div className='stars'></div>
            <SimpleRating value='1'/>
            <p>"I had a cake from here made when my girlfriend graduated Fullstack Academy. It said " git add "6 months of hard work" git commit -m "finished bootcamp" git push" I don't get it."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SimpleRating(props) {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={props.value} readOnly />
      </Box>
    </div>
  );
};