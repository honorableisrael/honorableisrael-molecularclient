import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import checkcircle from "../../images/check-circle.png";
import "./contractor.css";
import "react-rangeslider/lib/index.css";
import axios from "axios";
import { API } from "../../config";
import welder from "../../images/welder.png";
import { withRouter } from "react-router-dom";

const Specialist_card = withRouter((props: any) => {
  const [state, setState] = useState({
    all_specialist: [],
    country: "",
    inprogress: true,
    pending_request: false,
    specialist_rating: 5,
  });
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  const { specialist_rating, inprogress, pending_request } = state;

  return (
    <>
      <div className="container_01">
        <div className="checkbox_craftman">
          {/* <input type="checkbox" className="selectcheck" /> */}
          <label className="container_box container_box11">
            {props?.specialist_data?.status == "Inactive" && (
              <span className="status_1">{props?.specialist_data?.status}</span>
            )}
            {props?.specialist_data?.status == "Active" && (
              <span className="status_2">
                {props?.specialist_data?.status ? "Active" : ""}
              </span>
            )}
          </label>
        </div>

        <div className="imagecontainer01">
          <img src={welder} className="welder" alt="welder" />
        </div>
        <div className="cardbody01 flex_card1">
          <div>
            <div>
              <span className="cardname">
                {props?.specialist_data?.last_name ?? "n/a"}{" "}
                {props?.specialist_data?.first_name ?? "n/a"}
              </span>{" "}
              <span className="cerfified1">
                {props?.specialist_data?.skills[0]?.name ?? "n/a"}
              </span>
            </div>
            <div className="prim_skills">
              Secondary Skills:{" "}
              {props?.specialist_data?.skills?.map((data) => data.name)}
            </div>
            <div className="prim_skills">
              <span className="leveltitle"> Expert Level:</span>{" "}
              <StarRatingComponent
                name="specialist_rating"
                className="specialist_rating"
                starCount={5}
                value={specialist_rating}
                onStarClick={onStarClick}
                emptyStarColor={"#444"}
              />
            </div>
          </div>

          <div className="assigncont">
            <button
              value="Assign"
              className="assign12 btn_Cust"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem(
                  "specialist_info",
                  JSON.stringify(props.specialist_data)
                );
                props.history.push("/specialistdetails");
              }}
            >
              View Profile{" "}
              <span>
                <img src={checkcircle} className="checkcircle1 " alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Specialist_card;
