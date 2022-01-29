import React, { useState, useEffect } from "react";
import { Col, Row, Form, Modal,Alert } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import closeimg from "../../../images/closeimg.png";
import editicon from "../../../images/editicon.png";
import { API } from "../../../config";
import cert from "../../../images/certificate.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from 'react-router-dom';



const Certification = withRouter((props) => {
  const [state, setState] = useState({
    certifications: [{}],
    certificateEditModal: false,
    noCertificateAdded: true,
    certificationActive: "",
    certificationbtn: "",
    title: "",
    year: "",
    certificate_id: "",
    certificateAddModal: false,
    description:"",
    deleteCredential: false,
    credential_id:"",
    errorMessage:"",
    successMessage:"",
    isloading: false,
  });
  const {
    errorMessage,
    successMessage,
    isloading,
    certifications,
    deleteCredential,
    description,
    credential_id,
    certificate_id,
    certificateEditModal,
    noCertificateAdded,
    certificationActive,
    certificateAddModal,
    certificationbtn,
    title,
    year,
  }: any = state;

  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage:""
    });
  };

  const editCertificate = (id,index,data) => {
    setState({
      ...state,
      ...data,
      certificate_id: index,
      credential_id: id,
      certificateEditModal: true
    });
  };

  const inputModalChange = (state, credential_id) => {
    const certificate_id = state.certificate_id;
    let tempCertificateDetails = state.certifications;
    tempCertificateDetails[certificate_id] = state;
    //  edit added certificate
    setState({
      ...state,
      certifications: tempCertificateDetails,
      certificateEditModal: false
    });
     //post to API
     const availableToken = localStorage.getItem("loggedInDetails");
     console.log(availableToken);
     const token = availableToken ? JSON.parse(availableToken) : "";
     console.log(token);
     const data={
      certification: title,
      year,
      description,
    }
     Axios.put(`${API}/admin/specialists/certifications/${credential_id}`, data , {
       headers: { Authorization: `Bearer ${token.access_token}` }
     })
     .then((res)=>{
      console.log(res.data)
        if(res.status==200 ){ 
          notify("Certificate updated successfully ")
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


  const displayCertification = () => {
    //add certhification to UI
    setState({
      ...state,
      isloading: true,
    })
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data ={
      certification: title,
      year,
      description,
    }
    Axios.post(`${API}/admin/specialists/${props.match.params.id}/certifications`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .then((res)=>{
      console.log(res.data)
        setState({
          ...state,
          noCertificateAdded: false,
          certifications: [...certifications, { title: title, year: year }],
          certificateAddModal: false,
          certificationActive:
            certifications.length >= 0 ? "profcertifncntent" : "nowrapdemacator",
          certificationbtn:
            certifications.length >= 0 ? "profcerbtnwrapper" : "nowrapdemacator",
            isloading:false
        });
        notify("New Certification added")
    })
    .catch((err)=>{
      console.log(err.response)
      if(err.response ){ 
        notify("failed to add Certification")
        setState({
          ...state,
          isloading: false,
          errorMessage: err?.response?.data?.message,
        })
      }
    })
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    setState({
      ...state,
      noCertificateAdded: certifications.length == 1? true:false,
      certificationActive: certifications.length == 1? "nowrapdemacator":"wrapdemacator",
      certificationbtn: certifications.length == 1? "nowrapdemacator":"profcerbtnwrapper",
    });
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/admin/specialists/${props.match.params.id}`, {
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
            ...res.data.data,
            noCertificateAdded: user.certifications.length<=0? true:false,
            certificationActive: user.certifications.length<=0? "nowrapdemacator":"profcertifncntent",
            certificationbtn: user.certifications.length<=0? "nowrapdemacator":"profcerbtnwrapper",
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
    
  }, []);

  const deleteCertificate=(id, index)=>{
    setState({
      ...state,
      credential_id: id,
      deleteCredential: true,
      certificate_id: index,
    });
    };
    const closeDeleteModal = () => {
      setState({
        ...state,
        deleteCredential: false
      });
    };
   
    const deleteModalChange= (state, credential_id)=>{
      let tempExperienceDetails = state.certifications;
    tempExperienceDetails.splice(certificate_id, 1);
      setState({
        ...state,
        certifications: tempExperienceDetails,
        deleteCredential: false,
      });
        //post to API
   const availableToken = localStorage.getItem("loggedInDetails");
   console.log(availableToken);
   const token = availableToken ? JSON.parse(availableToken) : "";
   console.log(token);

   Axios.delete(`${API}/admin/specialists/certifications/${credential_id}`, {
     headers: { Authorization: `Bearer ${token.access_token}` }
   })
     .then(res => {
       console.log(res.data);
       if (res.status == 200) {
         notify("Certificate successfully deleted ");
       }
     })
     .catch(err => {
       console.log(err.response);
       if (err.response) {
         notify("failed to Delete");
       }
     });
}

  return (
    <>
     <Modal show={deleteCredential} centered={true} onHide={closeDeleteModal}>
        <div className="usermodaltitle">
          Delete Certificate?
        </div>
        <Modal.Body>
        <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeDeleteModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn"
              onClick={() => deleteModalChange(state, credential_id)}
            >
              Delete
            </span>
          </div>
        </Modal.Body>
      </Modal>
      <Modal centered={true} onHide={closeAddModal} show={certificateAddModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeAddModal} />
          </div>
          <div className="terminateworkmodaltitle">Add Certification</div>
          {successMessage && (
            <Alert key={2} variant="success" className="alertmessg">
              {successMessage}
            </Alert>
          )}
         {errorMessage && (
           <Alert key={2} variant="danger" className="alertmessg">
            {errorMessage}
          </Alert>
          )}
          <form>
            <label className="addexptitle">
              Certification
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Certification"
                size={70}
              />
            </label>
            <label className="addexptitle">
              Year
              <input
                type="date"
                className="userfield form-control"
                name="year"
                value={year}
                onChange={onchange}
                placeholder="yyyy-mm-dd"
                size={70}
              />
            </label>
            <label className="addexptitle">
              Description
              <textarea
                name="description"
                value={description}
                onChange={onchange}
                className="form-control wrkmodaltextarea"
                placeholder="Enter Description"
                rows={5}
                cols={5}
              />
            </label>
          </form>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeAddModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={displayCertification}
            >
              {!isloading ? " Add Certificate" : "Adding..."}
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
          <div className="terminateworkmodaltitle">Edit Certification</div>
          <form>
            <label className="addexptitle">
              Certification
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Certification"
                size={70}
              />
            </label>
            <label className="addexptitle">
              Year
              <input
                type="date"
                className="userfield form-control"
                name="year"
                value={year}
                onChange={onchange}
                placeholder="yyyy-mm-dd"
                size={70}
              />
            </label>
            <label className="addexptitle">
              Description
              <textarea
                name="description"
                value={description}
                onChange={onchange}
                className="form-control wrkmodaltextarea"
                placeholder="Enter Description"
                rows={5}
                cols={5}
              />
            </label>
          </form>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeEditModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={() => inputModalChange(state,credential_id)}
            >
              Save
            </span>
          </div>
        </div>
      </Modal>
      <div className="profileceriticatesectn">
        <h3 className=" profillabels ">Certifications</h3>
        {certifications?.length==0 && (
          <div>
            <img src={cert} alt="img" />
            <p>You have no Certificates Added</p>
            <span className="profcertbtn" onClick={addCertModal}>
              Add Certificate
            </span>
          </div>
        )}
        {certifications?.map((item, index) => {
          return (
            <div
              className={`profcertifncntent ${certificationActive}`}
              key={index}
            >
              <div className="profcerttitle">
                <p className="profcertheading">Certification</p>
                <p>{item.title}</p>
              </div>
              <div className="profcertdate">
                <p className="profcertheading">Year</p>
                <p>{item.year}</p>
              </div>
              <div className="credentialsactions">
                    <div>
                      <img
                        src={editicon}
                        onClick={() => editCertificate(item.id, index,item)}
                        className="editimg"
                      />
                    </div>
                    <div
                     className="credentialdeletebtn"
                     onClick={()=>deleteCertificate(item.id, index)}
                    >
                    X
                    </div>
                  </div>
            </div>
          );
        })}
        <div className={`profcerbtnwrapper ${certificationbtn}`}>
          <span className="profcertbtn" onClick={addCertModal}>
            Add Certificate
          </span>
        </div>
      </div>
   
    </>
  );
});
export default Certification;
