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
import Addmore from "../../images/Add more.png";

const NewWorkOrderStep2 = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    inprogress: true,
    no_of_joints:"",
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    end_date: "",
    diameter: "",
    start_date: "",
    pipe_wieght: "",
    pipelength: "",
    no_of_specialist: "",
    pipe_type: "",
    pipe_size:"",
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
    no_of_joints,
    pipelength,
    end_date,
    no_of_specialist,
    start_date,
    hour,
    diameter,
    pipe_type,
    pipe_size,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <div className="title_wo">
              <div className="workorderheader workorder_header">
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
                    <b>2</b> of 3{" "}
                  </span>{" "}
                  <b> Workforce Details</b>
                </div>
                <div className="formcontent">
                  <Form>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Type of Pipe</h6>
                          <select className="userfield form-control">
                            <option></option>
                            <option value="Cast Iron Pipe">
                              Cast Iron Pipe
                            </option>
                            <option value="Galvanized Iron Pipe">
                              Galvanized Iron Pipe
                            </option>
                            <option
                              value="
                              Wrought Iron Pipe"
                            >
                              Wrought Iron Pipe
                            </option>
                            <option value="Steel Pipe">Steel Pipe</option>
                            <option value="Copper Pipe">Copper Pipe</option>
                            <option value="Asbestos Cement Pipe">
                              Asbestos Cement Pipe
                            </option>
                            <option value="Concrete Pipe">Concrete Pipe</option>
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile">Pipe Configuration</h6>
                        </div>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Pipe Length (Inches)
                          </h6>
                          <Form.Control
                            type="number"
                            value={pipelength}
                            className="userfield"
                            id="pipelength"
                            onChange={onchange}
                            placeholder="Pipe length"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Pipe Size
                          </h6>
                          <Form.Control
                            type="number"
                            value={pipe_size}
                            className="userfield"
                            id="pipe_size"
                            onChange={onchange}
                            placeholder="Pipe Size"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            No of Joints
                          </h6>
                          <Form.Control
                            type="number"
                            value={no_of_joints}
                            className="userfield"
                            id="no_of_joints"
                            onChange={onchange}
                            placeholder="No of Joints"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="addmro1">
                        <div className="addmro">
                          <img src={Addmore} alt="Add more" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile">
                            Types of Specialist Required and Number{" "}
                          </h6>
                        </div>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Area of specialization
                          </h6>
                          <select
                            name=""
                            id=""
                            className="userfield form-control"
                          >
                            <option className="specialization"></option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Number of Specialist
                          </h6>
                          <Form.Control
                            type="number"
                            value={no_of_specialist}
                            className="userfield"
                            id="no_of_specialist"
                            onChange={onchange}
                            placeholder="Number of Specialist"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="addmro1">
                        <div className="addmro">
                          <img src={Addmore} alt="Add more" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile">Payment Cycle </h6>
                        </div>
                      </Col>
                      <Col md={8} className="formsection1 formsection10">
                        <label className="container_checkbox ">
                          Weekly
                          <input type="radio" name="radio" value="Weekly" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container_checkbox">
                          Bi-Weekly
                          <input type="radio" value="Bi-Weekly" name="radio" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container_checkbox">
                          Monthly
                          <input type="radio" value="Monthly" name="radio" />
                          <span className="checkmark"></span>
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="job31">Next</div>
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

export default NewWorkOrderStep2;
