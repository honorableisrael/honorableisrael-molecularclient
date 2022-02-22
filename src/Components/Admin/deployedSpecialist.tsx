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
  Spinner,
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
  const [state, setState] = useState<any>({
    overview: true,
    deployedspecialist: false,
    active: false,
    thirdtab: false,
    chevron: "",
    selectedspecialist: "",
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
    group_id: "",
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
    selectedspecialist,
    AllgroupedSpecialist,
    group_id,
    allAssignedSpecialist,
    work_order_detail,
    allUngrouped,
    isloading,
    group_name,
    group_description,
    show,
    show2,
    ungrouped,
    grouped,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  }: any = state;

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
          notify(
            "Successfully created group, add ungrouped specialist to group"
          );
          refresh_all();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        notify("Failed to create work group", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const refresh_all = () => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_order_detail: res.data.data,
            isloading: false,
          });
          console.log(work_order_detail);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
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
        axios.delete(`${API}/admin/work-orders/specialist-groups/${x}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          notify("Successful");
          refresh_all();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        notify("Failed to delete work group", "D");
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
    console.log(props.location.search==="?worksheet")
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists?paginate=1`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            allAssignedSpecialist: res.data.data.data,
            work_order_detail: res2.data.data,
            grouped:props.location.search==="?worksheet"?true:false,
            overview:props.location.search==="?worksheet"?false:true,
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
          `${API}/admin/work-orders/${work_order_details?.id}/specialists?paginate=1`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            AllgroupedSpecialist: res.data.data.data,
            work_order_detail: res2.data.data,
            overview: a == "overview" ? true : false,
            grouped: a == "grouped" ? true : false,
            ungrouped: a == "ungrouped" ? true : false,
          });
          console.log(work_order_detail);
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
          `${API}/admin/work-orders/${work_order_details?.id}/specialists/grouped?paginate=1`,
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
            overview: a == "overview" ? true : false,
            grouped: a == "grouped" ? true : false,
            ungrouped: a == "ungrouped" ? true : false,
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
          `${API}/admin/work-orders/${work_order_details?.id}/specialists/ungrouped?paginate=1`,
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
            overview: a == "overview" ? true : false,
            grouped: a == "grouped" ? true : false,
            ungrouped: a == "ungrouped" ? true : false,
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
  const sendSpecialistId = (id: any) => {
    const add_new: any = [id];
    const old_array = selectedspecialist;
    const index = old_array.indexOf(id);
    if (index > -1) {
      old_array.splice(index, 1);
      return setState({
        ...state,
        selectedspecialist: [...old_array],
      });
    }
    setState({
      ...state,
      selectedspecialist: [...selectedspecialist, ...add_new],
    });
  };
  const add_To_Group = (group_id) => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    setState({
      ...state,
      isloading: true,
    });
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    const data = {
      specialists: selectedspecialist,
    };
    axios
      .all([
        axios.post(
          `${API}/admin/work-orders/specialist-groups/${group_id}/assign`,
          data,
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
            isloading: false,
          });
          notify("Successfully assigned to group");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        notify("Failed to assign to group", "D");
        console.log(err);
      });
  };
  const openModal2 = () => {
    setState({
      ...state,
      show2: true,
    });
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Invited Specialists</title>
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
            Manage Spread
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <Row>
                  <Col md={12} className="formsection1">
                    <Form.Group>
                      <h6 className="userprofile">Spread name</h6>
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
                  <Col md={12} className="formsection1">
                    <Form.Group>
                      <h6 className="userprofile">Spread Description</h6>
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
            <Col md={12}>
              <h6 className="cca">Available Work Spread</h6>
            </Col>
            <Col md={12}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Spread Name</th>
                    <th>Total Members</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {work_order_detail?.work_groups?.map((data, i) => (
                    <tr key={i}>
                      <td className="dpslstnamecell">
                        <div className="dplsplusernmeimg">
                          <span></span>
                          <div>{data?.name}</div>
                        </div>
                      </td>
                      <td>{data.total_members}</td>{" "}
                      <td className="depspltabcol1">
                        {data.total_members == 0 ? (
                          <Button
                            className="btn-danger"
                            onClick={() => DeleteGroup(data.id)}
                          >
                            Delete
                          </Button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={show2}
        onHide={() =>
          setState({
            ...state,
            show2: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Select a group to add specialist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Spread Name</th>
                    <th>Total Members</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {isloading && <Spinner animation={"grow"} variant="info" />}
                <tbody>
                  {work_order_detail?.work_groups?.map((data, i) => (
                    <tr key={i}>
                      <td className="dpslstnamecell">
                        <div className="dplsplusernmeimg">
                          <span></span>
                          <div>{data?.name}</div>
                        </div>
                      </td>
                      <td>{data.total_members}</td>{" "}
                      <td className="depspltabcol1">
                        <Button
                          className="btn-success"
                          onClick={() => add_To_Group(data.id)}
                        >
                          {!isloading ? "Add to group" : "Processing"}
                        </Button>
                      </td>
                    </tr>
                  ))}
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
                &nbsp; Invited Specialist
              </div>
              <div className="manage_" onClick={openModal}>
                Manage Spread
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
                onClick={() => get_ungrouped("ungrouped")}
                className={ungrouped ? "inprogress tab_active" : "inprogress"}
              >
                Ungrouped
              </div>
              <div
                onClick={() => get_grouped("grouped")}
                className={grouped ? "inprogress tab_active" : "inprogress"}
              >
                Grouped
              </div>
            </div>
            <div className="ddeplsmni">
              {overview && (
                <div >
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>All Specialists deployed to this work order</p>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Skill</th>
                          {/* <th>Position</th> */}
                          <th>Status</th>
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
                            {/* <td>Member</td> */}
                            <td>{data?.status}</td>{" "}
                            {/* <td className="depspltabcol1">
                              <input
                                type="radio"
                                name="team_lead"
                                onClick={() => assign_group_lead(data.id)}
                              />
                            </td> */}
                          </tr>
                        ))}
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
                <div >
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>View list of grouped specialist and worksheets</p>
                  </div>
                  {work_order_detail?.work_groups?.map((data, i) => (
                    <Accordions title={data?.name} group_data={data} />
                  ))}
                </div>
              )}
              {ungrouped && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <div className="add_fel">
                      <div>Select specialists and add to group</div>
                      {selectedspecialist.length !== 0 && (
                        <Button
                          className="add_to_group manage_"
                          onClick={openModal2}
                        >
                          Add selected to group
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Skill</th>
                          <th>Position</th>
                          <th>Status</th>
                          <th>Add to group </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUngrouped?.map((data: any, i) => (
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
                            <td>Member</td>
                            <td>{data?.status}</td>{" "}
                            <td className="depspltabcol1">
                              <input
                                type="checkbox"
                                name="team_lead"
                                onClick={() => sendSpecialistId(data.id)}
                              />
                            </td>
                          </tr>
                        ))}
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
