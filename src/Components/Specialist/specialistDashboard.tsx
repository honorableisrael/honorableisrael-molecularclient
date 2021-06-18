import React from "react";
import DashboardNav from "./specialistNavbar";
import "./specialistdshboard.css";
import { Container, Row, Col } from "react-bootstrap";
import checkmrk from "../../images/jobscheck.png";
import fourth from "../../images/fourth.png";
import third from "../../images/third.png";
import avatar from "../../images/greyavatar.png";
import WorkOrderCards from "./specialistWorkCards";
import { Helmet } from "react-helmet";


const SpecialistDashboard = () => {
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
                  <p>25</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payments Outstanding</p>
                    <div>
                      <img src={third} alt="img" />
                    </div>
                  </div>
                  <p>N1.2M</p>
                </div>
                <div className="spldshbdcard-small">
                  <div className="spldshbdcardheader">
                    <p>Payment Recieved</p>
                    <div>
                      <img src={fourth} className="img-fluid" alt="img" />
                    </div>
                  </div>
                  <p>1</p>
                </div>
              </div>
              <WorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
            </Col>
            <Col md={3}>
              <div className="spcdshbdnotificndv">
                <p className="splstdshnotifcntitle">Notifications</p>
                <div className="splstdshbdnotifctnsectns">
                  <div>
                    <span className="spclsuserimgspn lemonbacgrd">
                      <img src={avatar} alt="img" />
                    </span>
                  </div>
                  <p>Invoice ready for the first payment cycle</p>
                </div>
                <div className="notificntimelinedv">1 min ago</div>
                <div className="splstdshbdnotifctnsectns pddedsctns">
                  <div>
                    <span className="spclsuserimgspn bluespnbackgd">
                      <img src={avatar} alt="img" />
                    </span>
                  </div>
                  <p>Work order in awaiting review</p>
                </div>
                <div className="notificntimelinedv">1 min ago</div>
                <div className="splstdshbdnotifctnsectns pddedsctns">
                  <div>
                    <span className="spclsuserimgspn pinkspnbackd">
                      <img src={avatar} alt="img" />
                    </span>
                  </div>
                  <p>Work order awaiting review to move on</p>
                </div>
                <div className="notificntimelinedv">1 min ago</div>
                <div className="splstdshbdnotifctnsectns pddedsctns">
                  <div>
                    <span className="spclsuserimgspn skyspnbackgrnd">
                      <img src={avatar} alt="img" />
                    </span>
                  </div>
                  <p>Invoice ready for final payment cycle.</p>
                </div>
                <div className="notificntimelinedv rmvdshdlines">1 min ago</div>
              </div>
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
