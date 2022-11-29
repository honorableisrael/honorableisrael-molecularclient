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
import { API, current_currency, FormatAmount, formatTime, notify, returnAdminToken } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminWorkOrderEvaluationStep3 = (props) => {
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
    allbanks:[],
    bank:""
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
  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_?JSON.parse(invoice_):""
    const token = returnAdminToken()
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/invoices/${invoice?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/bank-accounts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        
      ])
      .then(
        axios.spread((res, res2,res3) => {
          console.log(res2.data.data);
          setState({
            ...state,
            ...res.data.data,
            work_order_detail: res.data.data,
            invoice_details: res2.data.data,
            allbanks:res3.data.data,
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
    const token = returnAdminToken()
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      // bank,
    }
    // if(bank==""){
    //   window.scrollTo(0,0)
    //   setState({
    //     ...state,
    //     isloading: false,
    //   });
    //   // return notify("Please select a bank account for this proforma invoice")
    // }
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/invoice/send`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/invoice/bank`,
          data,
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
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };

  const sendBankDetails = () => {
    const token = returnAdminToken()
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      bank,
    }
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/invoice/bank`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("bank added to work order");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        notify("failed to add bank to work order");
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
    bank,
    reason,
    isloading,
    start_date,
    allbanks,
    invoice_details,
    show,
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
                      {/* <Col md={12} className="mm12">
                        <h6>Bank Account Details</h6>
                        <select
                          className="forminput formselect form-control"
                          required
                          name="bank"
                          onChange={onchange}
                          // onBlur={sendBankDetails}
                        >
                          <option value="" className="formselect">
                            Select account number
                          </option>
                         {allbanks?.map((data,i)=>(
                           <option value={data.id}> {data.account_number} &nbsp; {data.account_name}  &nbsp;{data.account_name} &nbsp;{data.bank}</option>
                         ))
                         }
                        </select>
                      </Col> */}
                      <Col md={12} className="plf">
                        <div className="">
                          {/* <div className="box_inv outerpink">
                            <span className="box_smalltick smalltickpink"></span>
                            {props?.payment_details?.total_amount_paid > 0?"Paid":"Unpaid"}
                          </div> */}
                          <div className="boxwrapper__1">
                            <div className="lcomponent">
                              <div className="inv_title">
                                Invoice : {invoice_details.reference}
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">
                                  {" "}
                                  Invoice Number
                                </div>
                                <div className="inv_title4">
                                  {invoice_details?.number ?? "~~/~~"}
                                </div>
                              </div>
                              <div className="inv_title2">
                                <div className="inv_title3">Invoice Date</div>
                                <div className="inv_title4">
                                  {formatTime(invoice_details?.created_at) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className="rcomponent">
                              <img src={logo} alt="" className="Simage" />
                              <div className="Stext2">
                               {invoice_details.company_address}
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
                                <div className="inv_title4 ing">{current_currency}{FormatAmount(invoice_details?.total_amount)?? "~~/~~"}</div>
                                <div className="inv_title3">Amount Paid</div>
                                <div className="inv_title4 ing">{current_currency}{FormatAmount(invoice_details?.total_amount_paid)?? "~~/~~"}</div>
                              </div>
                            </div>
                            <div className="rcomponent">
                              <div className="inv_title2">
                                <div className="inv_title3">Balance Due</div>
                                <div className="inv_title4 ing">{current_currency}{FormatAmount(invoice_details?.total_amount_unpaid)?? "~~/~~"}</div>
                              </div>
                            </div>
                          </div>
                          <div className="ing_11">
                            {/* <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                  <th className="tablehead">
                                    Number of Joints
                                  </th>
                                  <th className="tablehead">Pipe Size</th>
                                  <th className="tablehead">Pipeline Length</th>
                                  <th className="tablehead">PipeSchedule</th>
                                </tr>
                              </thead>
                              <tbody>
                                {work_order_detail?.pipe_configs?.map(
                                  (data, i) => (
                                    <tr className="tdata">
                                      <td>{data?.joints}</td>
                                      <td>{data?.length}</td>
                                      <td>{data?.size}</td>
                                      <td>{data?.pipe_schedule}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table> */}
                            <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                  <th className="tablehead">
                                    Specialist Skill
                                  </th>
                                  <th className="tablehead">
                                    Number of Specialist
                                  </th>

                                  <th className="tablehead">Total Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                                {work_order_detail?.specialist_requests?.map(
                                  (data, i) => (
                                    <tr className="tdata">
                                      <td>{data?.skill}</td>
                                      <td>{data?.number}</td>
                                      <td>
                                        <b> {current_currency}{FormatAmount(data?.total_cost)}</b>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                            <div className="ing_11">
                            <Table responsive>
                              <thead className="theadinvoice">
                                <tr>
                                  <th className="tablehead">Specialist Cost({current_currency})</th>
                                  <th className="tablehead">Date</th>
                                  <th className="tablehead">Status</th>
                                  <th className="tablehead">Cycle</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.cycles?.map(
                                  (data, i) => (
                                    <tr className="tdata" key={i}>
                                       <td>{FormatAmount(data?.amount)}</td>
                                      <td>{formatTime(data?.date)}</td>
                                      <td>{data?.status}</td>
                                      <td>{data?.cycle}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                            <div className="text-right mgg2"></div>
                          </div>
                            <div className="text-right mgg2"></div>
                          </div>
                        </div>
                        <div className="allpayment00">
                          {/* <div className="allpayment1">
                            All payments go to any of the account details below
                          </div>
                          {invoice_details?.bank_account?.map((data, i) => (
                            <div className="fbn1">
                              <div className="bnclass">{data.bank}</div>
                              <div className="bnclass">{data.account_number}</div>
                              <div className="bnclass">
                                {data.account_name}
                              </div>
                            </div>
                          ))} */}
                        </div>
                      </Col>
                      <div className="nxtbck">
                        <Link to="/admin_evaluation_step2">
                          {" "}
                          <div className="gent122 gent1221">Back</div>
                        </Link>{" "}
                        <div
                          className="gent122 gent12212"
                          onClick={sendInvoice}
                        >
                          {isloading
                            ? "processing"
                            : "Send Invoice and Proceed"}
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
