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
import WorkDetails_Form_Preview from "./workdetailsform";
import pen from "../../images/pen.png";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";

const AdminWorkOrderEvaluationStep2 = () => {
  const [state, setState] = useState<any>({
    work_orders: [],
    country: "",
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
    show: true,
    pipe_schedules: [],
    pipeList:[],
    price: "",
    joints: "",
    size: "",
    schedule: "",
    length: "",
  });
  const onchange = (e) => {
    console.log(e.target.value);
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

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
      id:x
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
      ])
      .then(
        axios.spread((res, res2,res3) => {
          console.log(res2.data.data);
          setState({
            ...state,
            ...res.data.data,
            work_order_detail: res.data.data,
            pipeList: res2.data.data,
            pipe_schedules: res3.data.data,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          work_order_detail: work_order_details,
        });
        console.log(err);
      });
  }, []);

  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    pipe_schedules,
    reason,
    pipeList,
    work_order_detail,
    show,
    price,
    joints,
    size,
    length,
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
                            Pipe Length (inches)
                          </div>
                          <div className="pipelength1">
                            <input
                              type="number"
                              className="pipelength1 form-control"
                              placeholder="Pipe length"
                              name="length"
                              value={length}
                              onChange={onchange}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="pipelength pipelng">
                          <div className="pipelength1q">Pipe Size (inches)</div>
                          <div className="pipelength1">
                            <input
                              type="number"
                              className="pipelength1 form-control"
                              placeholder="Pipe Size"
                              name="size"
                              value={size}
                              onChange={onchange}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="pipelength pipelng">
                          <div className="pipelength1q">Number of Joints</div>
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
                            Pipe cost per inch schedule
                          </div>
                          <div className="pipelength1">
                            <input
                              type="number"
                              className="pipelength1 form-control"
                              placeholder="Price in Naira"
                              name="price"
                              value={price}
                              onChange={onchange}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="pipelength pipelng pipedoc1">
                          <div className="pipelength1q">Pipe Schedule</div>
                          <div className="pipelength1">
                            <select
                              id="schedule"
                              onChange={onchange_pipeschedule}
                              className="userfield form-control"
                            >
                              <option value=""></option>
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
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="gen11">
                <div className="gent122">Update</div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
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
                      {work_order_detail?.pipe_configs?.map((data, i) => (
                        <Col md={12} className="ttp_" key={i}>
                          <div className="closticon"></div>
                          <div className="headerflex">
                            <div className="pipetitle_1">{data.pipe_type ?? "n/a"}</div>
                            <div className="pipeedit" onClick={(e)=>openModal(e,data.id)}>
                            <img src={pen} className="pen_0" alt="pen_0" /> Edit
                            </div>
                          </div>
                          <div className="main_wrap_ws main_wrap_ws22 graybg2 graybg ">
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
                                Pipe Length
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
                      <div className="overview__2">
                        <div className="pricing_cal">
                          <div className="pricing__112">Pricing Calculator</div>
                          <Row>
                            <Col md={12}>
                              <div className="pricing__112 pricing__11_1">
                                Pipe config
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Pipe Length (inches)
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Pipe length"
                                    name="length"
                                    value={length}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Pipe Size (inches)
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Pipe Size"
                                    name="size"
                                    value={size}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="pipelength">
                                <div className="pipelength1q">
                                  Number of Joints
                                </div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Number of Joint"
                                    name="joints"
                                    value={joints}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="pipelength">
                                <div className="pipelength1q">Pipe Price</div>
                                <div className="pipelength1">
                                  <input
                                    type="number"
                                    className="pipelength1 form-control"
                                    placeholder="Price in Naira"
                                    name="price"
                                    value={price}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md={12}>
                              <div className="pricing__112 pricing__11_1">
                                Specialist config
                              </div>
                            </Col>
                          </Row>
                          <Col md={12} className="generate_row">
                            <div className="gen11">
                              <div className="gent122">Generate</div>
                            </div>
                          </Col>
                        </div>
                      </div>
                      <div className="flexcontainercw ">
                        <div className="flexcontainercw flexcon_1">
                          <div className="deployed12">
                            <div className="ttola1a">
                              Total cost for Welders
                            </div>
                            <div className="ttola1b cost12">$100,000</div>
                            <div className="ttola1">$2,000/Welder (N2,000)</div>
                          </div>
                          <div className="deployed12">
                            <div className="ttola1a">
                              Total cost for Fitters
                            </div>
                            <div className="ttola1b cost12">$100,000</div>
                            <div className="ttola1">
                              $2,000/Fitters (N2,000)
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="ttola1a ">Exchange rate</div>
                          <div className="exchangerate">N450 / $1</div>
                        </div>
                      </div>
                      <div className="flexcontainercw flexcon_1">
                        <div className="cost_total">
                          <div className="ttola1a">Grand Total</div>
                          <div className="ttola1b">$50,000</div>
                        </div>
                      </div>
                      <div className="nxtbck">
                        <Link to="/work_order_evaluation">
                          {" "}
                          <div className="gent122 gent1221">Back</div>
                        </Link>{" "}
                        <Link to="/admin_evaluation_step3">
                          <div className="gent122">Next</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminWorkOrderEvaluationStep2;
