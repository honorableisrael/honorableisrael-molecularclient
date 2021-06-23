import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import PartnerSection from "./partenerSection";
import yellowline from "../../images/yellowline.png";
import oilengineers from "../../images/oilengineers.png";
import star from "../../images/star.png";
import target from "../../images/target.png";
import meter from "../../images/meter.png";
import greencheck from "../../images/greencheck.png";
import lead from "../../images/leadengineers.png";
import plumber from "../../images/plumber.png";
import fire from "../../images/fire.png";
import tap from "../../images/tap.png";
import handyman from "../../images/handyman.png";
import Footer from "./footer";
import Work from "./workandbuild";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500
    });
    AOS.refresh();
  }, []);

  const [state, setState] = useState({
    toggleSections: true
  });
  const { toggleSections } = state;

  const contractorSection = () => {
    setState({
      ...state,
      toggleSections: true
    });
  };
  const specialistSection = () => {
    setState({
      ...state,
      toggleSections: false
    });
  };

  return (
    <div>
<<<<<<< HEAD
=======
      <div id="home"></div>
>>>>>>> origin/molecular-alex
      <NavBar />
      <div className="section-one">
        <Container>
          <Row className="hmsectn1row">
<<<<<<< HEAD
            <Col md={8} className="fixedti22">
=======
            <Col md={8}>
>>>>>>> origin/molecular-alex
              <div className="section-one-content">
                <h4 className="section-one-heading">
                  We Empower you to get the work Done!
                </h4>
                <p className="section-one-descriptn">
                  Get special skill work done and transforming how work gets
                  done. We offer the m high-quality workforce you need, when you
                  need it. Our solutions help you deliver any project on time
                  and within budget.
                </p>
                <div className="section-one-btn-div">
                  <Link to="/contractorlanding">
                    <span className="home-btn-primary contrtor-btn">
                      Contractor
                    </span>
                  </Link>
                  <Link to="/specialistlanding">
                    <span className="home-btn-primary specilst-btn">
                      Specialist
                    </span>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <PartnerSection />
      <div className="section-three">
        <Row className="section-three-row">
          <Col md={6}>
            <div className="section-three-content">
              <div className="section-three-subheading">
                <span> Who we are </span>
                <img
                  src={yellowline}
                  className="purpleline img-fluid"
                  alt="pic2"
                />
              </div>
              <h4 className="section-three-heading">
                A workforce management for the specialists
              </h4>
              <p className="section-three-parag1">
                We are the leading workforce management solution for the skilled
                specialists. We make it easier for workers to find work and for
                companies to find in-demand for special workforce needed.
              </p>
              <p className="section-three-parag2">
                Through people and technology, we provide staffing, training,
                and professional services to empower the specialists who get
                hard work done.
              </p>
              <Link to="/Learnmore">
                <span className="home-btn-primary learnmorebtn">
                  Learn More
                </span>
              </Link>
            </div>
          </Col>
          <Col md={6} data-aos="zoom-in-up">
            <img src={oilengineers} className="img-fluid" alt="pic3" />
          </Col>
        </Row>
      </div>
      <div className="section-four">
        <Container>
          <div className="homepg-cards-wrapper">
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={star} alt="pic4" />
                <p>Industry Standard</p>
              </div>
              <p>
                Our support team is the best in the business. We're ready to
                support you with what you need, as quickly as you need it.
              </p>
            </div>
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={target} alt="pic5" />
                <p>Reliable Results</p>
              </div>
              <p>
                Quality and safety are our top priorities. Our workers get your
                jobs done right the first time, every time.
              </p>
            </div>
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={meter} alt="pic6" />
                <p>Resource Efficiency</p>
              </div>
              <p>
                Our flexible, local, and scalable solutions reduce your costs
                and drive greater efficiencies for your business.
              </p>
            </div>
            <div className="homepg-cards" >
              <div className="homepg-cards-title">
                <img src={greencheck} alt="pic7" />
                <p>Certify Specialists</p>
              </div>
              <p>
                We connect you with the workers you need. No matter what you're
                looking for, our diverse workforce can meet your unique needs.
              </p>
            </div>
          </div>
        </Container>
        <div id="our_services"></div>
      </div>
      {toggleSections === true && (
        <div className="section-five">
          <Row >
            <Col md={6} className="section-five-img-col">
              <img src={lead} className="img-fluid fluid8" alt="pic8" />
            </Col>
            <Col md={6} className="section-five-content" >
              <div className="section-five-subheading">
                <span> What we do </span>
              </div>
              <p className="section-five-paragp1">
                Our highly trained skilled specialists are the best in their
                industries.
              </p>
              <div className="section-fivebtn-wrapp">
                <span className="section-five-btn sctnfvcntrbtn">
                  Contractors
                </span>
                <span
                  onClick={specialistSection}
                  className="section-five-btn scfvspclstbtn"
                >
                  Specialists
                </span>
              </div>
              <p className="section-five-heading">
                We Power you with high skilled specialists to get your projects
                done.{" "}
              </p>
              <p className="section-five-paragp2">
                Access reliable workforce.
                <br /> Our platform meets your need as a contractor, as well as
                a specialised skilled worker.
              </p>
              <p className="section-five-paragp3">
                Our highly trained specialists are the best in each and every
                industry we serve.
              </p>
              <div className="section-five-btn-wrap">
                <Link to="/contractor_signup">
                  <span className="home-btn-primary sectnfivecontrtor-btn">
                    Hire Specialists
                  </span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      )}
      {toggleSections === false && (
        <div className="section-five">
          <Row>
            <Col md={6} className="section-five-img-col">
              <img src={plumber} className="img-fluid" alt="pic9" />
            </Col>
            <Col md={6} className="section-five-content">
              <div className="section-five-subheading">
                <span> What we do </span>
              </div>
              <p className="section-five-paragp1">
                Our growing list of industries provides more opportunities for
                you.
              </p>
              <div className="section-fivebtn-wrapp">
                <span
                  onClick={contractorSection}
                  className="section-five-btn scfvspclstbtn "
                >
                  Contractors
                </span>
                <span className="section-five-btn   sctnfvcntrbtn">
                  Specialists
                </span>
              </div>
              <p className="section-five-heading">
                Are you skilled? Find fulfillment in your speciality{" "}
              </p>
              <p className="section-five-paragp2">
                Access reliable workforce.
                <br /> Our platform meets your need as a contractor, as well as
                a specialised skilled worker.
              </p>
              <p className="section-five-paragp3">
                Our highly trained specialists are the best in each and every
                industry we serve.
              </p>
              <div className="skilseclectdiv">
                <div className="skiwraper">
                  <img src={fire} alt="pic10" />
                  <p>Welding</p>
                </div>
                <div className="skiwraper">
                  <img src={tap} alt="pic11" />
                  <p>Fitting</p>
                </div>
                <div className="skiwraper">
                  <img src={handyman} alt="pic12" />
                  <p>Plumbing</p>
                </div>
              </div>
              <div className="section-five-btn-wrap">
                <Link to="/specialist_signup">
                  <span className="home-btn-primary getjobbtn">
                    Get Job
                  </span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <div className="section-six">
        <h4>
          Our goal is to revolutionize the industry, using technology to
          streamline everything from recruiting to payments. We're focused on
          delivering quality outcomes for our workers and clients.
        </h4>
        <p data-aos="fade-down">Jennifer Ghan — CEO</p>
      </div>
      <Work />
      <Footer />
    </div>
  );
};
export default Home;
