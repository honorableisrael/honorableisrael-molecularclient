import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "../Contractor/navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";

const AdminWorkOrderCards = (props) => {
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
              <div
                className=
                {props.status == "In progress"
                  ? "inprogress_4 unpaid1 paidd2"
                  : props.status == "Awaiting Approval"
                  ? " inprogress_4 unpaid1"
                  : props.status == "Terminated"
                  ? "inprogress_4 unpaid1 "
                  : props.status == "Pending"
                  ? "inprogress_4 unpaid1"
                  : props.status == "In Review"
                  ? "inprogress_4 lightblack unpaid1"
                  :props.status=="Completed"
                  ?
                  "inprogress_4  unpaidgreen lggreen"
                  :""
                
                }
              >
                <span
                  className=
                  {props.status == "In progress"
                  ? "paidd2 box_cust"
                  : props.status == "paidd2green box_cust"
                  ? "Awaiting Approval"
                  : props.status == "Terminated"
                  ? "Terminated"
                  : props.status == "Pending"
                  ? "Pending"
                  : props.status == "In Review"
                  ? "paidd2green lightblack"
                  : props.status}
                ></span>
                <span>
                  {props.status == "In progress"
                    ? props.status
                    : props.status == "Awaiting Approval"
                    ? "Awaiting Approval"
                    : props.status == "Terminated"
                    ? "Terminated"
                    : props.status == "Pending"
                    ? "Pending"
                    : props.status == "In Review"
                    ? "In Review"
                    : props.status}
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
            <Link to="/contractor_work_order_details">
              <div className="nextbtn">
                <img src={nextbtn} alt="nxtbtn" className="nxtbtn3" />
              </div>
            </Link>
          </div>
          <div className="minicardwrapper">
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">Total Specialist</div>
                <div className="spcclst">23 Specialists</div>
              </div>
            </div>
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
              <div className="spcclst12">
                <div className="spcclst1">No of Groups</div>
                <div className="spcclst">3</div>
              </div>
            </div>
            <div className="content24">
              <img src={group2} alt="cotn23" className="cotn232" />
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

export default AdminWorkOrderCards;
