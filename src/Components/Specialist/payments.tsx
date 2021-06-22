import React from "react";
import DashboardNav from "./specialistNavbar";
import { Row, Col, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import payslip from "../../images/payslip.png";
import SplPaymentCards from "./specialistPaymentCards";


const Payments = () => {
  return (
    <div>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialist Payment</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav/>
        </Row>
        <Row className="dshworksectnrow1">
          <Col md={11} className="job34">
            <div className="title_wo">
              <div className="workorderheader">
                Payment
              </div>
            </div>
            <Row>
              {false && (
                <Col md={11} className="containerforemptyorder1">
                  <div className="containerforemptyorder">
                    <img
                      src={payslip}
                      alt={"no_work_order"}
                      className="no_work_order"
                    />
                  </div>
                  <div className="no_work1">You have no Outstanding Payment</div>
                </Col>
              )}
              {true && (
               <>
                  <SplPaymentCards
                  title="Pipeline construction from Lagos to Ogun State"
                  status="Payment Breakdown"
                  /> 
                  <SplPaymentCards
                  title="Pipeline construction from Lagos to Ogun State"
                  status="Payment Breakdown"
                  /> 
               </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Payments;
