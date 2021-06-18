import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../config";
import malemodel from "../../images/malemodel.png";
import formCaret from "../../images/caret.png";
import cert from "../../images/certificate.png";
import helmet from "../../images/helmet.png";
import closeimg from "../../images/closeimg.png";

const SpecialistSettings = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    firsttab: true,
    secondtab: false,
    thirdtab: false,
    fourthtab: false,
    show: false,
    userName: "",
    userEmail: "",
    user: "",
    sector: "",
    state_: "",
    address: "",
    phone_number: "",
    email: "",
    terminateWorkModal: false,
    messageModal: true,
    viewPopup: true,
    first_name: "",
    last_name: "",
    middle_name: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    reason: "",
    isloading: false
  });

  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    terminateWorkModal,
    messageModal,
    viewPopup,
    show,
    user,
    userName,
    userEmail,
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
    confirm_password
  }: any = state;
  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };
  const onInputChange = e => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, "") //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0
      });
    }
  };
  const switchTab = a => {
    window.scrollTo(400, 400);
    if (a == "firsttab") {
      return setState({
        ...state,
        firsttab: true,
        secondtab: false,
        thirdtab: false,
        fourthtab: false
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: true,
        thirdtab: false,
        fourthtab: false
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: true,
        fourthtab: false
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: true
      });
    }
  };
  const SubmitProfile = () => {
    const data = {
      userName,
      sector,
      country,
      state_,
      address
    };
    axios
      .post(`${API}/pi`, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false
    });
  };
  const closeMessageModal=()=>{
    setState({
      ...state,
      viewPopup:false
    })
  }

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    axios
      .get(`${API}/specialist`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      })
      .then(res => {
        console.log(res.data);
        setState({
          ...state,
          user: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
      let visited = localStorage["alreadyVisited"];
      if(visited) {
           setState({ 
             ...state,
             viewPopup: false 
            })
           //do not view Popup
      } 
      else {
           //this is the first time
           localStorage["alreadyVisited"] = true;
           setState({ 
            ...state,
            viewPopup: true
            });
      }
  }, []);

  return (
    <>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialialist Profile Settings</title>
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
              <Modal
                show={viewPopup}
                centered={true}
                onHide={closeMessageModal}
              >
                <div className="usermodaltitle">
                  <i
                    className="fa fa-exclamation fa-rotate-180 exclamicon"
                    aria-hidden="true"
                  ></i>
                </div>
                <Modal.Body>
                  <div className="modalmessage">Please complete your profile for verification</div>
                </Modal.Body>
              </Modal>
              <div className="settings11">
                <div className="titleprofile1">Settings</div>
                <div className="setting1">
                  <div className="namestyle111">
                    <div>
                      <span className="namestyle">
                        <img src={malemodel} />
                      </span>
                      <p className="upldtxt">Upload Picture</p>
                    </div>
                    <div className="home_pone12">
                      <div className="username">{user.first_name}</div>
                      <div className="helmot11">{user.email}</div>
                      <div className="helmot112"></div>
                    </div>
                  </div>
                  <div className="orders1">
                    Total Work Orders
                    <div>
                      <span className="num12a">2</span>
                    </div>
                    {/* <span className="splverifiduser">Verified user</span> */}
                    <span className="splunverifieduser ">Unverified user</span>
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
                        Skill
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("secondtab")}
                      >
                        Skill
                      </div>
                    )}
                    {thirdtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("thirdtab")}
                      >
                        Experience
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("thirdtab")}
                      >
                        Experience
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
                              Full Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="userName"
                              value={userName}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              id="userEmail"
                              value={userEmail}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="formsection1">
                          <h6 className="userprofile userprofile12">Country</h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              Select your Country
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                        <Col md={4} className="formsection1">
                          <h6 className="userprofile userprofile12">
                            Province/State
                          </h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              Select Province/state
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              About yourself (Optional)
                            </h6>
                            <Form.Control
                              className="userfield"
                              id="state"
                              value={state_}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div
                            className="job31"
                            onClick={() => switchTab("secondtab")}
                          >
                            Next
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* Second Tab Starts*/}
                  {secondtab && (
                    <>
                      <Row className="section_form1">
                        <Col md={12} className="profpriski">
                          <h6 className="userprofile userprofile12">
                            Primary Skill
                          </h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              Plumbing
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <h6 className="userprofile userprofile12">
                            Other skill
                          </h6>
                          <p>Tick the skills applicable</p>
                          <div>
                            <label className="form-check-label">
                              <input
                                className="profilecheckbox"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              Fitting
                            </label>
                            <label className="form-check-label weldinbox">
                              <input
                                className="profilecheckbox "
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              Welding
                            </label>
                          </div>
                          <div className="sectndivider"></div>
                        </Col>
                      </Row>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 boldtext">
                            Qualification
                          </h3>
                        </Col>
                        <Col md={6}>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              Select Qualification
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              field of Study
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              Institution
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                        <Col md={3}>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              From
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                        <Col md={3}>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value=""
                              className="profsettinformselect"
                              disabled
                              selected
                              hidden
                            >
                              To
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                      </Row>
                      <div className="sectndivider"></div>
                      <div className="profileceriticatesectn">
                        <img src={cert} alt="img" />
                        <p>You have no Certificates Added</p>
                        <span className="profcertbtn">Add Certificate</span>
                      </div>
                      <Row>
                        <Col md={12}>
                          <div
                            className="job31"
                            onClick={() => switchTab("thirdtab")}
                          >
                            Next
                          </div>
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
                          <div className="profileexperiencesectn">
                            <img src={helmet} alt="img" />
                            <p>You have no Experience Added</p>
                            <span className="profcertbtn" onClick={workModal}>
                              Add Experience
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Modal
                        centered={true}
                        onHide={closeworkModal}
                        show={terminateWorkModal}
                      >
                        <div className="terminateworkmodalwrap">
                          <div className="terminateworkmodalimg">
                            <img
                              src={closeimg}
                              alt="close"
                              onClick={closeworkModal}
                            />
                          </div>
                          <div className="terminateworkmodaltitle">
                            Add Experience
                          </div>
                          <form>
                            <label className="addexptitle">
                              Title
                              <input
                                type="text"
                                className="userfield form-control"
                                id="address"
                                value={address}
                                onChange={onchange}
                                placeholder="Enter Title"
                                size={70}
                              />
                            </label>
                            <label className="addexptitle">
                              Description
                              <textarea
                                name={"reason"}
                                className="form-control wrkmodaltextarea"
                                placeholder="Enter Experience"
                                rows={5}
                                cols={5}
                              />
                            </label>
                          </form>
                          <div className="wrkmodal-btnwrap">
                            <span
                              className="wrkmodal-cancelbtn"
                              onClick={closeworkModal}
                            >
                              Cancel
                            </span>
                            <span className="wrkmodal-declinebtn addexpbtn">
                              Add Experience
                            </span>
                          </div>
                        </div>
                      </Modal>
                      <Row>
                        <Col md={12}>
                          <div className="job31">Save</div>
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
                          <span className="wrkmodal-declinebtn deactivebtn">
                            Deactivate
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* <ProFileInfo /> */}
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
            show: false
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
    </>
  );
};

export default SpecialistSettings;
