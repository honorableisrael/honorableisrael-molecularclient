import React, { useState, useEffect,useRef } from "react";
import { Col, Row, Container, Table, Modal,Form,Alert } from "react-bootstrap";
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
import exclam from "../../images/exclammark.png";



const Specialist_Payment_Invoice = (props) => {
  console.log(props);
  const [state, setState] = useState <any>({
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
    reason:"",
    work_order_detail: {},
    terminateWorkModal: false,
    requested_amount:"",
    errorMessage:"",
    successMessage:"",
    payment_history: [],
    cycle_id: "",
    PaymentErrorMessage: false,
    max_requested_amount:"",
    rate: 0.65
  });

  const {
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
  }: any= state;

  const onchange = (e) => {
    console.log(e.target.value);
    if (e.target.name == "requested_amount" ){
       if(e.target.value < calculateLoanableAmount()){
        return setState({
          ...state,
          [e.target.name]: e.target.value,
        });
       }
       if(e.target.value > calculateLoanableAmount()){
        return setState({
          ...state,
          [e.target.name]: calculateLoanableAmount().toFixed(2)
        });
       }
    }
  };
  const calculateLoanableAmount =() => {
    const loanableamount = (rate * max_requested_amount)
    return loanableamount
  }
  const workModal = (id, index, amount) => {
    console.log(id)
    setState({
      ...state,
      cycle_id: id,
      max_requested_amount: amount,
      requested_amount: (rate * amount)?.toFixed(2),
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
    const work_order = localStorage.getItem("Invoice_payment_details");
    const Invoice_payment_details = work_order ? JSON.parse(work_order) : "";
    console.log(props?.match?.params?.id)
    console.log(Invoice_payment_details.work_order.id)
    axios
      .all([
        axios.get(`${API}/specialist/invoices/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/specialist/work-orders/${Invoice_payment_details.work_order.id}/upfront-requests`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res2,res3) => {
          console.log(res2.data.data);
           console.log(res3.data.data);
          setState({
            ...state,
            ...res2.data.data,
            ...res3.data.data,
            payment_history:res3.data.data.data,
            work_order_detail: res2.data.data.work_order,
            invoice_details: res2.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
        
      });
  }, []);

  const requestUpfrontPayment = (cycle_id) => {
    setState({
      ...state,
      isloading: true,
    })
    console.log(cycle_id)
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data={
      amount: requested_amount
    }
    axios.post(`${API}/specialist/upfront-payments/${cycle_id}`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    })
    .then((res)=>{
      console.log(res.data)
      notify("payment requested successfully");
      setState({
        ...state,
        isloading: false,
        terminateWorkModal: false,
      })
    })
    .catch((err)=>{
      console.log(err.response)
      notify("Request failed");
      setState({
        ...state,
        isloading: false,
        errorMessage: err?.response?.data?.message,
      })
    })
  }
const toggleErrormessage=()=>{
  setState({
    ...state,
    PaymentErrorMessage: true
  })
}
const toggleErrormessageClose =()=>{
  setState({
    ...state,
    PaymentErrorMessage: false
  })
}
const fieldRef: any = useRef();
 useEffect(() => {
  if (PaymentErrorMessage && fieldRef) {
    fieldRef.current.scrollIntoView({
      behavior: "smooth"
     });
   }
 }, [PaymentErrorMessage]);


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
      <div className="terminateworkmodaltitle" >
          Request Early Payment
      </div>
      {successMessage && (
         <Alert key={2} variant="success" className="alertmessg">
            {successMessage}
         </Alert>
      )}
      {errorMessage && (
        
         <Alert key={2} variant="danger" className="alertmessg">
            {errorMessage}
         </Alert>
      )}
     <div className="splinvoicemodalmssgwrap">
       <i className="fa fa-exclamation fa-rotate-180 invoiceexclm" aria-hidden="true"></i>
       <p> The Amount on early payment is limited to {current_currency}{ FormatAmount((0.65 * max_requested_amount)?.toFixed(2))}  from this cycle. please note that an early payment fee of 5% will be charged </p>
     </div>
     {/* <div className="splinvoicemodalmssgwrap">
       <i className="fa fa-exclamation fa-rotate-180 invoiceexclm" aria-hidden="true"></i>
       <p>Early payments attracts 5% charge of your amount from this cycle. </p>
     </div>  */}
      <form>
        <Row>
           <Col md={12} className="formsection1">
             <Form.Group>
                <h6 className="userprofile userprofile12">
                    Enter Amount
                </h6>
                <Form.Control
                  type="number"
                  name="requested_amount"
                  // value={requested_amount} 
                  className="userfield"
                  onChange={onchange}
                  placeholder="Amount"
                  min={0}
                  max={0.65 * requested_amount} 
                  />
            </Form.Group>
          </Col>
        </Row>
       </form>
       <div className="wrkmodal-btnwrap">
          <span className="wrkmodal-cancelbtn" onClick={closeworkModal}>
            Cancel
          </span>
          <span className="profcertbtn upfrmodalbtn" onClick={()=>requestUpfrontPayment(cycle_id)}>
            {!isloading ? "Send Request" : "Requesting..."}
          </span> 
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
        <Row className="dshworksectnrow1" ref={fieldRef}>
          <Col md={11} className="job34" >
            <div className="title_wo payinvoicetitle">
              <div className="workorderheader">
                <Link to="/specialistWorkOrderDetails">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                View Payment
              </div>
            </div>
            {PaymentErrorMessage && (
              <div className="wrktimelinediv">
                <img src={exclam} alt="img"/>
                <p>sorry you cannot make an Early payment request now</p>
                <div className="terminateworkmodalimg" onClick={toggleErrormessageClose}>
                  <i className="fa fa-times"></i>
                </div>
              </div>
             )}
            <div className="spltpaybreakdwnwrapper">
              <div className="spltpaybreakdwn-logowrap">
                <div>
                  <p className="brkdwn">Breakdown ID</p>
                  <p className="brkdwn-id">{invoice_details?.number}</p>
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
                  <p className="brkdwn-id">{formatTime(work_order_detail.start_date)}</p>
                </div>
              </div>
              <div>
                <Table hover>
                  <thead className="splinvoitablehead">
                    <tr>
                      <th>Cycle</th>
                      <th>Payment Reference</th>
                      <th>Amount</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice_details?.cycles?.map((data, index)=>(
                   <tr key={index}>
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
                    {data.status == "Not Due" &&(
                      <div className="invpaystatwrap pendinwrap">
                      <span className="paystatindcator pendininvoice"></span>
                      <span className="paystattext pendininvtext">Not Due</span>
                    </div>
                    )}
                    {data.status == "Outstanding" &&(
                      <div className="invpaystatwrap pendinwrap">
                      <span className="paystatindcator pendininvoice"></span>
                      <span className="paystattext pendininvtext">Outstanding</span>
                    </div>
                    )}
                   </td> 
                   <td>{formatTime(data.date)}</td>
                   <td>
                       {data.can_make_upfront == true &&(
                        <span className="upfrontbtn" onClick={()=>workModal(data.id, index,data.amount)}>
                          Request Early Payment
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
            <div className="upfnthistoryheader">
                Early Payment History
            </div>
            <div className="spltpaybreakdwnwrapper">
              <div>
                <Table hover>
                  <thead className="splinvoitablehead">
                    <tr>
                      <th>S/N</th>
                      <th> Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_history?.map((data, index)=>(
                   <tr key={index}>
                    <td>{index + 1}</td>
                   <td>
                      {current_currency}
                      {FormatAmount(data.amount)}
                    </td>
                   <td> 
                   {data.status == "Paid" && (
                     <div>
                       <span className="historypaystattext paidinvtxt">Paid</span>
                     </div>
                    )}
                    {data.status == "Unpaid" &&(
                     <div>
                      <span className="historypaystattext pendininvtext">Pending</span>
                    </div>
                    )}
                    {data.status == "Declined" &&(
                     <div>
                      <span className="historypaystattext terminainvtxt">Declined</span>
                    </div>
                    )}
                   </td>
                   <td>{formatTime(data.created_at)}</td>
                  </tr>
                    ))} 
                  </tbody>
                </Table>
              </div>
            </div>
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
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default Specialist_Payment_Invoice;
