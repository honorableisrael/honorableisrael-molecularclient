import React, { useEffect, useState }  from "react";
import DashboardNav from "./specialistNavbar";
import { Row, Col, Container,Pagination } from "react-bootstrap";
import { Helmet } from "react-helmet";
import payslip from "../../images/payslip.png";
import SplPaymentCards from "./specialistPaymentCards";
import { API } from "../../config";
import axios from "axios";


const Payments = () => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    all_invoices: [],
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
  });

  useEffect(() => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    axios
      .all([
        axios.get(`${API}/specialist/invoices?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data);
          setState({
            ...state,
            all_invoices: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const nextPage = (x) => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    axios
      .all([
        axios.get(`${x}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          window.scrollTo(-0, -0);
          setState({
            ...state,
            all_invoices: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    all_invoices,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  } = state;

  return (
    <div>
      {/* <Container fluid={true}> */}
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialist Payment</title>
          <link />
        </Helmet> */}
        {/* <Row>
          <DashboardNav/>
        </Row> */}
        {/* <Row className="dshworksectnrow1"> */}
          <div className="job34">
            {/* <div className="title_wo">
              <div className="workorderheader">
                Payment
              </div>
            </div> */}
            {/* <Row> */}
              {all_invoices?.length == 0  && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={payslip}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no Outstanding Payment</div>
                </Col>
              )}
               {all_invoices?.map((data, i)=>(
                <SplPaymentCards
                key={i}
                  title="Pipeline construction from Lagos to Ogun State"
                  payment_details={data}
                  status="Payment Breakdown"
                  />
               ))}
                <div className="active_member2">
                  <div>
                    Displaying <b>{current_page}</b> of <b>{last_page}</b>
                  </div>
                  <Pagination>
                    <Pagination.First onClick={() => nextPage(first)} />
                    <Pagination.Prev onClick={() => nextPage(prev)} />
                    <Pagination.Next onClick={() => nextPage(next)} />
                    <Pagination.Last onClick={() => nextPage(last)} />
                  </Pagination>
                </div>
            {/* </Row> */}
          </div>
        {/* </Row>
      </Container> */}
    </div>
  );
};
export default Payments;
