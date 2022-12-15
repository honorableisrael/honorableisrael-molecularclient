import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Modal,
  Button,
  Card,
  Spinner,
  Table,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import no_work_order from "../../images/document 1.png";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import WorkOrderCardsMinInfo from "./WorkOrderCardsMinInfo";
import avatar_test from "../../images/avatar_test.png";
import dwnload from "../../images/dwnload.png";
import WorkDetails_Form_Preview from "./workdetailsform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosResponse } from "axios";
import {
  API,
  capitalize,
  checkIfIsOdd,
  contractorToken,
  current_currency,
  FormatAmount,
  formatTime,
  notify,
  refreshpage,
} from "../../config";
import WorkInformationBreakdown from "./Work_information_Breakdown";
import { NavHashLink } from "react-router-hash-link";
import chevrondown from "../../images/chevrondown.png";

const Work_Details = (props: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_order_details: "",
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron1: active1 === "active" ? "" : "arrowflip1",
    });
  };
  const {
    work_order_details,
    show,
    inreview,
    active,
    active1,
    collapseHeight,
    chevron,
    chevron1,
    isloading,
  } = state;
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>
                {props?.group_data?.total_members} Work Details
              </span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down1 ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <WorkInformationBreakdown
            order_detail={props.work_order_detailz}
            hide={true}
          />
        </>
      </div>
    </>
  );
};
const Work_Sheet = (props: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: [],
    work_order_details: "",
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron1: active1 === "active" ? "" : "arrowflip1",
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .get(
        `${API}/contractor/work-orders/${work_order_details?.id}/worksheets`,
        {
          headers: {
            Authorization: `Bearer ${contractorToken().access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setState({
          ...state,
          work_sheet: res.data.data.data,
          work_order_details,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          work_order_details: work_order_details,
        });
        console.log(err);
      });
  }, []);

  const {
    active1,
    collapseHeight,
    chevron,
    work_sheet,
    isloading,
    work_order_details,
  } = state;
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>Work Sheets</span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down1 ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <div className='worksheet_1'>
            <Table hover responsive className='schedule_payment_table'>
              <thead>
                <tr>
                  <th scope='col'>Reference</th>
                  <th scope='col'>Start/End Date</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {work_sheet.map((data: any, i) => (
                  <tr key={i}>
                    <td>{data?.reference}</td>
                    <td>
                      {formatTime(data?.start_date)}
                      {" to "}
                      {formatTime(data?.end_date)}
                    </td>
                    <td className='dpslstnamecell pslstnamecell schedule_payment_first_td'>
                      <div className='dplsplusernmeimg'>
                        <div>{data?.description}</div>
                      </div>
                    </td>
                    <td className='contractorname'>{data?.status}</td>
                    <td>
                      <Link
                        to={`/contractor_worksheet/${data?.id}/${work_order_details?.id}`}>
                        {" "}
                        <Button className='btn-secondary'>View more</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {work_sheet?.length == 0 && (
              <Col md={11} className='containerforemptyorder1 cust20'>
                <div className='containerforemptyorder'>
                  <img
                    src={no_work_order}
                    alt={"no_work_order"}
                    className='no_work_order'
                  />
                </div>
                <div className='no_work1'>worksheet has not been sent</div>
              </Col>
            )}
          </div>
        </>
      </div>
    </>
  );
};

const Invoice_details = ({ work_order_detail }: any) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: [],
  });
  const content1: any = useRef();
  const toggleAccordion1 = () => {
    setState({
      ...state,
      active1: active1 === "" ? "active" : "",
      collapseHeight:
        active1 === "active" ? "0px" : `${content1.current.scrollHeight}px`,
      chevron1: active1 === "active" ? "" : "arrowflip1",
    });
  };
  const { active1, collapseHeight, chevron, work_sheet, isloading } = state;
  return (
    <>
      <Card>
        <div onClick={toggleAccordion1}>
          <div className='deploydsplstwrapp'>
            <div>
              <span className='deplyeaggrgt'>Invoice</span>
            </div>
            <div className='accimgwrap'>
              <span>
                <img src={chevrondown} className={`arrow-down1 ${chevron}`} />
              </span>
            </div>
          </div>
        </div>
      </Card>
      {isloading && <Spinner animation={"grow"} variant='info' />}
      <div
        style={{ maxHeight: `${collapseHeight}` }}
        className='acccollapsediv1'
        ref={content1}>
        <>
          <div className='job23_1a wrap_z'>
            <div className='main_wrap_ws main_wrapp1'>
              <h6 className='userprofile12 userprofile123'></h6>
              <div className='tabledata tablecontent'>
                <div className='header_12'>Invoice Number</div>
                <div className='header_12'>Total Amount</div>
                <div className='header_12'>Amount Paid</div>
                <div className='header_12 '>Outstanding</div>
                <div className='header_12'>Total cycles</div>
              </div>
              <div className='tabledata tablecontent'>
                <div className='header_12'>
                  {work_order_detail?.invoice?.reference}
                </div>
                <div className='header_12'>
                  {current_currency}
                  {FormatAmount(work_order_detail?.invoice?.total_amount)}
                </div>
                <div className='header_12'>
                  {current_currency}
                  {FormatAmount(work_order_detail?.invoice?.total_amount_paid)}
                </div>
                <div className='header_12 active_member'>
                  {current_currency}
                  {FormatAmount(
                    work_order_detail?.invoice?.total_amount_unpaid
                  )}
                </div>
                <div className='header_12 active_member'>
                  {work_order_detail?.invoice?.total_cycles}
                </div>
              </div>
              <div className='text-center'>
                {" "}
                <span className='viewall_'>
                  {" "}
                  <Link
                    to={`/invoice_details/${work_order_detail?.invoice?.id}`}
                    title='view payment cycle information'>
                    view more
                  </Link>{" "}
                </span>{" "}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
const SpecialistDeployed = ({ work_order_detail }) => {
  const [state, setState] = useState<any>({
    active1: "",
    collapseHeight: "0px",
    chevron: "",
    chevron1: "",
    work_sheet: [],
    new_work: false,
  });
  console.log(work_order_detail);
  // new_work: res.data.data.status == "New" ? true : false,
  const content: any = useRef();
  const toggleAccordion = () => {
    setState({
      ...state,
      active: active === "" ? "active" : "",
      collapseHeight:
        active === "active" ? "0px" : `${content.current.scrollHeight}px`,
      chevron: active === "active" ? "" : "arrowflip1",
    });
  };
  const { active, collapseHeight, chevron, work_sheet, isloading } = state;
  return (
    <>
      {true && (
        <div className='dplsplsacc'>
          <Card>
            <div onClick={toggleAccordion}>
              <div className='deploydsplstwrapp'>
                <div>
                  <span className='deplyeaggrgt'>
                    {work_order_detail?.total_assigned_specialists} Invited
                    Specialist
                  </span>
                </div>
                <div className='accimgwrap'>
                  <span>
                    <img
                      src={chevrondown}
                      className={`arrow-down ${chevron}`}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Card>
          {isloading && <Spinner animation={"grow"} variant='info' />}
          <div
            style={{ maxHeight: `${collapseHeight}` }}
            className='acccollapsediv'
            ref={content}>
            {work_order_detail?.assigned_specialists?.length !== 0 && (
              <>
                <div className='group_flex'>
                  {/* <div className='grpB'>
                    <b>{work_order_detail?.total_assigned_specialists}</b>{" "}
                    Invited
                  </div> */}
                </div>
                <div className='tabledata tabledataweb'>
                  <div className='header_12 pleft header_x'>Reference</div>
                  <div className='header_12'>Type</div>
                  <div className='header_12'>Spread Position</div>
                  <div className='header_12'>Status</div>
                  <div className='header_12'>Specialist Details</div>
                </div>
                {work_order_detail?.assigned_specialists?.length !== 0 &&
                  work_order_detail?.assigned_specialists?.map((data, i) => (
                    <>
                      <div
                        className={
                          checkIfIsOdd(i)
                            ? "tabledata"
                            : "tabledata tablecontent"
                        }>
                        <div className='header_12 header_x'>
                          <div className='mobiletabledata'>Reference</div>
                          {data.reference}
                        </div>
                        <div className='header_12 typ22'>
                          <div className='mobiletabledata mobiletabledata22 '>
                            Type
                          </div>
                          <div> {capitalize(data.skills?.[0].name)}</div>
                        </div>
                        <div className='header_12'>
                          <div className='mobiletabledata mobiletabledata22'>
                            Spread Position
                          </div>
                          <div className='glead'> Member </div>
                        </div>
                        <div className='header_12 active_member'>
                          <div className='mobiletabledata mobiletabledata22'>
                            Status
                          </div>
                          <div className='active_member'>
                            {" "}
                            {data.status == "Pending" ? (
                              <span className='pending_color'>
                                {data.status}
                              </span>
                            ) : (
                              data.status
                            )}
                          </div>
                        </div>
                        <div className=''>
                          <span className='sendbtn'>
                            <Link
                              to={`/contractor/review/specailist/${data.id}`}>
                              View
                            </Link>
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                <div className='text-center'> </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const WorkOrderDetails = withRouter((props: any) => {
  const [state, setState] = useState<any>({
    work_order_detail: {},
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    workDetails: {},
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    isloading: false,
    hour: "",
    show: false,
    reason: "",
    assigned_specialists: "",
    already_approved: false,
    new_work: false,
    inreview: false,
  });
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };

  const notify = (message: string, type = "B") =>
    toast(message, { containerId: type, position: "top-right" });

  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
  const {
    project_purpose,
    country,
    work_order_description,
    order_title,
    new_work,
    already_approved,
    reason,
    workDetails,
    assigned_specialists,
    location_terrain,
    start_date,
    work_order_detail,
    show,
    hour,
  }: any = state;
  useEffect(() => {
    // hide_info
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = props.location.search;
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      already_approved: urlkey ? true : false,
      work_order_details: work_order_details,
    });
    let inreview = props.location.search;
    console.log(work_order_details);
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/#login");
    window.scrollTo(-0, -0);
    axios
      .all([
        axios.get<any, AxiosResponse<any>>(
          `${API}/contractor/work-orders/${work_order_details.id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            workDetails: res.data.data,
            ...res.data.data,
            already_approved: urlkey ? true : false,
            work_order_detail: res.data.data,
            new_work: res.data.data.status == "New" ? true : false,
            inreview: res.data.data.status == "In Review" ? true : false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(workDetails);

  return (
    <>
      <Modal
        size='lg'
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Reject order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className='form-control reason12 reason122'
                  placeholder='Reason for termination'></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <div
                className='terminate1'
                onClick={(e) => openModal(e, "Terminate")}>
                Reject
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2'>
          <Col md={12} className='job34'>
            <div className='title_wo title_wo12 title_wo_'>
              <div className='workorderheader fixedtitle'>
                <Link to='/contractor_work_order'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </Link>
                Work Details
              </div>
            </div>
            <Row className='mgtop'>
              <Col md={2} className='job23_ mheight_'>
                <p className='exp23'>
                  <img src={portfolio} alt='portfolio' className='portfolioq' />
                </p>
                <p className='bview'>
                  <NavHashLink to='#overview'>Overview</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#details'>Specialist Details</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#work'>Work Details</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#worksheet'>Worksheet</NavHashLink>
                </p>
                <p className='bview inactive_bv'>
                  <NavHashLink to='#invoice'>Invoice</NavHashLink>
                </p>
              </Col>
              <Col md={10} className='job23_1a_ job23_1a_p'>
                <div className='job23_1a'>
                  <div className=''>
                    <WorkOrderCardsMinInfo order_detail={work_order_detail} />
                  </div>
                </div>
                {work_order_detail.invoice == null && (
                  <Col md={11} className='containerforemptyorder1 cust20'>
                    <div className='containerforemptyorder'>
                      <img
                        src={no_work_order}
                        alt={"no_work_order"}
                        className='no_work_order'
                      />
                    </div>
                    <div className='no_work1'>
                      Proforma Invoice has not been raised
                    </div>
                  </Col>
                )}
                <div className='job23_1a' id='details'>
                  {assigned_specialists.length == 0 &&
                    work_order_detail.invoice !== null && (
                      <div className='job23_1a wrap_z kdsd'>
                        <Col md={11} className='containerforemptyorder1 cust'>
                          <div className='containerforemptyorder'>
                            <img
                              src={no_work_order}
                              alt={"no_work_order"}
                              className='no_work_order'
                            />
                          </div>
                          <div className='no_work1'>
                            No Specialist have been assigned
                          </div>
                          {/* <div className="nojob2 ">
                            <div className="job3">Assign specialist</div>
                        </div> */}
                        </Col>
                      </div>
                    )}
                  <br />
                  <Work_Details work_order_detailz={workDetails} hide={true} />
                  <SpecialistDeployed work_order_detail={work_order_detail} />
                  <br id='worksheet' />
                  <Work_Sheet />
                  <br id='invoice' />
                  <Invoice_details work_order_detail={work_order_detail} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName='bg-danger text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default WorkOrderDetails;
