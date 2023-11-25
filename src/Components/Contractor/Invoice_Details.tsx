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
import {
  API,
  contractorToken,
  current_currency,
  FormatAmount,
  formatTime,
  MID,
  notify,
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import viewmore from "../../assets/view-more.png";

declare global {
  interface Window {
    initPayment: any;
  }
}

declare global {
  interface Window {
    initPayment: any;
  }
}

const Invoice_details = (props) => {
  const [state, setState] = useState<any>({
    invoice_details: {},
    user_details: "",
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
    u_id: "",
    show: false,
    show2: false,
    reason: "",
    isloading: false,
    work_order_detail: {},
    pipe_breakdown: [],
    id: "",
    cycle_amount: "",
    MID: "GP0000001",
  });

  const onchange = (e) => {
    
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
  const openModal = () => {
    setState({
      ...state,
      show: true,
    });
  };
  
  useEffect(() => {
    window.scrollTo(-0, -0);
    
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = contractorToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/contractor/invoices/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/contractor`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(
          `${API}/contractor/work-orders/${props?.match?.params?.work_order_id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res2, res3, res4) => {
          
          setState({
            ...state,
            work_order_detail: res4.data.data,
            invoice_details: res2.data.data,
            user_details: res3.data.data,
            pipe_breakdown: res4.data.data.pipe_configs,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        
      });
  }, []);

  const AcceptInvoice = () => {
    const token = contractorToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/contractor/invoices/${props?.match?.params?.id}/approve`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          setTimeout(() => {
            props.history.push("/proforma_invoice_accepted");
          }, 2000);
          
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
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        
      });
  };

  const initPayment = (x) => {
    window.initPayment({
      MID: MID,
      email: user_details?.contractor?.email,
      firstname: user_details?.contractor?.first_name,
      lastname: user_details?.contractor?.last_name,
      customer_txnref: x,
      description: "Cycle payment",
      title: "",
      amount: cycle_amount,
      country: "NG",
      currency: "NGN",
      onclose: function () {
        notify("failed to complete payment");
      },
      callback: function (response) {
        
        notify(response.message);
        if (response?.bank_message == "Approved") {
          MakePayment();
        }
      },
    });
  };

  const MakePayment = () => {
    const token = contractorToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/contractor/sub-invoices/${id}/pay`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Payment successful");
          setTimeout(() => {
            setState({
              ...state,
              isloading: false,
              show2: false,
            });
            window.location.reload();
          }, 2000);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          // return notify(err?.response?.data?.message);
        }
        
      });
  };
  const get_payment_ref = () => {
    return setState({
      ...state,
      show2: false,
    });
    const token = contractorToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/contractor/sub-invoices/${id}/pay`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          initPayment(res?.data?.data?.reference);
          setTimeout(() => {
            setState({
              ...state,
              isloading: false,
              show2: false,
            });
          }, 2000);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          // return notify(err?.response?.data?.message);
        }
        
      });
  };
  const {
    project_purpose,
    country,
    work_order_description,
    work_order_detail,
    pipe_breakdown,
    u_id,
    user_details,
    isloading,
    id,
    show2,
    invoice_details,
    show,
    cycle_amount,
  } = state;
  
  return (
    <>
      <Modal
        size='sm'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12_ mdl2'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Accept Proforma Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <div>
                You are about to accept the Proforma invoice, please click Ok to
                continue
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <div
                className='terminate1'
                onClick={() =>
                  setState({
                    ...state,
                    show: false,
                  })
                }>
                {"Cancel"}
              </div>
              <Button
                className='greenbtn2 btn-success'
                onClick={(e) => AcceptInvoice()}>
                {isloading ? "Processing" : "Ok"}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        size='sm'
        show={show2}
        onHide={() =>
          setState({
            ...state,
            show2: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12_ mdl2'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Complete Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <div>
                Make a payment of N{FormatAmount(cycle_amount)} to the account
                number below
                {
                  <div className='fbn1'>
                    <div className='bnclass flex-wrap'>
                      <span className='lightcolor'> Bank name:</span>
                      {invoice_details?.bank_account?.bank_name}
                    </div>
                    <div className='bnclass'>
                      <span className='lightcolor'> Account name:</span>
                      {invoice_details?.bank_account?.account_name}
                    </div>
                    <div className='bnclass'>
                      <span className='lightcolor'> Account number:</span>
                      {invoice_details?.bank_account?.account_number}
                    </div>
                  </div>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              {/* <div
                className='terminate1'
                onClick={() =>
                  setState({
                    ...state,
                    show2: false,
                  })
                }>
                {"Cancel"}
              </div> */}

              <Button
                className='greenbtn2 btn-success'
                // onClick={(e) => MakePayment()}
                onClick={(e) => get_payment_ref()}>
                {isloading ? "Processing" : "Ok"}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className='dasbwr tainer3'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2 brt00'>
          <Col md={11} className='job34'>
            <div className='title_wo title_wo12 title_wo_ tbtom ttbom'>
              <div className='workorderheader fixedtitle'>
                <Link to='/payment_invoice'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </Link>{" "}
                &nbsp; Proforma Invoice Details
              </div>
              <Button
                className='payspecialist1 h36'
                onClick={() => window.print()}>
                Print
              </Button>
            </div>
            <Row className='mgtop mgzero'>
              <Col md={12} className='mgtop345'>
                <div className='job23_1a hidden__1'>
                  <div className=''>
                    <div className='overview12 overviewflex-down'>
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
                      <Col md={12} className='plf'>
                        <div className=''>
                          <div className='box_inv outerpink'>
                            <span className='box_smalltick smalltickpink'></span>
                            {invoice_details?.total_amount_paid > 0
                              ? "Payment in progress"
                              : "Unpaid"}
                          </div>
                          <div className='boxwrapper__1'>
                            <div className='lcomponent'>
                              <div className='inv_title'>
                                Invoice : {invoice_details.reference}
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'>
                                  {" "}
                                  Invoice Number{" "}
                                  <span className='acceptedinvoc'>
                                    {invoice_details.is_approved
                                      ? "Accepted"
                                      : "Awaiting Acceptance"}
                                  </span>
                                </div>
                                <div className='inv_title4'>
                                  {invoice_details?.number ?? "~~/~~"}
                                </div>
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Invoice Date</div>
                                <div className='inv_title4'>
                                  {formatTime(invoice_details?.sent_at) ??
                                    "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <img src={logo} alt='' className='Simage' />
                              <div
                                className='Stext2'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    invoice_details?.company_address ?? "n/a",
                                }}></div>
                            </div>
                          </div>
                          <hr />
                          <div className='boxwrapper__1 inv9'>
                            <div className='lcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3 inv_titlex '>
                                  {work_order_detail?.country}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Total Amount</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount
                                  ) ?? "~~/~~"}
                                </div>
                                <div className='inv_title3'>Amount Paid</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_paid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Balance Due</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_unpaid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='ing_11'>
                            <Table responsive>
                              <thead className='theadinvoice'>
                                <tr>
                                  <th className='tablehead'>Start Date</th>
                                  <th className='tablehead'>End date</th>
                                  <th className='tablehead'>Cost</th>

                                  <th className='tablehead'>Status</th>
                                  <th className='tablehead'>Cycle</th>
                                  <th className='tablehead'>Payment</th>
                                  <th className='tablehead'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.cycles?.map((data, i) => (
                                  <tr className='tdata' key={i}>
                                    <td>{formatTime(data?.start_date)}</td>
                                    <td>{formatTime(data?.end_date)}</td>
                                    <td>
                                      {current_currency}
                                      {FormatAmount(data?.amount)}
                                    </td>
                                    <td>{data?.status}</td>
                                    <td>{data?.cycle}</td>
                                    <td>
                                      {data?.status == "Unpaid" ? (
                                        <Button
                                          className='btn-success primary3'
                                          onClick={() => {
                                            setState({
                                              ...state,
                                              show2: true,
                                              cycle_amount: data.amount,
                                              id: data.id,
                                              u_id: data.number,
                                            });
                                          }}>
                                          Pay
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                    <td>
                                      <Link
                                        to={`/contractor_sub_invoice_details/${data?.id}`}>
                                        <img
                                          src={viewmore}
                                          className='viewmore mr-2 mt-2 cursor-pointer'
                                          alt=''
                                          title='View details'
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            {work_order_detail?.costing && (
                              <div className='gtotal'>
                                <span>Grand total</span>
                                <span>
                                  N
                                  {FormatAmount(
                                    work_order_detail?.costing?.contractor_cost
                                  )}
                                </span>
                              </div>
                            )}
                            <div className='text-right mgg2'></div>
                          </div>
                        </div>
                        <div className='allpayment00'>
                          <div className='allpayment1'>
                            All payments go to the account details below
                          </div>
                          {
                            <div className='fbn1'>
                              <div className='bnclass'>
                                <span className='lightcolor'> Bank name:</span>
                                {invoice_details?.bank_account?.bank_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account name:
                                </span>
                                {invoice_details?.bank_account?.account_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account number:
                                </span>
                                {invoice_details?.bank_account?.account_number}
                              </div>
                            </div>
                          }
                          {/* {invoice_details?.bank_accounts?.map((data, i) => (
                            <div className='fbn1'>
                              <div className='bnclass'>{data.bank}</div>
                              <div className='bnclass'>
                                {data.account_number}
                              </div>
                              <div className='bnclass'>{data.account_name}</div>
                            </div>
                          ))} */}
                        </div>
                        <div className='proformer_Invoc'>
                          {invoice_details.is_approved == false && (
                            <Button onClick={openModal}>
                              Accept Proforma Invoice
                            </Button>
                          )}
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='row3456 row3t2 rowt3'>
          <Col md={12}>
            <div
              className='accordion accordion-flush'
              id='accordionFlushExample'>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingThree'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseThree'
                    aria-expanded='false'
                    aria-controls='flush-collapseThree'>
                    <b>Project Description</b>
                  </button>
                </h2>
                <div
                  id='flush-collapseThree'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingThree'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <p>{work_order_detail?.description}</p>
                  </div>
                </div>
              </div>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingOne'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseOne'
                    aria-expanded='true'
                    aria-controls='flush-collapseOne'>
                    <b> PIPELINE WELDING BREAKDOWN</b>
                  </button>
                </h2>
                <div
                  id='flush-collapseOne'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingOne'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Pipe Size</th>
                          <th>Length</th>
                          <th>Pipe Schedule</th>
                          <th>Number of Joints</th>
                          <th>Price Per Inch (NGN)</th>
                          <th>Price Per Joint (NGN)</th>
                          <th>Total Amount (NGN)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pipe_breakdown?.map((data: any, i) => (
                          <tr key={i}>
                            <td>{data?.size}</td>
                            <td>{FormatAmount(data?.length)}</td>
                            <td>
                              {FormatAmount(data?.pipe_schedule) ?? "n/a"}
                            </td>
                            <td>{FormatAmount(data?.joints)}</td>
                            <td>
                              {FormatAmount(data?.price_per_joint ?? "n/a")}
                            </td>
                            <td>
                              {FormatAmount(data?.cost_per_joint ?? "n/a")}
                            </td>
                            <td>
                              {FormatAmount(data?.contractor_cost) ?? "n/a"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className='gtotal'>
                      <span>Grand total</span>
                      <span>
                        {FormatAmount(
                          work_order_detail?.costing?.contractor_cost
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingTwo'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseTwo'
                    aria-expanded='false'
                    aria-controls='flush-collapseTwo'>
                    <b> LIST OF COST EXCLUSIONS</b>
                  </button>
                </h2>
                <div
                  id='flush-collapseTwo'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingTwo'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <p>
                      <ul className='pl-0'>
                        {invoice_details?.cost_exclusions
                          ?.split("\n")
                          ?.map((data, i) => (
                            <li
                              className='pl-0'
                              dangerouslySetInnerHTML={{
                                __html: data ?? "n/a",
                              }}></li>
                          ))}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='invoicefooter'>
          <Col md={12}>
            <h5>Conditions</h5>
            <p>The Profoma Invoice is based on COST PER JOINT and covers:</p>
            <Row>
              <Col md={12}>
                {invoice_details?.conditions?.split("\n")?.map((data, i) => (
                  <p>{data}</p>
                ))}
              </Col>
            </Row>
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
    </>
  );
};

export default Invoice_details;
