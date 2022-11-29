import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../contractor.css";
import DashboardNav from "../navbar";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { API, returnAdminToken, notify } from "../../../config";

// import logo from "../../images/Molecular.png";

const AdminProfile = (props) => {
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
    contacts: [],
    roles: [],
    logo: "",
    website_url: "",
    sector: "",
    state_: "",
    address: "",
    role: "",
    phone_number: "",
    email: "",
    first_name: "",
    last_name: "",
    role1: "",
    phone_number1: "",
    email1: "",
    first_name1: "",
    last_name1: "",
    middle_name: "",
    reason: "",
    industry: "",
    old_password: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    list_of_industries: [],
    industry_id: "",
    role2: "",
    role_id1: "",
    role_id2: "",
    role_id3: "",
    phone_number2: "",
    email2: "",
    first_name2: "",
    last_name2: "",
    role3: "",
    phone_number3: "",
    email3: "",
    first_name3: "",
    last_name3: "",
    isloading: false,
  });
  const onchange = (e) => {
    if (e.target.id == "industry") {
      return setState({
        ...state,
        industry_id: e.target.value,
        industry: e.target.value,
      });
    }
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
      industry: industry_id,
      country,
      state: state_,
      address,
    };
    console.log(data);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .put(`${API}/contractor`, data, {
        headers: { Authorization: `Bearer ${returnAdminToken().access_token}` },
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
  const SubmitPassword = () => {
    const data = {
      old_password: current_password,
      password: new_password,
      password_confirmation: confirm_password,
    };
    console.log(data);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(`${API}/password`, data, {
        headers: { Authorization: `Bearer ${returnAdminToken().access_token}` },
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
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${API}/admin`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/industries`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/contractor/contact/roles`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3) => {
          console.log(res.data);
          setState({
            ...state,
            ...res.data.data,
            list_of_industries: res2.data.data,
            roles: res3.data.data,
            contractor: res.data.data,
            state_: res.data.data.state,
            industry_id: res.data.data.industry_id,
            role1: res?.data?.data?.contacts?.[0]?.role,
            phone_number1: res?.data?.data?.contacts?.[0]?.phone,
            email1: res?.data?.data?.contacts?.[0]?.email,
            first_name1: res?.data?.data?.contacts?.[0]?.first_name,
            last_name1: res?.data?.data?.contacts?.[0]?.last_name,
            role2: res?.data?.data?.contacts?.[1]?.role,
            phone_number2: res?.data?.data?.contacts?.[1]?.phone,
            email2: res?.data?.data?.contacts?.[1]?.email,
            first_name2: res?.data?.data?.contacts?.[1]?.first_name,
            last_name2: res?.data?.data?.contacts?.[1]?.last_name,
            role3: res?.data?.data?.contacts?.[2]?.role,
            phone_number3: res?.data?.data?.contacts?.[2]?.phone,
            email3: res?.data?.data?.contacts?.[2]?.email,
            first_name3: res?.data?.data?.contacts?.[2]?.first_name,
            last_name3: res?.data?.data?.contacts?.[2]?.last_name,
            role_id1: res?.data?.data?.contacts?.[0]?.role_id,
            role_id2: res?.data?.data?.contacts?.[1]?.role_id,
            role_id3: res?.data?.data?.contacts?.[2]?.role_id,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          logo: reader.result,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(logo);
    console.log(e.target.files[0]);
    // upload image to server;
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const imageData = new FormData();
    imageData.append("logo", e.target.files[0]);
    console.log(imageData);
    axios
      .post(`${API}/contractor/logo`, imageData, {
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
  const UpdateContactPerson = (
    id: any,
    first_name,
    last_name,
    email,
    phone,
    role
  ) => {
    const data = {
      first_name,
      last_name,
      email,
      phone,
      role,
    };
    console.log(data);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .put(`${API}/contractor/contacts/${id}`, data, {
        headers: { Authorization: `Bearer ${returnAdminToken().access_token}` },
      })
      .then((res) => {
        console.log(res);
        notify("Updated successfully");
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 406) {
          notify(err?.response?.data?.errors?.email?.join(""), "D");
          return notify(err?.response?.data?.errors?.role?.join(""), "D");
        }
        notify("Failed to update", "D");
      });
  };
  const {
    firsttab,
    secondtab,
    thirdtab,
    fourthtab,
    show,
    company_name,
    website_url,
    contacts,
    role,
    logo,
    country,
    roles,
    old_password,
    state_,
    address,
    phone_number,
    first_name,
    last_name,
    industry,
    industry_id,
    isloading,
    list_of_industries,
    email,
    reason,
    current_password,
    new_password,
    confirm_password,
    role1,
    phone_number1,
    email1,
    first_name1,
    last_name1,
    role2,
    phone_number2,
    email2,
    first_name2,
    last_name2,
    role3,
    phone_number3,
    email3,
    first_name3,
    last_name3,
    role_id1,
    role_id2,
    role_id3,
  }: any = state;
  console.log(contacts);
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
                    {/* {fourthtab ? (
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
                    )} */}
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
                          {/* <Form.Group>
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
                          </Form.Group> */}
                        </Col>
                        <Col md={4} className="formsection1">
                          {/* <Form.Group>
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
                          </Form.Group> */}
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

export default AdminProfile;
