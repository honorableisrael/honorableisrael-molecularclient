import React, { useEffect, useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import "../contractor.css";
import arrow from "../../../images/arrow.png";
import { Link, withRouter } from "react-router-dom";
import specialist1 from "../../../images/specialist1.png";
import axios, { AxiosResponse } from "axios";
import { ageCalculator, API, capitalize, notify } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Specialist_Awaiting_Admin = withRouter((props) => {
  const [state, setState] = useState({
    all_specialist: [],
    isloading: false,
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
        axios.post(`${API}/admin/specialists/${id}/accept`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist successfully verified");
          console.log(res.data.data);
          setState({
            ...state,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const reject_new_specailist = (id) => {
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
        axios.post(`${API}/admin/specialists/${id}/decline`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          notify("Specialist successfully verified");
          console.log(res.data.data);
          setState({
            ...state,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const { admin, all_specialist,isloading }: any = state;
  console.log(all_specialist);
  return (
    <>
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
                    <button
                      className="accpt2"
                      onClick={() => accept_new_specailist(data.id)}
                    >
                      {isloading?"Accept":"Accepting"}
                    </button>
                    <button
                      className="rejct2"
                      onClick={() => accept_new_specailist(data.id)}
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
    </>
  );
});

export default Specialist_Awaiting_Admin;
