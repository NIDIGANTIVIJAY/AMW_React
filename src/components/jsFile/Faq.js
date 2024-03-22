import React from "react";
import classes from "../cssFile/Faq.module.css";

import ShankDia from "../Json/knowledge.json";

import img1 from "../Assets/KnowledgeImage/dia-1.png";
import img2 from "../Assets/KnowledgeImage/dia-2.png";
import img3 from "../Assets/KnowledgeImage/dia-3.png";
import img4 from "../Assets/KnowledgeImage/dia-4.png";
import img5 from "../Assets/KnowledgeImage/dia-5.png";
import img6 from "../Assets/KnowledgeImage/dia-6.png";
import img7 from "../Assets/KnowledgeImage/dia-7.png";
import img8 from "../Assets/KnowledgeImage/dia-8.png";
import img9 from "../Assets/KnowledgeImage/dia-9.png";
import img10 from "../Assets/KnowledgeImage/dia-10.png";
import img11 from "../Assets/KnowledgeImage/dia-11.png";
import img12 from "../Assets/KnowledgeImage/dia-12.png";
import img13 from "../Assets/KnowledgeImage/dia-13.png";
import img14 from "../Assets/KnowledgeImage/dia-14.png";
import imgTop from "../Assets/nail4.jpg"

const Faq = () => {
  const ab = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
    9: img9,
    10: img10,
    11: img11,
    12: img12,
    13: img13,
    14: img14,
  };

  return (
    <main className={classes.faqContainer}>
      <h2 style={{ textAlign: "center" }}>Knowledge Centre</h2>

 
      <h3 className={classes.headingText}>What are Nails</h3>
      <br />
      <br />
      <div className={classes.faqWrapper}>
        <div className={classes.faqImage}>
          <img src={imgTop} alt="" />
        </div>
        <div className={classes.faqTextidv}>
          <p>
            In woodworking and construction, a nail is a pin-shaped object of
            metal (or wood, called a treenail or "trunnel") which is used as a
            fastener, as a peg to hang something, or sometimes as a
            decoration.[1] Generally, nails have a sharp point on one end and a
            flattened head on the other, but headless nails are available. Nails
            are made in a great variety of forms for specialized purposes. The
            most common is a WIRE NAILS.
          </p>
          <p>
            Nails are typically driven into the workpiece by a hammer, a
            pneumatic nail gun, or a small explosive charge or primer. A nail
            holds materials together by friction in the axial direction and
            shear strength laterally. The point of the nail is also sometimes
            bent over or clinched after driving to prevent pulling out.
          </p>
          <p>
            As the name implies, wire nails are formed from wire. Usually coils
            of wire are drawn through a series of dies to reach a specific
            diameter, then cut into short rods that are then formed into nails.
            The nail tip is usually cut by a blade; the head is formed by
            reshaping the other end of the rod under high pressure. Other dies
            are used to cut grooves and ridges. Wire nails were also known as
            "French nails" for their country of origin.[11] Belgian wire nails
            began to compete in England in 1863
          </p>
        </div>
      </div>
      <br />
      <h3 className={classes.headingText}>Diffrent Types of Shanks & Dia</h3>
      <br />
      <br />
      <div className={classes.tableContainerNew}>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Type</th>
              <th>Abbr.</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {ShankDia[0].ShanksDia.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.part}</td>
                  <td>{item.type}</td>
                  <td>{item.abbr}</td>
                  <td>
                    {item.remarks} <img src={ab[item.imageId]} alt="imageId" />
                  </td>
                  {/* <td>{item.remarks}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

<br /> <br /><br />
      <h3 className={classes.headingText}>Size Charts for Nails</h3>
      <br />
      <br />
      <div className={classes.tableWrapper}>
        <div className={classes.tablecontainer1}>
          <table className={classes.tableBox1}>
            <thead>
              <tr>
                <th colSpan={3}>Birmingham wire Gauge BWG</th>
                <th colSpan={3}>Standard wire Gauge SWG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>BWG</th>
                <th>INCHES</th>
                <th>MM</th>
                <th>SWG</th>
                <th>INCHES</th>
                <th>MM</th>
              </tr>

              {ShankDia[1].BWGSWG.map((item, index) => {
                return (
                  <tr>
                    <td>{item.BWG}</td>
                    <td>{item.INCHES1}</td>
                    <td>{item.MM1}</td>
                    <td>{item.SWG}</td>
                    <td>{item.INCHES2}</td>
                    <td>{item.MM2}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={classes.tablecontainer2}>
          <table className={classes.tableBox2}>
            <thead>
              <tr>
                <th>Penny Size ( USA )</th>
                <th>Length ( Inches )</th>
                <th>Length ( Nearest mm )</th>
              </tr>
            </thead>
            <tbody>
              {ShankDia[2].Length.map((item, index) => {
                return (
                  <tr>
                    <td>{item.USA}</td>
                    <td>
                      {item.INCHES1}
                      <sup>{item.INCHES2}</sup>{" "}
                    </td>
                    <td>{item.MM}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br /> <br />
      <br />
      <h3 className={classes.headingText}>Terminology</h3>
      <br />
      <br />
      <div className={classes.terminologyText}>
        <ul>
          <li>
            Box a wire nail with a head; box nails have a smaller shank than
            common nails of the same size
          </li>
          <li>
            Bright no surface coating; not recommended for weather exposure or
            acidic or treated lumber
          </li>
          <li>
            Casing a wire nail with a slightly larger head than finish nails;
            often used for flooring
          </li>
          <li>
            CC or Coated ''cement coated''; nail coated with adhesive (cement)
            for greater holding power; also resin- or vinyl-coated; coating
            melts from friction when driven to help lubricate then adheres when
            cool; color varies by manufacturer (tan, pink, are common)
          </li>
          <li>
            Common a common construction wire nail with a disk-shaped head that
            is typically 3 to 4 times the diameter of the shank: common nails
            have larger shanks than box nails of the same size
          </li>
          <li>
            Cut machine-made square nails. Now used for masonry and historical
            reproduction or restoration
          </li>
          <li>
            Duplex a common nail with a second head, allowing for easy
            extraction; often used for temporary work, such as concrete forms or
            wood scaffolding; sometimes called a ''scaffold nail''
          </li>
          <li>
            Drywall a specialty blued-steel nail with a thin broad head used to
            fasten gypsum wallboard to wooden framing members
          </li>
          <li>
            Finish a wire nail that has a head only slightly larger than the
            shank; can be easily concealed by countersinking the nail slightly
            below the finished surface with a nail-set and filling the resulting
            void with a filler (putty, spackle, caulk, etc.)
          </li>
          <li>
            Forged handmade nails (usually square), hot-forged by a blacksmith
            or nailor, often used in historical reproduction or restoration,
            commonly sold as collectors items
          </li>
          <li>
            Galvanized treated for resistance to corrosion and/or weather
            exposure
            <ul>
              <li>
                Electrogalvanized provides a smooth finish with some corrosion
                resistance
              </li>
              <li>
                Hot-dip galvanized provides a rough finish that deposits more
                zinc than other methods, resulting in very high corrosion
                resistance that is suitable for some acidic and treated lumber;
              </li>
              <li>
                Mechanically galvanized deposits more zinc than
                electrogalvanizing for increased corrosion resistance
              </li>
            </ul>
          </li>
          <li>
            Head round flat metal piece formed at the top of the nail; for
            increased holding power
          </li>
          <li>
            Helix the nail has a square shank that has been twisted, making it
            very difficult to pull out; often used in decking so they are
            usually galvanized; sometimes called decking nails
          </li>
          <li>
            Length distance from the bottom of the head to the point of a nail
          </li>
          <li>
            Phosphate-coated a dark grey to black finish providing a surface
            that binds well with paint and joint compound and minimal corrosion
            resistance
          </li>
          <li>
            Point sharpened end opposite the ''head'' for greater ease in
            driving
          </li>
          <li>
            Pole barn long shank (2 1/2 in to 8 in, 6 cm to 20 cm), ring shank
            (see below), hardened nails; usually oil quenched or galvanized (see
            above); commonly used in the construction of wood framed, metal
            buildings (pole barns)
          </li>
          <li>
            Ring shank small directional rings on the shank to prevent the nail
            from working back out once driven in; common in drywall, flooring,
            and pole barn nails
          </li>
          <li>
            Shank the body the length of the nail between the head and the
            point; may be smooth, or may have rings or spirals for greater
            holding power
          </li>
          <li>
            Sinker these are the most common nails used in framing today; same
            thin diameter as a box nail; cement coated (see above); the bottom
            of the head is tapered like a wedge or funnel and the top of the
            head is grid embossed to keep the hammer strike from sliding off
          </li>
          <li>Spike a large nail; usually over 4 in (100 mm) long</li>
          <li>
            Spiral a twisted wire nail; spiral nails have smaller shanks than
            common nails of the same size
          </li>
        </ul>
        
      </div>


    </main>
  );
};

export default Faq;
