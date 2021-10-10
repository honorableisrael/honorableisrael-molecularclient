import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import chevron from "../../images/chevronright.png";
import AOS from "aos";
import "aos/dist/aos.css";
import lightbulb from "../../images/lightbulb.png";
import { Link } from "react-router-dom";

const Work = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <div className="section-seven">
        <div className="section_sevenrow"> 
          <div  className="lightbulb-img">
          <img src={lightbulb} className="img-fluid"/>
          </div>
          <div  className="section-seven-content-wrapp">
            <h4 className="section-seven-heading">
              Let’s get the hard work done
            </h4>
            <p className="section-seven-content">
              We make your work processes and cycle easy for completion{" "}
            </p>
          </div>
          <div   className="section-seven-content-wrapp wnbmobbtnwrap">
            <div>
              <div>
                <Link to="/contractorlanding">
                  <span className="buildsctnbtn bldcontrtor-btn">
                    EPC Contractors
                  </span>
                </Link>
              </div>
              <div>
                <Link to="/specialistlanding">
                  <span className="buildsctnbtn bldspecilst-btn">
                    Pipeline Specialists
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Work;

{
  /* <form className="section-seven-form">
                <Row style={{justifyContent:"space-between", flexWrap:"nowrap"}}>
                  <Col md={6} className="inputcol">
                    <input
                      type="text"
                      size={30}
                      className="section-seven-forminpt form-control"
                      placeholder="Enter your email"
                    />
                  </Col>
                  <Col md={2} className="section-seven-form-btn">
                    <img src={chevron}/>
                  </Col>
                </Row>
              </form> */
}
