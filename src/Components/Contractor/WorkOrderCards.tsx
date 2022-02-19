import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";

const WorkOrderCards = (props) => {
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
      <div className="cardwrap_jo">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
          <div className="pipline">
            <div className="crd23">{props?.order_details?.title}</div>
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
                  {props?.order_details?.status == "New"
                    ? "New"
                    : props?.order_details?.status == "Awaiting Approval"
                    ? "Awaiting approval"
                    : props?.order_details?.status == "In Review"
                    ? "In Review"
                    :  props?.order_details?.status == "Active"?"Active":"Completed"}
                </span>
              </div>
            </div>
          </div>
          <div className="mnversion">{props?.order_details?.purpose}</div>
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
          <Link to="/contractor_work_order_details?inreview=true">
              <div className="nextbtn">
                <img
                  src={nextbtn}
                  alt="nxtbtn"
                  onClick={() =>
                    localStorage.setItem(
                      "work_order_details",
                      JSON.stringify(props.order_details)
                    )
                  }
                  className="nxtbtn3"
                />
              </div>
            </Link>
          <div className="minicardwrapper">
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Total Specialist</div>
                <div className="spcclst">
                  {props?.order_details?.total_specialists}
                </div>
              </div>
            </div>
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">No of Spread</div>
                <div className="spcclst">
                  {props?.order_details?.total_groups}
                </div>
              </div>
            </div>
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Duration Completed</div>
                <div className="spcclst">
                  {props?.order_details?.current_week} of{" "}
                  {props?.order_details?.duration} weeks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderCards;
