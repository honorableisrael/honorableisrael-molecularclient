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
import axios, { AxiosResponse } from "axios";
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

const Admin_Sub_Invoice_Details = (props) => {
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
    pipe_breakdown: [],
    selected_id: "",
    cost_exclusions: "",
    conditions: "",
    modal_state: "",
    show_modal: false,
    show_modal_1: false,
    add_invoice_modal: false,
    description: "",
    number_of_joints: "",
    pipe_schedules: [],
    pipeSizes: [],
    pipe_size: "",
    size: "",
    no_of_joints: "",
    pipe_schedule: "",
    id: "",
    edit_item_id: "",
    joints: "",
    size_value: "",
    pipe_schedule_name: "",
    show_delete: false,
    amount: 1,
    edit_worksheet_modal: false,
  });
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");
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
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (description == "") {
      setState({
        ...state,
        errorMessage: "All fields are required",
      });
    } else {
      createItem();
    }
  };
  const createItem = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      pipe_size: size,
      joints: no_of_joints,
      pipe_schedule,
      amount,
      description,
    };

    axios
      .post(`${API}/admin/sub-invoices/${props.match.params.id}/items/`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        fetch_all();
        notify(res?.data?.message);
        setState({
          ...state,
          isloading: false,
          add_invoice_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          add_invoice_modal: false,
        });
        console.log(err?.response);
        notify(err?.response?.data?.message);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update");
      });
  };

  const editPipeItem = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      pipe_size: size,
      joints: no_of_joints,
      pipe_schedule,
      amount,
      description,
    };

    axios
      .put(`${API}/admin/sub-invoices/items/${edit_item_id}`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        fetch_all();
        notify(res?.data?.message);
        setState({
          ...state,
          isloading: false,
          edit_worksheet_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          edit_worksheet_modal: false,
        });
        console.log(err?.response);
        notify(err?.response?.data?.message);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update");
      });
  };

  const openPaymentModal2 = (id) => {
    setState({
      ...state,
      show2: true,
      selected_id: id,
    });
  };

  useEffect(() => {
    fetch_all();
  }, []);
  const fetch_all = () => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/sub-invoices/${props?.match?.params?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/bank-accounts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(
          `${API}/admin/work-orders/${props?.match?.params?.workorderid}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get<any, AxiosResponse<any>>(`${API}/pipes`),
        axios.get<any, AxiosResponse<any>>(`${API}/pipe-schedules`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get<any, AxiosResponse<any>>(`${API}/pipe-sizes`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res2, res3, res4, response2, response3, response4) => {
          console.log(res2.data.data);
          setState({
            ...state,
            ...res2.data.data,
            work_order_detail: res4.data.data,
            invoice_details: res2.data.data,
            pipe_breakdown: res4.data.data.pipe_configs,
            pipeList: response2.data.data,
            pipe_schedules: response3.data.data,
            pipeSizes: response4.data.data,
            edit_worksheet_modal: false,
            add_invoice_modal: false,
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
  };

  const sendInvoice = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/invoice/send`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
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
          console.log(res.data.data);
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
        console.log(err);
      });
  };
  const onchange_pipeschedule = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      pipe_schedule_name: new_obj.name,
      pipe_schedule: new_obj.id,
      errorMessage: "",
    });
  };
  const onchange_pipesize = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj, "pipesize");
    setState({
      ...state,
      size_value: new_obj.name,
      size: new_obj.id,
      errorMessage: "",
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

  const sendInvoiceReminder = (id) => {
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/sub-invoices/${id}/send`,
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
      });
  };

  const create_work_sheet = () => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/sub-invoices/${props.match.params.id}/worksheet`,
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
        if (err?.response?.status === 500) {
          notify("Internal server error", "B");
        }
        console.log(err);
      });
  };
  const deletePipeItem = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    axios
      .delete(`${API}/admin/sub-invoices/items/${edit_item_id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res);
        notify("Successfully deleted");
        fetch_all();
        setState({
          ...state,
          isloading: false,
          show_delete:false
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          show_delete:false
        });
        console.log(err?.response);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to delete");
      });
  };
  const {
    show_modal_1,
    type,
    cost_exclusions,
    conditions,
    show_modal,
    work_order_description,
    work_order_detail,
    order_title,
    end_date,
    edit_item_id,
    isloading,
    show2,
    pipe_breakdown,
    edit_worksheet_modal,
    no_of_joints,
    invoice_details,
    selected_id,
    add_invoice_modal,
    description,
    show_delete,
    show,
    size,
    size_value,
    pipe_schedule_name,
    pipe_schedules,
    pipeSizes,
    pipe_size,
    pipe_schedule,
    amount,
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
            Confirm Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>
                Are you sure the contractor has made payment for this payment
                cycle
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
              <div className='' onClick={schedule_Specailist_Payment}>
                <Button className='btn-success primary3'>
                  {isloading ? "Processing" : "Confirm Payment"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal centered={true} show={add_invoice_modal}>
        <div className='add_worksheet_modalwrap p-3'>
          <div className='add_worksheet_modaltitle text-center'>
            Add Invoice Item
          </div>
          <Row>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Amount</h6>
                <Form.Control
                  type='number'
                  value={amount}
                  min={"1"}
                  className='userfield'
                  name='amount'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>No of Joints</h6>
                <Form.Control
                  type='number'
                  value={no_of_joints}
                  min={1}
                  className='userfield'
                  name='no_of_joints'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Pipe Schedule</h6>
                <select
                  id='pipe_schedule'
                  onChange={onchange_pipeschedule}
                  className='userfield form-control'
                  ref={inputEl1}>
                  <option value=''>{pipe_size}</option>
                  {pipe_schedules.map((data, i) => (
                    <option
                      className='specialization'
                      value={JSON.stringify({
                        id: data.id,
                        name: data.name,
                      })}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Pipe Size</h6>
                <select
                  id='pipe_size'
                  name='pipe_size'
                  onChange={onchange_pipesize}
                  className='userfield form-control'
                  ref={inputEl2}>
                  <option>{size_value ? size_value : ""}</option>
                  {pipeSizes.map((data, i) => (
                    <option
                      className='pipelength1 form-control specialization'
                      value={JSON.stringify({
                        id: data.id,
                        name: data.size,
                      })}>
                      {data.size}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Description</h6>
                <Form.Control
                  type='textarea'
                  value={description}
                  className='userfield'
                  name='description'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='wrkmodal-btnwrap'>
            <span
              className='wrkmodal-cancelbtn'
              onClick={() => {
                setState({
                  ...state,
                  add_invoice_modal: false,
                });
              }}>
              Cancel
            </span>
            <span className='profcertbtn upfrmodalbtn' onClick={validateForm}>
              {!isloading ? "Submit" : "Adding..."}
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        centered={true}
        onHide={() => {
          setState({
            ...state,
            edit_worksheet_modal: false,
          });
        }}
        show={edit_worksheet_modal}>
        <div className='add_worksheet_modalwrap p-3'>
          <div className='add_worksheet_modaltitle text-center'>
            Edit Invoice Data
          </div>
          <Row>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Amount</h6>
                <Form.Control
                  type='number'
                  value={amount}
                  min={"1"}
                  className='userfield'
                  name='amount'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>No of Joints</h6>
                <Form.Control
                  type='number'
                  value={no_of_joints}
                  min={1}
                  className='userfield'
                  name='no_of_joints'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Pipe Schedule</h6>
                <select
                  id='pipe_schedule'
                  onChange={onchange_pipeschedule}
                  className='userfield form-control'
                  ref={inputEl1}>
                  <option value=''>{pipe_schedule_name}</option>
                  {pipe_schedules.map((data, i) => (
                    <option
                      className='specialization'
                      value={JSON.stringify({
                        id: data.id,
                        name: data.name,
                      })}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Pipe Size</h6>
                <select
                  id='pipe_size'
                  name='pipe_size'
                  onChange={onchange_pipesize}
                  className='userfield form-control'
                  ref={inputEl2}>
                  <option>{size_value ? size_value : ""}</option>
                  {pipeSizes.map((data, i) => (
                    <option
                      className='pipelength1 form-control specialization'
                      value={JSON.stringify({
                        id: data.id,
                        name: data.size,
                      })}>
                      {data.size}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={12} className='formsection1'>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Description</h6>
                <Form.Control
                  type='textarea'
                  value={description}
                  className='userfield'
                  name='description'
                  onChange={onchange}
                  placeholder=''
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='wrkmodal-btnwrap'>
            <span
              className='wrkmodal-cancelbtn'
              onClick={() => {
                setState({
                  ...state,
                  edit_worksheet_modal: false,
                });
              }}>
              Cancel
            </span>
            <span className='profcertbtn upfrmodalbtn' onClick={editPipeItem}>
              {!isloading ? "Update" : "Updating..."}
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        size='sm'
        show={show_delete}
        onHide={() =>
          setState({
            ...state,
            show_delete: false,
          })
        }>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Delete Invoice Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <div className='alert alert-warning' role='alert'>
                <h6 className='alert-heading'>Confirm Action</h6>
                <p>This action would permanently erase this record</p>
                <hr />
                <p className='mb-0'>Click 'Delete' to proceed</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <div
                className='btn btn-outline-secondary mr-2'
                onClick={() =>
                  setState({
                    ...state,
                    show_delete: false,
                  })
                }>
                Cancel
              </div>
              <div className='terminate1' onClick={() => deletePipeItem()}>
                {isloading ? "Deleting" : "Delete"}
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
                Invoice Details
              </div>
              <Button
                className='payspecialist1 h36'
                onClick={() => window.print()}>
                Print
              </Button>
            </div>
            <div className='text-right	'>
              {invoice_details?.worksheet == null ? (
                <Button
                  className='payspecialist1 h36'
                  onClick={create_work_sheet}>
                  {isloading ? "processing" : "Create work sheet"}
                </Button>
              ) : (
                <Link
                  to={`/admin_worksheet/${invoice_details?.worksheet?.id}/${invoice_details?.work_order_id}`}>
                  <Button className='payspecialist1 h36'>
                    {isloading ? "processing" : "View work sheet"}
                  </Button>
                </Link>
              )}
            </div>
            <Row className='mgtop'>
              <Col md={12} className='mgtop345'>
                <div className='job23_1a hidden__1'>
                  <div className=''>
                    <div className='overview12 overviewflex-down'>
                      <Col md={12} className='plf'>
                        <div className=''>
                          {invoice_details?.status == "Unpaid" && (
                            <div className='box_inv outerpink'>
                              <span className='box_smalltick smalltickpink'></span>
                              {invoice_details?.status}
                            </div>
                          )}
                          {invoice_details?.status == "Paid" && (
                            <span>
                              <span className='acceptedinvoc'>Paid</span>
                            </span>
                          )}
                          <div className='boxwrapper__1'>
                            <div className='lcomponent'>
                              <div className='inv_title'>
                                Invoice : {invoice_details?.number ?? "~~/~~"}
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'>
                                  <span className='acceptedinvoc'>
                                    {!invoice_details.sent_at
                                      ? "Not Sent"
                                      : "Accepted"}
                                  </span>
                                </div>
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Invoice Date</div>
                                <div className='inv_title4'>
                                  {formatTime(invoice_details?.date) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <img src={logo} alt='' className='Simage' />
                              <div
                                className='Stext2'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    invoice_details?.company_address ?? "n/a",
                                }}></div>
                            </div>
                          </div>
                          <hr />
                          <div className='boxwrapper__1 inv9'>
                            <div className='lcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Client</div>
                                <div className='inv_title4 ing'>
                                  {work_order_detail?.contractor}
                                </div>
                                <div className='inv_title3 inv_titlex '>
                                  {work_order_detail?.country}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Amount</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(invoice_details?.amount) ??
                                    "~~/~~"}
                                </div>
                              </div>
                            </div>
                            {/* <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Balance Due</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_unpaid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <div className='ing_11'>
                            {isloading && (
                              <Spinner animation={"grow"} variant='info' />
                            )}
                            <div className='text-right mgg2'></div>
                          </div>
                        </div>
                        {invoice_details?.items?.length > 0 && (
                          <div className='accordion-body'>
                            <Table hover responsive>
                              <thead>
                                <tr>
                                  <th scope='col'>SN</th>
                                  <th scope='col'>AMOUNT(NGN)</th>
                                  <th scope='col'>PIPE SIZE</th>
                                  <th scope='col'>PIPE SCHEDULE</th>
                                  <th scope='col'>NO OF JOINTS</th>
                                  <th scope='col'>DESCRIPTION</th>
                                  <th scope='col'>ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.items?.map((data, i) => (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{FormatAmount(data?.amount)}</td>
                                    <td>{data?.pipe_size?.size}</td>
                                    <td>{data?.pipe_schedule?.value}</td>
                                    <td>{data?.joints}</td>
                                    <td className='contractorname'>
                                      {data?.description}
                                    </td>
                                    <td className='contractorname'>
                                      <span
                                        className='mr-1 ml-2 cursor-pointer'
                                        title='Edit'
                                        onClick={() => {
                                          setState({
                                            ...state,
                                            edit_worksheet_modal: true,
                                            ...data,
                                            edit_item_id: data?.id,
                                            no_of_joints: data?.joints,
                                            pipe_schedule:
                                              data?.pipe_schedule?.id,
                                            pipe_schedule_name:
                                              data?.pipe_schedule?.value,
                                            pipe_size: data?.pipe_size?.size,
                                            size: data?.pipe_size?.id,
                                            size_value: data?.pipe_size?.size,
                                          });
                                        }}>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          className='bi bi-pencil'
                                          viewBox='0 0 16 16'>
                                          <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                                        </svg>
                                      </span>
                                      <span
                                        className='cursor-pointer'
                                        onClick={() => {
                                          setState({
                                            ...state,
                                            show_delete: true,
                                            edit_item_id: data?.id,
                                          });
                                        }}
                                        title='Delete'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          className='bi bi-trash'
                                          viewBox='0 0 16 16'>
                                          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                          <path
                                            fill-rule='evenodd'
                                            d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                          />
                                        </svg>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        )}
                        <div className='text-center'>
                          {invoice_details?.items?.length === 0 && (
                            <p>No item record available</p>
                          )}
                          {!invoice_details?.sent && (
                            <p>
                              {" "}
                              <Button
                                className='payspecialist1 h36'
                                onClick={() => {
                                  setState({
                                    ...state,
                                    add_invoice_modal: true,
                                  });
                                }}>
                                Add items
                              </Button>
                            </p>
                          )}
                        </div>
                        <div className='allpayment00'>
                          <div className='allpayment1'>
                            All payments go to the account details below
                          </div>
                          {
                            <div className='fbn1'>
                              <div className='bnclass'>
                                <span className='lightcolor'> Bank name:</span>
                                {invoice_details?.bank_account?.bank_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account name:
                                </span>
                                {invoice_details?.bank_account?.account_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account number:
                                </span>
                                {invoice_details?.bank_account?.account_number}
                              </div>
                            </div>
                          }
                          {/* {invoice_details?.bank_accounts?.map((data, i) => (
                            <div className='fbn1'>
                              <div className='bnclass'>{data.bank}</div>
                              <div className='bnclass'>
                                {data.account_number}
                              </div>
                              <div className='bnclass'>{data.account_name}</div>
                            </div>
                          ))} */}
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='row3456 row3t2 rowt3'>
          <Col md={12}>
            <div
              className='accordion accordion-flush'
              id='accordionFlushExample'>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingThree'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseThree'
                    aria-expanded='false'
                    aria-controls='flush-collapseThree'>
                    <b>Project Description</b>
                  </button>
                </h2>
                <div
                  id='flush-collapseThree'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingThree'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <p>{work_order_detail?.description}</p>
                  </div>
                </div>
              </div>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingOne'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseOne'
                    aria-expanded='true'
                    aria-controls='flush-collapseOne'>
                    <b> PIPELINE WELDING BREAKDOWN </b>
                  </button>
                </h2>
                <div
                  id='flush-collapseOne'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingOne'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Pipe Size</th>
                          <th>Length</th>
                          <th>Pipe Schedule</th>
                          <th>Number of Joints</th>
                          <th>Cost Per Joint (NGN)</th>
                          <th>Total Amount (NGN)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pipe_breakdown?.map((data: any, i) => (
                          <tr key={i}>
                            <td>{data?.size}</td>
                            <td>{FormatAmount(data?.length)}</td>
                            <td>
                              {FormatAmount(data?.pipe_schedule) ?? "n/a"}
                            </td>
                            <td>{FormatAmount(data?.joints)}</td>
                            <td>
                              {FormatAmount(data?.cost_per_joint ?? "n/a")}
                            </td>
                            <td>
                              {FormatAmount(data?.contractor_cost) ?? "n/a"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className='gtotal'>
                      <span>Grand total</span>
                      <span>
                        NGN
                        {FormatAmount(
                          work_order_detail?.costing?.contractor_cost
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingTwo'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseTwo'
                    aria-expanded='false'
                    aria-controls='flush-collapseTwo'>
                    <b> LIST OF COST EXCLUSIONS </b>{" "}
                    <span
                      className='addentry2'
                      onClick={() => handleShow("create_exclusion")}>
                      Add entry
                    </span>
                  </button>
                </h2>

                <div
                  id='flush-collapseTwo'
                  className='accordion-collapse collapse show'
                  aria-labelledby='flush-headingTwo'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <p>
                      <ul>
                        {invoice_details?.cost_exclusions
                          ?.split("\n")
                          ?.map((data, i) => (
                            <li> {data}</li>
                          ))}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='invoicefooter'>
          <Col md={12}>
            <h5>
              Conditions{" "}
              <span className='addentry2' onClick={() => handleShow1()}>
                Add entry
              </span>
            </h5>

            <p>The Profoma Invoice is based on COST PER JOINT and covers:</p>
            <Row>
              <Col md={12}>
                {invoice_details?.conditions?.split("\n")?.map((data, i) => (
                  <p>{data}</p>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <div className='nxtbck btmadjustment'>
              <HashLink
                to={`/admin_view/${invoice_details?.work_order?.contractor_id}/contractor_invoice/${invoice_details?.id}`}>
                <div className='gent122 gent12212'>
                  {"Contractor Invoice Preview"}
                </div>
              </HashLink>
            </div> */}
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

export default Admin_Sub_Invoice_Details;
