import React, { useState, useEffect } from "react";
import { Col, Row, Container, Table, Modal,Form } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/dashbdlogo.png";
import { API, FormatAmount, formatTime, notify, specialistToken,current_currency } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import closeimg from "../../images/closeimg.png";




const Specialist_Payment_Invoice = (props) => {
  console.log(props)
  const [state, setState] = useState({
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
    reason:"",
    work_order_detail: {},
    terminateWorkModal: false,
  });

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_?JSON.parse(invoice_):""
    const token = specialistToken()
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/specialist/invoices/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res2) => {
          console.log(res2.data.data);
          setState({
            ...state,
            ...res2.data.data,
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
        console.log(err.response);
      });
  }, []);
  const {
    project_purpose,
    work_order_detail,
    invoice_details,
    country,
    terminateWorkModal,
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    start_date,
    hour,
    reason,
  }: any= state;
  return (
    <>
       <Modal
                      centered={true}
                      onHide={closeworkModal}
                      show={terminateWorkModal}
                    >
                      <div className="terminateworkmodalwrap">
                        <div className="terminateworkmodalimg">
                          <img
                            src={closeimg}
                            alt="close"
                            onClick={closeworkModal}
                          />
                        </div>
                        <div
                         className="terminateworkmodaltitle" >
                          Request Upfront Payment
                        </div>
                        <form>
                          <textarea
                            name="reason"
                            value={reason}
                            onChange={onchange}
                            className="form-control wrkmodaltextarea"
                            placeholder="Reason"
                            rows={5}
                            cols={5}
                          ></textarea>
                        </form>
                        <div className="wrkmodal-btnwrap">
                          <span
                            className="wrkmodal-cancelbtn"
                            onClick={closeworkModal}
                          >
                            Cancel
                          </span>
                          <span className="profcertbtn upfrmodalbtn">Send</span>
                        </div>
                      </div>
                    </Modal>
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
                  <p className="brkdwn-id">  {invoice_details?.number }</p>
                </div>
                <div>
                  <img src={logo} alt="molecular-logo" />
                </div>
              </div>
              <p className="spltpaybreakdwn-title">
              {work_order_detail.title}
              </p>
              <div className="spltpaybreakdwn-details">
                <div>
                  <p className="brkdwn detptg">Total Payment Cylcle</p>
                  <p className="brkdwn-id">{invoice_details.total_cycles}</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Paid Invoices</p>
                  <p className="brkdwn-id">{current_currency}{invoice_details.total_amount_paid}</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Project Duration</p>
                  <p className="brkdwn-id">{work_order_detail.duration}</p>
                </div>
                <div>
                  <p className="brkdwn detptg">Start Date</p>
                  <p className="brkdwn-id">{work_order_detail.start_date}</p>
                </div>
              </div>
              <div>
                <Table hover>
                  <thead className="splinvoitablehead">
                    <tr>
                      <th>Cycle</th>
                      <th>Invoice Number</th>
                      <th>Amount</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice_details?.cycles?.map((data, i)=>(
                   <tr>
                    <td>{data.cycle}</td>
                   <td>
                   {data.number}
                   </td>
                   <td>
                      {current_currency}
                      {FormatAmount(data.amount)}
                    </td>
                   <td> 
                   {current_currency}
                   {FormatAmount(data.amount_paid)} 
                   </td>
                   <td>
                     {data.status == "Paid" && (
                       <div className="invpaystatwrap">
                       <span className="paystatindcator"></span>
                       <span className="paystattext">paid</span>
                     </div>
                    )}
                    {data.status == "Unpaid" &&(
                      <div className="invpaystatwrap pendinwrap">
                      <span className="paystatindcator pendininvoice"></span>
                      <span className="paystattext pendininvtext">Unpaid</span>
                    </div>
                    )}
                   </td> 
                   <td>{formatTime(data.date)}</td>
                   <td><span className="upfrontbtn" onClick={workModal}>Payment Request</span></td>
                  </tr>
                    ))} 
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
