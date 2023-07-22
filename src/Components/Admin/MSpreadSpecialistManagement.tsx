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
import makeAnimated from "react-select/animated";
import Select from "react-select";
import SuiSelect from "./Shared/SuiSelect";
const animatedComponents = makeAnimated();

const MSpreadSpecialistManagement = (props) => {
  const [state, setState] = useState<any>({
    work_orders: [],
    invoice_details: {},
    country: "",
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    isloading: false,
    reason: "",
    name: "",
    work_order_detail: {},
    terminateWorkModal: false,
    requested_amount: "",
    errorMessage: "",
    successMessage: "",
    spread_record: [],
    work_order: {},
    list_of_specialist: [],
    selected_specialist: [],
    all_specialist2: [],
    id: "",
    cycle_id: "",
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
    spread_record,
    errorMessage,
    PaymentErrorMessage,
    list_of_specialist,
    selected_specialist,
    all_specialist2,
    requested_amount,
    terminateWorkModal,
    max_requested_amount,
    successMessage,
    isloading,
    cycle_id,
    description,
    name,
    id,
  }: any = state;
  const workModal = (id, amount) => {
    console.log(id);
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
    console.log(e.target.value);
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
    console.log(props?.match?.params?.id);
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/milestones/${props?.match?.params?.id}/specialists`,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
        axios.get(
          `${API}/admin/work-orders/${props?.match?.params?.work_order_id}/specialists`,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log(res2, "work orders specialist");
          console.log(res1.data, "milestone specialist");
          setState({
            ...state,
            list_of_specialist: res1?.data?.data,
            all_specialist2: res2?.data?.data,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

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

  const AssignSpecialist = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      specialists: selected_specialist,
    };
    axios
      .post(
        `${API}/admin/work-orders/milestones/${props.match.params.id}/assign-specialists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        notify("Spread record added");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        notify("Operation failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const UpdateSpread = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      name,
      description,
    };
    axios
      .put(`${API}/admin/work-orders/milestones/spreads/${id}`, data, {
        headers: {
          Authorization: `Bearer ${returnAdminToken().access_token}`,
        },
      })
      .then((res) => {
        notify("Spread record updated");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        notify("Updated failed, please try again later");
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        });
      });
  };
  const RemoveSpecialist = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      specialists: [id],
    };
    axios
      .post(
        `${API}/admin/work-orders/milestones/${props.match.params.id}/unassign-specialists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${returnAdminToken().access_token}`,
          },
        }
      )
      .then((res) => {
        notify("Spread record deleted");
        reloadPage();
        setState({
          ...state,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
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
          <div className='terminateworkmodaltitle'>
            {" "}
            Remove Specialist from Milestone{" "}
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
          <div className='splinvoicemodalmssgwrap'>
            <i
              className='fa fa-exclamation fa-rotate-180 invoiceexclm'
              aria-hidden='true'></i>
            <p>This action would unassign this specialist from the milestone</p>
          </div>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeDeleteModal}>
              Cancel
            </span>
            <span
              className='profcertbtn upfrmodalbtn'
              onClick={() => RemoveSpecialist()}>
              {!isloading ? "Remove Specialist" : "Processing..."}
            </span>
          </div>
        </div>
      </Modal>
      <Container fluid={true}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Invoice Assigned Specialist</title>
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
                <div className='pl-2'>MileStone Assigned Specialist</div>
              </div>
              <div className=''>
                <CustomButton
                  name={"Assign Specialists"}
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
                      <th style={{ minWidth: "9rem" }}>Firstname</th>
                      <th style={{ minWidth: "9rem" }}>Lastname</th>
                      <th style={{ minWidth: "8rem" }}>Phone</th>
                      <th style={{ minWidth: "8rem" }}>Work Rate</th>
                      <th style={{ minWidth: "10rem" }}>Rating</th>
                      <th style={{ minWidth: "10rem" }}>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list_of_specialist?.data?.map((data, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data?.specialist?.first_name}</td>
                        <td>{data?.specialist?.last_name}</td>
                        <td>{data?.phone}</td>
                        <td>{data?.work_rate}</td>
                        <td>{data?.rating}</td>
                        <td>
                          {data?.status == "active" && (
                            <div className='invpaystatwrap po912'>
                              <span className='paystatindcator po912'></span>
                              <span className='paystattext text-success'>
                                Active
                              </span>
                            </div>
                          )}
                          {data?.status == "Completed" && (
                            <div className='invpaystatwrap pendinwrap po912'>
                              <span className='paystatindcator pendininvoice po912'></span>
                              <span className='paystattext pendininvtext po912'>
                                Completed
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {data?.actions.can_edit ? (
                            <span
                              title='Edit Invoice'
                              className='mr-1 cursor-pointer'
                              onClick={() => {
                                showModal2(data);
                              }}>
                              <EditIcon />
                            </span>
                          ) : (
                            ""
                          )}
                          {
                            <span
                              title='Remove Specialist'
                              className='ml-1 cursor-pointer'
                              onClick={() => {
                                showModal3(data);
                              }}>
                              <BinIcon />
                            </span>
                          }
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
        size='lg'
        show={show}
        onHide={() => hideModal()}
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            {show2 ? "Update " : "Assign Specialists"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <Row>
                  <Col
                    md={12}
                    className='formsection1 formsection_padding_zero'>
                    <Form.Group>
                      <h6 className='userprofile'>Select Specialist</h6>
                      {/* <Form.Control
                        type='textarea'
                        value={description}
                        className='userfield'
                        name='description'
                        onChange={onchange}
                        placeholder=''
                      /> */}
                      <SuiSelect
                        defaultValue={[]}
                        onChange={(e) => {
                          setState({
                            ...state,
                            selected_specialist: e.value,
                          });
                        }}
                        options={
                          list_of_specialist?.data?.length > 0 &&
                          list_of_specialist?.data?.map((data, i) => {
                            return {
                              value: data?.id,
                              label:
                                data?.specialist?.first_name +
                                " " +
                                data?.specialist?.last_name,
                            };
                          })
                        }
                        size='large'
                        isMulti
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={12} className='formsection1'>
                    <Form.Group>
                      <h6 className='userprofile'>Name</h6>
                      <Form.Control
                        type='text'
                        value={name}
                        className='userfield'
                        name='name'
                        onChange={onchange}
                        placeholder=''
                      />
                    </Form.Group>
                  </Col> */}
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2 back11a'>
              <div className='terminate1 back11' onClick={() => hideModal()}>
                Back
              </div>
              <div className='job2'>
                <div className=' back11app'>
                  {!show2 ? (
                    <CustomButton
                      name={"Submit"}
                      onClick={AssignSpecialist}
                      disabled={false}
                      customeStyle={"assign_specailist"}
                      isBusy={isloading}
                    />
                  ) : (
                    <CustomButton
                      name={"Save Details"}
                      onClick={AssignSpecialist}
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

export default MSpreadSpecialistManagement;
