import React, { useEffect, useState } from "react";
import { Col, Row, Container, Modal, Form, Pagination } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import WorkOrderCards from "./WorkOrderCards";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import email3 from "../../images/email3.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { API, loggedInDetails } from "../../config";

const MySwal = withReactContent(Swal);

const ListOfContractor = () => {
  const [state, setState] = useState({
    contractor_list: [],
    inprogress: true,
    pending_request: false,
    past: false,
    work_order_title: "",
    work_order_description: "",
    project_purpose: "",
    location: "",
    state_: "",
    location_terrain: "",
    start_date: "",
    end_date: "",
    hours_perday: "",
    show: false,
    first_name: "",
    last_name: "",
    rc_number: "",
    company_phone: "",
    company_email: "",
    contractor_id: "",
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
  const openModal = (e, x) => {
    setState({
      ...state,
      show: true,
    });
  };
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
  };
  const onchange = (e) => {
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
  const submit = () => {
    MySwal.fire({
      title: "Successfully added contractor",
    });
    setState({
      ...state,
      show: false,
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
        
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    getAllContractors();
  }, []);
  const {
    inprogress,
    pending_request,
    past,
    first_name,
    last_name,
    contractor_list,
    work_order_title,
    rc_number,
    work_order_description,
    project_purpose,
    location,
    contractor_id,
    show,
    company_phone,
    company_email,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    to,
    total,
  } = state;
  const getAllContractors = () => {
    axios
      .all([
        axios.get(`${API}/admin/contractors?paginate=1`, {
          headers: {
            Authorization: `Bearer ${loggedInDetails().access_token}`,
          },
        }),
      ])
      .then(
        axios.spread((res) => {
          window.scrollTo(0, 0);
          
          setState({
            ...state,
            contractor_list: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            inprogress: true,
            pending_request: false,
            past: false,
          });
        })
      )
      .catch((err) => {
        
      });
  };

  const deleteContractor = (id) => {
    setState({
      ...state,
      contractor_id: id,
    });
    Swal.fire({
      title: "Confirm Delete!",
      icon: "warning",
      text: "Everything associated with this contractor including work orders, payment invoices, etc will be completely erased and this action cannot be undone, do you want to continue",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, keep it",
      preConfirm: () => delete_contractor(id),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Contractor has been deleted.", "success");
      }
    });
  };

  const delete_contractor = (id) => {
    axios
      .delete(`${API}/admin/contractors/${id}`, {
        headers: { Authorization: `Bearer ${loggedInDetails().access_token}` },
      })
      .then((res) => {
        
        getAllContractors();
      })
      .catch((err) => {
        
      });
  };

  const archive_contractor = (id) => {
    axios
      .delete(`${API}/admin/contractors/${id}/archive`, {
        headers: { Authorization: `Bearer ${loggedInDetails().access_token}` },
      })
      .then((res) => {
        
        getAllContractors();
      })
      .catch((err) => {
        
      });
  };

  const archiveContractor = (id) => {
    setState({
      ...state,
      contractor_id: id,
    });
    Swal.fire({
      title: "Confirm Archive!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, archive!",
      cancelButtonText: "No, back",
      preConfirm: () => archive_contractor(id),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Successful!", "Added to archive.", "success");
      }
    });
  };
  
  return (
    <>
      <Container fluid={true} className="dasbwr">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MolecularPro - Contractor Work Order</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className="rowt3">
          <Col md={11} className="job34">
            <div className="title_wo">
              <div className="jobs">Contractor</div>
              <div className="job2">
                <Link to="/contractor_onboarding" target="blank">
                  <div className="job3 jwidth">Add Contractor</div>
                </Link>
              </div>
            </div>
            <div className="intab">
              <div
                onClick={() => getAllContractors()}
                className={inprogress ? "inprogress tab_active" : "inprogress"}
              >
                All
              </div>
              {/* <div
                onClick={() => switchTab("secondtab")}
                className={
                  pending_request ? "inprogress tab_active" : "inprogress"
                }
              >
                Archive
              </div> */}
            </div>
            <Row>
              {contractor_list?.length == 0 && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={no_work_order}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no contractor</div>
                </Col>
              )}
              <div className="cardflex_jo">
                {contractor_list?.map((data: any, i) => (
                  <>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => archiveContractor(data?.id)}
                        className="btn btn-info Deletebtn archiv2"
                      >
                        Archive
                      </button>
                      {/* <button
                        type="button"
                        onClick={() => deleteContractor(data?.id)}
                        className="btn btn-danger Deletebtn"
                      >
                        Delete
                      </button> */}
                    </div>
                    <Link to={`/admin/contractors/${data.id}`}>
                      <WorkOrderCards
                        contractor={data}
                        key={i}
                        title="Nigerian National Petroleum Corporation"
                      />
                    </Link>
                  </>
                ))}
              </div>
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
            </Row>
          </Col>
        </Row>
      </Container>
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
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Contractor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form>
                <Row>
                  <Col md={6} className="formsection1 formsection_padding_zero">
                    <Form.Group>
                      <h5 className="userprofile">Company Name</h5>
                      <Form.Control
                        type="text"
                        value={first_name}
                        className="userfield"
                        name="first_name"
                        onChange={onchange}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="formsection1 formsection_padding_zero">
                    <Form.Group>
                      <h5 className="userprofile">Company Email</h5>
                      <Form.Control
                        type="text"
                        value={company_email}
                        className="userfield"
                        name="company_email"
                        onChange={onchange}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="formsection1 formsection_padding_zero">
                    <Form.Group>
                      <h6 className="userprofile">RC Number</h6>
                      <Form.Control
                        type="text"
                        value={rc_number}
                        className="userfield"
                        name="rc_number"
                        onChange={onchange}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="formsection1">
                    <Form.Group>
                      <h6 className="userprofile">Company Phone</h6>
                      <Form.Control
                        type="text"
                        value={company_phone}
                        className="userfield"
                        name="company_phone"
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
            <Col md={12} className="terminate2 back11a">
              <div className="terminate1 back11">Back</div>
              <div className="job2">
                <div className="job3 back11app" onClick={submit}>
                  Add Contractor
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListOfContractor;
