import React, { useState, useEffect } from "react";
import "./Specialistnav.css";
import { Button, } from "react-bootstrap";
import dshlogo from "../../images/dashbdlogo.png";
import { Link, NavLink } from "react-router-dom";
import bell from "../../images/bell.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import chevron from "../../images/chevrondown.png";
import { API, capitalize  } from "../../config";
import Axios, { AxiosResponse } from "axios";

const DashboardNav = props => {
  const [state, setState] = React.useState({
    NavisOpen: false,
    theUserIsLoggedIn: false,
    isloading: false,
    anchorEl: null,
    user_details: {},
  });
  const { NavisOpen, isloading, anchorEl, user_details }: any = state;

  const handleClick = event => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    
    Axios.get<any, AxiosResponse<any>>(`${API}/specialist`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .then((res)=>{
       setState({
         ...state,
         user_details: res.data.data,
         theUserIsLoggedIn: true,
       })
    })
    .catch((err) => {
      console.log(err);
    });
  
  }, []);

  return (
    <div className="fixfdnav">
      <div className="navwrap">
        <div className="dsbdlogo">
          <Link to="/">
            <img src={dshlogo} alt="logo" className="logo2" />
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
                    color: "#333333"
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
                    color: "#333333"
                  }}
                >
                  Works
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/payments"
                  className="spclstnavlinks"
                  activeStyle={{
                    padding: "33px 30px 27px 30px",
                    backgroundColor: "#fd8b003a",
                    borderBottom: "3px solid #fd8c00",
                    color: "#333333"
                  }}
                >
                  Payments
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
                    color: "#333333"
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
                  color: "#333333"
                }}
              >
                <div className="bell2">
                  <img src={bell} className="bell" alt="bell" />
                </div>
              </NavLink>
              <span className="lfff">
                {capitalize(user_details?.first_name?.split("")[0])}
                {capitalize(user_details?.last_name?.split("")[0])}
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
                <NavLink to="/settings" activeStyle={{ backgroundColor: "#fd8b003a"}}>
                  <MenuItem className="muilistitem" onClick={handleClose}>
                    Profile
                  </MenuItem>
                </NavLink>
                  <MenuItem onClick={()=>{
                    localStorage.clear()
                    window.location.assign("/signin")
                  }} className="muilistitem">
                    Logout
                  </MenuItem>
              </Menu>
            </div>
          </div>
        <div
          className="mobileham"
          //   onClick={() => {
          //     setState({
          //       NavisOpen: NavisOpen ? false : true,
          //     });
          //   }}
        >
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
            <Link to="/">
              <span className="navsignup2">Dashboard</span>
            </Link>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <Link to="/properties">
              <span className="navsignup2">Job Offers</span>
            </Link>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <Link to="/mortgage">
              <span className="navsignup2">Profile</span>
            </Link>
          </div>
          <div className="siggnup1 animated slideInRight">
            {" "}
            <Link to="/contact">
              <span className="navsignup2">Settings</span>
            </Link>
          </div>
          <div className="siggnup animated slideInRight">
            {" "}
            <Link to="/signup">
              <Button className="navsignup navsignup1">Sign Up</Button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardNav;
