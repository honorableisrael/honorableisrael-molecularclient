import React, { useState, useRef } from "react";
import { Table, Card } from "react-bootstrap";
import chevrondown from "../../images/chevrondown.png";
import './accordion.css';

const Accordions = props => {
  const [state, setState] = useState({
    active: "",
    collapseHeight: "0px",
    chevron: ""
  });
  const { active, collapseHeight, chevron } = state;
  const content: any = useRef();
  const toggleAccordion = () => {
    setState({
      ...state,
      active: active === "" ? "active" : "",
      collapseHeight:
        active === "active" ? "0px" : `${content.current.scrollHeight}px`,
      chevron: active === "active" ? "" : "arrowflip"
    });
  };

  return (
    <>
      <div className="dplsplsacc">
        <Card>
          <div onClick={toggleAccordion}>
            <div className="deploydsplstwrapp">
              <div>
                <span className="dploygrpsalpbt">{props.title}</span>
                <span className="deplyeaggrgt">24 DEPLOYED</span>
              </div>
              <div className="accimgwrap">
                <div className="splstsuspdbtn">Suspend</div>
                <span>
                  <img src={chevrondown}  className={`arrow-down ${chevron}`} />
                </span>
              </div>
            </div>
          </div>
        </Card>
        <div
          style={{ maxHeight: `${collapseHeight}` }}
          className="acccollapsediv"
          ref={content}
        >
          <div className="deployedsplsttable">
            <Table hover>
              <thead>
                <tr>
                  <th className="depspltabcol1"></th>
                  <th>Full Name</th>
                  <th>Skill</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="depspltabcol1">
                    <input type="checkbox" />
                  </td>
                  <td className="dpslstnamecell">
                    <div className="dplsplusernmeimg">
                      <span></span>
                      <div>Sunday Okoro Pascal</div>
                    </div>
                  </td>
                  <td>Fitter</td>
                  <td>Group Lead</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td className="depspltabcol1">
                    <input type="checkbox" />
                  </td>
                  <td className="dpslstnamecell">
                    <div className="dplsplusernmeimg">
                      <span></span>
                      <div>Sunday Okoro Pascal</div>
                    </div>
                  </td>
                  <td>Fitter</td>
                  <td>Member</td>
                  <td>23-04-2021</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Accordions;
