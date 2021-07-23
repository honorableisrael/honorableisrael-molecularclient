import React, { useEffect, useState } from "react";
import { Col, Row, Container,Modal, Spinner, Form } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import { ageCalculator, API, capitalize, notify } from "../../config";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Specialistdetais = (props) => {
  const [state, setState] = useState<any>({
    user: {},
    all_specialist: [],
    isloading: false,
    reason: "",
    show: false,
    selected_specialist: "",
  });

  useEffect(() => {
    window.scrollTo(-0, -0);
    const specialist1 = localStorage.getItem("specialist_info");
    const retrieved_specialist = specialist1 ? JSON.parse(specialist1) : "";
    setState({
      ...state,
      user: retrieved_specialist,
    });
  }, []);

  const openModal = (id) => {
    setState({
      ...state,
      show: true,
      selected_specialist: id,
    });
  };

  const accept_new_specailist = (id) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/login");
    }
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/specialists/${id}/accept`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist successfully verified");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            window.location.assign("/#allspecialist")
          }, 2000);
        })
      )
      .catch((err) => {
        notify("Specialist successfully verified", "D");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const reject_new_specailist = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/login");
    }
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      reason,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/specialists/${state.selected_specialist}/decline`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist application rejected");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            window.location.assign("/#allspecialist");
          }, 2000);
        })
      )
      .catch((err) => {
        notify("Failed to process", "D");
        setState({
          ...state,
          isloading: false,
          show: false,
        });
        console.log(err);
      });
  };
  const { admin, all_specialist, isloading, reason, show, user }: any = state;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Specialist Personal Details</title>
        <link />
      </Helmet>
      <DashboardNav />
      <Container fluid>
        <Row className="depsplstrow">
          <Col md={10}>
            <div className="title_wo title_wo12 title_wo_">
              <div className="workorderheader pdtitleheader">
                <Link to="/allspecialist">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Specialist Personal Details
              </div>
              {false && (
                <div className="pdetbtnwrap">
                  <span className="pdetssupnbtn">Suspend</span>
                  <span className="pdetasgnspltbtn">Assign Specialist</span>
                </div>
              )}
              {user.status == "Inactive" && (
                <div className="pdetbtnwrap">
                  <span
                    className="pdetssupnbtn"
                    onClick={() => openModal(user.id)}
                  >
                    {!isloading ? "Reject" : "Rejecting"}
                  </span>
                  <span
                    className="pdetasgnspltbtn"
                    onClick={accept_new_specailist}
                  >
                    {!isloading ? "Accept" : "Accepting"}
                  </span>
                </div>
              )}
            </div>
            <div className="pdwrapper">
              <div className="pdheader">Personal Information</div>
              <div className="pesonainforow1">
                <div className="pesonainfocol1">
                  <span className="pdspluserimg"></span>
                  <p className="pdheading-primary">
                    {user.last_name} {user.first_name}
                  </p>
                  <p className="pduserocupation">
                    {capitalize(user?.skills?.[0]?.name)}
                  </p>
                </div>
                <div className="pesonainfocol2">
                  <p className="pdheading-primary">About</p>
                  <p className="pdcontent">{user?.bio ?? "n/a"}</p>
                  <p className="pdcontent"></p>
                  <br />
                  <p className="pdheading-primary">dob</p>
                  <p className="pdcontent">{ageCalculator(user?.dob)}</p>
                </div>
              </div>
              <div className="pesonainforow2">
                <div>
                  <p className="pdheading-primary">
                    Primary Skill:
                    <span className="pdcontent pdrow2content">
                      {capitalize(user?.skills?.[0]?.name)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Other Skills:
                    <span className="pdcontent pdrow2content">
                      {user?.skills?.map((data, i) => (
                        <span key={i}>{capitalize(data.name)}</span>
                      ))}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Phone Number:
                    <span className="pdcontent pdrow2content">
                      {user?.phone}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Email:
                    <span className="pdcontent pdrow2content">
                      {user?.email}
                    </span>
                  </p>
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Qualifications:</div>
                <div className="pesonainforow3-content">
                  {user?.qualifications?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pdrowdemacator"></div>
              <div className="pesonainforow4">
                <div className="pesonainforow3-title">Experiences:</div>
                {user?.experiences?.map((data, i) => (
                  <div key={i}>
                    <p className="pesonainforow4-headers">{data.title}</p>
                    <p className="pdcontent pdrow4content">
                      {data.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
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
            Reject Specialist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              {isloading && <Spinner variant="info" animation={"grow"} />}
            </Col>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className="form-control reason12 reason122"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div
                className="terminate1"
                onClick={reject_new_specailist}
              >
                Reject
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Specialistdetais;
