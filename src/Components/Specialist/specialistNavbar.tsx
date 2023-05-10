import React, { useState, useEffect } from "react";
import "./Specialistnav.css";
import { Button } from "react-bootstrap";
import dshlogo from "../../images/dashbdlogo.png";
import { Link, NavLink } from "react-router-dom";
import bell from "../../images/bell.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import chevron from "../../images/chevrondown.png";
import { API, capitalize } from "../../config";
import Axios, { AxiosResponse } from "axios";

const DashboardNav = (props) => {
  const [state, setState] = React.useState({
    NavisOpen: false,
    theUserIsLoggedIn: false,
    isloading: false,
    anchorEl: null,
    user_details: {},
  });
  const { NavisOpen, isloading, anchorEl, user_details }: any = state;

  const handleClick = (event) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };
  const mobilenavbar = () => {
    setState({
      ...state,
      NavisOpen: !NavisOpen,
    });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    const token = availableToken ? JSON.parse(availableToken) : "";
    Axios.get<any, AxiosResponse<any>>(`${API}/specialist`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        setState({
          ...state,
          user_details: res.data.data,
          theUserIsLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="fixfdnav">
      <div className="navwrap">
        <div className="dsbdlogo">
          <Link to="/home">
            <img src={dshlogo} alt="logo" className="logo2 img-fluid" />
          </Link>
        </div>

        <div className="otherwrap" style={{ marginTop: "0px" }}>
          <div className="speclnavlnkwrapper">
            <div>
              <NavLink
                to={"/specialistdashboard"}
                className="spclstnavlinks"
                activeStyle={{
                  padding: "33px 30px 27px 30px",
                  backgroundColor: "#fd8b003a",
                  borderBottom: "3px solid #fd8c00",
                  color: "#333333",
                }}
              >
                Dashboard
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/works"
                className="spclstnavlinks"
                activeStyle={{
                  padding: "33px 30px 27px 30px",
                  backgroundColor: "#fd8b003a",
                  borderBottom: "3px solid #fd8c00",
                  color: "#333333",
                }}
              >
                Works
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/settings"
                className="spclstnavlinks"
                activeStyle={{
                  padding: "33px 30px 27px 30px",
                  backgroundColor: "#fd8b003a",
                  borderBottom: "3px solid #fd8c00",
                  color: "#333333",
                }}
              >
                Settings
              </NavLink>
            </div>
          </div>
          <div className="dshbdnavnotifictndv">
            <NavLink
              to="/specialistnotifications"
              className="spclstnavlinks noticopaddin"
              activeStyle={{
                padding: "25px 30px 27px 30px",
                backgroundColor: "#fd8b003a",
                borderBottom: "3px solid #fd8c00",
                color: "#333333",
              }}
            >
              <div className="bell2">
                <img src={bell} className="bell" alt="bell" />
              </div>
            </NavLink>
            <span className="lfff">
              {user_details?.photo ? (
                <img src={user_details?.photo} className="udetails" alt="" />
              ) : (
                <>
                  {capitalize(user_details?.first_name?.split("")[0])}
                  {capitalize(user_details?.last_name?.split("")[0])}
                </>
              )}
            </span>
            <div className="chevron-imgwrap" onClick={handleClick}>
              <img src={chevron} alt="img" />
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="materldrpdwnwrap"
              style={{ width: "200px !important" }}
            >
              <NavLink
                to="/settings"
                activeStyle={{ backgroundColor: "#fd8b003a" }}
              >
                <MenuItem className="muilistitem" onClick={handleClose}>
                  Profile
                </MenuItem>
              </NavLink>
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  window.location.assign("/#signin");
                }}
                className="muilistitem"
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Link to="/specialistnotifications">
          <div className="mobilenotifcationbell">
            <span className="fa fa-bell"></span>
          </div>
        </Link>
        <span className=" mobileinitialsdsply">
          {capitalize(user_details?.first_name?.split("")[0])}
          {capitalize(user_details?.last_name?.split("")[0])}
        </span>
        <div className="mobileham" onClick={mobilenavbar}>
          {!NavisOpen ? (
            <>
              <div className="ham1 animated slideInLeft"></div>
              <div className="ham2 animated slideInLeft"></div>
              <div className="ham3 animated slideInLeft"></div>
            </>
          ) : (
            <span className="nvtimes animated slideInLeft">&times;</span>
          )}
        </div>
      </div>
      {NavisOpen ? (
        <div className="ismobile animated slideInDown">
          <div className="siggnup1 animated slideInRight">
            {" "}
            <NavLink
              to="/specialistdashboard"
              className="spclstnavlinks mobilesidenallinks"
              activeStyle={{
                padding: "20px 86px ",
                backgroundColor: "#fd8b003a",
                borderLeft: "3px solid #fd8c00",
                color: "#333333",
              }}
            >
              <span className="navsignup2">Dashboard</span>
            </NavLink>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <NavLink
              className="spclstnavlinks mobilesidenallinks"
              activeStyle={{
                padding: "20px 100px",
                backgroundColor: "#fd8b003a",
                borderLeft: "3px solid #fd8c00",
                color: "#333333",
              }}
              to="/works"
            >
              <span className="navsignup2">Works</span>
            </NavLink>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <NavLink
              className="spclstnavlinks mobilesidenallinks"
              activeStyle={{
                padding: "20px 100px",
                backgroundColor: "#fd8b003a",
                borderLeft: "3px solid #fd8c00",
                color: "#333333",
              }}
              to="/settings"
            >
              <span className="navsignup2">Settings</span>
            </NavLink>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <div
              className="spclstnavlinks mobilesidenallinks"
              onClick={() => {
                localStorage.clear();
                window.location.assign("/#signin");
              }}
            >
              <span className="navsignup2">Log Out</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardNav;
