import React from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import styled from "styled-components";

const Ul = styled.ul`
     display: flex !important;
     width: 50%;
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
     width: 73%;
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
      <NavHashLink
        to="/#home"
        className="homenavlnks"
        activeStyle={{
          color: "#222073",
          lineHeight: "29px",
          borderBottom: "4px solid #fd8c00"
        }}
      >
        <li>Home</li>
      </NavHashLink>
      <NavHashLink
        to="/#our_services"
        className="homenavlnks"
        activeStyle={{
          color: "#222073",
          lineHeight: "29px",
          borderBottom: "4px solid #fd8c00"
        }}
      >
        <li>Our Services</li>
      </NavHashLink>
      <NavHashLink
        to="/projects"
        className="homenavlnks"
        activeStyle={{
          color: "#222073",
          lineHeight: "29px",
          borderBottom: "4px solid #fd8c00"
        }}
      >
        <li>Industry Segments</li>
      </NavHashLink>
      <NavHashLink
        to="/learnmore"
        className="homenavlnks"
        activeStyle={{
          color: "#222073",
          lineHeight: "29px",
          borderBottom: "4px solid #fd8c00"
        }}
      >
        <li>Careers</li>
      </NavHashLink>
      <NavHashLink
        to="/contactus"
        activeStyle={{
          color: "#222073",
          lineHeight: "29px",
          borderBottom: "4px solid #fd8c00"
        }}
        className="homenavlnks"
      >
        <li>Contact us</li>
      </NavHashLink>
      <Link to="/signin">
        <li className="nav-login-btn">Login</li>
      </Link>
    </Ul>
  );
};
export default Navlist;
