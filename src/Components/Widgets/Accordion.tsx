import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Table, Card, Spinner } from "react-bootstrap";
import { API, notify, returnAdminToken } from "../../config";
import chevrondown from "../../images/chevrondown.png";
import "./accordion.css";

const Accordions = (props) => {
  const [state, setState] = useState({
    active: "",
    collapseHeight: "0px",
    chevron: "",
    allAssignedSpecialist: [],
    isloading: false,
  });
  const { active, collapseHeight, chevron, allAssignedSpecialist, isloading } =
    state;
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Accordions;
