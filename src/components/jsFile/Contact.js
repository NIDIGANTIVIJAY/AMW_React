import React,{useState} from "react";
import classes from "../cssFile/Contact.module.css";
import location from "../Assets/placeholder.png";
import contact from "../Assets/receiver.png";
import email from "../Assets/email.png";
import axios from "axios";

const Contact = () => {
  const [phno,setPhone]=useState()
  const [desc,setDes]=useState()
  const [Name,setName]=useState()

    console.log(desc,phno,Name)
  const url =process.env.REACT_APP_SERVICE_ID

  const onSubmitFun=(e)=>{
    e.preventDefault()
    let payload = {
      phno: phno,
      desc: desc,
      name:Name
    };
    axios.post(url + "sendEmail", payload).then((res) => {
      console.log(res);

    });

  }
 
  
  return (
    <main className={classes.profile}>
      <main className={classes.auth1} style={{color:"black"}}>
        <div className={classes.contactBox}>
        <a href="https://goo.gl/maps/UwvDTBhHFyyiyZ8GA" target="blank">
          <img src={location} alt="location" className={classes.icon} />
          </a>
          <h4 >OUR MAIN OFFICE</h4>
          <p >
            AAKASH METAL WORKS 108,Chandanpura ,Kopaganj <br/> Mau-275305, U.P. 
          </p>
        </div>

        <div className={classes.contactBox}>
          <img src={contact} alt="location" className={classes.icon} />
          <h4>PHONE NUMBER</h4>
          <p>
            7275291510 <br/>9936098290 <br /> {"(Mithilesh Kumar)"}
          </p>
        </div>

        <div className={classes.contactBox}>
        <a href="mailto:aakashmetalworks@gmail.com" target="blank">
          <img src={email} alt="location" className={classes.icon} />
          </a>
          <h4>EMAIL</h4>
          <p className={classes.emailTxt}> <a href="mailto:aakashmetalworks@gmail.com" target="blank">aakashmetalworks@gmail.com</a> <br /><a href="mailto:amw.aakashmetal@gmail.com" target="blank">amw.aakashmetal@gmail.com</a></p>
        </div>
      </main>
      <main className={classes.auth}>
        <section>
          <p className={classes.ContHeader}>Contact Us</p>
          <form>
            <div className={classes.control}>
              {/* <label htmlFor='name'>Name <span style={{color:"red"}}>*</span></label> */}
              <input
                type="text"
                id="name"
                required
                placeholder="Enter your name..."
                onChange={(e)=>{setName(e.target.value)}}

              />
            </div>
            <div className={classes.control}>
              {/* <label htmlFor='contact'>Mobile <span style={{color:"red"}}>*</span></label> */}
              <input
                type="tel"
                id="contact"
                required
                placeholder="Enter a valid mobile no..."
                onChange={(e)=>{setPhone(e.target.value)}}
              />
            </div>
            <div className={classes.control}>
              {/* <label htmlFor='message'>Message</label> */}
              <textarea
              className={classes.textAreaWidth}
                name="message"
                id="message"
                // cols="62"
                rows="2"
                placeholder="Please write your query..."
                onChange={(e)=>{setDes(e.target.value)}}
              ></textarea>
            </div>
            <button className={classes.btn} onClick={(e)=>{onSubmitFun(e)}}> Submit Now</button>
          </form>
        </section>
      </main>
    </main>
  );
};

export default Contact;

//onClick={ () => props.onLogIn()}
