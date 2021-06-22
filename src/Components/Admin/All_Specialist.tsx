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
import axios from "axios";
import { API } from "../../config";

const All_Specialist = () => {
  const [state, setState] = useState({
    all_specialist: [],
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
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
    if (a == "fifthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
    if (a == "sixthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
  };
  const fetch_all = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_specialist: res.data.data.data,
            inprogress: true,
            pending_request: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const filter_by_new = (fun) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders/new?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_specialist: res.data.data.data,
            inprogress: false,
            pending_request: true,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
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
    inprogress,
    pending_request,
    past,
    start_date,
    hour,
    search,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Admin View Specialist</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3 rowt3x">
          <Col md={12} className="job34">
            <div className="title_wo flexgroup_ flexgroup_1">
              <div className="title_wo fl__l">
                <div className="workorderheader workorderheader002">Specialist</div>
                <div className="searchcontrol_">
                  <input
                    type="text"
                    className="form-control search_field"
                    value={search}
                    name="search"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="intab">
                <div
                  onClick={() => fetch_all()}
                  className={
                    inprogress ? "inprogress tab_active" : "inprogress"
                  }
                >
                  All
                </div>
                <div
                  onClick={() => filter_by_new(switchTab("secondtab"))}
                  className={
                    pending_request ? "inprogress tab_active" : "inprogress"
                  }
                >
                  Active
                </div>
                <div
                  onClick={() => switchTab("thirdtab")}
                  className={past ? "inprogress tab_active" : "inprogress"}
                >
                In Active
                </div>
              </div>
            <Row>
              <Col md={12} className="job23">
                <div className="formcontent formCi">
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
                                value="Assign"
                                className="assign12 btn_Cust"
                              >
                                View Profile{" "}
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
                                className="assign12 btn_Cust"
                              >
                                View Profile{" "}
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
                                className="assign12 btn_Cust"
                              >
                                View Profile{" "}
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
                                className="assign12 btn_Cust"
                              >
                                View Profile{" "}
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

export default All_Specialist;
