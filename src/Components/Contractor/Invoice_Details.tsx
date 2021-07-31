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
  notify,
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin_Invoice_details = (props) => {
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
    reason: "",
    isloading: false,
    work_order_detail: {},
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
  const openModal = () => {
    setState({
      ...state,
      show: true,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    console.log(props);
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
      ])
      .then(
        axios.spread((res2) => {
          console.log(res2.data.data);
          setState({
            ...state,
            work_order_detail: res2.data.data.work_order,
            invoice_details: res2.data.data,
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
          setTimeout(()=>{
            props.history.push("/proforma_invoice_accepted")
          },2000)
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
    invoice_details,
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
        className="mdl12_ mdl2"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
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
            <Col md={12} className="terminate2">
              <div
                className="terminate1"
                onClick={() =>
                  setState({
                    ...state,
                    show: false,
                  })
                }
              >
                {"Cancel"}
              </div>
              <Button className="greenbtn2 btn-success" onClick={(e) => AcceptInvoice()}>
                {isloading ? "Processing" : "Ok"}
              </Button>
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
                <Link to="/payment_invoice">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>{" "}
                &nbsp; Invoice Details
              </div>
            </div>
            <Row className="mgtop mgzero">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12 overviewflex-down">
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
                            {invoice_details?.total_amount_paid > 0
                              ? "Paid"
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
                              <div className="Stext2">
                                {invoice_details?.company_address ?? "n/a"}
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
                            <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                  <th className="tablehead">Specialist Cost</th>
                                  <th className="tablehead">Date</th>
                                  <th className="tablehead">Status</th>
                                  <th className="tablehead">Cycle</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.cycles?.map((data, i) => (
                                  <tr className="tdata" key={i}>
                                    <td>
                                    {current_currency}{FormatAmount(data?.specialist_cost)}
                                    </td>
                                    <td>{formatTime(data?.date)}</td>
                                    <td>{data?.status}</td>
                                    <td>{data?.cycle}</td>
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
                        <div className="proformer_Invoc">
                          {invoice_details.is_approved == false && (
                            <Button onClick={openModal}>Accept Proforma Invoice</Button>
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
