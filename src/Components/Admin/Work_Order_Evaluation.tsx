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
import New_Work_Order_Card from "./New_Work_Order_Card";

const AdminWorkOrderEvaluation = () => {
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
            Reject order
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
                  className="form-control reason12 reason122"
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
                Reject
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
        <Row>
          <DashboardNav />
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2">
          <Col md={11} className="job34">
            <div className="title_wo title_wo12 title_wo_ tbtom ttbom">
              <div className="workorderheader fixedtitle">
                <Link to="/admin_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Details
              </div>
            </div>
            <div className="cubewrap1"></div>
            <div className="cubewrap2"></div>
            <div className="cubewrap">
              <div className="cube1 activecube">1</div>
              <div className="cube1 inactivecube">2</div>
              <div className="cube1">3</div>
              <div className="cube1">4</div>
            </div>
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12">
                      <div className="eddit1">
                        {" "}
                        1 of 4 | <b>OVERVIEW</b>{" "}
                      </div>
                      <Link to="/admin_evaluation_step2">
                        {" "}
                        <div className="eddit">Edit</div>
                      </Link>
                    </div>
                    <New_Work_Order_Card
                      title={"Pipeline construction with Sulejah"}
                      status={"Terminated"}
                      awaiting_assignment={false}
                      hide={true}
                    />
                  </div>
                </div>
                <div className="job23_1a" id="details">
                  <div className="job23_1a wrap_z wrap_p">
                    <div id="work"></div>
                    <WorkDetails_Form_Preview hide={true} />
<<<<<<< HEAD
                    <div className="nxtbck">
                    <Link to="/admin_evaluation_step4">
                      <div className="gent122">Next</div>
                    </Link>
                  </div>
                  </div>
                  {window.location.pathname !== "/work_order_evaluation" && (
                    <>
                      <h6 className="title22 title22r2" id="actions">
                        Actions
                      </h6>
                      <div className="job23_1a wrap_z">
                        <div className="main_wrap_ws main_wrapp1">
                          <h6 className="userprofile12 userprofile123">
                            Accept Workorder
                          </h6>
                          <p className="Construction12">
                            To accept a workorder that has been placed.
                          </p>
                          <div className="wtext">
                            <div
                              className="suspend1"
                              // onClick={(e) => openModal(e, "Terminate")}
                            >
                              Accept
                            </div>
                          </div>
                        </div>
                        <div className="main_wrap_ws main_wrapp1">
                          <h6 className="userprofile12 userprofile123">
                            Terminate Workorder
                          </h6>
                          <p className="Construction12">
                            To terminate a workorder that has been placed, A req
                          </p>
                          <div className="wtext">
                            <div
                              className="terminate1"
                              onClick={(e) => openModal(e, "Terminate")}
                            >
                              Reject
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

=======
                  </div>

                  <h6 className="title22 title22r2" id="actions">
                    Actions
                  </h6>
                  <div className="job23_1a wrap_z">
                    <div className="main_wrap_ws main_wrapp1">
                      <h6 className="userprofile12 userprofile123">
                        Accept Workorder
                      </h6>
                      <p className="Construction12">
                        To accept a workorder that has been placed.
                      </p>
                      <div className="wtext">
                        <div
                          className="suspend1"
                          // onClick={(e) => openModal(e, "Terminate")}
                        >
                          Accept
                        </div>
                      </div>
                    </div>
                    <div className="main_wrap_ws main_wrapp1">
                      <h6 className="userprofile12 userprofile123">
                        Terminate Workorder
                      </h6>
                      <p className="Construction12">
                        To terminate a workorder that has been placed, A req
                      </p>
                      <div className="wtext">
                        <div
                          className="terminate1"
                          onClick={(e) => openModal(e, "Terminate")}
                        >
                          Reject
                        </div>
                      </div>
                    </div>
                  </div>
>>>>>>> origin/molecular-alex
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminWorkOrderEvaluation;
