import React from 'react'
import { Link } from 'react-router-dom';
import classes from '../cssFile/Footer.module.css';

const Footer = () => {
  return (
    <main className={classes.profile}>
      <div className={classes.headerCont}><p className={classes.footerTxt}>Aakash Metal Works Copyright © 2023 || All rights reserved </p> <p className={classes.footerSepration}> || </p> <p className={classes.footerLink}><Link to="/contact">Contact Us</Link> || <Link to="/about">About Us</Link></p>   </div>
    </main>
  );
};

export default Footer;
