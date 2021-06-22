import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "../Contractor/navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/location.png";
import group3 from "../../images/Vector.png";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";

const New_Work_Order_Card = (props) => {
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
            <div className="crd23">{props.title}</div>
            <div className="inprogr">
              {props.hide == false ? (
                <div className={"bgdeepblue inprogress_4"}>
                  <span className={"paidd2green box_cust bgdeepblue"}></span>
                  <span>{props.awaiting_assignment ? "Pending" : "New"}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mnversion mnversion11">
            Building a Mini version of the Eifel Tower
          </div>
          <div className="minicardwrapper mnversion11">
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Location</div>
                <div className="spcclst">Lagos, Nigeria</div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Duration</div>
                <div className="spcclst">3</div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">From</div>
                <div className="spcclst">2nd Oct 2021</div>
              </div>
            </div>
            <div className="content24">
              <img src={group3} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">To</div>
                <div className="spcclst">22nd Oct 2021</div>
              </div>
            </div>
          </div>
          {props.hide == false ? (
            <div className="accpt_decline">
              {props.awaiting_assignment ? (
                <Link to="/admin_assign/1">
                  {" "}
                  <div className="accpt122">Assign Specialist</div>
                </Link>
              ) : (
                <>
                  <div className="accpt122">Accept</div>
                  <div className="decline122">Decline</div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default New_Work_Order_Card;
