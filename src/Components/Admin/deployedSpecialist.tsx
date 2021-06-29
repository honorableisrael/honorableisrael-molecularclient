import React, { useEffect, useState, useContext } from "react";
import { Col, Row, Container, Table, Accordion, Card } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import blueavatar from "../../images/group2.png";
import Accordions from "../Widgets/Accordion"



const DeployedSpecialist = withRouter(() => {
  const [state, setState] = useState({
    overview: true,
    deployedspecialist: false,
    active: false,
    chevron: ""
  });
  const { overview, deployedspecialist, active, chevron } = state;

  const switchTab = a => {
    if (a == "firsttab") {
      return setState({
        ...state,
        overview: true,
        deployedspecialist: false
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        overview: false,
        deployedspecialist: true
      });
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Deployed Specialists</title>
        <link />
      </Helmet>
      <DashboardNav />
      <Container fluid>
        <Row className="depsplstrow">
          <Col md={11}>
            <div className="title_wo title_wo12 title_wo_">
              <div className="workorderheader">
                <Link to="/admin_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Order
              </div>
            </div>
            <div className="dpsplsttabs">
              <div
                onClick={() => switchTab("firsttab")}
                className={overview ? "inprogress tab_active" : "inprogress"}
              >
                Overview
              </div>
              <div
                onClick={() => switchTab("secondtab")}
                className={
                  deployedspecialist ? "inprogress tab_active" : "inprogress"
                }
              >
                Deployed Specialist
              </div>
            </div>
            <div>
              {overview && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>Specialists and groups deployed to</p>
                  </div>
                <Accordions title="Group A"/>
                <Accordions title="Group B"/>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default DeployedSpecialist;
