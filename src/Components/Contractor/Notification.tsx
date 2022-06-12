import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, Pagination } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
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

const Notification = withRouter((props) => {
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
    if (token.user_type !== "contractor") {
      return props.history.push("/signin");
    }
    axios
      .all([
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data);
          setState({
            ...state,
            notification: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
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
          console.log(res.data.data);
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
        console.log(err);
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
          <title>Molecular - Contractor Notification</title>
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
                    <Link to="/contractor_dashboard">
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
                    <Link to="/contractor_dashboard">
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
                          <Link 
                          to="/contractor_work_order_details?inreview=true"
                          onClick={() =>
                            localStorage.setItem(
                              "work_order_details",
                              JSON.stringify({id:data.category_id})
                            )
                          }
                          >
                            <img
                              src={nextbtn}
                              alt="nxtbtn"
                              className="nxtbtn3 nxtbtn3_1 nxtbtn32 cbtn_221"
                            />
                          </Link>
                        ) :data?.category == "invoice" ? (
                          <Link
                            to={`/invoice_details/${data.category_id}`}
                            >
                              <img
                                src={nextbtn}
                                alt="nxtbtn"
                                className="nxtbtn3 nxtbtn3_1 nxtbtn32 cbtn_221"
                              />
                            </Link>
                        ):""}
                       
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

export default Notification;
