import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Widgets/navigation";
import "./home.css";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import facebook from "../../images/facebook_white.png";
import twitter from "../../images/twitter_white.png";
import instagram from "../../images/instagram_white.png";
import mail from "../../images/mail_2.png";
import phone from "../../images/phone.png";
import address from "../../images/address.png";
import jointcircle from "../../images/jointcircle.png";

const ContacUs = () => {
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
      <div className="toppagepadding"></div>
      <div></div>
      <Container fluid>
        <Row className="cntctpgrow">
          <Col md={6}>
            <div className="contact_jointcircle">
              <img src={jointcircle} alt="img" />
            </div>
            <div className="contact_form-wrap">
              <form className="contact_form">
                <h2>Contact US</h2>
                <p>
                  Feel free to contact anytime, we’ll get back to you as soon as
                  possible.
                </p>
                <label>
                  Name
                  <input type="text" className="form-control cntinput" />
                </label>
                <label>
                  Email
                  <input type="text" className="form-control cntinput" />
                </label>
                <label>
                  Message
                  <input type="text" className="form-control cntinput" />
                </label>
                <span className="formbtn">SEND</span>
              </form>
            </div>
          </Col>
          <Col md={6} className="contactpgcol2">
            <div className="cntctpg_socialicons">
              <span className="cntactpg_logos">
                <img src={facebook} className="img-fluid" />
              </span>
              <span className="cntactpg_logos">
                <img src={twitter} className="img-fluid" />
              </span>
              <span className="cntactpg_logos">
                <img src={instagram} className="img-fluid" />
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={6} className="infowrapcol">
            <div className="infowrap">
              <h2 className="info">Info</h2>
              <ul className="section-3-list">
                <li className="listflex">
                  <span className="list_bullet">
                    <img src={mail} />
                  </span>
                  <span>Aoderinde@molecularpro.co</span>
                </li>
                <li className="listflex">
                  <span className="list_bullet">
                    <img src={phone} />
                  </span>
                  08134045999
                </li>
                <li className="listflex">
                  <span className="list_bullet">
                    <img src={address} />
                  </span>
                  <span>
                    Plot 58, Molecular Plaza, behind Exxonmobil limited,
                    Porthacourt, Rivers State, Nigeria.
                  </span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default ContacUs;
