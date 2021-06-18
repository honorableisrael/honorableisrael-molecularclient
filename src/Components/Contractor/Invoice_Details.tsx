import React, { useState } from "react";
import { Col, Row, Container, Form, Table } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import logo from "../../images/Molecular.png";
import nextbtn from "../../images/nextbtn.png";
import PaymentCards_1 from "./PaymentCards_1";

const Invoice_details = () => {
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
  const {
    inprogress,
    pending_request,
    past,
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
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Invoice Details</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3 rowta">
          <Col md={12} className="job34">
            <div className="title_wo">
              <div className="workorderheader porderheader1">
                <Link to="/contractor_dashboard">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Invoice Details
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
                  <div className="no_work1">You have no Payment</div>
                  <div className="nojob2 ">
                    <Link to="/contractor_dashboard">
                      <div className="job3">Back to Dashboard</div>
                    </Link>
                  </div>
                </Col>
              )}
              <Col md={12} className="plf">
                <div className="boxwrapper_inv">
                  <div className="box_inv outerpink">
                    <span className="box_smalltick smalltickpink"></span>Unpaid
                  </div>

                  <div className="boxwrapper__1">
                    <div className="lcomponent">
                      <div className="inv_title">Invoice : 312342132123</div>
                      <div className="inv_title2">
                        <div className="inv_title3"> Invoice Number</div>
                        <div className="inv_title4">1233127567812</div>
                      </div>
                      <div className="inv_title2">
                        <div className="inv_title3">Invoice Date</div>
                        <div className="inv_title4">23/02/2020</div>
                      </div>
                    </div>
                    <div className="rcomponent">
                      <img src={logo} alt="" className="Simage" />
                      <div className="Stext2">
                        15, Timi Ariyo Street, <br></br> Sangotedo, <br></br>
                        Lekki, Lagos State, Nigeria
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="boxwrapper__1 inv9">
                    <div className="lcomponent">
                      <div className="inv_title2">
                        <div className="inv_title3">Client</div>
                        <div className="inv_title4 ing">Helmotz Holdings</div>
                        <div className="inv_title3 inv_titlex ">
                          5, Temple Square, Wuse-II, Abuja, Nigeria.
                        </div>
                      </div>
                    </div>
                    <div className="rcomponent">
                      <div className="inv_title2">
                        <div className="inv_title3">Invoice Amount</div>
                        <div className="inv_title4 ing">N123,324</div>
                        <div className="inv_title3">Amount Paid</div>
                        <div className="inv_title4 ing">N0.0</div>
                      </div>
                    </div>
                    <div className="rcomponent">
                      <div className="inv_title2">
                        <div className="inv_title3">Balance Due</div>
                        <div className="inv_title4 ing">N1,123,324</div>
                      </div>
                    </div>
                  </div>
                  <div className="ing_11">
                    <Table responsive>
                      <thead className="theadinvoice">
                        <tr>
                          <th className="tablehead">Task Details</th>
                          <th className="tablehead">Specialist No.</th>
                          <th className="tablehead">Number of Joints</th>
                          <th className="tablehead">Pipe Size</th>
                          <th className="tablehead">Pipe Length</th>
                          <th className="tablehead">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tdata">
                          <td>Construction of Pipeline from Lagos to Abuja</td>
                          <td>2</td>
                          <td>210</td>
                          <td>200</td>
                          <td>70</td>
                          <td><b>80</b></td>
                        </tr>
                      </tbody>
                    </Table>
                    {/* <div className="text-right mgg2">
                      <span className="alignright">
                        Raise confirmation order
                      </span>
                    </div> */}
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

export default Invoice_details;
