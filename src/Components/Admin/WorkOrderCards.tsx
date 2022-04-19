import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import email2 from "../../assets/email.png";
import Phone_icon from "../../assets/Phone_icon.png";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";

const WorkOrderCards = (props) => {
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 100,
    show: true,
  });
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  let { volume, show } = state;
  return (
    <>
      <div className="cardwrap_jo">
        <div className="cardwrap_cont">
          <img src={props.contractor?.logo?props?.contractor?.logo:portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
          <div className="pipline">
            <div className="crd23">
              {" "}
              {/* <Link to="/admin_work_details?hide_info"> */}
                {props?.contractor?.company_name}
              {/* </Link> */}
            </div>
            <div className="inprogr">
              <div
                className={
                  props.title == "Pipeline construction with Sulejah"
                    ? "unpaid1 inprogress_4"
                    : "unpaidgreen inprogress_4"
                }
              >
                <span
                  className={
                    props.title == "Pipeline construction with Sulejah"
                      ? "paidd2 box_cust"
                      : "paidd2green box_cust"
                  }
                ></span>
                <span>
                  {props.title == "Pipeline construction with Suleja"
                    ? "In progress"
                    : props.status == "Awaiting Approval"
                    ? "Awaiting approval"
                    : props?.contractor?.status}
                </span>
              </div>
            </div>
          </div>
          <div className="mnversion">
            {" "}
            {/* <Link to="/admin_work_details?hide_info"> */}
              {props?.contractor?.address}
            {/* </Link> */}
          </div>
          <div className="slidd2">
            <Slider
              value={volume}
              min={0}
              max={100}
              orientation="horizontal"
              className="sliderclass1"
              // onChange={handleOnChange}
            />
            {/* <Link to="/admin_work_details?hide_info">
              <div className="nextbtn">
                <img src={nextbtn} alt="nxtbtn" className="nxtbtn3" />
              </div>
            </Link> */}
          </div>
          <div className="minicardwrapper">
            <div className="content24">
              <img src={props?.contractor?.industry_icon??group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Industry</div>
                <div className="spcclst">{props?.contractor?.industry}</div>
              </div>
            </div>
            <div className="content24">
              <img src={Phone_icon} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Contact Phone</div>
                <div className="spcclst">{props?.contractor?.contractor?.phone??"n/a"}</div>
              </div>
            </div>
            <div className="content24">
              <img src={email2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Contact Email</div>
                <div className="spcclst"><a href={`mailto:${props?.contractor?.contractor?.email??"n/a"}`}>{props?.contractor?.contractor?.email??"n/a"}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderCards;
