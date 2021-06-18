import React, { useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import welder from "../../images/welder.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import checkcircle from "../../images/check-circle.png";
import searchicon from "../../images/search.png";

const AssignSpecialist = () => {
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
    search: "",
    location: "",
    end_date: "",
    specialist_rating: 5,
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
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    specialist_rating,
    start_date,
    hour,
    search,
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
            <div className="title_wo flexgroup_ flexgroup_1">
              <div className="fl-11">
                <div className="workorderheader workorderheaderpp title_color_orange">
                  <Link to="/contractor_work_order">
                    {" "}
                    <img src={arrowback} className="arrowback" />
                  </Link>
                  Assign Specialist
                </div>
                <div className="searchcontrol_">
                  <span className="rsr">
                    <img src={searchicon} className="rss" alt="search" />
                  </span>
                  <input
                    type="text"
                    className="form-control search_field"
                    value={search}
                    id="search"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div>
                <span className="assign_specailist">Assign Specialist</span>
              </div>
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="form_header">
                  <span> Best matched Specialists</span>
                </div>
                <div className="formcontent">
                  <Form>
                    <Row>
                      <div className="spread_">
                        <div className="container_01">
                          <div className="checkbox_craftman">
                            {/* <input type="checkbox" className="selectcheck" /> */}
                            <label className="container_box">
                              Welder
                              <input type="checkbox" name="radio" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="imagecontainer01">
                            <img src={welder} className="welder" alt="welder" />
                          </div>
                          <div className="cardbody01">
                            <div>
                              <span className="cardname">Chiemezie Akato</span>{" "}
                              <span className="cerfified1">
                                Certified Welder
                              </span>
                            </div>
                            <div className="prim_skills">
                              Secondary Skills: Plumber & Fitter
                            </div>
                            <div className="prim_skills">
                              <span className="leveltitle"> Expert Level:</span>{" "}
                              <StarRatingComponent
                                name="specialist_rating"
                                className="specialist_rating"
                                starCount={5}
                                value={specialist_rating}
                                onStarClick={onStarClick}
                                emptyStarColor={"#444"}
                              />
                            </div>
                            <div className="assigncont">
                              <button
                                value="Assign bgorange"
                                className="assign12"
                              >
                                Assign{" "}
                                <span>
                                  <img
                                    src={checkcircle}
                                    className="checkcircle1 "
                                    alt=""
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="container_01">
                          <div className="checkbox_craftman">
                            {/* <input type="checkbox" className="selectcheck" /> */}
                            <label className="container_box">
                              Welder
                              <input type="checkbox" name="radio" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="imagecontainer01">
                            <img src={welder} className="welder" alt="welder" />
                          </div>
                          <div className="cardbody01">
                            <div>
                              <span className="cardname">Chiemezie Akato</span>{" "}
                              <span className="cerfified1">
                                Certified Welder
                              </span>
                            </div>
                            <div className="prim_skills">
                              Secondary Skills: Plumber & Fitter
                            </div>
                            <div className="prim_skills">
                              <span className="leveltitle"> Expert Level:</span>{" "}
                              <StarRatingComponent
                                name="specialist_rating"
                                className="specialist_rating"
                                starCount={5}
                                value={specialist_rating}
                                onStarClick={onStarClick}
                                emptyStarColor={"#444"}
                              />
                            </div>
                            <div className="assigncont">
                              <button
                                value="Assign bgorange"
                                className="assign12"
                              >
                                Assign{" "}
                                <span>
                                  <img
                                    src={checkcircle}
                                    className="checkcircle1 "
                                    alt=""
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="container_01">
                          <div className="checkbox_craftman">
                            {/* <input type="checkbox" className="selectcheck" /> */}
                            <label className="container_box">
                              Welder
                              <input type="checkbox" name="radio" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="imagecontainer01">
                            <img src={welder} className="welder" alt="welder" />
                          </div>
                          <div className="cardbody01">
                            <div>
                              <span className="cardname">Chiemezie Akato</span>{" "}
                              <span className="cerfified1">
                                Certified Welder
                              </span>
                            </div>
                            <div className="prim_skills">
                              Secondary Skills: Plumber & Fitter
                            </div>
                            <div className="prim_skills">
                              <span className="leveltitle"> Expert Level:</span>{" "}
                              <StarRatingComponent
                                name="specialist_rating"
                                className="specialist_rating"
                                starCount={5}
                                value={specialist_rating}
                                onStarClick={onStarClick}
                                emptyStarColor={"#444"}
                              />
                            </div>
                            <div className="assigncont">
                              <button
                                value="Assign bgorange"
                                className="assign12"
                              >
                                Assign{" "}
                                <span>
                                  <img
                                    src={checkcircle}
                                    className="checkcircle1 "
                                    alt=""
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="container_01">
                          <div className="checkbox_craftman">
                            {/* <input type="checkbox" className="selectcheck" /> */}
                            <label className="container_box">
                              Welder
                              <input type="checkbox" name="radio" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="imagecontainer01">
                            <img src={welder} className="welder" alt="welder" />
                          </div>
                          <div className="cardbody01">
                            <div>
                              <span className="cardname">Chiemezie Akato</span>{" "}
                              <span className="cerfified1">
                                Certified Welder
                              </span>
                            </div>
                            <div className="prim_skills">
                              Secondary Skills: Plumber & Fitter
                            </div>
                            <div className="prim_skills">
                              <span className="leveltitle"> Expert Level:</span>{" "}
                              <StarRatingComponent
                                name="specialist_rating"
                                className="specialist_rating"
                                starCount={5}
                                value={specialist_rating}
                                onStarClick={onStarClick}
                                emptyStarColor={"#444"}
                              />
                            </div>
                            <div className="assigncont">
                              <button
                                value="Assign bgorange"
                                className="assign12"
                              >
                                Assign{" "}
                                <span>
                                  <img
                                    src={checkcircle}
                                    className="checkcircle1 "
                                    alt=""
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default AssignSpecialist;
