import React, { useState, useEffect,useRef } from "react";
import { Col, Row, Container, Form, Pagination, Modal } from "react-bootstrap";
import "../Admin/contractor.css";
import DashboardNav from "./specialistNavbar";
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
import { NavHashLink } from "react-router-hash-link";
import axios from "axios";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpecialistWorkOrderDetails = (props) => {
  const [state, setState]: any = useState({
    work_order_detail: {},
    work_orders: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    show: false,
    reason: "",
    work_group:{},
    isloading: false,
    filename:"",
    worksheet_reports: [{}],
    is_group_leader: false,
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(`${API}/specialist/work-orders/${work_order_details?.id}`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          ...res.data.data,
          work_order_detail: res.data.data,
          work_group: res.data.data.work_group,
          worksheet_reports:res.data.data.work_group.worksheet_reports,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const notify = (message: string, type = "B") =>{
    toast(message, { containerId: type, position: "top-right" });
  }
const  upLoadFile= ({target: {files}})=>{
   console.log(files[0])
   const filename=files[0].name
   let data = new FormData();
   data.append( "worksheet", files[0]);
   data.append( "group_id", work_group.id);

   const availableToken: any = localStorage.getItem("loggedInDetails");
   const token = availableToken ? JSON.parse(availableToken) : "";
   console.log(token);
   const work_order = localStorage.getItem("work_order_details");
   const work_order_details = work_order ? JSON.parse(work_order) : "";
   
   setState({
    ...state,
    isloading: true,
  })
   axios
     .post(`${API}/specialist/work-orders/${work_order_details?.id}/worksheets`,data, {
       headers: { Authorization: `Bearer ${token.access_token}` },
     })
     .then((res)=>{
        console.log(res.data) 
        if(res.data.success == true){
      setState({
        ...state,
        isloading: false,
      });
      notify("Work sheet uploaded successfully")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

 })
     .catch((err)=>{
        console.log(err.response)
          notify("failed to upload work sheet")
     })
  }
  const hiddenFileInput: any= useRef();
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  

  const {
    work_order_detail,
    work_group,
    worksheet_reports,
    project_purpose,
    country,
    work_order_description,
    order_title,
    end_date,
    filename,
    isloading,
    reason,
    location_terrain,
    start_date,
    show,
    is_group_leader,
    hour
  }: any= state;
  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
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
              <div
                className="terminate1"
                onClick={(e) => openModal(e, "Terminate")}
              >
                Terminate
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialist Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <div id="overview"></div>
        <Row className="rowt3 row3t2">
          <Col md={12} className="job34">
            <div className="title_wo title_wo12">
              <div className="workorderheader fixedtitle">
                <Link to="/works">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Work Details
              </div>
            </div>
            <Row className="mgtop">
              <Col md={3} className="job23_ mheight_">
                <p className="exp23">
                  <img src={portfolio} alt="portfolio" className="portfolioq" />
                </p>
                <NavHashLink
                  className="bview"
                  to="#overview"
                  activeStyle={{
                    backgroundColor: "#fd8b003b",
                    color: "#fd8c00",
                  }}
                >
                  Over View
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#specialist_details"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Specialist Details
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#work_details"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Work Details
                </NavHashLink>
                <NavHashLink
                  className="bview"
                  to="#actions"
                  activeStyle={{ background: "#fd8b003b", color: "#fd8c00" }}
                >
                  Actions
                </NavHashLink>
              </Col>
              <Col md={8} className="job23_1a_">
                <div id="specialist_details"></div>
                <div className="job23_1a">
                  <div className="">
                    <WorkOrderCardsMinInfo order_detail={work_order_detail} />
                  </div>
                </div>
                  <div className="job23_1a">
                  {/* <h6 className="title22">Specialists Assigned</h6> */}
                  <div className="job23_1a wrap_z">
                    <div className="group_flex">
                      <div className="grpA">
                        {work_group.name}
                      </div>
                      <div className="grpB">
                        <b>{work_group.total_members}</b> Assigned
                      </div>
                    </div>
                    {/* <div className="tabledata tabledataweb">
                      <div className="header_12 pleft">Fullname</div>
                      <div className="header_12">Type</div>
                      <div className="header_12">Group Position</div>
                      <div className="header_12">Status</div>
                    </div>
                    <div className="tabledata tablecontent">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sunday Okoro Pascal
                      </div>
                      <div className="header_12 typ22">
                        <div> Fitter</div>
                      </div>
                      <div className="header_12">
                        <div className="glead"> Group Lead </div>
                      </div>
                      <div className="header_12 active_member">
                        <div className="active_member"> Active </div>
                      </div>
                    </div> */}
                    {/* <div className="tabledata">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sandra John
                      </div>
                      <div className="header_12">
                        <div>Fitter</div>
                      </div>
                      <div className="header_12">
                        <div>Member</div>
                      </div>
                      <div className="header_12 suspended_member">
                        Suspended
                      </div>
                    </div>
                    <div className="tabledata tablecontent">
                      <div className="header_12">
                        <img src={avatar_test} className="specialist_avatar" />
                        Sunday Okoro Pascal
                      </div>
                      <div className="header_12">Fitter</div>
                      <div className="header_12">Member</div>
                      <div className="header_12 active_member">Active</div>
                    </div> */}
                    {/* <div className="active_member2">
                      <div>
                        Displaying <b> 1</b> of <b>2</b>
                      </div>
                      <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Next />
                        <Pagination.Last />
                      </Pagination>
                    </div> */}
                    <div>
                      <hr />
                    </div>
                    <div className="active_member23">
                      <div className="active_worksheet">WORKS SHEETS</div>
                      <div className="worksheet_1">
                       {worksheet_reports.map((item, index)=>{
                         return(
                           <>
                         <div className="tabledata tablecontent tablecont1" key={index}>
                          <div className="header_12 tablecont0">
                            <span>Work Sheet Week{item.week}</span>
                          </div>
                          <div className="tablecont1">
                            <a href={item.worksheet}>
                            <div className="worksheetdw worksheetdate1">
                              {" "}
                              <img
                                src={dwnload}
                                alt="dwnload"
                                className="dwnload1"
                              />
                              Download
                            </div>
                            </a>
                            <div className="worksheetdate">{item.date}</div>
                          </div>
                        </div>
                           </>
                         )
                       })} 
                       {work_order_detail.is_group_leader == true &&(
                         <div className="text-center">
                         <span className="uploadbtn" onClick={handleClick}>{!isloading ? "Upload Worksheet ":" Uploading..."}</span>
                         <input type="file" onChange={upLoadFile} ref={hiddenFileInput}  style={{ display: "none" }}/>
                        </div>
                       )} 
                      </div>
                    </div>
                    </div>
                  {/* <h6 className="title22 title22r2" id="actions">
                    Actions
                  </h6>
                  <div className="job23_1a wrap_z">
                    <div className="main_wrap_ws main_wrapp1">
                      <h3 className="userprofile12 userprofile123">
                        Quit Work
                      </h3>
                      <p className="Construction12">
                        To quit a project that has been placed, a quit request
                        has to be sent to the admin to process.
                      </p>
                      <div className="text-left">
                        <div
                          className="terminate1"
                          onClick={(e) => openModal(e, "Terminate")}
                        >
                          Terminate
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SpecialistWorkOrderDetails;
