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
import { EditIcon } from "./Shared/EditIcon";
import { BinIcon } from "./Shared/BinIcon";
import { ViewIcon } from "./Shared/ViewMore";
import { Toggler } from "./Shared/Toggler";

const MilestoneManagement = (props) => {
  const [state, setState] = useState<any>({
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
    milestone_record: [],
    work_order: {},
    id: "",
    specialist_per_inch: "",
    association_cost: "",
    PaymentErrorMessage: false,
    max_requested_amount: "",
    rate: 0.7,
    welder_ratio:"",
    fitter_ratio:"",
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
    milestone_record,
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
    specialist_per_inch,
    association_cost,
    rate,
    id,
  }: any = state;

  const workModal = (id, amount) => {
    //console.log(id);
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
    //console.log(e.target.value);
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
    //console.log(props?.match?.params?.id);
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${props?.match?.params?.id}/milestones`,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res4) => {
          //console.log(res4.data);
          setState({
            ...state,
            ...res4.data.data,
            milestone_record: res4.data.data,
            work_order: res4.data,
          });
        })
      )
      .catch((err) => {
        //console.log(err.response);
      });
  }, []);

  const ApprovePayment = (cycle_id) => {
    setState({
      ...state,
      isloading: true,
    });
    //console.log(cycle_id);
    const availableToken = localStorage.getItem("loggedInDetails");
    //console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    //console.log(token);
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
        //console.log(res.data);
        notify("payment requested successfully");
        reloadPage();
        setState({
          ...state,
          isloading: false,
          terminateWorkModal: false,
        });
      })
      .catch((err) => {
        //console.log(err.response);
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

  //console.log(milestone_record, "milestone_record");
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
      welder_ratio:selectedMilestone?.specialist_earning_ratio?.welder,
      fitter_ratio:selectedMilestone?.specialist_earning_ratio?.fitter
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
      specialist_per_inch,
      association_cost,
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
        //console.log(res.data);
        notify("Milestone record added");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        //console.log(err.response);
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
      specialist_per_inch,
      association_cost,
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
        setModalState({
          ...modalState,
          show:false
        })
      })
      .catch((err) => {
        //console.log(err.response);
        notify("Updated failed, please try again later",err?.response?.data?.message);
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
        // console.log(err.response);
        notify("Updated failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };

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
          <title>MolecularPro - Milestone Management</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='dshworksectnrow1' ref={fieldRef}>
          <Col md={12} className='job34'>
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
                <div className='pl-2'>Milestone Management</div>
              </div>
              <div className=''>
                <CustomButton
                  name={"Create Milestone"}
                  onClick={showModal}
                  disabled={false}
                  customeStyle={"assign_specailist"}
                  isBusy={isloading}
                />
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
              <div>
                <Table
                  hover
                  size='md'
                  responsive
                  className='schedule_payment_table'>
                  <thead className='splinvoitablehead'>
                    <tr>
                      <th>S/N</th>
                      <th style={{ minWidth: "8rem" }}>Reference</th>
                      <th style={{ minWidth: "10rem" }}>Start Date</th>
                      <th style={{ minWidth: "10rem" }}>End Date</th>
                      <th style={{ minWidth: "8rem" }}>Description</th>
                      <th style={{ minWidth: "9rem" }}>Weeks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestone_record?.data?.map((data, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data?.reference}</td>
                        <td>{formatTime(data?.start_date)} </td>
                        <td>{formatTime(data?.end_date)}</td>
                        <td>{data?.description}</td>
                        <td>{data?.weeks}</td>
                        <td className='table_data flex align-center'>
                          <Toggler
                            showModal2={() => showModal2(data)}
                            linkTitle1='Manage Specialist'
                            LinkProps1={`/admin_milestone_manage_specialist/${data?.id}/${data?.work_order_id}`}
                            linkTitle2='View Details'
                            LinkProps2={`/admin_milestone_details/${data?.id}`}
                          />
                          {/* {data?.actions.can_delete ? (
                            <span
                              title='Delete Item'
                              className='ml-1 cursor-pointer'
                              onClick={() => {
                                showModal3(data);
                              }}>
                              <BinIcon />
                            </span>
                          ) : (
                            ""
                          )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            {/* <div className='upfnthistoryheader'>Early Payment History</div>
            <div className='spltpaybreakdwnwrapper'>
              <div>
                <Table hover size='md' responsive>
                  <thead className='splinvoitablehead'>
                    <tr>
                      <th>S/N</th>
                      <th style={{ minWidth: "8rem" }}> Amount</th>
                      <th style={{ minWidth: "8rem" }}>Status</th>
                      <th style={{ minWidth: "8rem" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_history?.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {current_currency}
                          {FormatAmount(data.amount)}
                        </td>
                        <td>
                          {data.status == "Paid" && (
                            <div>
                              <span className='historypaystattext paidinvtxt'>
                                Paid
                              </span>
                            </div>
                          )}
                          {data.status == "Unpaid" && (
                            <div>
                              <span className='historypaystattext pendininvtext'>
                                Pending
                              </span>
                            </div>
                          )}
                          {data.status == "Declined" && (
                            <div>
                              <span className='historypaystattext terminainvtxt'>
                                Declined
                              </span>
                            </div>
                          )}
                        </td>
                        <td>{formatTime(data.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div> */}
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
                  <Col
                    md={12}
                    className='formsection1 formsection_padding_zero'>
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
                        value={specialist_per_inch}
                        className='userfield'
                        name='specialist_per_inch'
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

export default MilestoneManagement;
