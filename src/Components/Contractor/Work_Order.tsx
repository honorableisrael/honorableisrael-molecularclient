import React, { useState, useEffect } from "react";
import { Col, Row, Container, ProgressBar, Spinner } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import nextbtn from "../../images/nextbtn.png";
import WorkOrderCards from "./WorkOrderCards";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import no_work_order2 from "../../images/calendar 1.png";
import { API, capitalize, contractorToken } from "../../config";
import axios from "axios";
import Axios, { AxiosResponse } from "axios";

const ContractorWorkOrder = () => {
  const [state, setState] = useState({
    work_orders: [],
    inprogress: false,
    pending_request: false,
    past: false,
    work_order_title: "",
    new_order: true,
    work_order_description: "",
    project_purpose: "",
    location: "",
    state_: "",
    location_terrain: "",
    start_date: "",
    end_date: "",
    hours_perday: "",
    isloading: false,
  });
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: false,
        new_order: true,
        pending_request: false,
        past: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        new_order: false,
        past: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: true,
        new_order: false,
        pending_request: false,
        past: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        inprogress: false,
        new_order: false,
        pending_request: false,
        past: true,
      });
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    get_all();
  }, []);
  const get_all = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = contractorToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/contractor/work-orders?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_orders: res.data.data.data,
            inprogress: false,
            new_order: true,
            pending_request: false,
            past: false,
            isloading: false,
          });
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
  const get_active = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = contractorToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/contractor/work-orders/active?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_orders: res.data.data.data,
            inprogress: false,
            pending_request: true,
            new_order: false,
            past: false,
            isloading: false,
          });
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
  const get_previous = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = contractorToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/contractor/work-orders/previous?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            work_orders: res.data.data.data,
            inprogress: true,
            new_order: false,
            pending_request: false,
            past: false,
            isloading: false,
          });
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
  const {
    inprogress,
    pending_request,
    past,
    work_order_title,
    work_order_description,
    project_purpose,
    location,
    state_,
    location_terrain,
    work_orders,
    start_date,
    isloading,
    new_order,
  } = state;
  console.log(work_orders);
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={11} className="job34 job_btm">
            <div className="title_wo">
              <div className="jobs">Work Order</div>
              <div className="job2">
                <Link to="/work_order">
                  <div className="job3">Raise Work Order</div>
                </Link>
              </div>
            </div>
            <div className="intab">
              <div
                onClick={() => get_all()}
                className={new_order ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              <div
                onClick={() => get_active()}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                Active
              </div>
              <div
                onClick={() => get_previous()}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                Previous
              </div>
              {/* <div
                onClick={() => switchTab("fourthtab")}
                className={past ? "inprogress tab_active" : "inprogress"}
              >
                Past
              </div> */}
            </div>
            <Row>
              {isloading && <Spinner animation={"border"} variant={"info"} />}
              {work_orders.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no work order</div>
                  <div className="nojob2 ">
                    <Link to="/work_order">
                      <div className="job3">Raise Work Order</div>
                    </Link>
                  </div>
                </Col>
              )}
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data.status == "Terminated" && (
                      <WorkOrderCards
                        order_details={data}
                        title="Pipeline construction from Lagos to Ogun State"
                      />
                    )
                )}
                {/* <div className="jobs jobs2">Previous Work Order</div>
                <WorkOrderCards title={"Pipeline construction with Sulejah"} />
                <WorkOrderCards
                  title={"Pipeline construction with Sulejah"}
                  status={"Awaiting Approval"}
                /> */}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data?.status == "New" && (
                      <WorkOrderCards
                        order_details={data}
                        key={i}
                        status={"Awaiting Approval"}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data?.status == "Active" && (
                      <WorkOrderCards
                        order_details={data}
                        key={i}
                        status={"Active"}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data?.status == "Completed" && (
                      <WorkOrderCards
                        order_details={data}
                        key={i}
                        status={"Completed"}
                      />
                    )
                )}
              </div>
              <div className="cardflex_jo">
                {work_orders?.map(
                  (data: any, i) =>
                    data.status == "In Review" && (
                      <WorkOrderCards
                        order_details={data}
                        key={i}
                        status={"In Review"}
                      />
                    )
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContractorWorkOrder;
