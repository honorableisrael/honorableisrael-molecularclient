import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { API, formatTime2 } from "../../config";
import useravatar from "../../images/user-avatar.png";
import formCaret from "../../images/caret.png";
import { NavHashLink } from "react-router-hash-link";
import StarRatingComponent from "react-star-rating-component";
import camimg from "../../images/imagecam.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";
import Experience from "./specialistExperience";
import Projects from "./specialistProject";
import Certification from "./specialistCertification";
import Qualification from "./specialistQualification";
import exclam from "../../images/exclammark.png";
import SplstBankDetails from "./splstBankDetails";
import { DividerProps } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";

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
    fifthtab: false,
    show: false,
    user: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    userExperience: "",
    email: "",
    city: "",
    address: "",
    experience: "",
    description: "",
    bio: "",
    limit: "",
    messageModal: true,
    viewPopup: false,
    reason: "",
    isloading: false,
    rating: null,
    age: null,
    dob: null,
    title: "",
    first_name: "",
    last_name: "",
    phone: "",
    photo: null,
    skills: [],
    primary_skills: [],
    sKill_id: "",
    verified: false,
    unverified: false,
    status: "",
    year: "",
    total_works: null,
    fourthtabInactive: "",
    coverall_size: "",
    coverall_sizes: [],
    sixthtab: false,
    available: false,
    is_available: false,
    errorMessage: false,
    successMessage: false,
    related_skill: [],
    selected_skills: [],
    selected_skill_payload: [],
  });

  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtabInactive,
    coverall_sizes,
    fourthtab,
    fifthtab,
    total_works,
    current_password,
    new_password,
    confirm_password,
    selected_skill_payload,
    related_skill,
    selected_skills,
    sixthtab,
    is_available,
    verified,
    available,
    unverified,
    photo,
    skill_id,
    messageModal,
    coverall_size,
    email,
    viewPopup,
    show,
    user,
    isloading,
    city,
    address,
    phone,
    dob,
    limit,
    experience,
    bio,
    rating,
    reason,
    skills,
    first_name,
    last_name,
    errorMessage,
    successMessage,
  }: any = state;
  const onchange = (e) => {
    if (e.target.name == "bio" && bio.split("").length == 150) {
      return setState({
        ...state,
        limit: "true",
        [e.target.name]: e.target.value,
      });
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
      limit: "",
    });
  };
  const hiddenFileInput: any = useRef();
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState({
          ...state,
          photo: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(photo);
    console.log(e.target.files[0]);
    // upload image to server;
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);
    console.log(imageData);
    axios
      .post(`${API}/photo`, imageData, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          notify("image uploaded Successfully");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        notify("failed to Upload Image");
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
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: true,
        thirdtab: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: true,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: true,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "fifthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: false,
        fifthtab: true,
        sixthtab: false,
      });
    }
    if (a == "sixthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: true,
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
      experience,
      bio: bio,
      first_name,
      last_name,
      coverall_size,
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
        notify("Successfully updated");
        setTimeout(() => {
          setState({
            ...state,
            firsttab: false,
            secondtab: true,
            thirdtab: false,
            fourthtab: false,
            successMessage: res.data.message,
          });
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
        notify("Failed to save", "D");
        console.log(err.response);
      });
  };
  const submitRelatedSkills = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      skills: selected_skill_payload,
    };
    console.log(data);
    axios
      .post(`${API}/specialist/related-skills`, data, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        notify("Successfully updated");
        setTimeout(() => {
          setState({
            ...state,
            successMessage: res.data.message,
          });
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
        notify("Failed to save", "D");
        console.log(err.response);
      });
  };
  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList, "selectedList");
    const result = selectedList.map((item) => {
      return item.id;
    });
    setState({
      ...state,
      selected_skill_payload: result,
    });
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(removedItem, "removedItem");
    console.log(selectedList, "selectedList");
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
  const notify = (message: string, type = "B") => {
    toast(message, { containerId: type, position: "top-right" });
  };
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
      Axios.get(`${API}/coverall-sizes`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.get(`${API}/specialist/related-skills`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res, res2, res3, res4) => {
          console.log(res.data);
          console.log(res2.data.data, "skills");
          const user = res.data.data;
          setState({
            ...state,
            ...res.data.data,
            primary_skills: res2.data.data,
            selected_skills: res.data.data.related_skills,
            user: res.data.data,
            coverall_sizes: res3.data.data,
            verified: user.status === "Active" ? true : false,
            unverified: user.status === "New" ? true : false,
            viewPopup: user.status === "Active" ? false : true,
            fourthtabInactive:
              user.status === "New" ? "inactivetab" : "activetab",
            related_skill: res4.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const third_tab = () => {
    // const availableToken = localStorage.getItem("loggedInDetails");
    // console.log(availableToken);
    // const token = availableToken ? JSON.parse(availableToken) : "";
    // console.log(token);
    // const data1 = {
    //   skill_id
    // };
    // console.log(skill_id)

    // Axios.all([
    //   Axios.post(`${API}/specialist/skills`, data1, {
    //     headers: { Authorization: `Bearer ${token.access_token}` },
    //   }),
    // ])
    //   .then(
    //     axios.spread((response) => {

    setState({
      ...state,
      firsttab: false,
      secondtab: false,
      thirdtab: true,
      fourthtab: false,
    });
    //     notify("Successful");
    //   })
    // )
    // .catch((err) => {
    //   console.log(err.response);
    //   notify("Failed to save", "D");
    // });
  };

  const deactivateAccount = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    setState({
      ...state,
      isloading: true,
    });
    let config = {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      data: {
        reason,
      },
    };
    console.log(reason);

    Axios.delete(`${API}/specialist/deactivate`, config)
      .then((response) => {
        console.log(response.data);
        notify("specialist account was successfully deactivated ");
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
        notify("Failed to Deactivate", "D");
      });
  };

  const toggleAvailbility = () => {
    setState({
      ...state,
      available: !available,
    });
    console.log(available);
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      status: !available,
    };
    Axios.post(`${API}/specialist/availability`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((response) => {
        console.log(response.data);
        notify(" availability status changed successfully ");
        setState({
          ...state,
          isloading: false,
          available: !available,
          successMessage: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
        notify("Failed to change status", "D");
      });
  };

  const toggleErrormessageClose = () => {
    setState({
      ...state,
      errorMessage: false,
      successMessage: false,
    });
  };
  const SubmitPassword = () => {
    const data = {
      old_password: current_password,
      password: new_password,
      password_confirmation: confirm_password,
    };
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);

    const token = availableToken ? JSON.parse(availableToken) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(`${API}/password`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res);
        notify("Update successful");
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("Update failed", "D");
        setState({
          ...state,
          isloading: false,
        });
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
  return (
    <>
      <Container fluid={true}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Specialialist Profile Settings</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row ref={fieldRef}>
          <div className='settingtop'></div>
        </Row>
        <Row className='rowt3 rowta negmargin'>
          <Col md={12} className='job34'>
            <div className='psettings'>
              <Modal
                show={viewPopup}
                centered={true}
                onHide={closeMessageModal}>
                <div className='usermodaltitle'>
                  <i
                    className='fa fa-exclamation fa-rotate-180 exclamicon'
                    aria-hidden='true'></i>
                </div>
                <Modal.Body>
                  <div className='modalmessage'>
                    Please complete your profile for verification
                  </div>
                </Modal.Body>
              </Modal>
              <div className='settings11'>
                <div className='titleprofile1'>Settings</div>
                {errorMessage && (
                  <div className='wrktimelinediv'>
                    <img src={exclam} alt='img' />
                    <p>{errorMessage}</p>
                    <div
                      className='terminateworkmodalimg'
                      onClick={toggleErrormessageClose}>
                      <i className='fa fa-times'></i>
                    </div>
                  </div>
                )}
                {successMessage && (
                  <div className='wrktimelinediv'>
                    <img src={exclam} alt='img' />
                    <p>{successMessage}</p>
                    <div
                      className='terminateworkmodalimg'
                      onClick={toggleErrormessageClose}>
                      <i className='fa fa-times'></i>
                    </div>
                  </div>
                )}
                <div id='skilltab'></div>
                <div id='experiencetab'></div>
                <div className='setting1'>
                  <div className='namestyle111'>
                    <div>
                      <span className='spluserimg'>
                        <img
                          src={photo !== null ? photo : useravatar}
                          className='useravatar'
                        />
                      </span>
                      <div className='camdv'>
                        <img
                          src={camimg}
                          className='user-cam-img'
                          alt='cam-img'
                          onClick={handleClick}
                        />
                      </div>
                      <input
                        type='file'
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        accept='image/*'
                        ref={hiddenFileInput}
                      />
                      <p className='upldtxt' onClick={handleClick}>
                        Upload Picture
                      </p>
                    </div>
                    <div className='home_pone12'>
                      <div className='username'>{user.first_name}</div>
                      <div className='helmot11'>{user.email}</div>
                      <StarRatingComponent
                        name='specialist_rating'
                        className='specialist_rating'
                        starCount={5}
                        value={rating}
                        emptyStarColor={"#444"}
                      />
                      <div className='helmot112'></div>
                    </div>
                  </div>
                  <div className='orders1'>
                    Total Work Orders
                    <div>
                      <span className='num12a'>{total_works}</span>
                    </div>
                    {verified && (
                      <span className='splverifiduser'>Verified user</span>
                    )}
                    {unverified && (
                      <span className='splunverifieduser '>
                        Unverified user
                      </span>
                    )}
                    <div>
                      {available == false && <p> Not Available : </p>}
                      {available == true && <p> Available : </p>}
                      <label className='switch'>
                        <input
                          type='checkbox'
                          checked={available}
                          onChange={toggleAvailbility}
                        />
                        <span className='slider' />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='section_form'>
                  <div className='profile__001'>
                    {firsttab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("firsttab")}>
                        Profile
                      </div>
                    ) : (
                      <div
                        className='Profile2002 Profile2002a inactivebordr'
                        onClick={() => switchTab("firsttab")}>
                        Profile
                      </div>
                    )}
                    {secondtab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("secondtab")}>
                        Skill and Experience
                      </div>
                    ) : (
                      <div
                        className='Profile2002 Profile2002a inactivebordr'
                        onClick={() => switchTab("secondtab")}>
                        Skill and Experience
                      </div>
                    )}
                    {thirdtab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("thirdtab")}>
                        Qualifications
                      </div>
                    ) : (
                      <div
                        className='Profile2002 Profile2002a inactivebordr'
                        onClick={() => switchTab("thirdtab")}>
                        Qualifications
                      </div>
                    )}
                    {fifthtab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("fifthtab")}>
                        Bank Account Details
                      </div>
                    ) : (
                      <div
                        className={`Profile2002 Profile2002a inactivebordr ${fourthtabInactive}`}
                        onClick={() => switchTab("fifthtab")}>
                        Bank Account Details
                      </div>
                    )}
                    {sixthtab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("sixthtab")}>
                        Password Change
                      </div>
                    ) : (
                      <div
                        className={`Profile2002 Profile2002a inactivebordr ${fourthtabInactive}`}
                        onClick={() => switchTab("sixthtab")}>
                        Password Change
                      </div>
                    )}
                    {fourthtab ? (
                      <div
                        className='Profile2002 Profile2002a'
                        onClick={() => switchTab("fourthtab")}>
                        Deactivate Account
                      </div>
                    ) : (
                      <div
                        className={`Profile2002 Profile2002a inactivebordr ${fourthtabInactive}`}
                        onClick={() => switchTab("fourthtab")}>
                        Deactivate Account
                      </div>
                    )}
                  </div>
                  {firsttab && (
                    <div>
                      {" "}
                      <Row className='section_form1'>
                        <Col md={6} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              First Name
                            </h6>
                            <Form.Control
                              className='userfield'
                              name='first_name'
                              value={first_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Last Name
                            </h6>
                            <Form.Control
                              type='text'
                              name='last_name'
                              className='userfield'
                              value={last_name}
                              onChange={onchange}
                              placeholder=''
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>Email</h6>
                            <Form.Control
                              type='text'
                              className='userfield'
                              name='email'
                              value={email}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='section_form1'>
                        <Col md={6} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Date of Birth
                            </h6>
                            <Form.Control
                              type='date'
                              name='dob'
                              className='userfield'
                              value={formatTime2(dob)}
                              onChange={onchange}
                              placeholder='yyyy-mm-dd'
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Phone Number
                            </h6>
                            <Form.Control
                              type='text'
                              className='userfield'
                              name='phone'
                              value={phone}
                              onChange={onchange}
                              placeholder=''
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Address
                            </h6>
                            <Form.Control
                              type='text-area'
                              className='userfield'
                              name='address'
                              value={address}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Experience Years
                            </h6>
                            <Form.Control
                              type='number'
                              name='experience'
                              value={experience}
                              className='userfield'
                              onChange={onchange}
                              placeholder=''
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className='formsection1'>
                          <h6 className='userprofile userprofile12'>City</h6>
                          <Form.Control
                            type='text'
                            name='city'
                            value={city}
                            className='userfield'
                            onChange={onchange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Tell us about yourself (Optional){" "}
                            </h6>
                            <Form.Control
                              type='text'
                              name='bio'
                              value={bio}
                              className='userfield formcontrol'
                              onChange={onchange}
                              maxLength={200}
                            />
                          </Form.Group>
                          <div className='textgrn text-right'>
                            <small>
                              {limit && "character limit is fixed at 200"}
                            </small>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='profpriski'>
                          <h6 className='userprofile userprofile12'>
                            Coverall Size
                          </h6>
                          <select
                            className='forminput profsettinformselect form-control'
                            required
                            name='coverall_size'
                            onChange={onchange}>
                            <option>{coverall_size ?? "choose one"}</option>
                            {coverall_sizes?.map((data, i) => (
                              <option
                                value={data.name}
                                className='profsettinformselect'>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to='#skilltab'>
                            <div
                              className='job31'
                              onClick={() => submitProfile()}>
                              Save
                            </div>
                          </NavHashLink>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* Second Tab Starts*/}
                  {secondtab && (
                    <div>
                      <Row className='section_form1'>
                        <Col md={12} className='profpriski'>
                          <h6 className='profillabels'>Primary skill</h6>
                          <select
                            className='forminput profsettinformselect form-control'
                            required>
                            {skills?.map(
                              (
                                data: { id: string | number; name: string },
                                i
                              ) => (
                                <option
                                  value={data.id}
                                  className='profsettinformselect'>
                                  {data.name}
                                </option>
                              )
                            )}
                          </select>
                          <div className='text-right'>
                            <img src={formCaret} className='drparr' />
                          </div>
                        </Col>
                      </Row>
                      {related_skill.length ? (
                        <Row>
                          <Col md={9}>
                            <h6 className='profillabels'>Other skill</h6>
                            <p>Tick the skills applicable</p>
                            <Multiselect
                              options={related_skill} // Options to display in the dropdown
                              selectedValues={selected_skills} // Preselected value to persist in dropdown
                              onSelect={onSelect} // Function will trigger on select event
                              onRemove={onRemove} // Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                            <div className='sectndivider'></div>
                          </Col>
                          <Col md={3} className='relatedskillsubbtn'>
                            <div
                              className='job31'
                              onClick={submitRelatedSkills}>
                              {isloading ? "Processing" : "Save skills"}
                            </div>
                          </Col>
                        </Row>
                      ):""}
                      <Row className='section_form1'>
                        <Col md={12}>
                          <Experience />
                        </Col>
                        <Col md={12}>
                          <Projects />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to='#experiencetab'>
                            <div className='job31' onClick={third_tab}>
                              Next
                            </div>
                          </NavHashLink>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* Second Tab ends*/}
                  {/* Third Tab start*/}
                  {thirdtab && (
                    <div>
                      <Row className='section_form1'>
                        <Col md={12}>
                          <Qualification />
                        </Col>
                      </Row>
                      <div className='sectndivider'></div>
                      <Certification />
                      {/* <Row>
                        <Col md={12}>
                          <div className="job31" onClick={post_qualification_and_experience}>
                             Save
                          </div>
                        </Col>
                      </Row> */}
                    </div>
                  )}
                  {/* Third Tab ends*/}
                  {fourthtab && (
                    <div>
                      <Row className='section_form1'>
                        <Col md={12}>
                          <h3 className='userprofile userprofile12 profillabels'>
                            Deactivate Account
                          </h3>
                          <br></br>
                        </Col>

                        <Col md={8} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Reason for Deactivation
                            </h6>
                            <textarea
                              value={reason}
                              id='reason'
                              name='reason'
                              onChange={onchange}
                              className='form-control'></textarea>
                          </Form.Group>
                          <span
                            className='wrkmodal-declinebtn deactivebtn'
                            onClick={deactivateAccount}>
                            {!isloading ? "Deactivate" : "Deactivating..."}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* fifthtab  starts*/}
                  {fifthtab && (
                    <div>
                      <Row className='profileceriticatesectn'>
                        <Col md={12}>
                          <SplstBankDetails />
                        </Col>
                      </Row>
                    </div>
                  )}
                  {sixthtab && (
                    <>
                      <Row className='section_form1'>
                        <Col md={12}>
                          <h3 className='userprofile userprofile12 boldtext'>
                            Change Password
                          </h3>
                          <br></br>
                        </Col>
                        <Col md={4} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Current Password
                            </h6>
                            <Form.Control
                              type={"password"}
                              className='userfield'
                              name='current_password'
                              value={current_password}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              New Password{" "}
                            </h6>
                            <Form.Control
                              type={"password"}
                              className='userfield'
                              name='new_password'
                              value={new_password}
                              onChange={onchange}
                              placeholder=''
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className='formsection1'>
                          <Form.Group>
                            <h6 className='userprofile userprofile12'>
                              Confirm Password
                            </h6>
                            <Form.Control
                              type={"password"}
                              className='userfield'
                              name='confirm_password'
                              value={confirm_password}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Col md={12}>
                            <div className='job31' onClick={SubmitPassword}>
                              {isloading ? "Submitting" : "Submit"}
                            </div>
                          </Col>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* fifthtab  ends*/}
                  {/* <ProFileInfo /> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        size='sm'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
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
            <Col md={12} className='terminate2'>
              <div className='terminate1'>Terminate</div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName='bg-danger text-white'
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
