import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container, Alert, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./signup.css";
import formCaret from "../../images/caret.png";
import axios from "axios";
import { API, reloadPage } from "../../config";
import eye from "../../images/eye.png";
import eyeclose from "../../images/eye-off.png";
import NavBar from "../Widgets/navigation";

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
    agree: false,
  });
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    isLoading,
    skill,
    agree,
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
          reloadPage();
          window.scrollTo(0, 0);
          setState({
            ...state,
            successMessage:
              "Thanks for signing up on MolecularPro website! We are currently reviewing your application and will get back to you shortly.",
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err?.response);
        window.scrollTo(-0, -0);
        if (err?.response?.status == 406 || err?.response?.status == 422) {
          return setState({
            ...state,
            errorMessage: err?.response?.data?.errors?.email?.join(""),
          });
        }
        setState({
          ...state,
          errorMessage: "Registration failed",
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
      window.scrollTo(0, 0);
    }
  }, [errorMessage, successMessage]);
  const validateForm = (e) => {
    e.preventDefault();
    if (firstName == "" && lastName == "" && email == "") {
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
    if (!agree) {
      return setState({
        ...state,
        errorMessage: "Please agree to terms and condition",
      });
    }
    onSubmit();
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
      <NavBar />
      <section className='forms-section'>
        <div className='specialistforms-section-image'></div>
        <div className='formwrplift'>
          <Container>
            <Row className='form-row'>
              <Col md={8}>
                <Form className='form-wrapper' onSubmit={validateForm}>
                  <div className='padded-form-wrapper'>
                    <div className='form-header'>
                      <h4 className='form-title'>
                        Get Better Pay + Better Working  Conditions
                      </h4>
                      <p>
                        By signing up on  MolecularPro, you are joining a
                        community of natural gas technical specialists getting
                        the value they deserve for their work. 
                      </p>
                    </div>
                    <div className='form-descr-text'>
                    </div>
                  </div>
                  <div className='padded-input-wrapper' ref={fieldRef}>
                    <Row>
                      {successMessage && (
                        <Alert key={2} variant='success' className='alertmessg'>
                          {successMessage}
                        </Alert>
                      )}
                      {errorMessage && (
                        <Alert key={2} variant='danger' className='alertmessg'>
                          {errorMessage}
                        </Alert>
                      )}
                      <br />
                      <Col md={6}>
                        <label className='inputlabel'>
                          <span className='rdfrmlbl'>
                            {" "}
                            First Name<span className='asteric'>*</span>
                          </span>
                          <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={onChangeHandler}
                            // placeholder="Enter your first name"
                            size={75}
                            className='form-control forminput'
                          />
                        </label>
                      </Col>
                      <Col md={6}>
                        <label className='inputlabel'>
                          <span className='rdfrmlbl'>
                            {" "}
                            Last Name<span className='asteric'>*</span>
                          </span>
                          <input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={onChangeHandler}
                            // placeholder="Enter your Last name"
                            size={75}
                            className='form-control forminput'
                          />
                        </label>
                      </Col>
                    </Row>
                    <label className='inputlabel'>
                      <span className='rdfrmlbl'>
                        {" "}
                        Email Address<span className='asteric'>*</span>
                      </span>
                      <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={onChangeHandler}
                        // placeholder="Enter your Email Address"
                        size={96}
                        className='form-control forminput'
                      />
                    </label>
                    <label className='inputlabel'>
                      <span className='rdfrmlbl'>
                        {" "}
                        Phone Number<span className='asteric'>*</span>
                      </span>
                      <input
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={onChangeHandler}
                        // placeholder="Enter your Phone Number"
                        size={96}
                        className='form-control forminput'
                      />
                    </label>
                    <Row>
                      <Col md={12}>
                        <span className='inputlabel'>Skills</span>
                        <select
                          className='forminput formselect form-control'
                          required
                          onChange={selectedSKillHandler}>
                          <option
                            value=''
                            className='formselect'
                            disabled
                            selected
                            hidden>
                            Select your qualified Skills
                          </option>
                          {jobs.map((job: any, i) => (
                            <option className='rdsltopt' key={i} value={job.id}>
                              {job.name}
                            </option>
                          ))}
                          ;
                        </select>
                        <div className='text-right pb-2'>
                        </div>
                      </Col>
                    </Row>
                    {/* <label className="inputlabel">
                      <span className="rdfrmlbl">
                        Password<span className="asteric">*</span>
                      </span>
                      <input
                        type={passwordIsOpen ? "password" : "text"}
                        name="password"
                        value={password}
                        // placeholder="******"
                        // onChange={onChangepassword}
                        size={96}
                        className="form-control forminput"
                      />
                    </label> */}
                    {/* <div className="text-right">
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
                    </div> */}
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value=''
                        checked={agree ? true : false}
                        onChange={() => {
                          setState({
                            ...state,
                            agree: !agree ? true : false,
                          });
                        }}
                        id='flexCheckDefault'
                      />
                      Creating an account means you agree with our{" "}
                      <label className='form-check-label'>
                        <Link to='/privacy' target='_blank'>
                          Terms of Service , Privacy Policy
                        </Link>
                      </label>
                      , and our
                      <br />
                      default Notification Settings.
                    </div>
                    <div className='form-btn-wrapper'>
                      <span
                        className={
                          btnState === true
                            ? "form-btnactive"
                            : "form-btn form-btnactive"
                        }
                        onClick={validateForm}>
                        {!isLoading ? "Create Account" : "Processing..."}
                      </span>
                    </div>
                    <Link to='/signin'>
                      <p className='signuprgqt'>
                        Have a MolecularPro account?<span> Login</span>
                      </p>
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
            <div className='footer-rights'>
              ©2021 MolecularPro copyright All rights Reserved
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
});
export default SignUp;
