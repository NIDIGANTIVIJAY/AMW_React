import React from 'react'
import { useLocation } from 'react-router-dom';
import classes from '../cssFile/Header1.module.css';

import instagaram from '../Assets/instagram (1).png'
import facebook from '../Assets/facebook.png'
import gmail from '../Assets/gmail.png'
import google from '../Assets/google-maps.png'
import linkedin from '../Assets/linkedin.png'
import twitter from '../Assets/twitter.png'
import whatsapp from '../Assets/whatsapp.png'


const Header1 = () => {

  const location = useLocation()
  console.log(location)
  return (
    <header className={classes.header}>

      <h2>
        {
        location.pathname==='/' ?  
        "Home"  : location.pathname==='/product' ?  
        "Product"  : location.pathname==='/faq' ?  
        "Knowledge Centre"  : location.pathname==='/about' ?  
        "About Us"  : location.pathname==='/sales' ?  
        "Sales"  : location.pathname==='/contact' ?  
        "Contact Us" : location.pathname==='/auth' ?  
        "Log In" : ""
        }
      </h2>

      {/* {
        location.pathname==='/' ?  <h2>
        Home</h2>  : location.pathname==='/product' ?  <h2>
        Product</h2>  : location.pathname==='/faq' ?  <h2>
        FAQ</h2>  : location.pathname==='/about' ?  <h2>
        About Us</h2>  : location.pathname==='/sales' ?  <h2>
        Sales</h2>  : location.pathname==='/contact' ?  <h2>
        Contact</h2> : ""
      }
      */}
      <nav>
        <ul>          
          <li>
            <a href='https://www.instagram.com/' target="_blank">
              <img src={instagaram} alt="Instagaram" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://www.facebook.com/' target="_blank">
              <img src={facebook} alt="facebook" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://twitter.com/' target="_blank">
              <img src={twitter} alt="twitter" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://web.whatsapp.com/' target="_blank">
              <img src={whatsapp} alt="whatsapp" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://in.linkedin.com/' target="_blank">
              <img src={linkedin} alt="linkedin" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://www.google.co.in/maps/' target="_blank">
              <img src={google} alt="google" width={"24px"} height={"24px"}/>
            </a>
          </li>
          <li>
            <a href='https://mail.google.com/' target="_blank">
              <img src={gmail} alt="gmail" width={"24px"} height={"24px"}/>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header1;
