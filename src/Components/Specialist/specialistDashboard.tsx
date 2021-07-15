import React, { useEffect, useState } from "react";
import DashboardNav from "./specialistNavbar";
import "./specialistdshboard.css";
import { Container, Row, Col } from "react-bootstrap";
import checkmrk from "../../images/jobscheck.png";
import fourth from "../../images/fourth.png";
import third from "../../images/third.png";
import avatar from "../../images/greyavatar.png";
import WorkOrderCards from "./specialistWorkCards";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import no_work_order from "../../images/document 1.png";
import { API } from "../../config";

const Notification = (props) => {
  console.log(props);
  return (
    <>
      <div className="spcdshbdnotificndv">
        <p className="splstdshnotifcntitle">Notifications</p>
        {props?.all_notification?.slice(0, 3)?.map((data, i) => (
          <>
            <Link to={"/specialistnotifications"}>
              <div className="splstdshbdnotifctnsectns" title={data.message}>
                <div>
                  <span className="spclsuserimgspn lemonbacgrd">
                    <img src={avatar} alt="img" />
                  </span>
                </div>
                <p>{data?.title}</p>
              </div>
            </Link>
            <div className="notificntimelinedv">{data?.sent_since}</div>
          </>
        ))}
      </div>
    </>
  );
};

const SpecialistDashboard = (props) => {
  const [state, setState] = useState({
    notification: [],
    works_inprog: [],
    prev_works: [],
    completed_works: "",
    outstanding_payments: "",
    payment_received: "",
    stats:"",
  });
  const {
    completed_works,
    prev_works,
    outstanding_payments,
    payment_received,
    works_inprog,
  }= state;

  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "specialist") {
      return props.history.push("/signin");
    }
    axios
      .all([
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/specialist/dashboard`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(
          `${API}/specialist/work-orders/active`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` }
          }
        ),
        axios.get(
          `${API}/specialist/work-orders/previous`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` }
          }
        )
      ])
      .then(
        axios.spread((res,res1,res2,res3) => {
          console.log(res.data);
          console.log(res1.data);
          console.log(res2.data)
          setState({
            ...state,
            ...res1.data.data,
            works_inprog: res2.data.data.data ,
            notification: res.data.data.data,
            prev_works: res3.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
     
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Specialialist Dashboard</title>
        <link />
      </Helmet>
      <DashboardNav />
      <div className="dshbdhome">
        <Container>
          <Row className="speclstcdshbdrow1">
            <Col md={9}>
              <div className="spldshbdcardwrapper">
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Completed Works</p>
                    <div>
                      <img src={checkmrk} alt="img" />
                    </div>
                  </div>
                  <p>{completed_works}</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payments Outstanding</p>
                    <div>
                      <img src={third} alt="img" />
                    </div>
                  </div>
                  <p>N{outstanding_payments}</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payment Recieved</p>
                    <div>
                      <img src={fourth} className="img-fluid" alt="img" />
                    </div>
                  </div>
                  <p>{payment_received}</p>
                </div>
              </div>
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
            </Col>
            <Col md={3}>
              <Notification all_notification={state.notification} />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <div>
                <p className="splstdshwrkhistory">Previous Works</p>
                {prev_works.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SpecialistDashboard;
