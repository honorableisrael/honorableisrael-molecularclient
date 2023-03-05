import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Button,
  Spinner,
  Card,
  Table,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import WorkDetails_Form_Preview from "./workdetailsform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import no_work_order from "../../images/document 1.png";
import axios from "axios";
import chevrondown from "../../images/chevrondown.png";
import {
  API,
  capitalize,
  checkIfIsOdd,
  current_currency,
  FormatAmount,
  formatTime,
  notify,
  returnAdminToken,
  refreshpage,
} from "../../config";
import { NavHashLink } from "react-router-hash-link";
import Accordion_Work_order from "./Accordion_workorder_details";

const Play = () => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        fill='white'
        viewBox='0 0 26 26'>
        <polygon
          className='play-btn__svg'
          points='9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69'
        />
        <path
          className='play-btn__svg'
          d='M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z'
        />
      </svg>
    </>
  );
};
const Stop = () => {
  return (
    <>
      <div className='stop3'></div>
    </>
  );
};
const Work_Details = (props: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron: active1 === "active" ? "" : "arrowflip",
    });
  };
  const {
    work_order_detail,
    show,
    inreview,
    active,
    active1,
    collapseHeight,
    chevron,
    chevron1,
    isloading,
  } = state;
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>
                {props?.group_data?.total_members} Work Details
              </span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <WorkDetails_Form_Preview
            order_detail={props.work_order_detailz}
            hide={true}
          />
        </>
      </div>
    </>
  );
};
const Work_Sheet = withRouter((props: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: [],
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron: active1 === "active" ? "" : "arrowflip",
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(`${API}/admin/work-orders/${props.match.params.id}/worksheets`, {
        headers: { Authorization: `Bearer ${returnAdminToken().access_token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          work_sheet: res.data.data.data,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        console.log(err);
      });
  }, []);

  const sendToContractor = (id) => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/admin/work-orders/worksheets/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        notify("Successfully sent worksheet to contractor");
        console.log(res.data.data);
        refreshpage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("failed to send worksheet to contractor");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const { active1, collapseHeight, chevron, work_sheet, isloading } = state;
  console.log(work_sheet, "work_sheet");
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>Work Sheets</span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <div className='worksheet_1'>
            <Table hover responsive className='schedule_payment_table'>
              <thead>
                <tr>
                  <th scope='col pl-2'>Reference</th>
                  <th scope='col'>Start</th>
                  <th scope='col'>End Date</th>

                  <th scope='col'>Description</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {work_sheet.map((data: any, i) => (
                  <tr key={i}>
                    <td>{data?.reference}</td>
                    <td>{formatTime(data?.start_date)}</td>
                    <td> {formatTime(data?.end_date)}</td>
                    <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                      <div className='dplsplusernmeimg'>
                        <div>{data?.description}</div>
                      </div>
                    </td>
                    <td className='contractorname'>{data?.status}</td>
                    <td>
                      <Link
                        to={`/admin_worksheet/${data?.id}/${props.match.params.id}`}>
                        {" "}
                        <Button className='btn-secondary'>View more</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {work_sheet?.length == 0 && (
              <Col md={11} className='containerforemptyorder1 cust20'>
                <div className='containerforemptyorder'>
                  <img
                    src={no_work_order}
                    alt={"no_work_order"}
                    className='no_work_order'
                  />
                </div>
                <div className='no_work1'>worksheet has not been sent</div>
              </Col>
            )}
          </div>
        </>
      </div>
    </>
  );
});
const Upfront_payment = (props: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    upfront: [],
    work_id: "",
    reason: "",
    show: false,
    id: "",
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron1: active1 === "active" ? "" : "arrowflip1",
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(
        `${API}/admin/work-orders/${work_order_details?.id}/upfront-requests`,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          upfront: res.data.data.data,
          work_id: work_order_details.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const approveUpfrontRequest = (id) => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/admin/work-orders/${work_id}/upfront-requests/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        notify("Successfully approved early payment request");
        console.log(res.data.data);
        refreshpage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("failed");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const openModal = (id) => {
    setState({
      ...state,
      show: true,
      id,
    });
  };

  const declineUpfrontRequest = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      reason,
    };
    axios
      .post(
        `${API}/admin/work-orders/${work_id}/upfront-requests/${id}/decline`,
        data,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        notify("Successfully declined early payment request");
        console.log(res.data.data);
        refreshpage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("failed to decline early payment request");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const {
    active1,
    collapseHeight,
    chevron,
    upfront,
    isloading,
    work_id,
    reason,
    show,
    id,
  } = state;
  return (
    <>
      <Modal
        size='lg'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Reject
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
                  className='form-control reason12 reason122'
                  placeholder='Please leave a message'></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <div
                className='terminate1'
                onClick={(e) => declineUpfrontRequest()}>
                {isloading ? "Rejecting" : "Reject"}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>Early Payment Request</span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down1 ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <div className='worksheet_1'>
            {upfront.map((data: any, i) => (
              <div className='tabledata tablecontent tablecont1'>
                <div className='header_12 tablecont0'>
                  <span>{data.specialist}</span>
                  <div className='lightgray'>{data.created}</div>
                </div>
                <div className='tablecont1'>
                  <div className='worksheetdw worksheetdate1'> </div>
                  <div className='upby awaiting9'>
                    {current_currency}
                    {FormatAmount(data.amount)}
                  </div>
                  <div className='upby awaiting9'>
                    {" "}
                    <div>{data.approved ? "Approved" : ""}</div>
                  </div>
                  <div className='upby accrjct'>
                    {data.status == "Paid" ? (
                      "Paid"
                    ) : data.status == "Declined" ? (
                      "Declined"
                    ) : (
                      <>
                        <span
                          className='raise_inv'
                          onClick={() => approveUpfrontRequest(data.id)}>
                          {isloading ? "Approving" : "Approve"}
                        </span>
                        <span
                          className='raise_inv reje4'
                          onClick={() => openModal(data.id)}>
                          {"Decline"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {upfront?.length == 0 && (
              <Col md={11} className='containerforemptyorder1 cust20'>
                <div className='containerforemptyorder'>
                  <img
                    src={no_work_order}
                    alt={"no_work_order"}
                    className='no_work_order'
                  />
                </div>
                <div className='no_work1'>data is empty</div>
              </Col>
            )}
          </div>
        </>
      </div>
    </>
  );
};

const Invoice_details = ({ work_order_detail }: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: [],
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron: active1 === "active" ? "" : "arrowflip",
    });
  };
  const { active1, collapseHeight, chevron, work_sheet, isloading } = state;
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>Invoice</span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down1 ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <div className='job23_1a wrap_z'>
            <div className='main_wrap_ws main_wrapp1'>
              <h6 className='userprofile12 userprofile123'></h6>
              <div className='tabledata tablecontent'>
                <div className='header_12'>Invoice Number</div>
                <div className='header_12'>Total Amount</div>
                <div className='header_12'>Amount Paid</div>
                <div className='header_12 '>Outstanding</div>
                <div className='header_12'>Total cycles</div>
              </div>
              <div className='tabledata tablecontent'>
                <div className='header_12'>
                  {work_order_detail?.invoice?.reference}
                </div>
                <div className='header_12'>
                  {current_currency}
                  {FormatAmount(work_order_detail?.invoice?.total_amount)}
                </div>
                <div className='header_12'>
                  {current_currency}
                  {FormatAmount(work_order_detail?.invoice?.total_amount_paid)}
                </div>
                <div className='header_12 active_member'>
                  {current_currency}
                  {FormatAmount(
                    work_order_detail?.invoice?.total_amount_unpaid
                  )}
                </div>
                <div className='header_12 active_member'>
                  {work_order_detail?.invoice?.total_cycles}
                </div>
              </div>
              <div className='text-center'>
                {" "}
                <span className='viewall_'>
                  {" "}
                  <Link
                    to={`/admin_invoice_details/${work_order_detail?.invoice?.id}/${work_order_detail?.invoice?.work_order?.id}`}
                    title='view payment cycle information'>
                    view more
                  </Link>{" "}
                </span>{" "}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
const AdminViewWorkOrderDetails = withRouter((props: any) => {
  const [state, setState] = useState<any>({
    work_order_detail: {},
    workDetails: {},
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    assigned_specialists: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    show2: "",
    notify_specialist: false,
    specialist_id: "",
    isloading: false,
    hour: "",
    show: false,
    reason: "",
    already_approved: false,
    new_work: false,
    inreview: false,
    active: "",
    active1: "",
    collapseHeight: "0px",
    cost_show: false,
    chevron: "",
    chevron1: "",
    allAssignedSpecialist: [],
    work_sheet: [],
    markup_percentage: "",
    health_insurance_cost: "",
    coverall_cost: "",
    per_diem: "",
    project_duration: "",
    spreads: "",
    professional_indemnity_insurance: "",
    cost_per_inch: "",
    association_cost_per_inch: "",
    fx_rate: "",
    cost_per_inch_dollar: "",
    per_diem_dollar: "",
  });
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    // if (e.target.name == "cost_per_inch_dollar") {
    // console.log(calc_cost_per_inc_naira(cost_per_inch_dollar))
    // }
  };

  const calc_cost_per_inc_naira = (d) => {
    return d * fx_rate;
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

  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });

  const {
    assigned_specialists,
    country,
    cost_show,
    order_title,
    end_date,
    already_approved,
    show2,
    specialist_id,
    notify_specialist,
    reason,
    location_terrain,
    cost_per_inch,
    association_cost_per_inch,
    fx_rate,
    new_work,
    start_date,
    work_order_detail,
    show,
    inreview,
    active,
    active1,
    collapseHeight,
    markup_percentage,
    health_insurance_cost,
    coverall_cost,
    per_diem,
    project_duration,
    spreads,
    professional_indemnity_insurance,
    chevron1,
    isloading,
    cost_per_inch_dollar,
    per_diem_dollar,
  } = state;

  const Accept_work_order = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_detail.id}/accept`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successfull");
          localStorage.setItem(
            "work_order_details",
            JSON.stringify(props.order_details)
          );
          setTimeout(() => {
            props.history.push(
              `/admin_work_details${props.order_details.id}?inreview=true`
            );
          }, 2000);
          console.log(res.data);
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message, "D");
        }
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(`${API}/admin/work-orders/${props.match.params.id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          ...res.data.data,
          ...res.data.data.costing,
          health_insurance_cost:
            res?.data?.data?.costing?.health_insurance_per_specialist,
          coverall_cost: res?.data?.data?.costing?.coverall_per_specialist,
          per_diem: res?.data?.data?.costing?.per_diem_per_specialist,
          cost_per_inch_dollar:
            res?.data?.data?.costing?.cost_per_inch /
              res?.data?.data?.costing?.fx_rate ?? 0,
          per_diem_dollar:
            res?.data?.data?.costing?.per_diem_per_specialist /
              res?.data?.data?.costing?.fx_rate ?? 0,
          project_duration: res?.data?.data?.costing?.duration_in_days,
          already_approved: urlkey ? true : false,
          work_order_detail: res.data.data,
          new_work: res.data.data.status == "New" ? true : false,
          inreview: res.data.data.status == "In Review" ? true : false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          already_approved: urlkey ? true : false,
          work_order_detail: work_order_details,
        });
        console.log(err);
      });
    let inreview = props.location.search;
    console.log(inreview);
  }, []);

  const StartProject = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/admin/work-orders/${work_order_details?.id}/activate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("successfully started workorder");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setState({
          ...state,
          ...res.data.data,
          isloading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const StopProject = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/admin/work-orders/${work_order_details?.id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("successfully stopped project");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setState({
          ...state,
          ...res.data.data,
          isloading: false,
        });
      })
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message);
        }
        notify("failed to stop project");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  console.log(work_order_detail);
  const content: any = useRef();
  const toggleAccordion = () => {
    setState({
      ...state,
      active: active === "" ? "active" : "",
      collapseHeight:
        active === "active" ? "0px" : `${content.current.scrollHeight}px`,
      chevron: active === "active" ? "" : "arrowflip",
    });
  };

  const modalShow1 = () => {
    setState({
      ...state,
      cost_show: true,
    });
  };

  const sendSLA = () => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/admin/work-orders/${work_order_details?.id}/send-contract`,
        {},
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("successfully  sent contract");
        setTimeout(() => {
          // window.location.reload();
        }, 2000);
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message);
        }
        notify("failed to process");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const modalShow2 = (id) => {
    setState({
      ...state,
      show2: true,
      specialist_id: id,
    });
  };

  const removeSpecialist = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      specialists: [specialist_id],
      notify: notify_specialist,
    };
    axios
      .post(
        `${API}/admin/work-orders/${props.match.params.id}/unassign-specialists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("successfully  removed specialist");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message);
        }
        notify("failed to process");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const SendCost = () => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      markup_percentage,
      health_insurance_cost,
      coverall_cost,
      per_diem: fx_rate * per_diem_dollar,
      project_duration,
      spreads,
      professional_indemnity_insurance,
      cost_per_inch: fx_rate * cost_per_inch_dollar,
      association_cost_per_inch,
      fx_rate,
    };
    axios
      .post(`${API}/admin/work-orders/${work_order_details?.id}/cost`, data, {
        headers: {
          Authorization: `Bearer ${returnAdminToken().access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        notify("successfully computed work order cost");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setState({
          ...state,
          ...res.data.data,
          isloading: false,
        });
      })
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message);
        }
        notify("failed to process");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };

  const calc_cost_per_inch_in_naira = () => {
    if (fx_rate && cost_per_inch_dollar) {
      let num = fx_rate * cost_per_inch_dollar;
      num.toFixed(2);
      return FormatAmount(num ?? 0);
    }
    return 0;
  };

  const calc_cost_per_diem_in_naira = () => {
    if (fx_rate && per_diem_dollar) {
      let num = fx_rate * per_diem_dollar;
      num.toFixed(2);
      return FormatAmount(num ?? 0);
    }
    return 0;
  };

  return (
    <>
      <Modal
        size='lg'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
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
                  className='form-control reason12 reason122'
                  placeholder='Reason for termination'></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              {/* <div className="terminate1" onClick={(e) => Reject_work_order()}>
                Reject
              </div> */}
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
        dialogClassName=''>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Remove Specialist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p className='teal-text'>
                Please confirm removal of invited specialist
              </p>
              <p>
                Notify Specialist{" "}
                <input
                  type='checkbox'
                  name='notify_specialist'
                  className='form-check-input position-static'
                  onChange={() => {
                    setState({
                      ...state,
                      notify_specialist: notify_specialist ? false : true,
                    });
                  }}
                  checked={notify_specialist ? true : false}
                  id='notify_specialist '
                />{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <div className='terminate1' onClick={(e) => removeSpecialist()}>
                {isloading ? "Processing" : "Submit"}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        size='lg'
        show={cost_show}
        onHide={() =>
          setState({
            ...state,
            cost_show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Cost Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Markup Percentage %<span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='markup_percentage'
                    value={markup_percentage}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Health Insurance per Specialist (₦)
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='health_insurance_cost'
                    value={health_insurance_cost}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Coverall per Specialist (₦){" "}
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='coverall_cost'
                    value={coverall_cost}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Association Cost Per Inch (₦)
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    name='association_cost_per_inch'
                    value={association_cost_per_inch}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Project Duration (days) <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='project_duration'
                    value={project_duration}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Spreads <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    name='spreads'
                    min={0}
                    value={spreads}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Professional Indemnity Insurance Per Spread (₦)
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='professional_indemnity_insurance'
                    value={professional_indemnity_insurance}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  FX RATE (₦) <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder='US Dollar to naira rate eg. 550'
                    name='fx_rate'
                    min={0}
                    value={fx_rate}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Cost Per Inch ($)<span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='cost_per_inch_dollar'
                    value={cost_per_inch_dollar}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Cost Per Inch (₦)<span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='text'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    // name="cost_per_inch"
                    value={calc_cost_per_inch_in_naira()}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {/* Dollar */}
          <Row>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Per Diem Per Specialist Per Day ($)
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='number'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='per_diem_dollar'
                    value={per_diem_dollar}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className='pipelength pipelng'>
                <div className='pipelength1q'>
                  Per Diem Per Specialist Per Day (₦)
                  <span className='text-danger'>*</span>
                </div>
                <div className=''>
                  <input
                    type='text'
                    className=' form-control'
                    placeholder=''
                    min={0}
                    name='per_diem'
                    value={calc_cost_per_diem_in_naira()}
                    onChange={onchange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <Button
                className=' raise_inv computecost'
                onClick={(e) => SendCost()}>
                {isloading ? "processing" : "Compute Cost"}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2'>
          <Col md={12} className='job34'>
            <div className='title_wo title_wo12 title_wo_'>
              <div className='workorderheader fixedtitle'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>
                Work Details
              </div>
            </div>
            {new_work && (
              <div className='rjwrapper mrgin__right'>
                {/* <Button
                  className="accjct1"
                  onClick={() => {
                    setState({
                      ...state,
                      show: true,
                    });
                  }}
                >
                  {isloading ? "Processing" : "Reject"}
                </Button> */}
                {/* <Button className="rejct1" onClick={Accept_work_order}>
                  {isloading ? "Processing" : "Accept"}
                </Button> */}
              </div>
            )}
            <div className='fllx2'>
              {inreview &&
                work_order_detail?.actions?.canAssignSpecialist == false && (
                  <div className='raise1'>
                    <div className='rjwrapper mrgin__right'>
                      <Link to='/work_order_evaluation'>
                        <Button className=' raise_inv'>{"Edit"}</Button>
                      </Link>
                    </div>
                  </div>
                )}
              {inreview && work_order_detail?.actions?.canCost == true && (
                <div className='raise1'>
                  <div className='rjwrapper mrgin__right'>
                    <Button className=' raise_inv' onClick={modalShow1}>
                      {"Cost Settings"}
                    </Button>
                  </div>
                </div>
              )}
              {inreview &&
                work_order_detail?.assigned_specialists.length !== 0 && (
                  <div className='raise1'>
                    <div className='rjwrapper mrgin__right'>
                      <Button
                        className=' raise_inv startproject'
                        onClick={StartProject}>
                        {!isloading ? "Commence Work" : "Processing"} <Play />
                      </Button>
                    </div>
                  </div>
                )}
              {work_order_detail?.status == "Active" &&
                work_order_detail?.assigned_specialists?.length !== 0 && (
                  <div className='raise1'>
                    <div className='rjwrapper mrgin__right'>
                      <Button
                        className=' raise_inv startproject'
                        onClick={StopProject}>
                        {!isloading ? "End Work" : "Processing"} <Stop />
                      </Button>
                    </div>
                  </div>
                )}
              {work_order_detail?.actions?.canSendSla && (
                <div className='raise1'>
                  <div className='rjwrapper mrgin__right'>
                    {!work_order_detail?.sla_sent && (
                      <Button
                        className=' raise_inv startproject'
                        onClick={sendSLA}>
                        {!isloading ? "Send SLA" : "Processing"}
                      </Button>
                    )}
                    {work_order_detail?.sla_sent && (
                      <Button
                        className=' raise_inv startproject'
                        onClick={sendSLA}>
                        {!isloading ? "Resend SLA" : "Processing"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Row className='mgtop'>
              <Col md={2} className='job23_ mheight_'>
                <p className='exp23'>
                  <img src={portfolio} alt='portfolio' className='portfolioq' />
                </p>

                <p className='bview'>
                  <NavHashLink to='#overview'>Overview</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink
                    className='details'
                    to='#details'
                    // activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                  >
                    Specialist Details
                  </NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#work'>Work Details</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#worksheet'>Work Sheet</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#actioninvoice'>Invoice</NavHashLink>
                </p>

                {/* <p className="bview inactive_bv">
                  <a href="#actions">Actions</a>
                </p> */}
              </Col>
              <Col md={10} className='job23_1a_ job23_1a_p'>
                <div className='job23_1a'>
                  <div className=''>
                    <WorkOrderCardsMinInfo order_detail={work_order_detail} />
                  </div>
                </div>
                <div className='job23_1a' id='details'>
                  {assigned_specialists.length == 0 &&
                    !new_work &&
                    work_order_detail.invoice && (
                      <>
                        <h6 className='title22'>Specialists Invitation</h6>
                        <Col md={11} className='containerforemptyorder1 cust20'>
                          <div className='containerforemptyorder'>
                            <img
                              src={no_work_order}
                              alt={"no_work_order"}
                              className='no_work_order'
                            />
                          </div>
                          <div className='no_work1'>
                            <div>No Specialist have been invited</div>
                            {work_order_detail?.invoice?.approved == null &&
                              "Awaiting invoice approval"}
                          </div>
                          {work_order_detail?.invoice?.approved && (
                            <div className='nojob2 '>
                              <div
                                className='job3 job_1'
                                onClick={() => {
                                  localStorage.setItem(
                                    "work_order_details",
                                    JSON.stringify(work_order_detail)
                                  );
                                  props.history.push(
                                    "/admin_assign_specialist"
                                  );
                                }}>
                                Invite specialist
                              </div>
                            </div>
                          )}
                        </Col>
                      </>
                    )}
                  {work_order_detail.invoice == null &&
                    work_order_detail.status !== "New" && (
                      <Col md={11} className='containerforemptyorder1 cust20'>
                        <div className='containerforemptyorder'>
                          <img
                            src={no_work_order}
                            alt={"no_work_order"}
                            className='no_work_order'
                          />
                        </div>
                        <div className='no_work1'>
                          Proforma Invoice has not been raised
                        </div>
                        <div className='nojob2 '>
                          <div
                            className='job3 job_1'
                            onClick={() => {
                              props.history.push("/raise_proforma_invoice");
                            }}>
                            Raise Proforma Invoice
                          </div>
                        </div>
                      </Col>
                    )}
                  <div className='dplsplsacc'>
                    <Card>
                      <div onClick={toggleAccordion}>
                        <div className='deploydsplstwrapp'>
                          <div>
                            <span className='deplyeaggrgt'>
                              {props?.group_data?.total_members} Invited
                              Specialist
                            </span>
                          </div>
                          <div className='accimgwrap'>
                            <span>
                              <img
                                src={chevrondown}
                                className={`arrow-down ${chevron1}`}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    {isloading && <Spinner animation={"grow"} variant='info' />}
                    <div
                      style={{ maxHeight: `${collapseHeight}` }}
                      className='acccollapsediv maxh-378'
                      ref={content}>
                      {!new_work && assigned_specialists.length !== 0 && (
                        <>
                          <div className='group_flex'>
                            {/* <div className="grpA">
                            Group <b>A</b>
                          </div> */}
                            <div className='grpB'>
                              <b>
                                {work_order_detail?.total_assigned_specialists}
                              </b>{" "}
                              Invited
                            </div>
                            <div
                              className='job3 job_1 job_12'
                              onClick={() => {
                                localStorage.setItem(
                                  "work_order_details",
                                  JSON.stringify(work_order_detail)
                                );
                                props.history.push("/admin_assign_specialist");
                              }}>
                              Invite specialist
                            </div>
                          </div>
                          <div className='tabledata tabledataweb'>
                            <div className='header_12 pleft'>Fullname</div>
                            <div className='header_12'>Type</div>
                            <div className='header_12'>Spread Position</div>
                            <div className='header_12'>Status</div>
                            <div className='header_12'>Action</div>
                          </div>
                          {assigned_specialists.length !== 0 &&
                            assigned_specialists
                              ?.slice(0, 3)
                              ?.map((data, i) => (
                                <>
                                  <div
                                    className={
                                      checkIfIsOdd(i)
                                        ? "tabledata"
                                        : "tabledata tablecontent"
                                    }>
                                    <div className='header_12'>
                                      <img
                                        src={avatar_test}
                                        className='specialist_avatar'
                                      />
                                      <div className='mobiletabledata'>
                                        Fullname
                                      </div>
                                      {data.first_name}
                                      {data.last_name}
                                    </div>
                                    <div className='header_12 typ22'>
                                      <div className='mobiletabledata mobiletabledata22'>
                                        Type
                                      </div>
                                      <div>
                                        {" "}
                                        {capitalize(data.skills?.[0].name)}
                                      </div>
                                    </div>
                                    <div className='header_12'>
                                      <div className='mobiletabledata mobiletabledata22'>
                                        Spread Position
                                      </div>
                                      <div className='glead'> Member </div>
                                    </div>
                                    <div className='header_12 active_member'>
                                      <div className='mobiletabledata mobiletabledata22'>
                                        Status
                                      </div>
                                      <div className='active_member'>
                                        {" "}
                                        {data.status == "Pending" ? (
                                          <span className='pending_color'>
                                            {data.status}
                                          </span>
                                        ) : (
                                          data.status
                                        )}
                                      </div>
                                    </div>
                                    <div className='member'>
                                      {data.status == "Pending" && (
                                        <div
                                          className='job3 job_1 job_12 text-white specailist_rv'
                                          onClick={() => modalShow2(data.id)}>
                                          Remove Specialist
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ))}
                          <div className='text-center'>
                            {" "}
                            <span className='viewall_'>
                              {" "}
                              <Link
                                to={`/deployedspecialist/${props.match.params.id}`}>
                                View all
                              </Link>{" "}
                            </span>{" "}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* invited specialist ends */}
                  <div className='job23_1a wrap_z paddtop'>
                    <div className='active_member23'>
                      <div className='dplsplsacc'>
                        <Work_Details work_order_detailz={work_order_detail} />
                      </div>
                    </div>
                  </div>
                  <Work_Sheet />
                  <div id='worksheet'></div>
                  <br />
                  {work_order_detail?.invoice?.length !== 0 && (
                    <>
                      <Invoice_details work_order_detail={work_order_detail} />
                    </>
                  )}
                </div>
                <br />
                <Upfront_payment />
              </Col>
            </Row>
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
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default AdminViewWorkOrderDetails;
