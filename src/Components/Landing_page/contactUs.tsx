import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Widgets/navigation";
import "./home.css";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import facebook from "../../images/facebook_white.png";
import twitter from "../../images/twitter_white.png";
import instagram from "../../images/instagram_white.png";
import mail from "../../images/mail_2.png";
import phone from "../../images/phone.png";
import address from "../../images/address.png";
import jointcircle from "../../images/jointcircle.png";
import axios from "axios";
import { returnAdminToken, API, notify, reloadPage } from "../../config";
import { ToastContainer } from "react-toastify";

const ContacUs = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    isloading: false,
  });
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  const { name, email, message, isloading } = state;

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const SendData = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([axios.post(`${API}/contact`, data)])
      .then(
        axios.spread((res) => {
          notify("Successful");
          // reloadPage();
          
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
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.errors);
        }
        
      });
  };
  return (
    <div>
      <NavBar />
      <div className='toppagepadding'></div>
      <div></div>
      <Container fluid>
        <Row className='cntctpgrow'>
          <Col md={6}>
            <div className='contact_jointcircle'>
              <img src={jointcircle} alt='img' />
            </div>
            <div className='contact_form-wrap'>
              <form className='contact_form'>
                <h2>Contact US</h2>
                <p>
                  Feel free to contact anytime, we’ll get back to you as soon as
                  possible.
                </p>
                <label>
                  Name
                  <input
                    type='text'
                    id={"name"}
                    onChange={onchange}
                    className='form-control cntinput'
                  />
                </label>
                <label>
                  Email
                  <input
                    type='text'
                    id={"email"}
                    onChange={onchange}
                    className='form-control cntinput'
                  />
                </label>
                <label>
                  Message
                  <textarea
                    id={"message"}
                    onChange={onchange}
                    className='form-control cntinput txtarea'></textarea>
                </label>
                <span className='formbtn' onClick={SendData}>
                  {isloading ? "Processing" : "Submit"}
                </span>
              </form>
            </div>
          </Col>
          <Col md={6} className='contactpgcol2'>
            <div className='cntctpg_socialicons'>
              <span className='cntactpg_logos'>
                <img src={facebook} className='img-fluid' />
              </span>
              <span className='cntactpg_logos'>
                <img src={twitter} className='img-fluid' />
              </span>
              <span className='cntactpg_logos'>
                <img src={instagram} className='img-fluid' />
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={6} className='infowrapcol'>
            <div className='infowrap'>
              <h2 className='info'>Info</h2>
              <ul className='section-3-list'>
                <li className='listflex'>
                  <span className='list_bullet'>
                    <img src={mail} />
                  </span>
                  <span>
                    <a
                      className={"text-white"}
                      href='mailto:Aoderinde@molecularpro.co'>
                      Aoderinde@molecularpro.co
                    </a>{" "}
                  </span>
                </li>
                <li className='listflex'>
                  <span className='list_bullet'>
                    <img src={phone} />
                  </span>
                  <a href='tel:08134045999' className={"text-white"}>
                    08134045999
                  </a>
                </li>
                <li className='listflex'>
                  <span className='list_bullet'>
                    <img src={address} />
                  </span>
                  <span>
                    MolecularPro Technical Services Limited The Eagless Nest, 1st
                    Floor,24 Adewunmi Adebimpe Drive, 2nd round about, Marwa,
                    Lekki Phase 1, Lagos.
                  </span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </div>
  );
};
export default ContacUs;
