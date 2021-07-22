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
      <div className="cardwrap_jo">
        {/* <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div> */}
        <div className="c_ard_sec2">
          <div className="pipline pipline__">
            <div className="crd23"> {props?.order_detail?.title}</div>
            <div className="inprogr">
              <div
                className={
                  props?.order_detail?.status == "New"
                    ? "unpaid1 inprogress_4"
                    : "unpaidgreen inprogress_4"
                }
              >
                <span
                  className={
                    props?.order_detail?.status == "New"
                      ? "paidd2 box_cust"
                      : "paidd2green box_cust"
                  }
                ></span>
                <span>
                  {props?.order_detail?.status == "In Review"
                    ? "In Review"
                    : props.status == "Awaiting Approval"
                    ? "Awaiting approval"
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
