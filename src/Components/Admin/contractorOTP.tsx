import React,{ useState } from "react";
import { Col, Row, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup.css";
import otplogo from "../../images/otplogo.png";


const ContractorOTP = () => {
  
  const [otp, setOtp] =  useState(new Array(6).fill(""))
  
  const handleChange = (element, index) => {
    //only numbers are allowed
    if(isNaN(element.value)) return false;
    
     //update state
     setOtp([...otp.map((d, idx)=>
          (idx===index) ? element.value : d
     )]);
     //next input focus  
  if(element.nextSibling){
    element.nextSibling.focus();
  }

  };

  return (
    <div>
      <section className="forms-section">
        <div className="forms-section-image"></div>
        <div className="formwrplift">
          <Container>
            <Row className="form-row">
              <Col md={8} className="otp-wrapper">
                <div><img src={otplogo} alt="img" className="otplogo"/></div>
                <h3 className="otp-welcmtxt">Welcome, <span>Smith</span></h3>
                <p>Kindly enter the 6-digits OTP sent to your registered email Address</p>
                <div className="otpinput-wrapp">    
                  {otp.map((data, index) =>{
                        return( 
                         <input 
                          type="text" 
                          className="otpinput"
                          maxLength={1}
                          key={index}
                          value={data}
                          onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                          />
                        );
                    })
                  }   
                </div>
                <div className="form-btn-wrapper loginbtdv">
                    <span className="signinbtn">Verify me</span>
                </div>
              </Col>
            </Row>
            <div className="footer-rights">©2021 MolecularPro copyright All rights Reserved</div>
          </Container>
        </div>
      </section>
    </div>
  );
};
export default ContractorOTP;