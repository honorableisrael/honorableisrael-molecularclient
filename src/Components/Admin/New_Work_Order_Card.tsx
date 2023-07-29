import React, { useState } from "react";
import { Col, Row, Container, Modal, Form } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "../Contractor/navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/location.png";
import group3 from "../../images/Vector.png";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link, withRouter } from "react-router-dom";
import { API, formatTime } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const New_Work_Order_Card = withRouter((props:any) => {
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 100,
    isloading: false,
    show: false,
    reason: "",
  });
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  let { volume, isloading, show, reason } = state;
  const Accept_work_order = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${props?.order_details?.id}/accept`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successfull");
          localStorage.setItem(
            "work_order_details",
            JSON.stringify(props.order_details)
          )
          setTimeout(() => {
            props.history.push(`/admin_work_details/${props?.order_details?.id}?inreview=true`);
          }, 2000);
          
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const Reject_work_order = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      reason,
    };
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${props?.order_details?.id}/accept`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successfull");
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          setState({
            ...state,
            isloading: false,
            show: false,
          });
        })
      )
      .catch((err) => {
        
        notify("Failed to process", "D");
        setState({
          ...state,
          isloading: false,
          show: false,
        });
      });
  };
  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const openModal = () => {
    setState({
      ...state,
      show: true,
    });
  };
  
  return (
    <>
      <div className="cardwrap_jo">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
          <div className="pipline">
            <div className="crd23">
              {" "}
              <Link
                onClick={() =>
                  localStorage.setItem(
                    "work_order_details",
                    JSON.stringify(props.order_details)
                  )
                }
                to={`/admin_work_details/${props?.order_details?.id}`}
              >
                {props?.order_details?.title}
              </Link>
            </div>
            <div className="inprogr">
              {props?.hide == false || props?.hide == undefined ? (
                <div className={"bgdeepblue inprogress_4"}>
                  <span className={"paidd2green box_cust bgdeepblue"}></span>
                  <span>{props?.awaiting_assignment ? "Pending" : "New"}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mnversion mnversion11">
            {/* <Link to="/admin_work_details"> */}
            {props?.order_details?.purpose}
            {/* </Link> */}
          </div>
          <div className="minicardwrapper mnversion11">
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Location</div>
                <div className="spcclst">
                  {props?.order_details?.state},{props?.order_details?.country}
                </div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Duration</div>
                <div className="spcclst">{props?.order_details?.duration}</div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">From</div>
                <div className="spcclst">
                  {formatTime(props?.order_details?.start_date)}
                </div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">To</div>
                <div className="spcclst">
                  {formatTime(props?.order_details?.end_date)}
                </div>
              </div>
            </div>
          </div>
          {props.hide == false || props.hide == undefined ? (
            <div className="accpt_decline">
              {props.awaiting_assignment ? (
                <Link to="/work_order_evaluation">
                  {" "}
                  <div className="accpt122">Assign Specialist</div>
                </Link>
              ) : (
                <>
                  <div className="accpt122" onClick={Accept_work_order}>
                    {isloading ? "Processing" : "Accept"}
                  </div>
                  {/* <div className="decline122" onClick={openModal}>
                    Decline
                  </div> */}
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
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
            Terminate work order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className="form-control reason12"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              {/* <div className="terminate1" onClick={Reject_work_order}>
                {isloading ? "Processing" : "Reject"}
              </div> */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
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
});

export default New_Work_Order_Card;
