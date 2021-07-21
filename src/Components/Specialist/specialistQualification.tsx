import React, { useState, useEffect } from "react";
import { Col, Row, Form, Modal } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import closeimg from "../../images/closeimg.png";
import editicon from "../../images/editicon.png";
import { API } from "../../config";
import cert from "../../images/certificate.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Qualification = () => {
  const [state, setState] = useState({
    qualifications: [{}],
    certificateEditModal: false,
    noCertificateAdded: true,
    certificationActive: "",
    certificationbtn: "",
    qualification: "",
    qualification_id: "",
    certificateAddModal: false,
    institution: "",
    field: "",
    from: "",
    to: "",
    id:"",
  });
  const {
    qualifications,
    id,
    certificateEditModal,
    noCertificateAdded,
    certificationActive,
    certificateAddModal,
    certificationbtn,
    qualification,
    qualification_id,
    institution,
    field,
    from,
    to
  }: any = state;

  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const editCertificate = (index) => {
    setState({
      ...state,
      qualification_id: index,
      certificateEditModal: true
    });
  };

  const inputModalChange = (state,id) => {
    const qualification_id = state.qualification_id;
    let tempCertificateDetails = state.qualifications;
    tempCertificateDetails[qualification_id] = state;
    //  edit added certificate
    setState({
      ...state,
      qualifications: tempCertificateDetails,
      certificateEditModal: false
    });
       //post to API
       const availableToken = localStorage.getItem("loggedInDetails");
       console.log(availableToken);
       const token = availableToken ? JSON.parse(availableToken) : "";
       console.log(token);
       const data={
        qualification,
        institution,
        field,
        from,
        to
      }
       Axios.put(`${API}/specialist/qualifications/${id}`, data , {
         headers: { Authorization: `Bearer ${token.access_token}` }
       })
       .then((res)=>{
        console.log(res.data)
          if(res.status==200 ){ 
            notify("qualification updated successfully ")
          }
       })
       .catch((err)=>{
         console.log(err.response)
         if(err.response ){ 
           notify("failed to Update")
         }
       })
  };
  const certEditModal = () => {
    setState({
      ...state,
      certificateEditModal: true
    });
  };
  const closeEditModal = () => {
    setState({
      ...state,
      certificateEditModal: false
    });
  };
  const addCertModal = () => {
    setState({
      ...state,
      certificateAddModal: true
    });
  };
  const closeAddModal = () => {
    setState({
      ...state,
      certificateAddModal: false
    });
  };

  const notify = (message: string, type = "B") =>{
    toast(message, { containerId: type, position: "top-right" });
  }

  const displayQualification = () => {
    //add certhification to UI
    if (qualification && institution && field && from && to) {
      setState({
        ...state,
        noCertificateAdded: false,
        qualifications: [
          ...qualifications,
          { id, qualification:qualification, institution:institution, field:field, from:from, to:to }
        ],
        certificateAddModal: false,
        certificationActive:
          qualifications.length >= 0 ? "wrapdemacator" : "nowrapdemacator",
        certificationbtn:
          qualifications.length >= 0 ? "profcerbtnwrapper" : "nowrapdemacator"
      });
    }
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data ={
      qualification,
      institution,
      field,
      from,
      to
    }
    Axios.post(`${API}/specialist/qualifications`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .then((res)=>{
      console.log(res.data)
      if(res.status==201 ){ 
        notify("New Qualification added")
      }
    })
    .catch((err)=>{
      console.log(err.response)
      if(err.response ){ 
        notify("failed to add qualification")
      }
    })

  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    setState({
      ...state,
      noCertificateAdded: qualifications.length == 1? true:false,
      certificationActive: qualifications.length == 1? "nowrapdemacator":"wrapdemacator",
      certificationbtn: qualifications.length == 1? "nowrapdemacator":"profcerbtnwrapper",
    });
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res.data);
          const user= res.data.data;
          setState({
            ...state,
            ...res.data.data,
            user: res.data.data,
            noCertificateAdded: user.qualifications.length<=0? true:false,
            certificationActive: user.qualifications.length<=0? "nowrapdemacator":"wrapdemacator",
            certificationbtn: user.qualifications.length<=0? "nowrapdemacator":"profcerbtnwrapper",
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
    
  }, []);

  return (
    <>
      <Modal centered={true} onHide={closeAddModal} show={certificateAddModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeAddModal} />
          </div>
          <div className="terminateworkmodaltitle">Add qualification</div>
          <Row>
          <Col md={12}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Enter Qualification</h6>
              <Form.Control
                className="userfield"
                name="qualification"
                value={qualification}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
              <Col md={6}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Institution</h6>
              <Form.Control
                className="userfield"
                name="institution"
                value={institution}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Field of Study</h6>
              <Form.Control
                className="userfield"
                name="field"
                value={field}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={6}>
            <label className="addexptitle">
              From
              <input
                type="date"
                className="userfield form-control"
                name="from"
                value={from}
                onChange={onchange}
                placeholder="From"
                size={70}
              />
            </label>
          </Col>
          <Col md={6}>
            <label className="addexptitle">
              To
              <input
                type="date"
                className="userfield form-control"
                name="to"
                value={to}
                onChange={onchange}
                placeholder="TO"
                size={70}
              />
            </label>
          </Col>
          </Row>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeAddModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={displayQualification}
            >
              Add qualification
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        centered={true}
        onHide={closeEditModal}
        show={certificateEditModal}
      >
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeEditModal} />
          </div>
          <div className="terminateworkmodaltitle">Edit qualification</div>
          <Row>
          <Col md={12}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Enter Qualification</h6>
              <Form.Control
                className="userfield"
                name="qualification"
                value={qualification}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
              <Col md={6}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Institution</h6>
              <Form.Control
                className="userfield"
                name="institution"
                value={institution}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <h6 className="userprofile userprofile12">Field of Study</h6>
              <Form.Control
                className="userfield"
                name="field"
                value={field}
                onChange={onchange}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={6}>
            <label className="addexptitle">
              From
              <input
                type="date"
                className="userfield form-control"
                name="from"
                value={from}
                onChange={onchange}
                placeholder="From"
                size={70}
              />
            </label>
          </Col>
          <Col md={6}>
            <label className="addexptitle">
              To
              <input
                type="date"
                className="userfield form-control"
                name="to"
                value={to}
                onChange={onchange}
                placeholder="TO"
                size={70}
              />
            </label>
          </Col>
          </Row>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeEditModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={() => inputModalChange(state,id)}
            >
              Save
            </span>
          </div>
        </div>
      </Modal>
      <div className="text-center">
        <h3 className=" profillabels ">Qualifications</h3>
        {noCertificateAdded && (
          <div>
            <img src={cert} alt="img" />
            <p>You have no Qualifications Added</p>
            <span className="profcertbtn" onClick={addCertModal}>
              Add Qualifications
            </span>
          </div>
        )}
        {qualifications.map((item, index) => {
          return (
            <div className={`wrapdemacator ${certificationActive}`} key={index}>
              <div className="profcertifncntent">
                <div className="profilequaltnwrap">
                  <p className="profcertheading">qualification</p>
                  <p>{item.qualification}</p>
                </div>
                <div className="profqualiInstitutwrap">
                  <p className="profcertheading">Institution</p>
                  <p>{item.institution}</p>
                </div>
                <div>
                  <img
                    src={editicon}
                    onClick={() => editCertificate(index)}
                    className="editimg"
                  />
                </div>
              </div>
              <div className="profcertifncntent">
                <div className="profilequaltnwrap">
                  <p className="profcertheading">Field</p>
                  <p>{item.field}</p>
                </div>
                <div className="profcertdate">
                  <p className="profcertheading">From</p>
                  <p>{item.from}</p>
                </div>
                <div>
                <p className="profcertheading">To</p>
                  <p>{item.to}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className={`profcerbtnwrapper ${certificationbtn}`}>
          <span className="profcertbtn" onClick={addCertModal}>
            Add Qualification
          </span>
        </div>
      </div>

    </>
  );
};
export default Qualification;
