import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Container, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./signup.css";
import formCaret from "../../images/caret.png";
import axios from "axios";
import { API, notify, reloadPage } from "../../config";
import Axios, { AxiosResponse } from "axios";
import eye from "../../images/eye.png";
import eyeclose from "../../images/eye-off.png";
import NavBar from "../Widgets/navigation";

const Contractorsignup = withRouter((props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    company_name: "",
    website_url: "",
    passwordIsOpen: true,
    industry: "1",
    isloading: false,
    listOfIndustries: [],
    contractor_needs: [],
    agree: false,
    help: "",
    errorMessage: "",
    successMessage: "",
  });
  const {
    email,
    listOfIndustries,
    contractor_needs,
    password,
    first_name,
    last_name,
    phone,
    company_name,
    successMessage,
    help,
    website_url,
    industry,
    errorMessage,
    isloading,
    agree,
    passwordIsOpen,
  } = state;
  const validateForm = (e) => {
    e.preventDefault();
    if (!email) {
      return setState({
        ...state,
        errorMessage: "Email address is required",
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
    if (!agree) {
      return setState({
        ...state,
        errorMessage: "Please agree to terms and condition",
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
      // password,
      first_name,
      last_name,
      help,
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
        localStorage.setItem("loggedInDetails", JSON.stringify(res.data));
        // if (res?.data?.user_type == "contractor") {
        //   return props.history.push("/contractor_dashboard");
        // }
        setState({
          ...state,
          isloading: false,
          successMessage:
            "Successfully signed up, your account would be activated within the next 48hours",
        });
        reloadPage();
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err?.response);
        window.scrollTo(0, 0);
        if (err?.response?.status == 406) {
          return setState({
            ...state,
            errorMessage:
              err?.response?.data?.errors?.password?.join("") ||
              err?.response?.data?.errors?.email?.join("") ||
              err?.response?.data?.errors?.industry?.join("") ||
              err?.response?.data?.errors?.website_url.join(""),
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
          errorMessage: "Registration Failed",
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
  const onChangepassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };
  const hidePassword = () => {
    setState({
      ...state,
      passwordIsOpen: passwordIsOpen ? false : true,
    });
  };
  const fieldRef: any = useRef();
  useEffect(() => {
    if (errorMessage || (successMessage && fieldRef)) {
      window.scrollTo(0, 0);
    }
  }, [errorMessage, successMessage]);
  useEffect(() => {
    window.scrollTo(-0, -0);
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/industries`),
      Axios.get<any, AxiosResponse<any>>(`${API}/contractor-needs`),
    ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          console.log(res2.data);
          setState({
            ...state,
            listOfIndustries: res.data.data,
            contractor_needs: res2.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(agree);
  return (
    <div>
      <NavBar />
      <section className="forms-section">
        <div className="forms-section-image"></div>
        <div className="formwrplift">
          <Container>
            <Row className="form-row">
              <Col md={8}>
                <form className="form-wrapper ml__">
                  <div className="padded-form-wrapper">
                    <div className="form-header">
                      <h4 className="form-title">
                        Sign up to get Technical Specialist
                      </h4>
                    </div>
                    <div className="form-descr-text">
                      <p>
                        Connect with a member of our team to explore how
                        MolecularTech can support you and your business to get
                        technical specialists. Leave some information about you
                        & company, and we’ll contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="padded-input-wrapper" ref={fieldRef}>
                    <Row>
                      <Col md={12} className="col_space">
                        {errorMessage && (
                          <div className="text-center">
                            <Alert variant="danger" className="cntralertmessg">
                              {errorMessage}
                            </Alert>
                          </div>
                        )}
                        {successMessage && (
                          <div className="text-center ">
                            <Alert variant="success" className="cntralertmessg">
                              {successMessage}
                            </Alert>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            First Name
                            <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={onchange}
                            // placeholder="Enter your first name"
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
                            value={last_name}
                            onChange={onchange}
                            // placeholder="Enter your Last name"
                            size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                      <Col md={12}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Email <span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onchange}
                            // placeholder="Enter your email"
                            // size={75}
                            className="form-control forminput"
                          />
                        </label>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md={12}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            Password <span className="asteric">*</span>
                          </span>
                          <input
                            type={passwordIsOpen ? "password" : "text"}
                            name="password"
                            onChange={onChangepassword}
                            value={password}
                            // placeholder="Enter your password"
                            // size={75}
                            className="form-control forminput"
                          />
                        </label>
                        <div className="text-right">
                          {passwordIsOpen ? (
                            <img
                              src={eye}
                              className="hideeye"
                              onClick={hidePassword}
                              alt="hideeye"
                            />
                          ) : (
                            <img
                              src={eyeclose}
                              className="hideeye"
                              onClick={hidePassword}
                              alt="hideeye"
                            />
                          )}
                        </div>
                      </Col>
                    </Row> */}
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
                            value={company_name}
                            onChange={onchange}
                            // placeholder="Enter your Company Name"
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
                            value={phone}
                            onChange={onchange}
                            // placeholder="Enter your Phone Number"
                            size={96}
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
                            How do we help you
                            <span className="asteric">*</span>
                          </span>
                          <select
                            onChange={onchange}
                            className="forminput formselect form-control"
                            required
                            name="help"
                          >
                            <option></option>
                            {contractor_needs.map((data: any) => (
                              <option value={data.id}>{data.need}</option>
                            ))}
                          </select>
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
                        value={website_url}
                        onChange={onchange}
                        // placeholder="E.g http://www.example.com"
                        size={96}
                        className="form-control forminput"
                      />
                    </label>
                    {/* <span className="rdfrmlbl">
                      {" "}
                      Industry<span className="asteric">*</span>
                    </span>
                    <select
                      onChange={onchange}
                      className="forminput formselect form-control"
                      required
                      name="industry"
                    >
                      <option value=""></option>
                      {listOfIndustries.map((data: any) => (
                        <option value={data.id}>{data.name}</option>
                      ))}
                      <option></option>
                       {listOfIndustries?.map((data: any, i) => (
                        <option className="rdsltopt" key={i}>
                          {data?.name}
                        </option>
                      ))} 
                    </select> */}
                    <br></br>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={agree ? true : false}
                        onChange={() => {
                          setState({
                            ...state,
                            agree: !agree ? true : false,
                          });
                        }}
                        id="flexCheckDefault"
                      />
                      Creating an account means you agree with our{" "}
                      <label className="form-check-label">
                        <Link to="/privacy" target="_blank">
                          Terms of Service , Privacy Policy
                        </Link>
                      </label>
                      , and our
                      <br />
                      default Notification Settings.
                    </div>
                    <div className="form-btn-wrapper">
                      <span
                        className="form-btn form-btnactive"
                        onClick={validateForm}
                      >
                        {!isloading ? "Create Account" : "Processing..."}
                      </span>
                    </div>
                    <Link to="/signin">
                      <p className="signuprgqt">
                        Have Molecular account?<span> Login</span>
                      </p>
                    </Link>
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
