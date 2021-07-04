import React, { useEffect, useState } from "react";
import { Col, Row, Container, Modal, Spinner, Form } from "react-bootstrap";
import "../contractor.css";
import arrow from "../../../images/arrow.png";
import { Link, withRouter } from "react-router-dom";
import specialist1 from "../../../images/specialist1.png";
import axios, { AxiosResponse } from "axios";
import { ageCalculator, API, capitalize, notify } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Specialist_Awaiting_Admin = withRouter((props) => {
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
        axios.get(`${API}/admin/specialists?paginate=1&limit=5`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            all_specialist: res.data.data.data,
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
    all_specialist: [],
    isloading: false,
    reason: "",
    show: false,
    selected_specialist: "",
  });

  const accept_new_specailist = (id) => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/login");
    }
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/specialists/${id}/accept`,
          {},
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist successfully verified");
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
        notify("Specialist successfully verified", "D");
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
  const reject_new_specailist = () => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "admin") {
      return props.history.push("/login");
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
          `${API}/admin/specialists/${state.selected_specialist}/decline`,
          data,
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist application rejected");
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
  const { admin, all_specialist, isloading, reason, show }: any = state;
  console.log(all_specialist);
  return (
    <>
      <Col className="fc12" md={12}>
        <div className="carderw carderwax carderwaxx fc14 specialist_one">
          <div className="Projectsx">Specialists Awaiting Approval</div>
          {isloading && <Spinner variant="info" animation={"grow"} />}
          <div className="specialistrow">
            <div className="specialistwrapper">
              <div className="skill_of_specialist1 itemwidth"> Full name</div>
              <div className="skill_of_specialist1">email</div>

              <div className="skill_of_specialist1">
                <div>Skills</div>
              </div>
              <div className="skill_of_specialist1">
                <div>Age</div>
              </div>
              <div className="accpt3"></div>
            </div>
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
                  <div className="skill_of_specialist1">{data?.email}</div>
                  <div className="skill_of_specialist1">
                    <div>
                      {" "}
                      {data?.skills?.map((data1, i) => (
                        <span key={i}>{capitalize(data1.name)}</span>
                      ))}
                    </div>
                    <div className="skill_of_specialist1">
                      {capitalize(data?.skills?.[0]?.title)}
                    </div>  
                  </div>
                  <div className="skill_of_specialist1">
                    <div>{ageCalculator(data?.dob)}</div>
                  </div>
                  <div className="accpt3">
                    <button
                      className="accpt2"
                      onClick={() => accept_new_specailist(data.id)}
                    >
                      {!isloading ? "Accept" : "Accepting"}
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
            Reject Specialist
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
              <div className="terminate1" onClick={reject_new_specailist}>
                Reject
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default Specialist_Awaiting_Admin;
