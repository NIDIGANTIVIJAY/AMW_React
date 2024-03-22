import React from 'react';
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../cssFile/HomeSlide.css'

import nail1 from '../Assets/nail5.jpg' 
import nail2 from '../Assets/nail2.jpg' 
import nail3 from '../Assets/nail3.jpg' 
import nail4 from '../Assets/nail4.jpg' 

const spanStyle = {
  padding: '20px',
  background: 'rgb(191 182 182 / 32%)',
  color: 'rgb(100, 34, 34)',
  fontWeight: "600",
  // fontFamily: "cursive",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)"

}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
}
const slideImages = [
  {
    url : nail1,
    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab mollitia laborum 1'
  },
  {
    url : nail2,
    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab mollitia laborum ipsum harum magni ullam reprehenderit nam. 2'
  },
  {
    url : nail3,
    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab mollitia laborum 3'
  },
  {
    url : nail4,
    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab mollitia laborum 4'
  },
];

const HomeSlide = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div className='divStyle' style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span className='spanStyle' style={spanStyle}>{slideImage.caption}</span> */}
                
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default HomeSlide;