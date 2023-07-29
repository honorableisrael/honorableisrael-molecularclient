import React, { useState } from "react";
import "../Contractor/contractor.css";
import portfolio from "../../images/fileno.png";
import "react-rangeslider/lib/index.css";
import { Link } from "react-router-dom";
import nextbtn from "../../images/nextbtn.png";
import { formatTime } from "../../config";


const SplPaymentCards = props => {
  const [state, setState] = useState({
    volume: props.status == "Awaiting Approval" ? 0 : 100
  });

  
  return (
    <>
    <Link 
     to={`/Specialist_Payment_Invoice/${props?.payment_details?.id}`}
     className="paymentlink"
     onClick={()=>{
      localStorage.setItem(
        "Invoice_payment_details",
        JSON.stringify(props.payment_details)
      )
     }}
     >
      <div className="cardwrap_jo minheight_">
        <div className="cardwrap_cont">
          <img src={portfolio} alt="portfolio" className="portfolio2" />
        </div>
        <div className="card_sec2">
          <div className="pipline">
            <div className="crd23">{props?.payment_details?.work_order?.title} in {props?.payment_details?.work_order?.location}</div>
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
          <div className="slidd2">
            <Link to={`/Specialist_Payment_Invoice/${props?.payment_details?.id}`}>
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
      </Link>
    </>
  );
};

export default SplPaymentCards;
