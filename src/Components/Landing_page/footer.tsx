import React from 'react';
import './home.css'
import {Container, Row ,Col} from 'react-bootstrap';
import footerlogo from "../../images/footerlogo.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";
import light from "../../images/lightbulb.png";




const Footer =()=>{
    return(
        <div>
           <div className="footer-section">
        <Container fluid={true} className="good12">
          <div className="footer-wrapper">
            <div className="fter-cmpny-dscrtn">
              <div className="footer-logodv"><img src={footerlogo} alt="molecularlogo"/></div>
              <p className="">Get special skill work done and transforming how work gets done. 
                We offer the high quality workforce 
                you need, when you need it. Our solutions help you deliver 
                any project on time and within budget.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Company</h4>
              <p className="footer-links">Home</p>
              <p className="footer-links">Our Services</p>
              <p className="footer-links">Projects</p>
              <p className="footer-links">Careers</p>
              <p className="footer-links">Contact Us</p>
            </div>
            <div>
              <h4 className="footer-title">Contractor</h4>
              <p className="footer-links">Hire</p>
              <p className="footer-links">Industries</p>
            </div>
            <div>
              <h4 className="footer-title">Specialist</h4>
              <p className="footer-links">Find Work</p>
              <p className="footer-links">Industries</p>
            </div>
            <div>
              <h4 className="footer-title">Socials</h4>
              <div className="footer-socialwrapper">
                <span>
                  <img src={facebook} alt="img"/>
                </span>
                <span>
                  <img src={instagram} alt="img"/>
                </span>
                <span>
                  <img src={twitter} alt="img" />
                </span>
                <span>
                  <img src={linkedin} alt="img"/>
                </span>
              </div>
              <p className="footer-links">info@molecular.com</p>
            </div>
          </div>
          <div className="copyrightwrap">
            <div className="reserves">©2021 Molecular copyright, All rights Reserved.</div>
            <div className="terms">Terms & Conditions</div>
            <div className="privacy">Privacy Policy</div>
          </div>
        </Container>
      </div>
  </div>
    )
}
export default Footer;