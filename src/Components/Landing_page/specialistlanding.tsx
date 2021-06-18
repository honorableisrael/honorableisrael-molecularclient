import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import bullet from "../../images/shortline.png";
import Work from "./workandbuild";
import Footer from "./footer";
import redoverall from "../../images/redoverall.png";
import weldingflame from "../../images/weldingflame.png";
import labourers from "../../images/labourers.png";
import blueoverall from "../../images/blueoverall.png";

const SpecialistLanding = () => {
  return (
    <div>
      <NavBar />
      <div className="cntrotlndg-section1">
        <Row>
          <Col md={6} className="cntrotlndg-section1-contnt">
            <h4>More Opportunity. Better Pay. Better Work.</h4>
            <p>
              We are a company you can count on when you need to get hard work
              done. We offer the high-quality workforce you need, when you need
              it. Our solutions help you deliver any project on time and within
              budget.
            </p>
            <Link to="/specialist_signup">
              <span className="home-btn-primary contrtor-btn">Find Work</span>
            </Link>
          </Col>
          <Col md={6} className="">
            <img src={redoverall} alt="img" className="redoverall-img"/>
          </Col>
        </Row>
      </div>
      <div className="cntrotlndg-section3">
        <p>We connect you with the best opportunities.</p>
        <div className="cardlift">
          <div className="cntrotlndg-section3-cards">
            <div className="cntrotlndg-section3-card-content">
              <img src={weldingflame} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  We match you with the best contractor
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  Our dedicated recruiting team is committed to identifying the
                  right opportunities aligned with your unique preferences and
                  goals.
                </p>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={labourers} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  Providing High-Quality Training
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  Our dedicated recruiting team is committed to identifying the
                  right opportunities aligned with your unique preferences and
                  goals.
                </p>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Understand the skill, certification, and safety requirements
                    for every job and cross-check against your qualifications
                  </p>
                </div>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={blueoverall} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Dive Deeper</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  Offering Comprehensive Benefits
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  The health and well-being of our workers is our top priority.
                  We offer a robust and comprehensive program with a variety of
                  options to best meet your needs.
                </p>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cntrotlndg-section4">
        <Link to="/specialist_signup">
          <span className="home-btn-primary contrtor-btn">
            Sign up as a Specialist
          </span>
        </Link>
      </div>
      <Work />
      <Footer />
    </div>
  );
};
export default SpecialistLanding;
