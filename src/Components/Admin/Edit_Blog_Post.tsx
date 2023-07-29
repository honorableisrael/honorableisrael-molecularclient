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
import { Link, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { API, notify, reloadPage, returnAdminToken } from "../../config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";

const EditBlogPost = withRouter((props) => {
  const [state, setState] = useState<any>({
    featured_image: "",
    isloading: false,
    country: "",
    inprogress: true,
    photo: "",
    contentState: "",
    editorState: EditorState.createEmpty(),
    pending_request: false,
    title: "",
    subtitle: "",
    body: "",
    past: false,
    meta_tag: "",
    slug: "",
    title_tag: "",
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
    const objectUrl = URL.createObjectURL(e.target.files[0])
    setState({
      ...state,
      featured_image: e.target.files[0],
      photo: objectUrl,
    });
  };

  const onchange = (e) => {
    
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${API}/admin/blogs/posts/${props.match.params.id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          
          setState({
            ...state,
            ...res.data.data,
            meta_tag: res?.data?.data?.tags?.meta,
            title_tag: res?.data?.data?.tags?.title,
            photo: res?.data?.data?.images.full,
            publish: res?.data?.data?.published,
            feature: res?.data?.data?.featured,
          });
        })
      )
      .catch((err) => {
        
      });
  }, []);

  const {
    body,
    country,
    photo,
    contentState,
    editorState,
    subtitle,
    title,
    isloading,
    id,
    featured_image,
    feature,
    publish,
    slug,
    meta_tag,
    title_tag,
  }: any = state;

  useEffect(() => {
    const contentBlock = htmlToDraft(body);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setState({
        ...state,
        editorState,
        contentState: body,
      });
    }
  }, [body]);
  
  const EditPost = () => {
    const token = returnAdminToken();
    const data = new FormData();
    data.append("featured_image", featured_image);
    data.append("subtitle", subtitle);
    data.append("title", title);
    data.append("body", contentState ?? body);
    data.append("feature", feature);
    data.append("publish", publish);
    data.append("slug", slug);
    data.append("meta_tag", meta_tag);
    data.append("title_tag", title_tag);
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.post(
          `${API}/admin/blogs/posts/${props.match.params.id}/update`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        ),
      ])
      .then(
        axios.spread((res) => {
          notify("Successfully updated");
          // reloadPage();
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
        if (err?.response?.status == 406) {
          return notify(err?.response?.data?.message);
        }
        
        notify("Sorry failed to update please try again later");
      });
  };

  return (
    <>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>MolecularPro - Admin Blog Post</title>
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
                Edit Blog Post
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
                        <Form.Group className="bold-text">
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
                    </Row>
                    {/* <Row>
                      <Col md={6} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Sub title</h6>
                          <textarea
                            value={subtitle}
                            className='userfield subtitle form-control'
                            id='subtitle'
                            onChange={onchange}
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Title tag</h6>
                          <textarea
                            value={title_tag}
                            className='userfield subtitle form-control'
                            id='title_tag'
                            onChange={onchange}
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>
                    </Row> */}
                    {/* <Row>
                      <Col md={6} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Meta Tag</h6>
                          <Form.Control
                            type='text'
                            value={meta_tag}
                            className='userfield'
                            id='meta_tag'
                            onChange={onchange}
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Slug</h6>
                          <textarea
                            value={slug}
                            className='userfield subtitle form-control'
                            id='slug'
                            onChange={onchange}
                            placeholder=''
                          />
                        </Form.Group>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md={12} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Content</h6>
                          {/* <textarea
                            value={body}
                            className='userfield h100 subtitle form-control'
                            id='body'
                            onChange={onchange}
                            placeholder='Enter content'
                          /> */}
                          <Editor
                            editorState={editorState}
                            onChange={(x) => {
                              setState({
                                ...state,
                                contentState: draftToHtml(x),
                              });
                            }}
                            value={body}
                            wrapperClassName='editorwrapperClassName'
                            onEditorStateChange={(x) => {
                              setState({
                                ...state,
                                editorState: x,
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Featured Image</h6>
                          <input
                            className='userfield subtitle form-control'
                            id='featured_image'
                            onChange={handleImages}
                            type={"file"}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className='formsection1'>
                        <h6 className='userprofile'>Current Photo</h6>
                        <img src={photo} className='blogphotoprev' alt='' />
                      </Col>
                      <Col md={1} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Feature</h6>
                          <label htmlFor='feature'>
                            <input
                              type='checkbox'
                              id='feature'
                              onChange={() => {
                                setState({
                                  ...state,
                                  feature: feature ? 0 : 1,
                                });
                              }}
                              className='form-check-input position-static'
                              checked={feature == 1 ? true : false}
                            />
                          </label>
                        </Form.Group>
                      </Col>
                      <Col md={1} className='formsection1'>
                        <Form.Group className="bold-text">
                          <h6 className='userprofile'>Publish</h6>
                          <label htmlFor='feature'>
                            <input
                              type='checkbox'
                              id='publish'
                              onChange={() => {
                                setState({
                                  ...state,
                                  publish: publish ? 0 : 1,
                                });
                              }}
                              className='form-check-input position-static'
                              checked={publish == 1 ? true : false}
                            />
                          </label>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className='job31' onClick={EditPost}>
                          {isloading ? "Processing" : "Submit"}
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
        toastClassName='bg-danger text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-info text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
});

export default EditBlogPost;
