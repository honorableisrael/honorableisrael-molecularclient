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

const ScheduledPayments = withRouter((props) => {
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
  useEffect(() => {
    window.scrollTo(-0, -0);
    get_all();
  }, []);

  const get_all = () => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/admin/scheduled-payments?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            allAssignedSpecialist: res.data.data.data,
          });
          console.log(work_order_detail);
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Molecular - Scheduled Payments</title>
        <link />
      </Helmet>

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
                &nbsp; Scheduled Payments
              </div>
              <div className="manage_" onClick={openModal}>
                Manage Groups
              </div>
            </div>
            <div className="dpsplsttabs">
              {/* <div
                onClick={() => get_all("overview")}
                className={overview ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div> */}
              {/* <div
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
              </div> */}
            </div>
            <div>
              {overview && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>All Specialists payment</p>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Contractor</th>
                          <th>Type</th>
                          <th>Account Number</th>
                          <th>Reference</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allAssignedSpecialist?.map((data: any, i) => (
                          <tr key={i}>
                            <td className="dpslstnamecell">
                              <div className="dplsplusernmeimg">
                                <span></span>
                                <div>{data.specialist}</div>
                              </div>
                            </td>
                            <td>{data?.contractor}</td>
                            <td>{data?.description}</td>
                            <td>{data?.account_number}</td>
                            <td>{data?.reference}</td>
                            <td>{data?.status}</td>{" "}
                            <td>
                              {data?.status == "Pending" ? (
                                <Button
                                  // onClick={() => openPaymentModal(data.id)}
                                  className="payspecialist1"
                                >
                                  Pay
                                </Button>
                              ) : (
                                ""
                              )}
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

export default ScheduledPayments;
