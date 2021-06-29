import React, { useEffect, useState } from "react";
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
    all_specialist: [],
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
        axios.get(`${API}/admin/specialists?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            admin: res.data.data,
            all_specialist: res2.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { admin, all_specialist }: any = state;
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
            <div className="carderw carderwxc">
              <div className="text-center">
                <div className="notif12v textxenter1">Notification </div>
              </div>
              <div className="helloworld1">
                <div className="helloworld2">
                  <img src={avatar} className="avatar1" />
                </div>
                <div className="app12">
                  Your pay check for milestone 1 has been approved.
                </div>
              </div>
              <div className="timesection">1 min ago</div>
              <div className="dottedlines"></div>
              <div className="helloworld1">
                <div className="helloworld2">
                  <img src={avatar2} className="avatar1" />
                </div>
                <div className="app12">
                  Your pay check for milestone 2 has been rejected.
                </div>
              </div>
              <div className="timesection">12 min ago</div>
              <div className="dottedlines"></div>
            </div>
          </Col>
          <Col className="fc12 " md={12}>
            <div className="carderw carderwax carderwaxx fc14">
              <div className="Projectsx">Projects</div>
              <div className="notif12v textxenter">
                <div className="project_title">
                  <div className={"title_221"}>Brass to Kano pipeline</div>
                  <div className={"title_221a completedcol"}>Completed</div>
                </div>
                <ProgressBar>
                  <ProgressBar
                    striped
                    variant=""
                    className="colorgreen"
                    now={100}
                    key={1}
                  />
                  <ProgressBar variant="gray" now={0} key={3} />
                </ProgressBar>
                <div className="mlstones2">
                  <div className="mlstones">Milestones : Completed</div>
                  <div className="mlstones">Total Specialist Involved: 23</div>
                </div>
              </div>
              <div className="notif12v textxenter">
                <div className="project_title">
                  <div className={"title_221"}>PNG Pipeline Fitting</div>
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
                  <div className="mlstones">Milestones : Completed</div>
                  <div className="mlstones">Total Specialist Involved: 23</div>
                </div>
              </div>
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
          <Col className="fc12" md={12}>
            <div className="carderw carderwax carderwaxx fc14 specialist_one">
              <div className="Projectsx">Specialists Awaiting Approval</div>
              <div className="specialistrow">
                {all_specialist.map((data, i) =>
                  data.status == "Inactive" ? (
                    <div className="specialistwrapper">
                      {false && (
                        <img
                          src={specialist1}
                          className="specialist1"
                          alt="specialist1"
                        />
                      )}
                      {
                        <span className="lfff dashboard_userfoto">
                          {capitalize(data?.first_name?.split("")[0])}
                          {capitalize(data?.last_name?.split("")[0])}
                        </span>
                      }
                      <div className="name_of_specialist">
                        <div
                          className="name_specailist"
                          onClick={(e) => {
                            localStorage.setItem(
                              "specialist_info",
                              JSON.stringify(data)
                            );
                            props.history.push("/specialistdetails");
                          }}
                        >
                          {data.first_name} {data.last_name}
                        </div>
                        <div className="name_specailist1">
                          {data?.registered_on}
                        </div>
                      </div>
                      <div className="skill_of_specialist1">
                        {capitalize(data?.skills?.[0]?.title)}
                      </div>
                      <div className="skill_of_specialist1">
                        <div>
                          {" "}
                          {data?.skills?.map((data1, i) => (
                            <span key={i}>{capitalize(data1.name)}</span>
                          ))}
                        </div>
                      </div>
                      <div className="skill_of_specialist1">
                        <div>{ageCalculator(data?.dob)}</div>
                      </div>
                      <div className="accpt3">
                        <button className="accpt2">Accept</button>
                        <button className="rejct2">Reject</button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <div className="text_align2">
                <Link to="/allspecialist">
                  <span className="arrow21 _arrow21 text11 "></span>{" "}
                  <img
                    src={arrow}
                    title="See more"
                    className="arrow21c arrow2x top__t1"
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default AdminDashboard;
