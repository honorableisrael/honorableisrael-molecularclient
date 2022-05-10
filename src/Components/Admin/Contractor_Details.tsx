import React, { useEffect, useState } from "react";
import { Col, Row, Container, Modal, Spinner, Form } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import {
  ageCalculator,
  API,
  capitalize,
  formatTime,
  notify,
  reloadPage,
  returnAdminToken,
} from "../../config";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contractor_Details = (props) => {
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
    axios
      .get(`${API}/admin/contractors/${props.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${returnAdminToken()?.access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          user: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = (id) => {
    setState({
      ...state,
      show: true,
      selected_specialist: id,
    });
  };
  const generate_virtual_account = () => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/contractors/${props.match.params.id}/virtual-account`,
          {},
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken()?.access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          reloadPage();
          notify("Successful");
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
        console.log(err);
      });
  };

  const { admin, all_specialist, isloading, reason, show, user }: any = state;
  console.log(user);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Contractor Details</title>
        <link />
      </Helmet>
      <DashboardNav />
      <Container fluid>
        <Row className="depsplstrow">
          <Col md={10}>
            <div className="title_wo title_wo12 title_wo_">
              <div className="workorderheader pdtitleheader">
                <Link to="/contractor_list">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                Contractor Details
              </div>
              {!user?.virtual_bank_account && (
                <div className="pdetbtnwrap">
                  <span
                    className="wrkmodal-declinebtn addexpbtn"
                    onClick={generate_virtual_account}
                  >
                    {isloading ? "Processing" : " Generate Virtual Account"}
                  </span>
                </div>
              )}
            </div>
            <div className="pdwrapper">
              <div className="pdheader">Basic Information</div>
              <div className="pesonainforow1">
                <div className="pesonainfocol1">
                  {user?.industry_icon ? (
                    <span className="spluserimg mrt5">
                      <img src={user?.industry_icon} className="useravatar" />
                    </span>
                  ) : (
                    <span className="pdspluserimg"></span>
                  )}
                  <p className="pdheading-primary">{user.company_name}</p>
                  <p className="pduserocupation">
                    Ongoing jobs: {user?.ongoing_jobs}
                  </p>
                </div>
                <div className="pesonainfocol2">
                  <p className="pdheading-primary">Address</p>
                  <p className="pdcontent">{user?.address ?? "n/a"}</p>
                  <p className="pdcontent"></p>
                  <br />
                  <p className="pdheading-primary">Interest</p>
                  <p className="pdcontent">{user?.need}</p>
                </div>
              </div>
              <div className="pesonainforow2">
                <div>
                  <p className="pdheading-primary">
                    Completed Jobs:
                    <span className="pdcontent pdrow2content">
                      {capitalize(user?.completed_jobs)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Industry:
                    <span className="pdcontent pdrow2content">
                      {user?.industry}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Country:
                    <span className="pdcontent pdrow2content">
                      {user?.country}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    State:
                    <span className="pdcontent pdrow2content">
                      {user?.state}
                    </span>
                  </p>
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">
                  Virtual Bank Details:
                </div>
                <div className="pesonainforow3-content">
                  {/* {user?.qualifications?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data?.title}{" "}
                        <small>
                          {formatTime(data?.from)} ~~ {formatTime(data?.to)}
                        </small>
                      </p>
                      <p className="pdcontent pdrow4content">
                        {data.description}
                      </p>
                    </div>
                  ))} */}
                  <div className="pesonainfocol2 wdf">
                    <div className="fwe1">
                      <p className="pdheading-primary">Account name </p>
                      <p className="pdcontent">
                        {user?.virtual_bank_account?.account_name ?? "n/a"}{" "}
                      </p>
                    </div>
                    <p className="pdcontent"></p>
                    <br />
                    <div className="fwe1">
                      <p className="pdheading-primary">Account number</p>
                      <p className="pdcontent">
                        {user?.virtual_bank_account?.account_number ?? "n/a"}
                      </p>
                    </div>
                    <div className="fwe1">
                      <p className="pdheading-primary">Bank Name</p>
                      <p className="pdcontent">
                        {user?.virtual_bank_account?.bank_name ?? "n/a"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Contractor:</div>
                <div className="pesonainforow3-content">
                  {/* {user?.qualifications?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data?.title}{" "}
                        <small>
                          {formatTime(data?.from)} ~~ {formatTime(data?.to)}
                        </small>
                      </p>
                      <p className="pdcontent pdrow4content">
                        {data.description}
                      </p>
                    </div>
                  ))} */}
                  <div className="pesonainfocol2 wdf">
                    <div className="fwe1">
                      <p className="pdheading-primary">Fullname</p>
                      <p className="pdcontent">
                        {user?.contractor?.first_name ?? "n/a"}{" "}
                        {user?.contractor?.last_name ?? "n/a"}
                      </p>
                    </div>
                    <p className="pdcontent"></p>
                    <br />
                    <div className="fwe1">
                      <p className="pdheading-primary">Email</p>
                      <p className="pdcontent">{user?.contractor?.email}</p>
                    </div>
                    <div className="fwe1">
                      <p className="pdheading-primary">Phone</p>
                      <p className="pdcontent">{user?.contractor?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Contacts:</div>
                <div className="pesonainforow3-content">
                  {/* {user?.qualifications?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data?.title}{" "}
                        <small>
                          {formatTime(data?.from)} ~~ {formatTime(data?.to)}
                        </small>
                      </p>
                      <p className="pdcontent pdrow4content">
                        {data.description}
                      </p>
                    </div>
                  ))} */}
                  {user?.contacts?.map((data, i) => (
                    <div className="pesonainfocol2 wdf" key={i}>
                      <div className="fwe1">
                        <p className="pdheading-primary">Fullname</p>
                        <p className="pdcontent">
                          {data?.first_name ?? "n/a"}{" "}
                          {data?.last_name ?? "n/a"}
                        </p>
                      </div>
                      <br />
                      <div className="fwe1">
                        <p className="pdheading-primary">Email</p>
                        <p className="pdcontent">{data?.email}</p>
                      </div>
                      <div className="fwe1">
                        <p className="pdheading-primary">Phone</p>
                        <p className="pdcontent">{data?.phone}</p>
                      </div>
                      <div className="fwe1">
                        <p className="pdheading-primary">Role</p>
                        <p className="pdcontent">{data?.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
             
              <div className="pdrowdemacator"></div>
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
                  // onChange={onchange}
                  className="form-control reason12 reason122"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Contractor_Details;
