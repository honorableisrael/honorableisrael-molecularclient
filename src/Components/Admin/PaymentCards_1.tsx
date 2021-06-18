import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/fileno.png";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";

const PaymentCards_1 = (props) => {
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
      <div className="cardwrap_jo minheight_">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
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
                    props.status == false
                      ? "paidd2 box_cust"
                      : "paidd2green box_cust"
                  }
                ></span>
                <span>
                  {props.title == false
                    ? "Paid"
                    : props.status == true
                    ? "Paid"
                    : "Unpaid"}
                </span>
              </div>
            </div>
          </div>
          <div className="slidd2">
            <Link to="/invoice_details">
              <div className="nextbtn">
                <img src={nextbtn} alt="nxtbtn" className="nxtbtn3 nxtt4" />
              </div>
            </Link>
          </div>
          <div className="nwraper">
            <div className="ppp1 ppp0">
              <div className="mnversion">INVOICE NUMBER</div>
              <p className="mnversion2"> 1233127567812 </p>
            </div>
            <div className="nnw12">Just Now</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCards_1;
