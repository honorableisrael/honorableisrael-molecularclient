import React, { useState, useEffect } from "react";
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
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";



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
            <Link to={"/notification"}>
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

const ContractorDashboard = withRouter((props) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Work Force",
        data: [10, 41, 35, 51, 49, 62],
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
        categories: ["jan", "feb", "mar", "apr", "may", "june", "jul"],
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
        text: "Cost of Deployment",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
    notification:[],
    contractor:{},
  });
  
  useEffect(() => {
    window.scrollTo(0,0)
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "contractor") {
      return props.history.push("/login");
    }
    axios
      .all([
        axios.get(`${API}/contractor/dashboard`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res,res2) => {
          console.log(res.data.data);
          setState({
            ...state,
            contractor: res.data.data,
            notification: res2.data.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { contractor,notification }: any = state;
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Contractor Dashboard</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="dshb12 dshb12m">
          <Col md={12} className="fc12 fc12ax">
            <div className="carderw">
            <div className="raise_joborder12">
              <div className="raisejob">
                New Work <div>order</div>
              </div>
              <div className="raise_joborder12a">{contractor?.newWorkOrders??0}</div>
              </div>
              <Link to="/work_order">
                <img src={addmore} alt={"jobscheck"} className="pollio" />
              </Link>
            </div>
            <div className="carderw">
              <div className="raise_joborder12">
                <div className="raisejob">
                  Completed <div>Projects</div>
                </div>
                <div className="raise_joborder12a">{contractor?.completedWorks??0}</div>
              </div>
              <img src={jobscheck} alt={"jobscheck"} className="pollio" />
            </div>
            <div className="carderw">
              <div className="raise_joborder12">
                <div className="raisejob">
                  Ongoing <div>Projects</div>
                </div>
                <div className="raise_joborder12a">{contractor?.ongoingWorks??0}</div>
              </div>
              <img src={third} alt={"jobscheck"} className="pollio" />
            </div>
            <div className="carderw">
              <div className="raise_joborder12">
                <div className="raisejob">
                  Total <div> Projects</div>
                </div>
                <div className="raise_joborder12a">{contractor?.totalWorks??0}</div>
              </div>
              <img src={fourth} alt={"jobscheck"} className="pollio" />
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
              <div className="grph34 carderw_no00">
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
                  <div className="mlstones">Total Specialist Involved: 0</div>
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
                  <div className="mlstones">Total Specialist Involved: 0</div>
                </div>
              </div>
              <div className="text_align2">
                <Link to="/contractor_work_order">
                  <img src={arrow} className="arrow21c arrow2x" alt="arrow" />
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
                  <div className="amount2a">N3,000,000</div>
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
                  <div className="amount2a">N3,000,000</div>
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
                  <div className="amount2a">N3,000,000</div>
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
                  <div className="amount2a">N3,000,000</div>
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
                  <div className="amount2a">N3,000,000</div>
                </div>
                <div className="paid1">
                  <span className="paidd2 paidd2g"></span>paid
                </div>
              </div>
              <div>
                <Link to="/payment_invoice">
                  <img src={arrow} className="arrow21" alt="arrow" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default ContractorDashboard;
