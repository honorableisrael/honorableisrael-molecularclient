import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Pagination, Modal } from "react-bootstrap";
import "../Admin/contractor.css";
import DashboardNav from "./specialistNavbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import WorkDetails_Form_Preview from "../Admin/workdetailsform";
import { NavHashLink } from "react-router-hash-link";
import axios from "axios";
import { API } from "../../config";


const SpecialistWorkOrderDetails = (props) => {
  const [state, setState] = useState({
    work_order_detail: {},
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    show: false,
    reason: ""
  });
  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(`${API}/specialist/work-orders/${work_order_details?.id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          ...res.data.data,
          work_order_detail: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const {
    work_order_detail,
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    reason,
    location_terrain,
    start_date,
    show,
    hour
  } = state;

  return (
    <>
      <Modal
        size="lg"
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
            Terminate work order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className="form-control reason12"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div
                className="terminate1"
                onClick={e => openModal(e, "Terminate")}
              >
                Terminate
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialist Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <div id="overview"></div>
        <Row className="rowt3 row3t2">
          <Col md={12} className="job34">
            <div className="title_wo title_wo12">
              <div className="workorderheader fixedtitle">
                <Link to="/works">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Details
              </div>
            </div>
            <Row className="mgtop">
              <Col md={3} className="job23_ mheight_">
                <p className="exp23">
                  <img src={portfolio} alt="portfolio" className="portfolioq" />
                </p>
                <NavHashLink
                  className="bview"
                  to="#overview"
                  activeStyle={{
                    backgroundColor: "#fd8b003b",
                    color: "#fd8c00"
                  }}
                >
                  Over View
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#specialist_details"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Specialist Details
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#work_details"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Work Details
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#actions"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Actions
                </NavHashLink>
              </Col>
              <Col md={8} className="job23_1a_">
                <div id="specialist_details"></div>
                <div className="job23_1a">
                  <div className="">
                    <WorkOrderCardsMinInfo
                    order_detail={work_order_detail}
                    />
                  </div>
                </div>
                <div className="job23_1a">
                  <h6 className="title22">Specialists Assigned</h6>
                  <div className="job23_1a wrap_z">
                    <div className="group_flex">
                      <div className="grpA">
                        Group <b>A</b>
                      </div>
                      <div className="grpB">
                        <b>27</b> Assigned
                      </div>
                    </div>
                    <div className="tabledata tabledataweb">
                      <div className="header_12 pleft">Fullname</div>
                      <div className="header_12">Type</div>
                      <div className="header_12">Group Position</div>
                      <div className="header_12">Status</div>
                    </div>
                    <div className="tabledata tablecontent">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        <div className="mobiletabledata">Fullname</div>
                        Sunday Okoro Pascal
                      </div>
                      <div className="header_12 typ22">
                        <div className="mobiletabledata mobiletabledata22 ">
                          Type
                        </div>
                        <div> Fitter</div>
                      </div>
                      <div className="header_12">
                        <div className="mobiletabledata mobiletabledata22">
                          Group Position
                        </div>
                        <div className="glead"> Group Lead </div>
                      </div>
                      <div className="header_12 active_member">
                        <div className="mobiletabledata mobiletabledata22">
                          Status
                        </div>
                        <div className="active_member"> Active </div>
                      </div>
                    </div>
                    <div className="tabledata">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sandra John
                      </div>
                      <div className="header_12">
                        <div>Fitter</div>
                      </div>
                      <div className="header_12">
                        <div>Member</div>
                      </div>
                      <div className="header_12 suspended_member">
                        Suspended
                      </div>
                    </div>
                    <div className="tabledata tablecontent">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sunday Okoro Pascal
                      </div>
                      <div className="header_12">Fitter</div>
                      <div className="header_12">Member</div>
                      <div className="header_12 active_member">Active</div>
                    </div>
                    <div className="active_member2">
                      <div>
                        Displaying <b> 1</b> of <b>2</b>
                      </div>
                      <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Next />
                        <Pagination.Last />
                      </Pagination>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <div className="active_member23">
                      <div className="active_worksheet">WORKS SHEETS</div>
                      <div className="worksheet_1">
                        <div className="tabledata tablecontent tablecont1">
                          <div className="header_12 tablecont0">
                            <span>Worksheet Report 2</span>
                          </div>
                          <div className="tablecont1">
                            <div className="viewlink">View</div>
                            <div className="worksheetdw worksheetdate1">
                              {" "}
                              <img
                                src={dwnload}
                                alt="dwnload"
                                className="dwnload1"
                              />
                              Download
                            </div>
                            <div className="worksheetdate">12/02/2021</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="uploadbtn ">Upload Worksheet</span>
                        </div>
                      </div>
                      <WorkDetails_Form_Preview hide={true} />
                    </div>
                  </div>

                  <h6 className="title22 title22r2" id="actions">
                    Actions
                  </h6>
                  <div className="job23_1a wrap_z">
                    <div className="main_wrap_ws main_wrapp1">
                      <h3 className="userprofile12 userprofile123">
                      Quit Work
                      </h3>
                      <p className="Construction12">
                        To quit a project that has been placed, a quit request
                        has to be sent to the admin to process.
                      </p>
                      <div className="text-left">
                        <div
                          className="terminate1"
                          onClick={e => openModal(e, "Terminate")}
                        >
                          Terminate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SpecialistWorkOrderDetails;
