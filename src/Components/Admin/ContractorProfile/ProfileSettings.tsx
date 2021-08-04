import React, { useState } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../contractor.css";
import DashboardNav from "../navbar";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";

// import logo from "../../images/Molecular.png";

const Contractor_Profile = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    firsttab: true,
    secondtab: false,
    thirdtab: false,
    fourthtab: false,
    show: true,
    company_name: "",
    company_url: "",
    sector: "",
    state_: "",
    address: "",
    phone_number: "",
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    reason: "",
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        firsttab: true,
        secondtab: false,
        thirdtab: false,
        fourthtab: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: true,
        thirdtab: false,
        fourthtab: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: true,
        fourthtab: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: true,
      });
    }
  };
  const SubmitProfile = () => {
    const data = {
      company_name,
      company_url,
      sector,
      country,
      state_,
      address,
    };
    axios
      .post(`${API}/pi`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    show,
    company_name,
    company_url,
    sector,
    country,
    state_,
    address,
    phone_number,
    first_name,
    last_name,
    middle_name,
    email,
    reason,
    current_password,
    new_password,
    confirm_password,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Profile</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row>
          <div className="settingtop"></div>
        </Row>
        <Row className="rowt3 rowta negmargin">
          <Col md={12} className="job34">
            <div className="psettings">
              <div className="settings11">
                <div className="titleprofile1">Settings</div>
                <div className="setting1">
                  <div className="namestyle11">
                    <span className="namestyle">HH</span>
                    <div className="home_pone12">
                      <div className="helmot">Helmotz Holdings</div>
                      <div className="helmot11">Oil and Gas</div>
                      <div className="helmot112">Lagos State, Nigeria</div>
                    </div>
                  </div>
                  <div className="orders1">
                    Total Work Orders
                    <div>
                      <span className="num12a">2</span>
                    </div>
                  </div>
                </div>
                <div className="section_form">
                  <div className="profile__001">
                    {firsttab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("firsttab")}
                      >
                        Profile
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("firsttab")}
                      >
                        Profile
                      </div>
                    )}
                    {secondtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("secondtab")}
                      >
                        Contact Person(s)
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("secondtab")}
                      >
                        Contact Person(s)
                      </div>
                    )}
                    {thirdtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("thirdtab")}
                      >
                        Password
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("thirdtab")}
                      >
                        Password
                      </div>
                    )}
                    {fourthtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("fourthtab")}
                      >
                        Deactivate Account
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("fourthtab")}
                      >
                        Deactivate Account
                      </div>
                    )}
                  </div>
                  {firsttab && (
                    <>
                      {" "}
                      <Row className="section_form1">
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Company Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="company_name"
                              value={company_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Address
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="address"
                              value={address}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Country
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="country"
                              value={country}
                              onChange={onInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Province/State
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="state"
                              value={state_}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Sector
                            </h6>
                            <Form.Control
                              type="date"
                              className="userfield"
                              id="sector"
                              value={sector}
                              onChange={onchange}
                              placeholder="yyyy-mm-dd"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Company URL
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="company_url"
                              value={company_url}
                              onChange={onInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* Second Tab Starts*/}
                  {secondtab && (
                    <>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Contact Person 1
                          </h3>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              First Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="first_name"
                              value={first_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Last Name
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="last_name"
                              value={last_name}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="email"
                              value={email}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Contact Person 2
                          </h3>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              First Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="first_name"
                              value={first_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Last Name
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="last_name"
                              value={last_name}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="email"
                              value={email}
                              onChange={onInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Phone Number
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="phone_number"
                              value={phone_number}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Contact Person 3
                          </h3>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              First Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="first_name"
                              value={first_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Last Name
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="last_name"
                              value={last_name}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="email"
                              value={email}
                              onChange={onInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Phone Number
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="phone_number"
                              value={phone_number}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* Second Tab ends*/}
                  {/* Third Tab start*/}
                  {thirdtab && (
                    <>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Change Password
                          </h3>
                          <br></br>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Current Password
                            </h6>
                            <Form.Control
                              type={"password"}
                              className="userfield"
                              id="current_password"
                              value={current_password}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              New Password{" "}
                            </h6>
                            <Form.Control
                              type={"password"}
                              className="userfield"
                              id="new_password"
                              value={new_password}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Confirm Password
                            </h6>
                            <Form.Control
                              type={"password"}
                              className="userfield"
                              id="confirm_password"
                              value={confirm_password}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* Third Tab ends*/}
                  {fourthtab && (
                    <>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Deactivate Account
                          </h3>
                          <br></br>
                        </Col>

                        <Col md={8} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Reason for Deactivation
                            </h6>
                            <textarea
                              value={reason}
                              id="reason"
                              onChange={onchange}
                              className="form-control"
                            ></textarea>
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* <ProFileInfo /> */}
                  <Row>
                    <Col md={12}>
                      <div className="job31">Save</div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        size="sm"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Warning!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                You are about to deactivate this account, please note that this action cannot
                be undone.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="terminate1">Terminate</div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Contractor_Profile;
