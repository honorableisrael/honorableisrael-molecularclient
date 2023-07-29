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
import { HashLink } from "react-router-hash-link";

const WorkSheetAdmin = (props) => {
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
    worksheet_details: {},
    pipe_breakdown: [],
    selected_id: "",
    cost_exclusions: "",
    conditions: "",
    modal_state: "",
    show_modal: false,
    show_modal_1: false,
    work_sheet: {},
  });

  const handleClose = () =>
    setState({
      ...state,
      show_modal: false,
    });

  const handleShow = (type) =>
    setState({
      ...state,
      show_modal: true,
      modal_state: type,
    });

  const handleClose1 = () =>
    setState({
      ...state,
      show_modal_1: false,
    });

  const handleShow1 = () =>
    setState({
      ...state,
      show_modal_1: true,
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

  useEffect(() => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/worksheets/${props?.match?.params?.id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get(
          `${API}/admin/work-orders/${props?.match?.params?.work_order_id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res, res1) => {
          
          setState({
            ...state,
            work_order_detail: res1.data.data,
            work_sheet: res.data.data,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        
      });
  }, []);

  const schedule_Specailist_Payment = () => {
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
        
      });
  };

  const SubmitCostExclusion = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = { cost_exclusions };
    axios
      .all([
        axios.post(
          `${API}/admin/invoices/${props.match.params.id}/cost-exclusions`,
          data,
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
        
      });
  };

  const SubmitConditions = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = { conditions };
    axios
      .all([
        axios.post(
          `${API}/admin/invoices/${props.match.params.id}/conditions`,
          data,
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
        
      });
  };
  const SendWorkSheet = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = { conditions };
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/worksheets/${props.match.params.id}/send`,
          data,
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
        
      });
  };

  const {
    show_modal_1,
    type,
    cost_exclusions,
    conditions,
    show_modal,
    worksheet_details,
    work_order_detail,
    work_sheet,
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
            <Col md={12} className='terminate2'>
              <div className='' onClick={makePaymentToSpecialist}>
                <Button className='btn-success primary3'>
                  {isloading ? "Processing" : "Confirm Payment"}
                </Button>
              </div>
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
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>
                Are you sure you want to send this work sheet to the contractor
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
              <div className='' onClick={SendWorkSheet}>
                <Button className='btn-success primary3'>
                  {isloading ? "Processing" : "Proceed"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className='dasbwr nopaddrt tainer3'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2  brt00'>
          <Col md={11} className='job34 brt99x'>
            <div className='title_wo title_wo12 title_wo_ tbtom ttbom'>
              <div className='workorderheader fixedtitle'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>{" "}
                WORK SHEET
              </div>
              <div className='text-right	'>
                {!work_sheet?.sent ? (
                  <Button
                    className='payspecialist1 h36'
                    onClick={() => {
                      setState({
                        ...state,
                        show2: true,
                      });
                    }}>
                    {isloading ? "processing" : "Send Worksheet"}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Row className='mgtop'>
              <Col md={12} className='mgtop345'>
                <div className='job23_1a hidden__1'>
                  <div className=''>
                    <div className='overview12 overviewflex-down'>
                      <Col md={12} className='plf'>
                        <div className=''>
                          <div className='boxwrapper__1'>
                            <div className='lcomponent'>
                              <div className='inv_title'>
                                REF : {work_sheet?.reference}{" "}
                              </div>
                              <div className='inv_title2'></div>
                            </div>
                          </div>
                          <div className=''>
                            <h6>
                              PROJECT:{" "}
                              <span className='text-teal text-capitalize'>
                                <b> {work_order_detail?.title}</b>
                              </span>
                            </h6>
                            <h6>
                              PIPELINE WELDING WORK DETAILS:{" "}
                              <span className='text-teal text-capitalize'>
                                <b> {work_order_detail?.description}</b>
                              </span>
                            </h6>
                          </div>
                          <div>
                            {" "}
                            FROM: <b>
                              {" "}
                              {work_sheet?.invoice?.start_date}{" "}
                            </b> TO: <b> {work_sheet?.invoice?.end_date}</b>
                          </div>
                          <h6 className='mt-2'>
                            APPROVAL STATUS :{" "}
                            {work_sheet?.approved ? (
                              <span className='badge badge-success'>
                                Approved
                              </span>
                            ) : (
                              <span className='badge badge-warning'>
                                Pending
                              </span>
                            )}
                          </h6>
                          <h6>
                            DESCRIPTION:{" "}
                            <span className='text-teal text-capitalize'>
                              <b> {work_sheet?.description}</b>
                            </span>
                          </h6>
                          <div className='ing_11'>
                            {isloading && (
                              <Spinner animation={"grow"} variant='info' />
                            )}
                            <div className='text-right mgg2'></div>
                          </div>
                        </div>
                        <div className=''></div>
                        {work_sheet?.spreads?.map((item: any, i) => (
                          <div className='deployedsplsttable'>
                            <h6 className='text-uppercase text-teal'>
                              {" "}
                              <b>
                                {" "}
                                {item?.group?.name}
                                {item?.spread?.name}{" "}
                                {item?.sent ? (
                                  <span className='badge badge-info'>
                                    Completed
                                  </span>
                                ) : (
                                  <span className='badge badge-warning'>
                                    Pending
                                  </span>
                                )}
                              </b>
                            </h6>
                            {item?.items?.length > 0 &&
                              item?.items?.map((data: any, i) => (
                                <div>
                                  <div>Week : {data?.week} </div>
                                  <Table
                                    hover
                                    responsive
                                    className='schedule_payment_table'>
                                    <thead>
                                      <tr>
                                        <th scope='col'>PIPE SIZE</th>
                                        <th scope='col'>PIPE SCHEDULE</th>
                                        <th scope='col'>NO OF JOINTS</th>
                                        <th scope='col'>NO OF INCHES</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data?.pipes?.map((pipe_item: any, i) => (
                                        <tr key={i}>
                                          <td>{pipe_item?.pipe_size?.size}</td>
                                          <td>
                                            {pipe_item?.pipe_schedule?.value}
                                          </td>
                                          <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                                            <div className='dplsplusernmeimg'>
                                              {/* <span></span> */}
                                              &nbsp; &nbsp;
                                              <div>{pipe_item?.joints}</div>
                                            </div>
                                          </td>
                                          <td className='contractorname'>
                                            {pipe_item?.inches}
                                          </td>
                                          {/* <td>
                                      {data?.actions?.can_pay && (
                                        <Button
                                          onClick={() => openModal(pipe_item.id,data)}
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
                                </div>
                              ))}
                            <div>
                              <h5 className='fw-thin text-muted'>
                                 Summary
                              </h5>
                              <table className='table table-bordered'>
                                <thead className='table-light'>
                                  <tr>
                                    <th>S/NO</th>
                                    <th>Pipe Size</th>
                                    <th>Pipe Schedule</th>
                                    <th>Joints</th>
                                    <th>Inches</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.pipe_summary?.length > 0 &&
                                    item?.pipe_summary?.map((pipe_item, i) => (
                                      <tr key={i}>
                                        <div className=''>{i++}</div>
                                        <td>{pipe_item?.pipe_size?.size}</td>
                                        <td>
                                          {pipe_item?.pipe_schedule?.value}
                                        </td>
                                        <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                                          <div className='dplsplusernmeimg'>
                                            &nbsp; &nbsp;
                                            <div>{pipe_item?.joints}</div>
                                          </div>
                                        </td>
                                        <td className='contractorname'>
                                          {pipe_item?.inches}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                            <div className=''>
                              <div className=''>
                                <h6 className='text-uppercase text-teal'>
                                  {" "}
                                  Total No. of Inches completed by{" "}
                                  {item?.group?.name} :{" "}
                                  <b className='text-dark'>
                                    {item?.total_inches}
                                  </b>
                                </h6>
                                <h6 className='text-uppercase text-teal'>
                                  {" "}
                                  Total No. of Joints completed by{" "}
                                  {item?.group?.name} :{" "}
                                  <b className='text-dark'>
                                    {item?.total_joints}
                                  </b>
                                </h6>
                                <h6 className='text-uppercase text-teal'>
                                  {" "}
                                  Team Captain (
                                  {item?.captain?.skills?.[0]?.name}):{" "}
                                  <b className='text-dark'>
                                    {item?.captain?.first_name}{" "}
                                    {item?.captain?.last_name}
                                  </b>
                                </h6>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className='rcomponent'>
                          <div className='inv_title2'>
                            {/* <div className=''>
                              <h6 className='text-uppercase text-teal'>
                                {" "}
                                Total No. of Inches completed by all spreads:{" "}
                                <b className='text-dark'>7000</b>
                              </h6>
                            </div> */}
                          </div>
                        </div>

                        <div className='deployedsplsttable'>
                          <h6 className='text-uppercase text-teal'>
                            {" "}
                            <b> APPROVAL</b>
                          </h6>
                          <Table
                            hover
                            responsive
                            className='schedule_payment_table'>
                            <thead>
                              <tr>
                                <th className='w-50 pl-2 text-uppercase'>
                                  {work_order_detail?.contractor}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  NAME: <b> {work_sheet?.approver?.name}</b>{" "}
                                  <br />
                                  <br />
                                  DATE: {formatTime(work_sheet?.approved_at)}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
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
      <Modal
        show={show_modal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size={"lg"}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <span className='fl3e4'>Append Cost Exclusion</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='row inputlabel label_pad justify-between'>
            <div className='col-md-12 form_waller'>
              <span className='rdfrmlbl rdfrmlblw2'>
                {" "}
                Cost Exclusions <span className='text-danger'>*</span>
              </span>
              <textarea
                name='cost_exclusions'
                value={cost_exclusions}
                onChange={onchange}
                className='form-control forminput hu0'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
          <Button variant='' className='bvnbt' onClick={SubmitCostExclusion}>
            {state.isloading ? "Processing" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show_modal_1}
        onHide={handleClose1}
        backdrop='static'
        keyboard={false}
        size={"lg"}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <span className='fl3e4'>Append Conditions</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='row inputlabel label_pad justify-between'>
            <div className='col-md-12 form_waller'>
              <span className='rdfrmlbl rdfrmlblw2'>
                {" "}
                Work Conditions <span className='text-danger'>*</span>
              </span>
              <textarea
                name='conditions'
                value={conditions}
                onChange={onchange}
                className='form-control forminput hu0'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose1}>
            Back
          </Button>
          <Button variant='' className='bvnbt' onClick={SubmitConditions}>
            {state.isloading ? "Processing" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default WorkSheetAdmin;
