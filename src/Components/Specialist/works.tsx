import React, { useState, useEffect } from "react";
import DashboardNav from "./specialistNavbar";
import { Col, Row, Container, ProgressBar, Modal, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import WorkOrderCards from "./specialistWorkCards";
import portfolio from "../../images/portfolio.png";
import exclam from "../../images/exclammark.png";
import greyelipse from "../../images/greyelipse.png";
import calenda from "../../images/calendarr.png";
import location from "../../images/location.png";
import Specialist_Work_details from "./specialist_work_detail";
import notification_cal from "../../images/calendar 1.png";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";

const Works = () => {
  const [state, setState] = useState({
    works_inprog: [],
    noWorksInprog: true,
    prev_works: [],
    noPreviousWorks: true,
    inprogress: true,
    pending_request: false,
    past: false,
    description: "",
    contractor: "",
    status: "",
    start_date: "",
    end_date: ""
  });
  const {
    inprogress,
    pending_request,
    past,
    noWorksInprog,
    works_inprog,
    prev_works,
    description,
    contractor,
    status,
    start_date,
    end_date
  } = state;

  const switchTab = a => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true
      });
    }
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);

    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/specialist/work-orders/active`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` }
        }
      ),
      Axios.get<any, AxiosResponse<any>>(
        `${API}/specialist/work-orders/previous`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` }
        }
      )
    ]).then(
      Axios.spread((res, res1) => {
        console.log(res.data);
        console.log(res1.data);
        console.log(res.data.data);
        setState({
          ...state,
          works_inprog: res.data.data.data ,
          prev_works: res1.data.data.data,
        });
      })
    );
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Specialist Works </title>
        <link />
      </Helmet>
      <DashboardNav />
      <Container fluid>
        <Row className="dshworksectnrow1">
          <Col md={11} className="job34">
            <div className="title_wo">
              <div className="jobs">Work Order</div>
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
                Previous
              </div>
            </div>
            <Row>
              {inprogress && (
                <div className="cardflex_jo">
                   {works_inprog.length == 0 && (
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
                </Col>
              )}
                  {works_inprog?.map((data: any, index) => {
                    return (
                        <WorkOrderCards
                          key={index}
                          title={data.description}
                          contractor={data.contractor}
                          start={data.start_date}
                          end={data.end_date}
                          status={data.status}
                        />
                    );
                  })}
                  <div className="jobs jobs2">Previous Work Order</div>
                  {prev_works.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={notification_cal}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">
                    You have no Previous Work Order
                  </div>
                </Col>
              )}
                  {prev_works.map((item: any, index) => {
                    return (
                      <Link to="/specialistWorkOrderDetails" key={index}>
                        <WorkOrderCards
                          title={item.description}
                          contractor={item.contractor}
                          start={item.start_date}
                          end={item.end_date}
                          status={item.status}
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
              {pending_request && (
                <>
                  <Specialist_Work_details />
                </>
              )}
              {past && (
                <div className="cardflex_jo">
                 {prev_works.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={notification_cal}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">
                    You have no Previous Work Order
                  </div>
                </Col>
              )}
                  {prev_works.map((item: any, index) => {
                    return (
                      <Link to="/specialistWorkOrderDetails" key={index}>
                        <WorkOrderCards
                          title={item.description}
                          contractor={item.contractor}
                          start={item.start_date}
                          end={item.end_date}
                          status={item.status}
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Works;
