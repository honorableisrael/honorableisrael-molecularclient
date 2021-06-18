import React from "react";
import { Col, Row, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup.css";
import formCaret from "../../images/caret.png";

const ContractorOnboarding = () => {
  return (
    <div>
      <section className="forms-section">
        <div className="forms-section-image"></div>
        <div className="formwrplift">
          <Container>
            <Row className="form-row">
              <Col md={8}>
                <form className="form-wrapper ml__">
                  <div className="padded-form-wrapper">
                    <div className="form-header">
                      <h4 className="form-title">Contractor Onboarding</h4>
                    </div>
                    <div className="form-descr-text">
                      <p>
                        Are you ready to join one of the largest communities for
                        contractor? Simply fill out the form below.
                      </p>
                    </div>
                  </div>
                  <div className="padded-input-wrapper">
                    <Row>
                      <Col md={6}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Contact Person’s First Name
                            <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="firstname"
                            placeholder="Enter your first name"
                            size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                      <Col md={6}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Last Name <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="lastname"
                            placeholder="Enter your Last name"
                            size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Company Name <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="company_name"
                            placeholder="Enter your Company Name"
                            size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Contact Phone Number<span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="lastname"
                            placeholder="Enter your Phone Number"
                            size={96}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                    </Row>
                    <label className="inputlabel">
                      <span className="rdfrmlbl">
                        {" "}
                        Email Address<span className="asteric">*</span>
                      </span>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Enter your Email Address"
                        size={96}
                        className="form-control forminput"
                      />
                    </label>
                    <label className="inputlabel">
                      <span className="rdfrmlbl">
                        {" "}
                        Company URL<span className="asteric">*</span>
                      </span>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Enter your Phone Number"
                        size={96}
                        className="form-control forminput"
                      />
                    </label>
                    <span className="rdfrmlbl">
                        {" "}
                        Industry<span className="asteric">*</span>
                      </span>
                    <select
                      className="forminput formselect form-control"
                      required
                    >
                      <option
                        value=""
                        className="formselect"
                        disabled
                        selected
                        hidden
                      >
                      </option>
                      <option value="Oil and Gas" className="rdsltopt">
                        Oil and Gas
                      </option>
                      <option value="Construction" className="rdsltopt">
                        Construction
                      </option>
                    </select>
                    <br></br>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        Creating an account means you’re okay with our Terms of
                        Service, Privacy Policy, and our
                        <br />
                        default Notification Settings.
                      </label>
                    </div>
                    <div className="form-btn-wrapper">
                      <span className="form-btn">Create Account</span>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
            <div className="footer-rights">
              ©2021 Molecular copyright All rights Reserved
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};
export default ContractorOnboarding;
