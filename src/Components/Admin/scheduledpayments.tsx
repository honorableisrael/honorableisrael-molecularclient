import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Modal,
  Card,
  Pagination,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import blueavatar from "../../images/group2.png";
import Accordions from "../Widgets/Accordion";
import axios from "axios";
import {
  API,
  current_currency,
  FormatAmount,
  MID,
  notify,
  returnAdminToken,
} from "../../config";
import { ToastContainer } from "react-toastify";

declare global {
  interface Window {
    initPayment: any;
  }
}

const ScheduledPayments = withRouter((props) => {
  const [state, setState] = useState<any>({
    overview: true,
    deployedspecialist: false,
    user_details: "",
    active: false,
    thirdtab: false,
    chevron: "",
    selectedspecialist: [],
    work_order_detail: {},
    workDetails: {},
    isloading: false,
    total_amount: "",
    id: "",
    ungrouped: false,
    grouped: false,
    allUngrouped: [],
    ScheduledList: [],
    AllgroupedSpecialist: [],
    show: false,
    group_name: "",
    group_description: "",
    group_id: "",
    next_page: "",
    prev_page: "",
    current: "",
    next: "",
    prev: "",
    type: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
  const {
    overview,
    deployedspecialist,
    selectedspecialist,
    AllgroupedSpecialist,
    group_id,
    ScheduledList,
    work_order_detail,
    allUngrouped,
    isloading,
    type,
    id,
    show,
    show2,
    ungrouped,
    user_details,
    total_amount,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  }: any = state;

  const onchange = (e) => {
    
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const refresh_all = () => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            work_order_detail: res.data.data,
            isloading: false,
          });
          
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    get_all();
  }, []);

  const get_all = () => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/admin/payment-schedules?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            ScheduledList: res.data.data?.data,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const get_paid = () => {
    
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/payment-schedules`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            ScheduledList: res.data.data.data,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        setState({
          ...state,
          isloading: false,
        });
      });
  };

  const get_un_paid = () => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/scheduled-payments?paginate=1&filter=pending`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            ScheduledList: res.data.data.data,
            isloading: false,
          });
          
        })
      )
      .catch((err) => {
        
        setState({
          ...state,
          isloading: false,
        });
      });
  };

  const nextPage = (a) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      overview: a == "overview" ? true : false,
      grouped: a == "grouped" ? true : false,
      ungrouped: a == "ungrouped" ? true : false,
    });
    axios
      .all([
        axios.get(`${a}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          window.scrollTo(-0, -0);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            ScheduledList: res.data.data.data,
          });
        })
      )
      .catch((err) => {
        
      });
  };
  const openModal = (id, user_data, type) => {
    
    setState({
      ...state,
      show: true,
      id: id,
      user_details: user_data,
      type,
    });
  };
  const openModal2 = () => {
    setState({
      ...state,
      show2: true,
    });
  };
  const initialize_payment = () => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = returnAdminToken();
    axios
      .post(
        `${API}/admin/payment-schedules/${id}/pay`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        
        setState({
          ...state,
          isloading: false,
        });
        notify("Payment Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        notify(err?.response?.data?.message, "D");
      });
  };

  const process_payment = (id) => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = returnAdminToken();
    axios
      .post(
        `${API}/admin/payment-schedules/${id}/process`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        
        setState({
          ...state,
          isloading: false,
        });
        notify(" Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        notify(err?.response?.data?.message, "D");
      });
  };


  const make_batch_payment = () => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const data = {
      payments: selectedspecialist,
    };
    
    axios
      .post(`${API}/admin/scheduled-payments/pay`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        
        setState({
          ...state,
          isloading: false,
        });
        notify("Payment Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        notify("Failed to make payment", "D");
      });
  };
  const query_payment = (id) => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .post(
        `${API}/admin/payment-schedules/${id}/process`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        
        setState({
          ...state,
          isloading: false,
        });
        notify("Successful");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        notify("Failed to make payment", "D");
      });
  };
  const sendSpecialistId = (id: any, cost) => {
    const add_new: any = [id];
    const old_array = state.selectedspecialist;
    const index = old_array.indexOf(id);
    if (index > -1) {
      old_array.splice(index, 1);
      return setState({
        ...state,
        selectedspecialist: [...old_array],
        total_amount: (Number(total_amount) - Number(cost)).toFixed(2),
      });
    }
    setState({
      ...state,
      selectedspecialist: [...state.selectedspecialist, ...add_new],
      total_amount: (Number(total_amount) + Number(cost)).toFixed(2),
    });
  };
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>MolecularPro - Scheduled Payments</title>
        <link />
      </Helmet>
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
        className='mdl12c'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            {type == "makepayment" && "Confirm Payment"}
            {type == "processpayment" && "Confirm Payment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>Please confirm </h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <Button
                className='btn-success succinline'
                onClick={() => {
                  setState({
                    ...state,
                    show2: false,
                  });
                }}>
                Cancel
              </Button>
              {type == "makepayment" && (
                <div className='' onClick={initialize_payment}>
                  <Button className='btn-success primary3'>
                    {isloading ? "Processing" : "Confirm"}
                  </Button>
                </div>
              )}
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
        className='mdl12c'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Batch Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6 className='text-center'>
                Please confirm payment of {selectedspecialist?.length} selected
                specialists
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <Button
                className='btn-success succinline'
                onClick={() => {
                  setState({
                    ...state,
                    show2: false,
                  });
                }}>
                Cancel
              </Button>
              <div className='' onClick={make_batch_payment}>
                <Button className='btn-success primary3'>
                  {isloading ? "Processing" : "Make Payment"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <DashboardNav />
      <Container fluid>
        <Row className='depsplstrow'>
          <Col md={12}>
            <div className='dpsplsttabs'>
              {/* <div
                onClick={() => get_all("overview")}
                className={overview ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div> */}
              {/* <div
                onClick={() => get_ungrouped("ungrouped")}
                className={ungrouped ? "inprogress tab_active" : "inprogress"}
              >
                Ungrouped
              </div>
              <div
                onClick={() => get_grouped("grouped")}
                className={grouped ? "inprogress tab_active" : "inprogress"}
              >
                Grouped
              </div> */}
            </div>
            {isloading && <Spinner animation={"grow"} />}
            <div className='ddeplsmni1'>
              {overview && (
                <div>
                  <div className='deploysplstheader deployflex'>
                    <div className='flxf1'>
                      <div className='depsplstimg'>
                        <img src={blueavatar} alt='img' />
                      </div>
                      <p>Scheduled Payments</p>
                    </div>
                    <div>
                      {/* <div className='Filter'>
                        <select
                          name=''
                          id=''
                          onChange={(e) => {
                            if (e.target.value == "paid") {
                              get_paid();
                            }
                            if (e.target.value == "unpaid") {
                              get_un_paid();
                            }
                            if (e.target.value == "all") {
                              get_all();
                            }
                          }}>
                          <option onChange={get_all} value='all'>
                            All
                          </option>
                          <option onChange={get_paid} value='paid'>
                            Paid
                          </option>
                          <option onChange={get_un_paid} value='unpaid'>
                            Unpaid
                          </option>
                        </select>
                      </div> */}
                    </div>
                  </div>
                  <div className='deployedsplsttable'>
                    <Table hover responsive className='schedule_payment_table'>
                      <thead>
                        <tr>
                          <th scope='col'>Title</th>
                          <th scope='col'>Amount({current_currency})</th>
                          <th scope='col'>No of Specialist</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Description</th>

                          <th scope='col'>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ScheduledList?.map((data: any, i) => (
                          <tr key={i}>
                            <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                              <div className='dplsplusernmeimg'>
                                {/* <span></span> */}
                                &nbsp; &nbsp;
                                <div>
                                  <Link to={`/scheduled_payments_details/${data.id}`}>
                                    {data.title}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className='contractorname'>
                              <Link to={`/scheduled_payments/${data.id}`}>
                                {FormatAmount(data?.total_amount)}
                              </Link>
                            </td>
                            <td>{data?.transaction_count}</td>
                            <td>
                              {data?.status == "unprocessed" ? (
                                <span className='redbg'>
                                  <Link to={`/scheduled_payments/${data.id}`}>
                                    Unprocessed
                                  </Link>
                                </span>
                              ) : (
                                <span className='greenbgbatch'>
                                  {data.status}
                                </span>
                              )}
                            </td>{" "}
                            <td>{data?.category}</td>
                            <td>{data?.description}</td>
                            <td>
                              {data?.actions?.can_pay && (
                                <Button
                                  onClick={() =>
                                    openModal(data.id, data, "makepayment")
                                  }
                                  className='payspecialist1'>
                                  Make Payment
                                </Button>
                              )}
                              {data?.actions?.can_process && (
                                <Button
                                  onClick={() =>
                                    process_payment(data?.id)
                                  }
                                  className='payspecialist1'>
                                  Process
                                </Button>
                              )}
                              {data?.actions?.can_query && (
                                <Button
                                  onClick={() => query_payment(data.id)}
                                  className='payspecialist1'>
                                  View
                                </Button>
                              )}
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
                    {overview && (
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
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName='bg-danger text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-info text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default ScheduledPayments;
