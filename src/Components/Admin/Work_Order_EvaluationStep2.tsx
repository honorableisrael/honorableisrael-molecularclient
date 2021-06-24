import React, { useEffect, useState } from "react";
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
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";

const AdminWorkOrderEvaluationStep2 = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    pipe_schedules:"",
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
  
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    axios.all([
      axios.get(`${API}/pipe-schedules`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      axios.get<any, AxiosResponse<any>>(`${API}/pipe-schedules`),
    ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          setState({
            ...state,
            pipe_schedules:res.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    reason,
    location_terrain,
    pipe_schedules,
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
          <Col md={11} className="job34`">
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
              <div className="cube1 activecube">2</div>
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
                        2 of 4 | <b>Pricing Template</b>{" "}
                      </div>
                    </div>
                    <div className="bgwhitecontainer">
                      <div className="main_wrap_ws main_wrap_ws22 graybg">
                        <div>
                          <h6 className="userprofile12 userprofile123">
                            Pipe Type(Inches)
                          </h6>
                          <div className="Construction12">12</div>
                        </div>
                        <div className="">
                          <h6 className="userprofile12 userprofile123">
                            Pipe Size(g)
                          </h6>
                          <div className="Construction12">220</div>
                        </div>
                        <div className="">
                          <h6 className="userprofile12 userprofile123">
                            Pipe Length
                          </h6>
                          <div className="Construction12">21m</div>
                        </div>
                        <div className="">
                          <h6 className="userprofile12 userprofile123">
                            Number of Joints
                          </h6>
                          <div className="Construction12">21m</div>
                        </div>
                      </div>
                      <div className="overview__2">
                        <div className="pricing_cal">
                          <div className="pricing__112">Pricing Calculator</div>
                          <Row>
                            <Col md={4}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Pipe Length (inches)
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Pipe length"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Pipe Size (inches)
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Pipe Size"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Number of Joints (inches)
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Number of Joint"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="pipelength">
                                <div className="pipelength1q">Pipe Price</div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Price in Naira"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={12}>
                              <div className="gen11">
                                <div className="gent122">Generate</div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="flexcontainercw">
                        <div className="deployed12">
                          <div className="ttola1a">
                            Total Specialist to be deployed
                          </div>
                          <div className="ttola1b">15</div>
                          <div className="ttola1">10 Fitters</div>
                          <div className="ttola1">5 Plumber</div>
                        </div>
                        <div className="cost_total">
                          <div className="ttola1a">Total cost</div>
                          <div className="ttola1b">$50000</div>
                        </div>
                      </div>
                      <div className="nxtbck">
                        <Link to="/work_order_evaluation">
                          {" "}
                          <div className="gent122 gent1221">Back</div>
                        </Link>{" "}
                        <Link to="/admin_evaluation_step3">
                          <div className="gent122">Next</div>
                        </Link>
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

export default AdminWorkOrderEvaluationStep2;
