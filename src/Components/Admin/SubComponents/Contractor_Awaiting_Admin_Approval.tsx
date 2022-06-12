import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Modal,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import "../contractor.css";
import arrow from "../../../images/arrow.png";
import { Link, withRouter } from "react-router-dom";
import specialist1 from "../../../images/specialist1.png";
import axios, { AxiosResponse } from "axios";
import { ageCalculator, API, capitalize, notify } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contractor_Awaiting_Admin = withRouter((props) => {
  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/signin");
    }
    axios
      .all([
        axios.get(`${API}/admin/contractors/inactive?paginate=1`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_contractors: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const openModal = (id) => {
    setState({
      ...state,
      show: true,
      selected_specialist: id,
    });
  };
  const [state, setState] = useState({
    all_contractors: [],
    isloading: false,
    reason: "",
    show: false,
    selected_specialist: "",
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });

  const accept_new_contractor = (id) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    if (token.user_type !== "admin") {
      return props.history.push("/signin");
    }
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/contractors/${id}/accept`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Contractor accepted");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
      )
      .catch((err) => {
        notify("Contractor rejected", "D");
        setState({
          ...state,
          isloading: false,
        });
        console.log(err);
      });
  };
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const reject_new_contractor = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/signin");
    }
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      reason,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/contractors/${state.selected_specialist}/decline`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Contractor application approved");
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
      )
      .catch((err) => {
        notify("Failed to process", "D");
        setState({
          ...state,
          isloading: false,
          show: false,
        });
        console.log(err);
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
          window.scrollTo(0, 500);
          setState({
            ...state,
            all_contractors: res.data.data.data,
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
    admin,
    all_contractors,
    isloading,
    reason,
    show,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
    to,
  }: any = state;
  console.log(all_contractors);
  return (
    <>
      <Col className="fc12" md={12}>
        <div className="carderw carderwax carderwaxx fc14 specialist_one">
          <div className="Projectsx">Contractor Awaiting Approval</div>
          {isloading && <Spinner variant="info" animation={"grow"} />}
          <div className="specialistrow">
            <div className="specialistwrapper">
              <div className="skill_of_specialist1 itemwidth">
                {" "}
                Company name
              </div>
              <div className="skill_of_specialist1">email</div>

              <div className="skill_of_specialist1">
                <div>Request type</div>
              </div>
              <div className="accpt3"></div>
            </div>
            {all_contractors.map((data, i) =>
              data.status ? (
                <div className="specialistwrapper">
                  {false && (
                    <img
                      src={specialist1}
                      className="specialist1"
                      alt="specialist1"
                    />
                  )}
                  {
                    // <span className="lfff dashboard_userfoto">
                    //   {capitalize(data?.first_name?.split("")[0])}
                    //   {capitalize(data?.last_name?.split("")[0])}
                    // </span>
                  }
                  <div className="name_of_specialist nameofcontractor">
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
                      {data.company_name}
                    </div>
                    <div className="name_specailist1">
                      {data?.registered_on}
                    </div>
                  </div>
                  <div className="skill_of_specialist1">
                    {data?.contractor.email}
                  </div>
                  <div className="skill_of_specialist1">
                    <div className="skill_of_specialist1">
                      {capitalize(data?.need)}
                    </div>
                  </div>
                  <div className="accpt3">
                    <button
                      className="accpt2"
                      onClick={() => accept_new_contractor(data.id)}
                    >
                      {"Accept"}
                    </button>
                    <button
                      className="rejct2"
                      onClick={() => openModal(data.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
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
          {/* <div className="text_align2">
            <Link to="/allspecialist">
              <span className="arrow21 _arrow21 text11 "></span>{" "}
              <img
                src={arrow}
                title="See more"
                className="arrow21c arrow2x top__t1"
                alt="arrow"
              />
            </Link>
          </div> */}
        </div>
      </Col>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
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
            Reject Contractor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              {isloading && <Spinner variant="info" animation={"grow"} />}
            </Col>
            <Col md={12}>
              <Form>
                <textarea
                  value={reason}
                  name={"reason"}
                  onChange={onchange}
                  className="form-control reason12 reason122"
                  placeholder="Reason for termination"
                ></textarea>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="terminate1" onClick={reject_new_contractor}>
                Reject
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default Contractor_Awaiting_Admin;
