import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "../Contractor/contractor.css";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import { Link } from "react-router-dom";
import team from "../../images/teamgroup.png";
import calenda from "../../images/greycalenda.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { formatTime } from "../../config";
import nextbtn from "../../images/nextbtn.png";

const WorkOrderCards = props => {
  console.log(props);
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 100
  });
  const handleOnChange = value => {
    setState({
      ...state,
      volume: value
    });
  };
  let { volume } = state;
  return (
    <>
      <Link
       to="/specialistWorkOrderDetails" 
       onClick={()=>{
        localStorage.setItem(
          "work_order_details",
          JSON.stringify(props.order_details)
        )
       }}
       >
        <div className="splstprogressbarwrapper">
          <div className="cardwrap_cont">
            <img src={portfolio} alt="portfolio" className="portfolio2" />
          </div>
          <div className="spprogrescd">
            <div className="pipline">
              <div className="crd23">{props.title} in {props.order_details.location}</div>
              <div>
                <div
                  className={
                    props.status == "In Review"
                      ? "wrkprogressstatswrap"
                      : props.status == "Completed"
                      ? "wrkcompletdindict"
                      : ""
                  }
                >
                  <span
                    className={
                      props.status == "In Review"
                        ? "pendininvoice"
                        : props.status == "Completed"
                        ? "paystatindcator"
                        : ""
                    }
                  ></span>
                  <span className="wrkprogtxt">
                    {props.status == "In Review"
                      ? "Inprogress"
                      : props.status == "Completed"
                      ? "Completed"
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="slidd2">
            <Slider
              value={volume}
              min={0}
              max={100}
              orientation="horizontal"
              className="sliderclass1"
              // onChange={handleOnChange}
            />
            <div className="nextbtn">
              <img src={nextbtn} alt="nxtbtn" className="nxtbtn3" />
            </div>
          </div> */}
            <div className="minicardwrapper spprogrescardcntn">
              {/* <div className="content24">
p                <div className="cntrctname">{props.contractor}</div>
              </div> */}
              <div className="content24">
                <img src={calenda} alt="cotn23" className="cotn232" />
                <div className="spcclst12">
                  <div className="spcclst1">
                    From <span>{formatTime(props.start)}</span>
                  </div>
                </div>
              </div>
              <div className="content24 towrap">
                <img src={calenda} alt="cotn23" className="cotn232" />
                <div className="spcclst12">
                  <div className="spcclst1">
                    To <span>{formatTime(props.end)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="2">
            <img src={nextbtn} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default WorkOrderCards;
