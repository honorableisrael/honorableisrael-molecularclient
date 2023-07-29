import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, formatTime, notify } from "../../config";
import NavBar from "../Widgets/navigation";
import Footer from "./footer";
import "./test.css";
import AOS from "aos";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

const PreviewBlog = withRouter((props) => {
  const [state, setState]: any = useState({
    isloading: false,
    blogpost: {},
    featuredpost: [],
  });
  useEffect(() => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    GetFeatured();
  }, [props.match.params.id]);

  const GetFeatured = () => {
    setState({
      ...state,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/blogs/posts/featured?per_page=3`),
        axios.get(`${API}/blogs/posts/${props.match.params.id}`),
      ])
      .then(
        axios.spread((res, res2) => {
          window.scrollTo(-0, -0);
          setState({
            ...state,
            featuredpost: res.data.data.data,
            blogpost: res2.data.data,
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
  const { blogpost, featuredpost } = state;
  
  return (
    <>
      <div id='home'></div>
      <NavBar />
      <Helmet>
        <title>{blogpost?.tags?.title}</title>
        <meta name={blogpost?.tags?.meta} content={blogpost?.tags?.meta} />
      </Helmet>
      <main>
        <div className='hero-hub-single-post'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='img-hold img-placeholder'>
                <img
                  className='img-stretch lazy-opacity yall_lazy yall_loaded full-loaded'
                  srcSet={state?.blogpost?.images?.full}
                />
              </div>
            </div>
            <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-5 col-desc'>
              <div className='desc'>
                <strong className='category'></strong>
                <h1>{state?.blogpost?.title}</h1>
                <span className='caption'>
                  {formatTime(state?.blogpost?.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='social-network-wrapper'></div>

        <div className='post-content'>
          <div className='post-content-row copy-md'>
            <div className='container-width-desktop'>
              <div className='row content-center'>
                <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-7 col-md-offset-3'>
                  <div className='inner'>
                    <div className='social-network-container'>
                      <div className='container'></div>
                    </div>
                    <div className='wysiwyg'>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: state?.blogpost?.body ?? "n/a",
                        }}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='post-blockquote post-content-rowb'>
            <div className='container-width-desktop'>
              <div className='row content-center'>
                <div className='col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2'>
                  <blockquote>
                    <q className='q largetext'>
                      Honestly, I like the experience because I’m learning a lot
                      of things. I want to do it for a few years, then I want to
                      get my own business started in Phoenix.
                    </q>
                    <cite className='quote-cite'>
                      <span className='name'>Jacob</span> — Solar Installer{" "}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className='post-content-row  copy-md'>
            <div className='container-width-desktop'>
              <div className='row content-center'>
                <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
                  <div className='inner'>
                    <div className='wysiwyg'>
                      <p>
                        <span>
                          Trent says he’s enjoyed the process of learning from
                          the ground up. He previously worked as a recruiter for
                          Houston Community College for 15 years. “Most places I
                          go, they like me and keep me around for a while, but
                          there’s just no money in education.”
                        </span>
                      </p>
                      <p>
                        <span>
                          Furthering his knowledge of{" "}
                          <a href='' target='_blank' rel='noopener'>
                            the solar industry
                          </a>
                          , and eventually working his way up to become a
                          manager, is Trent’s long-term goal. “I already see
                          this as a great opportunity for me to grow and provide
                          for my family,” he says.&nbsp;
                        </span>
                      </p>
                      <p>
                        <span>
                          Trent and Jacob have one very important thing in
                          common which motivates their himport { Helmet } from 'react-helmet';
ard work: theirimport { Helmet } from 'react-helmet';

                          daughters. When Jacob’s one-month old daughter Janelle
                          was born, Trent, whose daughter Paisley is 6, picked
                          up the phone. “I called him and told him, ‘Look, man,
                          get some sleep when you can!’”
                        </span>
                      </p>
                      <p>
                        <span>
                          Even though Trent and Jacob’s careers may go in
                          slightly different directions, they value the
                          experience of working together. “
                        </span>
                        <span>
                          We’re kind of like a family now,” Trent says.&nbsp;
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <section className='similar-posts-block bg-light copy-md'>
          <div className='container-width-desktop'>
            <div className='row content-center'>
              <div className='col-xs-10 col-xs-offset-1 col-md-12 col-md-offset-0'>
                <header className='heading'>
                  <h2 className='text-center pb-2'>More Like This</h2>
                </header>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-10 col-xs-offset-1 col-md-12 col-md-offset-0'>
                <div className='posts-row row'>
                  {featuredpost
                    ?.filter((x) => {
                      if (x.slug !== props.match.params.id) {
                        return x;
                      }
                    })
                    ?.map((data, i) => (
                      <div className='col-md-4 col'>
                        <a href='' className='block'>
                          <div className='img'>
                            <img
                              className='img-stretch lazy-opacity yall_lazy yall_loaded full-loaded'
                              src={data?.images?.thumb}
                            />
                          </div>
                          <div className='content'>
                            <div className='inner'>
                              <h5 data-truncate='' className='mxheight1'>
                                {data?.excerpt}
                              </h5>
                              <div className='more-wrap'>
                                <a href={`/#/blog_details/${data.slug}`}>
                                  <span className='more'>Read More</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});

export default PreviewBlog;
