import React from 'react';
import './navigation.css';
import logo from '../../images/Molecular.png';
import Burger from './burger'


const NavBar =()=>{
    return(
        <div>
           <div className="nav">
                  <div className="nav-logo"><img src={logo}/></div>
                 <Burger/>
              </div>
        </div>
    )
}
export default NavBar;