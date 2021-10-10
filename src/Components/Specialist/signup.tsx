import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container, Alert, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./signup.css";
import formCaret from "../../images/caret.png";
import axios from "axios";
import { API } from "../../config";
import eye from "../../images/eye.png";
import eyeclose from "../../images/eye-off.png";

const SignUp = withRouter((props: any) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    skill: "",
    isLoading: false,
    errorMessage: "",
    successMessage: "",
    btnState: false,
    jobs: [],
    passwordIsOpen: true,
  });
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    skill,
    isLoading,
    errorMessage,
    successMessage,
    btnState,
    jobs,
    passwordIsOpen,
  } = state;
  const onSubmit = () => {
    setState({ ...state, isLoading: true });
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      password: password,
      skill: skill,
    };
    console.log(data);
    //posting data to the api
    axios
      .post(`${API}/register/specialist`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          //store name and email to local storage
          const userdata: any = [];
          userdata.push(email, firstName);
          localStorage.setItem("userdata", JSON.stringify(userdata));
          //store user token to to local storage
          localStorage.setItem(
            "loggedInDetails",
            JSON.stringify(response.data)
          );
          //push to otp page
          setTimeout(() => {
            props?.history?.push("/molecular_otp");
            console.log(props);
          }, 3000);
          setState({
            ...state,
            errorMessage: "",
            successMessage: response.data.message,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.status == 406) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.errors?.email?.join(""),
            successMessage: "",
          });
        }
        if (error?.response?.status == 400) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
          });
        }
        setState({
          ...state,
          errorMessage: "signup failed, check your internet connection",
          isLoading: false,
        });
      });
  };

  const onChangeHandler = (e) => {
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
      btnState: true,
    });
  };
  const selectedSKillHandler = (e) => {
    setState({
      ...state,
      skill: e.target.value,
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
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [errorMessage, successMessage]);
  const validateForm = (e) => {
    e.preventDefault();
    if (firstName == "" && lastName == "" && email == "" && password == "") {
      return setState({
        ...state,
        errorMessage: "please enter your details",
      });
    }
    if (firstName == "") {
      return setState({
        ...state,
        errorMessage: "Please enter your first name",
      });
    }
    if (lastName == "") {
      return setState({
        ...state,
        errorMessage: "Please enter your lastname",
      });
    }
    if (email == "") {
      return setState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }
    if (skill == "") {
      return setState({
        ...state,
        errorMessage: "Please enter your skill",
      });
    }
    if (password == "") {
      return setState({
        ...state,
        errorMessage: "Please enter your password",
      });
    } else {
      onSubmit();
    }
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    axios
      .get(`${API}/skills`)
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          jobs: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <section className="forms-section">
        <div className="specialistforms-section-image"></div>
        <div className="formwrplift">
          <Container>
            <Row className="form-row">
              <Col md={8}>
                <Form className="form-wrapper" onSubmit={validateForm}>
                  <div className="padded-form-wrapper">
                    <div className="form-header">
                      <h4 className="form-title">Sign up to Find Work</h4>
                      <p>
                        Join one of the largest communities of technical
                        specialists in Africa.
                      </p>
                    </div>
                    <div className="form-descr-text">
                      <p>
                        Leave some information about you in the form below,
                        attach your resume and we’ll get in touch with you.
                        Learn what to expect when you sign up to find work with
                        MolecularTech
                      </p>
                    </div>
                  </div>
                  <div className="padded-input-wrapper" ref={fieldRef}>
                    <Row>
                      {successMessage && (
                        <Alert key={2} variant="success" className="alertmessg">
                          {successMessage}
                        </Alert>
                      )}
                      {errorMessage && (
                        <Alert key={2} variant="danger" className="alertmessg">
                          {errorMessage}
                        </Alert>
                      )}
                      <Col md={6}>
                        <label className="inputlabel">
                          <span className="rdfrmlbl">
                            {" "}
                            First Name<span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={onChangeHandler}
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
                            Last Name<span className="asteric">*</span>
                          </span>
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={onChangeHandler}
                            placeholder="Enter your Last name"
                            size={75}
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
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        placeholder="Enter your Email Address"
                        size={96}
                        className="form-control forminput"
                      />
                    </label>
                    <label className="inputlabel">
                      <span className="rdfrmlbl">
                        {" "}
                        Phone Number<span className="asteric">*</span>
                      </span>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={onChangeHandler}
                        placeholder="Enter your Phone Number"
                        size={96}
                        className="form-control forminput"
                      />
                    </label>
                    <Row>
                      <Col md={12}>
                        <span className="inputlabel">Skills</span>
                        <select
                          className="forminput formselect form-control"
                          required
                          onChange={selectedSKillHandler}
                        >
                          <option
                            value=""
                            className="formselect"
                            disabled
                            selected
                            hidden
                          >
                            Select your qualified Skills
                          </option>
                          {jobs.map((job: any, i) => (
                            <option className="rdsltopt" key={i} value={job.id}>
                              {job.name}
                            </option>
                          ))}
                          ;
                        </select>
                        <div className="text-right">
                          <img src={formCaret} className="drparr" />
                        </div>
                      </Col>
                    </Row>
                    <label className="inputlabel">
                      <span className="rdfrmlbl">
                        Password<span className="asteric">*</span>
                      </span>
                      <input
                        type={passwordIsOpen ? "password" : "text"}
                        name="password"
                        value={password}
                        placeholder="******"
                        onChange={onChangepassword}
                        size={96}
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
                        className={
                          btnState === true ? "form-btnactive" : "form-btn"
                        }
                        onClick={validateForm}
                      >
                        {!isLoading ? "Create Account" : "Processing..."}
                      </span>
                    </div>
                    <Link to="/signin">
                      <p className="signuprgqt">
                        Have Molecular account?<span>Login</span>
                      </p>
                    </Link>
                  </div>
                </Form>
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
export default SignUp;
