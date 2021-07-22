import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Table,
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
import { Link } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import logo from "../../images/Molecular.png";

const ProformaInvoiceAccepted = () => {
 
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
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2">
          <Col md={11} className="job34">
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12 overviewflex-down">
                      <div className="edz">
                        <div className="eddit1">
                          {" "}
                        </div>
                      </div>
                      <Col md={12} className="mm012">
                       <div className="Await0015">
                        Invoice Accepted!
                       </div>
                        <div className="Await0012"></div>
                        <div className="Await001">Admin has been notified, Specialists would be assigned to your work order shortly</div>
                      </Col>
                      <div className="nxtbck">
                        <Link to="/contractor_work_order">
                          {" "}
                          <div className="gent122 gent12212 gentback">Continue to Work Orders</div>
                        </Link>
                      </div>
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
};

export default ProformaInvoiceAccepted;
