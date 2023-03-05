import React,{useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import greenbib from "../../images/greenbib.png";
import oilengineers from "../../images/oilengineers.jpg";
import yellowhelmet from "../../images/yellowhelmet.jpg";
import handset from "../../images/handset.png";
import lightbulb from "../../images/lightbulb.jpg";
import Work from "./workandbuild";
import Footer from "./footer";


const ContractorLanding = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="cntrotlndg-section1">
        <Row>
          <Col md={6} className="cntrotlndg-section1-contnt">
            <h4>
              Hire Technical Specialists you can count on to get quality work
              done.
            </h4>
            <p>
              MolecularPro is a company you can count on to get hard work done
              well and efficiently. We provide vetted, certified and highly
              skilled workforce you need, when you need them. Our Solutions help
              you deliver on time and within budget on your pipeline
              construction projects.
            </p>
            <Link to="/contractor_signup">
              <span className="home-btn-primary contrtor-btn">
                Hire Specialist
              </span>
            </Link>
          </Col>
          <Col md={6} className="">
            <img src={greenbib} className="findworkimage" alt="img" />
          </Col>
        </Row>
      </div>
       <div className="cntrotlndg-section3">
       <p className="cntrotlndg-section3_heading">
          FOR EPC Contractors{" "}
        </p>
        <p className="cntrotlndg-section3_subheading">
         Hire Smartly
        </p>
        <div className="cardlift">
          <div className="cntrotlndg-section3-cards">
            <div className="cntrotlndg-section3-card-content">
              <img src={oilengineers} className="img-fluid yellhlmetimg" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                Get the Job Done
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                Our technical specialists get your jobs done right the first time, and every time.
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Understand your project specific requirements</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Identify the best candidates from our bench of 268k+ workers
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create a pool of back-up candidates to ensure your project
                    is always fully staffed
                  </p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={yellowhelmet} className="img-fluid yellhlmetimg" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                Quality and Safety
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                Our highly vetted technical specialists are certified and skilled to ensure strict adherence to international 
                standards and great project outcomes. We take Quality and Safety very seriously.
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Understand your project specific requirements</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Identify the best candidates from our bench of 268k+ workers
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create a pool of back-up candidates to ensure your project
                    is always fully staffed
                  </p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={lightbulb} className="img-fluid yellhlmetimg" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                Efficient Deployment
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                We provide the technical specialists you need, when you need them
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Understand your project specific requirements</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Identify the best candidates from our bench of 268k+ workers
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create a pool of back-up candidates to ensure your project
                    is always fully staffed
                  </p>
                </div> */}
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={lightbulb} className="img-fluid yellhlmetimg" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                {/* <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p> */}
                <h4 className="cntrotlndg-section3-card-heading">
                Convenience and Speed
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                </p>
                {/* <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>Understand your project specific requirements</p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Identify the best candidates from our bench of 268k+ workers
                  </p>
                </div>
                <div className="cardbulletwrap">
                  <div>
                    <img src={bullet} alt="img" />
                  </div>
                  <p>
                    Create a pool of back-up candidates to ensure your project
                    is always fully staffed
                  </p>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </div>
       <div className="cntrotlndg-section4">
        <Link to="/contractor_signup">
          <span className="home-btn-primary contrtor-btn">
            Get Started
          </span>
        </Link>
      </div> 
      <Work />
      <Footer />
    </div>
  );
};
export default ContractorLanding;
