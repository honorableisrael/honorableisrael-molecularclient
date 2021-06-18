import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';

import styled from "styled-components";

const Ul = styled.ul`
     display: flex !important;
     width: 46%;
     color: #999999;
     font-size: 16px;
     font-weight: 600;
     justify-content: space-around !important;
     list-style: none;
     align-items: baseline;
    li{
      cursor: pointer;
    }
     a{
        
        list-style: none;
        text-decoration: none;
    }
    a:hover{
      text-decoration: none;
  }
@media screen and (max-width:1024px){
     width: 60%;
}
@media screen and (max-width:760px){
    position: fixed;
    left: -1px;
    height: 92vh;
    top: 8vh;
    background-color:  #FAFAFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    z-index: -6;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.5s ease-in-out;


`;

const Navlist = ({ open }) => {
  return (
    <Ul open={open}>
      <NavLink to="/" className="homenavlnks">
        <li>Home</li>
      </NavLink>
      <NavHashLink to="#our_services"  className="homenavlnks">
        <li>Our Services</li>
      </NavHashLink>
      <NavLink to="/projects" className="homenavlnks">
        <li>Project</li>
      </NavLink>
      <NavLink to="/learnmore" className="homenavlnks">
        <li>Careers</li>
      </NavLink>
      <NavLink to="/contactus" className="homenavlnks">
        <li>Contact us</li>
      </NavLink>
      <Link to="/signin">
        <li className="nav-login-btn">Login</li>
      </Link>
    </Ul>
  );
};
export default Navlist;
