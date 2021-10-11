import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import tropicalregion from "../../images/tropicalregion.png";
import Work from "./workandbuild";
import Footer from "./footer";
import jointcircle from "../../images/jointcircle.png";
import tractors from "../../images/tractors.png";
import pipelineonsand from "../../images/pipelineonsand.png";
import pipelineonice from "../../images/pipelineonice.png";
import pipelineindesert from "../../images/pipelineindesert.png";
import ethylene_flame from "../../images/ethlene_flame.png";
import ibejulekki from "../../images/ibejulekki.png";
import db13 from "../../images/db13.png";
import db14 from "../../images/db14.png";
import db16 from "../../images/db16.png";
import flame from "../../images/flame.png";
import lightflame from "../../images/lightflame.png";
import ladder from "../../images/ladder.png";
import lightladder from "../../images/lightladder.png";
import cupboard from "../../images/cupboard.png";
import lightbarrel from "../../images/lightbarrel.png";

const IndustrySegments = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <div>
      <NavBar />
      <div className="toppagepadding"></div>
      <div className="Industry_segment_section-1">
        <img src={jointcircle} alt="img" />
        <h6>Industry Segments</h6>
        <h2>Industry Segments We Operate In</h2>
        {/* <p>
          We help contractors and subcontractors working on commercial,
          industrial, and infrastructure projects scale their businesses and
          accept more work through high-quality specialists and solutions we
          offer.
        </p> */}
      </div>
      <div className="Industry_segment_section-2">
        <Row className="Is_section-1-row">
          <Col md={6}>
            <div className="Is_rowcol1wrap">
              <h4>EPC Contractors</h4>
              <p>
                We help operators and EPC contractors in the upstream, midstream
                and downstream segments of the Gas Industry to deliver on their
                pipeline projects to quality standards, on time and within
                budget.
              </p>
              <p>
                We provide highly vetted, certified, skilled and experienced
                technical specialists.
              </p>
            </div>
          </Col>
          <Col md={6} className="sctn3col2">
            <img src={tractors} className="img-fluid" alt="pic3" />
          </Col>
        </Row>
        <div className="learnmrsection2">
          <div className="learnm-cards-wrapper">
            <div className="learnmr-cards" data-aos="flip-left">
              <div className="learnmr-cards-title">
                <img src={ladder} alt="pic4" />
                <p>Upstream Gas Industry</p>
              </div>
              <p>
                We help operators and vendors optimize their operations through
                a flexible workforce. We provide high-quality workers and
                technology-backed solutions for onboarding, payments,
                compliance, and training.
              </p>
              <div className="text-right">
                <img src={lightladder} alt="img" />
              </div>
            </div>
            <div className="learnmr-cards" data-aos="flip-left">
              <div className="learnmr-cards-title">
                <img src={cupboard} alt="pic5" />
                <p>Midstream Gas Industry</p>
              </div>
              <p className="barrpara">
                We help midstream energy companies deliver projects on time and
                on budget, with highly trained, flexible workers across
                construction, maintenance, and operations.
              </p>
              <div className="text-right">
                <img src={lightbarrel} alt="img" />
              </div>
            </div>
            <div className="learnmr-cards" data-aos="flip-left">
              <div className="learnmr-cards-title">
                <img src={flame} alt="pic6" />
                <p>Downstream Gas Industry</p>
              </div>
              <p className="flamepara">
                We help contractors and subcontractors working on commercial,
                industrial, and infrastructure projects scale their businesses
                and accept more work through high-quality people and solutions.
              </p>
              <div className="text-right">
                <img src={lightflame} alt="img" />
              </div>
            </div>
          </div>
        </div>
        <Row className="Is_section-2-row">
          <Col md={6} className="Is_sectn2_col1">
            <img src={ethylene_flame} className="img-fluid" alt="pic3" />
          </Col>
          <Col md={6}>
            <div className="Is_row2col2wrap">
              <h4>Technical Specialists</h4>
              <p>
                We seek highly skilled technical specialists in welding 5G & 6G,
                pipe fitting, drilling and HDD, to support gas pipeline
                construction projects undertaken by our clients.
              </p>
              <p>
              Let’s get the hard work done
              </p>
            </div>
          </Col>
        </Row>
        {/* <div className="Is_images_section_wrap">
          <div className="Is_images_section">
            <div>
              <img src={pipelineonsand} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={pipelineonice} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={tropicalregion} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={pipelineindesert} className="img-fluid" alt="pic" />
            </div>
          </div>
        </div> */}
        {/* <Row className="Is_section-1-row">
          <Col md={6}>
            <div className="Is_rowcol1wrap">
              <h4>Dangote Refinery, Ibeju Lekki</h4>
              <p>
                We help contractors and subcontractors working on commercial,
                industrial, and infrastructure projects scale their businesses
                and accept more work through high-quality specialists and
                solutions we offer.
              </p>
              <p>
                We get the job done to the highest standards of quality and
                safety. Our work and our track record speak for itself. Your
                business is our business, and we focus on delivering what your
                business needs and doing the job right the first time.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img src={ibejulekki} className="img-fluid" alt="pic3" />
          </Col>
        </Row>
        <div className="Is_images_section_wrap">
          <div className="Is_images_section">
            <div>
              <img src={db13} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={db14} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={tropicalregion} className="img-fluid" alt="pic" />
            </div>
            <div>
              <img src={db16} className="img-fluid" alt="pic" />
            </div>
          </div>
        </div> */}
      </div>
      <Work />
      <Footer />
    </div>
  );
};
export default IndustrySegments;
