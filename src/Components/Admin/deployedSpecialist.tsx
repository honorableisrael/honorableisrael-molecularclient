import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Modal,
  Card,
  Pagination,
  Form,
  Button,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import blueavatar from "../../images/group2.png";
import Accordions from "../Widgets/Accordion";
import axios from "axios";
import { API, notify, returnAdminToken } from "../../config";
import { ToastContainer } from "react-toastify";

const DeployedSpecialist = withRouter((props) => {
  const [state, setState] = useState({
    overview: true,
    deployedspecialist: false,
    active: false,
    thirdtab: false,
    chevron: "",
    work_order_detail: {},
    workDetails: {},
    isloading: false,
    ungrouped: false,
    grouped: false,
    allUngrouped: [],
    allAssignedSpecialist: [],
    AllgroupedSpecialist: [],
    show: false,
    group_name: "",
    group_description: "",
    next_page: "",
    prev_page: "",
    current: "",
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
  const {
    overview,
    deployedspecialist,
    work_order_detail,
    isloading,
    group_name,
    group_description,
    show,
    ungrouped,
    grouped,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  } = state;

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const CreateNewGroup = () => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    const data = {
      name: group_name,
      additional_information: group_description,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/${work_order_details?.id}/specialist-groups`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          notify("Successful");
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        notify("Failed to create work group","D")
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const DeleteGroup = (x) => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.delete(
          `${API}/admin/work-orders/specialist-groups/${work_order_details?.id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          notify("Successful");
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        notify("Failed to delete work group","D")
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            AllgroupedSpecialist: res.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const get_all = (a) => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      overview: a == "overview" ? true : false,
      grouped: a == "grouped" ? true : false,
      ungrouped: a == "ungrouped" ? true : false,
    });
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios
        .get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        })
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            AllgroupedSpecialist: res.data.data.data,
            work_order_detail:res.data.data,
          });
          console.log(work_order_detail)
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const get_grouped = (a) => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      overview: a == "overview" ? true : false,
      grouped: a == "grouped" ? true : false,
      ungrouped: a == "ungrouped" ? true : false,
    });
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists/grouped`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            AllgroupedSpecialist: res.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const get_ungrouped = (a) => {
    setState({
      ...state,
      overview: a == "overview" ? true : false,
      grouped: a == "grouped" ? true : false,
      ungrouped: a == "ungrouped" ? true : false,
    });
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists/ungrouped`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            allUngrouped: res.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const nextPage = (a) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      overview: a == "overview" ? true : false,
      grouped: a == "grouped" ? true : false,
      ungrouped: a == "ungrouped" ? true : false,
    });
    axios
      .all([
        axios.get(`${a}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          window.scrollTo(-0, -0);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const openModal = () => {
    setState({
      ...state,
      show: true,
    });
  };
  console.log(work_order_detail)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Deployed Specialists</title>
        <link />
      </Helmet>
      <Modal
        size="lg"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Manage Groups
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <Row>
                  <Col md={6} className="formsection1">
                    <Form.Group>
                      <h6 className="userprofile">Group name</h6>
                      <Form.Control
                        type="text"
                        value={group_name}
                        className="userfield"
                        id="group_name"
                        onChange={onchange}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="formsection1">
                    <Form.Group>
                      <h6 className="userprofile">Group Description</h6>
                      <Form.Control
                        type="text"
                        value={group_description}
                        className="userfield"
                        id="group_description"
                        onChange={onchange}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="create_group success">
                <Button className="manage_" onClick={CreateNewGroup}>
                  {isloading ? "processing" : "Create"}{" "}
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="avvworkgroup">
            <Col md={12}>Available Work Groups</Col>
            <Col md={12}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Additional information</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="dpslstnamecell">
                      <div className="dplsplusernmeimg">
                        <span></span>
                        <div>Group A</div>
                      </div>
                    </td>
                    <td></td>{" "}
                    <td className="depspltabcol1">
                      <Button className="btn-danger" onClick={()=>DeleteGroup("1")}>Delete</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <DashboardNav />
      <Container fluid>
        <Row className="depsplstrow">
          <Col md={11}>
            <div className="title_wo title_wo12 title_wo_">
              <div className="workorderheader">
                <Link to="/admin_work_details?inreview=true">
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </Link>
                &nbsp; Assigned Specailist
              </div>
              <div className="manage_" onClick={openModal}>
                Create Groups
              </div>
            </div>
            <div className="dpsplsttabs">
              <div
                onClick={() => get_all("overview")}
                className={overview ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              <div
                onClick={() => get_grouped("grouped")}
                className={grouped ? "inprogress tab_active" : "inprogress"}
              >
                Grouped
              </div>
              <div
                onClick={() => get_ungrouped("ungrouped")}
                className={ungrouped ? "inprogress tab_active" : "inprogress"}
              >
                Ungrouped
              </div>
            </div>
            <div>
              {overview && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>All Specialists deployed to this work order</p>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Skill</th>
                          <th>Position</th>
                          <th>Status</th>
                          <th>Select Team Lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="dpslstnamecell">
                            <div className="dplsplusernmeimg">
                              <span></span>
                              <div>Sunday Okoro Pascal</div>
                            </div>
                          </td>
                          <td>Fitter</td>
                          <td>Group Lead</td>
                          <td>Active</td>{" "}
                          <td className="depspltabcol1">
                            <input type="radio" name="team_lead" />
                          </td>
                        </tr>
                        <tr>
                          <td className="dpslstnamecell">
                            <div className="dplsplusernmeimg">
                              <span></span>
                              <div>Sunday Okoro Pascal</div>
                            </div>
                          </td>
                          <td>Fitter</td>
                          <td>Member</td>
                          <td>23-04-2021</td>{" "}
                          <td className="depspltabcol1">
                            <input type="radio" name="team_lead" />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {overview && (
                      <div className="active_member2">
                        <div>
                          Displaying <b>{current_page}</b> of <b>{last_page}</b>
                        </div>
                        <Pagination>
                          <Pagination.First onClick={() => nextPage(first)} />
                          <Pagination.Prev onClick={() => nextPage(prev)} />
                          <Pagination.Next onClick={() => nextPage(next)} />
                          <Pagination.Last onClick={() => nextPage(last)} />
                        </Pagination>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {grouped && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>All Specialists deployed to this work order</p>
                  </div>
                  <Accordions title="Group A" />
                  <Accordions title="Group B" />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default DeployedSpecialist;
