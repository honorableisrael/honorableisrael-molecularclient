import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { API, notify, reloadPage, returnAdminToken } from "../../config";

const EditBlogPost = () => {
  const [state, setState] = useState({
    featured_image: "",
    isloading: false,
    country: "",
    inprogress: true,
    pending_request: false,
    title: "",
    subtitle: "",
    body: "",
    past: false,
    location_terrain: "",
    location: "",
    end_date: "",
    start_date: "",
    hour: "",
    publish: 0,
    feature: 0,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length < 1) {
      return;
    }
  }, [images]);

  const handleImages = (e) => {
    setState({
      ...state,
      featured_image: e.target.files[0],
    });
  };

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };

  const {
    body,
    country,
    subtitle,
    title,
    isloading,
    featured_image,
    feature,
    publish,
  }: any = state;

  const CreatePost = () => {
    const token = returnAdminToken();
    const data = new FormData();
    data.append("featured_image", featured_image);
    data.append("subtitle", subtitle);
    data.append("title", title);
    data.append("body", body);
    data.append("feature", feature);
    data.append("publish", publish);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(`${API}/admin/blogs/posts`, data, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }),
      ])
      .then(
        axios.spread((res) => {
          notify("Successful");
          reloadPage()
          console.log(res.data.data);
          setState({
            ...state,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        setState({
          ...state,
          isloading: false,
        });
        if (err?.response?.status == 400) {
          return notify(err?.response?.data?.message);
        }
        console.log(err);
      });
  };
  console.log(featured_image, "featured_image");
  return (
    <>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Admin Blog Post</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='rowt3'>
          <Col md={12} className='job34'>
            <div className='title_wo'>
              <div
                className='workorderheader workorderheaderpp'
                onClick={() => {
                  window.history.back();
                }}>
                {" "}
                <img src={arrowback} className='arrowback' />
                Create Blog Post
              </div>
            </div>
            <Row>
              <Col md={12} className='job23'>
                <div className='form_header'>
                  <span className='form_header1'>
                    {" "}
                    <b>1</b> of 1{" "}
                  </span>{" "}
                  <b> Blog Details</b>
                </div>
                <div className='formcontent'>
                  <Form>
                    <Row>
                      <Col md={12} className='formsection1'>
                        <Form.Group>
                          <h6 className='userprofile'>Post Title</h6>
                          <Form.Control
                            type='text'
                            value={title}
                            className='userfield'
                            id='title'
                            onChange={onchange}
                            placeholder='Blog Title'
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className='formsection1'>
                        <Form.Group>
                          <h6 className='userprofile'>Sub title</h6>
                          <textarea
                            value={subtitle}
                            className='userfield subtitle form-control'
                            id='subtitle'
                            onChange={onchange}
                            placeholder='Sub title'
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className='formsection1'>
                        <Form.Group>
                          <h6 className='userprofile'>Description</h6>
                          <textarea
                            value={body}
                            className='userfield h100 subtitle form-control'
                            id='body'
                            onChange={onchange}
                            placeholder='Enter Description'
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className='formsection1'>
                        <Form.Group>
                          <h6 className='userprofile'>Featured Image</h6>
                          <input
                            className='userfield subtitle form-control'
                            id='featured_image'
                            onChange={handleImages}
                            type={"file"}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className='job31' onClick={CreatePost}>
                          Submit
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default EditBlogPost;
