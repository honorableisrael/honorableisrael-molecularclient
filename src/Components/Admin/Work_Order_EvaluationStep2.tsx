import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
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

const AdminWorkOrderEvaluationStep2 = (props) => {
  const [state, setState] = useState<any>({
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
    joints: "",
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
    payment_cycle:"",
    show_2: false,
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

  const openModal2 = () => {
    setState({
      ...state,
      show_2: true,
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
  const update_specialist_config = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      skill: type_of_specialist,
      number,
    };
    axios
      .put(`${API}/admin/work-orders/${work_order_detail.id}/skills`, data, {
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
      joints,
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
        
        if(err?.response?.status==406){
          return notify( err?.response?.data?.errors?.size.join("")) 
           }
        notify("Failed to update");
      });
  };
  const GenerateCost = () => {
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
        if(err?.response?.status==400){
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
          localStorage.setItem("invoice_id",JSON.stringify(res.data.data))
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
        if(err?.response?.status==400){
          return notify(err?.response?.data?.message) 
           }
        
      });
  };


  const updateWorkOrder =()=>{
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
        if(err?.response?.status==400){
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
    s_config_modal,
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
    joints,
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
            {p_config_modal && (
              <Col md={12}>
                <Form>
                  <div className="overview__2">
                    <div className="pricing_cal">
                      <Row>
                        <Col md={6}>
                          <div className="pipelength pipelng">
                            <div className="pipelength1q">
                              Pipeline Length (meters){" "}
                              <span className="text-danger">*</span>
                            </div>
                            <div className="pipelength1">
                              <input
                                type="number"
                                className="pipelength1 form-control"
                                placeholder=""
                                name="length"
                                value={length}
                                onChange={onchange}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="pipelength pipelng">
                            <div className="pipelength1q">
                              Pipe Size (inches){" "}
                              <span className="text-danger">*</span>
                            </div>
                            <div className="pipelength1">
                              <select
                                id="size"
                                name="size"
                                onChange={onchange_pipesize}
                                className="userfield form-control"
                              >
                                <option>{type ? type : ""}</option>
                                {pipeList.map((data, i) => (
                                  <option
                                    className="pipelength1 form-control specialization"
                                    value={JSON.stringify({
                                      id: data.id,
                                      name: data.size,
                                    })}
                                  >
                                    {data.size}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="pipelength pipelng">
                            <div className="pipelength1q">
                              Number of Joints{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <div className="pipelength1">
                              <input
                                type="number"
                                className="pipelength1 form-control"
                                placeholder="Number of Joint"
                                name="joints"
                                value={joints}
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
                                id="pipe_schedule"
                                name="pipe_schedule"
                                onChange={onchange_pipeschedule}
                                className="userfield form-control"
                              >
                                <option>
                                  {pipe_schedule ? pipe_schedule : ""}
                                </option>
                                {pipe_schedules.map((data, i) => (
                                  <option
                                    className="pipelength1 form-control specialization"
                                    value={JSON.stringify({
                                      id: data.id,
                                      name: data.name,
                                    })}
                                  >
                                    {data.name}
                                  </option>
                                ))}
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
            )}
            {/* specialist config edit */}
            {s_config_modal && (
              <Col md={12}>
                <Form>
                  <div className="overview__2">
                    <div className="pricing_cal">
                      <Row>
                        <Col md={6}>
                          <div className="pipelength pipelng">
                            <div className="pipelength1q">
                              Specialist Config
                            </div>
                            <div className="pipelength1 pipelng__1">
                              <select
                                id="title_of_specialist"
                                name="title_of_specialist"
                                onChange={onchange_Area_Of_Specialization}
                                className="userfield form-control"
                              >
                                <option>{title_of_specialist}</option>
                                {types_of_Specialist.map((data, i) => (
                                  <option
                                    className="specialization"
                                    value={JSON.stringify({
                                      id: data.id,
                                      name: data.name,
                                    })}
                                  >
                                    {data.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="pipelength pipelng">
                            <div className="pipelength1q">
                              Number of requested specialist
                            </div>
                            <div className="pipelength1">
                              <input
                                type="number"
                                className="pipelength1 form-control"
                                placeholder="Number of Joint"
                                name="number"
                                value={number}
                                onChange={onchange}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Col md={12} className="generate_row"></Col>
                    </div>
                  </div>
                </Form>
              </Col>
            )}
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="gen11">
                {s_config_modal && (
                  <div className="gent122" onClick={update_specialist_config}>
                    {isloading ? "Processing" : "Update"}
                  </div>
                )}
                {p_config_modal && (
                  <div className="gent122" onClick={update_pipe_config}>
                    {isloading ? "Processing" : "Update"}
                  </div>
                )}
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
                <Link to="/admin_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Details
              </div>
            </div>
            <div className="cubewrap1"></div>
            <div className="cubewrap2"></div>
            <div className="cubewrap">
              <div className="cube1 activecube">1</div>
              <div className="cube1 activecube">2</div>
              <div className="cube1">3</div>
              <div className="cube1">4</div>
            </div>
            <Row className="mgtop">
              <Col md={12} className="">
                <div className="job23_1a hidden__1">
                  <div className="">
                    <div className="overview12">
                      <div className="eddit1">
                        {" "}
                        2 of 4 | <b>Pricing Template</b>{" "}
                      </div>
                    </div>
                    <div className="bgwhitecontainer">
                      <div className="overview__2">
                        <div className="pricing_cal">
                          <div className="pricing__112">Pricing Calculator</div>
                          <Row>
                            <Col md={12}>
                              <div className="pricing__112 pricing__11_1">
                                Pipe config
                              </div>
                              {work_order_detail?.pipe_configs?.map(
                                (data, i) => (
                                  <Col md={12} className="ttp_" key={i}>
                                    <div className="closticon"></div>
                                    <div className="headerflex">
                                      <div className="pipetitle_1">
                                        {data.pipe_type ?? "n/a"}
                                      </div>
                                      <div
                                        className="pipeedit"
                                        onClick={(e) =>
                                          openModal("pipe_config", data)
                                        }
                                      >
                                        <img
                                          src={pen}
                                          className="pen_0"
                                          alt="pen_0"
                                        />{" "}
                                        Edit
                                      </div>
                                    </div>
                                    <div className="main_wrap_ws main_wrap_ws22 graybg2 graybg ">
                                      <div className="">
                                        <h6 className="userprofile12 userprofile123">
                                          Pipeline Length
                                        </h6>
                                        <div className="Construction12">
                                          {" "}
                                          {data?.length ?? "n/a"}
                                        </div>
                                      </div>
                                      <div className="">
                                        <h6 className="userprofile12 userprofile123">
                                          Pipe Schedule
                                        </h6>
                                        <div className="Construction12">
                                          {" "}
                                          {data?.pipe_schedule ?? "n/a"}
                                        </div>
                                      </div>
                                      <div className="">
                                        <h6 className="userprofile12 userprofile123">
                                          No of Joint
                                        </h6>
                                        <div className="Construction12">
                                          {data?.joints ?? "n/a"}
                                        </div>
                                      </div>
                                      <div className="">
                                        <h6 className="userprofile12 userprofile123">
                                          Pipe Size
                                        </h6>
                                        <div className="Construction12">
                                          {data?.size ?? "n/a"}
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                )
                              )}
                            </Col>
                            <Col md={12}>
                              <div>
                                <h6 className="userprofile">Payment Cycle </h6>
                              </div>
                            </Col>
                            <Col md={8} className="formsection1 formsection10" onBlur={updateWorkOrder}>
                              <span className="checkmark1">
                                <label className="container_checkbox ">
                                  Weekly
                                  <input
                                    type="radio"
                                    name="payment_cycle"
                                    value="1"
                                    onChange={onchange}
                                    checked={payment_cycle=="1" || payment_cycle=="Weekly"}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                              <span className="checkmark1">
                                <label className="container_checkbox">
                                  Bi-Weekly
                                  <input
                                    type="radio"
                                    value="2"
                                    name="payment_cycle"
                                    onChange={onchange}
                                    checked={payment_cycle=="2"||payment_cycle=="Bi-Weekly"}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                              {/* <span className="checkmark1">
                                <label className="container_checkbox">
                                  Monthly
                                  <input
                                    type="radio"
                                    value="3"
                                    name="payment_cycle"
                                    onChange={onchange}
                                    checked={payment_cycle=="3"||payment_cycle=="Monthly"}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span> */}
                            </Col>
                            <Col md={12}>
                              <div className="pricing__112 pricing__11_1">
                                Specialist config
                              </div>
                            </Col>
                            {work_order_detail?.specialist_requests?.map(
                              (data, i) => (
                                <Col md={11} className="ttp_ ttp1_" key={i}>
                                  <div className="closticon"></div>
                                  <div className="headerflex">
                                    <div className="pipetitle_1">
                                      {data.skill ?? "n/a"}
                                    </div>
                                    <div
                                      className="pipeedit"
                                      onClick={(e) =>
                                        openModal("specialist_config", data)
                                      }
                                    >
                                      <img
                                        src={pen}
                                        className="pen_0"
                                        alt="pen_0"
                                      />{" "}
                                      Edit
                                    </div>
                                  </div>
                                  <div className="main_wrap_ws main_wrap_ws22 graybg2 graybg ">
                                    <div>
                                      <h6 className="userprofile12 userprofile123">
                                        Area of specialization
                                      </h6>
                                      <div className="Construction12">
                                        {data.skill ?? "n/a"}
                                      </div>
                                    </div>

                                    <div className="">
                                      <h6 className="userprofile12 userprofile123">
                                        Number of Specialist
                                      </h6>
                                      <div className="Construction12">
                                        {data?.number ?? "n/a"}
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              )
                            )}
                          </Row>
                          <Col md={12} className="generate_row">
                            <div className="gen11">
                              <div className="gent122" onClick={GenerateCost}>
                                {!isloading ? "Generate cost" : "Loading..."}
                              </div>
                            </div>
                          </Col>
                        </div>
                      </div>

                      {specialist_requests?.length !== 0 && (
                        <div className="flexcontainercw ">
                          <div className="flexcontainercw flexcon_1">
                            {specialist_requests?.map((data, i) => (
                              <div className="deployed12" key={i}>
                                <div className="ttola1a">
                                  Total cost for {data.number} {data.skill}
                                </div>
                                <div className="ttola1b cost12">
                                {current_currency}{FormatAmount(data.total_cost)}
                                </div>
                                <div className="ttola1">
                                {current_currency}{FormatAmount(data.cost_per_specialist)}/
                                  {data.skill}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* <div>
                            <div className="ttola1a ">Exchange rate</div>
                            <div className="exchangerate">
                              N{work_order_detail?.exchange_rate} / $1
                            </div>
                          </div> */}
                        </div>
                      )}
                      <div className="flexcontainercw flexcon_1">
                        <div className="cost_total">
                          <div className="ttola1a">Total work order cost</div>
                          <div className="ttola1b">
                          {current_currency}{FormatAmount(total_cost)}
                          </div>
                        </div>
                      </div>
                      <div className="nxtbck">
                        <Link to="/work_order_evaluation">
                          {" "}
                          <div className="gent122 gent1221">Back</div>
                        </Link>{" "}
                        <div className="gent122" onClick={openModal2}>
                          Next
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

export default AdminWorkOrderEvaluationStep2;
