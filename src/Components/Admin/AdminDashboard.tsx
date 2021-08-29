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
import invoice from "../../images/invoices.png";
import Chart from "react-google-charts";
import ReactApexChart from "react-apexcharts";
import arrow from "../../images/arrow.png";
import { Link, withRouter } from "react-router-dom";
import suitcase1 from "../../images/suitcase1.png";
import specialist1 from "../../images/specialist1.png";
import axios, { AxiosResponse } from "axios";
import {
  ageCalculator,
  API,
  capitalize,
  current_currency,
  FormatAmount,
  kFormatter,
  returnAdminToken,
} from "../../config";
import Specialist_Awaiting_Admin from "./SubComponents/Specailist_Awaiting_Admin_Approval";

const Notification = (props) => {
  console.log(props);
  return (
    <>
      <div className="carderw carderwxc carder_notification">
        <div className="text-center">
          <div className="notif12v textxenter1">Notification </div>
        </div>
        {props?.all_notification?.slice(0, 3)?.map((data, i) =>
          (data.category == "work order" || data.category == "worksheet") ? (
            <Link
              to="/admin_work_details?inreview=true"
              onClick={() =>
                localStorage.setItem(
                  "work_order_details",
                  JSON.stringify({ id: data.category_id })
                )
              }
            >
              <>
                <div className="helloworld1" title={data.message}>
                  <div className="helloworld2">
                    <img src={avatar} className="avatar1" />
                  </div>
                  <div className="app12">{data?.title}</div>
                </div>
                <div className="timesection">{data?.sent_since}</div>
                <div className="dottedlines"></div>
              </>
            </Link>
          ) : data.category == "invoice" ? (
            <>
              <Link to={`/admin_invoice_details/${data.category_id}`}>
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
          ) : (
            <>
            <Link to={`/admin_notification`}>
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
          )
        )}
      </div>
    </>
  );
};

const Invoice = (props) => {
  console.log(props);
  return (
    <>
      {props?.invoicelist?.slice(0, 3)?.map((data, i) => (
        <>
          <div className="helloworld1 helloworld1op" key={i}>
            <Link to={`/admin_invoice_details/${data?.id}`}>
              <div className="helloworldx">
                <img src={invoice} className="invoices" />
              </div>
            </Link>
            <div className="app12 app23 app23" title={data?.work_order?.title}>
              <Link to={`/admin_invoice_details/${data?.id}`}>
                <span className="titleinvoice">{data?.work_order?.title}</span>{" "}
              </Link>
              <div className="amount2a">{data.total_amount}</div>
            </div>
            <div className="unpaid1">
              <span className="paidd2 "></span>
              {data?.total_amount_paid > 0 ? "Paid" : "Unpaid"}
            </div>
          </div>
          <br />
        </>
      ))}
    </>
  );
};
const AdminDashboard = withRouter((props) => {
  const [state, setState] = useState<any>({
    series: [
      {
        name: "Work Force",
        data: [],
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
        categories: [],
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
        data: [],
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
        categories: [],
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
    invoices: [],
    admin_chart: {},
  });

  useEffect(() => {
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${API}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/specialists/new`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/notifications?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/work-orders?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/invoices`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/admin/dashboard/charts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3, res4, res5, res6) => {
          console.log(res6.data);
          const WorkForceMonths:any = Object.values(res6?.data?.data?.workforce["6_months"])
          const WorkForceKeys:any = Object.keys(res6?.data?.data?.workforce["6_months"])

          const cost_of_deployment:any = Object.values(res6?.data?.data?.cost_of_deployment["6_months"])
          console.log(cost_of_deployment)
          const cost_of_deploymentkeys:any = Object.keys(res6?.data?.data?.cost_of_deployment["6_months"])
          setState({
            ...state,
            admin: res.data.data,
            all_specialist: res2.data.data.data,
            notification: res3.data.data.data,
            work_orders: res4.data.data.data,
            invoices: res5.data.data.data,
            admin_chart: res6.data.data,
            series: [
              {
                name: "Work Force",
                data: WorkForceMonths,
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
                categories: WorkForceKeys,
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
            series1: [
              {
                name: "Cost of Deployment",
                data: cost_of_deployment,
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
                categories:cost_of_deploymentkeys,
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
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { admin, work_orders, invoices }: any = state;
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
                  Number of <div>Specialists</div>
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
                  {current_currency}
                  {FormatAmount(admin?.workorders?.total_value) ?? 0}
                </div>
              </div>
            </div>
          </Col>
          <Specialist_Awaiting_Admin />
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
                        className="colorgreen"
                        now={data.progress}
                        key={3}
                      />
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
                      <div className="mlstones">
                        Milestones : {data.payment_cycle}
                      </div>
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
              <Invoice invoicelist={invoices} />
              <div>
                <Link to="/admin_payment_invoice">
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

export default AdminDashboard;
