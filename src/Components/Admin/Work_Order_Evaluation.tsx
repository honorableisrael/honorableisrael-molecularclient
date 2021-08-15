import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import WorkDetails_Form_Preview from "./workdetailsform";
import New_Work_Order_Card from "./New_Work_Order_Card";
import axios from "axios";
import { API } from "../../config";

const AdminWorkOrderEvaluation = withRouter((props) => {
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
    work_order_detail: "",
    show: false,
    reason: "",
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  
  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(`${API}/admin/work-orders/${work_order_details?.id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          ...res.data.data,
          work_order_detail: res.data.data,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        console.log(err);
      });
    let inreview = props.location.search;
    console.log(inreview);
  }, []);

  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    work_order_detail,
    reason,
    location_terrain,
    start_date,
    show,
  } = state;

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Reject order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className="form-control reason12 reason122"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div
                className="terminate1"
                onClick={(e) => openModal(e, "Terminate")}
              >
                Reject
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2">
          <Col md={11} className="job34">
            <div className="title_wo title_wo12 title_wo_ tbtom ttbom">
              <div className="workorderheader fixedtitle">
                <Link to="/admin_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Details
              </div>
            </div>
            <div className="cubewrap1"></div>
            <div className="cubewrap2"></div>
            <div className="cubewrap">
              <div className="cube1 activecube">1</div>
              <div className="cube1 inactivecube">2</div>
              <div className="cube1">3</div>
              <div className="cube1">4</div>
            </div>
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12">
                      <div className="eddit1">
                        {" "}
                        1 of 4 | <b>OVERVIEW</b>{" "}
                      </div>
                      <Link to="/admin_evaluation_step2">
                        {" "}
                        <div className="eddit">Edit</div>
                      </Link>
                    </div>
                    <New_Work_Order_Card
                      title={"Pipeline construction with Sulejah"}
                      order_details={work_order_detail}
                      status={"Terminated"}
                      awaiting_assignment={false}
                      hide={true}
                    />
                  </div>
                </div>
                <div className="job23_1a" id="details">
                  <div className="job23_1a wrap_z wrap_p">
                    <div id="work"></div>
                    <WorkDetails_Form_Preview
                    order_detail={work_order_detail}
                    hide={true} 
                    />
                    <div className="nxtbck">
                    <Link to="/admin_evaluation_step2">
                      <div className="gent122">Next</div>
                    </Link>
                  </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default AdminWorkOrderEvaluation;
