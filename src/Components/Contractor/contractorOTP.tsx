import React,{ useState, useEffect, useRef } from "react";
import { Col, Row, Container, Alert} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./signup.css";
import otplogo from "../../images/dashbdlogo.png";
import axios from "axios";
import { API } from "../../config";


const ContractorOTP = withRouter((props:any) => {
  const [state, setState]= useState({
    otpNumber: new Array(6).fill(""),
    userName: "",
    userEmail: "",
    data: "",
    isLoading: false,
    successMessage:"",
    errorMessage: ""
  });
  const{
    successMessage,
    errorMessage,
    otpNumber,
    userName,
    data,
    userEmail,
    isLoading
  }= state;


  useEffect(()=>{
    window.scrollTo(-0, -0);
    const userdetails: any = localStorage.getItem("userdata"); 
    const userdata = JSON.parse(userdetails);
    console.log(userdata);
    setState({
      ...state,
      userName: userdata[1],
      userEmail: userdata[0]
    });
  },[]);
  // post otp
  const onSubmit=()=>{
    const availableToken: any= localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    setState( {
      ...state, 
      isLoading:true
    });
    const data={
      otp: parseInt(otpNumber.join(""))
    };
    console.log(data)
    axios.post(`${API}/verify`,data,{
      headers: { Authorization: `Bearer ${token.access_token}` }})
    .then(( response )=>{
      console.log(response)
      if (response.status === 200){
        setTimeout(()=>{
          props?.history?.push("/settings")
        },3000)
          setState({
            ...state,
            successMessage: response.data.message,
          })
      }
      
    })
    .catch((error)=>{
      console.log(error.response)
      if(error && error.response && error.response.data){
        return setState({
          ...state,
          errorMessage: error?.response?.data?.message,
          isLoading: false,
        })
      }
      return setState({
        ...state,
        errorMessage: "failed to send, please check your internet connection" 
      })
    })
  
  }
  //handle token input
  const handleChange = (element, index) => {
    //only numbers are allowed
    if(isNaN(element.value)) return false;
     //update state
     setState({
       ...state,
       otpNumber: otpNumber.map((d, idx)=>
       (idx===index) ? element.value : d )
     });
     //next input focus  
  if(element.nextSibling){
    element.nextSibling.focus();
  }
  };
  const fieldRef: any = useRef();
  useEffect(() => {
    if (errorMessage || successMessage && fieldRef) {
      fieldRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [errorMessage, successMessage]);

  return (
    <div>
      <section className="forms-section">
        <div className="forms-section-image"></div>
        <div className="formwrplift">
          <Container>
            <Row className="form-row">
              <Col md={8} className="otp-wrapper">
                <div><img src={otplogo} alt="img" className="otplogo"/></div>
                <h3 className="otp-welcmtxt">Welcome, <span>{userName}</span></h3>
                <p ref={ fieldRef}>Kindly enter the 6-digits OTP sent to {userEmail}</p>
                {successMessage && (
                     <Alert key={2} variant="success" className="otpalertmessg">
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert key={2} variant="danger" className="otpalertmessg">
                    {errorMessage}
                  </Alert>
                )}
                <div className="otpinput-wrapp">    
                  {otpNumber.map((data, index) =>{
                        return( 
                         <input 
                          type="text" 
                          className="otpinput"
                          maxLength={1}
                          key={index}
                          value={data}
                          onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                          />
                        );
                    })
                  }   
                </div>
                <div className="form-btn-wrapper loginbtdv">
                    <span className="signinbtn" onClick={onSubmit}>
                     {!isLoading ? " Verify me" : "Verifying..."}
                    </span>
                </div>
              </Col>
            </Row>
            <div className="footer-rights">©2021 Molecular copyright All rights Reserved</div>
          </Container>
        </div>
      </section>
    </div>
  );
});
export default ContractorOTP;