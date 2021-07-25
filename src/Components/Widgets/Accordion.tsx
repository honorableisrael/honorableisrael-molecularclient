import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Table, Card, Spinner, Col } from "react-bootstrap";
import { API, formatTime, notify, returnAdminToken } from "../../config";
import chevrondown from "../../images/chevrondown.png";
import "./accordion.css";
import no_work_order from "../../images/document 1.png";
import dwnload from "../../images/dwnload.png";

const Accordions = (props) => {
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
    allAssignedSpecialist,
    isloading,
    work_sheet,
  } = state;
  const content: any = useRef();
  const toggleAccordion = () => {
    // setState({
    //   ...state,
    //   active: active === "" ? "active" : "",
    //   collapseHeight:
    //     active === "active" ? "0px" : `${content.current.scrollHeight}px`,
    //   chevron: active === "active" ? "" : "arrowflip",
    // });
  };
  const assign_group_lead = (lead_id) => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    const data = {
      leader: lead_id,
    };
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/specialist-groups/${props?.group_data?.id}/leader`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          notify("Successfully assigned team lead");
        })
      )
      .catch((err) => {
        notify("Failed to assign team lead", "D");
        console.log(err);
      });
  };
  const fetch_details = (id) => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/admin/work-orders/specialist-groups/${id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            allAssignedSpecialist: res.data.data.members,
            work_sheet: res.data.data.worksheet_reports,
            isloading: false,
            active: active === "" ? "active" : "",
            collapseHeight: active === "active" ? "0px" : `fit-content`,
            chevron: active === "active" ? "" : "arrowflip",
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          active: active === "" ? "active" : "",
          collapseHeight:
            active === "active" ? "0px" : `${content.current.scrollHeight}px`,
          chevron: active === "active" ? "" : "arrowflip",
        });
        console.log(err);
      });
  };
  console.log(props);
  return (
    <>
      <div className="dplsplsacc">
        <Card>
          <div onClick={toggleAccordion}>
            <div
              className="deploydsplstwrapp"
              onClick={() => fetch_details(props?.group_data?.id)}
            >
              <div>
                <span className="dploygrpsalpbt">{props?.title}</span>
                <span className="deplyeaggrgt">
                  {props?.group_data?.total_members} Assigned
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
          <div className="deployedsplsttable">
            <Table hover>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Skill</th>
                  <th>Position</th>
                  <th>Assign group lead</th>
                </tr>
              </thead>
              <tbody>
                {allAssignedSpecialist?.map((data: any, i) => (
                  <tr key={i}>
                    <td className="dpslstnamecell">
                      <div className="dplsplusernmeimg">
                        <span></span>
                        <div>
                          {data.first_name}&nbsp;{data.last_name}
                        </div>
                      </div>
                    </td>
                    <td>{data?.skills[0]?.name}</td>
                    <td>{data?.leader ? "Team Lead" : "Member"}</td>
                    <td className="depspltabcol1">
                      {!data?.leader ? (
                        <input
                          type="radio"
                          name="team_lead"
                          onClick={() => assign_group_lead(data.id)}
                        />
                      ) : (
                        "~~/~~"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="active_worksheet">WORKS SHEETS</div>
            {true && (
              <>
                <Col md={11} className="containerforemptyorder1 cust20">
                  {work_sheet.length == 0 && (
                    <>
                      <div className="containerforemptyorder">
                        <img
                          src={no_work_order}
                          alt={"no_work_order"}
                          className="no_work_order"
                        />
                      </div>
                      <div className="no_work1">
                        <div>work sheet have not been uploaded</div>
                      </div>
                    </>
                  )}
                </Col>
                <div className="worksheet_1">
                  {work_sheet.map((data: any, i) => (
                    <div className="tabledata tablecontent tablecont1">
                      <div className="header_12 tablecont0">
                        <span>Worksheet Report {data.week}</span>
                      </div>
                      <div className="tablecont1">
                        <div className="worksheetdw worksheetdate1">
                          {" "}
                          <img
                            src={dwnload}
                            alt="dwnload"
                            className="dwnload1"
                          />
                          <a href={data.worksheet_reports} target={"blank"}>
                            Download
                          </a>
                        </div>
                        <div className="worksheetdate">
                          {formatTime(data.date)}
                        </div>
                        uploaded by {data.uploaded_by}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Accordions;
