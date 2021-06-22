import React, { useEffect, useState } from "react";
import { Col, Row, Container, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./signup.css";
import formCaret from "../../images/caret.png";
import axios from "axios";
import { API } from "../../config";

const Contractorsignup = withRouter((props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    company_name: "",
    website_url: "",
    industry: "",
    isloading: false,
    listOfIndustries: [],
    errorMessage: "",
    successMessage: "",
  });
  const {
    email,
    listOfIndustries,
    password,
    first_name,
    last_name,
    phone,
    company_name,
    successMessage,
    website_url,
    industry,
    errorMessage,
    isloading,
  } = state;
  const validateForm = (e) => {
    e.preventDefault();
    if (!email) {
      return setState({
        ...state,
        errorMessage: "Email address is required",
      });
    }
    if (!password) {
      return setState({
        ...state,
        errorMessage: "Password is required",
      });
    }
    if (!first_name) {
      return setState({
        ...state,
        errorMessage: "First name is required",
      });
    }
    if (!last_name) {
      return setState({
        ...state,
        errorMessage: "Last name is required",
      });
    }
    if (!phone) {
      return setState({
        ...state,
        errorMessage: "Phone number is required",
      });
    }
    if (!company_name) {
      return setState({
        ...state,
        errorMessage: "Company name is required",
      });
    }
    if (!website_url) {
      return setState({
        ...state,
        errorMessage: "website url is required",
      });
    }
    if (!industry) {
      return setState({
        ...state,
        errorMessage: "industry is required",
      });
    }
    submitForm();
  };
  const submitForm = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      email,
      password,
      first_name,
      last_name,
      phone,
      company_name,
      website_url,
      industry,
    };
    console.log(data);
    axios
      .post(`${API}/register/contractor`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("loggedDetails", JSON.stringify(res.data));
        if (res?.data?.user_type == "admin") {
          return props.history.push("/admin_dasboard");
        }
        if (res?.data?.user_type == "contractor") {
          return props.history.push("/contractor_dashboard");
        }
        setState({
          ...state,
          isloading: false,
          successMessage: "Successfully signed up",
        });
      })
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status == 406) {
          return setState({
            ...state,
            errorMessage: err?.response?.data?.errors?.email[0],
            successMessage: "",
          });
        }
        if (err?.response?.status == 400) {
          return setState({
            ...state,
            errorMessage: err?.response?.data?.message,
          });
        }
        setState({
          ...state,
          errorMessage: "Registration failed",
          isloading: false,
        });
      });
  };
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMessage: "",
    });
  };
  useEffect(() => {
    window.scrollTo(-0,-0);
    axios
      .get(`${API}/industries`)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          listOfIndustries: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(listOfIndustries[0]);
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
                      <h4 className="form-title">Sign up to get Technical Specialist</h4>
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
                      {errorMessage && (
                        <div className="text-center">
                          <Alert variant={"danger"}>{errorMessage}</Alert>
                        </div>
                      )}
                      {successMessage && (
                        <div className="text-center">
                          <Alert variant={"info"}>{successMessage}</Alert>
                        </div>
                      )}
                    </Row>
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
                            name="first_name"
                            onChange={onchange}
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
                            name="last_name"
                            onChange={onchange}
                            placeholder="Enter your Last name"
                            size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                      <Col md={6}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Email <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="email"
                            onChange={onchange}
                            placeholder="Enter your email"
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
                            Password <span className="asteric">*</span>
                          </span>
                          <input
                            type="password"
                            name="password"
                            onChange={onchange}
                            placeholder="Enter your password"
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
                            onChange={onchange}
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
                            Contact Phone Number
                            <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="phone"
                            onChange={onchange}
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
                        Company URL<span className="asteric">*</span>
                      </span>
                      <input
                        type="text"
                        name="website_url"
                        onChange={onchange}
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
                      onChange={onchange}
                      className="forminput formselect form-control"
                      required
                      name="industry"
                    >
                      <option className="formselect" value={1}>Oil and Gas</option>
                      {/* {listOfIndustries?.map((data: any, i) => (
                        <option className="rdsltopt" key={i}>
                          {data?.name}
                        </option>
                      ))} */}
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
                      <span
                        className="form-btn form-btnactive"
                        onClick={submitForm}
                      >
                        {!isloading ? "Create Account" : "Creating Account"}
                      </span>
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
});
export default Contractorsignup;
