import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import Addmore from "../../images/Add more.png";
import WorkDetails_Form_Preview from "./workdetailsform";

const NewWorkOrderStep3 = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    inprogress: true,
    pipesize: "",
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    end_date: "",
    diameter: "",
    start_date: "",
    pipe_wieght: "",
    pipelength: "",
    no_of_specialist: "",
    pipe_type: "",
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
    pipe_wieght,
    pipelength,
    end_date,
    no_of_specialist,
    start_date,
    hour,
    diameter,
    pipe_type,
    pipesize,
  } = state;
  useEffect(() => {
    window.scrollTo(-0, -0);
    const firstList: any = localStorage.getItem("first_step");
    const firstData = firstList ? JSON.parse(firstList) : "";
    console.log(firstData);
    const secondList: any = localStorage.getItem("second_step");
    const secondData = secondList ? JSON.parse(secondList) : "";
    console.log(secondData);
    setState({
      ...state,
      ...secondData,
      ...firstData
    })
  }, []);
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <div className="title_wo">
              <div className="workorderheader workorderheader22">
                <Link to="/contractor_work_order_step2">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                New Work Order
              </div>
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="form_header">
                  <span className="form_header1">
                    {" "}
                    <b>3</b> of 3{" "}
                  </span>{" "}
                  <b> Work Order Preview</b>
                </div>
                <WorkDetails_Form_Preview hide={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewWorkOrderStep3;
