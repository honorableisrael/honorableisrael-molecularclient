import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/fileno.png";
import "react-rangeslider/lib/index.css";
import nextbtn from "../../images/nextbtn.png";
import { Link } from "react-router-dom";
import { formatTime } from "../../config";

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
  console.log(props?.payment_details)
  return (
    <>
      <div className="cardwrap_jo minheight_">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
          <div className="pipline">
            <div className="crd23">{props?.payment_details?.work_order?.title}</div>
            <div className="inprogr">
              <div
                className={
                  props?.payment_details?.total_amount_paid < 0
                    ? "unpaid1 inprogress_4"
                    : "unpaidgreen inprogress_4"
                }
              >
                <span
                  className={
                    props?.payment_details?.total_amount_paid < 0
                      ? "paidd2 box_cust"
                      : "paidd2green box_cust"
                  }
                ></span>
                <span>
                  {props?.payment_details?.total_amount_paid > 0
                    ? "Paid"
                    : "Unpaid"
                    }
                </span>
              </div>
            </div>
          </div>
          <div className="slidd2z">
            <Link to={`/admin_invoice_details/${props?.payment_details?.id}/${props?.payment_details?.work_order?.id}`}>
              <div className="nextbtn">
                <img src={nextbtn} alt="nxtbtn" className="nxtbtn3 nxtt4" />
              </div>
            </Link>
          </div>
          <div className="nwraper">
            <div className="ppp1 ppp0">
              <div className="mnversion">INVOICE NUMBER</div>
              <p className="mnversion2"> {props?.payment_details?.number} </p>
            </div>
            <div className="nnw12">{formatTime(props?.payment_details?.sent_at)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCards_1;
