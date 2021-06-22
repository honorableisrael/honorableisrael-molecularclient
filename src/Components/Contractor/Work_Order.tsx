import React, { useState,useEffect } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import WorkOrderCards from "./WorkOrderCards";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import no_work_order2 from "../../images/calendar 1.png";
import { API, capitalize } from "../../config";
import axios from "axios";
import Axios, { AxiosResponse } from "axios";


const ContractorWorkOrder = () => {
  const [state, setState] = useState({
    work_orders: [],
    inprogress: true,
    pending_request: false,
    past: false,
    work_order_title: "",
    work_order_description: "",
    project_purpose: "",
    location: "",
    state_: "",
    location_terrain: "",
    start_date: "",
    end_date: "",
    hours_perday: "",
  });
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false,
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
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
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
            work_orders: res.data.dta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    inprogress,
    pending_request,
    past,
    work_order_title,
    work_order_description,
    project_purpose,
    location,
    state_,
    location_terrain,
    work_orders,
    start_date,
    end_date,
    hours_perday,
  } = state;
  console.log(work_orders)
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
              <div className="jobs">Work Order</div>
              <div className="job2">
                <Link to="/work_order">
                  <div className="job3">Raise Work Order</div>
                </Link>
              </div>
            </div>
            <div className="intab">
              <div
                onClick={() => switchTab("firsttab")}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                In Progress
              </div>
              <div
                onClick={() => switchTab("secondtab")}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                Pending Request
              </div>
              <div
                onClick={() => switchTab("thirdtab")}
                className={past ? "inprogress tab_active" : "inprogress"}
              >
                Past
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
                      <div className="job3">Raise Work Order</div>
                    </Link>
                  </div>
                </Col>
              )}
              {true && (
                <div className="cardflex_jo">
                  <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                  <div className="jobs jobs2">Previous Work Order</div>
                  <WorkOrderCards
                    title={"Pipeline construction with Sulejah"}
                  />
                  <WorkOrderCards
                    title={"Pipeline construction with Sulejah"}
                    status={"Awaiting Approval"}
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

export default ContractorWorkOrder;
