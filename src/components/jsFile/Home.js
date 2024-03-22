import React from 'react'
import classes from '../cssFile/Home.module.css';
import HomeProduct  from './HomeProduct';
import HomeSlide  from './HomeSlide';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  

  return (
    <main className={classes.home}>
     
       
           <HomeSlide />
           <HomeProduct />
  
         
        
    </main>
  );
};

export default Home;
