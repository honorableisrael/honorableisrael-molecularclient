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
import WorkDetails_Form_Preview from "./workdetailsform";
import New_Work_Order_Card from "./New_Work_Order_Card";
import logo from "../../images/Molecular.png";

const AdminWorkOrderEvaluationStep3 = () => {
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

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    reason,
    location_terrain,
    start_date,
    show,
    hour,
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
            <div className="cubewrap2 cubewrap3"></div>
            <div className="cubewrap">
              <div className="cube1 activecube">1</div>
              <div className="cube1 activecube">2</div>
              <div className="cube1 activecube">3</div>
              <div className="cube1">4</div>
            </div>
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12 overviewflex-down">
                      <div className="edz">
                        <div className="eddit1">
                          {" "}
                          3 of 4 | <b>Invoice</b>{" "}
                        </div>
                      </div>
                      <Col md={12} className="mm12">
                        <h6>Account Details</h6>
                        <select
                          className="forminput formselect form-control"
                          required
                        >
                          <option value="" className="formselect">
                            Select account number
                          </option>
                          <option value="2009393939" className="rdsltopt">
                            2009393939
                          </option>
                          <option value="2009393931" className="rdsltopt">
                            2009393931
                          </option>
                        </select>
                      </Col>
                      <Col md={12} className="plf">
                        <div className="">
                          <div className="box_inv outerpink">
                            <span className="box_smalltick smalltickpink"></span>
                            Unpaid
                          </div>
                          <div className="boxwrapper__1">
                            <div className="lcomponent">
                              <div className="inv_title">
                                Invoice : 312342132123
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">
                                  {" "}
                                  Invoice Number
                                </div>
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
                                15, Timi Ariyo Street, <br></br> Sangotedo,{" "}
                                <br></br>
                                Lekki, Lagos State, Nigeria
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="boxwrapper__1 inv9">
                            <div className="lcomponent">
                              <div className="inv_title2">
                                <div className="inv_title3">Client</div>
                                <div className="inv_title4 ing">
                                  Helmotz Holdings
                                </div>
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
                                  <th className="tablehead">
                                    Number of Joints
                                  </th>
                                  <th className="tablehead">Pipe Size</th>
                                  <th className="tablehead">Pipe Length</th>
                                  <th className="tablehead">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="tdata">
                                  <td>
                                    Construction of Pipeline from Lagos to Abuja
                                  </td>
                                  <td>2</td>
                                  <td>210</td>
                                  <td>200</td>
                                  <td>70</td>
                                  <td>
                                    <b>80</b>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                            <div className="text-right mgg2"></div>
                          </div>
                        </div>
                        <div className="allpayment00">
                          <div className="allpayment1">
                            All payments go to any of the account details below
                          </div>
                          <div className="bnclass">First Bank</div>
                          <div className="bnclass">2019284891321</div>
                          <div className="bnclass">Molecular Incoparated</div>
                        </div>
                      </Col>
                      <div className="nxtbck">
                        <Link to="/admin_evaluation_step2">
                          {" "}
                          <div className="gent122 gent1221">Back</div>
                        </Link>{" "}
                        <Link to="/admin_evaluation_step4">
                          <div className="gent122 gent12212">
                            Send Invoice and Proceed
                          </div>
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

export default AdminWorkOrderEvaluationStep3;
