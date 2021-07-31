import React, { useState, useEffect, useRef} from "react";
import { Col, Row, Form, ProgressBar, Modal } from "react-bootstrap";
import closeimg from "../../images/closeimg.png";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import portfolio from "../../images/portfolio.png";
import exclam from "../../images/exclammark.png";
import greyelipse from "../../images/greyelipse.png";
import calenda from "../../images/calendarr.png";
import location from "../../images/location.png";
import document from "../../images/document 1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTSIndexSignature } from "@babel/types";


const Specialist_Work_details = props => {
  const [state, setState] = useState({
    terminateWorkModal: false,
    data: [{}],
    title: "",
    work_details: "",
    emptyworkorder: true,
    workorderdetails:false,
    reference: "",
    contractor: "",
    description: "",
    purpose: "",
    start_date: "",
    end_date: "",
    country: "",
    city: "",
    hours_per_day: null,
    status: "",
    payment_cycle: "",
    terrain: "",
    total_specialists: null,
    total_groups: null,
    duration: null,
    current_week: null,
    isloading: false,
    reason: "",
    errorMessage: "",
    successMessage: "",
    selectedWork:"",

  });
  const {
    terminateWorkModal,
    data,
    emptyworkorder,
    selectedWork,
    workorderdetails,
    work_details,
    title,
    reference,
    contractor,
    errorMessage,
    successMessage,
    description,
    purpose,
    start_date,
    end_date,
    country,
    city,
    hours_per_day,
    isloading,
    status,
    payment_cycle,
    terrain,
    total_specialists,
    total_groups,
    duration,
    reason,
    current_week
  }: any = state;
  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false
    });
  };
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const notify = (message: string, type = "B") =>
  toast(message, { containerId: type, position: "top-right" });

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);

    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);

    Axios.get<any, AxiosResponse<any>>(
      `${API}/specialist/work-orders/pending`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` }
      }
    )
    .then(res => {
      console.log(res.data);
      setState({
        ...state,
        ...res.data.data,
        id: res.data.data,
        workorderdetails: data.length > 0 ? true : false,
        emptyworkorder: data.length == 0 ? false : true,
      });
    });
  }, []);
  const Accept_work_order = (id) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken

      ? JSON.parse(availableToken)
      : window.location.assign("/#signin");
    setState({
      ...state,
      isloading: true,
    });
    
    Axios
      .all([
        Axios.post(
          `${API}/specialist/work-orders/${id}/accept`,{},
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
       
        ),
      ])
      .then(
        Axios.spread((res) => {
          notify("Successfull","B");
          setTimeout(()=>{
            window.location.reload()
          },3000)
          console.log(res.data);
          setState({
            ...state,
            isloading: false,
            successMessage: res.data.message 
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message
        });
      });
  };
  const Reject_work_order = (id) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/#signin");

    setState({
      ...state,
      isloading: true,
      terminateWorkModal: false,
    });
    const data = {
      reason,
    };
    Axios
      .all([
        Axios.post(
          `${API}/specialist/work-orders/${id}/decline`,
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
        Axios.spread((res) => {
            notify("New work order rejected")
          console.log(res.data);
          setState({
            ...state,
            isloading: false,
            successMessage: res.data.data.message 
          });
        })
      )
      .catch((err) => {
        console.log(err);
        if(err.response ){ 
          notify("failed to reject work order")
        }
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message
        })
      });
  };
   const fieldRef: any = useRef();
   useEffect(() => {
    if (errorMessage || successMessage && fieldRef) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth"
       });
     }
   }, [errorMessage, successMessage]);
  return (
    <>
     <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <div className="cardflex_jo">
        {emptyworkorder && (
          <div className="emptypendingworkwrap">
            <img
              src={document}
              alt="no work request"
              className="no_work_order"
            />
            <p>You have no pending work request</p>
          </div>
        )}
        {successMessage &&(<div className="wrktimelinediv" ref={fieldRef}>
          <img src={exclam} alt="img" />
          <p>{successMessage}</p>
        </div>
        )}
        {errorMessage &&(<div className="wrktimelinediv" ref={fieldRef}>
          <img src={exclam} alt="img" />
          <p>{errorMessage}</p>
        </div>
        )}
        {workorderdetails && (
          <div>
            {data.map((data, index) => {
              return (
                <div key={index}>
                  <div className="pendingwrkcard">
                    <Modal
                      centered={true}
                      onHide={closeworkModal}
                      show={terminateWorkModal}
                    >
                      <div className="terminateworkmodalwrap">
                        <div className="terminateworkmodalimg">
                          <img
                            src={closeimg}
                            alt="close"
                            onClick={closeworkModal}
                          />
                        </div>
                        <div
                         className="terminateworkmodaltitle" >
                          Decline Work
                        </div>
                        <form>
                          <textarea
                            name="reason"
                            value={reason}
                            onChange={onchange}
                            className="form-control wrkmodaltextarea"
                            placeholder="Reason for Decline"
                            rows={5}
                            cols={5}
                          ></textarea>
                        </form>
                        <div className="wrkmodal-btnwrap">
                          <span
                            className="wrkmodal-cancelbtn"
                            onClick={closeworkModal}
                          >
                            Cancel
                          </span>
                          <span className="wrkmodal-declinebtn" onClick={()=>Reject_work_order(data.id)}>Decline</span>
                        </div>
                      </div>
                    </Modal>
                    <div className="pendingwrkcard-imgwrper">
                      <img src={portfolio} alt="img" />
                    </div>
                    <div className="pendingwrkcard-contntwraper">
                      <div className="pendingwrkcard-headingdiv">
                        <div className="pendingwrkcard-heading">
                          {data.title}
                        </div>
                        <div>
                          <span className="pendingwrkcard-heading-btn">
                            <img src={greyelipse} alt="img" />
                            Work
                          </span>
                        </div>
                      </div>
                      <p>{data.description}</p>
                      <div className="pendingwrkcard-asstsdiv">
                        <div className="pendingwrkcard-loctnasset">
                          <div className="pendingwrkcard-asset-img">
                            <img src={calenda} alt="img" />
                          </div>
                          <div className="pendingwrkcard-asset-cnt">
                            <h5>Location</h5>
                            <p>
                              {data.state}, {data.country}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="pendingwrkcard-calendasset">
                            <div className="pendingwrkcard-asset-img">
                              <img src={calenda} alt="img" />
                            </div>
                            <div className="pendingwrkcard-asset-cnt">
                              <h5>duration</h5>
                              <p>{data.duration} Weeks</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pendingwrkcard-btndv">
                        <div className="pendingwrkcard-btndv1">
                          <span className="pendingwrkcard-accptbtn" onClick={()=>Accept_work_order(data.id)}>
                          {!isloading ? "Accept" : "Processing..."}
                          </span>
                          <span
                            className="pendingwrkcard-declinebtn"
                            onClick={workModal}
                          >
                            Decline
                          </span>
                        </div>
                        <div>
                          {/* <span className="pendingwrkcard-btndv2">
                            N30,000 <span>/ Week</span>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <h5 className="work_details worktitle">Work Details</h5>
                    <div className="splstworkdetailwrapper">
                      <Form>
                        <Row>
                          <Col md={12}>
                            <div className="main_wrap_ws">
                              <h6 className="userprofile12 userprofile123">
                                Work Title
                              </h6>
                              <p className="Construction12">{data.title}.</p>
                            </div>
                            <div className="main_wrap_ws">
                              <h6 className="userprofile12 userprofile123">
                                Work Description
                              </h6>
                              <p className="Construction12">
                                {data.description}.
                              </p>
                            </div>
                            <div className="main_wrap_ws">
                              <h6 className="userprofile12 userprofile123">
                                Project Purpose
                              </h6>
                              <p className="Construction12">{data.purpose}</p>
                            </div>
                            <div className="main_wrap_ws main_wrap_ws22">
                              <div>
                                <h6 className="userprofile12 userprofile123">
                                  Location
                                </h6>
                                <div className="Construction12">
                                  {data.country}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  State
                                </h6>
                                <div className="Construction12">
                                  {data.state}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  Town
                                </h6>
                                <div className="Construction12">Ikeja</div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  Location Terrain
                                </h6>
                                <div className="Construction12">
                                  {data.terrain}
                                </div>
                              </div>
                            </div>
                            <div className="main_wrap_ws main_wrap_ws22">
                              <div>
                                <h6 className="userprofile12 userprofile123">
                                  Start Date
                                </h6>
                                <div className="Construction12">
                                  {data.start_date}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  End Date
                                </h6>
                                <div className="Construction12">
                                  {data.end_date}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  Hours/day
                                </h6>
                                <div className="Construction12">
                                  {data.hours_per_day}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="userprofile12 userprofile123">
                                  Duration
                                </h6>
                                <div className="Construction12">
                                  {data.duration}
                                </div>
                              </div>
                            </div>
                            <div>
                              <hr />
                            </div>
                            <h6 className="userprofile12 userprofile123 userprofile1231">
                              Payment Cycle
                            </h6>
                            <div>{data.payment_cycle}</div>
                            <div className="splstworkdetaildiv">
                              <div className="pendingwrkcard-btndv1">
                                <span className="pendingwrkcard-accptbtn" onClick={()=>Accept_work_order(data.id)}>
                                {!isloading ? "Accept" : "Processing..."}
                                </span>
                                <span
                                  className="pendingwrkcard-declinebtn"
                                  onClick={workModal}
                                >
                                  Decline
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default Specialist_Work_details;
