import React, { useEffect } from "react";
import "./navbar.css";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import logo from "../../images/Molecular.png";
import { Link, withRouter } from "react-router-dom";
import bell from "../../images/bell.png";
import { API, capitalize } from "../../config";
import axios from "axios";
import Axios, { AxiosResponse } from "axios";

const DashboardNav = withRouter((props) => {
  const [state, setState] = React.useState({
    NavisOpen: false,
    theUserIsLoggedIn: false,
    isloading: false,
    user_details: {},
  });
  const { NavisOpen, isloading, user_details }: any = state;

  useEffect(() => {
    const availableToken: any = localStorage.getItem("loggedInDetails");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/");
    if (token.user_type !== "contractor") {
      return props.history.push("/login");
    }
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/contractor`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            theUserIsLoggedIn: true,
            user_details: res.data.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user_details);
  return (
    <div className="fixfdnav">
      <div className="navwrap nav__wrap navwrap_cont">
        <div className="logoarea">
          <Link to="/">
            <img src={logo} alt="logo" className="logo2" />
          </Link>
        </div>
        {true && (
          <div className="otherwrap">
            <div className="otherwrap23">
              <Link to={"/contractor_dashboard"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/contractor_dashboard"
                      ? "navlink_is_active lightorange  "
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Dashboard</div>
                </span>
                {window.location.pathname == "/contractor_dashboard" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              <Link to={"/contractor_work_order"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/contractor_work_order" ||
                    window.location.pathname == "/work_order"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Work Orders</div>
                </span>
                {window.location.pathname == "/contractor_work_order" ||
                  (window.location.pathname == "/work_order" && (
                    <span className="boxdes"></span>
                  ))}
              </Link>
              <Link to={"/payment_invoice"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/payment_invoice"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Payment</div>
                </span>
                {window.location.pathname == "/payment_invoice" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              <Link to={"/contractor_profile"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/contractor_profile"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Settings</div>
                </span>
                {window.location.pathname == "/contractor_profile" && (
                  <span className="boxdes"></span>
                )}
              </Link>
            </div>
            <Dropdown className="uddrpdwndiv">
              <div className="bell2">
                <img src={bell} className="bell" alt="bell" />
              </div>
              <span className="lfff">
                {capitalize(user_details?.first_name?.split("")[0])}
                {capitalize(user_details?.last_name?.split("")[0])}
              </span>
              <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn" />
              <Dropdown.Menu className="animated fadeIn">
                <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInLeft"
                >
                  <Link to="/contractor_profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item className="animated fadeInLeft">
                  {/* <img src={settings} className="exit" />{" "} */}
                  <span
                    onClick={() => {
                      props.history.push("/");
                      localStorage.clear();
                    }}
                  >
                    Log out
                  </span>
                  {isloading && <Spinner animation="grow" />}
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1"><Link to="/user-profile">Settings</Link></Dropdown.Item> */}
                <Dropdown.Item
                  href="#/action-2"
                  className="animated fadeInLeft"
                >
                  {/* <img src={exit} className="exit" /> Log out */}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {true && (
          <div className="prrf">
            <Dropdown className="uddrpdwndiv">
              <Dropdown.Menu className="animated fadeIn">
                {/* <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInLeft"
                >
                  <img src={settings} className="exit" />{" "}
                  <Link to="/user-profile">Profile</Link>
                </Dropdown.Item> */}
                <Dropdown.Item className="animated fadeInLeft">
                  {/* <img src={settings} className="exit" />{" "} */}
                  {/* <Link onClick={checkifuserisverifiedbeforemovingtodashboard}>
                    My Account
                  </Link> */}
                  {isloading && <Spinner animation="grow" />}
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1"><Link to="/user-profile">Settings</Link></Dropdown.Item> */}
                <Dropdown.Item
                  href="#/action-2"
                  className="animated fadeInLeft"
                >
                  {/* <img src={exit} className="exit" /> Log out */}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
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
              <span className="navsignup2">Work Offers</span>
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
});

export default DashboardNav;
