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
import DashboardNav from "./navbar";
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
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import closeimg from "../../images/closeimg.png";
import exclam from "../../images/exclammark.png";

const AdminAdvancePayment = (props) => {
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
    payment_record: [],
    work_order: {},
    cycle_id: "",
    PaymentErrorMessage: false,
    max_requested_amount: "",
    rate: 0.7,
  });

  const {
    work_order,
    work_order_detail,
    payment_record,
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
      if (e.target.value < calculateLoanableAmount()) {
        return setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
      if (e.target.value > calculateLoanableAmount()) {
        console.log(calculateLoanableAmount());
        return setState({
          ...state,
          [e.target.name]: calculateLoanableAmount().toFixed(2),
        });
      }
    }
  };
  const calculateLoanableAmount = () => {
    const loanableamount = rate * max_requested_amount;
    return loanableamount;
  };
  const workModal = (id, amount) => {
    console.log(id);
    setState({
      ...state,
      cycle_id: id,
      max_requested_amount: amount,
      requested_amount: amount,
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
    console.log(props?.match?.params?.id);
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${props?.match?.params?.id}/specialist-advance-payments`,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res4) => {
          console.log(res4.data);
          setState({
            ...state,
            payment_record: res4.data.data,
            work_order: res4.data,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

 
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
  const ApprovePayment = (cycle_id) => {
    setState({
      ...state,
      isloading: true,
    });
    console.log(cycle_id);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      amount: requested_amount,
    };
    axios
      .post(
        `${API}/admin/work-orders/specialist-early-payments/${cycle_id}/approve`,
        data,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("payment requested successfully");
        reloadPage();
        setState({
          ...state,
          isloading: false,
          terminateWorkModal: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        notify("Request failed");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  console.log(work_order, "work_order");
  return (
    <>
      <Modal centered={true} onHide={closeworkModal} show={terminateWorkModal}>
        <div className='terminateworkmodalwrap'>
          <div className='terminateworkmodalimg'>
            <img src={closeimg} alt='close' onClick={closeworkModal} />
          </div>
          <div className='terminateworkmodaltitle'>
            {" "}
            Payment Approval Confirmation{" "}
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
            <p>Please confirm action</p>
          </div>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeworkModal}>
              Cancel
            </span>
            <span
              className='profcertbtn upfrmodalbtn'
              onClick={() => ApprovePayment(cycle_id)}>
              {!isloading ? "Approve Request" : "Approving..."}
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
              <div className='workorderheader'>
                {" "}
                <img
                  src={arrowback}
                  className='arrowback'
                  onClick={() => {
                    window?.history?.back();
                  }}
                />
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
              <div>
                <Table hover size='md' responsive>
                  <thead className='splinvoitablehead'>
                    <tr>
                      <th>S/N</th>
                      <th style={{ minWidth: "8rem" }}>Date</th>
                      <th style={{ minWidth: "10rem" }}>Name</th>
                      <th style={{ minWidth: "8rem" }}>Amount</th>
                      {/* <th style={{ minWidth: "8rem" }}>Charges</th> */}
                      <th style={{ minWidth: "9rem" }}>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_record?.data?.map((data, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{formatTime(data?.created_at)}</td>
                        <td>
                          {data?.specialist?.first_name}{" "}
                          {data?.specialist?.last_name}
                        </td>
                        <td>
                          {current_currency}
                          {FormatAmount(data?.amount)}
                        </td>
                        {/* <td>
                          {current_currency}
                          {FormatAmount(data?.charge)}
                        </td> */}
                        <td>
                          {data?.status == "Approved" && (
                            <div className='invpaystatwrap po912'>
                              <span className='paystatindcator po912'></span>
                              <span className='paystattext text-success'>
                                Approved
                              </span>
                            </div>
                          )}
                          {data?.status == "Pending" && (
                            <div className='invpaystatwrap pendinwrap po912'>
                              <span className='paystatindcator pendininvoice po912'></span>
                              <span className='paystattext pendininvtext po912'>
                                Pending
                              </span>
                            </div>
                          )}
                          {data?.status == "Declined" && (
                            <div className='invpaystatwrap pendinwrap po912'>
                              <span className='paystatindcator pendininvoice po912'></span>
                              <span className='paystattext pendininvtext po912 text-danger'>
                                Declined
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {data?.status == "Pending" && (
                            <span
                              className='upfrontbtn'
                              onClick={() => workModal(data?.id, data?.amount)}>
                              Aprove Payment
                            </span>
                          )}
                          {/* {data.can_make_upfront == false && (
                           <span className="upfrontbtn inactivebtn" onClick={toggleErrormessage}>
                             Request Early Payment
                           </span>
                          )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
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

export default AdminAdvancePayment;
