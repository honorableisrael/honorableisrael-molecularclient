import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Widgets/navigation";
import "./home.css";
import PartnerSection from "./partenerSection";
import yellowline from "../../images/yellowline.png";
import oilengineers from "../../images/oilengineers.jpg";
import star from "../../images/star.png";
import target from "../../images/target.png";
import meter from "../../images/meter.png";
import greencheck from "../../images/greencheck.png";
import compass from "../../images/compass.svg";
import compass1 from "../../images/Circle-icons-briefcase.png";
import compass2 from "../../images/service.png";
import smile from "../../images/images.jpeg";
import lead from "../../images/leadengineers.jpg";
import plumber from "../../images/plumber.png";
import fire from "../../images/fire.png";
import tap from "../../images/tap.png";
import handyman from "../../images/handyman.png";
import Footer from "./footer";
import Work from "./workandbuild";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBarRedesign from "../Widgets/navigationv2";
import "./home_v2.css";
import BRENTEX from "../../assets/BRENTEX PETROLEUM SERVICES LIMITED logo.svg";
import Jenoil from "../../assets/Jenoil Integrated logo.svg";
import logo_dark_2x from "../../assets/1.png";
import MELCURT from "../../assets/MELCURT logo.svg";
import MORPOL from "../../assets/MORPOL ENGINEERING SERVICES LTD logo.svg";
import SELLYFAK from "../../assets/3.png";
import Mobileandweb from "../../assets/Mobileandweb.png";
import homefirstimage1 from "../../assets/slide1.png";
import homefirstimage from "../../assets/slide2.png";
import traverse from "../../assets/4.png";
import twab from "../../assets/2.png";
import OrangeButton from "../Shared/Button";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";
import Faq from "./faq";
import GreenButton from "../Shared/Button2";

function CustomToggle({ children, eventKey, handleClick }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    handleClick();
  });

  return (
    <div className='card-header' onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const Homev2 = () => {
  const [index, setIndex] = React.useState(0);
  const [slide1, setSlider] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);
  const ControlSlider = () => {
    setSlider(slide1 ? false : true);
  };
  React.useEffect(() => {
    const Slider = setInterval(() => {
      setSlider(true);
      const BarTimeout = setTimeout(() => {
        setSlider(false);
      }, 5000);
      return () => {
        clearTimeout(BarTimeout);
      };
    }, 10000);
    return () => {
      clearInterval(Slider);
    };
  }, []);
  // useEffect(()=>{
  //   setInterval(()=>{
  //     if (current.length >30){
  //       setState({
  //         ...state,
  //         current: `Let's ${" "}  do ${" "}  the ${" "}  hard ${" "}  work`
  //       })
  //     }

  //     if (current.length <30){
  //       setState({
  //         ...state,
  //         current: `Let's ${" "}  do ${" "}  the ${" "}  hard  ${" "} work`
  //       })
  //     }
  //   },4000)
  // })
  const Controller = ({ bg = "", green__border = "" }) => {
    return (
      <div className='slide_controller  text-center'>
        {slide1 ? (
          <>
            <span
              className={`outercircle ${green__border}`}
              onClick={ControlSlider}>
              <span className={`innercircle ${bg}`}></span>
            </span>
            <span className={`inactivecircle`} onClick={ControlSlider}></span>
          </>
        ) : (
          <>
            <span
              className={`inactivecircle mr-2`}
              onClick={ControlSlider}></span>
            <span
              className={`outercircle ${green__border}`}
              onClick={ControlSlider}>
              <span className={`innercircle ${bg}`}></span>
            </span>
          </>
        )}
      </div>
    );
  };
  const Slide1 = () => {
    return (
      <div className='row general-padding section_slide_image'>
        <div className='col-md-12'>
          <div className='row mobflexreverse'>
            <div className='col-md-6 home_v2'>
              <div className='hidden-large-devices'>
                <Controller />
              </div>
              <div className='homedesign2'>
                We <b> Deploy & Manage</b> technical specialists for your
                natural gas projects.
              </div>
              <div className='homedesign3 dark__text'>
                Powered by artificial intelligence and big data, we deploy fully
                kitted and certified natural gas technical specialists to your
                project site and manage their activities for quality assurance.
              </div>

              <div className='text-white'>
                <Link to='/contractor_signup'>
                  <OrangeButton title={"Get Started"} />
                </Link>
              </div>
            </div>
            <div className='col-md-6 m-auto'>
              <img src={homefirstimage1} className='homefirstimage' alt='' />
            </div>
          </div>
          <div className='slide_controller_hidden'>
            <Controller />
          </div>
        </div>
      </div>
    );
  };
  const Slide2 = () => {
    return (
      <div className='row general-padding section_slide_image section_slide_image1'>
        <div className='col-md-12'>
          <div className='row mobflexreverse'>
            <div className='col-md-6 home_v2'>
              <div className='hidden-large-devices'>
                <Controller bg='greenb__bg' green__border='green__border' />
              </div>
              <div className='homedesign2'>
                Experience <b> Better pay & Better working</b> conditions with
                MolecularPro
              </div>
              <div className='homedesign3 textgreen'>
                Working as a natural gas technical specialist is 100% better
                with MolecularPro. Get great pay, medical insurance, advance
                payments and so much more. 
              </div>
              <div className='text-white'>
                <Link to='/specialist_signup'>
                  <GreenButton title={"Sign Up"} />
                </Link>
              </div>
            </div>
            <div className='col-md-6 m-auto'>
              <img src={homefirstimage} className='homefirstimage' alt='' />
            </div>
          </div>
          <div className='slide_controller_hidden '>
            <Controller bg='greenb__bg' green__border='green__border' />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div id='home'></div>
      <NavBarRedesign />
      {slide1 ? <Slide1 /> : <Slide2 />}
      <div className='row'>
        <div className='col-md-12 partnersv2 general-padding'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h6 className='partners_title'>Trusted by Industry Leaders</h6>
              <div className='partners_caption'>
                Nigeria's leading engineering and construction firms trust
                MolecularPro to recruit, deploy and manage skilled and fully
                kitted natural gas technical specialists for their projects
              </div>
            </div>
            <div className='col-md-4'>
              <div className='pb-1 flexend_v2'>
                {/* <div className='flexitem_2'>
                  <img src={BRENTEX} className='' alt='PARTNER' />
                </div> */}
                {/* <div className='flexitem_2'>
                  <img src={Jenoil} className='' alt='PARTNER' />
                </div> */}
                <div className='flexitem_2'>
                  <img src={logo_dark_2x} className='' alt='PARTNER' />
                </div>
                <div className='flexitem_2'>
                  <img src={traverse} className='' alt='PARTNER' />
                </div>
              </div>
              <div className='mt-4 flexend_v2'>
                {/* <div className='flexitem_2'>
                  <img src={MELCURT} className='' alt='PARTNER' />
                </div>
                <div className='flexitem_2'>
                  <img src={MORPOL} className='' alt='PARTNER' />
                </div> */}
                <div className='flexitem_2'>
                  <img src={SELLYFAK} className='' alt='PARTNER' />
                </div>
                <div className='flexitem_2'>
                  <img src={twab} className='' alt='PARTNER' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='generalspacing row general-padding'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6'>
              <h2 className='contentheader_v1'>How it works</h2>
              <div className='howitworkscontent'>
                Get your workflow set up in just 3 easy steps.
              </div>
              <h5 className='contentheader_v2'>
                {" "}
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M4.57813 6.7896V27.8896C4.57813 29.8796 6.19813 31.4996 8.18813 31.4996H23.8081C25.7981 31.4996 27.4181 29.8796 27.4181 27.8896V6.7896C27.4181 4.7996 25.7981 3.1796 23.8081 3.1796H23.6881C23.7481 3.4796 23.7781 3.7896 23.7781 4.1096V5.2496C23.8081 7.7376 21.7181 9.8726 19.1681 9.8596H12.8281C10.6081 9.8596 8.73813 8.2796 8.30813 6.1796C8.16775 5.18453 8.16775 4.17468 8.30813 3.1796C6.27813 3.1146 4.57413 4.7546 4.57813 6.7896ZM21.2781 24.7796H10.7181C8.75313 24.7436 8.74513 21.8236 10.7181 21.7796H21.2781C23.2451 21.8226 23.2491 24.7426 21.2781 24.7796ZM21.2781 19.4796H10.7181C8.75113 19.4366 8.74713 16.5166 10.7181 16.4796H21.2781C23.2431 16.5156 23.2511 19.4356 21.2781 19.4796ZM10.7181 11.1696H21.2781C23.2451 11.2056 23.2511 14.1326 21.2781 14.1696H10.7181C8.75113 14.1336 8.74513 11.2066 10.7181 11.1696Z'
                    fill='#FD8C00'
                  />
                  <path
                    d='M19.1717 0.500044H12.8317C11.1617 0.500044 9.76172 1.64004 9.34172 3.18004C9.15572 3.71604 9.24172 4.68004 9.22172 5.25004C9.20672 7.19304 10.8317 8.87004 12.8317 8.86004H19.1717C20.8417 8.86004 22.2417 7.72004 22.6617 6.18004C22.8477 5.64404 22.7617 4.68004 22.7817 4.11004C22.7967 2.16704 21.1717 0.490044 19.1717 0.500044ZM19.7817 5.25004C19.7817 5.59004 19.5017 5.86004 19.1717 5.86004H12.8317C11.9617 5.84304 12.2747 4.65204 12.2217 4.11004C12.2217 3.77004 12.5017 3.50004 12.8317 3.50004H19.1717C20.0417 3.51704 19.7287 4.70804 19.7817 5.25004Z'
                    fill='#FD8C00'
                  />
                </svg>
                <span className='pl-2'> Raise a Work Order</span>
              </h5>
              <div className='howitworkscontent'>
                Fill in your project details (pipeline configuration, estimate
                of technical specialists required and the relevant skill set
                needed)
              </div>
              <h5 className='contentheader_v2'>
                {" "}
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M22.0013 13.667C19.7916 13.6684 17.6728 14.5468 16.1103 16.1093C14.5478 17.6718 13.6694 19.7906 13.668 22.0003C13.6694 24.21 14.5478 26.3288 16.1103 27.8913C17.6728 29.4538 19.7916 30.3322 22.0013 30.3337C24.211 30.3322 26.3298 29.4538 27.8923 27.8913C29.4548 26.3288 30.3332 24.21 30.3346 22.0003C30.3332 19.7906 29.4548 17.6718 27.8923 16.1093C26.3298 14.5468 24.211 13.6684 22.0013 13.667ZM18.0346 22.3003L20.48 24.7443C20.5727 24.8372 20.6829 24.9109 20.8041 24.9612C20.9254 25.0115 21.0554 25.0373 21.1866 25.0373C21.3179 25.0373 21.4479 25.0115 21.5691 24.9612C21.6904 24.9109 21.8005 24.8372 21.8933 24.7443L25.968 20.671C26.0609 20.5781 26.1345 20.4678 26.1848 20.3465C26.2351 20.2251 26.261 20.095 26.261 19.9637C26.261 19.8323 26.2351 19.7022 26.1848 19.5809C26.1345 19.4595 26.0609 19.3492 25.968 19.2563C25.8751 19.1634 25.7648 19.0898 25.6434 19.0395C25.5221 18.9892 25.392 18.9633 25.2606 18.9633C25.1293 18.9633 24.9992 18.9892 24.8778 19.0395C24.7565 19.0898 24.6462 19.1634 24.5533 19.2563L21.1866 22.623L19.4493 20.8857C19.3564 20.7928 19.2461 20.7191 19.1248 20.6688C19.0034 20.6185 18.8733 20.5927 18.742 20.5927C18.6106 20.5927 18.4805 20.6185 18.3592 20.6688C18.2378 20.7191 18.1275 20.7928 18.0346 20.8857C17.9417 20.9785 17.8681 21.0888 17.8178 21.2102C17.7675 21.3316 17.7416 21.4616 17.7416 21.593C17.7416 21.7244 17.7675 21.8544 17.8178 21.9758C17.8681 22.0972 17.9417 22.2074 18.0346 22.3003Z'
                    fill='#FD8C00'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M1.66797 10.3337V24.0003C1.66797 24.9723 2.05464 25.9057 2.7413 26.5937C3.4296 27.2806 4.3622 27.6666 5.33464 27.667H14.1706C12.9748 26.0198 12.332 24.0358 12.3346 22.0003C12.3347 19.8789 13.0326 17.8164 14.3208 16.1308C15.609 14.4453 17.4159 13.2303 19.4629 12.6732C21.5098 12.1161 23.6832 12.2479 25.6479 13.0482C27.6126 13.8485 29.2595 15.2728 30.3346 17.1017V10.3337H1.66797ZM1.66797 8.33366H30.3346V5.33366C30.3346 4.36166 29.948 3.42833 29.2613 2.74033C28.573 2.05339 27.6404 1.6674 26.668 1.66699H5.33464C4.36264 1.66699 3.4293 2.05366 2.7413 2.74033C2.05436 3.42862 1.66838 4.36122 1.66797 5.33366V8.33366ZM6.66797 7.00033H8.0013C8.26652 7.00033 8.52087 6.89497 8.70841 6.70743C8.89595 6.5199 9.0013 6.26554 9.0013 6.00033C9.0013 5.73511 8.89595 5.48076 8.70841 5.29322C8.52087 5.10568 8.26652 5.00033 8.0013 5.00033H6.66797C6.40275 5.00033 6.1484 5.10568 5.96086 5.29322C5.77333 5.48076 5.66797 5.73511 5.66797 6.00033C5.66797 6.26554 5.77333 6.5199 5.96086 6.70743C6.1484 6.89497 6.40275 7.00033 6.66797 7.00033ZM11.3346 7.00033H12.668C12.9332 7.00033 13.1875 6.89497 13.3751 6.70743C13.5626 6.5199 13.668 6.26554 13.668 6.00033C13.668 5.73511 13.5626 5.48076 13.3751 5.29322C13.1875 5.10568 12.9332 5.00033 12.668 5.00033H11.3346C11.0694 5.00033 10.8151 5.10568 10.6275 5.29322C10.44 5.48076 10.3346 5.73511 10.3346 6.00033C10.3346 6.26554 10.44 6.5199 10.6275 6.70743C10.8151 6.89497 11.0694 7.00033 11.3346 7.00033Z'
                    fill='#FD8C00'
                  />
                </svg>
                <span className='pl-2'> Acceptance & Review</span>
              </h5>
              <div className='howitworkscontent'>
                Your details are reviewed and a proforma invoice is sent based
                on the pipeline configuration provided. After you agree with the
                terms, you will be sent a service-level agreement to formalise
                the relationship
              </div>
              <h5 className='contentheader_v2'>
                {" "}
                <svg
                  width='24'
                  height='35'
                  viewBox='0 0 24 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6.89331 26.2545C6.71662 25.3088 6.38954 24.3975 5.92451 23.5552C5.28921 22.4441 4.56998 21.3831 3.77309 20.3816L4.16729 20.0809L4.2007 20.0608L3.77309 20.3816C1.98915 18.003 0.125028 15.5242 0.125028 11.7024C0.120042 9.42482 0.792715 7.19725 2.05746 5.30311C3.3222 3.40897 5.12184 1.93389 7.22738 1.06556C8.62296 0.485893 10.1193 0.1875 11.6304 0.1875C13.1416 0.1875 14.6379 0.485893 16.0335 1.06556C18.1361 1.93879 19.9332 3.41486 21.1983 5.30775C22.4634 7.20064 23.1399 9.42565 23.1425 11.7024C23.1425 15.5041 21.2985 17.9762 19.5212 20.3415C17.751 21.8346 16.624 23.9522 16.3743 26.2545C16.1873 26.1082 15.9569 26.0283 15.7195 26.0274H13.528C13.6683 24.3236 14.1694 20.9094 16.0135 18.3571C16.0751 18.2854 16.1166 18.1987 16.1338 18.1058C16.151 18.0128 16.1433 17.917 16.1114 17.828C16.0794 17.739 16.0245 17.6601 15.9521 17.5993C15.8798 17.5385 15.7926 17.4979 15.6994 17.4818C14.4481 17.3165 13.1865 17.2361 11.9244 17.2547C10.5414 17.2547 9.14495 17.3215 8.24296 17.4685C8.14882 17.4773 8.0587 17.511 7.98181 17.566C7.90493 17.621 7.84402 17.6955 7.8053 17.7818C7.76658 17.868 7.75144 17.963 7.76142 18.0571C7.7714 18.1511 7.80615 18.2408 7.86212 18.317C9.73292 20.876 10.234 24.3169 10.3743 26.0274H7.54141C7.30398 26.0283 7.07361 26.1082 6.88663 26.2545H6.89331ZM11.45 26.0274C11.3164 24.3837 10.8621 21.1098 9.22513 18.4239C10.0002 18.3571 10.9623 18.3237 11.9311 18.3237C12.9333 18.3237 13.9155 18.3571 14.6972 18.4239C13.0603 21.1165 12.5992 24.3837 12.4723 26.0274H11.45Z'
                    fill='#FD8C00'
                  />
                  <path
                    d='M7.54623 26.5625H15.7243C15.8661 26.5625 16.002 26.6188 16.1023 26.7191C16.2025 26.8193 16.2588 26.9553 16.2588 27.097V31.8876C16.2562 32.0246 16.217 32.1584 16.1452 32.2751C16.0835 32.3764 15.9958 32.4594 15.8913 32.5156C15.7993 32.5669 15.696 32.5945 15.5907 32.5958H7.67986C7.51176 32.5952 7.35076 32.5279 7.23221 32.4087C7.20773 32.3863 7.18536 32.3617 7.16539 32.3352C7.14291 32.3104 7.12278 32.2836 7.10526 32.2551H7.11194C7.04682 32.1435 7.01225 32.0168 7.01172 31.8876V27.097C7.01172 26.9553 7.06803 26.8193 7.16827 26.7191C7.26852 26.6188 7.40447 26.5625 7.54623 26.5625ZM8.89588 33.3308C8.75412 33.3308 8.61816 33.3871 8.51792 33.4873C8.41768 33.5876 8.36137 33.7235 8.36137 33.8653C8.36137 34.0071 8.41768 34.143 8.51792 34.2433C8.61816 34.3435 8.75412 34.3998 8.89588 34.3998H14.3746C14.5164 34.3998 14.6524 34.3435 14.7526 34.2433C14.8528 34.143 14.9092 34.0071 14.9092 33.8653C14.9092 33.7235 14.8528 33.5876 14.7526 33.4873C14.6524 33.3871 14.5164 33.3308 14.3746 33.3308H8.89588Z'
                    fill='#FD8C00'
                  />
                </svg>
                <span className='pl-2'> Deployment</span>
              </h5>
              <div className='howitworkscontent'>
                MolecularPro deploys vetted natural gas technical specialists
                based on the project information provided 
              </div>
            </div>
            <div className='col-md-6 flx_image'>
              <img
                src={Mobileandweb}
                className='Mobileandweb'
                alt='Mobileandweb'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row' id='contractorlanding'>
        <div className='col-md-12 partnersv2 general-padding generalspacing'>
          <div className='row'>
            <div className='col-md-4 m-auto'>
              <div className='contractors_header_v2'>EPC Contractors</div>
              <div className='pb-5 pt-3'>
                MolecularPro solves your technical recruitment needs so you can
                focus on business growth.
              </div>
              <div className=''>
                <Link to='/contractor_signup'>
                  <OrangeButton title='Get Started' />
                </Link>
              </div>
            </div>
            <div className='col-md-7'>
              <div className='row pb-5 paddingbottom1 justify-between'>
                <div className='col-md-5'>
                  <h5 className='contentheader_v2'>
                    {" "}
                    <svg
                      width='45'
                      height='45'
                      viewBox='0 0 45 45'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <rect width='45' height='45' rx='7' fill='white' />
                      <g clip-path='url(#clip0_3697_6673)'>
                        <path
                          d='M22.0371 9C14.2957 9 8 15.21 8 22.8462C8 30.484 14.2957 36.6923 22.0371 36.6923C29.7786 36.6923 36.0743 30.484 36.0743 22.8462C36.0743 15.21 29.7786 9 22.0371 9Z'
                          fill='#FD8C00'
                        />
                        <path
                          d='M15.0136 24.5771C15.0134 25.7927 15.3375 26.9868 15.9536 28.0395C16.5696 29.0923 17.4557 29.9664 18.5229 30.5742C19.5899 31.1818 20.8002 31.5017 22.0322 31.5017C23.2642 31.5017 24.4745 31.1818 25.5415 30.5742C26.6084 29.9666 27.4944 29.0928 28.1104 28.0404C28.7264 26.988 29.0507 25.7941 29.0508 24.5788'
                          fill='white'
                        />
                        <path
                          d='M17.6453 21.1168C18.6143 21.1168 19.3999 20.3419 19.3999 19.386C19.3999 18.4302 18.6143 17.6553 17.6453 17.6553C16.6762 17.6553 15.8906 18.4302 15.8906 19.386C15.8906 20.3419 16.6762 21.1168 17.6453 21.1168Z'
                          fill='white'
                        />
                        <path
                          d='M26.4226 21.1168C27.3917 21.1168 28.1773 20.3419 28.1773 19.386C28.1773 18.4302 27.3917 17.6553 26.4226 17.6553C25.4535 17.6553 24.668 18.4302 24.668 19.386C24.668 20.3419 25.4535 21.1168 26.4226 21.1168Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_3697_6673'>
                          <rect
                            width='28.0743'
                            height='27.6923'
                            fill='white'
                            transform='translate(8 9)'
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className='pl-2 sub_header_v2'> Zero Stress</span>
                  </h5>
                  <div className=''>
                    We eliminate the stress of physical recruitment. Now you can
                    get the technical workforce you deserve from the comfort of
                    your phone or laptop.
                  </div>
                </div>
                <div className='col-md-5'>
                  <h5 className='contentheader_v2 '>
                    {" "}
                    <svg
                      width='45'
                      height='45'
                      viewBox='0 0 45 45'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <rect width='45' height='45' rx='7' fill='white' />
                      <path
                        d='M16.0797 30.258C16.1335 30.2048 16.1764 30.1411 16.2059 30.0707C16.2354 30.0003 16.251 29.9246 16.2516 29.848C16.2523 29.7714 16.238 29.6954 16.2097 29.6245C16.1814 29.5536 16.1395 29.4892 16.0866 29.435C16.0337 29.3809 15.9708 29.338 15.9016 29.309C15.8324 29.28 15.7582 29.2654 15.6834 29.2661C15.6086 29.2667 15.5346 29.2827 15.4659 29.3129C15.3971 29.3431 15.335 29.3871 15.283 29.4422L13.3928 31.3779C13.3403 31.4313 13.2986 31.4949 13.2702 31.5649C13.2418 31.6349 13.2271 31.71 13.2271 31.7858C13.2271 31.8616 13.2418 31.9367 13.2702 32.0067C13.2986 32.0767 13.3403 32.1403 13.3928 32.1937C13.4451 32.2474 13.5072 32.2899 13.5756 32.3189C13.644 32.348 13.7173 32.3629 13.7914 32.3629C13.8654 32.3629 13.9387 32.348 14.0071 32.3189C14.0755 32.2899 14.1377 32.2474 14.19 32.1937L16.0797 30.258ZM13.1359 29.2535C13.1897 29.2003 13.2326 29.1366 13.2621 29.0663C13.2917 28.9959 13.3072 28.9202 13.3078 28.8435C13.3085 28.7669 13.2942 28.691 13.2659 28.6201C13.2376 28.5492 13.1957 28.4847 13.1428 28.4306C13.09 28.3764 13.027 28.3335 12.9578 28.3045C12.8886 28.2755 12.8144 28.2609 12.7396 28.2616C12.6648 28.2623 12.5908 28.2782 12.5221 28.3084C12.4534 28.3387 12.3912 28.3826 12.3392 28.4377L10.4496 30.3734C10.3971 30.4269 10.3554 30.4904 10.327 30.5604C10.2985 30.6304 10.2839 30.7055 10.2839 30.7813C10.2839 30.8571 10.2985 30.9322 10.327 31.0022C10.3554 31.0722 10.3971 31.1358 10.4496 31.1892C10.5552 31.2974 10.6985 31.3581 10.8479 31.3581C10.9973 31.3581 11.1406 31.2974 11.2462 31.1892L13.1359 29.2535ZM17.0605 33.2726C17.1144 33.2194 17.1573 33.1557 17.1868 33.0853C17.2163 33.0149 17.2319 32.9392 17.2325 32.8626C17.2332 32.786 17.2189 32.7101 17.1906 32.6391C17.1623 32.5682 17.1204 32.5038 17.0675 32.4496C17.0146 32.3955 16.9517 32.3526 16.8825 32.3236C16.8132 32.2946 16.7391 32.28 16.6642 32.2807C16.5894 32.2813 16.5155 32.2973 16.4468 32.3275C16.378 32.3577 16.3159 32.4017 16.2639 32.4568L14.3742 34.3919C14.3217 34.4454 14.2801 34.5089 14.2516 34.5789C14.2232 34.6489 14.2086 34.724 14.2086 34.7998C14.2086 34.8756 14.2232 34.9507 14.2516 35.0207C14.2801 35.0907 14.3217 35.1543 14.3742 35.2077C14.4799 35.3159 14.6232 35.3767 14.7726 35.3767C14.922 35.3767 15.0652 35.3159 15.1709 35.2077L17.0605 33.2726ZM22.4298 36.619C27.5962 33.6649 28.6836 30.6475 28.6836 28.6396C28.6836 28.2686 28.6463 27.8985 28.572 27.5353C26.7237 29.0097 24.6585 30.1741 22.4535 30.985C22.6309 31.3485 22.7228 31.7725 22.7228 32.2687C22.7228 33.9707 21.6805 35.8055 21.6692 35.8228C21.5396 36.0478 21.5734 36.3305 21.7481 36.5209C21.9284 36.7055 22.2044 36.7459 22.4298 36.619ZM14.1815 22.7547C14.3169 22.7951 14.4482 22.8487 14.5737 22.9145C15.3652 20.6573 16.5016 18.5432 17.9406 16.651C17.1791 16.49 16.3926 16.4998 15.6351 16.6799C13.2407 17.2395 11.0321 19.3454 9.07146 22.9399C9.02076 23.0322 8.99822 23.1245 8.99822 23.2226C8.99822 23.3726 9.06019 23.5226 9.16724 23.638C9.35316 23.8169 9.62923 23.8515 9.84896 23.7188C10.5419 23.2976 12.666 22.3047 14.1815 22.7547Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M20.3764 30.4398C29.5993 27.9242 36.0391 19.3391 36.0391 9.57696C36.0391 9.25963 35.7855 9 35.4757 9C25.9428 9 17.5594 15.5946 15.1029 25.0394C15.0752 25.1366 15.0743 25.2397 15.1001 25.3375C15.126 25.4352 15.1776 25.5237 15.2494 25.5933L19.8355 30.2897C19.9764 30.4398 20.1848 30.4974 20.3764 30.4398ZM25.1315 20.1699C24.8667 19.9011 24.6567 19.5811 24.5135 19.2285C24.3704 18.8759 24.297 18.4978 24.2977 18.1159C24.2977 17.3428 24.5963 16.6101 25.1315 16.062C25.6643 15.5188 26.3855 15.2139 27.1373 15.2139C27.889 15.2139 28.6102 15.5188 29.143 16.062C29.6782 16.6101 29.9712 17.3428 29.9712 18.1159C29.9712 18.8948 29.6782 19.6218 29.143 20.1699C28.8798 20.4401 28.5672 20.6545 28.223 20.8007C27.8789 20.947 27.5099 21.0223 27.1373 21.0223C26.7646 21.0223 26.3957 20.947 26.0515 20.8007C25.7073 20.6545 25.3947 20.4401 25.1315 20.1699Z'
                        fill='#FD8C00'
                      />
                    </svg>
                    <span className='pl-2 sub_header_v2 '> Speed</span>
                  </h5>
                  <div className=''>
                    Fully kitted, certified and experienced natural gas
                    technical specialists can be deployed in 24-48 hours
                    ensuring your project can be delivered under agreed
                    timelines.
                  </div>
                </div>
              </div>
              <div className='row justify-between'>
                <div className='col-md-5'>
                  <h5 className='contentheader_v2'>
                    {" "}
                    <svg
                      width='45'
                      height='45'
                      viewBox='0 0 45 45'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <rect width='45' height='45' rx='7' fill='white' />
                      <path
                        d='M30.2951 18.6923H18.4212V15.9231C18.4212 14.8154 18.8664 13.8462 19.757 13.0154C21.5381 11.3538 24.3581 11.3538 25.9908 13.0154C26.5845 13.5692 26.8813 14.2615 27.1782 14.9538C27.3266 15.6462 28.2171 16.0615 28.9592 15.9231C29.7014 15.7846 30.2951 14.9538 29.9982 14.2615C29.7014 13.0154 28.9592 11.9077 28.0687 11.0769C26.7329 9.69231 24.8034 9 22.8739 9C18.718 9 15.4527 12.0462 15.4527 15.9231V18.6923C12.9295 18.6923 11 20.4923 11 22.8462V32.5385C11 34.8923 12.9295 36.6923 15.4527 36.6923H30.2951C32.8183 36.6923 34.7478 34.8923 34.7478 32.5385V22.8462C34.7478 20.4923 32.8183 18.6923 30.2951 18.6923ZM24.5065 27.6923L24.3581 27.8308V29.7692C24.3581 30.6 23.7644 31.1538 22.8739 31.1538C21.9833 31.1538 21.3896 30.6 21.3896 29.7692V27.8308C20.4991 27 20.3507 25.7538 21.2412 24.9231C22.1318 24.0923 23.4676 23.9538 24.3581 24.7846C25.2487 25.4769 25.3971 26.8615 24.5065 27.6923Z'
                        fill='#FD8C00'
                      />
                    </svg>
                    <span className='pl-2 sub_header_v2 '> Access</span>
                  </h5>
                  <div className=''>
                    We are home to a constantly growing list of natural gas
                    technical pipeline specialists across various niche
                    capabilities including pipeline welding, fitting HDD,
                    drilling, and steering specialists. This allows you to
                    access the talent you require across several roles and
                    functions.
                  </div>
                </div>
                <div className='col-md-5 pr-3'>
                  <h5 className='contentheader_v2'>
                    {" "}
                    <svg
                      width='45'
                      height='45'
                      viewBox='0 0 45 45'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <rect width='45' height='45' rx='7' fill='white' />
                      <path
                        d='M17.4721 13.9314H24.5248V12.1581H17.4721V13.9314ZM33.3407 22.7979V29.4478C33.3407 30.0574 33.1249 30.5792 32.6933 31.0133C32.2617 31.4474 31.7428 31.6645 31.1367 31.6645H10.8602C10.2541 31.6645 9.73528 31.4474 9.30367 31.0133C8.87206 30.5792 8.65625 30.0574 8.65625 29.4478V22.7979H17.9129V25.0146C17.9129 25.2547 18.0002 25.4625 18.1746 25.638C18.3491 25.8135 18.5557 25.9012 18.7945 25.9012H23.2024C23.4412 25.9012 23.6478 25.8135 23.8223 25.638C23.9968 25.4625 24.084 25.2547 24.084 25.0146V22.7979H33.3407ZM22.7616 22.7979V24.5712H19.2353V22.7979H22.7616ZM33.3407 16.148V21.4679H8.65625V16.148C8.65625 15.5384 8.87206 15.0166 9.30367 14.5825C9.73528 14.1484 10.2541 13.9314 10.8602 13.9314H15.7089V11.7147C15.7089 11.3453 15.8375 11.0313 16.0946 10.7727C16.3518 10.5141 16.664 10.3848 17.0313 10.3848H24.9656C25.3329 10.3848 25.6452 10.5141 25.9023 10.7727C26.1594 11.0313 26.288 11.3453 26.288 11.7147V13.9314H31.1367C31.7428 13.9314 32.2617 14.1484 32.6933 14.5825C33.1249 15.0166 33.3407 15.5384 33.3407 16.148Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M21.8758 25.4917C22.2438 24.3765 22.8501 23.3529 23.6501 22.4854C23.7854 22.3387 23.9976 22.2864 24.1877 22.353L26.0995 23.0227C26.6178 23.2042 27.1882 22.9396 27.3734 22.4318C27.3916 22.3819 27.4056 22.3306 27.4153 22.2785L27.7796 20.3199C27.8158 20.1252 27.9684 19.9712 28.1661 19.9299C28.7443 19.8094 29.3372 19.748 29.9378 19.748C30.5381 19.748 31.1306 19.8093 31.7086 19.9297C31.9061 19.9709 32.0588 20.1248 32.0951 20.3195L32.4603 22.2784C32.5591 22.8089 33.078 23.1605 33.6196 23.0638C33.6729 23.0543 33.7252 23.0405 33.7761 23.0227L35.688 22.353C35.878 22.2864 36.0902 22.3387 36.2255 22.4854C37.0256 23.3529 37.6318 24.3765 38 25.4917C38.062 25.6798 38.0021 25.886 37.8483 26.014L36.2986 27.3029C35.8791 27.6519 35.8278 28.2681 36.184 28.6791C36.219 28.7195 36.2574 28.7571 36.2986 28.7914L37.8483 30.0803C38.0021 30.2082 38.062 30.4145 38 30.6026C37.6318 31.7178 37.0256 32.7414 36.2255 33.6088C36.0902 33.7555 35.878 33.8078 35.688 33.7412L33.7761 33.0715C33.2579 32.8901 32.6875 33.1547 32.5023 33.6624C32.4841 33.7123 32.47 33.7636 32.4603 33.8159L32.0951 35.7748C32.0588 35.9694 31.9061 36.1233 31.7086 36.1645C31.1306 36.2849 30.5381 36.3462 29.9378 36.3462C29.3372 36.3462 28.7443 36.2849 28.1661 36.1643C27.9684 36.123 27.8158 35.969 27.7796 35.7744L27.4153 33.8158C27.3166 33.2853 26.7976 32.9337 26.2561 33.0305C26.2028 33.04 26.1505 33.0537 26.0996 33.0715L24.1877 33.7412C23.9976 33.8078 23.7854 33.7555 23.6501 33.6088C22.8501 32.7414 22.2438 31.7178 21.8758 30.6026C21.8137 30.4145 21.8735 30.2082 22.0274 30.0803L23.577 28.7914C23.9966 28.4423 24.0479 27.8262 23.6916 27.4152C23.6566 27.3747 23.6183 27.3372 23.577 27.3029L22.0274 26.014C21.8735 25.886 21.8137 25.6798 21.8758 25.4917ZM27.4766 28.047C27.4766 29.3843 28.5785 30.4684 29.9377 30.4684C31.2969 30.4684 32.3987 29.3843 32.3987 28.047C32.3987 26.7097 31.2969 25.6257 29.9377 25.6257C28.5785 25.6257 27.4766 26.7097 27.4766 28.047Z'
                        fill='#FFAD47'
                      />
                    </svg>
                    <span className='pl-2 sub_header_v2'>
                      {" "}
                      Quality Assurance
                    </span>
                  </h5>
                  <div className=''>
                    We don’t just deploy natural gas technical specialists. We
                    also monitor their day-to-day activities on-site to ensure
                    quality assurance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row' id='specialistlanding'>
        <div className='col-md-12 orangebgv2 general-padding generalspacing'>
          <div className='row mb-4'>
            <div className='col-md-12 text-center mg556'>
              <h2 className='contentheader_v1'>Technical Specialists</h2>
              <div className='contentbody_v1 pt-2'>
                MolecularPro values your expertise and provides benefits that
                puts you first.
              </div>
              <div className='getstarted_v4 text-white '>
                <Link to='/specialist_signup'>
                  <OrangeButton title='Get Started' />
                </Link>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 py-4'>
                <div className='tech_specialist_v2'>
                  <div className='card_container_v2 bgcard1'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6875)'>
                          <rect
                            x='22'
                            y='19'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#222073'
                          />
                        </g>
                        <path
                          d='M47.6138 56.5C47.2823 56.4999 46.9644 56.3682 46.73 56.1338L35.2313 44.6225C34.7631 44.1539 34.5001 43.5186 34.5 42.8563V36.3813C34.4999 36.0528 34.5645 35.7275 34.6902 35.424C34.8159 35.1205 35.0002 34.8447 35.2325 34.6125L37.6125 32.2325C37.8447 32.0002 38.1205 31.8159 38.424 31.6902C38.7275 31.5645 39.0528 31.4999 39.3813 31.5H46.375C46.5468 31.5001 46.7168 31.5356 46.8743 31.6045C47.0317 31.6733 47.1733 31.7739 47.29 31.9L59.1338 43.73C59.3681 43.9644 59.4997 44.2823 59.4997 44.6138C59.4997 44.9452 59.3681 45.2631 59.1338 45.4975L48.4975 56.1338C48.2631 56.3682 47.9452 56.4999 47.6138 56.5Z'
                          fill='white'
                        />
                        <path
                          d='M41.75 41C42.9926 41 44 39.9926 44 38.75C44 37.5074 42.9926 36.5 41.75 36.5C40.5074 36.5 39.5 37.5074 39.5 38.75C39.5 39.9926 40.5074 41 41.75 41Z'
                          fill='#222073'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6875'
                            x='0.536514'
                            y='0.398312'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6875'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6875'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>
                      More Work Opportunities
                    </div>
                    <div className='card-content_v2'>
                      Our network and track record provide access to
                      high-quality gas pipeline construction projects across the
                      country.
                    </div>
                  </div>
                  <div className='card_container_v2 bgcard2'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6893)'>
                          <rect
                            x='21.6602'
                            y='18.998'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#EA3549'
                          />
                        </g>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M53.8713 39.4753H59.1602C59.1602 35.2288 56.6157 32.748 52.3046 32.748H41.0157C36.7046 32.748 34.1602 35.2288 34.1602 39.4211V48.575C34.1602 52.7673 36.7046 55.248 41.0157 55.248H52.3046C56.6157 55.248 59.1602 52.7673 59.1602 48.575V48.185H53.8713C51.4167 48.185 49.4268 46.2449 49.4268 43.8518C49.4268 41.4587 51.4167 39.5186 53.8713 39.5186V39.4753ZM53.8713 41.3386H58.2268C58.7423 41.3386 59.1602 41.746 59.1602 42.2485V45.4117C59.1542 45.9119 58.7398 46.3159 58.2268 46.3217H53.9713C52.7286 46.338 51.642 45.5085 51.3602 44.3285C51.219 43.5959 51.4172 42.84 51.9015 42.2633C52.3858 41.6866 53.1068 41.3481 53.8713 41.3386ZM54.0602 44.6643H54.4713C54.999 44.6643 55.4268 44.2472 55.4268 43.7326C55.4268 43.2181 54.999 42.801 54.4713 42.801H54.0602C53.8078 42.7981 53.5647 42.8938 53.3851 43.0668C53.2056 43.2398 53.1046 43.4757 53.1046 43.7218C53.1046 44.2381 53.5306 44.6583 54.0602 44.6643ZM40.0824 39.4753H47.1379C47.6657 39.4753 48.0935 39.0582 48.0935 38.5437C48.0935 38.0291 47.6657 37.612 47.1379 37.612H40.0824C39.5589 37.612 39.1329 38.0225 39.1268 38.5328C39.1268 39.0491 39.5528 39.4694 40.0824 39.4753Z'
                          fill='white'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6893'
                            x='0.196671'
                            y='0.396359'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6893'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6893'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>Better Pay</div>
                    <div className='card-content_v2'>
                      We offer compensation that is above industry rates
                      ensuring that you get the best value for your expertise.
                    </div>
                  </div>
                  <div className='card_container_v2 bgcard3'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6902)'>
                          <rect
                            x='22'
                            y='19.0039'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#F9D567'
                          />
                        </g>
                        <path
                          d='M58.25 41.5039H35.75C35.4185 41.5039 35.1005 41.3722 34.8661 41.1378C34.6317 40.9034 34.5 40.5854 34.5 40.2539V36.5039C34.501 35.5096 34.8964 34.5564 35.5994 33.8534C36.3025 33.1503 37.2557 32.7549 38.25 32.7539H55.75C56.7443 32.7549 57.6975 33.1503 58.4006 33.8534C59.1036 34.5564 59.499 35.5096 59.5 36.5039V40.2539C59.5 40.5854 59.3683 40.9034 59.1339 41.1378C58.8995 41.3722 58.5815 41.5039 58.25 41.5039ZM49.5 46.5039H44.5C44.1685 46.5039 43.8505 46.3722 43.6161 46.1378C43.3817 45.9034 43.25 45.5854 43.25 45.2539C43.25 44.9224 43.3817 44.6044 43.6161 44.37C43.8505 44.1356 44.1685 44.0039 44.5 44.0039H49.5C49.8315 44.0039 50.1495 44.1356 50.3839 44.37C50.6183 44.6044 50.75 44.9224 50.75 45.2539C50.75 45.5854 50.6183 45.9034 50.3839 46.1378C50.1495 46.3722 49.8315 46.5039 49.5 46.5039Z'
                          fill='#A9830B'
                        />
                        <path
                          d='M37 41.5039V51.5039C37.001 52.4982 37.3964 53.4514 38.0994 54.1545C38.8025 54.8575 39.7557 55.2529 40.75 55.2539H53.25C54.2443 55.2529 55.1975 54.8575 55.9006 54.1545C56.6036 53.4514 56.999 52.4982 57 51.5039V41.5039H37ZM49.5 46.5039H44.5C44.1685 46.5039 43.8505 46.3722 43.6161 46.1378C43.3817 45.9034 43.25 45.5854 43.25 45.2539C43.25 44.9224 43.3817 44.6044 43.6161 44.37C43.8505 44.1356 44.1685 44.0039 44.5 44.0039H49.5C49.8315 44.0039 50.1495 44.1356 50.3839 44.37C50.6183 44.6044 50.75 44.9224 50.75 45.2539C50.75 45.5854 50.6183 45.9034 50.3839 46.1378C50.1495 46.3722 49.8315 46.5039 49.5 46.5039Z'
                          fill='white'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6902'
                            x='0.536514'
                            y='0.402219'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6902'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6902'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>
                      Great Working conditions
                    </div>
                    <div className='card-content_v2'>
                      We optimise for safety and welfare on all our sites to
                      provide an environment where you can do your best work
                      because you feel safe, confident and comfortable.
                    </div>
                  </div>
                </div>
                <div className='tech_specialist_v2 mt-3'>
                  <div className='card_container_v2 bgcard4'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6936)'>
                          <rect
                            x='21.6602'
                            y='19'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#FD8C00'
                          />
                        </g>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M57.1591 40.4327L58.0595 41.3327C58.7722 42.0327 59.1599 42.9827 59.1599 43.9827C59.1724 44.9827 58.7847 45.934 58.0845 46.6452C58.0761 46.6544 58.0678 46.6624 58.0595 46.6705C58.0553 46.6745 58.0511 46.6785 58.047 46.6827L57.1591 47.5702C56.809 47.9202 56.6089 48.3952 56.6089 48.8965V50.1827C56.6089 52.2577 54.9208 53.9465 52.8451 53.9465H51.5571C51.0569 53.9465 50.5818 54.1452 50.2316 54.4952L49.3313 55.3952C48.5935 56.134 47.6307 56.4952 46.6678 56.4952C45.705 56.4952 44.7421 56.134 44.0044 55.409L43.0915 54.4952C42.7414 54.1452 42.2662 53.9465 41.7661 53.9465H40.4781C38.4023 53.9465 36.7142 52.2577 36.7142 50.1827V48.8965C36.7142 48.3952 36.5142 47.9202 36.164 47.5577L35.2637 46.6702C33.8007 45.209 33.7882 42.8202 35.2512 41.3464L36.164 40.4327C36.5142 40.0827 36.7142 39.6077 36.7142 39.0952V37.8202C36.7142 35.7452 38.4023 34.0589 40.4781 34.0589H41.7661C42.2662 34.0589 42.7414 33.8577 43.0915 33.5077L43.9919 32.6077C45.4549 31.1339 47.8433 31.1339 49.3188 32.5964L50.2316 33.5077C50.5818 33.8577 51.0569 34.0589 51.5571 34.0589H52.8451C54.9208 34.0589 56.6089 35.7452 56.6089 37.8202V39.109C56.6089 39.6077 56.809 40.0827 57.1591 40.4327ZM43.4417 48.3077C43.7418 48.3077 44.0169 48.1952 44.2169 47.9827L50.6443 41.5589C51.0694 41.1339 51.0694 40.4327 50.6443 40.0077C50.2191 39.584 49.5314 39.584 49.1062 40.0077L42.6789 46.4327C42.2537 46.8577 42.2537 47.5577 42.6789 47.9827C42.879 48.1952 43.1541 48.3077 43.4417 48.3077ZM48.7811 47.2077C48.7811 47.8202 49.2688 48.3077 49.8815 48.3077C50.4817 48.3077 50.9694 47.8202 50.9694 47.2077C50.9694 46.609 50.4817 46.1202 49.8815 46.1202C49.2688 46.1202 48.7811 46.609 48.7811 47.2077ZM43.4542 39.6952C44.0544 39.6952 44.5421 40.1827 44.5421 40.7827C44.5421 41.3965 44.0544 41.8827 43.4542 41.8827C42.854 41.8827 42.3538 41.3965 42.3538 40.7827C42.3538 40.1827 42.854 39.6952 43.4542 39.6952Z'
                          fill='white'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6936'
                            x='0.196671'
                            y='0.398312'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6936'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6936'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>
                      Indemnity Coverage
                    </div>
                    <div className='card-content_v2'>
                      We also fully cover the cost of any damage, loss, injury
                      or negligence with our professional indemnity insurance
                      coverage.
                    </div>
                  </div>
                  <div className='card_container_v2 bgcard5'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6919)'>
                          <rect
                            x='22'
                            y='19'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#038500'
                          />
                        </g>
                        <path
                          d='M55.75 56.5H38.25C36.125 56.5 34.5 54.875 34.5 52.75V35.25C34.5 33.125 36.125 31.5 38.25 31.5H55.75C57.875 31.5 59.5 33.125 59.5 35.25V52.75C59.5 54.875 57.875 56.5 55.75 56.5Z'
                          fill='white'
                        />
                        <path
                          d='M48.25 49H40.75C40 49 39.5 49.5 39.5 50.25C39.5 51 40 51.5 40.75 51.5H48.25C49 51.5 49.5 51 49.5 50.25C49.5 49.5 49 49 48.25 49ZM40.75 46.5H43.25C44 46.5 44.5 46 44.5 45.25C44.5 44.5 44 44 43.25 44H40.75C40 44 39.5 44.5 39.5 45.25C39.5 46 40 46.5 40.75 46.5ZM42 31.5V40.25C42 40.5 42 40.625 42.125 40.875C42.5 41.5 43.25 41.625 43.875 41.375L47 39.625L50.125 41.375C50.375 41.5 50.5 41.5 50.75 41.5C51.5 41.5 52 41 52 40.25V31.5H42Z'
                          fill='#07A604'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6919'
                            x='0.536514'
                            y='0.398312'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6919'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6919'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>Medical Insurance</div>
                    <div className='card-content_v2'>
                      We offer comprehensive coverage from a world-class HMO to
                      cover on-site injuries.
                    </div>
                  </div>
                  <div className='card_container_v2 bgcard6'>
                    <div className='card_items_v2'></div>
                    <div className='card_icon py-1'>
                      <svg
                        width='94'
                        height='94'
                        viewBox='22 0 94 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <g filter='url(#filter0_d_3697_6949)'>
                          <rect
                            x='22'
                            y='19'
                            width='50'
                            height='50'
                            rx='10'
                            fill='#001928'
                          />
                        </g>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M47.408 31.764C47.6076 31.5849 47.8717 31.4909 48.1419 31.503C53.8554 31.674 58.6305 35.8217 59.4959 41.3652C59.5014 41.3983 59.5014 41.4321 59.4959 41.4652C59.5145 41.7275 59.4259 41.9863 59.2495 42.1843C59.0732 42.3823 58.8237 42.5032 58.5563 42.5203L48.957 43.1533C48.6395 43.1815 48.3247 43.077 48.0898 42.8656C47.8549 42.6542 47.7218 42.3554 47.7231 42.0427L47.0778 32.6136V32.4581C47.0896 32.1929 47.2084 31.9432 47.408 31.764ZM46.7496 45.6189L55.0698 45.0858L55.1264 45.108C55.4836 45.1139 55.8239 45.2587 56.0723 45.5108C56.3207 45.7628 56.4569 46.1013 56.4508 46.4519C56.1229 51.2295 52.6202 55.2213 47.8535 56.2497C43.0867 57.2782 38.2002 55.0962 35.8597 50.8943C35.1715 49.6841 34.7366 48.3512 34.5806 46.9738C34.52 46.5657 34.4935 46.1534 34.5013 45.7411C34.5171 40.6608 38.1341 36.2758 43.1951 35.2013C43.8078 35.0867 44.422 35.3926 44.6893 35.9454C44.7559 36.0458 44.8091 36.154 44.8478 36.2675C44.9427 37.732 45.0411 39.1826 45.1391 40.6271C45.2165 41.7679 45.2936 42.9048 45.3685 44.0418C45.3647 44.3097 45.4068 44.5762 45.493 44.8304C45.6962 45.3304 46.2017 45.6476 46.7496 45.6189Z'
                          fill='white'
                        />
                        <defs>
                          <filter
                            id='filter0_d_3697_6949'
                            x='0.536514'
                            y='0.398312'
                            width='92.927'
                            height='92.927'
                            filterUnits='userSpaceOnUse'
                            color-interpolation-filters='sRGB'>
                            <feFlood
                              flood-opacity='0'
                              result='BackgroundImageFix'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dy='2.8618' />
                            <feGaussianBlur stdDeviation='10.7317' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
                            />
                            <feBlend
                              mode='normal'
                              in2='BackgroundImageFix'
                              result='effect1_dropShadow_3697_6949'
                            />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_3697_6949'
                              result='shape'
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className='card-header_v2 pb-1'>
                      Financial support & Continuous training
                    </div>
                    <div className='card-content_v2'>
                      Our advance pay feature allows you to get paid for work
                      done before payday This is a secure alternative to loan
                      apps and money lenders.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-12' id='learnmore'>
          <div className='row'>
            <div className='col-md-6 partnersv2 left_central_padding'>
              <div className='contenttitlev2 pb-4'>
                The new way to source and deploy technical talent for natural
                gas projects
              </div>
              <div className='contentbodyv2'>
                MolecularPro is a technical workforce solution that recruits,
                deploys and manages natural gas technical specialists for
                Engineering Procurement and Construction ( EPC)  contractors. We
                are reimagining talent sourcing and deployment in the natural
                gas industry with our web platform replacing endless phone
                calls, union negotiations, and expensive intermediaries.
                <div className='py-4'>
                  We are committed to helping our clients accelerate their
                  growth by managing their technical talent needs consistently
                  and excellently. For the technical specialists that are part
                  of our pool of exceptional talent,we are committed to
                  providing valuable opportunities and benefits.  
                </div>
              </div>
              <div className='contenttitle_v2 pb-3'>Our Mission</div>
              <div className='contentbodyv2'>
                To bring convenience, speed, quality assurance, and operational
                efficiency to the hiring and deployment of a technical workforce
                to EPC contractors’ projects across Africa.
              </div>
            </div>
            <div className='col-md-6 weldingimage'></div>
          </div>
        </div>
      </div>
      <Faq />
      <div className='row prefooter general-padding extrawidth'>
        <div className='col-md-12'>
          <div className='prefooter_title'>Let's build the future together</div>
          <div className=''>
            Finish projects faster and better with qualified technical
            specialists from MolecularPro
          </div>
          <div className='pt-5'>
            <Link to='/contractor_signup'>
              <button className='btn-orange-custom'>
                Sign up as EPC Contractor
              </button>
            </Link>
            <Link to='/specialist_signup'>
              <button className='btn-orange-custom_outline ml-3'>
                Sign up as Technical Specialist
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Homev2;
