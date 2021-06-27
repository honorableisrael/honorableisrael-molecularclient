import React, { useEffect } from "react";
import "./navbar.css";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import logo from "../../images/Molecular.png";
import { Link, withRouter } from "react-router-dom";
// import userimg from "../../assets/avatar.svg";
// import arrowhead from "../../assets/arrowhead.png";
// import settings from "../../assets/settings.png";
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
    if (token.user_type !== "admin") {
      return props.history.push("/login");
    }
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/admin`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res) => {
          console.log(res.data);
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
  return (
    <div className="fixfdnav">
      <div className="navwrap nav__wrap">
        <div className="logoarea">
          <Link to="/">
            <img src={logo} alt="logo" className="logo2" />
          </Link>
        </div>

        {true && (
          <div className="otherwrap">
            <div className="otherwrap23 otherwrap23admin">
              <Link to={"/admin_dashboard"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/admin_dashboard"
                      ? "navlink_is_active lightorange  "
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Dashboard</div>
                </span>
                {window.location.pathname == "/admin_dashboard" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              <Link to={"/admin_work_order"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/admin_work_order"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Work Order</div>
                </span>
                {window.location.pathname == "/admin_work_order" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              <Link to={"/contractor_list"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/contractor_list" ||
                    window.location.pathname == "/contractor_list"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Contractor</div>
                </span>
                {window.location.pathname == "/contractor_list" ||
                  (window.location.pathname == "/contractor_list" && (
                    <span className="boxdes"></span>
                  ))}
              </Link>
              <Link to={"/allspecialist"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/allspecialist"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Specialist</div>
                </span>
                {window.location.pathname == "/allspecialist" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              <Link to={"/admin_payment_invoice"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/admin_payment_invoice"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Payment</div>
                </span>
                {window.location.pathname == "/admin_payment_invoice" && (
                  <span className="boxdes"></span>
                )}
              </Link>
              {/* <Link to={"/admin/settings"} className="flex-12a">
                {" "}
                <span
                  className={
                    window.location.pathname == "/admin/settings"
                      ? "navlink_is_active lightorange"
                      : "navlink_is_active1"
                  }
                >
                  <div className="speialcl">Settings</div>
                </span>
                {window.location.pathname == "/admin/settings" && (
                  <span className="boxdes"></span>
                )}
              </Link> */}
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
                  <Link to="/user-profile">Profile</Link>
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
        {false && (
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
          {/* <div className="siggnup1 animated slideInRight">
            {" "}
            <Link to="/contact">
              <span className="navsignup2">Settings</span>
            </Link>
          </div> */}
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
