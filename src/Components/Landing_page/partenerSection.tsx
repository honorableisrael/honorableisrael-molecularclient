import React from 'react';
import NNPC from '../../images/NNPC.png';
import Lng from '../../images/Lng.png';
import shell from '../../images/shell.png';
import eterna from '../../images/Eterna.png';
import Mobi from '../../images/Exxon.png';
import total from '../../images/total.png';
import chevron from '../../images/chevron.png';



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
          { title: 'nnpc', img: NNPC, id: 1 },
          { title: 'shevron', img: chevron , id: 2},
          { title: 'shell', img: shell , id: 3},
          { title: 'total', img: total , id: 4},
          { title: 'eterna', img: eterna , id: 5},
          { title: 'mobi', img: Mobi , id: 6},
          { title: 'lng', img: Lng , id: 7}
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