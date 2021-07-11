import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { API, formatTime } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";

const WorkDetails_Form_Preview = (props) => {
  const [state, setState] = useState<any>({
    work_orders: [],
    country: "",
    inprogress: true,
    pipesize: "",
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    end_date: "",
    diameter: "",
    start_date: "",
    pipe_wieght: "",
    pipelength: "",
    billing_cycle: "",
    no_of_specialist: "",
    pipe_type: "",
    company_name:"",
    company_id:"",
    hour: "",
    terrains: "",
    location_terrain: "",
    state_: "",
    specialist_config: [],
    pipe_config: [],
  });
  const {
    pipe_wieght,
    pipelength,
    no_of_specialist,
    hour,
    diameter,
    pipe_type,
    pipesize,
    pipe_config,
    location_terrain,
    state_,
    end_date,
    start_date,
    project_purpose,
    country,
    specialist_config,
    company_name,
    company_id,
    work_order_description,
    terrains,
    location_terrain_name,
    billing_cycle,
    isloading,
    order_title,
  } = state;

  useEffect(() => {
    window.scrollTo(-0, -0);
    const firstList: any = localStorage.getItem("admin_first_step");
    const firstData = firstList ? JSON.parse(firstList) : "";
    console.log(firstData);
    const secondList: any = localStorage.getItem("admin_second_step");
    const secondData = secondList ? JSON.parse(secondList) : "";
    console.log(secondData);
    setState({
      ...state,
      ...secondData,
      ...firstData,
    });
  }, []);
  const submitForm = () => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");

    const pipe_keys = pipe_config.map(
      ({ no_of_joints, pipelength, pipe_schedule, pipe_size, pipe_type }) => ({
        joints: no_of_joints,
        length: pipelength,
        pipe_schedule: pipe_schedule,
        size: pipe_size,
        type: pipe_type,
      })
    );

    const config_keys = specialist_config.map(
      ({ no_of_specialist, type_of_specialist }) => ({
        skill: type_of_specialist,
        number: no_of_specialist,
      })
    );
    console.log(config_keys);
    // no_of_specialist,
    // type_of_specialist,
    // title_of_specialist,
    console.log(pipe_keys);
    const work_order_data = {
      contractor: company_id,
      title: order_title,
      description: work_order_description,
      purpose: project_purpose,
      state: state_,
      start_date,
      end_date,
      country,
      hours_per_day: hour,
      project_terrain: location_terrain,
      pipe_configs: pipe_keys,
      skills: config_keys,
    };
    console.log(work_order_data);
    axios
      .post(`${API}/admin/work-orders`,work_order_data,{
        headers: {
          "Authorization": `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTimeout(()=>{
          window.location.assign("/admin_work_order")
        },2000)
        localStorage.removeItem("")
        localStorage.removeItem("admin_first_step")
        console.log(res);
        setState({
          ...state,
          isloading: false,
        });
        notify("Successful");
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        notify("Sorry failed to process, try again later", "D");
        console.log(err.response);
      });
  };
  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });

  return (
    <>
      <div className="formcontent">
        <Form>
          <Row>
            <Col md={12}>
            <h5 className="work_details worktitle">Company Name</h5>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123"></h6>
                <p className="Construction12">{company_name}</p>
              </div>
              <h5 className="work_details worktitle">Work Details</h5>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">Work Title</h6>
                <p className="Construction12">{order_title}</p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Work Description
                </h6>
                <p className="Construction12">
                  {work_order_description ?? "n/a"}
                </p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Project Purpose
                </h6>
                <p className="Construction12">{project_purpose ?? "n/a"}</p>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Location</h6>
                  <div className="Construction12">{country ?? "n/a"}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">State</h6>
                  <div className="Construction12">{state_ ?? "n/a"}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Location Terrain
                  </h6>
                  <div className="Construction12">
                    {location_terrain_name ?? "n/a"}
                  </div>
                </div>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Start Date</h6>
                  <div className="Construction12">{formatTime(start_date)}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">End Date</h6>
                  <div className="Construction12">{formatTime(end_date)}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Hours/day</h6>
                  <div className="Construction12">{hour ?? "n/a"}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Duration</h6>
                  <div className="Construction12">{billing_cycle ?? "n/a"}</div>
                </div>
              </div>
              <div>
                <hr />
              </div>
              <h5 className="work_details worktitle wftitle">Work Force</h5>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Pipe Configuration
              </h6>
              {pipe_config?.map((data, i) => (
                <Col md={12} className="ttp_" key={i}>
                  <div className="closticon"></div>
                  <div className="main_wrap_ws main_wrap_ws22 graybg">
                    <div>
                      <h6 className="userprofile12 userprofile123">
                        Type of Pipe
                      </h6>
                      <div className="Construction12">
                        {data.pipe_name ?? "n/a"}
                      </div>
                    </div>
                    <div className="">
                      <h6 className="userprofile12 userprofile123">
                        Pipe Length
                      </h6>
                      <div className="Construction12">
                        {" "}
                        {data?.pipelength ?? "n/a"}
                      </div>
                    </div>
                    <div className="">
                      <h6 className="userprofile12 userprofile123">
                        Pipe Size
                      </h6>
                      <div className="Construction12">
                        {" "}
                        {data?.pipe_size ?? "n/a"}
                      </div>
                    </div>
                    <div className="">
                      <h6 className="userprofile12 userprofile123">
                        No of Joint
                      </h6>
                      <div className="Construction12">
                        {data?.no_of_joints ?? "n/a"}
                      </div>
                    </div>
                    <div className="">
                      <h6 className="userprofile12 userprofile123">
                        Pipe Schedule
                      </h6>
                      <div className="Construction12">
                        {data?.pipe_schedule ?? "n/a"}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Types and number of specialist
              </h6>
              {specialist_config?.map((data, i) => (
                <Col md={12} className="ttp_" key={i}>
                  <div className="closticon"></div>
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
              <h6 className="userprofile12 userprofile123 userprofile1231">
                {billing_cycle && "Payment Cycle"}
              </h6>
              <div>{billing_cycle ?? "n/a"}</div>
            </Col>
          </Row>
          <Row className="nxt90">
            {props.hide == false && (
              <Col md={12} className="flex_btns">
                <Link to="/admin_new_work_order_step2">
                  <div className="job3 btn_outline">Back</div>
                </Link>
                <div className="job31" onClick={submitForm}>
                  {isloading ? "processing" : "Submit"}
                </div>
              </Col>
            )}
          </Row>
        </Form>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};
export default WorkDetails_Form_Preview;
