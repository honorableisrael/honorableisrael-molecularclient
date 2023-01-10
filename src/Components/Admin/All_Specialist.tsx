import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Spinner,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import no_work_order from "../../images/document 1.png";
import axios from "axios";
import { API, returnAdminToken } from "../../config";
import Specialist_card from "./Specialist_Card";

const All_Specialist = () => {
  const [state, setState] = useState({
    all_specialist: [],
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
    specialist_rating: 5,
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
    isloading: false,
  });
  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
    if (a == "fifthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
    if (a == "sixthtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: false,
      });
    }
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken()
    setState({
      ...state,
      isloading:true
    })
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
            isloading:false,
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
  }, []);
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const fetch_all = () => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
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
            isloading: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const search_filter = () => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/admin/specialists?paginate=1&search=${search}`, {
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
            isloading:false,
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
            all_specialist: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    project_purpose,
    all_specialist,
    specialist_rating,
    inprogress,
    pending_request,
    past,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    isloading,
    search,
  } = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Admin View Specialist</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3 rowt3x">
          <Col md={12} className="job34 job3x">
            <div className="title_wo flexgroup_ flexgroup_1">
              <div className="title_wo fl__l">
                <div className="workorderheader workorderheader002">
                  Specialist
                </div>
                <div className="searchcontrol_">
                  <input
                    type="text"
                    className="form-control search_field"
                    value={search}
                    name="search"
                    onKeyPress={(e) => {
                      if (e.key == "Enter") {
                        search_filter();
                      }
                    }}
                    onChange={onchange}
                    placeholder="Search"
                  />
                  {isloading && <Spinner animation={"grow"} variant={"info"} />}
                </div>
              </div>
            </div>
            <div className="intab">
              <div
                onClick={() => fetch_all()}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              {/* <div
                onClick={() => filter_by_new(switchTab("secondtab"))}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                Active
              </div>
              <div
                onClick={() => switchTab("thirdtab")}
                className={past ? "inprogress tab_active" : "inprogress"}
              >
                In Active
              </div> */}
            </div>
            <Row>
              <Col md={12} className="job23">
                <div className="formcontent formCi">
                  <Form>
                    <Row>
                      <div className="spread_">
                        {all_specialist?.map((data, i) => (
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
                              You have no specialist
                            </div>
                          </Col>
                        )}
                      </div>
                      {all_specialist?.length !== 0 && (
                        <div className="active_member2">
                          <div>
                            Displaying <b>{current_page}</b> of{" "}
                            <b>{last_page}</b>
                          </div>
                          <Pagination>
                            <Pagination.First onClick={() => nextPage(first)} />
                            <Pagination.Prev onClick={() => nextPage(prev)} />
                            <Pagination.Next onClick={() => nextPage(next)} />
                            <Pagination.Last onClick={() => nextPage(last)} />
                          </Pagination>
                        </div>
                      )}
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default All_Specialist;
