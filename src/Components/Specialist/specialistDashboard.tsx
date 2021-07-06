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
  });

  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "specialist") {
      return props.history.push("/login");
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
          });
        })
      )
      .catch((err) => {
        console.log(err);
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
                  <p>0</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payments Outstanding</p>
                    <div>
                      <img src={third} alt="img" />
                    </div>
                  </div>
                  <p>N0</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payment Recieved</p>
                    <div>
                      <img src={fourth} className="img-fluid" alt="img" />
                    </div>
                  </div>
                  <p>0</p>
                </div>
              </div>
              <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
            </Col>
            <Col md={3}>
              <Notification all_notification={state.notification} />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <div>
                <p className="splstdshwrkhistory">Previous Works</p>
                <div className="wrkhhistrycardwrapper">
                  <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                </div>
                <div className="wrkhhistrycardwrapper">
                  <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SpecialistDashboard;
