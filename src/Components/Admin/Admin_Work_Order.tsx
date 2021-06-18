import React, { useState, useEffect } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import WorkOrderCard from "../Contractor/WorkOrderCards";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import no_work_order2 from "../../images/calendar 1.png";
import AdminWorkOrderCards from "./WorkCardAdmin";
import New_Work_Order_Card from "./New_Work_Order_Card";

const AdminWorkOrder = () => {
  const [state, setState] = useState({
    work_orders: [],
    inprogress: true,
    pending_request: false,
    past: false,
    new_order: true,
    awaiting_assignment: false,
    work_order_title: "",
    work_order_description: "",
    project_purpose: "",
    location: "",
    state_: "",
    search: "",
    location_terrain: "",
    start_date: "",
    end_date: "",
    hours_perday: "",
    fourthtab: false,
    fifthtab: false,
    sixthtab: false,
  });

  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: true,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "fifthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: false,
        fifthtab: true,
        sixthtab: false,
      });
    }
    if (a == "sixthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: true,
      });
    }
    if (a == "new_order") {
      return setState({
        ...state,
        new_order: true,
        awaiting_assignment: false,
      });
    }
    if (a == "awaiting_assignment") {
      return setState({
        ...state,
        new_order: false,
        awaiting_assignment: true,
      });
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const {
    inprogress,
    pending_request,
    past,
    fourthtab,
    fifthtab,
    sixthtab,
    search,
    awaiting_assignment,
    new_order,
    work_order_title,
    work_order_description,
    project_purpose,
    location,
    state_,
    location_terrain,
    start_date,
    end_date,
    hours_perday,
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
          <Col md={11} className="job34 job_4">
            <div className="title_wo fl__l">
              <div className="workorderheader">Work Order</div>
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
            <div className="intab">
              <div
                onClick={() => switchTab("firsttab")}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              <div
                onClick={() => switchTab("secondtab")}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                New
              </div>
              <div
                onClick={() => switchTab("thirdtab")}
                className={past ? "inprogress tab_active" : "inprogress"}
              >
                In Progress
              </div>
              <div
                onClick={() => switchTab("fourthtab")}
                className={fourthtab ? "inprogress tab_active" : "inprogress"}
              >
                Completed
              </div>
              <div
                onClick={() => switchTab("sixthtab")}
                className={sixthtab ? "inprogress tab_active" : "inprogress"}
              >
                On Hold
              </div>
            </div>
            <div className="reqwrapper">
              <div
                className={
                  new_order
                    ? "req12 border__right__none"
                    : "req12 border__right__none bgnone"
                }
                onClick={() => switchTab("new_order")}
              >
                New
              </div>
              <div
                onClick={() => switchTab("awaiting_assignment")}
                className={
                  awaiting_assignment
                    ? "assign__1 active_ border__left__none bgorange"
                    : "assign__1 border__left__none"
                }
              >
                Awaiting Assignment
              </div>
            </div>
            <Row>
              {false && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">
                    You have no Work Order In Progress
                  </div>
                  <div className="nojob2 ">
                    <Link to="/work_order">
                      <div className="job3">New Work Order</div>
                    </Link>
                  </div>
                </Col>
              )}
              {!awaiting_assignment && (
                <div className="cardflex_jo">
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={false}
                  />
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={false}
                  />
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"In Review"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Completed"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Pending"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Terminated"}
                    />
                  </Link>
                </div>
              )}
              {awaiting_assignment && (
                <div className="cardflex_jo">
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={true}
                  />
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminWorkOrder;
