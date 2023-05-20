import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Table,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import logo from "../../images/Molecular.png";
import axios, { AxiosResponse } from "axios";
import {
  API,
  calculateTotalAmount,
  calculateTotalJoint,
  capitalizeFirstLetter,
  contractorToken,
  current_currency,
  FormatAmount,
  formatTime,
  notify,
  reloadPage,
  returnAdminToken,
} from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLink } from "react-router-hash-link";

const Contractor_Sub_Invoice_Details = (props) => {
  const [state, setState] = useState<any>({
    invoice_details: {},
    country: "",
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    show: false,
    show2: false,
    reason: "",
    isloading: false,
    work_order_detail: {},
    pipe_breakdown: [],
    selected_id: "",
    cost_exclusions: "",
    conditions: "",
    modal_state: "",
    show_modal: false,
    show_modal_1: false,
    add_invoice_modal: false,
    description: "",
    number_of_joints: "",
    pipe_schedules: [],
    pipeSizes: [],
    pipe_size: "",
    size: "",
    no_of_joints: "",
    pipe_schedule: "",
    id: "",
    edit_item_id: "",
    joints: "",
    size_value: "",
    pipe_schedule_name: "",
    show_delete: false,
    amount: 1,
    edit_worksheet_modal: false,
  });
  const inputEl1: any = React.useRef("");
  const inputEl2: any = React.useRef("");
  const handleClose = () =>
    setState({
      ...state,
      show_modal: false,
    });

  const handleShow = (type) =>
    setState({
      ...state,
      show_modal: true,
      modal_state: type,
    });

  const handleClose1 = () =>
    setState({
      ...state,
      show_modal_1: false,
    });

  const handleShow1 = () =>
    setState({
      ...state,
      show_modal_1: true,
    });

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    createItem();
  };
  const createItem = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      pipe_size: size,
      joints: no_of_joints,
      pipe_schedule,
      amount,
      description,
    };

    axios
      .post(`${API}/admin/sub-invoices/${props.match.params.id}/items/`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        fetch_all();
        notify(res?.data?.message);
        setState({
          ...state,
          isloading: false,
          add_invoice_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          add_invoice_modal: false,
        });
        console.log(err?.response);
        notify(err?.response?.data?.message);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update");
      });
  };

  const editPipeItem = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      pipe_size: size,
      joints: no_of_joints,
      pipe_schedule,
      amount,
      description,
    };

    axios
      .put(`${API}/admin/sub-invoices/items/${edit_item_id}`, data, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      .then((res) => {
        fetch_all();
        notify(res?.data?.message);
        setState({
          ...state,
          isloading: false,
          edit_worksheet_modal: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          edit_worksheet_modal: false,
        });
        console.log(err?.response);
        notify(err?.response?.data?.message);
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors?.size.join(""));
        }
        notify("Failed to update");
      });
  };

  const openPaymentModal2 = (id) => {
    setState({
      ...state,
      show2: true,
      selected_id: id,
    });
  };

  useEffect(() => {
    fetch_all();
  }, []);
  const fetch_all = () => {
    window.scrollTo(-0, -0);
    const invoice_: any = localStorage.getItem("invoice_id");
    const invoice = invoice_ ? JSON.parse(invoice_) : "";
    const token = contractorToken();
    axios
      .all([
        axios.get(
          `${API}/contractor/milestone-invoices/${props?.match?.params?.id}`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get(`${API}/bank-accounts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        // axios.get(
        //   `${API}/contractor/work-orders/${props?.match?.params?.workorderid}`,
        //   {
        //     headers: { Authorization: `Bearer ${token.access_token}` },
        //   }
        // ),
      ])
      .then(
        axios.spread((res2, res3, res4) => {
          console.log(res2.data.data);
          setState({
            ...state,
            ...res2.data.data,
            work_order_detail: res2.data.data,
            invoice_details: res2.data.data,
            edit_worksheet_modal: false,
            add_invoice_modal: false,
            show_delete: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          show_delete: false,
        });
        console.log(err);
      });
  };

  const SubmitConditions = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = { conditions };
    axios
      .all([
        axios.post(
          `${API}/admin/invoices/${props.match.params.id}/conditions`,
          data,
          {
            headers: {
              Authorization: `Bearer ${returnAdminToken().access_token}`,
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          reloadPage();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };

  const {
    show_modal_1,
    type,
    cost_exclusions,
    conditions,
    show_modal,
    work_order_description,
    work_order_detail,
    order_title,
    end_date,
    edit_item_id,
    isloading,
    show2,
    pipe_breakdown,
    edit_worksheet_modal,
    no_of_joints,
    invoice_details,
    selected_id,
    add_invoice_modal,
    description,
    show_delete,
    show,
    size,
    size_value,
    pipe_schedule_name,
    pipe_schedules,
    pipeSizes,
    pipe_size,
    pipe_schedule,
    amount,
  } = state;
  console.log(invoice_details, "invoice_details");
  return (
    <>
      <Container fluid={true} className='dasbwr nopaddrt tainer3'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Admin Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
          <div id='overview'></div>
        </Row>
        <Row className='rowt3 row3t2  brt00'>
          <Col md={11} className='job34 brt99x'>
            <div className='title_wo title_wo12 title_wo_ tbtom ttbom'>
              <div className='workorderheader fixedtitle'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>{" "}
                Invoice Details
              </div>
              <Button
                className='payspecialist1 h36'
                onClick={() => window.print()}>
                Print
              </Button>
            </div>
            <div className='text-right	'>
              {/* {invoice_details?.worksheet == null ? (
                <Link
                  to={`/contractor_worksheet/${invoice_details?.worksheet?.id}/${invoice_details?.work_order_id}`}>
                  <Button className='payspecialist1 h36'>
                    {isloading ? "processing" : "View work sheet"}
                  </Button>
                </Link>
              ) : (
                ""
              )} */}
            </div>
            <Row className='mgtop'>
              <Col md={12} className='mgtop345'>
                <div className='job23_1a hidden__1'>
                  <div className=''>
                    <div className='overview12 overviewflex-down'>
                      <Col md={12} className='plf'>
                        <div className=''>
                          {invoice_details?.status === "Paid" && (
                            <div className='box_inv outerpink'>
                              <span className='box_smalltick smalltickpink'></span>
                              {invoice_details?.status}
                            </div>
                          )}
                          {invoice_details?.status === "Unpaid" && (
                            <span>
                              <span className='acceptedinvoc bg-warning'>
                                Pending Payment
                              </span>
                            </span>
                          )}
                          <div className='boxwrapper__1'>
                            <div className='lcomponent'>
                              <div className='inv_title'>
                                Invoice : {invoice_details?.number ?? "~~/~~"}
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'></div>
                              </div>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Invoice Date</div>
                                <div className='inv_title4'>
                                  {formatTime(invoice_details?.date) ?? "~~/~~"}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <img src={logo} alt='' className='Simage' />
                              <div
                                className='Stext2'
                                dangerouslySetInnerHTML={{
                                  __html:
                                    invoice_details?.company_address ?? "n/a",
                                }}></div>
                            </div>
                          </div>
                          <hr />
                          <div className='boxwrapper__1 inv9'>
                            <div className='lcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3 inv_titlex '>
                                  {work_order_detail?.country}
                                </div>
                              </div>
                            </div>
                            <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='text-teal'>
                                  Milestone Description
                                </div>
                                <div className='ing'>
                                  {capitalizeFirstLetter(
                                    invoice_details?.description
                                  ) ?? "~~/~~"}
                                </div>
                                <div className='inv_title3'>
                                  {formatTime(invoice_details?.start_date)} -{" "}
                                  {formatTime(invoice_details?.end_date)}
                                </div>
                              </div>
                            </div>
                            {/* <div className='rcomponent'>
                              <div className='inv_title2'>
                                <div className='inv_title3'>Balance Due</div>
                                <div className='inv_title4 ing'>
                                  {current_currency}
                                  {FormatAmount(
                                    invoice_details?.total_amount_unpaid
                                  ) ?? "~~/~~"}
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <div className='ing_11'>
                            {isloading && (
                              <Spinner animation={"grow"} variant='info' />
                            )}
                            <div className='text-right mgg2'></div>
                          </div>
                        </div>
                        {invoice_details?.items?.length > 0 && (
                          <div className='accordion-body'>
                            <Table hover responsive>
                              <thead>
                                <tr>
                                  <th scope='col'>SN</th>
                                  <th scope='col'>PIPE SIZE</th>
                                  <th scope='col'>PIPE SCHEDULE</th>
                                  <th scope='col'>NO OF JOINTS</th>
                                  <th scope='col'>DESCRIPTION</th>
                                  <th scope='col'>AMOUNT(NGN)</th>
                                  {invoice_details?.action?.can_edit && (
                                    <th scope='col'>ACTION</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {invoice_details?.items?.map((data, i) => (
                                  <tr key={i} className='table-bordered'>
                                    <td>{i + 1}</td>
                                    <td>{data?.pipe_size?.size}</td>
                                    <td>{data?.pipe_schedule?.value}</td>
                                    <td>{data?.joints}</td>
                                    <td
                                      className='contractorname'
                                      style={{ whiteSpace: "pre-wrap" }}>
                                      {capitalizeFirstLetter(data?.description)}
                                    </td>
                                    <td>{FormatAmount(data?.amount)}</td>
                                    {invoice_details?.action?.can_edit && (
                                      <td className='contractorname'>
                                        <span
                                          className='mr-1 ml-2 cursor-pointer'
                                          title='Edit'
                                          onClick={() => {
                                            setState({
                                              ...state,
                                              edit_worksheet_modal: true,
                                              ...data,
                                              edit_item_id: data?.id,
                                              no_of_joints: data?.joints,
                                              pipe_schedule:
                                                data?.pipe_schedule?.id,
                                              pipe_schedule_name:
                                                data?.pipe_schedule?.value,
                                              pipe_size: data?.pipe_size?.size,
                                              size: data?.pipe_size?.id,
                                              size_value: data?.pipe_size?.size,
                                            });
                                          }}>
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-pencil'
                                            viewBox='0 0 16 16'>
                                            <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                                          </svg>
                                        </span>
                                        <span
                                          className='cursor-pointer'
                                          onClick={() => {
                                            setState({
                                              ...state,
                                              show_delete: true,
                                              edit_item_id: data?.id,
                                            });
                                          }}
                                          title='Delete'>
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-trash'
                                            viewBox='0 0 16 16'>
                                            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                            <path
                                              fill-rule='evenodd'
                                              d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                            />
                                          </svg>
                                        </span>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                                <tr className='table-bordered'>
                                  <td colSpan={3} className='text-right pr-2'>
                                    <b> Total</b>
                                  </td>
                                  <td>
                                    <b>
                                      {" "}
                                      {FormatAmount(
                                        calculateTotalJoint(
                                          invoice_details.items
                                        )
                                      )}
                                    </b>
                                  </td>
                                  <td></td>
                                  <td>
                                    <b>
                                      {FormatAmount(
                                        calculateTotalAmount(
                                          invoice_details.items
                                        )
                                      )}
                                    </b>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        )}
                        <div className='allpayment00'>
                          <div className='allpayment1'>
                            All payments go to the account details below
                          </div>
                          {
                            <div className='fbn1'>
                              <div className='bnclass'>
                                <span className='lightcolor'> Bank name:</span>
                                {invoice_details?.bank_account?.bank_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account name:
                                </span>
                                {invoice_details?.bank_account?.account_name}
                              </div>
                              <div className='bnclass'>
                                <span className='lightcolor'>
                                  {" "}
                                  Account number:
                                </span>
                                {invoice_details?.bank_account?.account_number}
                              </div>
                            </div>
                          }
                          {/* {invoice_details?.bank_accounts?.map((data, i) => (
                            <div className='fbn1'>
                              <div className='bnclass'>{data.bank}</div>
                              <div className='bnclass'>
                                {data.account_number}
                              </div>
                              <div className='bnclass'>{data.account_name}</div>
                            </div>
                          ))} */}
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* <div className='nxtbck btmadjustment'>
              <HashLink
                to={`/admin_view/${invoice_details?.work_order?.contractor_id}/contractor_invoice/${invoice_details?.id}`}>
                <div className='gent122 gent12212'>
                  {"Contractor Invoice Preview"}
                </div>
              </HashLink>
            </div> */}
          </Col>
        </Row>
      </Container>

      <Modal
        show={show_modal_1}
        onHide={handleClose1}
        backdrop='static'
        keyboard={false}
        size={"lg"}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <span className='fl3e4'>Append Conditions</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='row inputlabel label_pad justify-between'>
            <div className='col-md-12 form_waller'>
              <span className='rdfrmlbl rdfrmlblw2'>
                {" "}
                Work Conditions <span className='text-danger'>*</span>
              </span>
              <textarea
                name='conditions'
                value={conditions}
                onChange={onchange}
                className='form-control forminput hu0'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose1}>
            Back
          </Button>
          <Button variant='' className='bvnbt' onClick={SubmitConditions}>
            {state.isloading ? "Processing" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default Contractor_Sub_Invoice_Details;
