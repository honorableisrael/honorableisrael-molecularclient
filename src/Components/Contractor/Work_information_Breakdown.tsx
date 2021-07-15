import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API, formatTime } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";

const WorkInformationBreakdown = (props) => {
  const [state, setState] = useState<any>({
    work_orders: [],
    country: "",
    inprogress: true,
    pipesize: "",
    hours_per_day:"",
    duration:"",
    workDetails:{},
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    title:"",
    description:"",
    purpose:"",
    end_date: "",
    diameter: "",
    start_date: "",
    pipe_wieght: "",
    pipelength: "",
    billing_cycle: "",
    no_of_specialist: "",
    pipe_type: "",
    hour: "",
    terrains: "",
    location_terrain: "",
    state_: "",
    specialist_requests: [],
    pipe_configs: [],
  });
  const {
    pipe_wieght,
    pipelength,
    no_of_specialist,
    workDetails,
    hour,
    title,
    description,
    hours_per_day,
    duration,
    purpose,
    pipe_configs,
    location_terrain,
    state_,
    end_date,
    start_date,
    project_purpose,
    country,
    specialist_requests,
    work_order_description,
    terrains,
    location_terrain_name,
    billing_cycle,
    isloading,
    order_title,
  } = state;

  useEffect(() => {
    window.scrollTo(-0, -0);
    const firstList: any = localStorage.getItem("first_step");
    const firstData = firstList ? JSON.parse(firstList) : "";
    console.log(firstData);
    const secondList: any = localStorage.getItem("second_step");
    const secondData = secondList ? JSON.parse(secondList) : "";
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/login");
      console.log(props)
    window.scrollTo(-0, -0);
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      work_order_detail: work_order_details,
    });
    axios.all([
      axios.get<any, AxiosResponse<any>>(`${API}/contractor/work-orders/${work_order_details.id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data,
            workDetails:res.data.data,
            state_:res.data.data.state,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });
console.log(workDetails)
  return (
    <>
      <div className="formcontent">
        <Form>
          <Row>
            <Col md={12}>
              <h5 className="work_details worktitle">Work Details</h5>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">Work Title</h6>
                <p className="Construction12">{title}</p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Work Description
                </h6>
                <p className="Construction12">
                  {description ?? "n/a"}
                </p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Project Purpose
                </h6>
                <p className="Construction12">{purpose ?? "n/a"}</p>
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
              <div className="main_wrap_ws main_wrap_ws22 main_wrap_forced">
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
                  <div className="Construction12">{hours_per_day ?? "n/a"}</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Duration (Weeks)</h6>
                  <div className="Construction12">{duration ?? "n/a"}</div>
                </div>
              </div>
              <div>
                <hr />
              </div>
              <h5 className="work_details worktitle wftitle">Work Force</h5>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Pipe Configuration
              </h6>
              {pipe_configs?.map((data, i) => (
                <Col md={12} className="ttp_" key={i}>
                  <div className="closticon"></div>
                  <div className="main_wrap_ws main_wrap_ws22 main_wrap_forced graybg">
                    <div>
                      <h6 className="userprofile12 userprofile123">
                        Type of Pipe
                      </h6>
                      <div className="Construction12">
                        {data.pipe_type ?? "n/a"}
                      </div>
                    </div>
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
                        {data?.joints ?? "n/a"}
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
              {specialist_requests?.map((data, i) => (
                <Col md={12} className="ttp_" key={i}>
                  <div className="closticon"></div>
                  <div className="main_wrap_ws main_wrap_ws22 graybg">
                    <div>
                      <h6 className="userprofile12 userprofile123">
                        Specialist Skill
                      </h6>
                      <div className="Construction12">
                        {data?.skill}
                      </div>
                    </div>
                    <div className="">
                      <h6 className="userprofile12 userprofile123">
                        Number of Specialist
                      </h6>
                      <div className="Construction12">
                        {data?.number}
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
export default WorkInformationBreakdown;
