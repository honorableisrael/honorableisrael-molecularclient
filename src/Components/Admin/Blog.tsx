import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Pagination,
  Table,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap";
import "./contractor.css";
import DashboardNav from "./navbar";
import portfolio from "../../images/portfolio.png";
import group2 from "../../images/group2.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import arrowback from "../../images/dtls.png";
import { Link } from "react-router-dom";
import no_work_order from "../../images/document 1.png";
import nextbtn from "../../images/nextbtn.png";
import bin_icon from "../../assets/bin_icon.png";
import viewicon from "../../assets/viewicon.jpeg";
import axios from "axios";
import {
  returnAdminToken,
  API,
  FormatAmount,
  formatTime,
  reloadPage,
} from "../../config";
import { HashLink } from "react-router-hash-link";
import { ToastContainer } from "react-toastify";

const BlogList = (props) => {
  const [state, setState] = useState({
    work_orders: [],
    country: "",
    all_blog_post: [],
    inprogress: true,
    pending_request: false,
    order_title: "",
    work_order_description: "",
    project_purpose: "",
    past: false,
    filter: "",
    location: "",
    end_date: "",
    isloading: false,
    start_date: "",
    search: "",
    show2: false,
    id: "",
    show_date: false,
    next: "",
    prev: "",
    first: "",
    last: "",
    current_page: "",
    last_page: "",
    to: "",
    total: "",
  });
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

  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        inprogress: true,
        pending_request: false,
        past: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: true,
        past: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        inprogress: false,
        pending_request: false,
        past: true,
      });
    }
  };

  useEffect(() => {
    getTransactions(`${API}/admin/blogs/posts`);
  }, []);

  const getTransactions = (endpoint) => {
    const token = returnAdminToken();
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          // console.log(res.data);
          setState({
            ...state,
            all_blog_post: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
            isloading: false,
            show_date: false,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const nextPage = (x) => {
    const token = returnAdminToken();
    axios
      .all([
        axios.get(`${x}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data);
          window.scrollTo(-0, -0);
          setState({
            ...state,
            all_blog_post: res.data.data.data,
            ...res.data.data.links,
            ...res.data.data.meta,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    inprogress,
    show_date,
    filter,
    all_blog_post,
    show2,
    work_order_description,
    order_title,
    end_date,
    isloading,
    start_date,
    id,
    last_page,
    next,
    prev,
    first,
    last,
    current_page,
  } = state;

  const deleteBlogPost = (x) => {
    const token = returnAdminToken();
    axios
      .all([
        axios.delete(`${API}/admin/blogs/posts/${id}`, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res.data);
          reloadPage();
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
      });
  };

  return (
    <>
      <Container fluid={true} className='dasbwr'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Molecular - Admin Invoice</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row className='rowt3'>
          <Col md={11} className='job34'>
            <div className='title_wo'>
              <div className='workorderheader wtitle2 porderheader contractor_transactions_header'>
                <span
                  onClick={() => window.history.back()}
                  className='curspointer'>
                  {" "}
                  <img src={arrowback} className='arrowback' />
                </span>
                All Blog Post
              </div>
            </div>
            <div className='intab flexx2 justify-between'>
              <div
                // onClick={() =>
                //   getTransactions(
                //     `${API}/admin/contractors/payment-transactions`
                //   )
                // }
                className={inprogress ? "inprogress tab_active" : "inprogress"}>
                All
              </div>
              {/* <div className='searchcontrol_'>
                <input
                  type='text'
                  className='form-control search_field'
                  value={search}
                  onChange={onchange}
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      search_filter();
                    }
                  }}
                  id='search'
                  placeholder='Search'
                />
                {isloading && <Spinner animation={"grow"} variant={"info"} />}
              </div> */}
              <div className='dropdown1'>
                <Link to='/admin/new/blogpost'>
                  <button className='sendbtn'>Create Post</button>
                </Link>
              </div>{" "}
            </div>
            <Col md={12}>
              {/* <Col md={12} className='plf'>
                <div className='cardflex_jo'>
                  {all_blog_post?.map((data, i) => (
                    <PaymentCards_1
                      title='P'
                      payment_details={data}
                      status={true}
                    />
                  ))}
                  {all_blog_post?.length == 0 && (
                    <Col md={11} className='containerforemptyorder1'>
                      <div className='containerforemptyorder'>
                        <img
                          src={no_work_order}
                          alt={"no_work_order"}
                          className='no_work_order'
                        />
                      </div>
                      <div className='no_work1'>invoice data is empty</div>
                    </Col>
                  )}
                </div>
                <div className='active_member2'>
                  <div>
                    Displaying <b>{current_page}</b> of <b>{last_page}</b>
                  </div>
                  <Pagination>
                    <Pagination.First onClick={() => nextPage(first)} />
                    <Pagination.Prev onClick={() => nextPage(prev)} />
                    <Pagination.Next onClick={() => nextPage(next)} />
                    <Pagination.Last onClick={() => nextPage(last)} />
                  </Pagination>
                </div>
              </Col> */}
              <div className='deployedsplsttable'>
                <Table hover responsive className='schedule_payment_table'>
                  <thead>
                    <tr>
                      <th scope='col'>Title</th>
                      <th scope='col'>Sub title</th>
                      <th scope='col'>Content</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Date</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {all_blog_post?.map((data: any, i) => (
                      <tr key={i}>
                        <td title={data?.title}>
                          <Link to={`/editblog/${data?.id}`}>
                            {" "}
                            {data?.title}
                          </Link>
                        </td>
                        <td>
                          {" "}
                          <Link to={`/editblog/${data?.id}`}>
                            {" "}
                            {data?.subtitle}
                          </Link>{" "}
                        </td>
                        <td
                          className='dpslstnamecell pslstnamecell schedule_payment_first_td'
                          title={data?.excerpt}>
                          <Link to={`/editblog/${data?.id}`}>
                            {/* <span></span> */}
                            &nbsp; &nbsp;
                            {data?.excerpt}
                          </Link>
                        </td>
                        <td>
                          <span className='publishedpost'>
                            {data.published ? "published" : "~~/~~"}
                          </span>
                        </td>
                        <td className=''>
                          {" "}
                          <Link to={`/editblog/${data?.id}`}>
                            {" "}
                            {formatTime(data?.created_at)}
                          </Link>
                        </td>
                        <td className='text-center'>
                          <span
                            title='Delete post'
                            onClick={() => {
                              setState({
                                ...state,
                                show2: true,
                                id: data.id,
                              });
                            }}
                            className='cursor-pointer'>
                            <img src={bin_icon} alt='' width='15' height='15' />
                          </span>
                          <span title='Preview post'>
                            <Link to={`/editblog/${data?.id}`}>
                              <img
                                src={viewicon}
                                alt=''
                                width='25'
                                height='25'
                              />
                            </Link>
                          </span>
                        </td>
                        {/* <td>
                          <Link
                            to={`/contractor_transactions_details/${data?.id}`}>
                            {" "}
                            View
                          </Link>
                        </td> */}
                        {/* <td>
                              {data?.actions?.can_pay && (
                                <Button
                                  onClick={() => openModal(data.id,data)}
                                  className="payspecialist1"
                                >
                                  Process
                                </Button>
                              )}
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className='text-center'>
                  {all_blog_post.length == 0 && !isloading && "No record found"}
                </div>
                {all_blog_post && (
                  <div className='active_member2'>
                    <div>
                      Displaying <b>{current_page}</b> of <b>{last_page}</b>
                    </div>
                    <Pagination>
                      {first && (
                        <Pagination.First onClick={() => nextPage(first)} />
                      )}
                      {prev && (
                        <Pagination.Prev onClick={() => nextPage(prev)} />
                      )}
                      {next && (
                        <Pagination.Next onClick={() => nextPage(next)} />
                      )}

                      {last && (
                        <Pagination.Last onClick={() => nextPage(last)} />
                      )}
                    </Pagination>
                  </div>
                )}
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
      <Modal
        size='sm'
        show={show2}
        onHide={() =>
          setState({
            ...state,
            show2: false,
          })
        }
        dialogClassName='modal-90w'
        className='mdl12c'>
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h6>
                Please note this operation would completely erase this blog
                record{" "}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='terminate2'>
              <Button
                className='btn-success succinline'
                onClick={() => {
                  setState({
                    ...state,
                    show2: false,
                  });
                }}>
                Cancel
              </Button>
              <div className='' onClick={deleteBlogPost}>
                <Button className='btn-success primary3'>
                  {isloading ? "Processing" : "Delete Post"}
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName='bg-orange text-white'
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default BlogList;
