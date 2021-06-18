import React from "react";
import { Col, Row, Container, Form, ProgressBar } from "react-bootstrap";

const WorkDetails_Form_Preview = (props) => {
  return (
    <>
      <div className="formcontent">
        <Form>
          <Row>
            <Col md={12}>
              <h5 className="work_details worktitle">Work Details</h5>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">Work Title</h6>
                <p className="Construction12">
                  Construction of Gas pipes from Lagos to Abuja.
                </p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Work Description
                </h6>
                <p className="Construction12">
                  This project involves the installation of cooking gas pipes
                  from Lagos to Abuja to serve over 500,000 users. It is the
                  first of its kind and would require the highest resource ever
                  taken in the Pipe fitting industry.
                </p>
              </div>
              <div className="main_wrap_ws">
                <h6 className="userprofile12 userprofile123">
                  Project Purpose
                </h6>
                <p className="Construction12">
                  This project involves the installation of cooking gas pipes
                  from Lagos to Abuja to serve over 500,000 users. It is the
                  first of its kind and would require the highest resource ever
                  taken in the Pipe fitting industry
                </p>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Location</h6>
                  <div className="Construction12">Nigeria</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">State</h6>
                  <div className="Construction12">Lagos</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Town</h6>
                  <div className="Construction12">Ikeja</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Location Terrain
                  </h6>
                  <div className="Construction12">Urban</div>
                </div>
              </div>
              <div className="main_wrap_ws main_wrap_ws22">
                <div>
                  <h6 className="userprofile12 userprofile123">Start Date</h6>
                  <div className="Construction12">01/02/2021</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">End Date</h6>
                  <div className="Construction12">01/02/2023</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Hours/day</h6>
                  <div className="Construction12">4</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">Duration</h6>
                  <div className="Construction12">3</div>
                </div>
              </div>
              <div>
                <hr />
              </div>
              <h5 className="work_details worktitle wftitle">Work Force</h5>
              <h6 className="userprofile12 userprofile123">Type of pipe</h6>
              <p className="Construction12 Construction121">Galvanic Pipe</p>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Pipe Configuration
              </h6>
              <div className="main_wrap_ws main_wrap_ws22 graybg">
                <div>
                  <h6 className="userprofile12 userprofile123">
                    Pipe length(Inches)
                  </h6>
                  <div className="Construction12">12</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Pipe Weight(g)
                  </h6>
                  <div className="Construction12">220</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Pipe Diameter
                  </h6>
                  <div className="Construction12">21m</div>
                </div>
              </div>
              <div className="main_wrap_ws main_wrap_ws22 graybg">
                <div>
                  <h6 className="userprofile12 userprofile123">
                    Pipe length(Inches)
                  </h6>
                  <div className="Construction12">12</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Pipe Weight(g)
                  </h6>
                  <div className="Construction12">220</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Pipe Diameter
                  </h6>
                  <div className="Construction12">21m</div>
                </div>
              </div>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Types and number of specialist
              </h6>
              <div className="main_wrap_ws main_wrap_ws22 graybg">
                <div>
                  <h6 className="userprofile12 userprofile123">
                    Specialist Type
                  </h6>
                  <div className="Construction12">Welder</div>
                </div>
                <div className="">
                  <h6 className="userprofile12 userprofile123">
                    Number Required
                  </h6>
                  <div className="Construction12">20</div>
                </div>
              </div>
              <h6 className="userprofile12 userprofile123 userprofile1231">
                Payment Cycle
              </h6>
              <div>Bi weekly</div>
            </Col>
          </Row>
          <Row className="nxt90">
            {props.hide==false && (
              <Col md={12}>
                <div className="job31">Next</div>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </>
  );
};
export default WorkDetails_Form_Preview;
