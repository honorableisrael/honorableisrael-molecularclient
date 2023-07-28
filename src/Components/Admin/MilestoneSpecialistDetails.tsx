import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Modal,
  Form,
  Alert,
  Pagination,
  Button,
} from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./navbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/dashbdlogo.png";
import {
  API,
  FormatAmount,
  formatTime,
  notify,
  specialistToken,
  current_currency,
  reloadPage,
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import closeimg from "../../images/closeimg.png";
import exclam from "../../images/exclammark.png";
import { CustomButton } from "./Shared/Button";




const MilestoneSpecialistDetails = (props) => {
  const [state, setState] = useState < any > ({
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
    reason: "",
    work_order_detail: {},
    terminateWorkModal: false,
    requested_amount: "",
    errorMessage: "",
    successMessage: "",
    milestone: [],
    work_order: {},
    id: "",
    specialist_cost_per_inch: "",
    association_cost: "",
    PaymentErrorMessage: false,
    max_requested_amount: "",
    rate: 0.7,
  });
  const [modalState, setModalState] = useState({
    show: false,
    show2: false,
    showDelete: false,
  });
  const { show, show2, showDelete } = modalState;
  const {
    work_order,
    work_order_detail,
    milestone,
    errorMessage,
    PaymentErrorMessage,
    invoice_details,
    requested_amount,
    terminateWorkModal,
    max_requested_amount,
    successMessage,
    isloading,
    cycle_id,
    start_date,
    end_date,
    fitter_ratio,
    welder_ratio,
    description,
    specialist_cost_per_inch,
    association_cost,
    rate,
    id,
  }: any = state;

  const workModal = (id, amount) => {
    setState({
      ...state,
      cycle_id: id,
      max_requested_amount: amount,
      requested_amount: amount,
      // requested_amount: (rate * amount)?.toFixed(2),
      terminateWorkModal: true,
    });
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const closeDeleteModal = () => {
    setModalState({
      ...modalState,
      showDelete: false,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/milestones/specialists/${props?.match?.params?.id}`,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res4) => {
          setState({
            ...state,
            ...res4.data.data,
            milestone: res4.data.data,
            work_order: res4.data,
          });
        })
      )
      .catch((err) => {
      });
  }, []);

  const ApprovePayment = (cycle_id) => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("loggedInDetails");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      amount: requested_amount,
    };
    axios
      .post(
        `${API}/admin/work-orders/specialist-early-payments/${cycle_id}/approve`,
        data,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {
        notify("payment requested successfully");
        reloadPage();
        setState({
          ...state,
          isloading: false,
          terminateWorkModal: false,
        });
      })
      .catch((err) => {
        notify("Request failed");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const toggleErrormessage = () => {
    setState({
      ...state,
      PaymentErrorMessage: true,
    });
  };
  const toggleErrormessageClose = () => {
    setState({
      ...state,
      PaymentErrorMessage: false,
    });
  };
  const fieldRef: any = useRef();
  useEffect(() => {
    if (PaymentErrorMessage && fieldRef) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [PaymentErrorMessage]);

  const showModal = () => {
    setModalState({
      ...modalState,
      show: true,
    });
    setState({
      ...state,
      start_date: "",
      end_date: "",
      fitter_ratio: "",
      welder_ratio: "",
      description: "",
    });
  };
  const hideModal = () => {
    setModalState({
      ...modalState,
      show: false,
      show2: false,
    });
  };
  const showModal2 = (selectedMilestone) => {
    setModalState({
      ...modalState,
      show: true,
      show2: true,
    });
    setState({
      ...state,
      ...selectedMilestone,
    });
  };
  const showModal3 = (selectedMilestone) => {
    setModalState({
      ...modalState,
      show: false,
      show2: false,
      showDelete: true,
    });
    setState({
      ...state,
      ...selectedMilestone,
    });
  };

  // const hideModal2 = (selectedMilestone) => {
  //   setModalState({
  //     ...modalState,
  //     show: false,
  //   });
  // };

  const CreateUpdateMilestone = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      start_date,
      end_date,
      fitter_ratio,
      welder_ratio,
      description,
      specialist_cost_per_inch,
      association_cost
    };
    axios
      .post(
        `${API}/admin/work-orders/${props.match.params.id}/milestones`,
        data,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        notify("Milestone record added");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("Operation failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const UpdateMilestone = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      start_date,
      end_date,
      fitter_ratio,
      welder_ratio,
      description,
      specialist_cost_per_inch,
      association_cost
    };
    axios
      .put(`${API}/admin/work-orders/milestones/${id}`, data, {
        headers: {
          Authorization: `Bearer ${returnAdminToken().access_token}`,
        },
      })
      .then((res) => {
        notify("Milestone record updated");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("Updated failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const DeleteMilestone = () => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .delete(`${API}/admin/work-orders/milestones/${id}`, {
        headers: {
          Authorization: `Bearer ${returnAdminToken().access_token}`,
        },
      })
      .then((res) => {
        notify("Milestone record deleted");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        notify("Updated failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
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
  console.log(milestone)
  return (
    <>
      <Modal centered={true} onHide={closeDeleteModal} show={showDelete}>
        <div className='terminateworkmodalwrap'>
          <div className='terminateworkmodalimg'>
            <img src={closeimg} alt='close' onClick={closeDeleteModal} />
          </div>
          <div className='terminateworkmodaltitle'> Confirm Delete Action </div>
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
          <div className='splinvoicemodalmssgwrap'>
            <i
              className='fa fa-exclamation fa-rotate-180 invoiceexclm'
              aria-hidden='true'></i>
            <p>This action would permanently erase this milestone record</p>
          </div>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeDeleteModal}>
              Cancel
            </span>
            <span
              className='profcertbtn upfrmodalbtn'
              onClick={() => DeleteMilestone()}>
              {!isloading ? "Delete" : "Processing..."}
            </span>
          </div>
        </div>
      </Modal>
      <Container fluid={true}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Specialist Management</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='dshworksectnrow1' ref={fieldRef}>
          <Col md={11} className='job34'>
            <div className='title_wo'>
              <div className='workorderheader workorderheader1'>
                {" "}
                <img
                  src={arrowback}
                  className='arrowback'
                  onClick={() => {
                    window?.history?.back();
                  }}
                />
                <div className='pl-2'>Specialist Details</div>
              </div>
            </div>

            {PaymentErrorMessage && (
              <div className='wrktimelinediv'>
                <img src={exclam} alt='img' />
                <p>sorry you cannot make an Early payment request now</p>
                <div
                  className='terminateworkmodalimg'
                  onClick={toggleErrormessageClose}>
                  <i className='fa fa-times'></i>
                </div>
              </div>
            )}
            <div className='spltpaybreakdwnwrapper'>
              <p className='spltpaybreakdwn-title'>{work_order_detail.title}</p>
              <div className='spltpaybreakdwn-details'></div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card-details-wrap1">
                    <div className="card-header">
                      <h5 className="card-title">Specailist Details</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <table className="table table-sm">
                          <tbody className="border-visible">
                            <tr>
                              <td  className="col-sm-2"> First Name</td>
                              <td>{milestone?.specialist?.first_name}</td>
                            </tr>
                            <tr>
                              <td  className="col-sm-2"> Last Name</td>
                              <td>{milestone?.specialist?.last_name}</td>
                            </tr>
                            <tr>
                              <td> Email</td>
                              <td>{milestone?.specialist?.email??"n/a"}</td>
                            </tr>
                            <tr>
                              <td> Phone</td>
                              <td>{milestone?.specialist?.phone??"n/a"}</td>
                            </tr>
                            <tr>
                              <td> Status</td>
                              <td>{milestone?.specialist?.status??"n/a"}</td>
                            </tr>
                            <tr>
                              <td> Rating</td>
                              <td>{milestone?.specialist?.rating??"n/a"}</td>
                            </tr>
                            <tr>
                              <td>Amount</td>
                              <td>{milestone?.amount??"n/a"}</td>
                            </tr>
                            <tr>
                              <td>Amount Paid</td>
                              <td>{milestone?.amount_paid??"n/a"}</td>
                            </tr>
                            <tr>
                              <td>Amount Outstanding</td>
                              <td>{milestone?.amount_outstanding??"n/a"}</td>
                            </tr>
                            <tr>
                              <td>Early milestone Percentage</td>
                              <td>{milestone?.early_milestone_percentage??"n/a"}</td>
                            </tr>
                            <tr>
                              <td>Status</td>
                              <td>{milestone?.status}</td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName='bg-danger text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <Modal
        size='sm'
        show={show}
        onHide={() => hideModal()}
        dialogClassName=''
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            {show2 ? "Update MileStone" : "Create MileStone"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <Row>
                  <Col md={6} className='formsection1 formsection_padding_zero'>
                    <Form.Group>
                      <h5 className='userprofile'>Start Date</h5>
                      <Form.Control
                        type='date'
                        value={start_date}
                        className='userfield'
                        name='start_date'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='formsection1 formsection_padding_zero'>
                    <Form.Group>
                      <h5 className='userprofile'>End Date</h5>
                      <Form.Control
                        type='date'
                        value={end_date}
                        className='userfield'
                        name='end_date'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className='formsection1 formsection_padding_zero'>
                    <Form.Group>
                      <h6 className='userprofile'>Description</h6>
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
                  <Col md={6} className='formsection1'>
                    <Form.Group>
                      <h6 className='userprofile'>Welder Ratio</h6>
                      <Form.Control
                        type='number'
                        value={welder_ratio}
                        className='userfield'
                        name='welder_ratio'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='formsection1'>
                    <Form.Group>
                      <h6 className='userprofile'>Fitter Ratio</h6>
                      <Form.Control
                        type='number'
                        value={fitter_ratio}
                        className='userfield'
                        name='fitter_ratio'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>

                  <Col md={6} className='formsection1'>
                    <Form.Group>
                      <h6 className='userprofile'>Association Cost</h6>
                      <Form.Control
                        type='number'
                        value={association_cost}
                        className='userfield'
                        name='association_cost'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='formsection1'>
                    <Form.Group>
                      <h6 className='userprofile'>Specialist Cost Per Inch</h6>
                      <Form.Control
                        type='number'
                        value={specialist_cost_per_inch}
                        className='userfield'
                        name='specialist_cost_per_inch'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2 back11a'>
              <div className='terminate1 back11' onClick={() => hideModal()}>
                Cancel
              </div>
              <div className='job2'>
                <div className=' back11app'>
                  {!show2 ? (
                    <CustomButton
                      name={"Submit"}
                      onClick={CreateUpdateMilestone}
                      disabled={false}
                      customeStyle={"assign_specailist"}
                      isBusy={isloading}
                    />
                  ) : (
                    <CustomButton
                      name={"Save Details"}
                      onClick={UpdateMilestone}
                      disabled={false}
                      customeStyle={"assign_specailist"}
                      isBusy={isloading}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MilestoneSpecialistDetails;
