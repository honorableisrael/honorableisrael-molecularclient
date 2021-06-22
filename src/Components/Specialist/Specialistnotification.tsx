import React, { useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "../Contractor/contractor.css";
import  DashboardNav from './specialistNavbar';
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import nextbtn from "../../images/nextbtn.png";




const SpecialistNotification = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    start_date,
    hour,
  } = state;
  return (
    <>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Notification</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="dshworksectnrow1">
          <Col md={11} className="job34">
            <div className="title_wo">
              <div className="workorderheader">
                <Link to="/contractor_dashboard">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Notifications         
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
                  <div className="no_work1">You have no Notifications</div>
                  <div className="nojob2 ">
                    <Link to="/contractor_dashboard">
                      <div className="job3">Back to Dashboard</div>
                    </Link>
                  </div>
                </Col>
              )}
              <Col md={12}>
                <div className="work_order2122">
                  <div className="flex-col">
                    <div className="nwraper">
                      <div className="notification_desc">
                        Work Order Now awaiting Review
                      </div>
                      <div>
                        <div className={" inprogress_4 inreview"}>
                          <span className={"paidd2green box_cust inreview"}></span>
                          <span>In Review</span>
                        </div>
                      </div>
                    </div>
                    <div className="nextbtn nextbtn_2">
                      <img src={nextbtn} alt="nxtbtn" className="nxtbtn3 nxtbtn3_1" />
                    </div>
                  </div>
                  <div className="nwraper">
                    <div className="ppp1">
                      Constructing a pipe from Lagos to Ofin State
                    </div>
                    <div className="nnw12">Just Now</div>
                  </div>
                </div>
                <div className="work_order2122">
                  <div className="flex-col">
                    <div className="nwraper">
                      <div className="notification_desc">
                        Work Order Now awaiting Review
                      </div>
                      <div>
                        <div className={" inprogress_4 inreview"}>
                          <span className={"paidd2green box_cust inreview"}></span>
                          <span>Invoice</span>
                        </div>
                      </div>
                    </div>
                    <div className="nextbtn nextbtn_2">
                      <img src={nextbtn} alt="nxtbtn" className="nxtbtn3 nxtbtn3_1" />
                    </div>
                  </div>
                  <div className="nwraper">
                    <div className="ppp1">
                      Constructing a pipe from Lagos to Ofin State
                    </div>
                    <div className="nnw12">Just Now</div>
                  </div>
                </div>
                <div className="work_order2122">
                  <div className="flex-col">
                    <div className="nwraper">
                      <div className="notification_desc">
                        Work Order Now awaiting Review
                      </div>
                      <div>
                        <div className={"unpaidgreen inprogress_4 inreview"}>
                          <span className={"paidd2green box_cust inreview"}></span>
                          <span>Invoice</span>
                        </div>
                      </div>
                    </div>
                    <div className="nextbtn nextbtn_2">
                      <img src={nextbtn} alt="nxtbtn" className="nxtbtn3 nxtbtn3_1" />
                    </div>
                  </div>
                  <div className="nwraper">
                    <div className="ppp1">
                      Constructing a pipe from Lagos to Ofin State
                    </div>
                    <div className="nnw12">Just Now</div>
                  </div>
                </div>
              </Col>
              
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SpecialistNotification;