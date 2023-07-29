import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Modal,
  Form,
  Alert,
  Pagination,
} from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/dashbdlogo.png";
import {
  API,
  FormatAmount,
  formatTime,
  notify,
  specialistToken,
  current_currency,
  reloadPage,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import closeimg from "../../images/closeimg.png";
import exclam from "../../images/exclammark.png";

const AdvancePayment = (props) => {
  const [state, setState] = useState<any>({
    work_orders: [],
    invoice_details: {},
    country: "",
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    isloading: false,
    reason: "",
    work_order_detail: {},
    terminateWorkModal: false,
    requested_amount: "",
    errorMessage: "",
    successMessage: "",
    payment_history: [],
    work_order: {},
    cycle_id: "",
    PaymentErrorMessage: false,
    max_requested_amount: "",
    rate: 0.7,
  });

  const {
    work_order,
    work_order_detail,
    payment_history,
    errorMessage,
    PaymentErrorMessage,
    invoice_details,
    requested_amount,
    terminateWorkModal,
    max_requested_amount,
    successMessage,
    isloading,
    cycle_id,
    rate,
  }: any = state;

  const onchange = (e) => {
    if (e.target.name == "requested_amount") {
      if (e.target.value > 500000) {
        return setState({
          ...state,
          [e.target.name]: 500000,
        });
      } else {
        return setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
    }
  };
  const calculateLoanableAmount = () => {
    const loanableamount = rate * max_requested_amount;
    return loanableamount;
  };
  const workModal = (id, amount) => {
    
    setState({
      ...state,
      cycle_id: id,
      max_requested_amount: amount,
      requested_amount: 0.0,
      // requested_amount: (rate * amount)?.toFixed(2),
      terminateWorkModal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = specialistToken();
    const work_order = localStorage.getItem("Invoice_payment_details");
    
    axios
      .all([
        axios.get(`${API}/specialist/work-orders/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res4) => {
          
          setState({
            ...state,
            // ...res3.data.data,
            // payment_history:res3.data.data.data,
            work_order: res4.data,
          });
        })
      )
      .catch((err) => {
        
      });
  }, []);

  const requestUpfrontPayment = (cycle_id) => {
    setState({
      ...state,
      isloading: true,
    });
    
    const availableToken = localStorage.getItem("loggedInDetails");
    
    const token = availableToken ? JSON.parse(availableToken) : "";
    
    const data = {
      amount: requested_amount,
    };
    axios
      .post(`${API}/specialist/work-orders/${cycle_id}/advance-payment`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        
        notify("payment requested successfully");
        reloadPage();
        setState({
          ...state,
          isloading: false,
          terminateWorkModal: false,
        });
      })
      .catch((err) => {
        
        notify("Request failed");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const toggleErrormessage = () => {
    setState({
      ...state,
      PaymentErrorMessage: true,
    });
  };
  const toggleErrormessageClose = () => {
    setState({
      ...state,
      PaymentErrorMessage: false,
    });
  };
  const fieldRef: any = useRef();
  useEffect(() => {
    if (PaymentErrorMessage && fieldRef) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [PaymentErrorMessage]);

  
  return (
    <>
      <Modal centered={true} onHide={closeworkModal} show={terminateWorkModal}>
        <div className='terminateworkmodalwrap'>
          <div className='terminateworkmodalimg'>
            <img src={closeimg} alt='close' onClick={closeworkModal} />
          </div>
          <div className='terminateworkmodaltitle'>
            Request Advance Payment{" "}
          </div>
          {successMessage && (
            <Alert key={2} variant='success' className='alertmessg'>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert key={2} variant='danger' className='alertmessg'>
              {errorMessage}
            </Alert>
          )}
          <div className='splinvoicemodalmssgwrap'>
            <i
              className='fa fa-exclamation fa-rotate-180 invoiceexclm'
              aria-hidden='true'></i>
            <p>The amount of early payment is limited to 500,000</p>
          </div>
          <form>
            <Row>
              <Col md={12} className='formsection1'>
                <Form.Group>
                  <h6 className='userprofile userprofile12'>Enter Amount</h6>
                  <Form.Control
                    type='number'
                    name='requested_amount'
                    value={requested_amount}
                    className='userfield'
                    onChange={onchange}
                    placeholder='Amount'
                    min={0}
                    max={500000}
                  />
                </Form.Group>
              </Col>
            </Row>
          </form>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeworkModal}>
              Cancel
            </span>
            <span
              className='profcertbtn upfrmodalbtn'
              onClick={() => requestUpfrontPayment(cycle_id)}>
              {!isloading ? "Send Request" : "Requesting..."}
            </span>
          </div>
        </div>
      </Modal>
      <Container fluid={true}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Specialist Payment</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='dshworksectnrow1' ref={fieldRef}>
          <Col md={11} className='job34'>
            <div className='title_wo'>
              <div className='workorderheader workorderheader1'>
                <Link to='/specialistWorkOrderDetails'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </Link>
                <div className='pl-2'>Advance Payment Request</div>
              </div>
            </div>

            {PaymentErrorMessage && (
              <div className='wrktimelinediv'>
                <img src={exclam} alt='img' />
                <p>sorry you cannot make an Early payment request now</p>
                <div
                  className='terminateworkmodalimg'
                  onClick={toggleErrormessageClose}>
                  <i className='fa fa-times'></i>
                </div>
              </div>
            )}
            <div className='spltpaybreakdwnwrapper'>
              <p className='spltpaybreakdwn-title'>{work_order_detail.title}</p>
              <div className='spltpaybreakdwn-details'></div>
              {!work_order?.data?.advance_payment && (
                <div className='panel panel-success'>
                  <div className='panel-heading text-center mb-4'>
                    You have not requested for advance payment for this
                    workorder
                  </div>
                  <div className='panel-body text-center'>
                    <span
                      className='upfrontbtn'
                      onClick={() =>
                        workModal(
                          work_order?.data?.id,
                          work_order?.data?.advance_payment?.amount
                        )
                      }>
                      Request Advance Payment
                    </span>
                  </div>
                </div>
              )}
              {work_order?.data?.advance_payment && (
                <div>
                  <Table hover size='md' responsive>
                    <thead className='splinvoitablehead'>
                      <tr>
                        <th>S/N</th>
                        <th style={{ minWidth: "8rem" }}>Date</th>
                        {/* <th style={{ minWidth: "10rem" }}>Payment Reference</th> */}
                        <th style={{ minWidth: "8rem" }}>
                          Amount ({current_currency})
                        </th>
                        <th style={{ minWidth: "9rem" }}>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{1}</td>
                        <td>
                          {formatTime(
                            work_order?.data?.advance_payment?.created_at
                          )}
                        </td>
                        {/* <td>{work_order?.data?.advance_payment?.reference}</td> */}
                        <td>
                          {FormatAmount(
                            work_order?.data?.advance_payment?.amount
                          )}
                        </td>
                        {/* <td>
                          {FormatAmount(work_order?.data?.advance_payment?.charge)}
                        </td> */}
                        <td>
                          {work_order?.data?.advance_payment?.status ==
                            "Paid" && (
                            <div className='invpaystatwrap po912'>
                              <span className='paystatindcator po912'></span>
                              <span className='paystattext po912'>paid</span>
                            </div>
                          )}
                          {work_order?.data?.advance_payment?.status ==
                            "Pending" && (
                            <div className='invpaystatwrap pendinwrap po912'>
                              <span className='paystatindcator pendininvoice po912'></span>
                              <span className='paystattext pendininvtext po912'>
                                Pending
                              </span>
                            </div>
                          )}
                          {work_order?.data?.advance_payment?.status !==
                            "Pending" && (
                            <div className='invpaystatwrap pendinwrap po912'>
                              <span className='paystatindcator pendininvoice po912'></span>
                              <span className='paystattext pendininvtext po912'>
                                {work_order?.data?.advance_payment?.status}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {/* {data.can_make_upfront == false && (
                       <span className="upfrontbtn inactivebtn" onClick={toggleErrormessage}>
                         Request Early Payment
                       </span>
                      )} */}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
            {/* <div className='upfnthistoryheader'>Early Payment History</div>
            <div className='spltpaybreakdwnwrapper'>
              <div>
                <Table hover size='md' responsive>
                  <thead className='splinvoitablehead'>
                    <tr>
                      <th>S/N</th>
                      <th style={{ minWidth: "8rem" }}> Amount</th>
                      <th style={{ minWidth: "8rem" }}>Status</th>
                      <th style={{ minWidth: "8rem" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_history?.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {current_currency}
                          {FormatAmount(data.amount)}
                        </td>
                        <td>
                          {data.status == "Paid" && (
                            <div>
                              <span className='historypaystattext paidinvtxt'>
                                Paid
                              </span>
                            </div>
                          )}
                          {data.status == "Unpaid" && (
                            <div>
                              <span className='historypaystattext pendininvtext'>
                                Pending
                              </span>
                            </div>
                          )}
                          {data.status == "Declined" && (
                            <div>
                              <span className='historypaystattext terminainvtxt'>
                                Declined
                              </span>
                            </div>
                          )}
                        </td>
                        <td>{formatTime(data.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div> */}
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName='bg-danger text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default AdvancePayment;
