import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
        text: "Cost of Deployment",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
  });
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
                <div className="num_round">25</div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Active</div>
                <div className="enfgaged">In active</div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">15</div>
                <div className="enfgaged1">10 </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  Number of <div>Specialist</div>
                </div>
                <div className="num_round green_bg1">25</div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Deployed</div>
                <div className="enfgaged">Inactive </div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">15</div>
                <div className="enfgaged1">10 </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                 Total Number of <div>Works</div>
                </div>
                <div className="num_round yellow_bg1">25</div>
              </div>
              <div className="cardzero12 cardzeronone">
                <div className="enfgaged">Completed</div>
                <div className="enfgaged">Ongoing </div>
              </div>
              <div className="cardzero12 cardzeronone bdtop">
                <div className="enfgaged1">15</div>
                <div className="enfgaged1">10 </div>
              </div>
            </div>
            <div className="carderw cardzero">
              <div className="cardzero12">
                <div className="raise_joborder">
                  Total <div>Value of Work Done</div>
                </div>
                <div className="num_round darkblue_bg1">25</div>
              </div>
              <div className="cardzero12 cardzeronone bdtop1">
                <div className="rolap">$107,000,000</div>
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
                <img src={arrow} className="arrow21" alt="arrow" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
