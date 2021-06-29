import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import { ageCalculator, capitalize } from "../../config";

const Specialistdetais = () => {
  const [state, setState] = useState<any>({
    user: {},
  });
  useEffect(() => {
    window.scrollTo(-0,-0)
    const specialist1 = localStorage.getItem("specialist_info");
    const retrieved_specialist = specialist1 ? JSON.parse(specialist1) : "";
    setState({
      ...state,
      user: retrieved_specialist,
    });
  }, []);
  const { user } = state;
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
                  <p className="pdcontent">{user?.bio??"n/a"}</p>
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
    </>
  );
};

export default Specialistdetais;
