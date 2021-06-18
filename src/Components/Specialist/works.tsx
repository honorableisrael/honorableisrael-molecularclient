import React, { useState } from "react";
import DashboardNav from "./specialistNavbar";
import { Col, Row, Container, ProgressBar, Modal } from "react-bootstrap";
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
    terminateWorkModal: false
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
                <div className="cardflex_jo">
                  <Modal
                    centered={true}
                    onHide={closeworkModal}
                    show={terminateWorkModal}
                  >
                    <div className="terminateworkmodalwrap">
                      <div className="terminateworkmodalimg">
                        <img
                          src={closeimg}
                          alt="close"
                          onClick={closeworkModal}
                        />
                      </div>
                      <div className="terminateworkmodaltitle">
                        Decline Work
                      </div>
                      <form>
                        <textarea
                          name={"reason"}
                          className="form-control wrkmodaltextarea"
                          placeholder="Reason for Decline"
                          rows={5}
                          cols={5}
                        ></textarea>
                      </form>
                      <div className="wrkmodal-btnwrap">
                        <span
                          className="wrkmodal-cancelbtn"
                          onClick={closeworkModal}
                        >
                          Cancel
                        </span>
                        <span className="wrkmodal-declinebtn">Decline</span>
                      </div>
                    </div>
                  </Modal>
                  <div className="wrktimelinediv">
                    <img src={exclam} alt="img" />
                    <p>This job offer expires in 24 Hours</p>
                  </div>
                  <div className="pendingwrkcard">
                    <div className="pendingwrkcard-imgwrper">
                      <img src={portfolio} alt="img" />
                    </div>
                    <div className="pendingwrkcard-contntwraper">
                      <div className="pendingwrkcard-headingdiv">
                        <div className="pendingwrkcard-heading">
                          Pipeline construction with Sulejah
                        </div>
                        <div>
                          <span className="pendingwrkcard-heading-btn">
                            <img src={greyelipse} alt="img" />
                            Work
                          </span>
                        </div>
                      </div>
                      <p>Constructing a pipe from Lagos to Ofin State</p>
                      <div className="pendingwrkcard-asstsdiv">
                        <div className="pendingwrkcard-loctnasset">
                          <div className="pendingwrkcard-asset-img">
                            <img src={calenda} alt="img" />
                          </div>
                          <div className="pendingwrkcard-asset-cnt">
                            <h5>Location</h5>
                            <p>Lagos, Nigeria</p>
                          </div>
                        </div>
                        <div>
                          <div className="pendingwrkcard-calendasset">
                            <div className="pendingwrkcard-asset-img">
                              <img src={calenda} alt="img" />
                            </div>
                            <div className="pendingwrkcard-asset-cnt">
                              <h5>Duration</h5>
                              <p>5 Weeks</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pendingwrkcard-btndv">
                        <div className="pendingwrkcard-btndv1">
                          <span className="pendingwrkcard-accptbtn">
                            Accept
                          </span>
                          <span
                            className="pendingwrkcard-declinebtn"
                            onClick={workModal}
                          >
                            Decline
                          </span>
                        </div>
                        <div>
                          <span className="pendingwrkcard-btndv2">
                            N30,000 <span>/ Week</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="work_details worktitle">Work Details</h5>
                    <Specialist_Work_details />
                  </div>
                </div>
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
