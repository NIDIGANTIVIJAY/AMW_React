import React from "react";
import classes from "../cssFile/About.module.css";

const About = () => {
  return (
    <main className={classes.aboutProfile}>
      <div className={classes.aboutContainer}>
      <p className={classes.aboutHeader}>About AMW</p>
      <div className={classes.copanyFact}>
        <p>
          Aakash Metal Works was founded in the year 2022 and is owned by
          Mr.Mithilesh Kumar.
        </p>
        <p>
          The main activity of the company is production of hard-, semi-hard and
          soft wires, production of wire nails , concrete nails , shoe tack
          nails , roofing nails and other types of nails.
        </p>

        <p>
          Reliability and Durability are some of the hallmarks of our products.
          We supply best quality of common wire nails which all are widely used
          in different industrial purposes. We have abundant experience in
          exporting different sizes of common wire nails. Our product is sold in
          the entire Eastern Region of India under the brand of 'AMW' for the
          last 2 years.
        </p>
        <p>
          Under the supervision of our honorable owner Mr. Mithilesh Kumar, the
          company attained heights of success within a short span. Under his
          able guidance, we are committed to supply qualitative grades of wire &
          nails to our clients spread across the globe. In a scenario where the
          prices are unstable, it is to be noted that risk involved in dealing
          with quality products are less as they offer reliability & durability
          and high consumer confidence.
        </p>
        </div>
        <p className={classes.aboutHeader}>Quality Control</p>
        <div className={classes.copanyFact}>
        <p>
          Aakash Metal Works is engaged in the complete production of concrete
          nails products from steel material, wire drawing, welding to coating
          and all the way to installation of products.
        </p>
        <p>
          The managing policy is Honest Business and Excellent Service. we have
          constantly improved our technology and products quality and has
          developed into one of the top wires & nail manufacturers in this area.
        </p>

        <p>
          <span className={classes.textBold}>To be creditable: </span>
          We promise timely delivery, guaranteed quality and good after-sales
          service to customers.
        </p>
        <p>
          <span className={classes.textBold}>To be dedicated: </span>
          We will consider and try to satisfy every requirement of customers.
        </p>
        <p>
          <span className={classes.textBold}>To learn </span> is origin of our
          development. We encourage every people of our company to keep learning
          and have tried to create such chances.
        </p>

        <p>
          <span className={classes.textBold}>To innovate</span>
          is to develop. We have wire mesh experts and R&D staff, professional
          machines and design software to meet your needs.
        </p>
        </div>

        
          <p className={classes.aboutHeader}>Company Facts</p>

          <div className={classes.copanyFact}>
          <p>
            <span className={classes.textBold}>Business Type : </span>
            Manufacturer / Exporters / Wholesale Suppliers
          </p>
          <p>
            <span className={classes.textBold}>Year of Estd : </span>2022
          </p>
          <p>
            <span className={classes.textBold}>Business Markets : </span>India
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
