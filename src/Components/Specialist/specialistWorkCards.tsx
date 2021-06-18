import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "../Contractor/contractor.css";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import team from "../../images/teamgroup.png";
import calenda from "../../images/calenda.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import nextbtn from "../../images/nextbtn.png";

const WorkOrderCards = (props) => {
  console.log(props)
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 100,
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
      <div className="splstprogressbarwrapper">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className=" spprogrescd">
          <div className="pipline">
            <div className="crd23">{props.title}</div>
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
                    : "Completed"}
                </span>
              </div>
            </div>
          </div>
          <div className="mnversion">
            Building a Mini version of the Eifel Tower
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
            <div className="nextbtn">
              <img src={nextbtn} alt="nxtbtn" className="nxtbtn3" />
            </div>
          </div>
          <div className="minicardwrapper spprogrescardcntn">
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Total Specialist</div>
                <div className="spcclst">23 Specialists</div>
              </div>
            </div>
            <div className="content24">
              <img src={team} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">No of Groups</div>
                <div className="spcclst">3</div>
              </div>
            </div>
            <div className="content24">
              <img src={calenda} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Duration Completed</div>
                <div className="spcclst">5 of 6 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderCards;