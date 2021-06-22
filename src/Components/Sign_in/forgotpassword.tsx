import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row, Container, Alert, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { API } from "../../config";
import "./signin.css";

const ForgotPassword = withRouter((props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isloading: false,
    errorMessage: "",
  });
  const { email, password, errorMessage, isloading } = state;
  const validateForm = (e) => {
    e.preventDefault();
    if (!email) {
      return setState({
        ...state,
        errorMessage: "Email address is required",
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
    };
    axios
      .post(`${API}/login`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("loggedDetails",JSON.stringify(res.data))

        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status == 406) {
          return setState({
            ...state,
            errorMessage: err?.response?.data?.errors?.email[0],
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
          errorMessage: "Login Failed",
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
    });
  };
  return (
    <div>
      <section className="signin-section">
        <div className="signinImage"></div>
        <Container>
          <Row className="signin-form-row">
            <Col md={7}>
              <form className="form-wrapper" onSubmit={validateForm}>
                <div className="form-header">
                  <h6 className="siginheading">Forgot Password</h6>
                  <h4 className="form-title"></h4>
                  {errorMessage && (
                    <div className="text-center">
                      <Alert variant={"danger"}>{errorMessage}</Alert>
                    </div>
                  )}
                </div>
                <div className="padded-signin-wrapper">
                  <label className="inputlabel">
                    <span className="rdfrmlbl"> Email Address</span>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={onchange}
                      placeholder="Enter your Email Address"
                      size={60}
                      className="form-control forminput"
                    />
                  </label>
                  <div className="form-btn-wrapper loginbtdv">
                    <input
                      className="signinbtn"
                      type="submit"
                      onSubmit={validateForm}
                      value={isloading ? "Submitting..." : "Submit"}
                    />
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          <div className="signin-footer-rights">
            ©2021 Molecular copyright All rights Reserved
          </div>
        </Container>
      </section>
    </div>
  );
});
export default ForgotPassword;
