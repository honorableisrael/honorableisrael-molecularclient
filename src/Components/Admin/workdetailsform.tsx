import React, { useEffect } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import { formatTime } from "../../config";

const WorkDetails_Form_Preview = (props) => {
  useEffect(() => {}, []);

  console.log(props?.order_detail?.pipe_configs)
  return (
    <>
      <div className="formcontent">
        <Form>
          <Row>
            <Col md={12}>
              <h5 className="work_details worktitle">Work Details</h5>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">Work Title</h6>
                <p className="Construction12">{props?.order_detail?.title}</p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Work Description
                </h6>
                <p className="Construction12">
                  {props?.order_detail?.description}
                </p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Project Purpose
                </h6>
                <p className="Construction12">{props?.order_detail?.purpose}</p>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Location</h6>
                  <div className="Construction12">
                    {props?.order_detail?.country}
                  </div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">State</h6>
                  <div className="Construction12">
                    {props?.order_detail?.state}
                  </div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Location Terrain
                  </h6>
                  <div className="Construction12">
                    {props?.order_detail?.terrain}
                  </div>
                </div>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Start Date</h6>
                  <div className="Construction12">
                    {formatTime(props?.order_detail?.start_date)}
                  </div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">End Date</h6>
                  <div className="Construction12">
                    {formatTime(props?.order_detail?.end_date)}
                  </div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Hours/day</h6>
                  <div className="Construction12">
                    {props?.order_detail?.hours_per_day}
                  </div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Duration (weeks)</h6>
                  <div className="Construction12">
                    {(props?.order_detail?.duration)}
                  </div>
                </div>
              </div>
              <div>
                <hr />
              </div>
              <h5 className="work_details worktitle wftitle">Work Force</h5>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Pipe Configuration
              </h6>
              {props?.order_detail?.pipe_configs?.map((data, i) => (
                <Col md={12} className="ttp_" key={i}>
                  <div className="closticon"></div>
                  <div className="main_wrap_ws main_wrap_ws22 graybg">
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
              ))}
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Types and number of specialist
              </h6>
              {props?.order_detail?.specialist_requests?.map((data, i) => (
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
              {props?.order_detail?.specialist_request?.map((data, i) => (
                <div className="main_wrap_ws main_wrap_ws22 graybg" key={i}>
                  <div>
                    <h6 className="userprofile12 userprofile123">
                      Specialist Type
                    </h6>
                    <div className="Construction12">{data.skill}</div>
                  </div>
                  <div className="">
                    <h6 className="userprofile12 userprofile123">
                      Number Required
                    </h6>
                    <div className="Construction12">{data.number}</div>
                  </div>
                </div>
              ))}
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Payment Cycle
              </h6>
              <div>{props?.order_detail?.payment_cycle}</div>
            </Col>
          </Row>
          <Row className="nxt90">
            {props.hide == false && (
              <Col md={12}>
                <div className="job31">Next</div>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </>
  );
};
export default WorkDetails_Form_Preview;
