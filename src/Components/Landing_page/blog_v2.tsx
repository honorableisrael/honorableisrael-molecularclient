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

const Blog_Revamp = () => {
  const [state, setState]: any = useState({ isloading: false, blogpost: [] });
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
      .all([axios.get(`${API}/blogs/posts`)])
      .then(
        axios.spread((res) => {
          setState({
            ...state,
            blogpost: res.data.data.data,
            isloading: false,
          });
        })
      )
      .catch((err) => {
        
        notify("Failed to fetch data", "D");
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const { blogpost } = state;
  return (
    <div>
      <NavBar />
      <div className='blogheader'>
        <h2 className='blog-title'>Grey Connects</h2>
        <p>
          MolecularPro is a technology-driven workforce management solution for
          technical specialists in Africa’s natural gas industry
        </p>
      </div>
      <div className='col-md-12 pt9'>
        <div className='row'>
          {blogpost.map((data, i) =>
            i === 0 ? (
              <div className='blog-container'>
                <article className='post-card post tag-salary tag-hr-manager tag-hr tag-manager tag-raise tag-negotiation tag-employee featured post-card-large'>
                  <Link
                    to={`/blog_details/${data.slug}`}
                    className='post-card-image-link'>
                    <img
                      className='post-card-image'
                      sizes='(max-width: 1000px) 400px, 800px'
                      src={data?.images?.thumb}
                      loading='lazy'
                    />
                  </Link>

                  <div className='post-card-content'>
                    <Link
                      to={`/blog_details/${data.slug}`}
                      className='post-card-content-link'>
                      <header className='post-card-header'>
                        <div className='post-card-tags'>
                          <span className='post-card-primary-tag'></span>
                          <span className='post-card-featured'>
                            <svg
                              width='16'
                              height='17'
                              viewBox='0 0 16 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M4.49365 4.58752C3.53115 6.03752 2.74365 7.70002 2.74365 9.25002C2.74365 10.6424 3.29678 11.9778 4.28134 12.9623C5.26591 13.9469 6.60127 14.5 7.99365 14.5C9.38604 14.5 10.7214 13.9469 11.706 12.9623C12.6905 11.9778 13.2437 10.6424 13.2437 9.25002C13.2437 6.00002 10.9937 3.50002 9.16865 1.68127L6.99365 6.25002L4.49365 4.58752Z'
                                stroke='currentColor'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'></path>
                            </svg>{" "}
                            Featured
                          </span>
                        </div>
                        <h2 className='post-card-title'>{data?.title}</h2>
                      </header>
                      <div className='post-card-excerpt'>{data?.excerpt}</div>
                    </Link>

                    <footer className='post-card-meta'>
                      <time className='post-card-meta-date'>
                        {formatTime(data?.created_at)}
                      </time>
                      <span className='post-card-meta-length'>5 min read</span>
                    </footer>
                  </div>
                </article>
              </div>
            ) : (
              <>
                <div className='col-md-4 pl23'>
                  <article className='post-card post tag-startup tag-fintech tag-crypto tag-cryptocurrency dynamic'>
                    <Link
                      to={`/blog_details/${data.slug}`}
                      className='post-card-image-link'>
                      <img
                        className='post-card-image'
                        sizes='(max-width: 1000px) 400px, 800px'
                        src={data?.images?.thumb}
                        loading='lazy'
                      />
                    </Link>

                    <div className='post-card-content'>
                      <Link
                        to={`/blog_details/${data.slug}`}
                        className='post-card-content-link'>
                        <header className='post-card-header'>
                          <div className='post-card-tags'>
                            <span className='post-card-primary-tag'>
                              {/* Startup */}
                            </span>
                          </div>
                          <h2 className='post-card-title'>{data?.title}</h2>
                        </header>
                        <div className='post-card-excerpt'>{data?.excerpt}</div>
                      </Link>

                      <footer className='post-card-meta'>
                        <time className='post-card-meta-date'>
                          {formatTime(data?.created_at)}
                        </time>
                        <span className='post-card-meta-length'>
                          3 min read
                        </span>
                      </footer>
                    </div>
                  </article>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog_Revamp;
