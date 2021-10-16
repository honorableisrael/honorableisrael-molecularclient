import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Widgets/navigation";
import "./home.css";
import whitehelmet from "../../images/whitehelmet.png";
import lead from "../../images/leadengineers.jpg";
import handshake from "../../images/handshake.png";
import yellowhelmet from "../../images/yellowhelmet.png";
import handset from "../../images/handset.png";
import bullet from "../../images/shortline.png";
import flame from "../../images/flame.png";
import lightflame from "../../images/lightflame.png";
import ladder from "../../images/ladder.png";
import lightladder from "../../images/lightladder.png";
import cupboard from "../../images/cupboard.png";
import lightbarrel from "../../images/lightbarrel.png";
import Work from "./workandbuild";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Learnmore = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="cntrotlndg-section1">
        <Row>
          <Col md={6} className="learnmrlndg-section1-contnt">
            {/* <h4 data-aos="fade-up">
              We Empower the People Who Do the Hard Work of Powering Africa
              though Natural Gas Pipelines.
            </h4> */}
            <p className="learnmsctn1-mpargh1">
              MolecularTech aggregates end-to-end natural gas pipeline
              operations to help Engineering, Procurement & Construction(EPC)
              Operators in the upstream, midstream and downstream sectors of the
              natural gas industry, on one hand, and Technical Pipeline
              Specialists such as Pipeline Welding, Fitting, HDD, Drilling and
              Steering Professionals, on the other hand, to achieve efficient
              deployment and engagement for Pipeline Construction Projects.
            </p>
            <p className="learnmsctn1-pargh2">
              With people and technology, we make it easier for the Operators to
              find in-demand technical pipeline specialists and for the latter
              to find more work. With a few clicks of a button on our seamless
              Mobile and Web applications, EPC Operators can simply request any
              type and number of Technical Specialists for deployment to their
              projects.
            </p>
            <p className="learnmsctn1-pargh3">
            Molecular uses big data and artificial intelligence to efficiently match the Operators’ requirements to the work preferences of our Technical Specialists.
Molecular enables rapid, efficient and cost effective deployment of Pipeline Specialists, while ensuring that the latter get more jobs and get paid promptly.
            </p>
          </Col>
          <Col md={6} className="whithelmetwrapp">
            <img
              src={lead}
              className="whitehelmet-img img-fluid"
              alt="img"
            />
          </Col>
        </Row>
      </div>
      {/* <div className="learnmrsection2">
           <h4>Industries we operate in</h4> 
          <div className="learnm-cards-wrapper">
            <div className="learnmr-cards"  data-aos='flip-left'>
              <div className="learnmr-cards-title">
                <img src={ladder} alt="pic4" />
                <p>Contruction Industry</p>
              </div>
              <p>
              We help contractors and subcontractors working on commercial, 
              industrial, and infrastructure projects scale their businesses and accept more work 
              through high-quality people and solutions.
              </p>
              <div className="text-right"><img src={lightladder} alt="img"/></div>
            </div>
            <div className="learnmr-cards"  data-aos='flip-left'>
              <div className="learnmr-cards-title">
                <img src={cupboard} alt="pic5" />
                <p>Oil & Gas Industry</p>
              </div>
              <p className="barrpara">
              We help midstream energy companies deliver projects on time and on budget, 
              with highly trained, flexible workers across construction, maintenance, and operations.
              </p>
              <div className="text-right"><img src={lightbarrel} alt="img"/></div>
            </div>
            <div className="learnmr-cards"  data-aos='flip-left'>
              <div className="learnmr-cards-title">
                <img src={flame} alt="pic6" />
                <p>Upstream Oil & Gas Industry</p>
              </div>
              <p className="flamepara">
              We help operators and vendors optimize their operations through a flexible workforce. 
              We provide high-quality workers and technology-backed solutions for onboarding, payments, 
              compliance, and training.
              </p>
              <div className="text-right"><img src={lightflame} alt="img"/></div>
            </div>
           </div> 
        <div className="lernmrbtndv">
          <span className="home-btn-primary lndlearnmr-btn" data-aos='fade-up'>Sign up</span
        </div>
      </div> */}
      <Work />
      <Footer />
    </div>
  );
};
export default Learnmore;
