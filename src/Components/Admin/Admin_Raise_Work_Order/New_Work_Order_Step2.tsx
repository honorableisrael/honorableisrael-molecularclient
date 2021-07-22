import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "../contractor.css";
import DashboardNav from "../navbar";
import portfolio from "../../../images/portfolio.png";
import group2 from "../../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import Addmore from "../../../images/Add more.png";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";

const Admin_NewWorkOrderStep2 = withRouter((props) => {
  const inputEl: any = React.useRef("");
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");
  const inputEl3: any = React.useRef("");
  const inputEl4: any = React.useRef("");
  const [state, setState] = useState<any>({
    work_orders: [],
    country: "",
    inprogress: true,
    no_of_joints: "",
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    end_date: "",
    diameter: "",
    start_date: "",
    pipeList: [],
    pipeSizes: [],
    pipe_config_: [],
    types_of_Specialist: [],
    no_of_specialist: "",
    pipe_type: "",
    pipe_schedule: "",
    pipe_schedules: [],
    pipe_size: "",
    size_value: "",
    pipe_name: "",
    pipelength: "",
    specialist_config: [],
    type_of_specialist: "",
    title_of_specialist: "",
    pipe_config: [],
  });

  const inputHandler = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      pipe_type: new_obj.id,
      pipe_name: new_obj.name,
    });
  };
  const onchange_pipesize = (e) => {
    // if (e.target.name == "pipe_type") {
    const new_obj = JSON.parse(e.target.value);
    console.log(new_obj);
    setState({
      ...state,
      size_value: new_obj.name,
      pipe_size: new_obj.id,
    });
  };
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
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
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
  const {
    type_of_specialist,
    specialist_config,
    no_of_joints,
    pipe_schedules,
    pipe_config_,
    size_value,
    pipe_name,
    pipelength,
    no_of_specialist,
    pipe_schedule,
    pipe_size,
    pipe_config,
    types_of_Specialist,
    pipeList,
    pipeSizes,
    pipe_type,
    pipe_schedule_name,
    title_of_specialist,
  }: any = state;
  useEffect(() => {
    const stored_stage_2 = localStorage.getItem("admin_second_step");
    const stored2 = stored_stage_2 ? JSON.parse(stored_stage_2) : "";
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      stored2,
    });
    window.scrollTo(-0, -0);
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/skills`),
      Axios.get<any, AxiosResponse<any>>(`${API}/pipes`),
      Axios.get<any, AxiosResponse<any>>(`${API}/pipe-schedules`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      axios.get(`${API}/pipe-sizes`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res, res2, res3, res4) => {
          console.log(res3.data.data);
          setState({
            ...state,
            types_of_Specialist: res.data.data,
            pipeList: res2.data.data,
            pipe_schedules: res3.data.data,
            pipeSizes: res4.data.data,
            ...stored2,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const Add_New_Config = (t) => {
    console.log(t);
    if (t === "specialist") {
      const Specialist: any = [
        {
          no_of_specialist,
          type_of_specialist,
          title_of_specialist,
        },
      ];
      if (!no_of_specialist || !type_of_specialist) {
        return notify("Please enter all specialist details");
      }
      setState({
        ...state,
        specialist_config: [...specialist_config, ...Specialist].reverse(),
        no_of_specialist: "",
        title_of_specialist: "",
      });
      inputEl4.current.value = null
    }
    if (t === "pipe") {
      const Pipe_Config: any = [
        {
          no_of_joints,
          pipelength,
          pipe_schedule,
          pipe_schedule_name,
          pipe_size,
          pipe_type,
          pipe_name,
        },
      ];
      console.log(Pipe_Config);
      if (
        !no_of_joints ||
        !pipelength ||
        !pipe_schedule ||
        !pipe_size ||
        !pipe_type
      ) {
        return notify("Please enter all pipe details");
      }
      setState({
        ...state,
        pipe_config: [...pipe_config, ...Pipe_Config].reverse(),
        no_of_joints: "",
        pipelength: "",
        pipe_schedule: "",
        pipe_size: "",
        pipe_type: "",
        pipe_name: "",
        pipe_schedule_name: "",
      });
      inputEl1.current.value = null
      inputEl2.current.value = null
      inputEl3.current.value = null
    }
  };
  const deleteConfig = (id, type) => {
    if ((type = "specialist")) {
      const Specialist_Config = specialist_config;
      Specialist_Config.splice(id, 1);
      setState({
        ...state,
        specialist_config: Specialist_Config,
      });
    }
    if ((type = "pipe")) {
      const Pipe_Config = pipe_config;
      Pipe_Config.splice(id, 1);
      setState({
        ...state,
        pipe_config: Pipe_Config,
      });
    }
  };
  const notify = (message: string) =>
    toast(message, { containerId: "B", position: "top-right" });

  const multipleEntryController = () => {
    console.log(pipe_config);
    console.log(specialist_config);
    try {
      console.log("1");
      if (
        no_of_specialist &&
        type_of_specialist &&
        title_of_specialist &&
        no_of_joints &&
        pipelength &&
        pipe_schedule &&
        pipe_size &&
        pipe_type
      ) {
        const Pipe_Config: any = [
          {
            no_of_joints,
            pipelength,
            pipe_schedule,
            pipe_size,
            pipe_type,
            pipe_name,
          },
        ];
        const Specialist: any = [
          {
            no_of_specialist,
            type_of_specialist,
            title_of_specialist,
          },
        ];
        const second_data = {
          specialist_config: [...specialist_config, ...Specialist],
          pipe_config: [...pipe_config, ...Pipe_Config],
          // billing_cycle,
        };
        localStorage.setItem("admin_second_step", JSON.stringify(second_data));
        return props.history.push("/admin_new_work_order_step3");
      }

      if (
        no_of_specialist &&
        type_of_specialist &&
        title_of_specialist &&
        pipe_config &&
        Object.keys(pipe_config[0]).length === 0
      ) {
        console.log("spec");
        const Specialist: any = [
          {
            no_of_specialist,
            type_of_specialist,
            title_of_specialist,
          },
        ];
        const second_data = {
          specialist_config: [...specialist_config, ...Specialist],
          pipe_config: [...pipe_config],
        };
        localStorage.setItem("admin_second_step", JSON.stringify(second_data));
        return props.history.push("/admin_new_work_order_step3");
      }
      if (
        no_of_joints &&
        pipelength &&
        pipe_schedule &&
        pipe_size &&
        pipe_type &&
        specialist_config &&
        Object.keys(specialist_config[0]).length > 0
      ) {
        console.log("pipe");
        const Pipe_Config: any = [
          {
            no_of_joints,
            pipelength,
            pipe_schedule,
            pipe_size,
            pipe_type,
            pipe_name,
          },
        ];
        console.log(Pipe_Config);
        const second_data = {
          pipe_config: [...pipe_config, ...Pipe_Config],
          specialist_config: [...specialist_config],
          // billing_cycle,
        };
        localStorage.setItem("admin_second_step", JSON.stringify(second_data));
        return props.history.push("/admin_new_work_order_step3");
      }
      if (
        Object.keys(specialist_config[0]).length > 0 &&
        Object.keys(pipe_config[0]).length > 0
      ) {
        console.log("3");
        if (
          Object.keys(pipe_config[0]).length > 0 ||
          Object.keys(specialist_config[0]).length > 0
        ) {
          const second_data = {
            pipe_config,
            specialist_config,
          };
          localStorage.setItem(
            "admin_second_step",
            JSON.stringify(second_data)
          );
          return props.history.push("/admin_new_work_order_step3");
        }
      }
      if (
        Object.keys(pipe_config === null) ||
        Object.keys(specialist_config === null)
      ) {
        console.log("4");
        return notify("Pipe config and specialist config cannot be empty");
      }
    } catch (error) {
      return notify("Pipe config or specialist config cannot be empty");
    }
  };
  const saveToBrowser = () => {
    // setState({
    //   ...state,
    //   no_of_joints: "",
    //   pipelength: "",
    //   pipe_schedule: "",
    //   pipe_size: "",
    //   pipe_type: "",
    //   pipe_name: "",
    //   no_of_specialist: "",
    //   title_of_specialist: "",
    // });
    return props.history.push("/admin_new_work_order_step3");
  };
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <div className="title_wo">
              <div className="workorderheader workorder_header">
                <Link to="/admin_new_work_order">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Create Work Order
              </div>
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="form_header">
                  <span className="form_header1">
                    {" "}
                    <b>2</b> of 3{" "}
                  </span>{" "}
                  <b> Workforce Details</b>
                </div>
                <div className="formcontent form_tomp">
                  <Form>
                    <Row>
                      {pipe_config?.map((data, i) => (
                        <Col md={12} className="ttp_" key={i}>
                          <div className="closticon">
                            <span
                              className="tymes1"
                              onClick={() => deleteConfig(i, "pipe")}
                              title="Delete"
                            >
                              &times;
                            </span>
                          </div>
                          <div className="main_wrap_ws main_wrap_ws22 graybg">
                            <div>
                              <h6 className="userprofile12 userprofile123">
                                Type of Pipe
                              </h6>
                              <div className="Construction12">
                                {data.pipe_name}
                              </div>
                            </div>
                            <div className="">
                              <h6 className="userprofile12 userprofile123">
                                Pipeline Length
                              </h6>
                              <div className="Construction12">
                                {" "}
                                {data?.pipelength}
                              </div>
                            </div>
                            <div className="">
                              <h6 className="userprofile12 userprofile123">
                                Pipe Size
                              </h6>
                              <div className="Construction12">
                                {" "}
                                {data?.pipe_size}
                              </div>
                            </div>
                            <div className="">
                              <h6 className="userprofile12 userprofile123">
                                No of Joint
                              </h6>
                              <div className="Construction12">
                                {data?.no_of_joints}
                              </div>
                            </div>
                            <div className="">
                              <h6 className="userprofile12 userprofile123">
                                Pipe Schedule 
                              </h6>
                              <div className="Construction12">
                                {data?.pipe_schedule_name}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile darkheader">
                            Pipe Configuration 
                          </h6>
                        </div>
                      </Col>
                      <Col md={3} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">  Type of Pipe  </h6>
                          <select
                            className="userfield form-control"
                            id={"pipe_type"}
                            onChange={inputHandler}
                            ref={inputEl1}
                          >
                            <option></option>
                            <option value={""}></option>
                            {pipeList.map((data, i) => (
                              <option
                                value={JSON.stringify({
                                  id: data.id,
                                  name: data.name,
                                })}
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={3} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Pipeline Length (Meters)
                          </h6>
                          <Form.Control
                            type="number"
                            value={pipelength}
                            className="userfield"
                            id="pipelength"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            No of Joints
                          </h6>
                          <Form.Control
                            type="number"
                            value={no_of_joints}
                            className="userfield"
                            id="no_of_joints"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Pipe Schedule
                          </h6>
                          <select
                            id="pipe_schedule"
                            onChange={onchange_pipeschedule}
                            className="userfield form-control"
                            ref={inputEl2}
                          >
                            <option value=""></option>
                            {pipe_schedules.map((data, i) => (
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
                        </Form.Group>
                      </Col>
                      <Col md={3} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Pipe Size
                          </h6>
                          <select
                            name="pipe_size"
                            id="pipe_size"
                            className="form-control"
                            onChange={onchange_pipesize}
                            ref={inputEl3}
                          >
                          <option>{size_value}</option>
                            {pipeSizes.map((data, i) => (
                              <>
                                <option
                                  className="pipelength1 form-control specialization"
                                  value={JSON.stringify({
                                    id: data.id,
                                    name: data.size,
                                  })}
                                >
                                  {data.size}
                                </option>
                              </>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={12} className="addmro1 dmro1">
                        <div className="addmro">
                          <img
                            src={Addmore}
                            alt="Add more"
                            className="Add__more"
                            onClick={() => Add_New_Config("pipe")}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          <h6 className="userprofile darkheader">
                            Types of Specialist Required and Number{" "}
                          </h6>
                        </div>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Area of specialization
                          </h6>
                          <select
                            id="type_of_specialist"
                            onChange={onchange_Area_Of_Specialization}
                            className="userfield form-control"
                            ref={inputEl4}
                          >
                            <option value=""></option>
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
                        </Form.Group>
                      </Col>
                      <Col md={4} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile userprofile12">
                            Number of Specialist
                          </h6>
                          <Form.Control
                            type="number"
                            value={no_of_specialist}
                            className="userfield"
                            id="no_of_specialist"
                            onChange={onchange}
                            onBlur={() => Add_New_Config("specialist")}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      {specialist_config?.map((data, i) => (
                        <Col md={12} className="ttp_" key={i}>
                          <div className="closticon">
                            <span
                              className="tymes1"
                              onClick={(i) => deleteConfig(i, "specialist")}
                              title="Delete"
                            >
                              &times;
                            </span>
                          </div>
                          <div className="main_wrap_ws main_wrap_ws22 graybg">
                            <div>
                              <h6 className="userprofile12 userprofile123">
                                Specialist Skill
                              </h6>
                              <div className="Construction12">
                                {data?.title_of_specialist}
                              </div>
                            </div>
                            <div className="">
                              <h6 className="userprofile12 userprofile123">
                                Number of Specialist
                              </h6>
                              <div className="Construction12">
                                {data?.no_of_specialist}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <Row>
                      <Col md={12} className="addmro1 dmro1">
                        <div className="addmro">
                          <img
                            src={Addmore}
                            alt="Add more"
                            className="Add__more"
                            onClick={() => Add_New_Config("specialist")}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col md={12}>
                        <div>
                          <h6 className="userprofile">Payment Cycle </h6>
                        </div>
                      </Col>
                      <Col md={8} className="formsection1 formsection10">
                        <span className="checkmark1">
                          <label className="container_checkbox ">
                            Weekly
                            <input
                              type="radio"
                              name="billing_cycle"
                              value="Weekly"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </span>
                        <span className="checkmark1">
                          <label className="container_checkbox">
                            Bi-Weekly
                            <input
                              type="radio"
                              value="Bi-Weekly"
                              name="billing_cycle"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </span>
                        <span className="checkmark1">
                          <label className="container_checkbox">
                            Monthly
                            <input
                              type="radio"
                              value="Monthly"
                              name="billing_cycle"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </span>
                      </Col> */}
                    </Row>
                    <br></br>
                    <Row>
                      <Col md={12} className="flex_btns">
                        <Link to="/admin_new_work_order">
                          <div className="job3 btn_outline">Back</div>
                        </Link>
                        <div
                          className="job31"
                          onClick={multipleEntryController}
                        >
                          Next
                        </div>
                      </Col>
                    </Row>
                  </Form>
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
});

export default Admin_NewWorkOrderStep2;
