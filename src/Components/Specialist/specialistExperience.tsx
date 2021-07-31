import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import closeimg from "../../images/closeimg.png";
import helmet from "../../images/helmet.png";
import editicon from "../../images/editicon.png";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Experience = () => {
  const [state, setState] = useState({
    description: "",
    title: "",
    experience_id: "",
    experiences: [{}],
    terminateWorkModal: false,
    openModal: false,
    noExperienceAdded: true,
    experienceActive: "",
    addexperiencebtn: "",
    credential_id: "",
    deleteCredential: false,
  });
  const {
    description,
    title,
    deleteCredential,
    credential_id,
    experience_id,
    experiences,
    noExperienceAdded,
    terminateWorkModal,
    experienceActive,
    addexperiencebtn,
    openModal
  }: any = state;

  const onchange = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    setState({
      ...state,
      noExperienceAdded: experiences.length == 1 ? true : false,
      experienceActive:
        experiences.length == 1 ? "nowrapdemacator" : "wrapdemacator",
      addexperiencebtn:
        experiences.length == 1 ? "noprofcerbtnwrapper" : "profcerbtnwrapper"
    });
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      })
    ])
      .then(
        Axios.spread(res => {
          console.log(res.data);

          const user = res.data.data;
          setState({
            ...state,
            ...res.data.data,
            user: res.data.data,
            noExperienceAdded: user.experiences.length <= 0 ? true : false,
            experienceActive:
              user.experiences.length <= 0
                ? "nowrapdemacator"
                : "wrapdemacator",
            addexperiencebtn:
              user.experiences.length <= 0
                ? "noprofcerbtnwrapper"
                : "profcerbtnwrapper"
          });
        })
      )
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  const editExperience = (id, index) => {
    console.log(id);
    setState({
      ...state,
      title: title,
      description: description,
      experience_id: id,
      credential_id: id,
      terminateWorkModal: true
    });
  };
const deleteExperience=(id, index)=>{
setState({
  ...state,
  credential_id: id,
  experience_id:index,
  deleteCredential: true,
});
}
  const deleteModalChange= (state, credential_id)=>{
       let tempExperienceDetails = state.experiences;
       tempExperienceDetails.splice(experience_id, 1);
       setState({
         ...state,
         experiences: tempExperienceDetails,
         deleteCredential: false,
       });
         //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);

    Axios.delete(`${API}/specialist/experiences/${credential_id}`, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    })
      .then(res => {
        console.log(res.data);
        if (res.status == 200) {
          notify("Experience successfully deleted");
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          notify("failed to Delete");
        }
      });
  } 

  const inputModalChange = (state, credential_id) => {
    const experience_id = state.experience_id;
    let tempExperienceDetails = state.experiences;
    tempExperienceDetails[experience_id] = state;
    //  edit added experience
    setState({
      ...state,
      experiences: tempExperienceDetails,
      terminateWorkModal: false
    });
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      title,
      description
    };
    Axios.put(`${API}/specialist/experiences/${credential_id}`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    })
      .then(res => {
        console.log(res.data);
        if (res.status == 200) {
          notify("experience updated successfully ");
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          notify("failed to Update");
        }
      });
  };

  const notify = (message: string, type = "B") => {
    toast(message, { containerId: type, position: "top-right" });
  };
  const displayExperience = () => {
    //post data to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      title,
      description
    };
    Axios.post(`${API}/specialist/experiences`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    })
      .then(res => {
        console.log(res.data);
        if (res.status == 201) {
          //display experience to UI
          notify("New experience added");
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          notify("failed to add experience");
        }
      });
  };
  const editModal = () => {
    setState({
      ...state,
      terminateWorkModal: true
    });
  };
  const closEditModal = () => {
    setState({
      ...state,
      terminateWorkModal: false
    });
  };
  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteCredential: false
    });
  };
 
  const addModal = () => {
    setState({
      ...state,
      openModal: true
    });
  };
  const closeModal = () => {
    setState({
      ...state,
      openModal: false
    });
  };
  return (
    <>
      <Modal show={deleteCredential} centered={true} onHide={closeDeleteModal}>
        <div className="usermodaltitle">
          Delete Experience?
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
      <Modal centered={true} onHide={closEditModal} show={terminateWorkModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closEditModal} />
          </div>
          <div className="terminateworkmodaltitle">Edit Experience</div>
          <form>
            <label className="addexptitle">
              Title
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Title"
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
            <span className="wrkmodal-cancelbtn" onClick={closEditModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={() => inputModalChange(state, credential_id)}
            >
              Save
            </span>
          </div>
        </div>
      </Modal>
      <Modal centered={true} onHide={closeModal} show={openModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeModal} />
          </div>
          <div className="terminateworkmodaltitle">Add Experience</div>
          <form>
            <label className="addexptitle">
              Title
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Title"
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
            <span className="wrkmodal-cancelbtn" onClick={closeModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={displayExperience}
            >
              Add Experience
            </span>
          </div>
        </div>
      </Modal>
      <div className="profileexperiencesectn">
        <h3 className=" profillabels">Experiences</h3>
        {noExperienceAdded && (
          <div>
            <img src={helmet} alt="img" />
            <p>You have no Experience Added</p>
            <span className="profcertbtn" onClick={addModal}>
              Add Experience
            </span>
          </div>
        )}
        <div className="profecperince-content">
          {experiences.map((item, index) => {
            return (
              <div key={index} className={`wrapdemacator ${experienceActive}`}>
                <div className="profiexpernceheaderwrap">
                  <p className="profiexpetitle">Title</p>
                  <div className="credentialsactions">
                    <div>
                      <img
                        src={editicon}
                        onClick={() => editExperience(item.id, index)}
                        className="editimg"
                      />
                    </div>
                    <div
                     className="credentialdeletebtn"
                     onClick={()=>deleteExperience(item.id, index)}
                    >
                    X
                    </div>
                  </div>
                </div>
                <p>{item.title}</p>
                <p className="profiexpetitle">Experience</p>
                <p>{item.description}</p>
              </div>
            );
          })}
          <div className={`profcerbtnwrapper ${addexperiencebtn}`}>
            <span
              className="wrkmodal-declinebtn profcertbtn"
              onClick={addModal}
            >
              Add Experience
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Experience;
