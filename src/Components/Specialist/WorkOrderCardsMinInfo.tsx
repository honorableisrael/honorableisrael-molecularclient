import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "../Admin/contractor.css";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";

const WorkOrderCardsMinInfo = (props) => {
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 0,
  });
  const handleOnChange = (value) => {
    setState({
      ...state,
      volume: value,
    });
  };
  let { volume } = state;
  return (
    <>
      <div className="splstcardwrap_jo">
        {/* <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div> */}
        <div className="c_ard_sec2 splcardsec2">
          <div className="pipline pipline__">
            <div className="crd23"> {props?.order_detail?.title} in {props?.order_detail?.location} </div>
            <div className="inprogr">
              <div
                className= {
                  props?.order_detail?.status == "In Review"
                    ? " wrkprogressstatswrap"
                    : props?.order_details?.status == "Completed"
                    ? "wrkcompletdindict"
                    : ""
                }
              >
                <span
                  className= {
                    props?.order_detail?.status == "In Review"
                      ? "pendininvoice"
                      : props?.order_detail?.status == "Completed"
                      ? "paystatindcator"
                      : ""
                  }
                ></span>
                <span className="wrkprogtxt">
                  {props?.order_detail?.status == "In Review"
                    ? "In Progress"
                    : props.status == "Completed"
                    ? "Completed"
                    : props?.order_detail?.status}
                </span>
              </div>
            </div>
          </div>
          <div className="mnversion">{props?.order_detail?.purpose}</div>
          <div className="slidd2">
            <Slider
              value={volume}
              min={0}
              max={100}
              orientation="horizontal"
              className="sliderclass1"
              // onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderCardsMinInfo;
