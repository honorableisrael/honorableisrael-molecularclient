import React, { useEffect, useState } from "react";
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
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/Molecular.png";
import axios from "axios";
import { API, notify } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AdminWorkOrderEvaluationStep3 = (props) => {
  const [state, setState] = useState<any>({
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
    isloading:false,
    work_order_detail:{}
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
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data,
            work_order_detail: res.data.data,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        console.log(err);
      });
  }, []);

  const sendInvoice = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/invoice/send`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          props.history.push("/admin_evaluation_step4");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if(err?.response?.status==400){
          return notify(err?.response?.data?.message) 
           }
        console.log(err);
      });
  };

  
  const {
    project_purpose,
    country,
    work_order_description,
    work_order_detail,
    order_title,
    end_date,
    reason,
    isloading,
    start_date,
    show,
    hour,
  } = state;
console.log(work_order_detail)
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
                      {/* <Col md={12} className="mm12">
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
                      </Col> */}
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
                                <div className="inv_title4">~~/~~</div>
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">Invoice Date</div>
                                <div className="inv_title4">~~/~~</div>
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
                                  {work_order_detail?.contractor}
                                </div>
                                <div className="inv_title3 inv_titlex ">
                                  {work_order_detail?.country}
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
                                  <th className="tablehead">
                                    Number of Joints
                                  </th>
                                  <th className="tablehead">Pipe Size</th>
                                  <th className="tablehead">Pipeline Length</th>
                                  <th className="tablehead">Pipeschedule Length</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                               work_order_detail?.pipe_configs?.map((data,i)=>(
                                <tr className="tdata">
                                  <td>{data?.joints}</td>
                                  <td>{data?.length}</td>
                                  <td>{data?.size}</td>
                                  <td>{data?.pipe_schedule}</td>
                                
                                </tr>
                               )) 
                              }
                              </tbody>
                            </Table>
                            <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                <th className="tablehead">
                                    Specialist Skill
                                  </th>
                                  <th className="tablehead">Number of Specialist</th>
                                  
                                  <th className="tablehead">Total Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                               work_order_detail?.specialist_requests?.map((data,i)=>(
                                <tr className="tdata">
                                  <td>{data?.skill}</td>
                                  <td>{data?.number}</td>
                                  <td>
                                    <b> N{data?.total_cost}</b>
                                  </td>
                                </tr>
                               )) 
                              }
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
                          <div className="gent122 gent12212" onClick={sendInvoice}>
                            {
                              isloading?"processing":"Send Invoice and Proceed"
                            }
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default AdminWorkOrderEvaluationStep3;
