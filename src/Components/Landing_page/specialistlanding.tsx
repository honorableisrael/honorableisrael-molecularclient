import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import bullet from "../../images/shortline.png";
import Work from "./workandbuild";
import Footer from "./footer";
import redoverall from "../../images/redoverall.png";
import weldingflame from "../../images/weldingflame.png";
import yellowhelmet from "../../images/yellowhelmet.jpg";
import blueoverall from "../../images/blueoverall.png";

const SpecialistLanding = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="cntrotlndg-section1">
        <Row>
          <Col md={6} className="cntrotlndg-section1-contnt">
            <h4>Get More Work Opportunities with Better Pay</h4>
            <p>
              MolecularProTech is committed to enabling our technical specialists
              to get a better work experience. Which means you get more work
              opportunities while ensuring you get paid well and on time. We’re
              dedicated to making it easier for you to get hard work done.
            </p>
            <Link to="/specialist_signup">
              <span className="home-btn-primary contrtor-btn">Find Work</span>
            </Link>
          </Col>
          <Col md={6} className="">
            <img src={redoverall} alt="img" className="redoverall-img" />
          </Col>
        </Row>
      </div>
      <div className="cntrotlndg-section3">
        <p className="cntrotlndg-section3_heading">
          FOR TECHNICAL SPECIALISTS{" "}
        </p>
        <p className="cntrotlndg-section3_subheading">
          Your Technical Career is in good hands
        </p>
        <div className="cardlift">
          <div className="cntrotlndg-section3-cards">
            <div className="cntrotlndg-section3-card-content">
              <img
                src={weldingflame}
                className="img-fluid specailist2"
                alt="img"
              />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                  More Work Opportunities
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  We’ve built the most robust workforce marketplace for
                  technical specialists in Africa. We’re always looking for your
                  next work opportunities from several EPC Contractors
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Understand your individual skills and work preferences
                    including types of jobs, location, and hours
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Match you with a company looking for your profile</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Ensure you are supported throughout the entire process—from
                    the initial match to your first day on the job
                  </p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img
                src={yellowhelmet}
                className="img-fluid yellhlmetimg specailist2"
                alt="img"
              />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                  Better Work Conditions
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  Our dedicated recruiting team is committed to identifying the
                  right opportunities aligned with your unique preferences and
                  goals.
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    We’re dedicated to matching you with the right jobs. We
                    profile you to understand your goals and find the jobs that
                    meet your expectations.
                  </p>
                </div> */}
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Provide onsite course options if you meet the requirements
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Offer additional cross-training opportunities for new
                    industries
                  </p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img
                src={blueoverall}
                className="img-fluid specailist2"
                alt="img"
              />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                  Better and Timely Pay
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  Our technical Specialists benefit from the most flexible
                  payment terms in the industry. We ensure you get paid what you
                  deserve plus other great benefits such as Health Insurance and
                  Professional Indemnity.
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Provide best-in-class healthcare benefit options</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create additional earning opportunities through bonus and
                    referral programs
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Request for early payment</p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img
                src={blueoverall}
                className="img-fluid specailist2"
                alt="img"
              />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                  Continous Training and Certification
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Provide best-in-class healthcare benefit options</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create additional earning opportunities through bonus and
                    referral programs
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Request for early payment</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cntrotlndg-section4">
        <Link to="/specialist_signup">
          <span className="home-btn-primary contrtor-btn">Get Started</span>
        </Link>
      </div>
      <Work />
      <Footer />
    </div>
  );
};
export default SpecialistLanding;
