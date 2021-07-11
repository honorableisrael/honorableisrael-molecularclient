import React, { useState, useEffect} from "react";
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
import closeimg from "../../images/closeimg.png";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";


const Works = () => {
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
    terminateWorkModal: false,
  });
  const {
    inprogress,
    pending_request,
    past,
    terminateWorkModal,
    work_order_title,
    work_order_description,
    project_purpose,
    location,
    state_,
    location_terrain,
    start_date,
    end_date,
    hours_perday
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
  const onchange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
  
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);

      Axios.get<any, AxiosResponse<any>>(`${API}/specialist/work-orders/pending`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res)=>{
            console.log(res.data)
            console.log(res.data.data)
            setState({
              ...state,
              ...res.data.data

            })
      })
  },[])


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Specialist Work section</title>
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
                </Col>
              )}
              {inprogress && (
                <div className="cardflex_jo">
                  <Link to="/specialistWorkOrderDetails">
                    <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                  </Link>
                  <div className="jobs jobs2">Previous Work Order</div>
                  <Link to="/specialistWorkOrderDetails">
                    <WorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                    />
                  </Link>
                  <Link to="/specialistWorkOrderDetails">
                    <WorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Awaiting Approval"}
                    />
                  </Link>
                </div>
              )}
              {pending_request && (
               <>
               <Specialist_Work_details/>
               </>
              )}
              {past && (
                <div className="cardflex_jo">
                  <Link to="/specialistWorkOrderDetails">
                    <WorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                    />
                  </Link>
                  <Link to="/specialistWorkOrderDetails">
                    <WorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Completed"}
                    />
                  </Link>
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
