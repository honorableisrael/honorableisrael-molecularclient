import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Table,
  Modal,
  Button,
  Spinner,
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
  current_currency,
  FormatAmount,
  formatTime,
  notify,
  reloadPage,
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin_Invoice_details = (props) => {
  console.log(props);
  const [state, setState] = useState<any>({
    invoice_details: {},
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
    show2: false,
    reason: "",
    isloading: false,
    work_order_detail: {},
    pipe_breakdown: [],
    selected_id: "",
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
  const openPaymentModal = (id) => {
    setState({
      ...state,
      show: true,
      selected_id: id,
    });
  };
  const openPaymentModal2 = (id) => {
    setState({
      ...state,
      show2: true,
      selected_id: id,
    });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/invoices/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/bank-accounts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res2, res3, res4) => {
          console.log(res4.data.data);
          setState({
            ...state,
            ...res2.data.data,
            work_order_detail: res4.data.data,
            invoice_details: res2.data.data,
            pipe_breakdown: res4.data.data.pipe_configs,
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
          `${API}/admin/work-orders/${invoice_details?.id}/invoice/send`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
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
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };

  const makePaymentForSubInvoice = () => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/sub-invoices/${selected_id}/paid`,
          {},
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          notify("Successful");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };

  const makePaymentToSpecialist = () => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/sub-invoices/${selected_id}/specialists/paid`,
          {},
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          setTimeout(() => {
            window.location.assign("/scheduled_payments");
          }, 2000);
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
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };

  const sendInvoiceReminder = (id) => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/sub-invoices/${id}/send`,
          {},
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          reloadPage();
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
    show2,
    pipe_breakdown,
    start_date,
    invoice_details,
    selected_id,
    show,
  } = state;
  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12c"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Confirm Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>Are you sure you want to make payment</h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="" onClick={makePaymentToSpecialist}>
                <Button className="btn-success primary3">
                  {isloading ? "Processing" : "Confirm Payment"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={show2}
        onHide={() =>
          setState({
            ...state,
            show2: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12c"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Confirm Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>
                Are you sure the contractor has made payment for this payment
                cycle
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <Button
                className="btn-success succinline"
                onClick={() => {
                  setState({
                    ...state,
                    show2: false,
                  });
                }}
              >
                Cancel
              </Button>
              <div className="" onClick={makePaymentForSubInvoice}>
                <Button className="btn-success primary3">
                  {isloading ? "Processing" : "Confirm Payment"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className="dasbwr nopaddrt tainer3">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2  brt00">
          <Col md={11} className="job34 brt99x">
            <div className="title_wo title_wo12 title_wo_ tbtom ttbom">
              <div className="workorderheader fixedtitle">
                <Link to="/admin_payment_invoice">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>{" "}
                &nbsp; Proforma Invoice Details
              </div>
            </div>
            {!invoice_details?.sent_at && !isloading && (
              <div className="nxtbck">
                <div className="gent122 gent12212" onClick={sendInvoice}>
                  {isloading ? "processing" : "Send Proforma Invoice"}
                </div>
              </div>
            )}
            <Row className="mgtop">
              <Col md={12} className="mgtop345">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12 overviewflex-down">
                      <Col md={12} className="plf">
                        <div className="">
                          <div className="box_inv outerpink">
                            <span className="box_smalltick smalltickpink"></span>
                            {invoice_details?.total_amount_paid > 0
                              ? "Payment in progress"
                              : "Unpaid"}
                          </div>
                          <div className="boxwrapper__1">
                            <div className="lcomponent">
                              <div className="inv_title">
                                Invoice : {invoice_details.reference}
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">
                                  {" "}
                                  Invoice Number{" "}
                                  <span className="acceptedinvoc">
                                    {invoice_details.is_approved
                                      ? "Accepted"
                                      : "Awaiting Acceptance"}
                                  </span>
                                </div>
                                <div className="inv_title4">
                                  {invoice_details?.number ?? "~~/~~"}
                                </div>
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">Invoice Date</div>
                                <div className="inv_title4">
                                  {formatTime(invoice_details?.sent_at) ??
                                    "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className="rcomponent">
                              <img src={logo} alt="" className="Simage" />
                              <div
                                className="Stext2"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    invoice_details?.company_address ?? "n/a",
                                }}
                              ></div>
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
                                <div className="inv_title3">Total Amount</div>
                                <div className="inv_title4 ing">
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount
                                  ) ?? "~~/~~"}
                                </div>
                                <div className="inv_title3">Amount Paid</div>
                                <div className="inv_title4 ing">
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_paid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className="rcomponent">
                              <div className="inv_title2">
                                <div className="inv_title3">Balance Due</div>
                                <div className="inv_title4 ing">
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_unpaid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ing_11">
                            {isloading && (
                              <Spinner animation={"grow"} variant="info" />
                            )}
                            <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                  <th className="tablehead">Specialist Cost</th>
                                  <th className="tablehead">Date</th>
                                  <th className="tablehead">Status</th>
                                  {/* <th className="tablehead">
                                    Contractor Payment
                                  </th> */}
                                  <th className="tablehead">Cycle</th>
                                  <th className="tablehead">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.cycles?.map((data, i) => (
                                  <tr className="tdata" key={i}>
                                    <td>
                                      {current_currency}
                                      {FormatAmount(data?.amount)}
                                    </td>
                                    <td>{formatTime(data?.date)}</td>
                                    <td>{data?.status}</td>
                                    {/* <td>
                                      {data?.status == "Unpaid" ? (
                                        <Button
                                          onClick={() =>
                                            openPaymentModal2(data.id)
                                          }
                                          className="btn-success primary3"
                                        >
                                          Confirm Payment
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </td> */}
                                    <td>{data?.cycle}</td>
                                    <td>
                                      {data?.status == "Paid" &&
                                      !data.paid_specialists ? (
                                        <Button
                                          onClick={() =>
                                            openPaymentModal(data.id)
                                          }
                                          className="payspecialist1"
                                        >
                                          Schedule Specialists Payments
                                        </Button>
                                      ) : (
                                        ""
                                      )}

                                      {data?.status == "Unpaid" ? (
                                        <Button
                                          onClick={() =>
                                            sendInvoiceReminder(data.id)
                                          }
                                          className="btn-success primary3"
                                        >
                                          {!data.sent
                                            ? "Send Invoice"
                                            : "Resend Invoice"}
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <div className="text-right mgg2"></div>
                          </div>
                        </div>
                        <div className="allpayment00">
                          <div className="allpayment1">
                            All payments go to any of the account details below
                          </div>
                          {invoice_details?.bank_accounts?.map((data, i) => (
                            <div className="fbn1">
                              <div className="bnclass">{data.bank}</div>
                              <div className="bnclass">
                                {data.account_number}
                              </div>
                              <div className="bnclass">{data.account_name}</div>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row3456 row3t2 rowt3">
          <Col md={12}>
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <b>Project Description</b>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse show"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <p>{work_order_detail?.description}</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="true"
                    aria-controls="flush-collapseOne"
                  >
                   <b> PIPELINE WELDING BREAKDOWN </b>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Pipe Size</th>
                          <th>Length</th>
                          <th>Pipe Schedule</th>
                          <th>Number of Joints</th>
                          <th>Cost Per Joint (NGN)</th>
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
                              {FormatAmount(data?.cost_per_joint ?? "n/a")}
                            </td>
                            <td>
                              {FormatAmount(data?.contractor_cost) ?? "n/a"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="gtotal">
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
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                   <b> LIST OF COST EXCLUSIONS </b>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <p>
                      <ul>
                        <li>
                          {" "}
                          All welding consumables and accessories etc.
                          Consumables such as electrodes, grinding disks, fuel
                          and power.
                        </li>
                        <li>
                          {" "}
                          All welding equipments and accessories etc. Equipments
                          such as welding machines, grinding machines, vehicles
                          conveying all equipment etc
                        </li>
                        <li>
                          Helpers and other ancillary workers. This Proforma
                          does NOT cover helpers or electricians and
                          construction subordinate workers etc.
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="invoicefooter">
          <Col md={12}>
            <h5>Conditions</h5>
            <p>The Profoma Invoice is based on COST PER JOINT and covers:</p>
            <Row>
              <Col md={6}>
                <p>
                  (1.) Total Welding & Fitting Specialists Spreads (Labour) Cost
                  (2 Spread i.e 12 Welding Specialists & 4 Fitting Specialists,
                  16 Technical Specialists in all)
                </p>
              </Col>
              <Col md={6}>
                <p>
                  (2.) Per diem per day (Daily Feeding, Daily Accomomdation,
                  Milk, Soap, Daily Bottled water provision allowances). Other
                  general welfare and Quality Assurance costs
                </p>
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

export default Admin_Invoice_details;
