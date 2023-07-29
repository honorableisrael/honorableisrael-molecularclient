import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, Pagination, } from "react-bootstrap";
import "./specialistdshboard.css";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import { ageCalculator, API, capitalize } from "../../config";
import nextbtn from "../../images/nextbtn.png";
import axios from "axios";
import DashboardNav from "./specialistNavbar";

const SpecialistNotification = withRouter((props) => {
  const [state, setState] = useState({
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
    all_specialist: [],
    notification: [],
  });
  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            notification: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        
      });
  }, []);
  const nextPage = (x) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${x}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          window.scrollTo(-0, -0);
          setState({
            ...state,
            notification: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        
      });
  };
  const {
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    to,
    total,
    notification,
  }: any = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Specialist Notification</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <Col md={11} className="">
              <div className="">
                <div className="title_wo">
                  <div className="workorderheader">
                    <Link to="/specialistdashboard">
                      {" "}
                      <img src={arrowback} className="arrowback" />
                    </Link>
                    Notification
                  </div>
                </div>
              </div>
            </Col>
            <Row>
              {notification.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no Notifications</div>
                  <div className="nojob2 ">
                    <Link to="/specialistdashboard">
                      <div className="job3">Back to Dashboard</div>
                    </Link>
                  </div>
                </Col>
              )}
              <Col md={12} className="centerednotification">
                {notification.map((data, i) => (
                  <div className="work_order212">
                    <div className="flex-col">
                      <div className="nwraper">
                        <div className="notification_desc">{data.title}</div>
                        <div>
                          <div className={"unpaidgreen inprogress_4"}>
                            <span className={"paidd2green box_cust"}></span>
                            <span>{data?.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="nextbtn nextbtn_2">
                        {data?.category == "work order" ? (
                          <Link to={"/works"}>
                            <img
                              src={nextbtn}
                              alt="nxtbtn"
                              className="nxtbtn3 nxtbtn3_1"
                            />
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="nwraper">
                      <div className="ppp1">{data?.message}</div>
                      <div className="nnw12">{data?.sent_since}</div>
                    </div>
                  </div>
                ))}

                <div className="active_member2">
                  <div>
                    Displaying <b>{current_page}</b> of <b>{last_page}</b>
                  </div>
                  <Pagination>
                    <Pagination.First onClick={() => nextPage(first)} />
                    <Pagination.Prev onClick={() => nextPage(prev)} />
                    <Pagination.Next onClick={() => nextPage(next)} />
                    <Pagination.Last onClick={() => nextPage(last)} />
                  </Pagination>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default SpecialistNotification;
