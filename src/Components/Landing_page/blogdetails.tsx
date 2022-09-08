import React, { useEffect, useState } from "react";
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
import axios from "axios";
import {
  returnAdminToken,
  API,
  notify,
  refreshpage,
  formatTime,
} from "../../config";
import { Link } from "react-router-dom";

const BlogDetails = (props) => {
  const [state, setState]: any = useState({ isloading: false, blogpost: {} });
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
    GetAllPost();
  }, []);

  const GetAllPost = () => {
    window.scrollTo(-0, -0);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([axios.get(`${API}/blogs/posts/${props.match.params.id}`)])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
          setState({
            ...state,
            blogpost: res.data.data,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        notify("Failed to fetch data", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  return (
    <div>
      <NavBar />
      <div className='blogheader'>
        <h2 className='blog-title'>Grey Connects</h2>
        <p>
          Molecular is a technology-driven workforce management solution for
          technical specialists in Africa’s natural gas industry
        </p>
      </div>
      <div className='blog-container'>
        <div className='row'>
          <div className='leftcolumn'>
            {
              <div className='blog_card'>
                <h2>{state?.blogpost?.title}</h2>
                <small>
                  {state?.blogpost?.subtitle},{" "}
                  {formatTime(state?.blogpost?.created_at)}
                </small>
                <div className='fakeimg' style={{ height: "300px" }}>
                  <img
                    src={state?.blogpost?.images?.thumb}
                    className='img-fluid blog_images'
                  />
                </div>
                <p
                  className='postbody1'
                  dangerouslySetInnerHTML={{
                    __html: state?.blogpost?.body ?? "n/a",
                  }}></p>
              </div>
            }
            <input
              className='backbtn2 nav-login-btn '
              onClick={() => window.history.back()}
              type='button'
              value={"Back"}
            />
          </div>
          <div className='rightcolumn'>
            <div className='blog_card'>
              <h2>About Us</h2>
              <div className='fakeimg' style={{ height: "100px" }}>
                <img
                  src={oilengineers}
                  className='img-fluid oilengimg'
                  alt='pic3'
                />
              </div>
              <p>
                Molecular is a technology-driven workforce management solution
                for technical specialists in Africa’s natural gas industry
              </p>
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
export default BlogDetails;
