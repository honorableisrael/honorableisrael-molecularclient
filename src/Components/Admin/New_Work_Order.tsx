import React, { useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";

const NewWorkOrderForm = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain:"",
    location:"",
    end_date: "",
    start_date: "",
    hour: "",
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
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    start_date,
    hour,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <div className="title_wo">
              <div className="workorderheader workorderheaderpp">
                <Link to="/contractor_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                New Work Order
              </div>
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="form_header">
                  <span className="form_header1">
                    {" "}
                    <b>1</b> of 3{" "}
                  </span>{" "}
                  <b> Work Details</b>
                </div>
                <div className="formcontent">
                  <Form>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Work Order Title</h6>
                          <Form.Control
                            type="text"
                            value={order_title}
                            className="userfield"
                            id="order_title"
                            onChange={onchange}
                            placeholder="Work Order Title"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">
                            Work Order Description
                          </h6>
                          <textarea
                            value={work_order_description}
                            className="userfield work_order_description form-control"
                            id="work_order_description"
                            onChange={onchange}
                            placeholder="Enter Description"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Project Purpose</h6>
                          <textarea
                            value={project_purpose}
                            className="userfield work_order_description form-control"
                            id="project_purpose"
                            onChange={onchange}
                            placeholder="Enter Description"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Location</h6>
                          <select
                            className="userfield form-control"
                            id="location"
                            onChange={onchange}
                            placeholder="Enter Description"
                          >
                            <option>Select Country</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">State</h6>
                          <select
                            className="userfield form-control"
                            id="state_"
                            onChange={onchange}
                            placeholder="Enter Description"
                          >
                            <option>Select State</option>
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Location Terrain</h6>
                          <select
                            className="userfield form-control"
                            id="location_terrain"
                            value={location_terrain}
                            onChange={onchange}
                            placeholder="Enter Description"
                          >
                            <option>Select Terrain</option>
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile">Engagement Period</h6>
                        </div>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Start Date
                          </h6>
                          <Form.Control
                            type="date"
                            value={start_date}
                            min={"2021-05-05"}
                            max={"2220-05-05"}
                            className="userfield"
                            id="start_date"
                            onChange={onchange}
                            placeholder="yyyy-mm-dd"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            End date
                          </h6>
                          <Form.Control
                            type="date"
                            value={end_date}
                            min={"2021-05-05"}
                            max={"2220-05-05"}
                            className="userfield"
                            id="end_date"
                            onChange={onchange}
                            placeholder="yyyy-mm-dd"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Hours Per day
                          </h6>
                          <Form.Control
                            type="text"
                            value={hour}
                            className="userfield"
                            name="hour"
                            onChange={onInputChange}
                            placeholder="Hours"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Link to="/contractor_work_order_step2">
                        <div className="job31">Next</div>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewWorkOrderForm;
