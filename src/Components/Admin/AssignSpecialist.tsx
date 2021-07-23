import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Container, Form, Pagination } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import welder from "../../images/welder.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import checkcircle from "../../images/check-circle.png";
import searchicon from "../../images/search.png";
import no_work_order from "../../images/document 1.png";
import axios from "axios";
import { API, notify } from "../../config";
import { capitalize } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
 
const SpecialistContext: any = React.createContext({
  state: {},
  setState: () => {},
  assignToWorkOrder: () => {},
});
const AssignOneSpecialist = (x) => {
  const workOrder = localStorage.getItem("work_order_details");
  const workorder = workOrder ? JSON.parse(workOrder) : "";
  const availableToken: any = localStorage.getItem("loggedInDetails");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/");
  const data = {
    specialists: [x],
  };
  console.log("here now");
  axios
    .post(`${API}/admin/work-orders/${workorder.id}/specialists`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .then((res) => {
      console.log(res);
      notify("Successfully assigned specialist");
      setTimeout(() => {
        window.location.assign("/admin_work_details?inreview=true");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      notify("Failed to assign specialist", "D");
    });
};
const Specialist_card = (props) => {
  const { state, setState, assignToWorkOrder }: any =
    useContext(SpecialistContext);
  const sendSpecialistId = (id: any) => {
    const add_new: any = [id];
    const old_array = state.selectedspecialist;
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
      selectedspecialist: [...state.selectedspecialist, ...add_new],
    });
  };

  return (
    <>
      <div className="container_01">
        <div className="checkbox_craftman">
          {/* <input type="checkbox" className="selectcheck" /> */}
          <label className="container_box">
            {capitalize(props?.specialist_data?.skills[0]?.name)}
            <input
              type="checkbox"
              name="radio"
              onClick={() => sendSpecialistId(props.specialist_data.id)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="imagecontainer01">
          <img src={welder} className="welder" alt="welder" />
        </div>
        <div className="cardbody01">
          <div>
            <span className="cardname">
              {" "}
              {props?.specialist_data?.last_name ?? "n/a"}{" "}
              {props?.specialist_data?.first_name ?? "n/a"}
            </span>{" "}
            <span className="cerfified1">
              {capitalize(props?.specialist_data?.skills[0]?.name)}
            </span>
          </div>
          <div className="prim_skills">
            Secondary Skills:{" "}
            {props.specialist_data.skills?.map((data, i) => (
              <span key={i}> {capitalize(data.name)}</span>
            ))}
          </div>
          <div className="prim_skills">
            <span className="leveltitle"> Expert Level:</span>{" "}
            <StarRatingComponent
              name="specialist_rating"
              className="specialist_rating"
              starCount={5}
              emptyStarColor={"#444"}
            />
          </div>
          <div className="assigncont">
            <button
              value="Assign bgorange"
              className="assign12"
              onClick={()=>AssignOneSpecialist(props?.specialist_data?.id)}
            >
              Assign{" "}
              <span>
                <img src={checkcircle} className="checkcircle1 " alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AssignSpecialist = () => {
  const [state, setState] = useState({
    all_specialist: [],
    selectedspecialist: [],
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    search: "",
    location: "",
    end_date: "",
    isloading:false,
    specialist_rating: 5,
    order_id: "",
    start_date: "",
    hour: "",
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
  const workOrder = localStorage.getItem("work_order_details");
  const workorder = workOrder ? JSON.parse(workOrder) : "";
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
      const workOrder = localStorage.getItem("work_order_details");
      const workorder = workOrder ? JSON.parse(workOrder) : "";
      console.log(workorder)
    axios
      .all([
        axios.get(`${API}/admin/work-orders/${workorder.id}/recommend-specialists?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_specialist: res.data.data.data,
            order_id: workorder.id,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetch_all = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    axios
      .all([
        axios.get(`${API}/admin/specialists?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_specialist: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            inprogress: true,
            pending_request: false,
            past: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
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
            all_specialist: res.data.data.data,
            inprogress: false,
            pending_request: true,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
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
            contractor_list: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const assignToWorkOrder = (e) => {
    // e.preventDefault();
    setState({
      ...state,
      isloading:true,
    })
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    const data = {
      specialists: selectedspecialist,
    };
    console.log("here now");
    axios
      .post(`${API}/admin/work-orders/${state.order_id}/specialists`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isloading:true,
        })
        notify("Successfully assigned specialist");
        setTimeout(() => {
          window.location.assign("/admin_work_details?inreview=true");
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isloading:true,
        })
        console.log(err);
        notify("Failed to assign specialist", "D");
      });
  };
  
  const {
    selectedspecialist,
    country,
    work_order_description,
    order_title,
    end_date,
    location_terrain,
    specialist_rating,
    start_date,
    all_specialist,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    search,
  } = state;
  console.log(selectedspecialist);
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={12} className="job34">
            <div className="title_wo flexgroup_ flexgroup_1">
              <div className="fl-11">
                <div className="workorderheader workorderheaderpp title_color_orange">
                  <Link to="/admin_work_details?inreview=true">
                    {" "}
                    <img src={arrowback} className="arrowback" />
                  </Link>
                  Assign Specialist
                </div>
                <div className="searchcontrol_">
                  <span className="rsr">
                    <img src={searchicon} className="rss" alt="search" />
                  </span>
                  <input
                    type="text"
                    className="form-control search_field"
                    value={search}
                    id="search"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div>
                <span className="assign_specailist" onClick={assignToWorkOrder}>
                  Assign Specialist
                </span>
              </div>
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="form_header">
                  <span> Best matched Specialists</span>
                </div>
                <div className="formcontent">
                  <Row>
                    <SpecialistContext.Provider
                      value={{
                        state,
                        setState,
                        assignToWorkOrder,
                      }}
                    >
                      <div className="spread_">
                        {all_specialist?.map((data:any, i) => (
                          data.engaged==false &&
                          <Specialist_card specialist_data={data} key={i} />
                        ))}
                        {all_specialist?.length == 0 && (
                          <Col md={11} className="containerforemptyorder1">
                            <div className="containerforemptyorder">
                              <img
                                src={no_work_order}
                                alt={"no_work_order"}
                                className="no_work_order"
                              />
                            </div>
                            <div className="no_work1">
                              You have no recommended specialist
                            </div>
                          </Col>
                        )}
                      </div>
                    </SpecialistContext.Provider>
                  </Row>
                  {all_specialist?.length !== 0 && (
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
              </Col>
            </Row>
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
};

export default AssignSpecialist;
