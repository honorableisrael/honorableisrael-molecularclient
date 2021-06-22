import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
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
import WorkDetails_Form_Preview from "./workdetailsform";

const Accept_Reject_Work_Order = () => {
  const [state, setState] = useState({
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
    reason: "",
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
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

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    reason,
    location_terrain,
    start_date,
    show,
    hour,
  } = state;

  return (
    <>
      <Modal
        size="lg"
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
                onClick={(e) => openModal(e, "Terminate")}
              >
                Terminate
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row >
          <DashboardNav />
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2" >
          <Col md={12} className="job34" >
            <div className="title_wo title_wo12">
              <div className="workorderheader fixedtitle">
                <Link to="/contractor_work_order">
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
                <p className="bview"><a href="#overview">Overview</a></p>
                <p className="bview inactive_bv"><a href="#details">Specialist Details</a></p>
                <p className="bview inactive_bv"><a href="#work">Work Details</a></p>
                <p className="bview inactive_bv"><a href="#actions">Actions</a></p>
              </Col>
              <Col md={8} className="job23_1a_">
                <div className="job23_1a">
                  <div className="">
                    <WorkOrderCardsMinInfo
                      title={"Building a Mini version of the Eifel Tower"}
                    />
                  </div>
                </div>
                <div className="job23_1a" id="details">
                  <h6 className="title22">Specialist Deployed</h6>
                  <div className="job23_1a wrap_z">
                    <div className="group_flex">
                      <div className="grpA">
                        Group <b>A</b>
                      </div>
                      <div className="grpB">
                        <b>27</b> Deployed
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
                        <div className="mobiletabledata mobiletabledata22 ">Type</div>
                       <div> Fitter</div>
                      </div>
                      <div className="header_12">
                        <div className="mobiletabledata mobiletabledata22">Group Position</div>
                       <div className="glead"> Group Lead </div>
                      </div>
                      <div className="header_12 active_member">
                        <div className="mobiletabledata mobiletabledata22">Status</div>
                        <div className='active_member'> Active </div>
                      </div>
                    </div>
                    <div className="tabledata">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sandra John 
                      </div>
                      <div className="header_12"><div>Fitter</div></div>
                      <div className="header_12"><div>Member</div></div>
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
                            <span>Worksheet Report 1</span>
                          </div>
                          <div className="tablecont1">
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
                        <div className="tabledata tablecontent tablecont1">
                          <div className="header_12 tablecont0">
                            <span>Worksheet Report 2</span>
                          </div>
                          <div className="tablecont1">
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
                      </div>
                      <div id="work"></div>
                      <WorkDetails_Form_Preview hide={true} />
                    </div>
                  </div>

                  <h6 className="title22 title22r2" id="actions">Actions</h6>
                  <div className="job23_1a wrap_z">
                    <div className="main_wrap_ws main_wrapp1">
                      <h6 className="userprofile12 userprofile123">
                        Suspend Workorder
                      </h6>
                      <p className="Construction12">
                        To terminate a workorder that has been placed, a
                        terminate request has to be sent to the admin to
                        process. You can suspend instead
                      </p>
                      <div className="wtext">
                        <div
                          className="suspend1"
                          // onClick={(e) => openModal(e, "Terminate")}
                        >
                          Suspend
                        </div>
                      </div>
                    </div>
                    <div className="main_wrap_ws main_wrapp1">
                      <h6 className="userprofile12 userprofile123">
                        Terminate Workorder
                      </h6>
                      <p className="Construction12">
                        To terminate a workorder that has been placed, a
                        terminate request has to be sent to the admin to
                        process. You can suspend instead
                      </p>
                      <div className="wtext">
                        <div
                          className="terminate1"
                          onClick={(e) => openModal(e, "Terminate")}
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

export default Accept_Reject_Work_Order;
