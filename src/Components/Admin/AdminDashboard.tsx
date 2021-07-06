import React, { useEffect, useState, ReactFragment } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import logod1 from "../../images/Molecular.png";
import third from "../../images/third.png";
import fourth from "../../images/fourth.png";
import { Helmet } from "react-helmet";
import DashboardNav from "./navbar";
import addmore from "../../images/addmore.png";
import jobscheck from "../../images/jobscheck.png";
import avatar from "../../images/avatar.png";
import avatar2 from "../../images/avatar2.png";
import invoices from "../../images/invoices.png";
import Chart from "react-google-charts";
import ReactApexChart from "react-apexcharts";
import arrow from "../../images/arrow.png";
import { Link, withRouter } from "react-router-dom";
import suitcase1 from "../../images/suitcase1.png";
import specialist1 from "../../images/specialist1.png";
import axios, { AxiosResponse } from "axios";
import { ageCalculator, API, capitalize } from "../../config";
import Specialist_Awaiting_Admin from "./SubComponents/Specailist_Awaiting_Admin_Approval";

const Notification = (props) => {
  console.log(props);
  return (
    <>
      <div className="carderw carderwxc">
        <div className="text-center">
          <div className="notif12v textxenter1">Notification </div>
        </div>
        {props?.all_notification?.slice(0, 3)?.map((data, i) => (
          <>
            <Link to={"/admin_notification"}>
              <div className="helloworld1" title={data.message}>
                <div className="helloworld2">
                  <img src={avatar} className="avatar1" />
                </div>
                <div className="app12">{data?.title}</div>
              </div>
            </Link>
            <div className="timesection">{data?.sent_since}</div>
            <div className="dottedlines"></div>
          </>
        ))}
      </div>
    </>
  );
};

const AdminDashboard = withRouter((props) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Work Force",
        data: [0, 0, 1, 1, 1, 1],
      },
    ],
    options: {
      chart: {
        id: "WorkForce",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["jan", "feb", "mar", "apr", "may", "june"],
      },
      title: {
        text: "Work Force",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
    //second graph
    series1: [
      {
        name: "Cost of Deployment",
        data: [10, 41, 35, 51, 49, 62],
      },
    ],
    options1: {
      chart: {
        id: "Cost of Deployment",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["jan", "feb", "mar", "apr", "may", "june", "jul"],
      },
      title: {
        text: "Cost of Deployment $0",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
    admin: {},
    work_orders: [],
    all_specialist: [],
    notification: [],
  });

  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/login");
    }
    axios
      .all([
        axios.get(`${API}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/specialists?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/work-orders?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3, res4) => {
          console.log(res4.data);
          setState({
            ...state,
            admin: res.data.data,
            all_specialist: res2.data.data.data,
            notification: res3.data.data.data,
            work_orders: res4.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { admin, work_orders }: any = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Admin Dashboard</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="dshb12 dshb12m">
          <Col md={12} className="fc12 fc12ax">
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  Number of <div>Contractors</div>
                </div>
                <div className="num_round">
                  {admin?.contractors?.total ?? 0}
                </div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Active</div>
                <div className="enfgaged">In active</div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">
                  {admin?.contractors?.active ?? 0}
                </div>
                <div className="enfgaged1">
                  {admin?.contractors?.inactive ?? 0}{" "}
                </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  Number of <div>Specialist</div>
                </div>
                <div className="num_round green_bg1">
                  {admin?.specialists?.total ?? 0}
                </div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Deployed</div>
                <div className="enfgaged">Inactive </div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">
                  {admin?.specialists?.active ?? 0}
                </div>
                <div className="enfgaged1">
                  {admin?.specialists?.inactive ?? 0}
                </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  Number of <div>Works</div>
                </div>
                <div className="num_round yellow_bg1">
                  {admin?.workorders?.total ?? 0}{" "}
                </div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Completed</div>
                <div className="enfgaged">Ongoing </div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">
                  {admin?.workorders?.active ?? 0}{" "}
                </div>
                <div className="enfgaged1">
                  {admin?.workorders?.inactive ?? 0}{" "}
                </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  <div>Value of Work Done</div>
                </div>
                <div className="num_round darkblue_bg1">
                  <img src={suitcase1} alt="suitcase1" className="suitcase1" />
                </div>
              </div>
              <div className="cardzero12 cardzeronone bdtop1">
                <div className="rolap">
                  ${admin?.workorders?.total_value ?? 0}
                </div>
              </div>
            </div>
          </Col>
          <Col className="fc12 fc14 ">
            <div className="carderw carderw_no_12  carderwax">
              <div className="grph34 carderw_no001">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                  height={350}
                />
              </div>
              <div className="grph34 carderw_no00 ">
                <ReactApexChart
                  options={state.options1}
                  series={state.series1}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            <Notification all_notification={state.notification} />
          </Col>
          <Col className="fc12 " md={12}>
            <div className="carderw carderwax carderwaxx fc14">
              <div className="Projectsx">Projects</div>
              {work_orders?.slice(0, 2)?.map((data, i) =>
                data.status !== "On Hold" ? (
                  <div className="notif12v textxenter" key={i}>
                    <div className="project_title">
                      <div className={"title_221"}>{data.title}</div>
                      <div className={"title_221a completedcol"}>
                        {data.status}
                      </div>
                    </div>
                    <ProgressBar>
                      <ProgressBar
                        striped
                        variant=""
                        className="colorgreen"
                        now={data.progress}
                        key={i}
                      />
                      <ProgressBar variant="gray" now={data.progress} key={3} />
                    </ProgressBar>
                    <div className="mlstones2">
                      <div className="mlstones">
                        Milestones : {data.payment_cycle}
                      </div>
                      <div className="mlstones">
                        Total Specialist Involved: {data.total_specialists}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="notif12v textxenter">
                    <div className="project_title">
                      <div className={"title_221"}>{data.title}</div>
                      <div className={"title_221a completedcol suspended"}>
                        Suspended
                      </div>
                    </div>
                    <ProgressBar>
                      <ProgressBar
                        striped
                        variant=""
                        className="coloryell"
                        now={100}
                        key={1}
                      />
                      <ProgressBar variant="gray" now={0} key={3} />
                    </ProgressBar>
                    <div className="mlstones2">
                      <div className="mlstones">Milestones : {data.payment_cycle}</div>
                      <div className="mlstones">
                        Total Specialist Involved: {data.total_specialists}
                      </div>
                    </div>
                  </div>
                )
              )}

              <div className="text_align2">
                <Link to="/admin_work_order">
                  <img
                    src={arrow}
                    title="See more"
                    className="arrow21c arrow2x"
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
            <div className="carderw carderwxc">
              <div className="text-center">
                <div className="notif12v textxenter1">Invoice Raised</div>
                <br />
              </div>
              <div className="helloworld1 helloworld1op">
                <div className="helloworldx">
                  <img src={invoices} className="invoices" />
                </div>
                <div className="app12 app23 app23">
                  <b> NASS Complex </b>
                  <div className="amount2a">N0</div>
                </div>
                <div className="unpaid1">
                  <span className="paidd2 "></span>unpaid
                </div>
              </div>
              <br />
              <div className="helloworld1 helloworld1op">
                <div className="helloworldx">
                  <img src={invoices} className="invoices" />
                </div>
                <div className="app12 app12 app23">
                  <b> NASS Complex </b>
                  <div className="amount2a">N0</div>
                </div>
                <div className="paid1">
                  <span className="paidd2 paidd2g"></span>paid
                </div>
              </div>
              <br />
              <div className="helloworld1 helloworld1op">
                <div className="helloworldx">
                  <img src={invoices} className="invoices" />
                </div>
                <div className="app12 app12 app23">
                  <b> NASS Complex </b>
                  <div className="amount2a">N0</div>
                </div>
                <div className="paid1">
                  <span className="paidd2 paidd2g"></span>paid
                </div>
              </div>
              <br />
              <div className="helloworld1 helloworld1op">
                <div className="helloworldx">
                  <img src={invoices} className="invoices" />
                </div>
                <div className="app12 app12 app23">
                  <b> NASS Complex </b>
                  <div className="amount2a">N0</div>
                </div>
                <div className="paid1">
                  <span className="paidd2 paidd2g"></span>paid
                </div>
              </div>
              <br />
              <div className="helloworld1 helloworld1op">
                <div className="helloworldx">
                  <img src={invoices} className="invoices" />
                </div>
                <div className="app12 app12 app23">
                  <b> NASS Complex </b>
                  <div className="amount2a">N0</div>
                </div>
                <div className="paid1">
                  <span className="paidd2 paidd2g"></span>paid
                </div>
              </div>
              <div>
                <Link to="/admin_notification">
                  <span className="arrow21 text11"></span>{" "}
                  <img
                    src={arrow}
                    title="See more"
                    className="arrow21"
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          </Col>
          <Specialist_Awaiting_Admin />
        </Row>
      </Container>
    </>
  );
});

export default AdminDashboard;
