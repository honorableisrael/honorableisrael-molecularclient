import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";


const Specialistdetais = () => {
const[ state, setState] =useState({
  specialist_rating: 1,
})
const{
  specialist_rating
}=state;

  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
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
              <div className="pdetbtnwrap">
                <span className="pdetssupnbtn">Suspend</span>
                <span className="pdetasgnspltbtn">Assign Specialist</span>
              </div>
            </div>
            <div className="pdwrapper">
              <div className="pdheader">Personal Information</div>
              <div className="pesonainforow1">
                <div className="pesonainfocol1">
                  <span className="pdspluserimg"></span>
                  <p className="pdheading-primary">Ikechukwu Agbai</p>
                  <p className="pduserocupation">Certified Welder</p>
                  <StarRatingComponent
                        name="specialist_rating"
                        className="specialist_rating"
                        starCount={5}
                        value={specialist_rating}
                        // onStarClick={onStarClick}
                        emptyStarColor={"#444"}
                      />
                </div>
                <div className="pesonainfocol2">
                  <p className="pdheading-primary">About</p>
                  <p className="pdcontent">
                    A promising young man who has dedicated his life to welding.
                    A graduate of Metallurgical Institute, Portharcourt, Rivers
                    State. He has been on the high wings with most top oil and
                    gas companies in Nigeria masterminding most of the
                    professional welding activities.
                  </p>
                  <p className="pdcontent">
                    He has several certifications and experiences when it comes
                    to welding, he also double as a painter and a fitter.
                  </p>
                  <p className="pdheading-primary">Age</p>
                  <p className="pdcontent">30</p>
                </div>
              </div>
              <div className="pesonainforow2">
                <div>
                  <p className="pdheading-primary">
                    Primary Skill:
                    <span className="pdcontent pdrow2content">Welding</span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Other Skills:
                    <span className="pdcontent pdrow2content">
                      Fitting, Plumbing
                    </span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Phone Number:
                    <span className="pdcontent pdrow2content">0814563217</span>
                  </p>
                </div>
                <div>
                  <p className="pdheading-primary">
                    Email:
                    <span className="pdcontent pdrow2content">
                      Agbai.ike@mail.com
                    </span>
                  </p>
                </div>
              </div>
              <div className="pesonainforow3">
                <div className="pesonainforow3-title">Qualifications:</div>
                <div className="pesonainforow3-content">
                  <div>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Best Welding Practices
                    </p>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Change Management
                    </p>
                  </div>
                  <div>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Employee Relations & Diversity
                    </p>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Organizational Development
                    </p>
                  </div>
                  <div>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Staff Coaching & Mentoring
                    </p>
                    <p className="pdcontent">
                      <span className="fa fa-circle pdbulleticon"></span>
                      Employee Performance Improvement
                    </p>
                  </div>
                </div>
              </div>
                 <div className="pdrowdemacator"></div>
              <div className="pesonainforow4">
                <div className="pesonainforow3-title">Experiences:</div>
                <p className="pesonainforow4-headers">Nestoil Welding Fabricator</p>
                <p className="pdcontent pdrow4content">
                  Most senior HR executive in Donovan, directing 4 HR
                  professionals in staffing, recruitment, benefits, executive
                  compensation, training, leadership development, succession
                  planning, HRIS, and regulatory compliance. Heavy emphasis on
                  leading Donovan through rapid HR change and transformation
                  programs.
                </p>
                <p className="pesonainforow4-headers">Energy Work welder at NNPC</p>
                <p className="pdcontent pdrow4content">
                  Enabled operational change essential to a $5M reduction in HR
                  costs. Helped to facilitate redesign of core business
                  operations, including 2 site closures and 1 fast-track
                  expansion.
                </p>
                <p className="pesonainforow4-headers">Nigeria Airforce Service</p>
                <p className="pdcontent pdrow4content">
                  Streamlined integration of VueX Wireless Systems, Donovan’s
                  largest-ever acquisition at the time. Ensured strategic
                  alignment of HR with new business objectives and minimized
                  business interruptions through execution of workforce
                  integration plans.
                </p>
                <p className="pesonainforow4-headers">Welder at Dangote Refinery</p>
                <p className="pdcontent pdrow4content">
                  Created HR organization – recruitment, staffing, onboarding,
                  training – for both expatriates and local national hires in
                  Brazil, Mexico, and Spain.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Specialistdetais;
