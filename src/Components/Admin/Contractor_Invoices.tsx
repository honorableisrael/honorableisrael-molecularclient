import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, Pagination, Table } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import nextbtn from "../../images/nextbtn.png";
import PaymentCards_1 from "./PaymentCards_1";
import axios from "axios";
import { returnAdminToken, API, FormatAmount, formatTime } from "../../config";

const Contractor_Invoices = (props) => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    all_invoices: [],
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    filter: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    show_date: false,
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
  const onchange = (e) => {
    
    setState({
      ...state,
      [e.target.id]: e.target.value,
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

  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
      });
    }
  };
  useEffect(() => {
    getInvoices(`${API}/admin/contractors/${props.match.params.id}/invoices`);
  }, []);
  const getInvoices = (endpoint) => {
    const token = returnAdminToken();
    axios
      .all([
        axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          // 
          setState({
            ...state,
            all_invoices: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            show_date: false,
          });
        })
      )
      .catch((err) => {
        
      });
  };
  const nextPage = (x) => {
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${x}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
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
        
      });
  };
  const {
    inprogress,
    show_date,
    past,
    all_invoices,
    country,
    work_order_description,
    order_title,
    end_date,
    filter,
    start_date,
    hour,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  } = state;
  
  
  return (
    <>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Admin Invoice</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='rowt3'>
          <Col md={11} className='job34'>
            <div className='title_wo'>
              <div className='workorderheader wtitle2 porderheader'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>
                Contractor Invoices
              </div>
            </div>
            <div className='intab flexx2 justify-between'>
              <div
                onClick={() => switchTab("firsttab")}
                className={inprogress ? "inprogress tab_active" : "inprogress"}>
                All
              </div>
              <div className='dropdown1'>
                <button
                  className='dropbtn molecular-text'
                  onClick={() => {
                    setState({
                      ...state,
                      show_date: !show_date ? true : false,
                    });
                  }}>
                  <i className='fa fa-caret-down'></i>Filter by Month
                </button>
                {show_date && (
                  <div className='dropdown1-content'>
                    <span className='dark-text linkitem flexx2'>
                      <input
                        type='month'
                        value={filter}
                        onChange={onchange}
                        id='filter'
                        className='filter form-control'
                      />{" "}
                      <button
                        className='sendbtn'
                        onClick={() =>
                          getInvoices(
                            `${API}/admin/contractors/${props.match.params.id}/invoices?date=${filter}`
                          )
                        }>
                        Send
                      </button>
                    </span>
                  </div>
                )}
              </div>{" "}
            </div>
            <Row>
              {/* <Col md={12} className='plf'>
                <div className='cardflex_jo'>
                  {all_invoices?.map((data, i) => (
                    <PaymentCards_1
                      title='P'
                      payment_details={data}
                      status={true}
                    />
                  ))}
                  {all_invoices?.length == 0 && (
                    <Col md={11} className='containerforemptyorder1'>
                      <div className='containerforemptyorder'>
                        <img
                          src={no_work_order}
                          alt={"no_work_order"}
                          className='no_work_order'
                        />
                      </div>
                      <div className='no_work1'>invoice data is empty</div>
                    </Col>
                  )}
                </div>
                <div className='active_member2'>
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
              </Col> */}
              <div className='deployedsplsttable'>
                <Table hover responsive className='schedule_payment_table'>
                  <thead>
                    <tr>
                      <th scope='col'>Date</th>
                      <th scope='col'>Work order</th>
                      <th scope='col'>Reference</th>
                      <th scope='col'>Amount(NGN)</th>
                      {/* <th scope='col'>Amount paid</th>
                      <th scope='col'>Amount unpaid</th> */}
                      <th scope='col'>Cycles</th>
                      <th scope='col'>Exchange rate</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {all_invoices?.map((data: any, i) => (
                      <tr key={i}>
                        <td>{formatTime(data?.created_at)}</td>
                        <td>
                          <Link
                            to={`/admin_work_details/${data.work_order?.id}?inreview=true`}>
                            {data?.work_order?.title}{" "}
                          </Link>
                        </td>
                        <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                          <div className='dplsplusernmeimg'>
                            {/* <span></span> */}
                            &nbsp; &nbsp;
                            <div>
                              <Link
                                to={`/admin_invoice_details/${data?.id}/${data?.work_order?.id}`}>
                                {data.reference}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className='contractorname'>
                          {FormatAmount(data?.total_amount)}
                        </td>
                        {/* <td>{FormatAmount(data?.total_amount_paid)}</td>
                        <td>{FormatAmount(data?.total_amount_unpaid)}</td> */}
                        <td>{data?.total_cycles} </td>
                        {/* <td>
                          {data?.transaction_status == "unpaid" && (
                            <span className='greenbgbatch'>
                              {data?.transaction_status}
                            </span>
                          )}
                          {data?.transaction_status == "no account" && (
                            <span className='redbg'>
                              {data?.transaction_status}
                            </span>
                          )}
                        </td> */}
                        <td>{data?.work_order?.exchange_rate}</td>
                        <td>
                          <Link
                            to={`/admin_invoice_details_view_only/${data?.id}/${data?.work_order?.id}`}>
                            {" "}
                            View
                          </Link>
                        </td>
                        {/* <td>
                              {data?.actions?.can_pay && (
                                <Button
                                  onClick={() => openModal(data.id,data)}
                                  className="payspecialist1"
                                >
                                  Process
                                </Button>
                              )}
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {all_invoices && (
                  <div className='active_member2'>
                    <div>
                      Displaying <b>{current_page}</b> of <b>{last_page}</b>
                    </div>
                    <Pagination>
                      {first && (
                        <Pagination.First onClick={() => nextPage(first)} />
                      )}
                      {prev && (
                        <Pagination.Prev onClick={() => nextPage(prev)} />
                      )}
                      {next && (
                        <Pagination.Next onClick={() => nextPage(next)} />
                      )}

                      {last && (
                        <Pagination.Last onClick={() => nextPage(last)} />
                      )}
                    </Pagination>
                  </div>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contractor_Invoices;
