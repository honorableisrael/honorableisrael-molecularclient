import React, { useState, useEffect } from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/dashbdlogo.png";
import { API, FormatAmount, formatTime, notify, specialistToken } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



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
    work_order_detail: {},
  });

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
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    start_date,
    hour
  }: any= state;
  return (
    <>
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
                  <p className="brkdwn-id">{invoice_details.total_amount_paid}</p>
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
                      <th>Invoice Number</th>
                      <th>Amount</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice_details?.cycles?.map((data, i)=>(
                   <tr>
                   <td>{data.number}</td>
                   <td>{data.amount}.</td>
                   <td> {data.amount_paid} </td>
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
                      <span className="paystattext pendininvtext">pending</span>
                    </div>
                    )}
                   </td> 
                   <td>{data.date}</td>
                  </tr>
                    ))} 
                    {/* <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap">
                          <span className="paystatindcator"></span>
                          <span className="paystattext">paid</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap pendinwrap">
                          <span className="paystatindcator pendininvoice"></span>
                          <span className="paystattext pendininvtext">pending</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr>
                    <tr>
                      <td>1233127567812</td>
                      <td>N33,329</td>
                      <td>
                        <div className="invpaystatwrap pendinwrap">
                          <span className="paystatindcator pendininvoice"></span>
                          <span className="paystattext pendininvtext">pending</span>
                        </div>
                      </td>
                      <td>23-04-2021</td>
                    </tr> */}
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
