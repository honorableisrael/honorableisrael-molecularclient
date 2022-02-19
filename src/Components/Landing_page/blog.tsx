import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Widgets/navigation";
import "./home.css";
import Work from "./workandbuild";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import pipe from "../../images/Pipeline_stick.jpg";
import ibejulekki from "../../images/manwithflame.png";
import whitehelmet from "../../images/oil-pipeline.png";
import oilengineers from "../../images/oilengineers.jpg";


const Blog = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="blogheader">
        <h2 className="blog-title">Grey Connects</h2>
        <p>
          Molecular is a technology-driven workforce management 
          solution for technical specialists in Africa’s natural gas industry
        </p>
      </div>
      <div className="blog-container">
        <div className="row">
          <div className="leftcolumn">
            <div className="blog_card">
              <h2>The Art of Welding Pipeline</h2>
              <h5>Title description, Dec 7, 2021</h5>
              <div className="fakeimg" style={{ height: "300px" }}>
                <img src={pipe} className="img-fluid blog_images" />
              </div>
              <p>
                Redesigning and reconstructing an existing in the building for a
                new and different purpose than can originally intended and/or to
                give it a modern.<span className="blog-readmoretxt"> Read More</span>
              </p>
            </div>
            <div className="blog_card">
              <h2>Thriving in Oil Exploration industry</h2>
              <h5>Title description, Sep 2, 2021</h5>
              <div className="fakeimg" style={{ height: "300px" }}>
                <img src={ibejulekki} className="img-fluid blog_images" />
              </div>
              <p> Redesigning and reconstructing an existing in the building for a
                new and different purpose than can originally intended and/or to
                give it a modern.<span className="blog-readmoretxt"> Read More</span></p>
            </div>
            <div className="blog_card">
              <h2>building Projects that last</h2>
              <h5>Title description, Sep 2, 2021</h5>
              <div className="fakeimg" style={{ height: "300px" }}>
                <img src={whitehelmet} className="img-fluid blog_images" />
              </div>
              <p>
                {" "}
                Redesigning and reconstructing an existing in the building for a
                new and different purpose than can originally intended and/or to
                give it a modern.<span className="blog-readmoretxt"> Read More</span>
              </p>
            </div>
          </div>
          <div className="rightcolumn">
            <div className="blog_card">
              <h2>About Us</h2>
              <div className="fakeimg" style={{ height: "100px" }}>
              <img src={oilengineers} className="img-fluid oilengimg" alt="pic3" />
              </div>
              <p>
                Molecular is a technology-driven workforce management solution
                for technical specialists in Africa’s natural gas industry
              </p>
            </div>
            <div className="blog_card">
              <h2>Popular Post</h2>
              <div className="fakeimg">Image</div>
              <br />
              <div className="fakeimg">Image</div>
              <br />
              <div className="fakeimg">Image</div>
            </div>
           {/* <div className="blog_card">
              <h3>Follow Us</h3>
              <p>Some text..</p>
            </div>  */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog;
