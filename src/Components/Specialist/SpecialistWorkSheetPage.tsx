import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Alert,
  Table,
  Button,
} from "react-bootstrap";
import "../Admin/contractor.css";
import DashboardNav from "./specialistNavbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import WorkDetails_Form_Preview from "./workdetailsform";
import { NavHashLink } from "react-router-hash-link";
import axios, { AxiosResponse } from "axios";
import { API, formatTime } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payments from "./payments";
import closeimg from "../../images/closeimg.png";

const SpecialistWorkSheetPage = (props) => {
  const [state, setState]: any = useState({
    work_order_detail: {},
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    show: false,
    reason: "",
    work_group: {},
    isloading: false,
    filename: "",
    worksheet_reports: [{}],
    is_group_leader: false,
    add_worksheet_modal: false,
    errorMessage: "",
    successMessage: "",
    show1: false,
    date: "",
    work_sheet_file: "",
    spread_name: "",
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
    edit_worksheet_modal: false,
  });
  const {
    work_group,
    spread_name,
    edit_worksheet_modal,
    date,
    worksheet_reports,
    pipe_schedule_name,
    pipe_schedules,
    pipeSizes,
    no_of_joints,
    pipe_size,
    pipe_schedule,
    show1,
    size,
    size_value,
    errorMessage,
    successMessage,
    add_worksheet_modal,
    isloading,
    edit_item_id,
    show,
    id,
  }: any = state;
  const onchange = (e) => {
    
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    fetch_all();
  }, []);
  const fetch_all = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/specialist/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(
          `${API}/specialist/work-orders/${work_order_details?.id}/worksheets`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get<any, AxiosResponse<any>>(`${API}/skills?spreadable=0`),
        axios.get<any, AxiosResponse<any>>(`${API}/pipes`),
        axios.get<any, AxiosResponse<any>>(`${API}/pipe-schedules`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get<any, AxiosResponse<any>>(`${API}/pipe-sizes`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])

      .then(
        axios.spread((res, res2, response, response2, response3, response4) => {
          
          setState({
            ...state,
            ...res.data.data,
            work_order_detail: res.data.data,
            work_group: res.data.data.work_group,
            worksheet_reports: res2.data.data.data,
            types_of_Specialist: response.data.data,
            pipeList: response2.data.data,
            pipe_schedules: response3.data.data,
            pipeSizes: response4.data.data,
            add_worksheet_modal: false,
          });
        })
      )
      .catch((err) => {
        
      });
  };
  const notify = (message: string, type = "B") => {
    toast(message, { containerId: type, position: "top-right" });
  };
  const hiddenFileInput: any = useRef();

  const validateForm = () => {
    if (pipe_schedule == "" || !no_of_joints || !size_value) {
      setState({
        ...state,
        errorMessage: "All fields are required",
      });
    } else {
      createPipeItem();
    }
  };
  const workModal = () => {
    setState({
      ...state,
      add_worksheet_modal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      add_worksheet_modal: false,
    });
  };
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");

  const onchange_pipeschedule = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    
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
    
    setState({
      ...state,
      size_value: new_obj.name,
      size: new_obj.id,
      errorMessage: "",
    });
  };
  const createPipeItem = () => {
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
    };
    
    axios
      .post(`${API}/specialist/work-orders/worksheets/${id}/pipes`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        
        notify("Successfully created");
        setTimeout(() => {
          fetch_all();
        }, 100);
        setState({
          ...state,
          isloading: false,
          add_worksheet_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
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
    };
    axios
      .put(
        `${API}/specialist/work-orders/worksheets/pipes/${edit_item_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        notify("Successfully Updated");
        setTimeout(() => {
          fetch_all();
        }, 2000);
        setState({
          ...state,
          isloading: false,
          add_worksheet_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          add_worksheet_modal: false,
        });
        
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update" + " " + err?.response?.data?.message);
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
      .delete(
        `${API}/specialist/work-orders/worksheets/pipes/${edit_item_id}`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        
        notify("Successfully deleted");
        setTimeout(() => {
          fetch_all();
        }, 2000);
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to delete");
      });
  };
  const submitWorkSpread = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    axios
      .post(
        `${API}/specialist/work-orders/worksheets/${id}/submit`,
        {},
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        
        notify("Successfully Submitted");
        setTimeout(() => {
          fetch_all();
        }, 2000);
        setState({
          ...state,
          isloading: false,
          add_worksheet_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to Send");
      });
  };
  
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <Modal
        size='sm'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Delete Worksheet Data
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
                    show: false,
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
      <Modal
        size='sm'
        show={show1}
        onHide={() =>
          setState({
            ...state,
            show1: false,
          })
        }>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
          Submit Worksheet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <div className='alert' role='alert'>
                <h6 className='alert-heading'>Confirm Action</h6>
                <p>
                  This action would submit all information contained in this
                  spread and this cannot be undone
                </p>
                <hr />
                <p className='mb-0'>Click 'Proceed' to continue</p>
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
                    show1: false,
                  })
                }>
                Cancel
              </div>
              <div
                className='btn btn-success'
                onClick={() => submitWorkSpread()}>
                {isloading ? "Processing" : "Proceed"}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true}>
        <Modal
          centered={true}
          onHide={closeworkModal}
          show={add_worksheet_modal}>
          <div className='add_worksheet_modalwrap p-3'>
            <div className='add_worksheet_modaltitle text-center'>
              Add Work Sheet Data
            </div>
            {successMessage && (
              <Alert key={2} variant='success' className='alertmessg'>
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert key={2} variant='danger' className='alertmessg'>
                {errorMessage}
              </Alert>
            )}
            <Row>
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
            </Row>
            <div className='wrkmodal-btnwrap'>
              <span className='wrkmodal-cancelbtn' onClick={closeworkModal}>
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
              Edit Work Sheet Data
            </div>
            {successMessage && (
              <Alert key={2} variant='success' className='alertmessg'>
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert key={2} variant='danger' className='alertmessg'>
                {errorMessage}
              </Alert>
            )}
            <Row>
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
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Specialist Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <div id='overview'></div>
        <Row className='splrowt3 row3t2'>
          <Col md={12} className='job34'>
            <div className='title_wo title_wo12'>
              <div className='workorderheader fixedtitle'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>{" "}
                Work Details
              </div>
            </div>
            <Row className='splstdetcardmgtop'>
              <Col md={12} className=''>
                <div className='job23_1a'>
                  <div className='job23_1a wrap_z p-5'>
                    <div className='active_member23'>
                      <h3 className="fs-3 mb-4">Invoice Worksheets</h3>
                      <div className="table-responsive">
                        <table className="table table-bordered w-100 nowrap">
                          <thead className="table-light">
                            <tr>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Status</th>
                              <th>Reference</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {worksheet_reports?.map((item, i) => (
                            <tr>
                              <td>{formatTime(item?.start_date)}</td>
                              <td>{formatTime(item?.end_date)}</td>
                              <td>{item?.status=="Pending"?<span className="badge bg-warning">Pending</span>:<span className="badge bg-success">Completed</span>}</td>
                              <td>{item?.reference}</td>
                              <td><Link to={`/specialist_worksheet_details/${item.id}`}>view</Link></td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                      {worksheet_reports?.map((item, i) => (
                        <div
                          className='accordion accordion-flush'
                          id={`accordionFlushExample+${i}`}>
                          <div className='accordion-item'>
                            <div
                              id='flush-collapseOne'
                              className='accordion-collapse collapse show'
                              aria-labelledby='flush-headingOne'
                              data-bs-parent={`#accordionFlushExample+${i}`}>
                              <div className='accordion-body'>
                                {/* <Table hover responsive>
                                  <thead>
                                    <tr>
                                      <th scope='col'>SN</th>
                                      <th scope='col'>PIPE SIZE</th>
                                      <th scope='col'>PIPE SCHEDULE</th>
                                      <th scope='col'>NO OF JOINTS</th>
                                      <th scope='col'>NO OF INCHES</th>
                                      <th scope='col'>ACTION</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item?.items?.map((data, i) => (
                                      <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data?.pipe_size?.size}</td>
                                        <td>{data?.pipe_schedule?.value}</td>
                                        <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                                          <div className='dplsplusernmeimg'>
                                            &nbsp; &nbsp;
                                            <div>{data?.joints}</div>
                                          </div>
                                        </td>
                                        <td className='contractorname'>
                                          {data?.inches}
                                        </td>
                                        <td className='contractorname'>
                                          <span
                                            className='mr-1 ml-2 cursor-pointer'
                                            title='Edit'
                                            onClick={() => {
                                              setState({
                                                ...state,
                                                edit_worksheet_modal: true,
                                                edit_item_id: data?.id,
                                                no_of_joints: data?.joints,
                                                pipe_schedule:
                                                  data?.pipe_schedule?.id,
                                                pipe_schedule_name:
                                                  data?.pipe_schedule?.value,
                                                pipe_size:
                                                  data?.pipe_size?.size,
                                                size: data?.pipe_size?.id,
                                                size_value:
                                                  data?.pipe_size?.size,
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
                                                show: true,
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
                                </Table> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <h6 className="title22 title22r2" id="actions">
                    Actions
                  </h6>
                  <div className="job23_1a wrap_z">
                    <div className="main_wrap_ws main_wrapp1">
                      <h3 className="userprofile12 userprofile123">
                        Quit Work
                      </h3>
                      <p className="Construction12">
                        To quit a project that has been placed, a quit request
                        has to be sent to the admin to process.
                      </p>
                      <div className="text-left">
                        <div
                          className="terminate1"
                          onClick={(e) => openModal(e, "Terminate")}
                        >
                          Terminate
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SpecialistWorkSheetPage;
