import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
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
import { NavHashLink } from "react-router-hash-link";
import StarRatingComponent from "react-star-rating-component";
import camimg from "../../images/imagecam.png";

const SpecialistSettings = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const [state, setState] = useState({
    work_orders: [],
    firsttab: true,
    secondtab: false,
    thirdtab: false,
    fourthtab: false,
    show: false,
    user: "",
    email: "",
    city: "",
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
    experienceYears: "",
    bio: "",
    terminateWorkModal: false,
    messageModal: true,
    viewPopup: true,
    reason: "",
    isloading: false,
    specialist_rating: 1
  });

  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    terminateWorkModal,
    messageModal,
    email,
    viewPopup,
    show,
    user,
    city,
    address,
    phoneNumber,
    dateOfBirth,
    experienceYears,
    bio,
    specialist_rating,
    reason,
  }: any = state;
  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
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
  const submitProfile = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      phone: phoneNumber,
      dob: dateOfBirth,
      city: city,
      address: address,
      experience_years: experienceYears,
      bio: bio,
    };
    axios
      .put(`${API}/specialist/update`, data,{
        headers: { 
        Authorization: `Bearer ${token.access_token}`, 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
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
  const closeMessageModal = () => {
    setState({
      ...state,
      viewPopup: false
    });
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString()
    });
  };

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
    if (visited) {
      setState({
        ...state,
        viewPopup: false
      });
      //do not view Popup
    } else {
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
                  <div className="modalmessage">
                    Please complete your profile for verification
                  </div>
                </Modal.Body>
              </Modal>
              <div className="settings11">
                <div className="titleprofile1">Settings</div>
                <div id="skilltab"></div>
                <div id="experiencetab"></div>
                <div className="setting1">
                  <div className="namestyle111">
                    <div>
                      <span className="spluserimg">
                        {/* <img src={malemodel} /> */}
                      </span>
                      <div className="camdv">
                        <img
                          src={camimg}
                          className="user-cam-img"
                          alt="cam-img"
                        />
                      </div>
                      <p className="upldtxt">Upload Picture</p>
                    </div>
                    <div className="home_pone12">
                      <div className="username">{user.first_name}</div>
                      <div className="helmot11">{user.email}</div>
                      <StarRatingComponent
                        name="specialist_rating"
                        className="specialist_rating"
                        starCount={5}
                        value={specialist_rating}
                        onStarClick={onStarClick}
                        emptyStarColor={"#444"}
                      />
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
                              Fist Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              name="firstName"
                              value={user.first_name}
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
                              name="lastName"
                              className="userfield"
                              value={user.last_name}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Email
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              name="email"
                              value={email}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="section_form1">
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Date of Birth
                            </h6>
                            <Form.Control
                              type="date"
                              name="dateOfBirth"
                              className="userfield"
                              value={dateOfBirth}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Phone Number
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Home Address
                            </h6>
                            <Form.Control
                              type="text-area"
                              className="userfield"
                              name="address"
                              value={address}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Experience Years
                            </h6>
                            <Form.Control
                              type="number"
                              name="experienceYears"
                              value={experienceYears}
                              className="userfield"
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
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
                              value= {city}
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
                              type="text"
                              name="bio"
                              value={bio}
                              className="userfield"
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to="#skilltab">
                            <div
                              className="job31"
                              onClick={() => switchTab("secondtab")}
                            >
                              Next
                            </div>
                          </NavHashLink>
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
                          <NavHashLink to="#experiencetab">
                            <div
                              className="job31"
                              onClick={() => switchTab("thirdtab")}
                            >
                              Next
                            </div>
                          </NavHashLink>
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
                          <div className="job31" onClick={submitProfile}>Save</div>
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
