import React, { useState, useEffect } from "react";
import { Col, Row, Container, Pagination, Spinner } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import WorkOrderCard from "../Contractor/WorkOrderCards";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import no_work_order2 from "../../images/calendar 1.png";
import AdminWorkOrderCards from "./WorkCardAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import New_Work_Order_Card from "./New_Work_Order_Card";
import { API, capitalize, returnAdminToken } from "../../config";
import axios from "axios";


const AdminWorkOrder = () => {
  const [state, setState] = useState({
    work_orders: [],
    inprogress: true,
    pending_request: false,
    past: false,
    new_order: false,
    awaiting_assignment: false,
    work_order_title: "",
    work_order_description: "",
    project_purpose: "",
    location: "",
    state_: "",
    search: "",
    location_terrain: "",
    start_date: "",
    end_date: "",
    hours_perday: "",
    fourthtab: false,
    fifthtab: false,
    sixthtab: false,
    isloading:false,
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

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    fetch_all();
  }, []);
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        new_order: false,
        awaiting_assignment: false,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
        new_order: true,
        awaiting_assignment: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
        fourthtab: false,
        fifthtab: false,
        sixthtab: false,
        new_order: false,
        awaiting_assignment: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: true,
        fifthtab: false,
        sixthtab: false,
        new_order: false,
        awaiting_assignment: false,
      });
    }
    if (a == "fifthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: false,
        fifthtab: true,
        sixthtab: false,
        new_order: false,
        awaiting_assignment: false,
      });
    }
    if (a == "sixthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
        fourthtab: false,
        fifthtab: false,
        sixthtab: true,
        new_order: false,
        awaiting_assignment: false,
      });
    }
    if (a == "new_order") {
      return setState({
        ...state,
        new_order: true,
        awaiting_assignment: false,
      });
    }
    if (a == "awaiting_assignment") {
      return setState({
        ...state,
        new_order: false,
        awaiting_assignment: true,
      });
    }
  };
  const fetch_all = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_orders: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            inprogress: true,
            pending_request: false,
            new_order: false,
            awaiting_assignment: false,
            past: false,
            fourthtab: false,
            fifthtab: false,
            sixthtab: false,
            isloading:false
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading:false
        })
        console.log(err);
      });
  };
  const search_filter = () => {
    const token = returnAdminToken()
    setState({
      ...state,
      isloading:true
    })
    axios
      .all([
        axios.get(`${API}/admin/work-orders?paginate=1&search=${search}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_orders: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            isloading:false,
            inprogress: true,
            pending_request: false,
            new_order: false,
            awaiting_assignment: false,
            past: false,
            fourthtab: false,
            fifthtab: false,
            sixthtab: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isloading:false
        })
      });
  };
  const filter_by_new = (fun) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders/new?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            work_orders: res.data.data.data,
            inprogress: false,
            pending_request: true,
            past: false,
            fourthtab: false,
            fifthtab: false,
            sixthtab: false,
            new_order: true,
            awaiting_assignment: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const filter_by_active = (fun) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders/active?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            work_orders: res.data.data.data,
            inprogress: false,
            pending_request: false,
            past: true,
            fourthtab: false,
            fifthtab: false,
            sixthtab: false,
            new_order: false,
            awaiting_assignment: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const filter_by_onhold = (fun) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/work-orders/onhold?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            work_orders: res.data.data.data,
            inprogress: false,
            pending_request: false,
            past: false,
            fourthtab: false,
            fifthtab: false,
            sixthtab: true,
            new_order: false,
            awaiting_assignment: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const nextPage = (x) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${x}`, {
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
            work_orders: res.data.data.data,
            inprogress: true,
            pending_request: false,
            new_order: false,
            awaiting_assignment: false,
            past: false,
            fourthtab: false,
            fifthtab: false,
            sixthtab: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    inprogress,
    pending_request,
    past,
    fourthtab,
    fifthtab,
    sixthtab,
    search,
    awaiting_assignment,
    new_order,
    work_orders,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    isloading,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={11} className="job34 job_4">
            <div className="title_wo fl__l fll12">
              <div>
                <div className="workorderheader adjustcontent">Work Order</div>
                <div className="searchcontrol_">
                  <input
                    type="text"
                    className="form-control search_field"
                    value={search}
                    onChange={onchange}
                    onKeyPress={(e)=>{
                      if(e.key=="Enter"){
                        search_filter()
                      }
                    }}
                    name="search"
                    placeholder="Search"
                  />
                 {isloading && <Spinner animation={"grow"} variant={"info"}/>}
                </div>
              </div>
              <div>
                <Link to={"/admin_new_work_order"}>
                  <span className="assign_specailist">Create Work Order</span>
                </Link>
              </div>
            </div>
            <div className="intab">
              <div
                onClick={() => fetch_all()}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              <div
                onClick={() => filter_by_new(switchTab("secondtab"))}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                New
              </div>
              <div
                onClick={() => filter_by_active(switchTab("thirdtab"))}
                className={past ? "inprogress tab_active" : "inprogress"}
              >
                In Progress
              </div>
              <div
                onClick={() => switchTab("fourthtab")}
                className={fourthtab ? "inprogress tab_active" : "inprogress"}
              >
                Completed
              </div>
              <div
                onClick={() => filter_by_onhold(switchTab("sixthtab"))}
                className={sixthtab ? "inprogress tab_active" : "inprogress"}
              >
                On Hold
              </div>
            </div>
            {new_order == true || awaiting_assignment == true ? (
              <div className="reqwrapper">
                <div
                  className={
                    new_order
                      ? "req12 border__right__none"
                      : "req12 border__right__none bgnone"
                  }
                  onClick={() => switchTab("new_order")}
                >
                  New
                </div>
                <div
                  onClick={() => switchTab("awaiting_assignment")}
                  className={
                    awaiting_assignment
                      ? "assign__1 active_ border__left__none bgorange"
                      : "assign__1 border__left__none"
                  }
                >
                  Awaiting invitation
                </div>
              </div>
            ) : (
              ""
            )}
            <Row>
              {work_orders?.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no Work Order</div>
                  <div className="nojob2 ">
                    <Link to="/admin_new_work_order">
                      <div className="job3">Create Work Order</div>
                    </Link>
                  </div>
                </Col>
              )}
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data?.status == "New" && (
                      <New_Work_Order_Card
                        order_details={data}
                        key={i}
                        awaiting_assignment={false}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data.status == "In Review" && (
                      <AdminWorkOrderCards
                        order_details={data}
                        key={i}
                        status={"In Review"}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data.status == "Terminated" && (
                      <New_Work_Order_Card
                        order_details={data}
                        status={"Terminated"}
                        awaiting_assignment={false}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data.status == "Terminated" && (
                      <Link to="/admin_work_details">
                        <AdminWorkOrderCards
                          order_details={data}
                          status={"Completed"}
                        />
                      </Link>
                    )
                )}
              </div>
              {work_orders?.length !== 0 && (
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
              {/* {!awaiting_assignment && new_order && (
                <div className="cardflex_jo">
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={false}
                  />
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={false}
                  />
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"In Review"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards title="Pipeline construction from Lagos to Ogun State" />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Completed"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Pending"}
                    />
                  </Link>
                  <Link to="/admin_work_details">
                    <AdminWorkOrderCards
                      title={"Pipeline construction with Sulejah"}
                      status={"Terminated"}
                    />
                  </Link>
                </div>
              )} */}
              {/* {awaiting_assignment && (
                <div className="cardflex_jo">
                  <New_Work_Order_Card
                    title={"Pipeline construction with Sulejah"}
                    status={"Terminated"}
                    awaiting_assignment={true}
                  />
                </div>
              )} */}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminWorkOrder;
