import React, { useState } from 'react';
import Navlist from './Navlist';
import styled from 'styled-components';

const StyledBurger = styled.div`
   display: none;
   cursor: pointer;
   
  div {
      width: 25px;
      height: 3px;
      background-color:  #999999;
      margin: 5px;
      transform-origin: 1px;
      transition: all .3s linear;

      &:nth-child(1){
        transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
      }
      &:nth-child(2){
        transform: ${({open}) => open ? 'translateX(-500%)' : 'translateX(0)'};
        opacity: ${({open}) => open ? 0 : 1};
      }
      &:nth-child(3){
        transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
    @media screen and (max-width:760px){
        display: block;
`;



const Burger=()=>{

    const [ open, setOpen ] = useState(false)

    return(
        <>
            <Navlist open={open} />
            <StyledBurger  open={open} onClick={() => setOpen(!open) }>
                <div></div>
                <div></div>
                <div></div>  
            </StyledBurger>
        </>
    )
}
export default Burger;