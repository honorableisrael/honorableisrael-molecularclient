import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pen from "../../images/pen.png";
import axios, { AxiosResponse } from "axios";
import { API, current_currency, FormatAmount, notify } from "../../config";
import { EditIcon } from "./Shared/EditIcon";

const Work_Order_Cost_Evaluation = (props) => {
  const [state, setState] = useState < any > ({
    work_orders: [],
    isloading: false,
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_detail: {},
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    types_of_Specialist: [],
    pipe_schedules: [],
    type_of_specialist: "",
    number: "",
    title_of_specialist: "",
    id: "",
    type: "",
    pipeList: [],
    price: "",
    cost_factor: "",
    size: "",
    pipe_schedule: "",
    cost_per_inch: "",
    size_value: "",
    length: "",
    p_config_modal: false,
    s_config_modal: false,
    total_cost: "",
    cost_details: [],
    specialist_requests: [],
    payment_cycle: "",
    show_2: false,
    newIndex: ""
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

  const showModal2 = (data, i) => {
    setState({
      ...state,
      pipe_schedule: data.pipe_schedule,
      cost_factor: data.cost_factor,
      show: true,
      newIndex: i
    });
  };
  const openModal = (type, data) => {
    if (type == "specialist_config") {
      setState({
        ...state,
        show: true,
        type_of_specialist: data.id,
        title_of_specialist: data.skill,
        number: data.number,
        s_config_modal: true,
      });
    }
    if (type == "pipe_config") {
      setState({
        ...state,
        show: true,
        ...data,
        p_config_modal: true,
        pipe_schedule: data.pipe_schedule_id,
        type: data.pipe_type_id,
      });
    }
  };
  const onchange_pipeschedule = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);

    setState({
      ...state,
      pipe_schedule_name: new_obj.name,
      pipe_schedule: new_obj.id,
    });
  };
  const onchange_pipesize = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);

    setState({
      ...state,
      size_value: new_obj.name,
      size: new_obj.id,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/pipe-sizes`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/pipe-schedules`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/skills`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3, res4) => {

          setState({
            ...state,
            ...res.data.data,
            work_order_detail: res.data.data,
            pipeList: res2.data.data,
            pipe_schedules: res3.data.data,
            types_of_Specialist: res4.data.data,
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

  const onchange_Area_Of_Specialization = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);

    setState({
      ...state,
      type_of_specialist: new_obj.id,
      title_of_specialist: new_obj.name,
    });
  };

  function replaceObjectAtIndex(array, index, newObject) {
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }

    const newArray = array.map((obj, i) => {
      if (i === index) {
        return {
          cost_factor: newObject.cost_factor,
          pipe_schedule: newObject.pipe_schedule.id
        };
      }
      return {
        cost_factor: obj.cost_factor,
        pipe_schedule: obj.pipe_schedule.id
      };
    });

    return newArray;
  }

  const update_cost_config = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    })
    const new_object = {
      cost_factor,
      pipe_schedule
    }
    const pipe_schedule_cost_factor = replaceObjectAtIndex(work_order_detail?.costing?.pipe_schedule_cost_factor, newIndex, new_object);
    const data = { pipe_schedule_cost_factor }
    axios
      .put(`${API}/admin/work-orders/${work_order_detail.id}/cost`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {

        notify("Successfully updated");
        setTimeout(() => {
          window.location.reload();
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

        notify("Failed to update", "D");
      });
  };
  const update_pipe_config = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      length,
      cost_factor,
      pipe_schedule,
      size,
      type,
      cost_per_inch,
    };
    axios
      .put(
        `${API}/admin/work-orders/${work_order_detail.id}/pipe-configs/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((res) => {

        notify("Successfully updated");
        setTimeout(() => {
          window.location.reload();
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
          return notify(err?.response?.data?.errors?.size.join(""))
        }
        notify("Failed to update");
      });
  };
  const updatePipeScheduleCost = () => {
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
          `${API}/admin/work-orders/${work_order_details?.id}/cost`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          window.scrollTo(2000, 2000);

          setState({
            ...state,
            isloading: false,
            total_cost: res.data.data.total_cost,
            specialist_requests: res.data.data.specialist_requests,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message)
        }
        notify("Failed to generate cost")

      });
  };
  const RaiseInvoice = () => {
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
          `${API}/admin/work-orders/${work_order_details?.id}/invoice`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          localStorage.setItem("invoice_id", JSON.stringify(res.data.data))
          props.history.push("/admin_evaluation_step3");

          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        notify("Failed");
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message)
        }

      });
  };


  const updateWorkOrder = () => {
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
    const workorder = work_order_detail
    delete workorder.payment_cycle
    workorder.payment_cycle = payment_cycle
    const data = {
      payment_cycle
    }
    axios
      .all([
        axios.put(
          `${API}/admin/work-orders/${work_order_details?.id}/payment-cycle`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {

          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        if (err?.response?.status == 400) {
          notify(err?.response?.data?.message)
        }
        setState({
          ...state,
          isloading: false,
        });

      });
  }
  const {
    cost_details,
    payment_cycle,
    total_cost,
    isloading,
    id,
    newIndex,
    pipe_schedules,
    title_of_specialist,
    type_of_specialist,
    number,
    p_config_modal,
    types_of_Specialist,
    work_order_detail,
    show,
    pipe_schedule,
    show_2,
    type,
    cost_per_inch,
    cost_factor,
    size,
    length,
    pipeList,
    specialist_requests,
  } = state;

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
            p_config_modal: false,
            s_config_modal: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Update Config
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <div className="overview__2">
                  <div className="pricing_cal">
                    <Row>
                      <Col md={6}>
                        <div className="pipelength pipelng">
                          <div className="pipelength1q">
                            Cost Factor
                            <span className="text-danger">*</span>
                          </div>
                          <div className="pipelength1">
                            <input
                              type="number"
                              className="pipelength1 form-control"
                              placeholder="Number of Joint"
                              name="cost_factor"
                              value={cost_factor}
                              onChange={onchange}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="pipelength pipelng">
                          <div className="pipelength1q">
                            Pipe Schedule{" "}
                            <span className="text-danger">*</span>
                          </div>
                          <div className="pipelength1">
                            <select
                              className="userfield form-control"
                            >
                              {pipe_schedule &&
                                <option
                                  className="pipelength1 form-control specialization"
                                >
                                  {pipe_schedule.name}
                                </option>
                              }
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Col md={12} className="generate_row"></Col>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="gen11">
                <div className="gent122" onClick={update_cost_config}>
                  {isloading ? "Processing" : "Update"}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Contractor Work Order</title>
          <link />
        </Helmet>
        <Modal
          size="sm"
          show={show_2}
          onHide={() =>
            setState({
              ...state,
              show_2: false,
            })
          }
          dialogClassName="modall"
          className="mdl2"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Raise Proforma Invoice
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Row>
                <Col md={12} className="terminate2">
                  <div>
                    <div>
                      You are about to generate a proforma invoice for{" "}
                      {work_order_detail.contractor}
                    </div>

                    <div className="rinvoice">
                      <div className="gent122 l_extra" onClick={RaiseInvoice}>
                        {isloading ? "processing" : "Raise Invoice"}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          </Modal.Body>
        </Modal>
        <Row>
          <DashboardNav />
          <div id="overview"></div>
        </Row>
        <Row className="rowt3 row3t2">
          <Col md={11} className="job34`">
            <div className="title_wo title_wo12 title_wo_ tbtom ttbom">
              <div className="workorderheader fixedtitle">
                {" "}
                <img
                  onClick={() => {
                    window?.history?.back();
                  }}
                  src={arrowback}
                  className="arrowback mr-3"
                />
                Work Order Cost
              </div>
            </div>
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="bgwhitecontainer">
                      <div className="overview__2">
                        <div className="">
                          <Col md={12}>
                            <Table
                              hover
                              size='md'
                              className='schedule_payment_table mb-2'>
                              <thead className='splinvoitablehead'>
                                <tr>
                                  <th>S/N</th>
                                  <th style={{ minWidth: "1rem" }}>Pipe Schedule</th>
                                  <th style={{ minWidth: "1rem" }}>Cost Factor</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {work_order_detail?.costing?.pipe_schedule_cost_factor?.map((data, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{data?.pipe_schedule?.name}</td>
                                    <td>{data?.cost_factor}</td>

                                    <td className="table_data">
                                      {(
                                        <span
                                          title='Edit Invoice'
                                          className='mr-1 cursor-pointer'
                                          onClick={() => {
                                            showModal2(data, i);
                                          }}>

                                          <EditIcon />
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default Work_Order_Cost_Evaluation;
