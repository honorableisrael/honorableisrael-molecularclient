import React, { useEffect, useState, useContext } from "react";
import { Col, Row, Container, Table, Accordion, Card } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import blueavatar from "../../images/group2.png";

const DeployedSpecialist = withRouter(() => {
  const [state, setState] = useState({
    overview: true,
    deployedspecialist: false
  });
  const { overview, deployedspecialist } = state;

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
                  <Accordion className="dplsplsacc">
                    <Card>
                      <Accordion.Toggle  as={Card.Header} eventKey="0">
                        <div className="deploydsplstwrapp">
                          <div>
                            <span className="dploygrpsalpbt">GROUP A</span>
                            <span className="deplyeaggrgt">24 DEPLOYED</span>
                          </div>
                          <div className="splstsuspdbtn">Suspend</div>
                        </div>
                      </Accordion.Toggle>
                    </Card>
                    <Accordion.Collapse eventKey="0">
                      <div className="deployedsplsttable">
                        <Table hover>
                          <thead>
                            <tr>
                              <th className="depspltabcol1"></th>
                              <th>Full Name</th>
                              <th>Skill</th>
                              <th>Position</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="depspltabcol1">
                                <input type="checkbox" />
                              </td>
                              <td className="dpslstnamecell">
                                <div className="dplsplusernmeimg">
                                  <span></span>
                                  <div>Sunday Okoro Pascal</div>
                                </div>
                              </td>
                              <td>Fitter</td>
                              <td>Group Lead</td>
                              <td>Active</td>
                            </tr>
                            <tr>
                              <td className="depspltabcol1">
                                <input type="checkbox" />
                              </td>
                              <td className="dpslstnamecell">
                                <div className="dplsplusernmeimg">
                                  <span></span>
                                  <div>Sunday Okoro Pascal</div>
                                </div>
                              </td>
                              <td>Fitter</td>
                              <td>Member</td>
                              <td>23-04-2021</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
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
