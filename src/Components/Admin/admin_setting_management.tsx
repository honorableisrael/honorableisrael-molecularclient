import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Modal,
  Card,
  Pagination,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import "./contractor.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link, withRouter } from "react-router-dom";
import blueavatar from "../../images/group2.png";
import Accordions from "../Widgets/Accordion";
import axios from "axios";
import {
  API,
  formatTime,
  formatTime2,
  notify,
  refreshpage,
  returnAdminToken,
} from "../../config";
import { ToastContainer } from "react-toastify";
import TableDropdownPipes from "./dropdown/TableDropdownPipes";

const AdminSettingManagment = withRouter((props) => {
  const [state, setState] = useState<any>({
    pipe_management_: true,
    deployedspecialist: false,
    active: false,
    thirdtab: false,
    exchange_rate: [],
    exchange_rates: false,
    chevron: "",
    selectedspecialist: "",
    name: "",
    description: "",
    code: "",
    isloading: false,
    bank_accounts: false,
    create_pipe: true,
    create_bank_account: false,
    add_exchange: false,
    account_name: "",
    account_number: "",
    rate: "",
    status: "",
    date: "",
    bank: "",
    exchangeRate: false,
    All_Bank_Accounts: [],
    Allpipes: [],
    AllexchangeRateSpecialist: [],
    banks: [],
    show: false,
    group_name: "",
    group_description: "",
    group_id: "",
    next_page: "",
    prev_page: "",
    current: "",
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });

  const {
    pipe_management_,
    exchange_rates,
    exchange_rate,
    deployedspecialist,
    banks,
    selectedspecialist,
    AllexchangeRateSpecialist,
    account_name,
    account_number,
    bank,
    create_bank_account,
    Allpipes,
    All_Bank_Accounts,
    isloading,
    name,
    description,
    code,
    show,
    show2,
    create_pipe,
    bank_accounts,
    exchangeRate,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    rate,
    status,
    date,
  }: any = state;

  const onchange = (e) => {
    
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const CreatePipe = () => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const data = {
      name,
      description,
      code,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(`${API}/pipes`, data, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          notify("Successfully created pipe");
          refreshpage();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        notify("Failed to create work group", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const CreateBank = () => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const data = {
      bank,
      account_name,
      account_number,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(`${API}/bank-accounts`, data, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          notify("Successfully created bank");
          refreshpage();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        notify("Failed to create work group", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const SubmitRate = () => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    const data = {
      rate,
      // status,
      date
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(`${API}/exchange-rates`, data, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          notify("Successfully created rate");
          refreshpage();
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        notify("Failed to create rate", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  
  const refresh_all = () => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/pipes`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            work_order_detail: res.data.data,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        
      });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    axios
      .all([
        axios.get(`${API}/pipes`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        axios.get(`${API}/banks`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            banks: res2.data.data.data,
            Allpipes: res.data.data,
            exchangeRate: props.location.search === "?worksheet" ? true : false,
            pipe_management_:
              props.location.search === "?worksheet" ? false : true,
          });
        })
      )
      .catch((err) => {
        
      });
  }, []);

  const get_all = (a) => {
    const token = returnAdminToken();
    const work_order = localStorage.getItem("work_order_details");
    const work_order_details = work_order ? JSON.parse(work_order) : "";
    setState({
      ...state,
      pipe_management_: a == "pipe_management_" ? true : false,
      exchangeRate: a == "exchangeRate" ? true : false,
      bank_accounts: a == "bank_accounts" ? true : false,
    });
    axios
      .all([
        axios.get(
          `${API}/admin/work-orders/${work_order_details?.id}/specialists?paginate=1`,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
        axios.get(`${API}/admin/work-orders/${work_order_details?.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            pipe_management_: a == "pipe_management_" ? true : false,
            exchangeRate: a == "exchangeRate" ? true : false,
            bank_accounts: a == "bank_accounts" ? true : false,
          });
        })
      )
      .catch((err) => {
        
      });
  };

  const get_exchangeRate = (a) => {
    const token = returnAdminToken();
    setState({
      ...state,
      pipe_management_: a == "pipe_management_" ? true : false,
      exchangeRate: a == "exchangeRate" ? true : false,
      bank_accounts: false,
      create_pipe:false,
      create_bank_account: false,
    });
    axios
      .all([
        axios.get(`${API}/exchange-rates`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            exchange_rate: res.data.data.data,
            pipe_management_: false,
            create_pipe:false,
            exchangeRate: true,
            create_bank_account: false,
            bank_accounts: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          create_bank_account: false,
        });
        
      });
  };

  const get_bank_accounts = (a) => {
    setState({
      ...state,
      pipe_management_: a == "pipe_management_" ? true : false,
      exchangeRate: false,
      bank_accounts: a == "bank_accounts" ? true : false,
      create_bank_account: a == "bank_accounts" ? true : false,
    });
    window.scrollTo(-0, -0);
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${API}/bank-accounts`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
            All_Bank_Accounts: res.data.data,
            pipe_management_: a == "pipe_management_" ? true : false,
            exchangeRate: false,
            bank_accounts: a == "bank_accounts" ? true : false,
            create_bank_account: a == "bank_accounts" ? true : false,
            create_pipe: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
          bank_accounts: true,
          create_pipe: false,
        });
        
      });
  };
  const nextPage = (a) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    setState({
      ...state,
      pipe_management_: a == "pipe_management_" ? true : false,
      exchangeRate: a == "exchangeRate" ? true : false,
      bank_accounts: a == "bank_accounts" ? true : false,
    });
    axios
      .all([
        axios.get(`${a}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          window.scrollTo(-0, -0);
          setState({
            ...state,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        
      });
  };
  const openModal = (modal_type) => {
    setState({
      ...state,
      show: true,
      create_pipe: modal_type == "pipe" ? true : false,
      create_bank_account: modal_type == "bank" ? true : false,
      exchangeRate: modal_type == "exchange_rate" ? true : false,
    });
  };
  const sendSpecialistId = (id: any) => {
    const add_new: any = [id];
    const old_array = selectedspecialist;
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
      selectedspecialist: [...selectedspecialist, ...add_new],
    });
  };

  const openModal2 = () => {
    setState({
      ...state,
      show2: true,
    });
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MolecularPro - Invited Specialists</title>
        <link />
      </Helmet>
      <Modal
        size="lg"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        {create_pipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Create Pipe size
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Pipe name</h6>
                          <Form.Control
                            type="text"
                            value={name}
                            className="userfield"
                            id="name"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Pipe code</h6>
                          <Form.Control
                            type="text"
                            value={code}
                            className="userfield"
                            id="code"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Pipe Description</h6>
                          <Form.Control
                            type="text"
                            value={description}
                            className="userfield"
                            id="description"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="terminate2">
                  <div className="create_group success">
                    <Button className="manage_" onClick={CreatePipe}>
                      {isloading ? "processing" : "Create pipe"}{" "}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
        {create_bank_account && (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Create Bank Account
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Row>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Select Bank</h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                            id="bank"
                            onChange={onchange}
                          >
                            <option className="rdsltopt" selected hidden>
                              --Please select your bank--
                            </option>
                            {banks?.map((data, i) => (
                              <option
                                value={data.name}
                                className="profsettinformselect"
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Account number</h6>
                          <Form.Control
                            type="text"
                            value={account_number}
                            className="userfield"
                            id="account_number"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Account Name</h6>
                          <Form.Control
                            type="text"
                            value={account_name}
                            className="userfield"
                            id="account_name"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="terminate2">
                  <div className="create_group success">
                    <Button className="manage_" onClick={CreateBank}>
                      {isloading ? "processing" : "Create bank"}{" "}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
        {exchangeRate && (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                New Exchange Rate
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Row>
                      {/* <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Status</h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                            id="status"
                            onChange={onchange}
                          >
                            <option className="rdsltopt" selected hidden>
                              --Please select status--
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </Form.Group>
                      </Col> */}
                      <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Rate</h6>
                          <Form.Control
                            type="number"
                            value={rate}
                            className="userfield"
                            id="rate"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col md={12} className="formsection1">
                        <Form.Group>
                          <h6 className="userprofile">Date </h6>
                          <Form.Control
                            type="date"
                            value={date}
                            className="userfield"
                            id="date"
                            onChange={onchange}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col> */}
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="terminate2">
                  <div className="create_group success">
                    <Button className="manage_" onClick={SubmitRate}>
                      {isloading ? "processing" : "Submit Rate"}{" "}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
      <Modal
        size="sm"
        show={show2}
        onHide={() =>
          setState({
            ...state,
            show2: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Select a group to add specialist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}></Col>
          </Row>
        </Modal.Body>
      </Modal>
      <DashboardNav />
      <Container fluid>
        <Row className="depsplstrow">
          <Col md={11}>
            <div className="title_wo title_wo12 title_wo_">
              <div
                className="workorderheader"
                onClick={() => window.history.back()}
              >
                <span>
                  {" "}
                  <img src={arrowback} className="arrowback" />
                </span>
                &nbsp; Admin Settings
              </div>
              {create_pipe && (
                <div className="manage_" onClick={() => openModal("pipe")}>
                  Create Pipe
                </div>
              )}
              {create_bank_account && (
                <div className="manage_" onClick={() => openModal("bank")}>
                  Create Bank
                </div>
              )}
              {exchangeRate && (
                <div
                  className="manage_"
                  onClick={() => openModal("exchange_rate")}
                >
                  Create Exchange Rate
                </div>
              )}
            </div>
            <div className="dpsplsttabs">
              <div
                onClick={() => get_all("pipe_management_")}
                className={
                  pipe_management_ ? "inprogress tab_active" : "inprogress"
                }
              >
                Pipe Management
              </div>
              <div
                onClick={() => get_bank_accounts("bank_accounts")}
                className={
                  bank_accounts ? "inprogress tab_active" : "inprogress"
                }
              >
                Bank Accounts
              </div>
              <div
                onClick={() => get_exchangeRate("exchangeRate")}
                className={
                  exchangeRate ? "inprogress tab_active" : "inprogress"
                }
              >
                Exchange Rates
              </div>
            </div>
            <div className="ddeplsmni">
              {pipe_management_ && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <p>List of all pipe sizes</p>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Code</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Allpipes?.map((data: any, i) => (
                          <tr key={i}>
                            <td className="dpslstnamecell">
                              <div className="dplsplusernmeimg">
                                <span></span>
                                <div>{data.name}&nbsp;</div>
                              </div>
                            </td>
                            <td>{data?.code}</td>
                            <td>{data?.description ?? "n/a"}</td>
                            <td>{formatTime(data?.created_at)}</td>{" "}
                            <td>
                              <TableDropdownPipes company_info={data} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {pipe_management_ && (
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
                </div>
              )}
              {exchangeRate && (
                <>
                  <div>
                    <div className="deploysplstheader">
                      <div className="depsplstimg">
                        <img src={blueavatar} alt="img" />
                      </div>
                      <p>Exchange rate</p>
                    </div>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Rate</th>
                          <th>Status</th>
                          <th>Date</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {exchange_rate?.map((data: any, i) => (
                          <tr key={i}>
                            <td className="dpslstnamecell">
                              <div className="dplsplusernmeimg">
                                <span></span>
                                <div>{data.rate}</div>
                              </div>
                            </td>
                            <td>{data?.status}</td>
                            <td>{formatTime(data?.date)}</td>{" "}
                            {/* <td>
                              <TableDropdownPipes company_info={data} />
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {exchangeRate && (
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
                </>
              )}
              {bank_accounts && (
                <div>
                  <div className="deploysplstheader">
                    <div className="depsplstimg">
                      <img src={blueavatar} alt="img" />
                    </div>
                    <div className="add_fel">
                      <div>MolecularPro bank accounts</div>
                      {selectedspecialist.length !== 0 && (
                        <Button
                          className="add_to_group manage_"
                          onClick={openModal2}
                        >
                          Manage bank accounts
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="deployedsplsttable">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Bank Name</th>
                          <th>Account name</th>
                          <th>Account Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {All_Bank_Accounts?.map((data: any, i) => (
                          <tr key={i}>
                            <td className="dpslstnamecell">
                              <div className="dplsplusernmeimg">
                                <span></span>
                                <div>{data.bank}</div>
                              </div>
                            </td>
                            <td>{data?.account_name}</td>
                            <td>{data?.account_number}</td>{" "}
                            <td>
                              <TableDropdownPipes company_info={data} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {pipe_management_ && (
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
                </div>
              )}
            </div>
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
});

export default AdminSettingManagment;
