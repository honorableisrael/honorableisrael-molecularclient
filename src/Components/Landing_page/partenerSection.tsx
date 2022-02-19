import React from 'react';
import BRENTEX from '../../images/BRENTEX.png';
import BRIGHTWATERS from '../../images/BRIGHTWATERS.png';
import MELCURT from '../../images/MELCURT.png';
import NIGERDOCK from '../../images/NIGERDOCK.png';
import MORPOL from '../../images/MORPOL.png';
import Paddoe from '../../images/Paddoe.png';
import Jenoil from '../../images/Jenoil.png';
import SELLYFAK from '../../images/SELLYFAK.png';



const PatnersSection = () => {     

  return (
    <section className='partner-carousel prtncardsply'
     style={{backgroundColor: "#f0f5fd",
             overflowY: "hidden", 
             padding: "0 0", 
             overflowX: "auto", 
             display: "flex",
             justifyContent: "space-around"
         }}>
      {
        [
          { title: 'BRENTEX', img: BRENTEX, id: 1 },
          { title: 'Jenoil', img: Jenoil , id: 2},
          { title: 'MELCURT', img: MELCURT , id: 3},
          { title: 'Paddoe', img: Paddoe , id: 4},
          { title: 'NIGERDOCK', img: NIGERDOCK , id: 5},
          { title: 'MORPOL', img: MORPOL , id: 6},
          { title: 'BRIGHTWATERS', img: BRIGHTWATERS , id: 7},
          { title: 'SELLYFAK', img: SELLYFAK , id: 8}
        ].map(({ title, img, id }) => (
          <div className="partner-spacing">
          <img
            key={id}
            src={img}
            alt={title}
            className='partner-logo'
          />
          </div>
        ))
      }
      </section>
        
  );
}
 
export default PatnersSection;