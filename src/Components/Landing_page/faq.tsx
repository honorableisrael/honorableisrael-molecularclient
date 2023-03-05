import React from "react";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";

const Faq = () => {
  const [openState, setState]: any = React.useState({
    firstIsOpen: false,
    secondIsOpen: false,
    o3: false,
    o4: false,
    o5: false,
    o6: false,
    o7: false,
    o8: false,
    o9: false,
    o10: false,
    o11: false,
    o12: false,
    o13: false,
    o14: false,
    o15: false,
    o16: false,
    o17: false,
    o18: false,
  });
  const {
    firstIsOpen,
    secondIsOpen,
    o3,
    o4,
    o5,
    o6,
    o7,
    o8,
    o9,
    o10,
    o11,
    o12,
    o13,
    o14,
    o15,
    o16,
    o17,
    o18,
  } = openState;

  return (
    <div className='row '>
      <div className='col-md-12 offwhitebgv2 extrawidth general-padding generalspacing'>
        <div className='faq-header pb-3'>Frequently Asked Questions</div>
        <Accordion defaultActiveKey='' className='faq-accordion'>
          <Card>
            <Accordion.Toggle
              onClick={() =>
                setState({
                  firstIsOpen: firstIsOpen ? false : true,
                })
              }
              as={Card.Header}
              eventKey='0'>
              <div className='faq-side-header'>
                {" "}
                <div className={firstIsOpen && "mol_orange"}>1. How do I access MolecularPro?</div>
                <span className='sideplus'>
                  {!firstIsOpen ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 8V16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 12H16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M8 12H16'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <p className='faq-answers'>
                  MolecularPro is a web-based platform that can be accessed from
                  your phone, laptop, tablet, or other devices. Simply type
                  www.molecularpro.co
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          {/* second question */}
          <Card>
            <Accordion.Toggle
              onClick={() =>
                setState({
                  secondIsOpen: secondIsOpen ? false : true,
                })
              }
              as={Card.Header}
              eventKey='1'>
              <div className='faq-side-header'>
                {" "}
                <div className={secondIsOpen && "mol_orange"}>
                  2. How does MolecularPro ensure the quality of technical
                  specialists deployed? 
                </div>
                <span className='sideplus'>
                  {!secondIsOpen ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 8V16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 12H16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M8 12H16'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                <div className='faq-answers'>Response 2</div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          {/* third question */}
          <Card>
            <Accordion.Toggle
              onClick={() =>
                setState({
                  o3: o3 ? false : true,
                })
              }
              as={Card.Header}
              eventKey='3'>
              <div className='faq-side-header'>
                {" "}
                <div className={o3 && "mol_orange"}>
                  3. How long does it take to deploy natural gas technical
                  specialists?
                </div>
                <span className='sideplus'>
                  {" "}
                  {!o3 ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 8V16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 12H16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M8 12H16'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='3'>
              <Card.Body>
                <p className='faq-answers'> Response 3</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          {/* fourth question */}
          <Card>
            <Accordion.Toggle
              onClick={() =>
                setState({
                  o4: o4 ? false : true,
                })
              }
              as={Card.Header}
              eventKey='4'>
              <div className='faq-side-header'>
                {" "}
                <div className={o4 && "mol_orange"}>
                  4. How much does it cost for natural gas technical specialists
                  to sign up? 
                </div>
                <span className='sideplus'>
                  {" "}
                  {!o4 ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 8V16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 12H16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M8 12H16'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='4'>
              <Card.Body>
                <p>Response 4</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle
              onClick={() =>
                setState({
                  o5: o5 ? false : true,
                })
              }
              as={Card.Header}
              eventKey='5'>
              <div className='faq-side-header'>
                {" "}
                <div className={o5 && "mol_orange"}>5. I have other questions, who do I talk to?</div>
                <span className='sideplus'>
                  {" "}
                  {!o5 ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 8V16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M8 12H16'
                        stroke='#374B58'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        fill='#FD8C00'
                      />
                      <path
                        d='M8 12H16'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='5'>
              <Card.Body>
                <p className='faq-answers'>Response5</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};
export default Faq;
