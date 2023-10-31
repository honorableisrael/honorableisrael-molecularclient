import React, { useEffect, useState, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Table,
  Modal,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/Molecular.png";
import axios from "axios";
import chevrondown from "../../images/chevrondown.png";
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
  const [state, setState] = useState < any > ({
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
    id: "",
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
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: {},
    activeItemIndex: null,
  });
  const contentsRef = useRef < (HTMLDivElement | null)[] > ([]);
  const toggleAccordion1 = (i = 1) => {
    const activeKey = `active${i}`;
    const contentRef: any = contentsRef.current[i];
    console.log(contentRef)
    setState(prevState => ({
      ...prevState,
      activeItemIndex: prevState.activeItemIndex === i ? null : i,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${contentRef.scrollHeight}px`,
      chevron: active1 === "active" ? "" : "arrowflip",
    }))
  };
  const { active1, collapseHeight, chevron } = state;
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
    fetchAll()
  }, []);
  const fetchAll = () => {
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
  }
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
        if (err?.response?.status === 400) {
          return notify(err?.response?.data?.message);
        }

      });
  };

  const {
    show_modal_1,
    id,
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

  const ApproveItem = (id) => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/worksheets/weekly-worksheets/${id}/approve`, {},
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
          fetchAll()
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
        if (err?.response?.status === 400) {
          return notify(err?.response?.data?.message);
        }

      });
  }
  const DeclineItem = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = { reason };
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/worksheets/weekly-worksheets/${id}/decline`,
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
          reloadPage()
          setState({
            ...state,
            isloading: false,
            show: false
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          show: false,
        });
        if (err?.response?.status === 400) {
          return notify(err?.response?.data?.message);
        }

      });
  }

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
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>Are you sure you want to decline this worksheet item?</h6>
            </Col>
            <Col md={12} className="mb-4 mt-3">
              <label className="mb-2">Reason</label>
              <textarea
                onChange={onchange}
                name='reason'
                className='filter form-control'
              ></textarea>
            </Col>
          </Row>
          <Row>
            <Col md={12} className=''>
              <div className='text-center ' onClick={DeclineItem}>
                <Button className='btn-danger payspecialist1 mr-2 h36 '>
                  {isloading ? "Processing" : "Decline"}
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
                          <div key={i}>
                            <Card className="padding_zero">
                              <div onClick={() => toggleAccordion1(i)} className="bglight bg-light">
                                <div className='deploydsplstwrapp padding_zero'>
                                  <div className="">
                                    <span className='deplyeaggrgt'> {item?.spread?.name}{" "}</span>
                                  </div>
                                  <div className='accimgwrap'>
                                    <span>
                                      <img src={chevrondown} className={`arrow-down1 ${state.activeItemIndex === i ? 'arrowflip' : ''}`} />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                            <div className='deployedsplsttable acccollapsediv1' ref={contentRef => (contentsRef.current[i] = contentRef)}
                              style={{
                                maxHeight: state.activeItemIndex === i ? (contentsRef.current[i]?.scrollHeight || 'auto') : '0px',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease-out',
                              }}
                            >
                              <h6 className='text-uppercase text-teal' style={{
                                position: "relative",
                                top: "2.1px"
                              }}>
                                {" "}
                                <b>
                                  {" "}
                                  {item?.group?.name}
                                </b>
                              </h6>
                              {item?.items?.length > 0 &&
                                item?.items?.map((data: any, i) => (
                                  <div className="padding_red">
                                    <div className="flexbetween">
                                      <div> {data?.status === "approved" ? (
                                        <span className='badge badge-success'>
                                          Approved
                                        </span>
                                      ) : (
                                        <span className='badge badge-warning'>
                                          {data.status}
                                        </span>
                                      )}</div>
                                      <div className="flexbetween ">
                                        {data?.actions?.can_approve ? (
                                          <Button
                                            className='payspecialist1 mr-2 h36'
                                            onClick={() => ApproveItem(data.id)}
                                          >
                                            {isloading ? "processing" : "Approve"}
                                          </Button>
                                        ) : ""
                                        }
                                        {data?.actions?.can_decline ? (
                                          <Button
                                            className='payspecialist1 ml h36'
                                            onClick={() => setState({
                                              ...state,
                                              show: true,
                                              id: data.id
                                            })}
                                          >
                                            {isloading ? "processing" : "Decline"}
                                          </Button>
                                        ) : ""
                                        }
                                      </div>
                                    </div>
                                    <div>Week : {data?.week} </div>
                                    <Table
                                      hover
                                      responsive
                                      className='schedule_payment_table'>
                                      <thead>
                                        <tr>
                                          <th scope='col' className='equal-width'>Pipe Size</th>
                                          <th scope='col' className='equal-width'>Pipe Schedule</th>
                                          <th scope='col' className='equal-width'>No of Joints</th>
                                          <th scope='col' className='equal-width'>No Of Inches</th>
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
                                      <th style={{ minWidth: "8rem" }}>S/NO</th>
                                      <th style={{ minWidth: "8rem" }}>Pipe Size</th>
                                      <th style={{ minWidth: "8rem" }}>Pipe Schedule</th>
                                      <th style={{ minWidth: "8rem" }}>Joints</th>
                                      <th style={{ minWidth: "8rem" }}>Inches</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item?.pipe_summary?.length > 0 &&
                                      item?.pipe_summary?.map((pipe_item, i) => (
                                        <tr key={i}>
                                          <td>{i++}</td>
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

                        <div className='deployedsplsttable' >
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
