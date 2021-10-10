import React,{useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import greenbib from "../../images/greenbib.png";
import handshake from "../../images/handshake.png";
import yellowhelmet from "../../images/yellowhelmet.png";
import handset from "../../images/handset.png";
import bullet from "../../images/shortline.png";
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
              MolecularTech is a company you can count on to get hard work done
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
      {/* <div className="cntrotlndg-section3">
        <p>People You Can Count On. High-Quality Work.</p>
        <div className="cardlift">
          <div className="cntrotlndg-section3-cards">
            <div className="cntrotlndg-section3-card-content">
              <img src={handshake} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  Match Projects with skilled specialists
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  We understand your needs and match you with the right worker
                  for your unique job. We provide flexible, on-demand, and
                  cost-effective labor when and where you need it.
                </p>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={yellowhelmet} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  Match Projects with skilled specialists
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  We understand your needs and match you with the right worker
                  for your unique job. We provide flexible, on-demand, and
                  cost-effective labor when and where you need it.
                </p>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
            <div className="cntrotlndg-section3-card-content">
              <img src={handset} className="img-fluid" alt="img" />
              <div className="cntrotlndg-section3-card-wrapp">
                <p className="cntrotlndg-section3-card-subhead">Hire Smartly</p>
                <h4 className="cntrotlndg-section3-card-heading">
                  Match Projects with skilled specialists
                </h4>
                <p className="cntrotlndg-section3-card-descr">
                  We understand your needs and match you with the right worker
                  for your unique job. We provide flexible, on-demand, and
                  cost-effective labor when and where you need it.
                </p>
                <div className="cardbulletwrap">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="cntrotlndg-section4">
        <Link to="/contractor_signup">
          <span className="home-btn-primary contrtor-btn">
            Sign up as a Contractor
          </span>
        </Link>
      </div> */}
      <Work />
      <Footer />
    </div>
  );
};
export default ContractorLanding;
