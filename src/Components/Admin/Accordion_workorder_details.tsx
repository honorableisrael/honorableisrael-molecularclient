import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Table, Card, Spinner, Col } from "react-bootstrap";
import { API, formatTime, notify, returnAdminToken } from "../../config";
import chevrondown from "../../images/chevrondown.png";
import "../Widgets/accordion.css";
import no_work_order from "../../images/document 1.png";
import dwnload from "../../images/dwnload.png";

const Accordion_Work_order = (props) => {
  const [state, setState] = useState({
    active: "",
    collapseHeight: "0px",
    chevron: "",
    allAssignedSpecialist: [],
    isloading: false,
    work_sheet: [],
  });
  const {
    active,
    collapseHeight,
    chevron,
    isloading,
    allAssignedSpecialist,
    work_sheet,
  } = state;
  const content: any = useRef();
  const toggleAccordion = () => {
    setState({
      ...state,
      active: active === "" ? "active" : "",
      collapseHeight:
        active === "active" ? "0px" : `${content.current.scrollHeight}px`,
      chevron: active === "active" ? "" : "arrowflip",
    });
  };

  return (
    <>
      <div className="dplsplsacc">
        <Card>
          <div onClick={toggleAccordion}>
            <div className="deploydsplstwrapp">
              <div>
                <span className="dploygrpsalpbt">{props?.title}</span>
                <span className="deplyeaggrgt">
                  {props?.group_data?.total_members} Invited Specialist
                </span>
              </div>
              <div className="accimgwrap">
                <span>
                  <img src={chevrondown} className={`arrow-down ${chevron}`} />
                </span>
              </div>
            </div>
          </div>
        </Card>
        {isloading && <Spinner animation={"grow"} variant="info" />}
        <div
          style={{ maxHeight: `${collapseHeight}` }}
          className="acccollapsediv"
          ref={content}
        >
          new content
        </div>
      </div>
    </>
  );
};
export default Accordion_Work_order;
