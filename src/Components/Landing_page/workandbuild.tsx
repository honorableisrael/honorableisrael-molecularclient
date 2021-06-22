import React,{useEffect} from 'react'
import {Col, Row, Container} from 'react-bootstrap';
import chevron from "../../images/chevronright.png";
import AOS from 'aos';
import "aos/dist/aos.css";



const Work =()=>{

  useEffect( () => {

    AOS.init({
       duration:1500,
    });
    AOS.refresh();
  }, []);

    return(
        <div>
          <div className="section-seven">
         <Row>
           <Col md={6} className="lightbulb-img"  data-aos='zoom-in-up'>
           </Col>
           <Col md={6} className="section-seven-content-wrapp">
             <h4 className="section-seven-heading">
             Let’s go to work and build
             </h4>
             <p className="section-seven-content">We make work processes and cycle easy for completion </p>
             <form className="section-seven-form">
                <Row style={{justifyContent:"space-between", flexWrap:"nowrap"}}>
                  <Col md={6} className="inputcol">
                    <input
                      type="text"
                      size={30}
                      className="section-seven-forminpt form-control"
                      placeholder="Enter your email"
                    />
                  </Col>
                  <Col md={2} className="section-seven-form-btn">
                    <img src={chevron}/>
                  </Col>
                </Row>
              </form>
           </Col>
         </Row>
      </div>
        </div>
    )
}
export default Work;