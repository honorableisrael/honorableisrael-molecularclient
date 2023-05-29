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
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pen from "../../images/pen.png";
import axios, { AxiosResponse } from "axios";
import { API, current_currency, FormatAmount, notify } from "../../config";
import DashboardNav from "./specialistNavbar";

const CreateWorkSheet = (props) => {
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
    payment_cycle: "",
    show_2: false,
    pipeSizes: [],
    no_of_joints: "",
  });

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const openModal2 = () => {
    setState({
      ...state,
      show_2: true,
    });
  };
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");
  const inputEl3: any = React.useRef("");
  const inputEl4: any = React.useRef("");

  const onchange_pipeschedule = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      pipe_schedule_name: new_obj.name,
      pipe_schedule: new_obj.id,
    });
  };
  const onchange_pipesize = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      size_value: new_obj.name,
      size: new_obj.id,
    });
  };
  useEffect(() => {
    const stored_stage_2 = localStorage.getItem("second_step");
    const stored2 = stored_stage_2 ? JSON.parse(stored_stage_2) : "";
    const third_data = localStorage.getItem("spreads");
    const spreads = third_data ? JSON.parse(third_data) : [];
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      stored2,
      ...spreads,
    });
    window.scrollTo(-0, -0);
    axios
      .all([
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
        axios.spread((response, response2, response3, response4) => {
          setState({
            ...state,
            types_of_Specialist: response.data.data,
            pipeList: response2.data.data,
            pipe_schedules: response3.data.data,
            pipeSizes: response4.data.data,
            ...spreads,
            ...stored2,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onchange_Area_Of_Specialization = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      type_of_specialist: new_obj.id,
      title_of_specialist: new_obj.name,
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
      size_value,
      joints,
      pipe_schedule,
    };
    console.log(data,"payload")
    axios
      .post(`${API}/specialist/work-orders/worksheets/${id}/items`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res);
        notify("Successfully create");
        setTimeout(() => {
          window.history.back();
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
        console.log(err?.response);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update");
      });
  };

  
  const {
    cost_details,
    isloading,
    id,
    s_config_modal,
    title_of_specialist,
    number,
    p_config_modal,
    types_of_Specialist,
    work_order_detail,
    show,
    show_2,
    type,
    cost_per_inch,
    size,
    length,
    pipeList,
    pipe_schedules,
    pipeSizes,
    no_of_joints,
    pipe_schedule,
    joints,
    size_value,
  } = state;
  console.log(work_order_detail);
  return (
    <>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Modal
          size='sm'
          show={show_2}
          onHide={() =>
            setState({
              ...state,
              show_2: false,
            })
          }
          dialogClassName='modall'
          className='mdl2'>
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>
              Raise Proforma Invoice
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Row>
                <Col md={12} className='terminate2'>
                  <div>
                    <div>
                      You are about to generate a proforma invoice for{" "}
                      {work_order_detail.contractor}
                    </div>
                    <div className='rinvoice'></div>
                  </div>
                </Col>
              </Row>
            </>
          </Modal.Body>
        </Modal>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2'>
          <Col md={11} className='job34`'>
            <div className='title_wo title_wo12 title_wo_ tbtom ttbom'>
              <div className='workorderheader fixedtitle'>
                  {" "}
                  <img src={arrowback} className='arrowback mr-1 cursor-pointer'  onClick={() => {
                            window.history.back();
                          }}/>
                Enter Worksheet data
              </div>
            </div>

            <Row className='mgtop'>
              <Col md={12} className=''>
                <div className='job23_1a hidden__1'>
                  <div className=''>
                    <div className='bgwhitecontainer'>
                      <Col md={12} className='formsection1'>
                        <Form.Group>
                          <h6 className='userprofile userprofile12'>
                            No of Joints
                          </h6>
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
                          <h6 className='userprofile userprofile12'>
                            Pipe Schedule
                          </h6>
                          <select
                            id='pipe_schedule'
                            onChange={onchange_pipeschedule}
                            className='userfield form-control'
                            ref={inputEl1}>
                            <option value=''></option>
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
                          <h6 className='userprofile userprofile12'>
                            Pipe Size
                          </h6>
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
                      <div className='nxtbck'>
                        {" "}
                        <div
                          className='gent122 gent1221'
                          onClick={() => {
                            window.history.back();
                          }}>
                          Back
                        </div>
                        <div className='gent122' onClick={createPipeItem}>
                          Submit
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
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default CreateWorkSheet;
