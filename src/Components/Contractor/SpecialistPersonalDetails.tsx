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
  contractorToken,
  formatTime,
  notify,
  returnAdminToken,
} from "../../config";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Specialist_Details_For_Contractor = (props) => {
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
      .get(`${API}/contractor/specialists/${props.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${contractorToken()?.access_token}`,
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

  
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  
  const { admin, all_specialist, isloading, reason, show, user }: any = state;
  console.log(user);
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
              <div className="workorderheader pdtitleheader" onClick={()=>window.history.back()}>
                <>
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </>
                Specialist Personal Details
              </div>
            </div>
            <div className="pdwrapper">
              <div className="pdheader">Basic Information</div>
              <div className="pesonainforow1">
                <div className="pesonainfocol1">
                  <span className="pdspluserimg"></span>
                  <p className="pduserocupation">
                    {capitalize(user?.skill)}
                  </p>
                </div>
                <div className="pesonainfocol2">
                  <p className="pdheading-primary">Specialist Reference</p>
                  <p className="pdcontent">{user?.reference ?? "n/a"}</p>
                  <p className="pdcontent"></p>
                </div>
              </div>
             
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Projects:</div>
                <div className="pesonainforow3-content">
                  {user?.projects?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data.title}{" "}
                        <small>
                          {formatTime(data?.from)} ~~ {formatTime(data?.to)}
                        </small>
                      </p>
                      <p className="pdcontent pdrow4content">{data.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Certification:</div>
                <div className="pesonainforow3-content">
                  {user?.certifications?.map((data, i) => (
                    <div key={i}>
                      <p className="pdcontent">
                        <span className="fa fa-circle pdbulleticon"></span>
                        {data?.title}{" "}
                        <small>
                          {formatTime(data?.from)} ~~ {formatTime(data?.to)}
                        </small>
                      </p>
                      <p className="pdcontent pdrow4content">
                        {data.institution}
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
    </>
  );
};

export default Specialist_Details_For_Contractor;
