import React from "react";
import "./home.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import footerlogo from "../../images/molecularprodarkbg.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";

const Footer = () => {
  return (
    <div>
      <div className='footer-section'>
        <Container fluid={true} className='good12'>
          <div className='footer-wrapper'>
            <div className='fter-cmpny-dscrtn fftclas'>
              <div>
                <div className='footer-logodv'>
                  <img src={footerlogo} alt='molecularlogo' />
                </div>
                <p className=''>
                  MolecularPro is a technology-driven workforce management
                  solution for technical specialists in Africa’s natural gas
                  industry
                </p>
              </div>

              <div className='reserves'>
                ©2022 MolecularPro copyright, All rights Reserved.
              </div>
            </div>
            <div className='fftclas'>
              <div className=''>
                <h4 className='footer-title'>Company</h4>
                {/* <NavHashLink to='/#home'>
                  <p className='footer-links'>Home</p>
                </NavHashLink> */}
                <a href='https://blog.molecularpro.co' target='blank'>
                  <p className='footer-links'>Blog</p>
                </a>
                <Link to='/contactus'>
                  <p className='footer-links'>Contact us</p>
                </Link>
              </div>
              <div className='terms'>Terms & Conditions</div>
            </div>
            <div className='scoialswrap fftclas'>
              <div>
                <h4 className='footer-title'>Socials</h4>
                <div className='footer-socialwrapper'>
                  <a
                    target='_blank'
                    href='https://web.facebook.com/MolecularProTechHQ'>
                    <span>
                      <img src={facebook} alt='img' />
                    </span>
                  </a>
                  <a
                    target='_blank'
                    href='https://www.instagram.com/moleculartechhq/'>
                    <span>
                      <img src={instagram} alt='img' />
                    </span>
                  </a>
                  <a
                    target='_blank'
                    href='https://www.linkedin.com/company/molecular-tech-services/about/'>
                    <span>
                      <img src={linkedin} alt='img' />
                    </span>
                  </a>
                </div>
                <p className='footer-links'>
                  {" "}
                  <a href='mailto:info@dev.molecularpro.co'></a>{" "}
                  info@molecularpro.co
                </p>
              </div>
              <div className='privacy'>
                {" "}
                <Link to='/privacy'> Privacy Policy</Link>
              </div>
            </div>
            <div>
              {/* <h4 className="footer-title">EPC Contractor</h4>
              <Link to="/contractor_signup">
                <p className="footer-links">Hire</p>
              </Link> */}
              {/* <p className="footer-links">Industries</p> */}
            </div>

            <div>
              {/* <h4 className="footer-title">Pipeline Specialist</h4>
              <Link to="/specialist_signup">
                <p className="footer-links">Find work</p>
              </Link> */}
              {/* <p className="footer-links">Industries</p> */}
            </div>
            {/* <div>
              <h4 className="footer-title">Specialist</h4>
              <Link to="/specialist_signup">
                <p className="footer-links">Find Work</p>
              </Link>
              <Link to="/Industry_segments">
                <p className="footer-links">Industries</p>
              </Link>
            </div>  */}
          </div>
          <div className='copyrightwrap'>
            <div></div>
          </div>
          <div className='darkcolor'>
         
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Footer;
