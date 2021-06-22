import React, { useState } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/dashbdlogo.png";

const Specialist_Payment_Invoice = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: ""
  });
  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };
  const onInputChange = e => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, "") //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0
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
    hour
  } = state;
  return (
    <>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialist Payment</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="dshworksectnrow1">
          <Col md={11} className="job34">
            <div className="title_wo payinvoicetitle">
              <div className="workorderheader">
                <Link to="/Payments">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                View Payment
              </div>
            </div>
            <div className="spltpaybreakdwnwrapper">
              <div className="spltpaybreakdwn-logowrap">
                <div>
                  <p className="brkdwn">Breakdown ID</p>
                  <p className="brkdwn-id">1233127567812</p>
                </div>
                <div>
                  <img src={logo} alt="molecular-logo" />
                </div>
              </div>
              <p className="spltpaybreakdwn-title">
                Constructing a pipe from Lagos to Ofin State
              </p>
              <div className="spltpaybreakdwn-details">
                <div>
                  <p className="brkdwn detptg">Total Payment Cylcle</p>
                  <p className="brkdwn-id">5</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Paid Invoices</p>
                  <p className="brkdwn-id">5</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Project Duration</p>
                  <p className="brkdwn-id">5 Weeks</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Start Date</p>
                  <p className="brkdwn-id">27-06-2021</p>
                </div>
              </div>
              <div>
                <Table hover>
                  <thead className="splinvoitablehead">
                    <tr>
                      <th>Invoice Number</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                      <div className="invpaystatwrap">
                          <span className="paystatindcator"></span>
                          <span className="paystattext">paid</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                      <div className="invpaystatwrap">
                          <span className="paystatindcator"></span>
                          <span className="paystattext">paid</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap">
                          <span className="paystatindcator"></span>
                          <span className="paystattext">paid</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap pendinwrap">
                          <span className="paystatindcator pendininvoice"></span>
                          <span className="paystattext pendininvtext">pending</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap pendinwrap">
                          <span className="paystatindcator pendininvoice"></span>
                          <span className="paystattext pendininvtext">pending</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Specialist_Payment_Invoice;
