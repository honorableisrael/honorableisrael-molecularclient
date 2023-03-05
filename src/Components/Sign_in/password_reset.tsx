import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row, Container, Alert, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config";
import "./signin.css";

const Password_Reset = (props) => {
  const [state, setState] = useState({
    confirm_password: "",
    password: "",
    email: "",
    isloading: false,
    errorMessage: "",
  });
  const { confirm_password, password, errorMessage, isloading, email } = state;
  const validateForm = (e) => {
    e.preventDefault();
    if (!confirm_password || !password || !email) {
      return setState({
        ...state,
        errorMessage: "Password is required",
      });
    }
    submitForm();
  };
  const submitForm = () => {
    setState({
      ...state,
      isloading: true,
    });
    const query = new URLSearchParams(props.location.search);
    const Token = query.get("token");
    console.log(Token);
    const data = {
      password_confirmation: confirm_password,
      password,
      email,
      token: Token,
    };
    axios
      .post(`${API}/password/reset`, data)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          return window.location.assign("/#/signin");
        }, 3000);
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
            errorMessage: err?.response?.data?.errors?.password?.join(""),
            isloading: false,
          });
        }
        if (err?.response?.status == 400) {
          return setState({
            ...state,
            errorMessage: err?.response?.data?.message,
            isloading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "Password reset Failed",
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
      isloading: false,
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
                  <h6 className="siginheading">Reset Password</h6>
                  <h4 className="form-title"></h4>
                  {errorMessage && (
                    <div className="text-center">
                      <Alert variant={"danger"}>{errorMessage}</Alert>
                    </div>
                  )}
                </div>
                <div className="padded-signin-wrapper">
                  <label className="inputlabel">
                    <label className="inputlabel">
                      <span className="rdfrmlbl"> Email</span>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onchange}
                        size={60}
                        className="form-control forminput"
                      />
                    </label>
                    <span className="rdfrmlbl"> Password</span>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onchange}
                      size={60}
                      className="form-control forminput"
                    />
                  </label>
                  <label className="inputlabel">
                    <span className="rdfrmlbl"> Confirm Password</span>
                    <input
                      type="password"
                      name="confirm_password"
                      value={confirm_password}
                      onChange={onchange}
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
            ©2021 MolecularPro copyright All rights Reserved
          </div>
        </Container>
      </section>
    </div>
  );
};
export default Password_Reset;
