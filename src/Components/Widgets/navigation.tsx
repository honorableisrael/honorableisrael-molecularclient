import React from 'react';
import './navigation.css';
import { Link } from "react-router-dom";
import logo from '../../images/Molecular.png';
import Burger from './burger'


const NavBar =()=>{
    return(
        <div>
           <div className="nav">
                  <Link to="/#home"><div className="nav-logo"><img src={logo}/></div></Link>
                 <Burger/>
              </div>
        </div>
    )
}
export default NavBar;