import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../contractor.css";
import DashboardNav from "../navbar";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { API, capitalize, contractorToken, notify, splitName } from "../../../config";
import allCountries from "../../../listOfCountriesInTheWorld";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contractor_Profile = withRouter((props) => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    firsttab: true,
    secondtab: false,
    thirdtab: false,
    fourthtab: false,
    show: false,
    contractor: {},
    company_name: "",
    website_url: "",
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
    industry: "",
    list_of_industries: [],
    isloading: false,
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
      // website_url,
      industry,
      country,
      state:state_,
      address,
    };
    console.log(data)
    setState({
      ...state,
      isloading:true
    })
    axios
      .put(`${API}/contractor`, data, {
        headers: { Authorization: `Bearer ${contractorToken().access_token}` },
      })
      .then((res) => {
        console.log(res);
        notify("Update successful")
        setState({
          ...state,
          isloading:false
        })
      })
      .catch((err) => {
        notify("Update failed","D")
        setState({
          ...state,
          isloading:false
        })
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = contractorToken();
    if (token.user_type !== "contractor") {
      return props.history.push("/login");
    }
    axios
      .all([
        axios.get(`${API}/contractor`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/industries`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          setState({
            ...state,
            ...res.data.data,
            list_of_industries: res2.data.data,
            contractor: res.data.data,
            state_:res.data.data.state,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    show,
    company_name,
    website_url,
    sector,
    country,
    state_,
    address,
    phone_number,
    first_name,
    last_name,
    industry,
    contractor,
    isloading,
    list_of_industries,
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
                    <span className="namestyle">
                      {capitalize(company_name?.split("")[0])}
                      {capitalize(company_name?.split("")[1])}
                    </span>
                    <div className="home_pone12">
                      <div className="helmot">{company_name}</div>
                      <div className="helmot11">{industry}</div>
                      <div className="helmot112">{address}</div>
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
                            <select
                              className="userfield form-control"
                              id="country"
                              onChange={onchange}
                              placeholder=""
                            >
                              <option>
                                {country ? country : "Select Country"}
                              </option>
                              {allCountries.map((data, i) => (
                                <option value={data.name}>{data.name}</option>
                              ))}
                            </select>
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
                              id="state_"
                              value={state_}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Industry
                            </h6>
                            <select
                              name=""
                              id=""
                              className="form-control userfield"
                            >
                              <option>{industry ? industry : ""}</option>
                              {list_of_industries?.map((data: any, i) => (
                                <option key={i} value={data.id}>
                                  {data.name}
                                </option>
                              ))}
                            </select>
                          </Form.Group>
                        </Col>
                        {/* <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Company URL
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="website_url"
                              value={website_url}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div className="job31" onClick={SubmitProfile}>
                            {isloading?"Updating":"Update"}
                          </div>
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
                You are about to deactivate this account, please note that this
                action cannot be undone.
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
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default Contractor_Profile;
