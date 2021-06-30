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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";


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
    experience_years: "",
    bio: "",
    terminateWorkModal: false,
    certificateModal:false,
    certificateDisplay: false,
    noCertificateAdded: true,
    certification:"",
    year:"",
    description:"",
    messageModal: true,
    viewPopup: true,
    reason: "",
    isloading: false,
    specialist_rating: 1,
    age: null,
    certifications: [],
    dob: null,
    experience: null,
    experiences: [],
    first_name: "",
    last_name: "",
    phone: "",
    photo: null,
    qualifications: [],
    skills: [],
  });

  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    terminateWorkModal,
    certificateModal,
    certificateDisplay,
    noCertificateAdded,
    certification,
    year,
    description,
    messageModal,
    email,
    viewPopup,
    show,
    user,
    city,
    address,
    phone,
    dob,
    experience_years,
    bio,
    specialist_rating,
    reason,
    skills,
    first_name,
    last_name,
  }: any = state;
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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
  const submitProfile = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      phone,
      dob,
      city: city,
      address: address,
      experience_years,
      bio: bio,
      first_name,
      last_name,
    };
    console.log(data);
    axios
      .put(`${API}/specialist/update`, data, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        notify("Successfull");
        setTimeout(() => {
          setState({
            ...state,
            firsttab: false,
            secondtab: true,
            thirdtab: false,
            fourthtab: false,
          });
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        notify("Failed to save", "D");
        console.log(err.response);
      });

      //activate next button
      switchTab("secondtab");
  };
  
  const certModal = () => {
    setState({
      ...state,
      certificateModal: true,
    });
  };
  const closecertModal = () => {
    setState({
      ...state,
      certificateModal: false,
    });
  };
  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false,
    });
  };
  const closeMessageModal = () => {
    setState({
      ...state,
      viewPopup: false,
    });
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/skills`),
    ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          setState({
            ...state,
            ...res.data.data,
            ...res2.data.data,
            user: res.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      setState({
        ...state,
        viewPopup: false,
      });
      //do not view Popup
    } else {
      //this is the first time
      localStorage["alreadyVisited"] = true;
      setState({
        ...state,
        viewPopup: true,
      });
    }
  }, []);
  
  const displayCertification =()=>{
    //add certhification to UI
    if (certification && year){
     setState({
       ...state,
       noCertificateAdded: false,
       certificateDisplay: true,
     })
    }
    else{
      setState({
        ...state,
        noCertificateAdded: true,
        certificateDisplay: false,
      })
    }
  };

  const add_certification = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data1 = {
      certification,
      year,
      description
    };
    const data2 = {
      id:"1"
    };
    Axios.all([
      Axios.post(`${API}/specialist/certifications`, data1, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.post(`${API}/specialist/skills`, data2, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          setState({
            ...state,
            firsttab: false,
            secondtab: false,
            thirdtab: true,
            fourthtab: false,
          });
          notify("Successful");
        })
      )
      .catch((err) => {
        console.log(err);
        notify("Failed to save", "D");
      });

      //activate next button
      switchTab("thirdtab");
  };
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
                        // onStarClick={onStarClick}
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
                        <Col md={6} className="formsection1">
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
                        <Col md={6} className="formsection1">
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
                        <Col md={12} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
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
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Date of Birth
                            </h6>
                            <Form.Control
                              type="date"
                              name="dob"
                              className="userfield"
                              value={dob}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Phone Number
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              name="phone"
                              value={phone}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="formsection1">
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
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Experience Years
                            </h6>
                            <Form.Control
                              type="number"
                              name="experience_years"
                              value={experience_years}
                              className="userfield"
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="formsection1">
                          <h6 className="userprofile userprofile12">City</h6>
                          <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            className="userfield"
                            onChange={onchange}
                          />
                          {/* <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            <option
                              value={city}
                              className="profsettinformselect"
                            >
                              Select Province/state
                            </option>
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="formsection1">
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
                              onClick={() => submitProfile()}
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
                            {skills?.map((data, i) => (
                              <option
                                value={data.id}
                                className="profsettinformselect"
                              >
                                {data.name}
                              </option>
                            ))}
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
                      <Modal
                        centered={true}
                        onHide={closecertModal}
                        show={certificateModal}
                      >
                        <div className="terminateworkmodalwrap">
                          <div className="terminateworkmodalimg">
                            <img
                              src={closeimg}
                              alt="close"
                              onClick={closecertModal}
                            />
                          </div>
                          <div className="terminateworkmodaltitle">
                            Add Certification
                          </div>
                          <form>
                            <label className="addexptitle">
                              Certification
                              <input
                                type="text"
                                className="userfield form-control"
                                name="certification"
                                value={certification}
                                onChange={onchange}
                                placeholder="Enter Certification"
                                size={70}
                              />
                            </label>
                            <label className="addexptitle">
                              Year
                              <input
                                type="date"
                                className="userfield form-control"
                                name="year"
                                value={year}
                                onChange={onchange}
                                placeholder="Enter Title"
                                size={70}
                              />
                            </label>
                            <label className="addexptitle">
                              Description
                              <textarea
                                name="description"
                                value={description}
                                className="form-control wrkmodaltextarea"
                                placeholder="Enter Description"
                                rows={5}
                                cols={5}
                              />
                            </label>
                          </form>
                          <div className="wrkmodal-btnwrap">
                            <span
                              className="wrkmodal-cancelbtn"
                              onClick={closecertModal}
                            >
                              Cancel
                            </span>
                            <span className="wrkmodal-declinebtn addexpbtn" onClick={displayCertification}>
                            Add Certificate
                            </span>
                          </div>
                        </div>
                      </Modal>
                       <div className="profileceriticatesectn">
                       {noCertificateAdded && (<div>
                         <img src={cert} alt="img" />
                         <p>You have no Certificates Added</p>
                         <span className="profcertbtn" onClick={certModal}>Add Certificate</span>
                        </div>
                       )}:
                        {certificateDisplay &&(<div>
                          <div className="profcertifncntent">
                            <div>
                              <p className="profcertheading">Certification</p>
                              <p>{certification}</p>
                            </div>
                            <div className="profcertdate">
                              <p className="profcertheading">Year</p>
                              <p>{year}</p>
                            </div>
                          </div>
                          <div className="profcerbtnwrapper">
                            <span className="profcertbtn" onClick={certModal}>Add Certificate</span>
                          </div>
                        </div>
                        )}
                      </div>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to="#experiencetab">
                            <div
                              className="job31"
                              onClick={add_certification}
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
                                placeholder="Enter Description"
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
                          <div className="profileexperiencesectn">
                          <div>
                            <img src={helmet} alt="img" />
                            <p>You have no Experience Added</p>
                            <span className="profcertbtn" onClick={workModal}>
                              Add Experience
                            </span>
                           </div>
                           <div>
                             
                           </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div className="job31" onClick={submitProfile}>
                            Save
                          </div>
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
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default SpecialistSettings;
function data1(
  arg0: string,
  data1: any,
  arg2: { headers: { Authorization: string } }
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  throw new Error("Function not implemented.");
}

function data2(
  arg0: string,
  data2: any,
  arg2: { headers: { Authorization: string } }
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  throw new Error("Function not implemented.");
}
