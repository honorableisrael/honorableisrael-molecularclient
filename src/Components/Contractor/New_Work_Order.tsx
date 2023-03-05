import React, { useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import allCountries from "../../listOfCountriesInTheWorld";
import axios from "axios";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";

const NewWorkOrderForm = withRouter((props) => {
  const [state, setState] = useState<any>({
    work_orders: [],
    country: "",
    state_: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location_terrain_name: "",
    terrains: [],
    project_location: "",
    project_locations: [],
    project_location_name: "",
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
  const inputHandler_Project_location = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      project_location: new_obj.id,
      project_location_name: new_obj.name,
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
  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });
  const validation_Helper = () => {
    if (
      !order_title ||
      !work_order_description ||
      !project_purpose ||
      !location_terrain ||
      !location_terrain_name ||
      !state_ ||
      !country ||
      !end_date ||
      !start_date
    ) {
      return notify("All fields are required", "D");
    }
    saveToBrowser();
  };
  const inputHandler = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      location_terrain: new_obj.id,
      location_terrain_name: new_obj.name,
    });
  };
  const saveToBrowser = () => {
    const first_data = {
      order_title,
      work_order_description,
      project_purpose,
      location_terrain,
      location_terrain_name,
      project_location_name,
      project_location,
      state_,
      country,
      end_date,
      start_date,
      hour,
    };
    console.log(first_data);
    localStorage.setItem("first_step", JSON.stringify(first_data));
    props.history.push("/contractor_work_order_step2");
  };
  React.useEffect(() => {
    const stored_stage_1 = localStorage.getItem("first_step");
    const stored1 = stored_stage_1 ? JSON.parse(stored_stage_1) : "";
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");

    console.log(stored1);
    setState({
      ...state,
      ...stored1,
    });
    window.scrollTo(-0, -0);
    Axios.all(
      [Axios.get<any, AxiosResponse<any>>(`${API}/terrains`),
      Axios.get(`${API}/locations`,{ headers: {
        "Authorization": `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },} )
    ]
    )
      .then(
        axios.spread((res,res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            terrains: res.data.data,
            project_locations:res2.data.data,
            ...stored1,
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
    terrains,
    order_title,
    state_,
    end_date,
    location_terrain,
    start_date,
    location_terrain_name,
    hour,
    project_location,
    project_locations,
    project_location_name,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Contractor Work Order</title>
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
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Country</h6>
                          <select
                            className="userfield form-control"
                            id="country"
                            onChange={onchange}
                            placeholder=""
                          >
                            <option>
                              {country ? country : "Select Country"}
                            </option>
                            {allCountries.map((data, i) => (
                              <option value={data.name}>{data.name}</option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">State</h6>
                          <input
                            type="form-control"
                            className="userfield form-control"
                            id="state_"
                            value={state_}
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Location Terrain</h6>
                          <select
                            className="userfield form-control"
                            id="location_terrain"
                            onChange={inputHandler}
                            placeholder=""
                          >
                            <option>
                              {location_terrain
                                ? location_terrain_name
                                : "Select Terrain"}
                            </option>
                            {terrains.map((data, i) => (
                              <option
                                className="specialization"
                                value={JSON.stringify({
                                  id: data.id,
                                  name: data.name,
                                })}
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Project Location</h6>
                          <select
                            className="userfield form-control"
                            id="project_location"
                            onChange={inputHandler_Project_location}
                            placeholder=""
                          >
                            <option>
                              {project_location_name
                                ? project_location_name
                                : "Select project location"}
                            </option>
                            {project_locations.map((data, i) => (
                              <option
                                className="specialization"
                                value={JSON.stringify({
                                  id: data.id,
                                  name: data.name,
                                })}
                              >
                                {data.name}
                              </option>
                            ))}
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
                            max={24}
                            onChange={onInputChange}
                            placeholder="Hours"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col md={12} className="flex_btns">
                        <Link to="/contractor_dashboard">
                          <div className="job3 btn_outline">Back</div>
                        </Link>
                        <div className="job31" onClick={validation_Helper}>
                          Next
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default NewWorkOrderForm;
