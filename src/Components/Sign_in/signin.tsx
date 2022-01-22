import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row, Container, Alert, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { API } from "../../config";
import "./signin.css";
import NavBar from "../Widgets/navigation";



const SignIn = withRouter((props) => {
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
    if (!password) {
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
    const data = {
      email,
      password,
    };
    axios
      .post(`${API}/login`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("loggedInDetails",JSON.stringify(res.data))
        if(res?.data?.user_type=="admin"){
          props.history.push("/admin_dashboard")
        }
        if(res?.data?.user_type=="contractor"){
          props.history.push("/contractor_dashboard")
        }
        if(res?.data?.user_type=="specialist"){
          props.history.push("/specialistdashboard")
        }
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
       <NavBar />
      <section className="signin-section">
        <div className="signinImage"></div>
        <Container>
          <Row className="signin-form-row">
            <Col md={7}>
              <form className="form-wrapper" onSubmit={validateForm}>
                <div className="form-header">
                  <h6 className="siginheading">Welcome Back!</h6>
                  <h4 className="form-title">Login to your Account</h4>
                  {errorMessage && (
                    <div className="signinalertmssg">
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
                      // placeholder="Enter your Email Address"
                      size={60}
                      className="form-control forminput"
                    />
                  </label>
                  <label className="inputlabel">
                    <span className="rdfrmlbl">Password</span>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onchange}
                      //placeholder="Enter your Password"
                      size={60}
                      className="form-control forminput"
                    />
                  </label>
                  {/* <div className="forgotpassword"><Link to="/forgot_password">Forgot Password?</Link></div> */}
                  <div className="form-btn-wrapper loginbtdv">
                    <input
                      className="signinbtn"
                      type="submit"
                      onSubmit={validateForm}
                      value={isloading ? "Logging in..." : "Login"}
                    />
                  </div>
                  <Link to="/contractor_signup"><p className="signuprgqt">Dont have Molecular account?<span> Sign up</span></p></Link>
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
export default SignIn;
