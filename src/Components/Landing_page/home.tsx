import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import PartnerSection from "./partenerSection";
import yellowline from "../../images/yellowline.png";
import oilengineers from "../../images/oilengineers.jpg";
import star from "../../images/star.png";
import target from "../../images/target.png";
import meter from "../../images/meter.png";
import greencheck from "../../images/greencheck.png";
import lead from "../../images/leadengineers.jpg";
import plumber from "../../images/plumber.png";
import fire from "../../images/fire.png";
import tap from "../../images/tap.png";
import handyman from "../../images/handyman.png";
import Footer from "./footer";
import Work from "./workandbuild";
import AOS from "aos";
import "aos/dist/aos.css";
import TextTransition, { presets } from "react-text-transition";
import {
  BlinkingCursorTextBuilder,
  FloatingLettersTextBuilder,
} from "react-animated-text-builders";

const TEXTS = [
  "Let's build more pipelines",
  "Let's do the hard work",
  "Let's empower the grey collar workers",
];

const Home = () => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  // useEffect(()=>{
  //   setInterval(()=>{
  //     if (current.length >30){
  //       setState({
  //         ...state,
  //         current: `Let's ${" "}  do ${" "}  the ${" "}  hard ${" "}  work`
  //       })
  //     }
      
  //     if (current.length <30){
  //       setState({
  //         ...state,
  //         current: `Let's ${" "}  do ${" "}  the ${" "}  hard  ${" "} work`
  //       })
  //     }
  //   },4000)
  // })
  const [state, setState] = useState({
    toggleSections: true,
    current:`Let's ${" "} build ${"  "} more  ${" "} pipelines`
  });
  const { toggleSections,current } = state;

  const contractorSection = () => {
    setState({
      ...state,
      toggleSections: true,
    });
  };
  const specialistSection = () => {
    setState({
      ...state,
      toggleSections: false,
    });
  };

  return (
    <div>
      <div id="home"></div>
      <NavBar />
      <div className="section-one">
        <Container>
          <Row className="hmsectn1row">
            <Col md={12} className="fixedti22">
              <div className="section-one-content">
                <h4 className="section-one-heading">
                  {/* <TextTransition
                    text={TEXTS[index % TEXTS.length]}
                    springConfig={presets.wobbly}
                    direction="up"
                    className="trans3"
                  /> */}

                  <FloatingLettersTextBuilder
                    floatingSpeed={500}
                    lettersAppearanceDelay={250}
                    animationMaxMargin={"200px"}
                    animationMinMargin={"0px"}
                  >
                    {current}
                  </FloatingLettersTextBuilder>
                </h4>
                {/* <p className="section-one-descriptn">
                  Get special skill work done and transforming how work gets
                  done. We offer them high-quality workforce you need, when you
                  need it. Our solutions help you deliver any project on time
                  and within budget.
                </p> */}
                <div className="section-one-btn-div">
                  <Link to="/contractorlanding">
                    <span className="home-btn-primary contrtor-btn">
                      EPC Contractors
                    </span>
                  </Link>
                  <Link to="/specialistlanding">
                    <span className="home-btn-primary specilst-btn">
                      Pipeline Specialists
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
                Molecular is a technology-driven workforce management solution
                for technical specialists in Africa’s natural gas industry
              </h4>
              {/* <p className="section-three-parag1">
                We are the leading workforce management solution for the skilled
                specialists. We make it easier for workers to find work and for
                companies to find in-demand for special workforce needed.
              </p>
              <p className="section-three-parag2">
                Through people and technology, we provide staffing, training,
                and professional services to empower the specialists who get
                hard work done.
              </p> */}
              {/* <Link to="/Learnmore">
                <span className="home-btn-primary learnmorebtn">
                  Learn More
                </span>
              </Link> */}
              <div className="section-three-subheading">
                <span> Our Mission </span>
                <img
                  src={yellowline}
                  className="purpleline img-fluid"
                  alt="pic2"
                />
              </div>
              <p className="section-three-heading">
                To empower the people who do the hard work of powering Africa
                through natural gas pipelines
              </p>
            </div>
          </Col>
          <Col md={6} data-aos="zoom-in-up" className="sctn3col2">
            <img
              src={oilengineers}
              className="img-fluid oilengimg"
              alt="pic3"
            />
          </Col>
        </Row>
      </div>
      <div className="section-four">
        <Container>
          <div className="homepg-cards-wrapper">
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={star} alt="pic4" />
                <p>Get the Job Done</p>
              </div>
              <p>
                Our technical specialists get your jobs done right the first
                time, and every time.
              </p>
            </div>
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={target} alt="pic5" />
                <p>Quality and Safety</p>
              </div>
              <p>
                Our highly vetted technical specialists are certified and
                skilled to ensure strict adherence to international standards
                and great project outcomes. We take Quality and Safety very
                seriously.
              </p>
            </div>
            <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={meter} alt="pic6" />
                <p>Efficient Deployment </p>
              </div>
              <p>
                We provide the technical specialists you need, when you need
                them
              </p>
            </div>
            {/* <div className="homepg-cards">
              <div className="homepg-cards-title">
                <img src={greencheck} alt="pic7" />
                <p>Certify Specialists</p>
              </div>
              <p>
                We connect you with the workers you need. No matter what you're
                looking for, our diverse workforce can meet your unique needs.
              </p>
            </div> */}
          </div>
        </Container>
        <div id="our_services"></div>
      </div>
        <div className="section-five">
          <Row>
            <Col md={6} className="section-five-img-col">
              <img src={lead} className="img-fluid fluid8" alt="pic8" />
            </Col>
            <Col md={6} className="section-five-content">
              <div className="section-five-subheading">
                <span> What we do </span>
              </div>
              <div className="section-five-paragp1">
                We Empower the People Who Do the Hard Work of Powering Africa
                though Natural Gas Pipelines.
              </div>
              <div><Link to="/learnmore" className="btn-text">Learn more &rarr;</Link></div>
              <div className="section-fivebtn-wrapp">
                <Link to="/contractorlanding">
                <span className="home-btn-primary contrtor-btn">
                  EPC Contractors
                </span>
              </Link>
              {/* <span
                  onClick={specialistSection}
                  className="section-five-btn scfvspclstbtn"
                > */}
              <Link to="/specialistlanding">
                <span
                  className="home-btn-primary specilst-btn"
                  onClick={specialistSection}
                >
                  Pipeline Specialists
                </span>
              </Link>
            </div>
            {/* <p className="section-five-paragp2">
                Access reliable workforce.
                <br /> Our platform meets your need as a contractor, as well as
                a specialised skilled worker.
              </p> */}
            {/* <p className="section-five-paragp3">
                MolecularTech aggregates end-to-end natural gas pipeline
                operations to help Engineering, Procurement & Construction(EPC)
                Operators in the upstream, midstream and downstream sectors of
                the natural gas industry, on one hand, and Technical Pipeline
                Specialists such as Pipeline Welding, Fitting, HDD, Drilling and
                Steering Professionals, on the other hand, to achieve efficient
                deployment and engagement for Pipeline Construction Projects.
              </p> */}
            {/* <div className="section-five-btn-wrap">
                <Link to="/contractor_signup">
                  <span className="home-btn-primary sectnfivecontrtor-btn">
                    Hire Specialists
                  </span>
                </Link>
              </div> */}
          </Col>
        </Row>
      </div>
      {/* {toggleSections === false && (
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
                  className="home-btn-primary specilst-btn"
                >
                  EPC Contractors
                </span>
                <span className="home-btn-primary contrtor-btn">
                  Pipeline Specialists
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
                  <span className="home-btn-primary getjobbtn">Get Job</span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      )} */}
      <div className="section-six">
        <h4 data-aos="fade-down">
          We use technology to streamline everything from recruiting to payments.
           We're focused on delivering quality outcomes for EPC Contractors and Technical Specialists
        </h4>
        {/* <p>Jennifer Ghan — CEO</p> */}
      </div>
      <Work />
      <Footer />
    </div>
  );
};
export default Home;
